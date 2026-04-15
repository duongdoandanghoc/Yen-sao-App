"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/utils";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "@/lib/constants";
import { Check, MapPin, CreditCard, ShoppingBag, ArrowLeft, Tag, X } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountError, setDiscountError] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const [shipping, setShipping] = useState({
    fullName: "",
    phone: "",
    street: "",
    ward: "",
    district: "",
    city: "",
    note: "",
  });

  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal - discountAmount + shippingFee;

  const applyDiscount = () => {
    setDiscountError("");
    const code = discountCode.toUpperCase().trim();
    
    // Mock discount validation
    const discounts: Record<string, { type: string; value: number; min: number }> = {
      YENSAO10: { type: "percent", value: 10, min: 500000 },
      FREESHIP: { type: "fixed", value: 30000, min: 300000 },
      WELCOME20: { type: "percent", value: 20, min: 1000000 },
    };

    const disc = discounts[code];
    if (!disc) {
      setDiscountError("Mã giảm giá không hợp lệ");
      return;
    }
    if (subtotal < disc.min) {
      setDiscountError(`Đơn hàng tối thiểu ${formatCurrency(disc.min)}`);
      return;
    }

    const amount = disc.type === "percent" ? (subtotal * disc.value) / 100 : disc.value;
    setDiscountAmount(amount);
    setDiscountApplied(true);
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
    } catch (error) {
      alert("Lỗi kết nối. Vui lòng kiểm tra lại mạng!");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="container-custom py-16 text-center">
        <ShoppingBag size={48} className="text-cream-300 mx-auto mb-4" />
        <h1 className="text-2xl font-serif font-bold text-brown-900">Giỏ hàng trống</h1>
        <p className="text-brown-500 mt-2">Thêm sản phẩm vào giỏ hàng để tiến hành đặt hàng</p>
        <Link href="/products" className="btn-primary mt-6 inline-flex">Tiếp tục mua sắm</Link>
      </div>
    );
  }

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
          <p className="text-lg font-bold text-primary-600 mt-1">{orderNumber}</p>
        </div>
        <p className="text-sm text-brown-500 mt-4">Chúng tôi sẽ liên hệ xác nhận đơn hàng qua điện thoại</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
          <Link href="/products" className="btn-primary">Tiếp tục mua sắm</Link>
          <Link href="/account/orders" className="btn-secondary">Xem đơn hàng</Link>
        </div>
      </div>
    );
  }

  const steps = [
    { num: 1, label: "Giao hàng", icon: MapPin },
    { num: 2, label: "Thanh toán", icon: CreditCard },
    { num: 3, label: "Xác nhận", icon: Check },
  ];

  const isShippingValid = shipping.fullName && shipping.phone && shipping.street && shipping.city;

  return (
    <div className="container-custom py-6 md:py-12">
      {/* Back */}
      <Link href="/products" className="inline-flex items-center gap-1 text-sm text-brown-500 hover:text-primary-600 mb-6 transition-colors">
        <ArrowLeft size={16} />
        Tiếp tục mua sắm
      </Link>

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
                  <input value={shipping.fullName} onChange={(e) => setShipping({...shipping, fullName: e.target.value})} className="input-field" placeholder="Nguyễn Văn A" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brown-700 mb-1">Số điện thoại *</label>
                  <input value={shipping.phone} onChange={(e) => setShipping({...shipping, phone: e.target.value})} className="input-field" placeholder="0901 234 567" required />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-brown-700 mb-1">Địa chỉ *</label>
                  <input value={shipping.street} onChange={(e) => setShipping({...shipping, street: e.target.value})} className="input-field" placeholder="Số nhà, đường" required />
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
                  <input value={shipping.city} onChange={(e) => setShipping({...shipping, city: e.target.value})} className="input-field" placeholder="TP. Hồ Chí Minh" required />
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
                  <input type="radio" name="payment" checked readOnly className="text-primary-500" />
                  <div className="flex-1">
                    <p className="font-medium text-brown-900">Thanh toán khi nhận hàng (COD)</p>
                    <p className="text-sm text-brown-500">Thanh toán bằng tiền mặt khi nhận hàng</p>
                  </div>
                  <span className="text-2xl">💵</span>
                </label>
                <label className="flex items-center gap-3 p-4 border border-cream-300 rounded-xl cursor-not-allowed opacity-50">
                  <input type="radio" name="payment" disabled />
                  <div className="flex-1">
                    <p className="font-medium text-brown-900">VNPay</p>
                    <p className="text-sm text-brown-500">Sắp ra mắt</p>
                  </div>
                  <span className="text-2xl">🏦</span>
                </label>
                <label className="flex items-center gap-3 p-4 border border-cream-300 rounded-xl cursor-not-allowed opacity-50">
                  <input type="radio" name="payment" disabled />
                  <div className="flex-1">
                    <p className="font-medium text-brown-900">MoMo</p>
                    <p className="text-sm text-brown-500">Sắp ra mắt</p>
                  </div>
                  <span className="text-2xl">📱</span>
                </label>
              </div>

              {/* Discount Code */}
              <div className="mt-6 pt-6 border-t border-cream-200">
                <label className="block text-sm font-medium text-brown-700 mb-2 flex items-center gap-1">
                  <Tag size={14} /> Mã giảm giá
                </label>
                {discountApplied ? (
                  <div className="flex items-center gap-2 p-3 bg-success-50 rounded-xl">
                    <Check size={16} className="text-success-500" />
                    <span className="text-sm text-success-600 font-medium">{discountCode.toUpperCase()} — Giảm {formatCurrency(discountAmount)}</span>
                    <button onClick={() => { setDiscountApplied(false); setDiscountAmount(0); setDiscountCode(""); }} className="ml-auto">
                      <X size={16} className="text-brown-400" />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} className="input-field flex-1" placeholder="Nhập mã giảm giá" />
                    <button onClick={applyDiscount} className="btn-secondary px-4 whitespace-nowrap">Áp dụng</button>
                  </div>
                )}
                {discountError && <p className="text-sm text-error-500 mt-1">{discountError}</p>}
                <p className="text-xs text-brown-400 mt-2">Thử: YENSAO10, FREESHIP, WELCOME20</p>
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
                    <div className="w-12 h-12 bg-cream-200 rounded-lg flex items-center justify-center text-xl">🏮</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-brown-900 truncate">{item.product.name}</p>
                      <p className="text-xs text-brown-500">x{item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-primary-600">{formatCurrency(item.product.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(2)} className="btn-secondary flex-1">Quay lại</button>
                <button onClick={placeOrder} disabled={loading} className="btn-primary flex-1">
                  {loading ? "Đang xử lý..." : "Đặt hàng"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h3 className="font-serif font-semibold text-brown-900 mb-4">Tóm tắt đơn hàng</h3>
            <div className="space-y-3 text-sm">
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
                <div className="flex justify-between  text-success-600">
                  <span>Giảm giá</span>
                  <span>-{formatCurrency(discountAmount)}</span>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
