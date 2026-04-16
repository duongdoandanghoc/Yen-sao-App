"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { ChevronRight, Loader2, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "next-view-transitions";

export default function ChangePasswordPage() {
  const { status } = useSession();
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const handleSubmit = async () => {
    if (form.newPassword !== form.confirmPassword) {
      setMessage("Mật khẩu mới không khớp");
      return;
    }
    if (form.newPassword.length < 6) {
      setMessage("Mật khẩu mới phải có ít nhất 6 ký tự");
      return;
    }

    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/account/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: form.currentPassword, newPassword: form.newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Đổi mật khẩu thành công!");
        setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        setMessage(data.error || "Có lỗi xảy ra");
      }
    } catch {
      setMessage("Lỗi kết nối");
    } finally {
      setSaving(false);
    }
  };

  if (status === "loading") {
    return <div className="container-custom py-16 text-center"><Loader2 size={32} className="animate-spin mx-auto mb-4 text-brown-400" /></div>;
  }

  return (
    <div className="container-custom py-8 md:py-12 max-w-lg mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/account" className="text-sm text-brown-500 hover:text-primary-600">Tài khoản</Link>
        <ChevronRight size={14} className="text-brown-400" />
        <span className="text-sm font-medium text-brown-900">Đổi mật khẩu</span>
      </div>

      <h1 className="text-2xl font-serif font-bold text-brown-900 mb-6 flex items-center gap-2">
        <Lock size={28} className="text-red-500" /> Đổi mật khẩu
      </h1>

      <div className="card p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-brown-700 mb-1">Mật khẩu hiện tại</label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                value={form.currentPassword}
                onChange={(e) => setForm({...form, currentPassword: e.target.value})}
                className="input-field pr-10"
                placeholder="Nhập mật khẩu hiện tại"
              />
              <button 
                type="button"
                onClick={() => setShowCurrent(!showCurrent)} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brown-400 hover:text-brown-600"
              >
                {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-brown-700 mb-1">Mật khẩu mới</label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={form.newPassword}
                onChange={(e) => setForm({...form, newPassword: e.target.value})}
                className="input-field pr-10"
                placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
              />
              <button 
                type="button"
                onClick={() => setShowNew(!showNew)} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brown-400 hover:text-brown-600"
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-brown-700 mb-1">Xác nhận mật khẩu mới</label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(e) => setForm({...form, confirmPassword: e.target.value})}
              className="input-field"
              placeholder="Nhập lại mật khẩu mới"
            />
          </div>
        </div>

        {message && (
          <p className={`text-sm mt-4 ${message.includes("thành công") ? "text-green-600" : "text-error-500"}`}>
            {message}
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={saving || !form.currentPassword || !form.newPassword || !form.confirmPassword}
          className="btn-primary w-full mt-6"
        >
          {saving ? "Đang xử lý..." : "Đổi mật khẩu"}
        </button>
      </div>
    </div>
  );
}
