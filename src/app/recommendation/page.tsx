"use client";

import { useState, useRef, useEffect } from "react";
import { Link } from "next-view-transitions";
import { Send, Bot, ArrowLeft, Loader2, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "bot";
  content: string;
}

export default function RecommendationPage() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "bot", 
      content: "Xin chào! 👋 Tôi là trợ lý AI chuyên gia yến sào của Bình An.\n\nChia sẻ với tôi nhu cầu của bạn (ví dụ: 'Tôi muốn mua yến tẩm bổ cho người lớn tuổi', hoặc 'Bà bầu tháng thứ 4 ăn yến được chưa?'). Tôi sẽ đưa ra giải pháp hoàn hảo nhất!" 
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ 
            role: m.role === "bot" ? "assistant" : "user", 
            content: m.content 
          }))
        }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: "bot", content: data.content }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "bot", content: "Xin lỗi, máy chủ AI đang gặp sự cố kết nối." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-cream-50 min-h-screen flex flex-col">
      <div className="container-custom max-w-5xl mx-auto py-8 flex-1 flex flex-col h-full">
        <Link href="/" className="inline-flex items-center gap-2 text-brown-500 hover:text-primary-600 transition-colors mb-6">
          <ArrowLeft size={16} />
          Trở về Trang chủ
        </Link>
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles size={28} className="text-primary-600" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-brown-900">Phòng Khách AI Của Bình An</h1>
          <p className="text-brown-600 mt-2">Hỏi bất cứ thứ gì, chuyên gia của chúng tôi được đào tạo để trả lời bằng cái tâm hướng thiện.</p>
        </div>

        {/* Chat Terminal */}
        <div className="flex-1 bg-white rounded-3xl shadow-warm-lg border border-cream-200 overflow-hidden flex flex-col h-[600px] mb-10">
          <div className="bg-gold-gradient p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center border border-white/30">
              <Bot size={24} className="text-white" />
            </div>
            <div>
              <h2 className="font-bold text-white text-lg font-serif">Chuyên Gia Yến Sào AI</h2>
              <p className="text-white/80 text-sm">Luôn sẵn sàng lắng nghe bạn</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 custom-scrollbar bg-cream-50/50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div 
                  className={`max-w-[90%] md:max-w-[70%] p-4 md:p-5 rounded-2xl text-[15px] whitespace-pre-line leading-relaxed shadow-sm ${
                    msg.role === "user"
                      ? "bg-brown-900 text-cream-100 rounded-br-sm"
                      : "bg-white border border-cream-200 text-brown-800 rounded-bl-sm"
                  }`}
                  dangerouslySetInnerHTML={{ 
                    __html: msg.content
                      .replace(/### (.*?)\n/g, '<strong class="block mt-3 mb-1 font-bold text-brown-900 text-lg">$1</strong>\n')
                      .replace(/## (.*?)\n/g, '<strong class="block mt-3 mb-1 font-bold text-primary-700 text-lg">$1</strong>\n')
                      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-brown-900">$1</strong>')
                      .replace(/\*(.*?)\*/g, '<em class="italic text-brown-600">$1</em>')
                      .replace(/- (.*?)\n/g, '<li class="ml-4 list-disc marker:text-primary-500">$1</li>')
                  }}
                />
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                 <div className="bg-white border border-cream-200 p-4 rounded-2xl rounded-bl-sm shadow-sm flex items-center gap-3">
                   <Loader2 size={18} className="animate-spin text-primary-600" />
                   <span className="text-sm font-medium text-brown-600 animate-pulse">Chuyên gia đang suy nghĩ các phương án sức khỏe tốt nhất...</span>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 md:p-6 bg-white border-t border-cream-200">
            <div className="flex gap-3 max-w-4xl mx-auto">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ví dụ: Dạ dày yếu có dùng yến được không?"
                className="flex-1 bg-cream-50 border border-cream-200 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all text-brown-800 placeholder:text-brown-400"
              />
              <button 
                onClick={sendMessage} 
                disabled={isLoading || !input.trim()}
                className="px-6 bg-gold-gradient rounded-2xl text-white hover:shadow-gold-glow transition-all flex items-center justify-center disabled:opacity-50 disabled:hover:shadow-none"
              >
                <Send size={20} className={input.trim() && !isLoading ? "animate-bounce" : ""} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
