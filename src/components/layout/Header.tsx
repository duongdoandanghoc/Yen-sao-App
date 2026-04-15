"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/contexts/CartContext";
import { NAV_ITEMS, APP_NAME } from "@/lib/constants";
import { ShoppingBag, Menu, X, User, LogOut, ChevronDown, Search, LayoutDashboard } from "lucide-react";

import { usePathname } from "next/navigation";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { totalItems, toggleCart } = useCart();
  const { data: session } = useSession();
  const pathname = usePathname();
  
  const isAdmin = (session?.user as any)?.role === "ADMIN";

  // Không hiển thị Header chung trên trang Admin
  if (pathname?.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-50 glass border-b border-cream-300/50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center shadow-gold-glow group-hover:scale-110 transition-transform">
              <span className="text-white font-serif font-bold text-lg">Y</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-serif font-bold text-lg text-brown-900 leading-tight">{APP_NAME}</h1>
              <p className="text-xs text-brown-500 -mt-0.5">Yến sào cao cấp</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-brown-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search (desktop) */}
            <Link
              href="/products"
              className="hidden md:flex items-center gap-2 px-3 py-2 text-sm text-brown-500 bg-cream-100 hover:bg-cream-200 rounded-xl transition-colors"
            >
              <Search size={16} />
              <span>Tìm kiếm...</span>
            </Link>

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="relative p-2.5 text-brown-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all"
              aria-label="Giỏ hàng"
            >
              <ShoppingBag size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-gold-gradient text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse-soft">
                  {totalItems}
                </span>
              )}
            </button>

            {/* User Menu */}
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-2 text-brown-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary-700">
                      {session.user?.name?.[0]?.toUpperCase() || "U"}
                    </span>
                  </div>
                  <ChevronDown size={14} className={`hidden md:block transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                </button>

                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-warm-lg border border-cream-200 py-2 z-50 animate-fade-in">
                      <div className="px-4 py-2 border-b border-cream-100">
                        <p className="font-medium text-brown-900 text-sm">{session.user?.name}</p>
                        <p className="text-xs text-brown-500">{session.user?.email}</p>
                      </div>
                      <Link href="/account" className="flex items-center gap-3 px-4 py-2.5 text-sm text-brown-700 hover:bg-primary-50 hover:text-primary-700 transition-colors" onClick={() => setUserMenuOpen(false)}>
                        <User size={16} />
                        Tài khoản
                      </Link>
                      {isAdmin && (
                        <Link href="/admin" className="flex items-center gap-3 px-4 py-2.5 text-sm text-brown-700 hover:bg-primary-50 hover:text-primary-700 transition-colors" onClick={() => setUserMenuOpen(false)}>
                          <LayoutDashboard size={16} />
                          Quản trị
                        </Link>
                      )}
                      <button
                        onClick={() => { signOut({ callbackUrl: "/" }); setUserMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-error-500 hover:bg-error-50 transition-colors"
                      >
                        <LogOut size={16} />
                        Đăng xuất
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link href="/login" className="hidden md:flex btn-primary text-sm px-4 py-2">
                Đăng nhập
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-brown-700 hover:bg-primary-50 rounded-xl transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-cream-200 py-4 animate-slide-up">
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-3 text-base font-medium text-brown-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {!session && (
                <Link
                  href="/login"
                  className="mt-2 btn-primary text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Đăng nhập
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
