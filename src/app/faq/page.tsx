import { Link } from "next-view-transitions";
import { MessageCircleQuestion, ArrowLeft, Star } from "lucide-react";

export const metadata = {
  title: "Câu Hỏi Thường Gặp - Yến Sào Bình An",
  description: "Trọn vẹn mọi thắc mắc của bạn về Yến Sào Bình An.",
};

const FAQS = [
  {
    question: "Tổ yến của Bình An có thực sự tự nhiên 100% không?",
    answer: "Tuyệt đối tự nhiên! Hơn 10 năm qua, gia đình chúng tôi tự tay chọn lọc từng tổ yến nguyên bản nhất. Không qua xưởng lớn, không sản xuất hàng loạt, mỗi gram yến đều được những người thợ gia đình tỉ mẩn làm sạch thủ công bằng nhíp chuyên dụng. Trải qua hơn một thập kỷ, Bình An tự hào chưa từng dùng đến dù chỉ một giọt chất tẩy trắng hay hương liệu công nghiệp nào."
  },
  {
    question: "Tại sao yến Bình An ít làm quảng cáo hay xin các loại giấy tờ truyền thống?",
    answer: "Khởi nguồn từ một xưởng sấy yến nhỏ của gia đình mười năm trước, khách hàng chủ yếu của chúng tôi là các vị sếp lớn ở tỉnh, những gia đình có 'gu' thưởng thức sành sỏi và những người con tìm thuốc quý phục hồi sức khỏe cho cha mẹ ôm đau. Uy tín của Bình An không đến từ một tờ giấy chứng nhận đóng khung treo tường, mà đến từ niềm tin truyền miệng vô giá của những vị khách khó tính nhất suốt thập kỷ qua."
  },
  {
    question: "Mua yến về lỡ chưng bị nát hay không nở thì làm sao?",
    answer: "Đừng lo lắng! Yến Sào Bình An hiểu rằng chất lượng của một mẻ yến tươi phụ thuộc rất nhiều vào công đoạn chưng cất. Dù lỗi do chất lượng tổ hay đôi khi lỡ quá tay khi đứng bếp, xin bạn cứ thoải mái liên hệ! Chúng tôi sẵn sàng '1 Đổi 1' không chần chừ, bởi Bình An không muốn bán cho bạn một hũ yến hỏng mà muốn giữ lại một người bạn trọn đời."
  },
  {
    question: "Tôi muốn mua biếu đối tác quan trọng, hộp quà có đủ sang trọng không?",
    answer: "Tuy là sản phẩm do gia đình tự làm (home-made) với chất lượng cốt lõi đặt lên hàng đầu, nhưng bao bì của Bình An tuyệt đối không qua loa. Tất cả các hộp Quà Tặng Yến Chưng, Yến Tinh Chế đều được thiết kế độc quyền, lót lụa tơ tằm, vỏ gỗ sơn mài hoặc bìa nhũ ánh kim. Đảm bảo khi gửi trao, người nhận sẽ cảm nhận trọn vẹn vị thế sự đẳng cấp và sự cầu thị trong tấm lòng của bạn."
  },
  {
    question: "Yến chưng tươi tại sao chỉ bảo quản được lâu nhất 1 tháng?",
    answer: "Chào mừng bạn đến với định nghĩa 'Tươi Nguyên Bản'. Khác với dòng yến công nghiệp chưng sẵn để trên kệ hàng siêu thị từ năm này qua tháng khác, yến của gia đình chúng tôi chỉ bắt đầu đỏ lửa chưng khi nhận được đơn đặt hàng của bạn. Vì không sử dụng bất kỳ một hợp chất bảo quản nào, hũ yến bạn cầm trên tay chính là một món ăn thanh tao vừa nấu xong từ nhà bếp, cần được nâng niu trong tủ lạnh và thưởng thức ngay khi dưỡng chất dồi dào nhất."
  }
];

export default function FAQPage() {
  return (
    <div className="bg-cream-50 min-h-screen py-16">
      <div className="container-custom max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-brown-500 hover:text-primary-600 transition-colors mb-8">
          <ArrowLeft size={16} />
          Trở về Trang chủ
        </Link>
        
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-gold-glow">
            <MessageCircleQuestion size={36} className="text-primary-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brown-900 mb-6">
            Trò Chuyện Cùng Chuyên Gia
          </h1>
          <p className="text-lg text-brown-600 max-w-2xl mx-auto leading-relaxed">
            Chúng tôi hiểu, gửi gắm sức khỏe là một quyết định hệ trọng. Dưới đây là những câu trả lời 
            chân thành nhất để xóa tan mọi nghi ngại trong bạn.
          </p>
        </div>

        <div className="space-y-6 animate-fade-in">
          {FAQS.map((faq, index) => (
            <div key={index} className="card p-6 md:p-8 bg-white border border-primary-100 hover:shadow-warm-lg transition-all group">
              <h3 className="text-xl font-serif font-bold text-brown-900 mb-4 flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-gold-gradient text-white flex justify-center items-center font-bold text-sm flex-shrink-0 shadow-sm">
                  {index + 1}
                </span>
                <span className="mt-1">{faq.question}</span>
              </h3>
              <div className="pl-12">
                <p className="text-brown-600 leading-relaxed">
                  {faq.answer}
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs font-medium text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Star size={12} className="fill-primary-500" /> Được chứng thực bởi Ban Giám Đốc
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
