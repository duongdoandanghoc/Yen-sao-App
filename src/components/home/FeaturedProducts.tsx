"use client";

import { Link } from "next-view-transitions";
import ProductCard from "@/components/product/ProductCard";
import { ProductType } from "@/types";
import { ArrowRight } from "lucide-react";

interface FeaturedProductsProps {
  products: Omit<ProductType, "id" | "createdAt">[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  // Add mock IDs and dates for display
  const productsWithIds = products.map((p, i) => ({
    ...p,
    id: `mock-${i}`,
    createdAt: new Date().toISOString(),
  }));

  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="section-title">Sản Phẩm Nổi Bật</h2>
          <p className="section-subtitle">
            Những sản phẩm yến sào được yêu thích nhất, chọn lọc kỹ lưỡng từ nguồn yến tự nhiên
          </p>
          <div className="gold-divider mt-4" />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productsWithIds.map((product) => (
            <ProductCard key={product.id} product={product as ProductType} />
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-10">
          <Link href="/products" className="btn-secondary gap-2 inline-flex">
            Xem tất cả sản phẩm
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
