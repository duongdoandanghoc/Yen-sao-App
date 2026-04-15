"use client";

import Link from "next/link";
import { ProductType } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { formatCurrency, getCategoryLabel } from "@/lib/utils";
import { ShoppingBag, Star } from "lucide-react";

interface ProductCardProps {
  product: ProductType;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="card group overflow-hidden">
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block relative">
        <div className="aspect-square bg-cream-100 flex items-center justify-center overflow-hidden">
          <div className="w-full h-full group-hover:scale-110 transition-transform duration-500">
            {product.images && product.images.length > 0 ? (
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="text-6xl flex items-center justify-center h-full">
                {product.category === "RAW" ? "🪹" : product.category === "REFINED" ? "✨" : "🍯"}
              </div>
            )}
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.featured && (
            <span className="badge-gold text-xs">⭐ Nổi bật</span>
          )}
          {discount > 0 && (
            <span className="badge bg-error-500 text-white text-xs">-{discount}%</span>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <span className="text-xs font-medium text-primary-600 uppercase tracking-wide">
          {getCategoryLabel(product.category)}
        </span>

        {/* Name */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-serif font-semibold text-brown-900 mt-1 line-clamp-2 group-hover:text-primary-700 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={14}
                className={star <= Math.round(product.averageRating) ? "fill-primary-500 text-primary-500" : "text-cream-300"}
              />
            ))}
          </div>
          <span className="text-xs text-brown-500">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-3">
          <span className="text-lg font-bold text-primary-600">
            {formatCurrency(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-brown-400 line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Weight & Origin */}
        {product.weight && (
          <p className="text-xs text-brown-400 mt-1">{product.weight} • {product.origin}</p>
        )}

        {/* Add to Cart */}
        <button
          onClick={() => addItem(product)}
          className="w-full mt-3 flex items-center justify-center gap-2 py-2.5 bg-primary-50 text-primary-700 font-medium rounded-xl
                     hover:bg-gold-gradient hover:text-white transition-all duration-300 active:scale-[0.98]"
        >
          <ShoppingBag size={16} />
          <span className="text-sm">Thêm vào giỏ</span>
        </button>
      </div>
    </div>
  );
}
