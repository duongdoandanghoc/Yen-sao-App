import { Heart, Sun, Baby, Shield, Sparkles, Brain } from "lucide-react";

const benefits = [
  {
    icon: Heart,
    title: "Bổ Phổi, Dưỡng Âm",
    description: "Yến sào giúp bổ phổi, làm ấm cơ thể, hỗ trợ hệ hô hấp khỏe mạnh.",
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    icon: Sparkles,
    title: "Đẹp Da, Chống Lão Hóa",
    description: "Chứa EGF giúp tái tạo da, giữ ẩm và làm chậm quá trình lão hóa tự nhiên.",
    color: "text-primary-600",
    bg: "bg-primary-50",
  },
  {
    icon: Shield,
    title: "Tăng Cường Miễn Dịch",
    description: "Acid sialic trong yến sào tăng cường hệ miễn dịch, phòng chống bệnh tật.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Baby,
    title: "Tốt Cho Mẹ & Bé",
    description: "Cung cấp dưỡng chất thiết yếu cho mẹ bầu và hỗ trợ phát triển thai nhi.",
    color: "text-pink-500",
    bg: "bg-pink-50",
  },
  {
    icon: Brain,
    title: "Hỗ Trợ Trí Nhớ",
    description: "Các amino acid và acid sialic giúp tăng cường trí nhớ, tập trung.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Sun,
    title: "Phục Hồi Sức Khỏe",
    description: "Dễ hấp thu, giúp cơ thể phục hồi nhanh sau ốm, phẫu thuật.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
];

export default function BenefitsSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="section-title">Lợi Ích Của Yến Sào</h2>
          <p className="section-subtitle">
            Yến sào được khoa học chứng minh mang lại nhiều lợi ích sức khỏe vượt trội
          </p>
          <div className="gold-divider mt-4" />
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl border border-cream-200 hover:border-primary-200 hover:shadow-warm-md transition-all duration-300"
            >
              <div className={`w-12 h-12 ${benefit.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <benefit.icon size={24} className={benefit.color} />
              </div>
              <h3 className="font-serif font-semibold text-lg text-brown-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm text-brown-500 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
