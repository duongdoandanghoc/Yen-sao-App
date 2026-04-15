import { APP_NAME, CONTACT_INFO } from "@/lib/constants";
import { Heart, Shield, Leaf, Award, Users, Clock, MapPin, Star } from "lucide-react";
import { Link } from "next-view-transitions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Về chúng tôi",
  description: `Câu chuyện ${APP_NAME} — Hành trình mang yến sào thiên nhiên đến mọi gia đình Việt`,
};

const milestones = [
  {
    year: "Khởi nguồn (Hơn 10 năm trước)",
    title: "Từ mâm yến nhỏ của gia đình",
    description:
      "Bình An không bắt đầu bằng một bản kế hoạch kinh doanh hoành tráng. Mọi thứ bắt nguồn từ hơn 10 năm trước, khi gia đình chúng tôi tự tay nhặt những tổ yến thuần khiết nhất từ vách đá để bồi bổ cho người thân ốm đau. Sự thủ công, tỉ mỉ và cái tâm của người nhà làm cho nhau chính là viên gạch đầu tiên.",
    icon: Heart,
  },
  {
    year: "Hành trình",
    title: "Chinh phục những vị khách khắt khe nhất",
    description:
      "Suốt một thập kỷ, Bình An hiếm khi xuất hiện trên các quảng cáo rầm rộ hay sở hữu những tờ giấy chứng nhận hào nhoáng. Thế nhưng, sản phẩm của chúng tôi luôn cháy hàng nhờ sự truyền miệng của các vị sếp lớn ở tỉnh, những gia đình sành ăn, và những người con tìm thuốc quý phục hồi sức khỏe cho cha mẹ.",
    icon: MapPin,
  },
  {
    year: "Cam kết",
    title: "100% thủ công nguyên bản, không thỏa hiệp",
    description:
      "Mỗi tổ yến đều được kiểm tra kỹ lưỡng bởi những người thợ gia đình kinh nghiệm nhất. Chúng tôi nói không với yến tẩm ướp, yến pha trộn, chà thuốc tẩy hay bất kỳ hóa chất bảo quản nào. Sản phẩm đến tay bạn là sự chắt lọc tinh hoa từ đôi bàn tay cần mẫn.",
    icon: Shield,
  },
  {
    year: "Hiện tại",
    title: "Di sản sức khỏe trao tay",
    description:
      "Hàng nghìn gia đình đã coi Bình An như một 'người giữ kho báu sức khỏe' bí mật của dòng họ. Không chỉ là yến sào, mỗi hộp quà gửi đi mang theo uy tín và lời cam kết bất diệt về một chữ 'TÂM' suốt hơn 10 năm qua.",
    icon: Users,
  },
];

const values = [
  {
    icon: Leaf,
    title: "Thuần tự nhiên",
    description: "Không hóa chất, không chất bảo quản, không tẩm ướp. Yến sào nguyên bản 100%.",
  },
  {
    icon: Shield,
    title: "Nguồn gốc minh bạch",
    description: "Mỗi sản phẩm đều có thể truy xuất nguồn gốc rõ ràng đến vùng khai thác.",
  },
  {
    icon: Award,
    title: "Chất lượng hàng đầu",
    description: "Chỉ tuyển chọn yến loại A — sợi dài, dày, đều màu, giàu dinh dưỡng nhất.",
  },
  {
    icon: Clock,
    title: "Tận tâm phục vụ",
    description: "Hỗ trợ tư vấn 24/7, giao hàng nhanh chóng, đổi trả dễ dàng trong 7 ngày.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brown-900 via-brown-800 to-brown-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-gold-400 rounded-full blur-3xl" />
        </div>
        <div className="container-custom py-20 md:py-28 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-primary-300 text-sm font-semibold tracking-widest uppercase mb-4">
              Câu chuyện của chúng tôi
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-6">
              Không chỉ bán yến sào,
              <br />
              <span className="text-gradient-gold">chúng tôi trao gửi niềm tin</span>
            </h1>
            <p className="text-lg md:text-xl text-cream-300 leading-relaxed max-w-2xl mx-auto">
              {APP_NAME} được sinh ra từ một mong muốn giản dị: mang đến nguồn yến sào thật sự 
              an toàn và tinh khiết cho sức khỏe mọi gia đình Việt Nam.
            </p>
          </div>
        </div>
        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,74.7C672,75,768,53,864,42.7C960,32,1056,32,1152,37.3C1248,43,1344,53,1392,58.7L1440,64L1440,80L0,80Z" 
              className="fill-cream-50" />
          </svg>
        </div>
      </section>

      {/* Story Timeline */}
      <section className="container-custom py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="section-title">Hành trình của chúng tôi</h2>
          <p className="section-subtitle">Từ tình yêu gia đình đến sứ mệnh mang yến sào tự nhiên đến mọi nhà</p>
          <div className="gold-divider mt-4" />
        </div>

        <div className="max-w-4xl mx-auto">
          {milestones.map((milestone, index) => {
            const Icon = milestone.icon;
            return (
              <div key={index} className="relative flex gap-6 md:gap-10 mb-12 last:mb-0">
                {/* Timeline line */}
                {index < milestones.length - 1 && (
                  <div className="absolute left-6 md:left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-primary-300 to-cream-200" />
                )}
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gold-gradient flex items-center justify-center shadow-gold-glow relative z-10">
                    <Icon className="w-5 h-5 md:w-7 md:h-7 text-white" />
                  </div>
                </div>
                {/* Content */}
                <div className="card p-6 md:p-8 flex-1 group hover:scale-[1.01] transition-transform duration-300">
                  <span className="text-sm font-semibold text-primary-600 tracking-wider uppercase">
                    {milestone.year}
                  </span>
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-brown-900 mt-1 mb-3">
                    {milestone.title}
                  </h3>
                  <p className="text-brown-600 leading-relaxed">{milestone.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-gradient-to-b from-cream-100 to-cream-50 py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Giá trị cốt lõi</h2>
            <p className="section-subtitle">Những nguyên tắc không bao giờ thay đổi</p>
            <div className="gold-divider mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="card-elevated p-6 text-center group hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold-gradient group-hover:shadow-gold-glow transition-all duration-300">
                    <Icon className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-serif font-bold text-brown-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-brown-500 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Quote */}
      <section className="container-custom py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-6xl mb-6">🕊️</div>
          <blockquote className="text-2xl md:text-3xl font-serif text-brown-800 leading-relaxed italic mb-6">
            &ldquo;Chúng tôi không bán thứ mà chúng tôi không dám cho gia đình mình dùng.&rdquo;
          </blockquote>
          <p className="text-primary-600 font-semibold">— Đội ngũ {APP_NAME}</p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-brown-900 text-white py-16">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            {[
              { number: "1000+", label: "Gia đình tin dùng" },
              { number: "100%", label: "Yến tự nhiên" },
              { number: "7 ngày", label: "Đổi trả miễn phí" },
              { number: "5⭐", label: "Đánh giá trung bình" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl md:text-4xl font-serif font-bold text-gradient-gold mb-2">
                  {stat.number}
                </div>
                <div className="text-cream-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-custom py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="section-title mb-4">Sẵn sàng trải nghiệm?</h2>
          <p className="section-subtitle mb-8">
            Khám phá bộ sưu tập yến sào cao cấp hoặc liên hệ để được tư vấn miễn phí.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="btn-primary gap-2">
              <Star size={18} />
              Xem sản phẩm
            </Link>
            <Link href="/contact" className="btn-secondary gap-2">
              Liên hệ tư vấn
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
