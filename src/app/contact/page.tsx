"use client";

import { APP_NAME, CONTACT_INFO } from "@/lib/constants";
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, CheckCircle2 } from "lucide-react";
import { useState, type FormEvent } from "react";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "general",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate sending
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSending(false);
    setSubmitted(true);
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Điện thoại",
      value: CONTACT_INFO.phone,
      href: CONTACT_INFO.phoneHref,
      description: "Gọi trực tiếp để được tư vấn",
    },
    {
      icon: Mail,
      title: "Email",
      value: CONTACT_INFO.email,
      href: CONTACT_INFO.emailHref,
      description: "Gửi email, phản hồi trong 24h",
    },
    {
      icon: MapPin,
      title: "Cửa hàng",
      value: CONTACT_INFO.address,
      href: `https://maps.google.com/?q=${CONTACT_INFO.mapQuery}`,
      description: "Ghé thăm cửa hàng trực tiếp",
    },
    {
      icon: Clock,
      title: "Giờ làm việc",
      value: "8:00 — 21:00 hàng ngày",
      href: undefined,
      description: "Kể cả thứ 7, Chủ nhật",
    },
  ];

  const subjects = [
    { value: "general", label: "Câu hỏi chung" },
    { value: "order", label: "Hỗ trợ đơn hàng" },
    { value: "product", label: "Tư vấn sản phẩm" },
    { value: "wholesale", label: "Hợp tác / Đại lý" },
    { value: "complaint", label: "Khiếu nại / Đổi trả" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brown-800 via-brown-900 to-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-primary-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-gold-400 rounded-full blur-3xl" />
        </div>
        <div className="container-custom py-16 md:py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
              <MessageSquare size={16} className="text-gold-400" />
              <span className="text-cream-200">Luôn sẵn sàng hỗ trợ</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-6">
              Liên hệ với <span className="text-gradient-gold">{APP_NAME}</span>
            </h1>
            <p className="text-lg text-cream-300 leading-relaxed max-w-xl mx-auto">
              Bạn có câu hỏi, cần tư vấn, hay muốn hợp tác? Chúng tôi luôn sẵn lòng lắng nghe và phản hồi nhanh nhất.
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

      {/* Contact Methods */}
      <section className="container-custom -mt-4 relative z-20 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {contactMethods.map((method, i) => {
            const Icon = method.icon;
            const Wrapper = method.href ? "a" : "div";
            const wrapperProps = method.href
              ? { href: method.href, target: method.href.startsWith("http") ? "_blank" : undefined, rel: method.href.startsWith("http") ? "noopener noreferrer" : undefined }
              : {};

            return (
              <Wrapper
                key={i}
                {...wrapperProps}
                className="card-elevated p-5 text-center group hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mx-auto mb-3 group-hover:bg-gold-gradient group-hover:shadow-gold-glow transition-all duration-300">
                  <Icon className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-serif font-bold text-brown-900 text-sm mb-1">{method.title}</h3>
                <p className="text-primary-700 font-semibold text-sm mb-1">{method.value}</p>
                <p className="text-xs text-brown-400">{method.description}</p>
              </Wrapper>
            );
          })}
        </div>
      </section>

      {/* Form & Map */}
      <section className="container-custom py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-brown-900 mb-2">
              Gửi tin nhắn cho chúng tôi
            </h2>
            <p className="text-brown-500 mb-8">
              Điền thông tin bên dưới, chúng tôi sẽ phản hồi trong vòng 24 giờ.
            </p>

            {submitted ? (
              <div className="card-elevated p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-success-50 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-success-500" />
                </div>
                <h3 className="text-xl font-serif font-bold text-brown-900 mb-2">
                  Cảm ơn bạn đã liên hệ!
                </h3>
                <p className="text-brown-500 mb-6">
                  Chúng tôi đã nhận được tin nhắn và sẽ phản hồi sớm nhất có thể.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormState({ name: "", phone: "", email: "", subject: "general", message: "" });
                  }}
                  className="btn-secondary text-sm"
                >
                  Gửi tin nhắn khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-brown-700 mb-1.5">
                      Họ tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      className="input-field"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="block text-sm font-medium text-brown-700 mb-1.5">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      placeholder="0912 345 678"
                      className="input-field"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-brown-700 mb-1.5">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="email@example.com"
                    className="input-field"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-sm font-medium text-brown-700 mb-1.5">
                    Chủ đề
                  </label>
                  <select
                    id="contact-subject"
                    className="input-field"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  >
                    {subjects.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-brown-700 mb-1.5">
                    Nội dung tin nhắn <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    placeholder="Nhập nội dung bạn muốn gửi..."
                    className="input-field resize-none"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="btn-primary w-full gap-2"
                >
                  {sending ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Gửi tin nhắn
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Map & Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-brown-900 mb-2">
                Ghé thăm cửa hàng
              </h2>
              <p className="text-brown-500 mb-6">
                Đến trực tiếp để trải nghiệm và lựa chọn sản phẩm yến sào cao cấp.
              </p>
            </div>

            {/* Google Maps Embed */}
            <div className="card-elevated overflow-hidden">
              <iframe
                src={`https://maps.google.com/maps?q=${CONTACT_INFO.mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bản đồ cửa hàng"
                className="w-full"
              />
            </div>

            {/* Quick Info Card */}
            <div className="card p-6 space-y-4">
              <h3 className="font-serif font-bold text-brown-900">Thông tin cửa hàng</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-primary-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-brown-800">{CONTACT_INFO.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-primary-600 flex-shrink-0" />
                  <a href={CONTACT_INFO.phoneHref} className="text-sm text-brown-800 hover:text-primary-600 transition-colors">
                    {CONTACT_INFO.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-primary-600 flex-shrink-0" />
                  <a href={CONTACT_INFO.emailHref} className="text-sm text-brown-800 hover:text-primary-600 transition-colors">
                    {CONTACT_INFO.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-primary-600 flex-shrink-0" />
                  <p className="text-sm text-brown-800">8:00 — 21:00 hàng ngày (kể cả cuối tuần)</p>
                </div>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-gradient-to-r from-primary-50 to-cream-100 rounded-2xl p-6 border border-primary-100">
              <h3 className="font-serif font-bold text-brown-900 mb-2">💬 Cần tư vấn nhanh?</h3>
              <p className="text-sm text-brown-600 mb-4">
                Gọi trực tiếp để được tư vấn miễn phí về sản phẩm yến sào phù hợp với nhu cầu của bạn.
              </p>
              <a href={CONTACT_INFO.phoneHref} className="btn-primary text-sm gap-2 inline-flex">
                <Phone size={16} />
                Gọi {CONTACT_INFO.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
