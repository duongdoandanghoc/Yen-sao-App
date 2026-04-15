"use client";

import { Link } from "next-view-transitions";
import { ShieldCheck, ArrowLeft, HeartHandshake, RefreshCcw, Send, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { CONTACT_INFO } from "@/lib/constants";

export default function ReturnPolicyPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    orderCode: "",
    reason: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Gửi trực tiếp email qua mailto (Tối ưu 100% không tốn DB)
    const subject = encodeURIComponent(`Yêu Cầu Đổi Trả Yến Sào - Đơn ${formData.orderCode}`);
    const body = encodeURIComponent(
      `Chào Bình An,\n\nTôi muốn yêu cầu đổi trả với thông tin như sau:\n\n` +
      `- Tên khách hàng: ${formData.name}\n` +
      `- Số điện thoại: ${formData.phone}\n` +
      `- Mã đơn hàng (nếu có): ${formData.orderCode}\n` +
      `- Lý do / Vấn đề gặp phải: ${formData.reason}\n\n` +
      `Mong shop xử lý giúp tôi. Xin cảm ơn!`
    );

    window.location.href = `mailto:${CONTACT_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bg-cream-50 min-h-screen py-16">
      <div className="container-custom max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-brown-500 hover:text-primary-600 transition-colors mb-8">
          <ArrowLeft size={16} />
          Trở về Trang chủ
        </Link>
        
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-gold-glow">
            <HeartHandshake size={36} className="text-primary-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brown-900 mb-6">
            Đổi Trả Dễ Dàng - An Tâm Trải Nghiệm
          </h1>
          <p className="text-lg text-brown-600 max-w-2xl mx-auto leading-relaxed">
            Tại Yến Sào Bình An, chúng tôi trao đi sức khỏe và nhận lại niềm tin. Bát yến của bạn phải thực sự hoàn hảo.
          </p>
        </div>

        <div className="card p-8 md:p-12 mb-8 bg-white border border-primary-100/50 shadow-warm-lg">
          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-brown-900 flex items-center gap-3 mb-6">
              <RefreshCcw size={24} className="text-primary-500" />
              1. Khung Thời Gian Đặc Biệt (Lưu Ý Quan Trọng)
            </h2>
            <div className="space-y-4 text-brown-700 leading-relaxed">
              <p>Khác với các dòng sản phẩm công nghiệp, Yến Sào Bình An đề cao tính tự nhiên nguyên bản. Vì vậy, chính sách đổi trả được phân tách rõ ràng để đảm bảo trải nghiệm tốt nhất:</p>
              
              <div className="bg-orange-50 border border-orange-200 p-5 rounded-2xl">
                 <h4 className="font-bold text-orange-900 flex items-center gap-2 mb-2">
                   <AlertTriangle size={18} className="text-orange-600" />
                   Đối với Yến Chưng Tươi (Không chất bảo quản)
                 </h4>
                 <p className="text-orange-800 text-sm">
                   Yến chưng sẵn của chúng tôi hoàn toàn <strong>không có chất bảo quản</strong>, hạn sử dụng vô cùng ngắn (tối đa 1 tháng ở nhiệt độ lạnh). 
                   Quý khách vui lòng kiểm tra và báo ngay cho shop đổi trả trong vòng <b>24 Giờ</b> kể từ khi nhận hàng nếu hũ yến có dấu hiệu bong nắp, sủi bọt, hoặc có mùi vị lạ do lỗi vận chuyển!
                 </p>
              </div>

              <div className="bg-primary-50 border border-primary-100 p-5 rounded-2xl">
                 <h4 className="font-bold text-primary-900 mb-2">Đối với Yến Thô & Yến Tinh Chế</h4>
                 <p className="text-primary-800 text-sm">
                   Quý khách có toàn quyền yêu cầu <b>1-ĐỔI-1 hoặc Hoàn Tiền</b> trong vòng <b>7 Ngày</b> sau khi nhận nếu sợi yến phát hiện không thật, bị vỡ vụn nghiêm trọng, hoặc không nở dai tự nhiên khi chưng.
                 </p>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-brown-900 flex items-center gap-3 mb-6">
              <ShieldCheck size={24} className="text-primary-500" />
              2. Tiêu Chuẩn Áp Dụng (Dành Cho Cả Hai Lên Tiếng)
            </h2>
            <div className="space-y-4 text-brown-700 leading-relaxed">
              <p>Dù luôn tin tưởng 100% vào sự trung thực của khách hàng, để đảm bảo vệ sinh an toàn thực phẩm, chúng tôi xin phép áp dụng quy định sau:</p>
              <ul className="list-disc pl-6 space-y-2 text-brown-600">
                <li><b className="text-brown-800">Quy cách đóng gói và tem chống hàng giả vẫn còn nguyên vẹn</b> (trừ trường hợp yến chưng tươi bị hỏng).</li>
                <li>Hộp quà tặng: Sản phẩm chưa có dấu hiệu bị bóc mở, sử dụng hoặc bảo quản sai cách (để nơi ẩm mốc, nắng gắt).</li>
              </ul>
            </div>
          </section>

          <section id="form-doi-tra">
            <h2 className="text-2xl font-serif font-bold text-brown-900 mb-6">Tạo Yêu Cầu Nhanh Vào Email Admin</h2>
            <div className="bg-cream-50 rounded-2xl p-6 md:p-8 border border-cream-200">
              <p className="text-brown-600 mb-6 text-sm">
                Phiếu yêu cầu này sẽ được nén và mã hóa chuyển thẳng vào hòm thư nội bộ của Giám Đốc cửa hàng mà không cần máy chủ trung gian phức tạp, đảm bảo phản hồi tức thì về điện thoại nội bộ.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-brown-800">Họ và tên của bạn</label>
                    <input 
                      required 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="VD: Nguyễn Văn A" 
                      className="w-full bg-white border border-cream-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-brown-800">Số điện thoại liên lạc</label>
                    <input 
                      required 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="VD: 0982..." 
                      className="w-full bg-white border border-cream-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50" 
                    />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-brown-800">Mã đơn hàng (Nếu nhớ)</label>
                  <input 
                    type="text" 
                    value={formData.orderCode}
                    onChange={(e) => setFormData({ ...formData, orderCode: e.target.value })}
                    placeholder="VD: BAN-12345" 
                    className="w-full bg-white border border-cream-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50" 
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-brown-800">Trở ngại bạn đang gặp là gì?</label>
                  <textarea 
                    required 
                    rows={4}
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    placeholder="Hộp yến giao đến bị móp méo, góc trái bị rách..." 
                    className="w-full bg-white border border-cream-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-none" 
                  />
                </div>

                <button type="submit" className="w-full btn-primary py-4 gap-2 text-base mt-2">
                  <Send size={18} />
                  Nhấn Để Gửi Ngay Cho Admin
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
