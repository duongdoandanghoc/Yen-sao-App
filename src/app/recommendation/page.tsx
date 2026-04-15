"use client";

import { useState } from "react";
import { mockProducts } from "@/lib/mockData";
import ProductCard from "@/components/product/ProductCard";
import { PURPOSES } from "@/lib/constants";
import { ProductType } from "@/types";
import { Sparkles, ArrowRight, RotateCcw } from "lucide-react";

export default function RecommendationPage() {
  const [ageRange, setAgeRange] = useState("");
  const [purposes, setPurposes] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [results, setResults] = useState<ProductType[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [reasoning, setReasoning] = useState("");

  const togglePurpose = (p: string) => {
    setPurposes((prev) => prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]);
  };

  const getRecommendations = () => {
    const allProducts = mockProducts.map((p, i) => ({
      ...p,
      id: `product-${i}`,
      createdAt: new Date().toISOString(),
    })) as ProductType[];

    let filtered = [...allProducts];
    let reason = "Dựa trên nhu cầu của bạn, ";

    // Filter by purpose
    if (purposes.includes("pregnancy")) {
      filtered = filtered.filter((p) => p.tags.includes("safe") || p.tags.includes("baby") || p.benefits.some((b) => b.toLowerCase().includes("bầu")));
      reason += "chúng tôi gợi ý sản phẩm an toàn cho bà bầu, ";
    }
    if (purposes.includes("beauty")) {
      filtered = filtered.filter((p) => p.tags.includes("beauty") || p.tags.includes("collagen") || p.tags.includes("women") || p.benefits.some((b) => b.toLowerCase().includes("da")));
      reason += "sản phẩm hỗ trợ làm đẹp da, ";
    }
    if (purposes.includes("gift")) {
      filtered = filtered.filter((p) => p.tags.includes("gift") || p.tags.includes("premium"));
      reason += "sản phẩm phù hợp làm quà tặng, ";
    }
    if (purposes.includes("health") || purposes.includes("elderly") || purposes.includes("recovery")) {
      filtered = filtered.filter((p) => p.tags.includes("health") || p.tags.includes("premium") || p.benefits.some((b) => b.toLowerCase().includes("miễn dịch") || b.toLowerCase().includes("phục hồi")));
      reason += "sản phẩm tăng cường sức khỏe, ";
    }

    // Filter by budget
    if (budget === "low") {
      filtered = filtered.filter((p) => p.price <= 1000000);
      reason += "trong tầm giá dưới 1 triệu đồng.";
    } else if (budget === "mid") {
      filtered = filtered.filter((p) => p.price >= 500000 && p.price <= 3500000);
      reason += "trong tầm giá 500k - 3.5 triệu đồng.";
    } else if (budget === "high") {
      filtered = filtered.filter((p) => p.price >= 2000000);
      reason += "sản phẩm cao cấp, chất lượng tốt nhất.";
    } else {
      reason += "phù hợp với mọi ngân sách.";
    }

    // Fallback - if no results, show featured
    if (filtered.length === 0) {
      filtered = allProducts.filter((p) => p.featured);
      reason = "Chúng tôi gợi ý những sản phẩm nổi bật và được yêu thích nhất.";
    }

    // Sort by rating
    filtered.sort((a, b) => b.averageRating - a.averageRating);

    setResults(filtered.slice(0, 4));
    setReasoning(reason);
    setShowResults(true);
  };

  const reset = () => {
    setAgeRange("");
    setPurposes([]);
    setBudget("");
    setResults([]);
    setShowResults(false);
    setReasoning("");
  };

  return (
    <div className="container-custom py-8 md:py-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sparkles size={28} className="text-primary-600" />
        </div>
        <h1 className="section-title">Tư Vấn Yến Sào</h1>
        <p className="section-subtitle">
          Trả lời một vài câu hỏi để chúng tôi gợi ý sản phẩm phù hợp nhất cho bạn
        </p>
        <div className="gold-divider mt-4" />
      </div>

      {!showResults ? (
        <div className="card p-6 md:p-8 max-w-2xl mx-auto animate-fade-in">
          {/* Age Range */}
          <div className="mb-8">
            <h3 className="font-serif font-semibold text-brown-900 mb-3">Độ tuổi của bạn?</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { value: "18-30", label: "18 - 30" },
                { value: "30-45", label: "30 - 45" },
                { value: "45-60", label: "45 - 60" },
                { value: "60+", label: "Trên 60" },
              ].map((age) => (
                <button
                  key={age.value}
                  onClick={() => setAgeRange(age.value)}
                  className={`p-3 rounded-xl text-sm font-medium transition-all ${
                    ageRange === age.value
                      ? "bg-gold-gradient text-white shadow-gold-glow"
                      : "bg-cream-100 text-brown-600 hover:bg-cream-200"
                  }`}
                >
                  {age.label}
                </button>
              ))}
            </div>
          </div>

          {/* Purpose */}
          <div className="mb-8">
            <h3 className="font-serif font-semibold text-brown-900 mb-3">Mục đích sử dụng? <span className="text-sm font-normal text-brown-400">(chọn nhiều)</span></h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PURPOSES.map((p) => (
                <button
                  key={p.value}
                  onClick={() => togglePurpose(p.value)}
                  className={`p-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                    purposes.includes(p.value)
                      ? "bg-gold-gradient text-white shadow-gold-glow"
                      : "bg-cream-100 text-brown-600 hover:bg-cream-200"
                  }`}
                >
                  <span>{p.icon}</span>
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div className="mb-8">
            <h3 className="font-serif font-semibold text-brown-900 mb-3">Ngân sách?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { value: "low", label: "Dưới 1 triệu", sub: "Tiết kiệm" },
                { value: "mid", label: "1 - 3.5 triệu", sub: "Phổ biến" },
                { value: "high", label: "Trên 3.5 triệu", sub: "Cao cấp" },
              ].map((b) => (
                <button
                  key={b.value}
                  onClick={() => setBudget(b.value)}
                  className={`p-3 rounded-xl text-sm font-medium transition-all ${
                    budget === b.value
                      ? "bg-gold-gradient text-white shadow-gold-glow"
                      : "bg-cream-100 text-brown-600 hover:bg-cream-200"
                  }`}
                >
                  <span className="block">{b.label}</span>
                  <span className={`text-xs ${budget === b.value ? "text-white/80" : "text-brown-400"}`}>{b.sub}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={getRecommendations}
            disabled={purposes.length === 0}
            className="btn-primary w-full py-3.5 gap-2"
          >
            <Sparkles size={18} />
            Nhận gợi ý sản phẩm
          </button>
        </div>
      ) : (
        <div className="animate-fade-in">
          {/* Reasoning */}
          <div className="card p-5 mb-8 border-l-4 border-primary-500">
            <div className="flex items-start gap-3">
              <Sparkles size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-brown-900 mb-1">Gợi ý từ AI</h3>
                <p className="text-sm text-brown-600">{reasoning}</p>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Reset */}
          <div className="text-center">
            <button onClick={reset} className="btn-secondary gap-2">
              <RotateCcw size={16} />
              Tư vấn lại
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
