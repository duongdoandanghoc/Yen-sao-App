"use client";

import { useState } from "react";
import { MessageCircle, X, Send, Bot, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "bot";
  content: string;
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Xin chào! 👋 Tôi là trợ lý AI ảo của Yến Sào Bình An. Tôi có thể giúp gì cho bạn?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Gọi lên API mô hình DeepSeek
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
              <h3 className="font-semibold text-white text-sm">Tư Vấn Yến Sào (AI)</h3>
              <p className="text-white/80 text-xs">Trực tuyến • Sẵn sàng hỗ trợ</p>
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
            {isLoading && (
              <div className="flex justify-start">
                 <div className="bg-cream-100 p-3 py-2 rounded-2xl rounded-bl-md flex items-center gap-2">
                   <Loader2 size={16} className="animate-spin text-brown-500" />
                   <span className="text-xs text-brown-600 italic animate-pulse">AI của Yến Sào Bình An đang suy nghĩ để đưa cho bạn câu trả lời tốt nhất...</span>
                 </div>
              </div>
            )}
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
