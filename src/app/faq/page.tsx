import { Link } from "next-view-transitions";
import { MessageCircleQuestion, ArrowLeft, Star } from "lucide-react";

export const metadata = {
  title: "Câu Hỏi Thường Gặp - Yến Sào Bình An",
  description: "Trọn vẹn mọi thắc mắc của bạn về Yến Sào Bình An.",
};

const FAQS = [
  {
    question: "Tổ yến của Bình An có thực sự tự nhiên 100% không?",
    answer: "Tuyệt đối tự nhiên! Từng tổ yến tại Bình An được những người thợ yến lành nghề nhất tại Khánh Hòa tự tay hái trực tiếp từ các vách đá và nhà yến chuẩn sinh thái. Chúng tôi từ chối mọi chất tẩy trắng, đường hóa học, hay mủ trôm độn. Bạn đang thưởng thức những tinh hoa thuần khiết nhất mà đại ngàn chắt lọc."
  },
  {
    question: "Mua yến về lỡ chưng bị nát hay không nở thì làm sao?",
    answer: "Đừng lo lắng! Yến Sào Bình An hiểu rằng không phải ai cũng rành cách chưng yến. Khi bạn gặp vấn đề, bất kể là do chất lượng yến hay lỡ quá tay khi chế biến, chúng tôi cam kết quy định Đổi Trả 1-1 không chần chừ. Đội ngũ AI Tư vấn của chúng tôi cũng luôn túc trực 24/7 để làm 'chuyên gia chưng yến' đồng hành cùng bạn mảng bếp núc!"
  },
  {
    question: "Tôi muốn mua biếu đối tác, hộp quà có đủ sang trọng không?",
    answer: "Bình An không chỉ bán Yến, chúng tôi bán sự Đẳng Cấp và Lời Cảm Ơn. Tất cả các hộp Quà Tặng Yến Chưng, Yến Tinh Chế đều được thiết kế độc quyền, lót lụa tơ tằm, vỏ gỗ sơn mài hoặc bìa nhũ ánh kim. Đảm bảo khi gửi trao, người nhận sẽ cảm nhận trọn vẹn vị thế và tấm lòng của bạn."
  },
  {
    question: "Làm thế nào để phân biệt yến thật giả tại Bình An?",
    answer: "Bằng 'Hương', bằng 'Sắc', và bằng 'Hồ sơ kỹ thuật'. Mỗi sản phẩm gửi đến bạn đều đi kèm giấy chứng nhận VSATTP và một tờ cẩm nang nhận diện: Yến tự nhiên khi ngửi có mùi tanh nhẹ của biển, ngâm nước nở dai không bị vụn vữa. Hãy yên tâm, vì niềm tự hào lớn nhất của chúng tôi là làm ăn Trực Uy!"
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
