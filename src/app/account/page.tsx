"use client";

import { useSession } from "next-auth/react";
import { Link } from "next-view-transitions";
import { User, Package, MapPin, LogOut, Heart, Bell, Lock, Award, UserCircle, Settings } from "lucide-react";
import { signOut } from "next-auth/react";

export default function AccountPage() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="container-custom py-16 text-center">
        <User size={48} className="text-cream-300 mx-auto mb-4" />
        <h1 className="text-2xl font-serif font-bold text-brown-900">Vui lòng đăng nhập</h1>
        <p className="text-brown-500 mt-2">Đăng nhập để quản lý tài khoản của bạn</p>
        <Link href="/login" className="btn-primary mt-6 inline-flex">Đăng nhập</Link>
      </div>
    );
  }

  const menuItems = [
    { href: "/account/profile", icon: UserCircle, label: "Thông tin cá nhân", desc: "Xem và chỉnh sửa thông tin của bạn", color: "bg-blue-50 text-blue-600" },
    { href: "/account/orders", icon: Package, label: "Đơn hàng của tôi", desc: "Xem lịch sử và theo dõi đơn hàng", color: "bg-orange-50 text-orange-600" },
    { href: "/account/addresses", icon: MapPin, label: "Địa chỉ giao hàng", desc: "Quản lý địa chỉ nhận hàng", color: "bg-green-50 text-green-600" },
    { href: "/account/wishlist", icon: Heart, label: "Sản phẩm yêu thích", desc: "Danh sách sản phẩm đã lưu", color: "bg-pink-50 text-pink-600" },
    { href: "/account/loyalty", icon: Award, label: "Điểm tích lũy", desc: "Tích điểm, đổi ưu đãi, hạng thành viên", color: "bg-yellow-50 text-yellow-600" },
    { href: "/account/notifications", icon: Bell, label: "Thông báo & ưu đãi", desc: "Cài đặt thông báo và xem ưu đãi", color: "bg-purple-50 text-purple-600" },
    { href: "/account/change-password", icon: Lock, label: "Đổi mật khẩu", desc: "Cập nhật mật khẩu tài khoản", color: "bg-red-50 text-red-600" },
  ];

  return (
    <div className="container-custom py-8 md:py-12 max-w-3xl mx-auto">
      {/* Profile Header */}
      <div className="card p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary-700">
              {session.user?.name?.[0]?.toUpperCase() || "U"}
            </span>
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-serif font-bold text-brown-900">{session.user?.name}</h1>
            <p className="text-sm text-brown-500">{session.user?.email}</p>
          </div>
          <Link href="/account/profile" className="text-xs text-primary-600 hover:text-primary-700 font-medium">
            Chỉnh sửa
          </Link>
        </div>
      </div>

      {/* Menu */}
      <div className="space-y-3">
        {menuItems.map((item) => (
          <Link key={item.label} href={item.href} className="card p-4 flex items-center gap-4 hover:border-primary-200 transition-all group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
              <item.icon size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-brown-900 group-hover:text-primary-700 transition-colors">{item.label}</h3>
              <p className="text-sm text-brown-500">{item.desc}</p>
            </div>
          </Link>
        ))}

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="card p-4 flex items-center gap-4 w-full text-left hover:border-error-200 transition-all"
        >
          <div className="w-10 h-10 bg-error-50 rounded-xl flex items-center justify-center">
            <LogOut size={20} className="text-error-500" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-error-600">Đăng xuất</h3>
            <p className="text-sm text-brown-500">Đăng xuất khỏi tài khoản</p>
          </div>
        </button>
      </div>
    </div>
  );
}
