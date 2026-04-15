"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, Users, ChevronLeft, BarChart3 } from "lucide-react";

const sidebarItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Tổng quan" },
  { href: "/admin/products", icon: Package, label: "Sản phẩm" },
  { href: "/admin/orders", icon: ShoppingCart, label: "Đơn hàng" },
  { href: "/admin/customers", icon: Users, label: "Khách hàng" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-cream-100">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-brown-900 min-h-screen sticky top-0">
          <div className="p-4 border-b border-brown-800">
            <Link href="/" className="flex items-center gap-2 text-cream-200 hover:text-white transition-colors">
              <ChevronLeft size={16} />
              <span className="text-sm">Về trang chủ</span>
            </Link>
            <h2 className="font-serif font-bold text-white mt-3 text-lg">Admin Dashboard</h2>
            <p className="text-cream-400 text-xs">Yến Sào Việt</p>
          </div>
          <nav className="flex-1 p-3 space-y-1">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary-600 text-white"
                      : "text-cream-300 hover:bg-brown-800 hover:text-white"
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Mobile Header */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-brown-900 z-40 border-t border-brown-800">
          <div className="flex justify-around py-2">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center gap-1 px-3 py-2 text-xs ${
                    isActive ? "text-primary-400" : "text-cream-400"
                  }`}
                >
                  <item.icon size={20} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 pb-20 md:pb-8">
          {children}
        </main>
      </div>
    </div>
  );
}
