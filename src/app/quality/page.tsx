import { APP_NAME } from "@/lib/constants";
import {
  ShieldCheck,
  Microscope,
  Leaf,
  Award,
  Truck,
  RefreshCw,
  FileCheck,
  ThermometerSun,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Link } from "next-view-transitions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cam kết chất lượng",
  description: `${APP_NAME} cam kết 100% yến sào tự nhiên. Quy trình kiểm soát chất lượng nghiêm ngặt từ nguồn gốc đến tay khách hàng.`,
};

const qualityPillars = [
  {
    icon: Leaf,
    title: "100% Tự Nhiên",
    subtitle: "Natural Origin",
    description:
      "Yến sào được thu hoạch trực tiếp từ các đảo yến tự nhiên tại Khánh Hòa, Phú Yên. Không sử dụng hóa chất tẩy trắng, không chất bảo quản, không phẩm màu nhân tạo.",
    highlights: [
      "Thu hoạch từ đảo yến tự nhiên",
      "Không tẩy trắng, không tẩm ướp",
      "Không chất bảo quản",
      "Giữ nguyên màu sắc tự nhiên",
    ],
  },
  {
    icon: Microscope,
    title: "Kiểm Định Nghiêm Ngặt",
    subtitle: "Rigorous Testing",
    description:
      "Mỗi lô hàng đều trải qua quy trình kiểm tra nhiều bước, lấy cảm hứng từ tiêu chuẩn kiểm soát chất lượng của các thương hiệu hàng đầu thế giới như Eu Yan Sang (Singapore) và Imperial Bird's Nest (Hong Kong).",
    highlights: [
      "Kiểm tra vi sinh vật gây hại",
      "Xét nghiệm dư lượng hóa chất",
      "Đánh giá hàm lượng protein",
      "Kiểm tra nitrite theo tiêu chuẩn quốc tế",
    ],
  },
  {
    icon: FileCheck,
    title: "Truy Xuất Nguồn Gốc",
    subtitle: "Full Traceability",
    description:
      "Theo mô hình truy xuất nguồn gốc của Nestlé và Whole Foods, mỗi sản phẩm của chúng tôi đều có mã truy xuất, cho phép bạn biết chính xác lô hàng được thu hoạch khi nào, ở đâu và bởi ai.",
    highlights: [
      "Mã truy xuất trên mỗi sản phẩm",
      "Thông tin vùng khai thác",
      "Ngày thu hoạch & đóng gói",
      "Chứng nhận kiểm định đi kèm",
    ],
  },
  {
    icon: ThermometerSun,
    title: "Bảo Quản Chuẩn Quốc Tế",
    subtitle: "Optimal Preservation",
    description:
      "Học hỏi từ chuỗi cung ứng lạnh (cold chain) của các thương hiệu cao cấp, sản phẩm được bảo quản trong điều kiện tối ưu từ khâu thu hoạch đến khi giao đến tay bạn.",
    highlights: [
      "Đóng gói chân không chống ẩm",
      "Vận chuyển trong điều kiện tối ưu",
      "Bao bì cách nhiệt cao cấp",
      "Hạn sử dụng rõ ràng",
    ],
  },
];

const certifications = [
  { label: "An toàn vệ sinh thực phẩm", icon: ShieldCheck },
  { label: "Kiểm định chất lượng", icon: Award },
  { label: "Giao hàng đảm bảo", icon: Truck },
  { label: "Đổi trả 7 ngày", icon: RefreshCw },
];

const comparison = [
  {
    feature: "Nguồn gốc yến",
    us: "Đảo yến tự nhiên, có truy xuất",
    others: "Không rõ nguồn gốc",
  },
  {
    feature: "Tẩy trắng / Tẩm ướp",
    us: "Không bao giờ",
    others: "Phổ biến trên thị trường",
  },
  {
    feature: "Kiểm định chất lượng",
    us: "Từng lô hàng",
    others: "Không có hoặc hình thức",
  },
  {
    feature: "Chính sách đổi trả",
    us: "7 ngày, không điều kiện",
    others: "Không hỗ trợ",
  },
  {
    feature: "Tư vấn sử dụng",
    us: "24/7 miễn phí",
    others: "Rất hạn chế",
  },
];

