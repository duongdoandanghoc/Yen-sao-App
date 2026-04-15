"use client";

import { useState } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  role: "user" | "bot";
  content: string;
}

const botResponses: Record<string, { text: string; isHealthAttr: boolean }> = {
  "xin chào": { text: "Xin chào! 👋 Tôi là trợ lý AI ảo của Yến Sào Bình An (được vận hành dựa trên kiến thức chuyên môn về Yến Sào). Tôi có thể giúp bạn chọn sản phẩm phù hợp, hướng dẫn cách chưng, hoặc giải đáp thắc mắc sức khỏe. Bạn cần tư vấn gì ạ?", isHealthAttr: false },
  "yến": { text: "Thương hiệu Bình An có 3 dòng sản phẩm cực phẩm:\n🪹 **Yến thô** - Nguyên tổ tự nhiên thu hoạch từ đảo/hang đá\n✨ **Yến tinh chế** - Đã làm sạch lông 100%, sẵn sàng chế biến\n🍯 **Yến chưng sẵn** - Hũ tiện lợi dùng ngay với Hồng Sâm, Nhĩ Cốt, Nước Dừa\n\nBạn quan tâm dòng nào ạ?", isHealthAttr: false },
  "giá": { text: "Bảng giá tham khảo của Yến Sào Bình An:\n• Vụn yến khô tự nhiên: 900.000đ/100g\n• Yến sào nguyên tổ loại mộc: 1.800.000đ/100g\n• Yến sào Tinh Chế cao cấp: 3.500.000đ/100g\n• Yến Huyết / Yến Vàng siêu hiếm: 5.200.000đ/50g\n• Yến chưng sẵn chuyên sâu: 150.000đ-250.000đ/hũ\n\nBạn muốn tìm mua để dùng hay đi biếu tặng?", isHealthAttr: false },
  "bà bầu": { text: "Yến sào thực sự là nguồn 'vàng trắng' đối với mẹ bầu! 🤰\n- **Đầu thai kỳ:** Nên dùng cực ít và bắt buộc thêm gừng ấm để kiềm tính hàn làm lạnh dạ dày, giảm ốm nghén.\n- **Tháng 4 trở đi:** Dùng tuyệt vời! Hàm lượng Axit Sialic khổng lồ giúp phát triển thần kinh thai nhi, trong khi Canxi và Collagen chống rạn da và loãng xương cho mẹ.\n- **Khuyên dùng:** Các dòng Yến Tinh Chế hạt mộc hoặc Yến vụn để dễ hấp thu.", isHealthAttr: true },
  "trẻ em": { text: "Cực kỳ tốt cho bé biếng ăn và miễn dịch kém! 👼\nTuy nhiên dạ dày bé còn non, mẹ chỉ nên nấu khoảng 1-2 gam/lần và ăn xen kẽ 2 ngày/lần. Yến giúp trị ho hắng dứt điểm và phát triển trí não vượt trội. Trẻ dưới 1 tuổi tuyệt đối chưa nên dùng.", isHealthAttr: true },
  "tim mạch": { text: "Yến sào hoàn toàn KHÔNG chứa mỡ động vật hay cholesterol tồi. Ngược lại, lượng kẽm và axit amin thiết yếu trong tổ yến giúp ổn định nhịp tim, chống cục máu đông và phục hồi thành mạch máu cực tốt. Người mắc bệnh tim mạch hoàn toàn nên dùng đều đặn như một liệu pháp bồi bổ thanh tịnh.", isHealthAttr: true },
  "tiểu đường": { text: "Bệnh nhân tiểu đường HOÀN TOÀN ĂN ĐƯỢC tổ yến vì bản chất yến không có đường. Tuy nhiên, khi chế biến quý khách phải chưng với đường thảo dược ăn kiêng, hạt sen, hoặc chưng lạt (không đường). Tuyệt đối tránh xa các loại Yến hũ chưng sẵn dùng đường phèn tự nhiên.", isHealthAttr: true },
  "người già": { text: "Đối với người lớn tuổi, yến sào là báu vật giúp phục hồi sinh khí, chống lại chứng suy nhược mãn tính, thoái hóa khớp và chứng chán ăn. Thành phần Leucine và Isoleucine hỗ trợ phục hồi sức khỏe thể chất siêu tốc.", isHealthAttr: true },
  "ho khan": { text: "Từ góc độ Đông Y học cổ truyền, Yến Sào có tính bình, vị ngọt thanh, đi trực tiếp vào Phế (phổi). Đặc trị các chứng ho lao, ho khan dai dẳng, viêm phế quản vô cùng hữu hiệu. Hãy chưng yến nấm tuyết dội thêm 2 lát gừng già nóng uống vào buổi tối.", isHealthAttr: true },
  "cách dùng": { text: "Nghệ Thuật Chưng Yến Hoàn Hảo:\n1️⃣ Ngâm yến trong nước kiềm (nhiệt độ phòng) khoảng 40 phút.\n2️⃣ Cho yến vào thố, đổ ngập nước.\n3️⃣ Cách Thủy ở 80-85°C. Đừng nung sôi sục làm đứt rụng mạch Acid Amin.\n4️⃣ Tắt bếp sau 30 phút mới thả đường phèn Quảng Ngãi và gừng vào để không làm chai sợi yến.", isHealthAttr: false },
};

