"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/utils";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "@/lib/constants";
import { LOYALTY_RATE, LOYALTY_REDEEM_VALUE, LOYALTY_MAX_REDEEM_PERCENT } from "@/types";
import { Check, MapPin, CreditCard, ShoppingBag, ArrowLeft, Tag, X, Award, Minus, Plus } from "lucide-react";
import { Link } from "next-view-transitions";

const steps = [
  { num: 1, label: "Giao hàng", icon: MapPin },
  { num: 2, label: "Thanh toán", icon: CreditCard },
  { num: 3, label: "Xác nhận", icon: Check },
];

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const { data: session } = useSession();
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Discount code state
  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountError, setDiscountError] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);

  // Loyalty points state
  const [availablePoints, setAvailablePoints] = useState(0);
  const [pointsToUse, setPointsToUse] = useState(0);
  const [pointsInputRaw, setPointsInputRaw] = useState("0");
  const [loadingPoints, setLoadingPoints] = useState(false);

  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const [shipping, setShipping] = useState({
    fullName: "", phone: "", street: "", ward: "", district: "", city: "", note: "",
  });

  // Fetch user's loyalty points
  useEffect(() => {
    if (session) {
      setLoadingPoints(true);
      fetch("/api/account/loyalty")
        .then(r => r.json())
        .then(d => { if (d.points !== undefined) setAvailablePoints(d.points); })
        .catch(() => {})
        .finally(() => setLoadingPoints(false));
    }
  }, [session]);

  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const subtotalAfterDiscount = subtotal - discountAmount;

  // Max points redeemable = min(availablePoints, 20% of subtotal in points)
  const maxPointsByPercent = Math.floor((subtotalAfterDiscount * LOYALTY_MAX_REDEEM_PERCENT / 100) / LOYALTY_REDEEM_VALUE);
  const maxPointsCanUse = Math.min(availablePoints, maxPointsByPercent);
  const loyaltyDiscount = pointsToUse * LOYALTY_REDEEM_VALUE;
  const total = Math.max(0, subtotalAfterDiscount - loyaltyDiscount + shippingFee);
  const loyaltyEarned = Math.floor(total / LOYALTY_RATE);

  const isShippingValid = shipping.fullName && shipping.phone && shipping.street && shipping.city;

  const handlePointsInput = (val: string) => {
    setPointsInputRaw(val);
    const n = parseInt(val) || 0;
    const clamped = Math.max(0, Math.min(n, maxPointsCanUse));
    setPointsToUse(clamped);
  };

  const applyAllPoints = () => {
    setPointsToUse(maxPointsCanUse);
    setPointsInputRaw(String(maxPointsCanUse));
  };

  const clearPoints = () => {
    setPointsToUse(0);
    setPointsInputRaw("0");
  };

  const applyDiscount = async () => {
    setDiscountError("");
    const code = discountCode.toUpperCase().trim();
    if (!code) { setDiscountError("Vui lòng nhập mã giảm giá"); return; }

    try {
      const res = await fetch(`/api/discount?code=${encodeURIComponent(code)}&subtotal=${subtotal}`);
      const data = await res.json();
      if (!res.ok) { setDiscountError(data.error || "Mã giảm giá không hợp lệ"); return; }
      setDiscountAmount(data.amount);
      setDiscountApplied(true);
    } catch {
      // Fallback to mock for demo
      const discounts: Record<string, { type: string; value: number; min: number }> = {
        YENSAO10: { type: "percent", value: 10, min: 500000 },
        FREESHIP: { type: "fixed", value: 30000, min: 300000 },
        WELCOME20: { type: "percent", value: 20, min: 1000000 },
      };
      const disc = discounts[code];
      if (!disc) { setDiscountError("Mã giảm giá không hợp lệ"); return; }
      if (subtotal < disc.min) { setDiscountError(`Đơn hàng tối thiểu ${formatCurrency(disc.min)}`); return; }
      const amount = disc.type === "percent" ? (subtotal * disc.value) / 100 : disc.value;
      setDiscountAmount(amount);
      setDiscountApplied(true);
    }
  };

  const placeOrder = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          shipping,
          paymentMethod: "COD",
          discountCode: discountApplied ? discountCode : undefined,
          discountAmount,
          loyaltyPointsUsed: pointsToUse,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.error || "Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại!");
      } else {
        setOrderNumber(data.order.orderNumber);
        setOrderPlaced(true);
        clearCart();
      }
    } catch {
      alert("Lỗi kết nối. Vui lòng kiểm tra lại mạng!");
    } finally {
      setLoading(false);
    }
  };

  // Empty cart
  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="container-custom py-16 text-center">
        <ShoppingBag size={48} className="text-cream-300 mx-auto mb-4" />
        <h1 className="text-2xl font-serif font-bold text-brown-900">Giỏ hàng trống</h1>
        <p className="text-brown-500 mt-2">Thêm sản phẩm vào giỏ để tiến hành đặt hàng</p>
        <Link href="/products" className="btn-primary mt-6 inline-flex gap-2">
          <ArrowLeft size={18} />Khám phá sản phẩm
        </Link>
      </div>
    );
  }

  // Order success
  if (orderPlaced) {
    return (
      <div className="container-custom py-16 text-center max-w-lg mx-auto animate-fade-in">
        <div className="w-20 h-20 bg-success-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={40} className="text-success-500" />
        </div>
        <h1 className="text-2xl font-serif font-bold text-brown-900">Đặt hàng thành công! 🎉</h1>
        <p className="text-brown-500 mt-2">Cảm ơn bạn đã tin tưởng Yến Sào Bình An, chúc bạn thật nhiều sức khỏe</p>
        <div className="card p-4 mt-6">
          <p className="text-sm text-brown-500">Mã đơn hàng</p>
          <p className="text-xl font-mono font-bold text-primary-600 mt-1 tracking-wider">{orderNumber}</p>
        </div>
        {loyaltyEarned > 0 && (
          <div className="flex items-center justify-center gap-2 mt-4 px-4 py-3 bg-yellow-50 border border-yellow-200 rounded-xl">
            <Award size={18} className="text-yellow-500" />
            <span className="text-sm font-medium text-yellow-700">+{loyaltyEarned} điểm tích lũy đã được cộng vào tài khoản!</span>
          </div>
        )}
        {pointsToUse > 0 && (
          <div className="flex items-center justify-center gap-2 mt-2 px-4 py-2 bg-orange-50 rounded-xl">
            <Award size={16} className="text-orange-500" />
            <span className="text-sm text-orange-700">Đã dùng {pointsToUse} điểm (−{formatCurrency(loyaltyDiscount)})</span>
          </div>
        )}
        <p className="text-sm text-brown-500 mt-4">Chúng tôi sẽ liên hệ xác nhận đơn hàng qua điện thoại</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
          <Link href="/products" className="btn-primary">Tiếp tục mua sắm</Link>
          <Link href="/account/orders" className="btn-secondary">Xem đơn hàng</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8 md:py-12 max-w-5xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-serif font-bold text-brown-900 mb-6">Đặt hàng</h1>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-0 mb-10">
        {steps.map((s, i) => (
          <div key={s.num} className="flex items-center">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              step >= s.num ? "bg-gold-gradient text-white" : "bg-cream-100 text-brown-400"
            }`}>
              <s.icon size={16} />
              <span className="text-sm font-medium hidden sm:inline">{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-8 md:w-16 h-0.5 ${step > s.num ? "bg-primary-500" : "bg-cream-200"}`} />
            )}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Step 1: Shipping */}
          {step === 1 && (
            <div className="card p-6 animate-fade-in">
              <h2 className="font-serif font-semibold text-lg text-brown-900 mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-primary-600" />
                Thông tin giao hàng
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-brown-700 mb-1">Họ tên *</label>
                  <input value={shipping.fullName} onChange={(e) => setShipping({...shipping, fullName: e.target.value})} className="input-field" placeholder="Nguyễn Văn A" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brown-700 mb-1">Số điện thoại *</label>
                  <input value={shipping.phone} onChange={(e) => setShipping({...shipping, phone: e.target.value})} className="input-field" placeholder="0901 234 567" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-brown-700 mb-1">Địa chỉ *</label>
                  <input value={shipping.street} onChange={(e) => setShipping({...shipping, street: e.target.value})} className="input-field" placeholder="Số nhà, đường" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brown-700 mb-1">Phường/Xã</label>
                  <input value={shipping.ward} onChange={(e) => setShipping({...shipping, ward: e.target.value})} className="input-field" placeholder="Phường 1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brown-700 mb-1">Quận/Huyện</label>
                  <input value={shipping.district} onChange={(e) => setShipping({...shipping, district: e.target.value})} className="input-field" placeholder="Quận 1" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-brown-700 mb-1">Tỉnh/Thành phố *</label>
                  <input value={shipping.city} onChange={(e) => setShipping({...shipping, city: e.target.value})} className="input-field" placeholder="TP. Hồ Chí Minh" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-brown-700 mb-1">Ghi chú</label>
                  <textarea value={shipping.note} onChange={(e) => setShipping({...shipping, note: e.target.value})} className="input-field" rows={2} placeholder="Ghi chú cho đơn hàng (tùy chọn)" />
                </div>
              </div>
              <button onClick={() => setStep(2)} disabled={!isShippingValid} className="btn-primary w-full mt-6">
                Tiếp tục
              </button>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="card p-6 animate-fade-in">
              <h2 className="font-serif font-semibold text-lg text-brown-900 mb-4 flex items-center gap-2">
                <CreditCard size={20} className="text-primary-600" />
                Phương thức thanh toán
              </h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 border-2 border-primary-400 bg-primary-50 rounded-xl cursor-pointer">
                  <input type="radio" name="payment" checked readOnly />
                  <div className="flex-1">
                    <p className="font-medium text-brown-900">Thanh toán khi nhận hàng (COD)</p>
                    <p className="text-sm text-brown-500">Thanh toán bằng tiền mặt khi nhận hàng</p>
                  </div>
                  <span className="text-2xl">💵</span>
                </label>
                <label className="flex items-center gap-3 p-4 border border-cream-300 rounded-xl cursor-not-allowed opacity-50">
                  <input type="radio" name="payment" disabled />
                  <div className="flex-1"><p className="font-medium text-brown-900">VNPay</p><p className="text-sm text-brown-500">Sắp ra mắt</p></div>
                  <span className="text-2xl">🏦</span>
                </label>
                <label className="flex items-center gap-3 p-4 border border-cream-300 rounded-xl cursor-not-allowed opacity-50">
                  <input type="radio" name="payment" disabled />
                  <div className="flex-1"><p className="font-medium text-brown-900">MoMo</p><p className="text-sm text-brown-500">Sắp ra mắt</p></div>
                  <span className="text-2xl">📱</span>
                </label>
              </div>

              {/* Discount Code + Loyalty Points side by side */}
              <div className="mt-6 pt-5 border-t border-cream-200 grid sm:grid-cols-2 gap-4">

                {/* Discount Code */}
                <div>
                  <label className="block text-sm font-medium text-brown-700 mb-2 flex items-center gap-1">
                    <Tag size={14} /> Mã giảm giá
                  </label>
                  {discountApplied ? (
                    <div className="flex items-center gap-2 p-3 bg-success-50 border border-success-200 rounded-xl">
                      <Check size={16} className="text-success-500 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-mono font-bold text-success-700">{discountCode.toUpperCase()}</p>
                        <p className="text-xs text-success-600">−{formatCurrency(discountAmount)}</p>
                      </div>
                      <button onClick={() => { setDiscountApplied(false); setDiscountAmount(0); setDiscountCode(""); }}>
                        <X size={14} className="text-brown-400 hover:text-error-500" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && applyDiscount()}
                        className="input-field flex-1 text-sm"
                        placeholder="Nhập mã giảm giá"
                      />
                      <button onClick={applyDiscount} className="btn-secondary px-3 text-sm whitespace-nowrap">Áp dụng</button>
                    </div>
                  )}
                  {discountError && <p className="text-xs text-error-500 mt-1">{discountError}</p>}
                  {!discountApplied && <p className="text-xs text-brown-400 mt-1">VD: YENSAO10, WELCOME20</p>}
                </div>

                {/* Loyalty Points */}
                <div>
                  <label className="block text-sm font-medium text-brown-700 mb-2 flex items-center gap-1">
                    <Award size={14} className="text-yellow-500" /> Dùng điểm tích lũy
                  </label>
                  {!session ? (
                    <p className="text-xs text-brown-400 py-3"><Link href="/login" className="text-primary-600 underline">Đăng nhập</Link> để dùng điểm</p>
                  ) : loadingPoints ? (
                    <p className="text-xs text-brown-400 py-3">Đang tải điểm...</p>
                  ) : availablePoints === 0 ? (
                    <p className="text-xs text-brown-400 py-3">Bạn chưa có điểm tích lũy</p>
                  ) : (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center border border-cream-300 rounded-xl overflow-hidden flex-1">
                          <button
                            onClick={() => { const n = Math.max(0, pointsToUse - 100); setPointsToUse(n); setPointsInputRaw(String(n)); }}
                            className="px-3 py-2 text-brown-500 hover:bg-cream-100 transition"
                          >
                            <Minus size={14} />
                          </button>
                          <input
                            type="number"
                            value={pointsInputRaw}
                            onChange={(e) => handlePointsInput(e.target.value)}
                            className="flex-1 text-center text-sm font-medium text-brown-900 py-2 bg-transparent focus:outline-none"
                            min={0}
                            max={maxPointsCanUse}
                          />
                          <button
                            onClick={() => { const n = Math.min(maxPointsCanUse, pointsToUse + 100); setPointsToUse(n); setPointsInputRaw(String(n)); }}
                            className="px-3 py-2 text-brown-500 hover:bg-cream-100 transition"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        {pointsToUse > 0 ? (
                          <button onClick={clearPoints} className="text-xs text-error-500 hover:underline whitespace-nowrap">Bỏ</button>
                        ) : (
                          <button onClick={applyAllPoints} className="text-xs text-primary-600 hover:underline whitespace-nowrap">Dùng tất</button>
                        )}
                      </div>
                      <div className="flex justify-between text-xs text-brown-500">
                        <span>Có sẵn: <strong className="text-yellow-600">{availablePoints.toLocaleString()} điểm</strong></span>
                        <span>Max: {maxPointsCanUse.toLocaleString()} điểm</span>
                      </div>
                      {pointsToUse > 0 && (
                        <p className="text-xs text-yellow-700 bg-yellow-50 rounded-lg px-2 py-1 mt-2 font-medium">
                          Giảm {formatCurrency(loyaltyDiscount)} từ {pointsToUse} điểm
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(1)} className="btn-secondary flex-1">Quay lại</button>
                <button onClick={() => setStep(3)} className="btn-primary flex-1">Xác nhận đơn hàng</button>
              </div>
            </div>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && (
            <div className="card p-6 animate-fade-in">
              <h2 className="font-serif font-semibold text-lg text-brown-900 mb-4 flex items-center gap-2">
                <Check size={20} className="text-primary-600" />
                Xác nhận đơn hàng
              </h2>

              {/* Shipping Info */}
              <div className="p-4 bg-cream-50 rounded-xl mb-4">
                <h3 className="font-medium text-sm text-brown-900 mb-2">Giao hàng đến</h3>
                <p className="text-sm text-brown-600">{shipping.fullName} • {shipping.phone}</p>
                <p className="text-sm text-brown-600">{[shipping.street, shipping.ward, shipping.district, shipping.city].filter(Boolean).join(", ")}</p>
                {shipping.note && <p className="text-sm text-brown-400 mt-1">Ghi chú: {shipping.note}</p>}
              </div>

              {/* Products */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3 p-3 bg-cream-50 rounded-xl">
                    <div className="w-12 h-12 bg-cream-200 rounded-lg flex items-center justify-center text-xl overflow-hidden flex-shrink-0">
                      {item.product.images?.[0]
                        ? <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                        : "🏮"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-brown-900 truncate">{item.product.name}</p>
                      <p className="text-xs text-brown-500">x{item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-primary-600">{formatCurrency(item.product.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              {/* Applied discounts summary */}
              {(discountApplied || pointsToUse > 0) && (
                <div className="mt-4 p-3 bg-success-50 rounded-xl space-y-1">
                  {discountApplied && (
                    <p className="text-xs text-success-700 flex items-center gap-1"><Tag size={12} /> Mã {discountCode.toUpperCase()}: −{formatCurrency(discountAmount)}</p>
                  )}
                  {pointsToUse > 0 && (
                    <p className="text-xs text-yellow-700 flex items-center gap-1"><Award size={12} /> {pointsToUse} điểm: −{formatCurrency(loyaltyDiscount)}</p>
                  )}
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(2)} className="btn-secondary flex-1">Quay lại</button>
                <button onClick={placeOrder} disabled={loading} className="btn-primary flex-1">
                  {loading ? "Đang xử lý..." : `Đặt hàng — ${formatCurrency(total)}`}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h3 className="font-serif font-semibold text-brown-900 mb-4">Tóm tắt đơn hàng</h3>
            <div className="space-y-2 text-sm">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-brown-600">
                  <span className="truncate flex-1 mr-2">{item.product.name} x{item.quantity}</span>
                  <span className="whitespace-nowrap">{formatCurrency(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-cream-200 mt-4 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-brown-600">
                <span>Tạm tính</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-success-600">
                  <span className="flex items-center gap-1"><Tag size={12} /> Mã giảm giá</span>
                  <span>−{formatCurrency(discountAmount)}</span>
                </div>
              )}
              {loyaltyDiscount > 0 && (
                <div className="flex justify-between text-yellow-600">
                  <span className="flex items-center gap-1"><Award size={12} /> Điểm tích lũy</span>
                  <span>−{formatCurrency(loyaltyDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-brown-600">
                <span>Phí giao hàng</span>
                <span className={shippingFee === 0 ? "text-success-500 font-medium" : ""}>{shippingFee === 0 ? "Miễn phí" : formatCurrency(shippingFee)}</span>
              </div>
              <div className="flex justify-between font-bold text-brown-900 text-base pt-2 border-t border-cream-200">
                <span>Tổng cộng</span>
                <span className="text-primary-600">{formatCurrency(total)}</span>
              </div>
              {loyaltyEarned > 0 && (
                <div className="flex items-center gap-1.5 text-xs text-yellow-600 mt-2 bg-yellow-50 p-2 rounded-lg">
                  <Award size={12} />
                  <span>Tích được <strong>{loyaltyEarned}</strong> điểm từ đơn này</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
