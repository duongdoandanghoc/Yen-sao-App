"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { formatCurrency, getCategoryLabel } from "@/lib/utils";
import { ProductType } from "@/types";
import { ShoppingBag, Star, Minus, Plus, Truck, Shield, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function ProductDetailClient({ product }: { product: ProductType }) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "usage" | "reviews">("description");
  const { addItem } = useCart();

  const reviews = [
    { rating: 5, comment: "Yến rất ngon, sợi dày dai. Gia đình mình rất hài lòng!", userName: "Nguyễn Thanh Hoa" },
    { rating: 5, comment: "Mua làm quà biếu Tết, bao bì sang trọng, người nhận rất thích.", userName: "Trần Văn Minh" },
    { rating: 4, comment: "Chất lượng tốt, giao hàng nhanh. Sẽ mua lại lần sau.", userName: "Lê Thị Mai" },
    { rating: 5, comment: "Dùng cho bà bầu 3 tháng rất tốt, da đẹp lên nhiều.", userName: "Phạm Thị Hồng" }
  ];

  if (!product) {
    return (
      <div className="container-custom py-16 text-center">
        <span className="text-5xl block mb-4">😔</span>
        <h1 className="text-2xl font-serif font-bold text-brown-900">Sản phẩm không tồn tại</h1>
        <Link href="/products" className="btn-primary mt-6 inline-flex">Quay lại cửa hàng</Link>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="container-custom py-6 md:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-brown-500 mb-6">
        <Link href="/" className="hover:text-primary-600 transition-colors">Trang chủ</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-primary-600 transition-colors">Sản phẩm</Link>
        <span>/</span>
        <span className="text-brown-700 font-medium truncate">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="aspect-square bg-cream-100 rounded-2xl flex items-center justify-center overflow-hidden relative">
            <span className="text-[120px]">
              {product.category === "RAW" ? "🪹" : product.category === "REFINED" ? "✨" : "🍯"}
            </span>
            {discount > 0 && (
              <span className="absolute top-4 left-4 badge bg-error-500 text-white">-{discount}%</span>
            )}
            {product.featured && (
              <span className="absolute top-4 right-4 badge-gold">⭐ Nổi bật</span>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="animate-fade-in">
          {/* Category */}
          <span className="text-sm font-medium text-primary-600 uppercase tracking-wide">
            {getCategoryLabel(product.category)}
          </span>

          <h1 className="text-2xl md:text-3xl font-serif font-bold text-brown-900 mt-2">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={18}
                  className={star <= Math.round(product.averageRating) ? "fill-primary-500 text-primary-500" : "text-cream-300"}
                />
              ))}
            </div>
            <span className="text-sm text-brown-500">
              {product.averageRating} ({product.reviewCount} đánh giá)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mt-4">
            <span className="text-3xl font-bold text-primary-600">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-brown-400 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Short Description */}
          <p className="text-brown-600 mt-4 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Info badges */}
          {product.weight && (
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-brown-500">
              <span>📦 {product.weight}</span>
              <span>📍 {product.origin}</span>
              <span>📊 Còn {product.stock} sản phẩm</span>
            </div>
          )}

          {/* Quantity & Add to Cart */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <div className="flex items-center border border-cream-300 rounded-xl overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-3 hover:bg-cream-100 transition-colors"
                aria-label="Giảm"
              >
                <Minus size={18} />
              </button>
              <span className="px-6 py-3 font-medium text-lg border-x border-cream-300 min-w-[60px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-4 py-3 hover:bg-cream-100 transition-colors"
                aria-label="Tăng"
              >
                <Plus size={18} />
              </button>
            </div>

            <button
              onClick={() => addItem(product, quantity)}
              className="btn-primary flex-1 gap-2 text-base py-3"
            >
              <ShoppingBag size={20} />
              Thêm vào giỏ hàng
            </button>
          </div>

          {/* Trust signals */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-cream-200">
            <div className="flex items-center gap-2 text-sm text-brown-600">
              <Truck size={18} className="text-primary-500 flex-shrink-0" />
              <span>Miễn phí giao hàng từ 500k</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-brown-600">
              <Shield size={18} className="text-primary-500 flex-shrink-0" />
              <span>Cam kết chính hãng 100%</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-brown-600">
              <RotateCcw size={18} className="text-primary-500 flex-shrink-0" />
              <span>Đổi trả trong 7 ngày</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <div className="flex border-b border-cream-200 gap-1">
          {[
            { key: "description", label: "Mô tả sản phẩm" },
            { key: "usage", label: "Hướng dẫn sử dụng" },
            { key: "reviews", label: `Đánh giá (${product.reviewCount})` },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 md:px-6 py-3 text-sm font-medium border-b-2 transition-all ${
                activeTab === tab.key
                  ? "border-primary-500 text-primary-700"
                  : "border-transparent text-brown-500 hover:text-brown-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="py-6">
          {activeTab === "description" && (
            <div className="prose prose-sm max-w-none animate-fade-in">
              <p className="text-brown-600 leading-relaxed">{product.description}</p>
              
              <h3 className="font-serif font-semibold text-brown-900 mt-6 mb-3">Lợi ích</h3>
              <ul className="space-y-2">
                {product.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-brown-600">
                    <span className="text-primary-500 mt-0.5">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "usage" && (
            <div className="animate-fade-in">
              <p className="text-brown-600 leading-relaxed">{product.usage}</p>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-4 animate-fade-in">
              {reviews.slice(0, 4).map((review, i) => (
                <div key={i} className="p-4 bg-cream-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary-700">{review.userName[0]}</span>
                    </div>
                    <span className="font-medium text-sm text-brown-900">{review.userName}</span>
                    <div className="flex ml-auto">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={14} className={star <= review.rating ? "fill-primary-500 text-primary-500" : "text-cream-300"} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-brown-600">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
