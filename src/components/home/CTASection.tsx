import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants";

export default function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-brown-900 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />

      <div className="container-custom relative text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
          Bạn Cần{" "}
          <span className="text-gradient-gold">Tư Vấn</span>?
        </h2>
        <p className="mt-4 text-lg text-cream-300 max-w-2xl mx-auto">
          Đội ngũ chuyên gia của chúng tôi sẵn sàng tư vấn miễn phí, giúp bạn chọn sản phẩm 
          yến sào phù hợp nhất với nhu cầu sức khỏe.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link href="/recommendation" className="btn-primary text-base px-8 py-4 gap-2">
            Tư vấn AI miễn phí
            <ArrowRight size={18} />
          </Link>
          <a href={CONTACT_INFO.phoneHref} className="btn-secondary text-base px-8 py-4 gap-2 bg-transparent border-cream-400 text-cream-200 hover:bg-cream-200/10 hover:border-cream-200">
            <Phone size={18} />
            {CONTACT_INFO.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

