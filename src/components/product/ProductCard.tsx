"use client";

import { Link } from "next-view-transitions";
import { ProductType } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { formatCurrency, getCategoryLabel } from "@/lib/utils";
import { ShoppingBag, Star, Heart } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";

interface ProductCardProps {
  product: ProductType;
  showWishlist?: boolean;
}

export default function ProductCard({ product, showWishlist = true }: ProductCardProps) {
  const { addItem } = useCart();
  const { data: session } = useSession();
  const [wishlisted, setWishlisted] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Flash sale active?
  const flashActive = product.flashSalePrice && product.flashSaleEnd
    ? new Date(product.flashSaleEnd) > new Date()
    : false;
  const displayPrice = flashActive ? product.flashSalePrice! : product.price;

  const handleAddToCart = () => {
    addItem({ ...product, price: displayPrice });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!session) {
      window.location.href = "/login";
      return;
    }
    if (wishlistLoading) return;
    setWishlistLoading(true);
    try {
      if (wishlisted) {
        // Can't remove without wishlist item ID here, so just toggle UI
        setWishlisted(false);
      } else {
        const res = await fetch("/api/account/wishlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: product.id }),
        });
        if (res.ok || res.status === 200) setWishlisted(true);
      }
    } catch {}
    finally { setWishlistLoading(false); }
  };

  return (
    <div className="card group overflow-hidden relative">
      {/* Wishlist Button */}
      {showWishlist && (
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center
            shadow transition-all duration-200
            ${wishlisted
              ? "bg-pink-500 text-white shadow-md scale-110"
              : "bg-white/80 text-brown-300 hover:text-pink-500 backdrop-blur-sm"}`}
          title={wishlisted ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
        >
          <Heart size={15} className={wishlisted ? "fill-white" : ""} />
        </button>
      )}

      {/* Flash Sale badge */}
      {flashActive && (
        <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg animate-pulse">
          ⚡ FLASH SALE
        </div>
      )}

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
        {!flashActive && (
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.featured && (
              <span className="badge-gold text-xs">⭐ Nổi bật</span>
            )}
            {discount > 0 && (
              <span className="badge bg-error-500 text-white text-xs">-{discount}%</span>
            )}
          </div>
        )}
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
          <span className={`text-lg font-bold ${flashActive ? "text-red-600" : "text-primary-600"}`}>
            {formatCurrency(displayPrice)}
          </span>
          {(discount > 0 || flashActive) && (
            <span className="text-sm text-brown-400 line-through">
              {formatCurrency(product.originalPrice || product.price)}
            </span>
          )}
        </div>

        {/* Weight & Origin */}
        {product.weight && (
          <p className="text-xs text-brown-400 mt-1">{product.weight} • {product.origin}</p>
        )}

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className={`w-full mt-3 flex items-center justify-center gap-2 py-2.5 font-medium rounded-xl
            transition-all duration-300 active:scale-[0.98] text-sm
            ${addedToCart
              ? "bg-green-500 text-white"
              : "bg-primary-50 text-primary-700 hover:bg-gold-gradient hover:text-white"}`}
        >
          <ShoppingBag size={16} />
          <span>{addedToCart ? "Đã thêm! ✓" : "Thêm vào giỏ"}</span>
        </button>
      </div>
    </div>
  );
}
