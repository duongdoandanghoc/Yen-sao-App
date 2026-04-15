"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";
import { CATEGORIES } from "@/lib/constants";
import { ProductType } from "@/types";
import { Search, SlidersHorizontal, X } from "lucide-react";

interface ProductsClientProps {
  initialProducts: ProductType[];
}

export default function ProductsClient({ initialProducts }: ProductsClientProps) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "ALL");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  const products = useMemo(() => {
    let filtered = initialProducts.filter((p) => p.active);

    // Category filter
    if (selectedCategory !== "ALL") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.shortDescription.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query))
      );
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
        break;
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "featured":
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return filtered;
  }, [selectedCategory, searchQuery, sortBy, initialProducts]);

  return (
    <div className="container-custom py-8 md:py-12">
      <div className="text-center mb-8">
        <h1 className="section-title">Sản Phẩm Yến Sào</h1>
        <p className="section-subtitle">
          Khám phá bộ sưu tập yến sào cao cấp từ nguồn gốc tự nhiên
        </p>
        <div className="gold-divider mt-4" />
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brown-400" />
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-11"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-cream-100 rounded-lg"
            >
              <X size={16} className="text-brown-400" />
            </button>
          )}
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="input-field md:w-48"
        >
          <option value="featured">Nổi bật</option>
          <option value="price-asc">Giá: Thấp → Cao</option>
          <option value="price-desc">Giá: Cao → Thấp</option>
          <option value="rating">Đánh giá tốt nhất</option>
          <option value="newest">Mới nhất</option>
        </select>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden btn-secondary gap-2"
        >
          <SlidersHorizontal size={16} />
          Bộ lọc
        </button>
      </div>

      <div className={`flex flex-wrap gap-2 mb-8 ${showFilters ? "block" : "hidden md:flex"}`}>
        <button
          onClick={() => setSelectedCategory("ALL")}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            selectedCategory === "ALL"
              ? "bg-gold-gradient text-white shadow-gold-glow"
              : "bg-white text-brown-600 border border-cream-300 hover:border-primary-300"
          }`}
        >
          Tất cả
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              selectedCategory === cat.value
                ? "bg-gold-gradient text-white shadow-gold-glow"
                : "bg-white text-brown-600 border border-cream-300 hover:border-primary-300"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <p className="text-sm text-brown-500 mb-6">
        Hiển thị <span className="font-semibold text-brown-700">{products.length}</span> sản phẩm
      </p>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <span className="text-5xl mb-4 block">🔍</span>
          <p className="text-lg text-brown-600 font-medium">Không tìm thấy sản phẩm</p>
          <p className="text-sm text-brown-400 mt-1">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
          <button
            onClick={() => { setSearchQuery(""); setSelectedCategory("ALL"); }}
            className="btn-secondary mt-4"
          >
            Xóa bộ lọc
          </button>
        </div>
      )}
    </div>
  );
}
