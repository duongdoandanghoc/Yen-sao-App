"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { ChevronRight, Loader2, Bell, Package, Gift, Award, Settings2, Check } from "lucide-react";
import { Link } from "next-view-transitions";
import { formatDate } from "@/lib/utils";

export default function NotificationsPage() {
  const { status } = useSession();
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [settings, setSettings] = useState({ notifyOrders: true, notifyPromo: true, notifySystem: true });
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (status === "authenticated") fetchData();
    else if (status !== "loading") setLoading(false);
  }, [status]);

  const fetchData = async () => {
    try {
      const [notiRes, profileRes] = await Promise.all([
        fetch("/api/account/notifications"),
        fetch("/api/account/profile"),
      ]);
      const notiData = await notiRes.json();
      const profileData = await profileRes.json();
      if (notiRes.ok) setNotifications(notiData.notifications || []);
      if (profileRes.ok) {
        setSettings({
          notifyOrders: profileData.user.notifyOrders ?? true,
          notifyPromo: profileData.user.notifyPromo ?? true,
          notifySystem: profileData.user.notifySystem ?? true,
        });
      }
    } catch {} finally { setLoading(false); }
  };

  const markAsRead = async (id: string) => {
    try {
      await fetch(`/api/account/notifications?id=${id}`, { method: "PATCH" });
      setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    } catch {}
  };

  const markAllRead = async () => {
    try {
      await fetch("/api/account/notifications?all=true", { method: "PATCH" });
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    } catch {}
  };

  const saveSettings = async () => {
    try {
      await fetch("/api/account/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      setShowSettings(false);
    } catch { alert("Lỗi kết nối"); }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "ORDER": return <Package size={18} className="text-blue-500" />;
      case "PROMOTION": return <Gift size={18} className="text-purple-500" />;
      case "LOYALTY": return <Award size={18} className="text-yellow-500" />;
      default: return <Bell size={18} className="text-brown-400" />;
    }
  };

  if (loading || status === "loading") {
    return <div className="container-custom py-16 text-center"><Loader2 size={32} className="animate-spin mx-auto mb-4 text-brown-400" /><p className="text-brown-500">Đang tải...</p></div>;
  }

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="container-custom py-8 md:py-12 max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/account" className="text-sm text-brown-500 hover:text-primary-600">Tài khoản</Link>
        <ChevronRight size={14} className="text-brown-400" />
        <span className="text-sm font-medium text-brown-900">Thông báo</span>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-bold text-brown-900 flex items-center gap-2">
          <Bell size={28} className="text-purple-500" /> Thông báo
          {unreadCount > 0 && <span className="text-sm bg-error-500 text-white px-2 py-0.5 rounded-full">{unreadCount}</span>}
        </h1>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
              <Check size={14} /> Đọc tất cả
            </button>
          )}
          <button onClick={() => setShowSettings(!showSettings)} className="p-2 hover:bg-cream-100 rounded-lg text-brown-400 hover:text-brown-600 transition">
            <Settings2 size={18} />
          </button>
        </div>
      </div>

      {/* Settings */}
      {showSettings && (
        <div className="card p-5 mb-6 animate-fade-in">
          <h3 className="font-semibold text-brown-900 mb-3">Cài đặt thông báo</h3>
          <div className="space-y-3">
            {[
              { key: "notifyOrders", label: "Đơn hàng", desc: "Cập nhật trạng thái đơn hàng" },
              { key: "notifyPromo", label: "Khuyến mãi", desc: "Ưu đãi và chương trình giảm giá" },
              { key: "notifySystem", label: "Hệ thống", desc: "Bảo mật và cập nhật tài khoản" },
            ].map((item) => (
              <label key={item.key} className="flex items-center justify-between cursor-pointer py-2">
                <div>
                  <p className="text-sm font-medium text-brown-900">{item.label}</p>
                  <p className="text-xs text-brown-500">{item.desc}</p>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={(settings as any)[item.key]}
                    onChange={(e) => setSettings({ ...settings, [item.key]: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-cream-300 rounded-full peer-checked:bg-primary-500 transition-colors" />
                  <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5" />
                </div>
              </label>
            ))}
          </div>
          <button onClick={saveSettings} className="btn-primary w-full mt-4 text-sm">Lưu cài đặt</button>
        </div>
      )}

      {/* Notifications List */}
      {notifications.length === 0 ? (
        <div className="text-center py-16 card">
          <Bell size={48} className="text-cream-300 mx-auto mb-4" />
          <p className="text-brown-500">Chưa có thông báo nào</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((noti) => (
            <div
              key={noti.id}
              onClick={() => !noti.read && markAsRead(noti.id)}
              className={`card p-4 flex items-start gap-3 cursor-pointer transition-all ${!noti.read ? "bg-primary-50/50 border-primary-200" : ""}`}
            >
              <div className="w-9 h-9 rounded-xl bg-cream-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                {getIcon(noti.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className={`text-sm ${!noti.read ? "font-semibold text-brown-900" : "font-medium text-brown-700"}`}>{noti.title}</h3>
                  {!noti.read && <div className="w-2 h-2 rounded-full bg-primary-500 flex-shrink-0" />}
                </div>
                <p className="text-xs text-brown-500 mt-0.5 line-clamp-2">{noti.message}</p>
                <p className="text-xs text-brown-400 mt-1">{formatDate(noti.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
