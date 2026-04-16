"use client";

import { useState } from "react";
import { Search, Shield, User, Crown, Mail, Phone, Package, Award } from "lucide-react";
import { formatCurrency, formatDateShort } from "@/lib/utils";

interface AccountData {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  createdAt: string;
  orderCount: number;
  totalSpent: number;
  loyaltyPoints: number;
}

function getMemberTier(points: number) {
  if (points >= 10000) return { label: "Kim Cương", icon: "💎", color: "text-purple-600 bg-purple-50" };
  if (points >= 2000) return { label: "Vàng", icon: "🥇", color: "text-yellow-600 bg-yellow-50" };
  if (points >= 500) return { label: "Bạc", icon: "🥈", color: "text-gray-600 bg-gray-100" };
  return { label: "Đồng", icon: "🥉", color: "text-orange-600 bg-orange-50" };
}

export default function AdminAccountsClient({ initialAccounts }: { initialAccounts: AccountData[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  const filtered = initialAccounts.filter((a) => {
    const matchesRole = roleFilter === "ALL" || a.role === roleFilter;
    const matchesSearch = searchQuery
      ? a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.phone.includes(searchQuery)
      : true;
    return matchesRole && matchesSearch;
  });

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-bold text-brown-900">Quản lý tài khoản</h1>
        <div className="flex items-center gap-2 text-sm">
          <span className="px-3 py-1.5 rounded-full bg-primary-50 text-primary-700 font-medium">
            {initialAccounts.length} tài khoản
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brown-400" />
          <input
            type="text"
            placeholder="Tìm theo tên, email, SĐT..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-11 bg-white"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="input-field md:w-48 bg-white"
        >
          <option value="ALL">Tất cả vai trò</option>
          <option value="USER">Khách hàng</option>
          <option value="ADMIN">Quản trị viên</option>
        </select>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center py-12 text-brown-500">
            Không tìm thấy tài khoản nào.
          </div>
        ) : (
          filtered.map((account) => {
            const tier = getMemberTier(account.loyaltyPoints);
            return (
              <div key={account.id} className="bg-white rounded-2xl p-5 shadow-warm-sm border border-cream-200 hover:shadow-warm-md transition-shadow">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary-700">
                        {account.name[0]?.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-brown-900">{account.name}</h3>
                      <div className="flex items-center gap-1 mt-0.5">
                        {account.role === "ADMIN" ? (
                          <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                            <Shield size={10} /> Admin
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                            <User size={10} /> Khách hàng
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {account.role === "USER" && (
                    <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium ${tier.color}`}>
                      {tier.icon} {tier.label}
                    </span>
                  )}
                </div>

                {/* Contact */}
                <div className="space-y-1.5 mb-4 text-xs text-brown-500">
                  <p className="flex items-center gap-1.5"><Mail size={12} /> {account.email}</p>
                  <p className="flex items-center gap-1.5"><Phone size={12} /> {account.phone}</p>
                </div>

                {/* Stats */}
                {account.role === "USER" && (
                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-cream-200">
                    <div className="text-center">
                      <p className="flex items-center justify-center gap-1 text-xs text-brown-400 mb-0.5">
                        <Package size={11} /> Đơn hàng
                      </p>
                      <p className="text-sm font-bold text-brown-900">{account.orderCount}</p>
                    </div>
                    <div className="text-center">
                      <p className="flex items-center justify-center gap-1 text-xs text-brown-400 mb-0.5">
                        <Crown size={11} /> Chi tiêu
                      </p>
                      <p className="text-sm font-bold text-primary-600">{formatCurrency(account.totalSpent)}</p>
                    </div>
                    <div className="text-center">
                      <p className="flex items-center justify-center gap-1 text-xs text-brown-400 mb-0.5">
                        <Award size={11} /> Điểm
                      </p>
                      <p className="text-sm font-bold text-yellow-600">{account.loyaltyPoints.toLocaleString()}</p>
                    </div>
                  </div>
                )}

                {/* Join Date */}
                <p className="text-xs text-brown-400 mt-3 pt-3 border-t border-cream-100">
                  Tham gia: {formatDateShort(account.createdAt)}
                </p>
              </div>
            );
          })
        )}
      </div>

      <p className="text-sm text-brown-500 mt-4">
        Hiển thị {filtered.length} / {initialAccounts.length} tài khoản
      </p>
    </div>
  );
}
