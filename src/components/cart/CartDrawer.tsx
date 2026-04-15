"use client";

import { Link } from "next-view-transitions";
import { useCart } from "@/contexts/CartContext";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "@/lib/constants";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, totalItems } = useCart();

  if (!isOpen) return null;

  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const freeShippingRemaining = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 z-50 animate-fade-in" onClick={closeCart} />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl animate-slide-in-right flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-cream-200">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-primary-600" />
            <h2 className="font-serif font-bold text-lg text-brown-900">
              Giỏ hàng ({totalItems})
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-cream-100 rounded-xl transition-colors"
            aria-label="Đóng giỏ hàng"
          >
            <X size={20} className="text-brown-600" />
          </button>
        </div>

        {/* Free shipping progress */}
        {subtotal > 0 && subtotal < FREE_SHIPPING_THRESHOLD && (
          <div className="px-4 py-3 bg-primary-50 border-b border-primary-100">
            <p className="text-sm text-brown-700">
              Mua thêm <span className="font-semibold text-primary-700">{formatCurrency(freeShippingRemaining)}</span> để được <span className="font-semibold text-success-500">miễn phí giao hàng</span>
            </p>
            <div className="mt-2 h-2 bg-cream-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gold-gradient rounded-full transition-all duration-500"
                style={{ width: `${Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <ShoppingBag size={48} className="text-cream-300 mb-4" />
              <p className="text-brown-500 font-medium">Giỏ hàng trống</p>
              <p className="text-sm text-brown-400 mt-1">Hãy thêm sản phẩm yêu thích của bạn</p>
              <button onClick={closeCart} className="btn-primary mt-4 text-sm">
                Tiếp tục mua sắm
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3 p-3 bg-cream-50 rounded-xl">
                  {/* Product image placeholder */}
                  <div className="w-20 h-20 rounded-xl bg-cream-200 flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <span className="text-3xl">🏮</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm text-brown-900 truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-primary-600 font-semibold text-sm mt-0.5">
                      {formatCurrency(item.product.price)}
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity controls */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg bg-white border border-cream-300 hover:border-primary-300 transition-colors"
                          aria-label="Giảm số lượng"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg bg-white border border-cream-300 hover:border-primary-300 transition-colors"
                          aria-label="Tăng số lượng"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-1.5 text-brown-400 hover:text-error-500 hover:bg-error-50 rounded-lg transition-all"
                        aria-label="Xóa sản phẩm"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-cream-200 p-4 space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-sm text-brown-600">
                <span>Tạm tính</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-brown-600">
                <span>Phí giao hàng</span>
                <span className={shippingFee === 0 ? "text-success-500 font-medium" : ""}>
                  {shippingFee === 0 ? "Miễn phí" : formatCurrency(shippingFee)}
                </span>
              </div>
              <div className="flex justify-between font-semibold text-brown-900 pt-2 border-t border-cream-200">
                <span>Tổng cộng</span>
                <span className="text-primary-600 text-lg">{formatCurrency(subtotal + shippingFee)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              onClick={closeCart}
              className="btn-primary w-full text-center block"
            >
              Tiến hành đặt hàng
            </Link>
            <button
              onClick={closeCart}
              className="btn-secondary w-full text-sm"
            >
              Tiếp tục mua sắm
            </button>
          </div>
        )}
      </div>
    </>
  );
}