export default function QualityPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-800 via-primary-700 to-brown-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-96 h-96 bg-gold-400 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-primary-300 rounded-full blur-3xl" />
        </div>
        <div className="container-custom py-20 md:py-28 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
              <ShieldCheck size={16} className="text-gold-400" />
              <span className="text-cream-200">Tiêu chuẩn quốc tế</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-6">
              Cam kết chất lượng
              <br />
              <span className="text-gradient-gold">không thỏa hiệp</span>
            </h1>
            <p className="text-lg md:text-xl text-cream-300 leading-relaxed max-w-2xl mx-auto">
              Lấy cảm hứng từ tiêu chuẩn của những thương hiệu hàng đầu thế giới, 
              chúng tôi xây dựng quy trình kiểm soát chất lượng toàn diện — vì sức khỏe 
              của gia đình bạn xứng đáng được điều tốt nhất.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,74.7C672,75,768,53,864,42.7C960,32,1056,32,1152,37.3C1248,43,1344,53,1392,58.7L1440,64L1440,80L0,80Z" 
              className="fill-cream-50" />
          </svg>
        </div>
      </section>

      {/* Quality Pillars */}
      <section className="container-custom py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="section-title">4 trụ cột chất lượng</h2>
          <p className="section-subtitle">Mỗi sản phẩm đều phải đạt 100% các tiêu chí trước khi đến tay bạn</p>
          <div className="gold-divider mt-4" />
        </div>

        <div className="space-y-8 max-w-5xl mx-auto">
          {qualityPillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                className="card-elevated overflow-hidden group hover:scale-[1.01] transition-transform duration-300"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Left — Icon & Number */}
                  <div className="lg:w-20 bg-gradient-to-b from-primary-50 to-cream-100 flex items-center justify-center p-4 lg:p-0">
                    <span className="text-3xl font-serif font-bold text-primary-300 lg:hidden">0{index + 1}</span>
                    <span className="hidden lg:block text-3xl font-serif font-bold text-primary-300">0{index + 1}</span>
                  </div>
                  {/* Right — Content */}
                  <div className="flex-1 p-6 md:p-8 lg:p-10">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gold-gradient flex items-center justify-center flex-shrink-0 shadow-gold-glow">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-serif font-bold text-brown-900">
                          {pillar.title}
                        </h3>
                        <span className="text-sm text-primary-500 font-medium">{pillar.subtitle}</span>
                      </div>
                    </div>
                    <p className="text-brown-600 leading-relaxed mb-5">{pillar.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {pillar.highlights.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-brown-700">
                          <CheckCircle2 size={16} className="text-success-500 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-gradient-to-b from-cream-100 to-cream-50 py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">So sánh chất lượng</h2>
            <p className="section-subtitle">Sự khác biệt khi bạn chọn {APP_NAME}</p>
            <div className="gold-divider mt-4" />
          </div>

          <div className="max-w-3xl mx-auto card-elevated overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-primary-50 to-cream-100">
                    <th className="text-left py-4 px-6 text-brown-600 font-semibold text-sm">Tiêu chí</th>
                    <th className="text-center py-4 px-6 text-primary-700 font-bold text-sm">
                      🏆 {APP_NAME}
                    </th>
                    <th className="text-center py-4 px-6 text-brown-400 font-semibold text-sm">
                      Thị trường chung
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr key={i} className="border-t border-cream-200 hover:bg-cream-50 transition-colors">
                      <td className="py-4 px-6 text-sm font-medium text-brown-800">{row.feature}</td>
                      <td className="py-4 px-6 text-sm text-center text-success-600 font-medium">
                        <div className="flex items-center justify-center gap-1.5">
                          <CheckCircle2 size={14} />
                          {row.us}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-center text-brown-400">{row.others}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="container-custom py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="section-title">Chứng nhận & Cam kết</h2>
          <p className="section-subtitle">Những bảo đảm bạn nhận được khi mua hàng</p>
          <div className="gold-divider mt-4" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {certifications.map((cert, i) => {
            const Icon = cert.icon;
            return (
              <div
                key={i}
                className="card p-6 text-center group hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-3 group-hover:bg-gold-gradient group-hover:shadow-gold-glow transition-all duration-300">
                  <Icon className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h4 className="font-serif font-semibold text-brown-900 text-sm">{cert.label}</h4>
              </div>
            );
          })}
        </div>
      </section>

      {/* Promise Section */}
      <section className="bg-brown-900 text-white py-16 md:py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-5xl mb-6">🛡️</div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Lời hứa của chúng tôi
            </h2>
            <p className="text-lg text-cream-300 leading-relaxed mb-8">
              Nếu bạn nhận được sản phẩm không đúng mô tả, không đạt chất lượng, 
              hoặc đơn giản là bạn không hài lòng — chúng tôi cam kết <strong className="text-white">hoàn tiền 100%</strong> hoặc 
              đổi hàng mới trong vòng <strong className="text-white">7 ngày</strong>, không cần giải thích.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products" className="btn-primary gap-2">
                Mua sắm ngay
                <ArrowRight size={18} />
              </Link>
              <Link href="/contact" className="btn-secondary gap-2 !border-cream-600 !text-cream-200 hover:!bg-cream-200/10">
                Liên hệ tư vấn
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
