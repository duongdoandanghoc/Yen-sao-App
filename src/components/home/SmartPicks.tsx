"use client";

import { useEffect, useState } from "react";
import { useTracking } from "@/hooks/useTracking";
import { mockProducts } from "@/lib/mockData";
import ProductCard from "@/components/product/ProductCard";
import { ProductType } from "@/types";

export default function SmartPicks() {
  const { viewedCategories } = useTracking();
  const [recommended, setRecommended] = useState<ProductType[]>([]);

  useEffect(() => {
    if (viewedCategories.length === 0) return;

    // Tìm các sản phẩm thuộc danh mục đã xem gần đây (trừ những sản phẩm đang hết hàng)
    // Ưu tiên danh mục xem gần nhất nhất (index 0)
    let picks: ProductType[] = [];
    
    // Thuật toán Recommendation vi mô (Edge-level)
    for (const cat of viewedCategories) {
      const matches = mockProducts.filter(p => p.category === cat && p.active);
      picks = [...picks, ...matches];
    }
    
    // Trộn ngẫu nhiên nhẹ và lấy 4 cái đầu tiên
    const finalPicks = Array.from(new Set(picks)).sort(() => 0.5 - Math.random()).slice(0, 4);
    
    if (finalPicks.length > 0) {
      setRecommended(finalPicks as any);
    }
  }, [viewedCategories]);

  if (recommended.length === 0) return null;

  return (
    <section className="py-16 bg-cream-50 animate-fade-in relative overflow-hidden">
      {/* Decorative effect */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-100/30 rounded-full blur-3xl z-0" />
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-gradient rounded-full mb-4">
            <span className="text-xs font-bold text-white uppercase tracking-wider">Gợi ý dành riêng cho bạn</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-brown-900">Tiếp Tục Khám Phá</h2>
          <p className="mt-4 text-brown-600 max-w-2xl mx-auto">
            Hệ thống AI nhận thấy bạn đang quan tâm tới dòng Yến này. Dưới đây là những siêu phẩm phù hợp nhất với khẩu vị mộc miên của bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommended.map((product) => (
            <ProductCard key={product.slug} product={product as any} />
          ))}
        </div>
      </div>
    </section>
  );
}
