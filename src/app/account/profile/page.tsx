"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { ChevronRight, Loader2, Save, UserCircle } from "lucide-react";
import { Link } from "next-view-transitions";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
  });

  useEffect(() => {
    if (status === "authenticated") {
      fetchProfile();
    } else if (status !== "loading") {
      setLoading(false);
    }
  }, [status]);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/account/profile");
      const data = await res.json();
      if (res.ok) {
        setProfile({
          name: data.user.name || "",
          email: data.user.email || "",
          phone: data.user.phone || "",
          dateOfBirth: data.user.dateOfBirth ? data.user.dateOfBirth.split("T")[0] : "",
          gender: data.user.gender || "",
        });
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/account/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      if (res.ok) {
        setMessage("Cập nhật thành công!");
      } else {
        const data = await res.json();
        setMessage(data.error || "Có lỗi xảy ra");
      }
    } catch {
      setMessage("Lỗi kết nối");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  if (loading || status === "loading") {
    return (
      <div className="container-custom py-16 text-center">
        <Loader2 size={32} className="animate-spin mx-auto mb-4 text-brown-400" />
        <p className="text-brown-500">Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="container-custom py-8 md:py-12 max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/account" className="text-sm text-brown-500 hover:text-primary-600">Tài khoản</Link>
        <ChevronRight size={14} className="text-brown-400" />
        <span className="text-sm font-medium text-brown-900">Thông tin cá nhân</span>
      </div>

      <h1 className="text-2xl font-serif font-bold text-brown-900 mb-6 flex items-center gap-2">
        <UserCircle size={28} className="text-primary-600" /> Thông tin cá nhân
      </h1>

      <div className="card p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-brown-700 mb-1">Họ và tên</label>
            <input value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} className="input-field" placeholder="Nguyễn Văn A" />
          </div>
          <div>
            <label className="block text-sm font-medium text-brown-700 mb-1">Email</label>
            <input value={profile.email} disabled className="input-field bg-cream-50 text-brown-400 cursor-not-allowed" />
            <p className="text-xs text-brown-400 mt-1">Email không thể thay đổi</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-brown-700 mb-1">Số điện thoại</label>
            <input value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} className="input-field" placeholder="0901 234 567" />
          </div>
          <div>
            <label className="block text-sm font-medium text-brown-700 mb-1">Ngày sinh</label>
            <input type="date" value={profile.dateOfBirth} onChange={(e) => setProfile({...profile, dateOfBirth: e.target.value})} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-brown-700 mb-1">Giới tính</label>
            <select value={profile.gender} onChange={(e) => setProfile({...profile, gender: e.target.value})} className="input-field">
              <option value="">Chọn giới tính</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
          </div>
        </div>

        {message && (
          <p className={`text-sm mt-4 ${message.includes("thành công") ? "text-green-600" : "text-error-500"}`}>
            {message}
          </p>
        )}

        <button onClick={handleSave} disabled={saving} className="btn-primary w-full mt-6 gap-2">
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {saving ? "Đang lưu..." : "Lưu thay đổi"}
        </button>
      </div>
    </div>
  );
}
