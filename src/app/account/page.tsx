"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { User, Package, MapPin, LogOut, Heart, Bell } from "lucide-react";
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
    { href: "/account/orders", icon: Package, label: "Đơn hàng của tôi", desc: "Xem lịch sử và theo dõi đơn hàng" },
    { href: "#", icon: MapPin, label: "Địa chỉ giao hàng", desc: "Quản lý địa chỉ nhận hàng" },
    { href: "#", icon: Heart, label: "Sản phẩm yêu thích", desc: "Danh sách sản phẩm đã lưu" },
    { href: "#", icon: Bell, label: "Thông báo", desc: "Cài đặt thông báo và ưu đãi" },
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
          <div>
            <h1 className="text-xl font-serif font-bold text-brown-900">{session.user?.name}</h1>
            <p className="text-sm text-brown-500">{session.user?.email}</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="space-y-3">
        {menuItems.map((item) => (
          <Link key={item.label} href={item.href} className="card p-4 flex items-center gap-4 hover:border-primary-200 transition-all">
            <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
              <item.icon size={20} className="text-primary-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-brown-900">{item.label}</h3>
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
