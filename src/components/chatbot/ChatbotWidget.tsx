"use client";

import { useState } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  role: "user" | "bot";
  content: string;
}

const botResponses: Record<string, string> = {
  "xin chào": "Xin chào! 👋 Tôi là trợ lý tư vấn yến sào. Tôi có thể giúp bạn chọn sản phẩm phù hợp, hướng dẫn cách dùng, hoặc giải đáp thắc mắc. Bạn cần tư vấn gì ạ?",
  "yến": "Chúng tôi có 3 loại yến sào:\n🪹 **Yến thô** - Nguyên tổ tự nhiên\n✨ **Yến tinh chế** - Đã làm sạch, sẵn chưng\n🍯 **Yến chưng sẵn** - Tiện lợi dùng ngay\n\nBạn quan tâm loại nào ạ?",
  "giá": "Giá yến sào của chúng tôi:\n• Vụn yến: từ 900k/100g\n• Yến lông: từ 1.8tr/100g\n• Yến đảo: từ 2.8tr/100g\n• Yến hang: từ 4.5tr/100g\n• Yến chưng sẵn: 150k-250k/hũ\n\nBạn muốn xem chi tiết sản phẩm nào?",
  "bà bầu": "Yến sào rất tốt cho bà bầu! 🤰\n\n✅ Bổ sung dưỡng chất cho mẹ và bé\n✅ Hỗ trợ phát triển não bộ thai nhi\n✅ Giúp da mẹ đẹp hơn\n\nNên dùng từ tháng thứ 3, mỗi ngày 3-5g. Gợi ý: **Yến Nhỏ Cho Bé** hoặc **Yến Tinh Chế Trắng**.",
  "cách dùng": "Cách dùng yến sào hiệu quả:\n\n1️⃣ Ngâm 2-4h trong nước sạch\n2️⃣ Nhặt lông tơ cẩn thận\n3️⃣ Chưng cách thủy 25-30 phút\n4️⃣ Thêm đường phèn sau khi chưng\n\n⏰ Nên dùng buổi sáng khi bụng đói\n📅 Dùng 3-4 lần/tuần để đạt hiệu quả tốt nhất",
  "giao hàng": "🚚 Chính sách giao hàng:\n• Miễn phí giao hàng cho đơn từ 500k\n• Giao toàn quốc trong 2-5 ngày\n• Thanh toán khi nhận hàng (COD)\n• Đóng gói cẩn thận, bảo quản an toàn",
  "khuyến mãi": "🎉 Mã giảm giá hiện có:\n• **YENSAO10** - Giảm 10% (đơn từ 500k)\n• **FREESHIP** - Miễn phí ship (đơn từ 300k)\n• **WELCOME20** - Giảm 20% (đơn từ 1tr)\n\nNhập mã tại bước thanh toán!",
};

function getBotResponse(message: string): string {
  const lower = message.toLowerCase();
  
  for (const [key, response] of Object.entries(botResponses)) {
    if (lower.includes(key)) return response;
  }
  
  if (lower.includes("hi") || lower.includes("hello") || lower.includes("chào")) {
    return botResponses["xin chào"];
  }
  if (lower.includes("mua") || lower.includes("đặt")) {
    return "Bạn có thể đặt hàng trực tiếp trên website! Thêm sản phẩm vào giỏ hàng → Nhập thông tin giao hàng → Xác nhận đơn hàng. Rất đơn giản! 🛒\n\nBạn cần tư vấn sản phẩm nào không?";
  }
  if (lower.includes("chất lượng") || lower.includes("thật")) {
    return "🛡️ Cam kết chất lượng:\n• 100% yến tự nhiên từ Khánh Hòa\n• Kiểm định an toàn vệ sinh thực phẩm\n• Đổi trả trong 7 ngày nếu không hài lòng\n• Bảo quản đúng cách, đóng gói kín";
  }

  return "Cảm ơn bạn đã liên hệ! 😊 Tôi có thể giúp bạn về:\n• Tư vấn chọn sản phẩm\n• Hướng dẫn cách dùng\n• Thông tin giá cả\n• Chính sách giao hàng\n• Mã khuyến mãi\n\nHãy hỏi tôi bất cứ điều gì!";
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Xin chào! 👋 Tôi là trợ lý tư vấn Yến Sào Việt. Tôi có thể giúp gì cho bạn?" },
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
