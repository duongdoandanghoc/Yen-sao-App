"use client";

import { useState } from "react";
import { formatCurrency, getCategoryLabel } from "@/lib/utils";
import { Plus, Edit2, Trash2, Search, Eye, EyeOff } from "lucide-react";

interface ProductData {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number | null;
  images: string[];
  category: string;
  benefits: string[];
  usage?: string | null;
  tags: string[];
  stock: number;
  averageRating: number;
  reviewCount: number;
  featured: boolean;
  active: boolean;
  weight?: string | null;
  origin?: string | null;
  createdAt: string;
}

export default function AdminProductsClient({ initialProducts }: { initialProducts: ProductData[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const products = initialProducts.filter((p) =>
    searchQuery
      ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-bold text-brown-900">Quản lý sản phẩm</h1>
        <button className="btn-primary text-sm gap-2">
          <Plus size={16} />
          Thêm sản phẩm
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brown-400" />
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-field pl-11 bg-white"
        />
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-warm-sm border border-cream-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-cream-50 border-b border-cream-200">
                <th className="text-left py-4 px-4 text-brown-600 font-semibold">Sản phẩm</th>
                <th className="text-left py-4 px-4 text-brown-600 font-semibold">Loại</th>
                <th className="text-right py-4 px-4 text-brown-600 font-semibold">Giá</th>
                <th className="text-right py-4 px-4 text-brown-600 font-semibold">Kho</th>
                <th className="text-center py-4 px-4 text-brown-600 font-semibold">Trạng thái</th>
                <th className="text-right py-4 px-4 text-brown-600 font-semibold">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-cream-100 hover:bg-cream-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-cream-100 rounded-lg overflow-hidden flex items-center justify-center text-lg flex-shrink-0">
                        {product.images && product.images.length > 0 ? (
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <span>{product.category === "RAW" ? "🪹" : product.category === "REFINED" ? "✨" : "🍯"}</span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-brown-900">{product.name}</p>
                        <p className="text-xs text-brown-400">{product.weight}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="badge-gold text-xs">{getCategoryLabel(product.category)}</span>
                  </td>
                  <td className="py-3 px-4 text-right font-medium text-primary-600">
                    {formatCurrency(product.price)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className={`font-medium ${product.stock < 30 ? "text-error-500" : "text-brown-600"}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {product.featured && <span title="Nổi bật">⭐</span>}
                      {product.active ? (
                        <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                          <Eye size={12} /> Đang bán
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                          <EyeOff size={12} /> Ẩn
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-2 hover:bg-primary-50 rounded-lg text-brown-500 hover:text-primary-600 transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 hover:bg-error-50 rounded-lg text-brown-500 hover:text-error-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-sm text-brown-500 mt-4">
        Hiển thị {products.length} / {initialProducts.length} sản phẩm
      </p>
    </div>
  );
}
