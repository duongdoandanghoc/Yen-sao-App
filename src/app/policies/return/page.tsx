import { Link } from "next-view-transitions";
import { ShieldCheck, ArrowLeft, HeartHandshake, RefreshCcw } from "lucide-react";

export const metadata = {
  title: "Chính Sách Đổi Trả - Yến Sào Bình An",
  description: "Trải nghiệm Đổi trả chuẩn Quốc tế 5 Sao. Quyền lợi của bạn là ưu tiên số một của chúng tôi.",
};

export default function ReturnPolicyPage() {
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
            Lời Hứa Đồng Hành Trọn Vẹn
          </h1>
          <p className="text-lg text-brown-600 max-w-2xl mx-auto leading-relaxed">
            Tại Yến Sào Bình An, chúng tôi không "bán hàng". Chúng tôi trao đi sức khỏe và 
            nhận lại niềm tin. Bát yến của bạn phải thực sự hoàn hảo.
          </p>
        </div>

        <div className="card p-8 md:p-12 mb-8 bg-white border border-primary-100/50 shadow-warm-lg">
          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-brown-900 flex items-center gap-3 mb-6">
              <RefreshCcw size={24} className="text-primary-500" />
              1. Đặc Quyền Đổi Trả 7 Ngày Tự Do
            </h2>
            <div className="space-y-4 text-brown-700 leading-relaxed">
              <p>
                Để bạn hoàn toàn an tâm trao gửi sức khỏe, Yến Sào Bình An áp dụng chính sách <b>1-ĐỔI-1</b> hoặc <b>HOÀN TIỀN 100%</b> trong vòng 7 ngày đầu tiên sau khi nhận hàng. Bất cứ khi nào bạn cảm thấy:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-brown-600">
                <li>Sợi yến khi chưng không nở dai, thơm tự nhiên như cam kết.</li>
                <li>Quà tặng bị móp méo, trầy xước trong quá trình di chuyển khiến bạn mất vui.</li>
                <li>Sản phẩm giao không đúng chủng loại, hoặc không phù hợp với khẩu vị của người được đem tặng.</li>
              </ul>
              <p className="mt-4 font-medium text-primary-700 bg-primary-50 p-4 rounded-xl border border-primary-100">
                Chỉ cần bạn thông báo, chúng tôi sẽ cho bưu tá đến tận nhà tút lại hộp yến mới hoặc hoàn tiền ngay trong vòng 24H mà không cần bạn phải giải trình hay chờ đợi mệt mỏi!
              </p>
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
                <li>Sản phẩm yến thô và tinh chế: <b className="text-brown-800">Quy cách đóng gói và tem chống hàng giả vẫn còn nguyên vẹn.</b> (Với trường hợp chất lượng yến khi chưng có vấn đề, Yến Sào Bình An sẽ thu hồi toàn bộ phân lượng yến còn lại để đưa về phòng thí nghiệm kiểm tra).</li>
                <li>Hộp quà tặng: Sản phẩm chưa có dấu hiệu bị bóc mở, sử dụng hoặc bảo quản sai cách (để nơi ẩm mốc, nắng gắt).</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-brown-900 mb-6">Cách Thức Trải Nghiệm Quyền Lợi</h2>
            <div className="bg-brown-900 rounded-2xl p-6 text-cream-100">
              <p className="mb-4">Chỉ mất 2 bước duy nhất để chúng tôi phục vụ bạn:</p>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-gold-gradient text-white flex justify-center items-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Gửi Yêu Cầu</h4>
                    <p className="text-sm text-cream-300">Nhắn tin cho Chatbot hoặc liên hệ trực tiếp số Hotline: <b>0982 812 936</b>. Mọi yêu cầu được ghi nhận tự động ngày và đêm.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-gold-gradient text-white flex justify-center items-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Nghỉ Ngơi & Nhận Kết Quả</h4>
                    <p className="text-sm text-cream-300">Nhân viên của chúng tôi sẽ gọi lại ngay lập tức để xác nhận địa chỉ hoàn trả miễn phí. Bạn không phải chịu bất cứ rủi ro tài chính nào.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
