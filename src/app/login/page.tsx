"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { APP_NAME } from "@/lib/constants";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email hoặc mật khẩu không đúng");
      } else {
        setSuccess("Đăng nhập thành công! Đang chuyển hướng...");
        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 1500);
      }
    } catch {
      setError("Đã xảy ra lỗi. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative">
      {/* Toast Popup (Rất nhẹ, không tốn thêm thư viện) */}
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
          <h1 className="text-2xl font-serif font-bold text-brown-900">Đăng nhập</h1>
          <p className="text-brown-500 mt-1">Chào mừng bạn quay trở lại {APP_NAME}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="card p-6 space-y-5">
          {error && (
            <div className="p-3 bg-error-50 border border-red-200 rounded-xl text-sm text-error-600">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-brown-700 mb-1.5">Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brown-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="input-field pl-11"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-brown-700 mb-1.5">Mật khẩu</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brown-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-field pl-11 pr-11"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-brown-400 hover:text-brown-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !!success}
            className="btn-primary w-full py-3.5"
          >
            {loading ? "Đang xử lý..." : success ? "Thành công!" : "Đăng nhập"}
          </button>
        </form>

        <p className="text-center text-sm text-brown-500 mt-6">
          Chưa có tài khoản?{" "}
          <Link href="/register" className="text-primary-600 font-medium hover:underline">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
}
