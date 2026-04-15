"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import { APP_NAME } from "@/lib/constants";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    if (formData.password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Đăng ký thất bại");
      } else {
        setSuccess("Tạo tài khoản thành công! Đang chuyển đến Đăng nhập...");
        setTimeout(() => {
          router.push("/login?registered=true");
        }, 1500);
      }
    } catch {
      setError("Đã xảy ra lỗi. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative">
      {/* Toast Popup */}
      {success && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-success-500 text-white px-6 py-3 rounded-full shadow-warm-lg flex items-center gap-2 animate-bounce z-50">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          <span className="font-medium text-sm">{success}</span>
        </div>
      )}

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full overflow-hidden mx-auto shadow-gold-glow mb-4 bg-white">
            <img src="/images/logo.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-brown-900">Tạo tài khoản</h1>
          <p className="text-brown-500 mt-1">Tham gia {APP_NAME} để nhận ưu đãi đặc biệt</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="card p-6 space-y-4">
          {error && (
            <div className="p-3 bg-error-50 border border-red-200 rounded-xl text-sm text-error-600">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-brown-700 mb-1.5">Họ tên</label>
            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brown-400" />
              <input type="text" value={formData.name} onChange={(e) => updateField("name", e.target.value)} placeholder="Nguyễn Văn A" className="input-field pl-11" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-brown-700 mb-1.5">Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brown-400" />
              <input type="email" value={formData.email} onChange={(e) => updateField("email", e.target.value)} placeholder="your@email.com" className="input-field pl-11" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-brown-700 mb-1.5">Số điện thoại</label>
            <div className="relative">
              <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brown-400" />
              <input type="tel" value={formData.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="0901 234 567" className="input-field pl-11" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-brown-700 mb-1.5">Mật khẩu</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brown-400" />
              <input type={showPassword ? "text" : "password"} value={formData.password} onChange={(e) => updateField("password", e.target.value)} placeholder="Tối thiểu 6 ký tự" className="input-field pl-11 pr-11" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-brown-400 hover:text-brown-600">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-brown-700 mb-1.5">Xác nhận mật khẩu</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brown-400" />
              <input type="password" value={formData.confirmPassword} onChange={(e) => updateField("confirmPassword", e.target.value)} placeholder="Nhập lại mật khẩu" className="input-field pl-11" required />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full py-3.5">
            {loading ? "Đang tạo tài khoản..." : "Đăng ký"}
          </button>
        </form>

        <p className="text-center text-sm text-brown-500 mt-6">
          Đã có tài khoản?{" "}
          <Link href="/login" className="text-primary-600 font-medium hover:underline">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}
