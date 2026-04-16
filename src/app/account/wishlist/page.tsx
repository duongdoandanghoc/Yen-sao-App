"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { ChevronRight, Loader2, Heart, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "next-view-transitions";
import { useCart } from "@/contexts/CartContext";
import { formatCurrency } from "@/lib/utils";

interface WishlistItem {
  id: string;
  productId: string;
  createdAt: string;
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    originalPrice?: number | null;
    images: string[];
    category: string;
    stock: number;
    averageRating: number;
  };
}

export default function WishlistPage() {
  const { status } = useSession();
  const { addItem } = useCart();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") fetchWishlist();
    else if (status !== "loading") setLoading(false);
  }, [status]);

  const fetchWishlist = async () => {
    try {
      const res = await fetch("/api/account/wishlist");
      const data = await res.json();
      if (res.ok) setItems(data.items || []);
    } catch {} finally { setLoading(false); }
  };

  const removeItem = async (wishlistId: string) => {
    try {
      await fetch(`/api/account/wishlist?id=${wishlistId}`, { method: "DELETE" });
      setItems(items.filter(i => i.id !== wishlistId));
    } catch { alert("Lỗi kết nối"); }
  };

  const addToCart = (item: WishlistItem) => {
    addItem(item.product as any);
  };

  if (loading || status === "loading") {
    return <div className="container-custom py-16 text-center"><Loader2 size={32} className="animate-spin mx-auto mb-4 text-brown-400" /><p className="text-brown-500">Đang tải...</p></div>;
  }

  return (
    <div className="container-custom py-8 md:py-12 max-w-3xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/account" className="text-sm text-brown-500 hover:text-primary-600">Tài khoản</Link>
        <ChevronRight size={14} className="text-brown-400" />
        <span className="text-sm font-medium text-brown-900">Sản phẩm yêu thích</span>
      </div>

      <h1 className="text-2xl font-serif font-bold text-brown-900 mb-6 flex items-center gap-2">
        <Heart size={28} className="text-pink-500" /> Sản phẩm yêu thích
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-16 card">
          <Heart size={48} className="text-cream-300 mx-auto mb-4" />
          <p className="text-brown-500">Chưa có sản phẩm yêu thích nào</p>
          <Link href="/products" className="btn-primary mt-4 inline-flex">Khám phá sản phẩm</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item) => (
            <div key={item.id} className="card overflow-hidden group">
              <Link href={`/products/${item.product.slug}`} className="block">
                <div className="aspect-[4/3] bg-cream-100 flex items-center justify-center overflow-hidden">
                  {item.product.images?.length > 0 ? (
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <span className="text-4xl">{item.product.category === "RAW" ? "🪹" : item.product.category === "REFINED" ? "✨" : "🍯"}</span>
                  )}
                </div>
              </Link>
              <div className="p-4">
                <Link href={`/products/${item.product.slug}`}>
                  <h3 className="font-serif font-semibold text-brown-900 group-hover:text-primary-700 transition-colors line-clamp-2">{item.product.name}</h3>
                </Link>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-lg font-bold text-primary-600">{formatCurrency(item.product.price)}</span>
                  {item.product.originalPrice && (
                    <span className="text-sm text-brown-400 line-through">{formatCurrency(item.product.originalPrice)}</span>
                  )}
                </div>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => addToCart(item)} className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-primary-50 text-primary-700 font-medium rounded-xl hover:bg-gold-gradient hover:text-white transition-all text-sm">
                    <ShoppingBag size={14} /> Thêm giỏ
                  </button>
                  <button onClick={() => removeItem(item.id)} className="p-2 text-brown-400 hover:text-error-500 hover:bg-error-50 rounded-xl transition">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
