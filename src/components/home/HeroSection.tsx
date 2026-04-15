import Link from "next/link";
import { ArrowRight, Shield, Truck, Award } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream-50 via-cream-100 to-cream-50">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-100/20 rounded-full blur-3xl" />

      <div className="container-custom relative py-16 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full mb-6">
              <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-primary-700">Yến Sào Bình An - 100% Yến sào tự nhiên</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-brown-900 leading-tight">
              <span className="text-gradient-gold">Yến Sào Bình An</span>
              <br />
              Đậm Vị Mộc Miên
              <br />
              Vẹn Nguyên Tâm Ý
            </h1>

            <p className="mt-6 text-lg text-brown-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Tuyệt phẩm Yến sào nguyên chất thu hoạch từ vách đá thiên nhiên. Kết tinh tinh hoa của đại dương mênh mông, mang đến sự Bình An và Sức Khỏe thịnh vượng cho gia đình bạn.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
              <Link href="/products" className="btn-primary text-base px-8 py-4 gap-2">
                Khám phá sản phẩm
                <ArrowRight size={18} />
              </Link>
              <Link href="/recommendation" className="btn-secondary text-base px-8 py-4">
                Tư vấn miễn phí
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mt-10">
              <div className="flex items-center gap-2 text-sm text-brown-600">
                <Shield size={18} className="text-primary-500" />
                <span>Cam kết chính hãng</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-brown-600">
                <Truck size={18} className="text-primary-500" />
                <span>Giao hàng toàn quốc</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-brown-600">
                <Award size={18} className="text-primary-500" />
                <span>Chất lượng hàng đầu</span>
              </div>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="hidden lg:flex justify-center animate-slide-up">
            <div className="relative">
              <div className="w-80 h-80 xl:w-96 xl:h-96 rounded-full bg-cream-100 flex items-center justify-center shadow-gold-glow overflow-hidden relative group">
                <img src="/images/products/readytoeat-collagen-1.png" alt="Sản phẩm Yến Sào Bình An" className="w-full h-full object-cover animate-float" />
                
                {/* Brand Label Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-float" style={{ animationDelay: "0.2s" }}>
                  <div className="bg-white/85 backdrop-blur-md px-6 py-4 rounded-xl shadow-gold-glow transform -rotate-3 translate-y-12 border border-cream-200 flex flex-col items-center">
                    <span className="text-primary-600 font-serif font-bold text-xl tracking-widest uppercase">Yến Sào</span>
                    <span className="text-brown-900 font-serif font-black text-2xl tracking-[0.2em] uppercase mt-1">Bình An</span>
                    <div className="w-12 h-0.5 bg-gradient-gold mt-2"></div>
                  </div>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-warm-lg p-3 animate-float" style={{ animationDelay: "0.5s" }}>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⭐</span>
                  <div>
                    <p className="text-sm font-bold text-brown-900">4.8/5</p>
                    <p className="text-xs text-brown-500">500+ đánh giá</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-2 -left-8 bg-white rounded-2xl shadow-warm-lg p-3 animate-float" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🔥</span>
                  <div>
                    <p className="text-sm font-bold text-brown-900">1000+</p>
                    <p className="text-xs text-brown-500">Khách hàng tin dùng</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