function getBotResponse(message: string): string {
  const lower = message.toLowerCase();
  
  // Logic quét mã siêu từ khóa (Smart Catch)
  let foundResponse = "";
  let isHealth = false;

  if (lower.match(/không|giá|bao nhiêu/)) {
    if (lower.includes("giá")) {
	  foundResponse = botResponses["giá"].text;
	}
  }
  
  if (!foundResponse) {
    for (const [key, response] of Object.entries(botResponses)) {
      if (lower.includes(key)) {
        foundResponse = response.text;
        isHealth = response.isHealthAttr;
        break;
      }
    }
  }

  // Bắt các tình huống chuyên sâu bệnh lý (Health Trigger)
  if (lower.match(/ốm|bệnh|viêm|ho |phổi|ung thư|huyết áp|mổ|yếu/)) {
    if (!foundResponse) {
      foundResponse = "Yến sào có dược tính phục hồi tái tạo tế bào (EGF) rất sắc bén, cực kì được khuyên dùng cho người vừa ốm dậy, người cần mau lành vết mổ hay hệ miễn dịch sụt lún. Bạn có thể sử dụng yến làm sạch hoặc loại chưng sẵn nhân sâm thượng hạng để tiếp ứng máu huyết.";
      isHealth = true;
    }
  }

  if (!foundResponse) {
    if (lower.includes("hi") || lower.includes("hello") || lower.includes("chào")) {
      foundResponse = botResponses["xin chào"].text;
    } else if (lower.includes("mua") || lower.includes("đặt")) {
      foundResponse = "Việc chốt đơn cực kỳ tiện! Hãy dạo quanh mục Sản Phẩm trên web, bấm 'Thêm vào giỏ' và hoàn tất quy trình điền địa chỉ. Đội ngũ Bình An sẽ giao hỏa tốc đến tận tay bạn! 🛒";
    } else {
      foundResponse = "🤖 Cảm ơn bạn. Câu hỏi của bạn rất thú vị! Để hỗ trợ chính xác hơn, bạn có thể hỏi các từ khóa như: 'người già', 'bà bầu', 'tiểu đường', 'cách dùng', hoặc 'giá tiền' nhé. Tôi được nạp dữ liệu chuẩn xác để trả lời các vấn đề này.";
    }
  }

  // Nối Disclaimer nếu là câu hỏi y tế
  if (isHealth) {
    foundResponse += "\n\n*(Lưu ý: Thông tin tư vấn sức khỏe từ hệ thống AI chỉ mang tính chất gợi ý và tham khảo. Tổ Yến không phải là thuốc, không thay thế hoàn toàn được các chỉ định y khoa từ bác sĩ điều trị).*";
  }

  return foundResponse;
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Xin chào! 👋 Tôi là trợ lý AI ảo của Yến Sào Bình An. Tôi có thể giúp gì cho bạn?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate bot thinking
    setTimeout(() => {
      const response = getBotResponse(userMsg.content);
      setMessages((prev) => [...prev, { role: "bot", content: response }]);
    }, 500);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gold-gradient rounded-full shadow-gold-glow flex items-center justify-center z-40 hover:scale-110 transition-transform"
        aria-label="Mở chat tư vấn"
      >
        {isOpen ? <X size={24} className="text-white" /> : <MessageCircle size={24} className="text-white" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[350px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-120px)] bg-white rounded-2xl shadow-warm-xl border border-cream-200 z-40 flex flex-col animate-slide-up overflow-hidden">
          {/* Header */}
          <div className="bg-gold-gradient p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm">Tư Vấn Yến Sào</h3>
              <p className="text-white/80 text-xs">Trực tuyến • Trả lời ngay</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm whitespace-pre-line ${
                  msg.role === "user"
                    ? "bg-gold-gradient text-white rounded-br-md"
                    : "bg-cream-100 text-brown-700 rounded-bl-md"
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-cream-200">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Nhập câu hỏi..."
                className="input-field text-sm py-2.5"
              />
              <button onClick={sendMessage} className="p-2.5 bg-gold-gradient rounded-xl text-white hover:shadow-gold-glow transition-all">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
