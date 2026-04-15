"use client";

import { Search, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { formatCurrency, formatDateShort } from "@/lib/utils";

const mockCustomers = [
  { id: "1", name: "Nguyễn Thanh Hoa", email: "hoa@email.com", phone: "0901234567", orders: 5, totalSpent: 12500000, joinDate: "2024-06-15T00:00:00Z" },
  { id: "2", name: "Trần Văn Minh", email: "minh@email.com", phone: "0912345678", orders: 3, totalSpent: 8400000, joinDate: "2024-08-20T00:00:00Z" },
  { id: "3", name: "Lê Thị Mai", email: "mai@email.com", phone: "0923456789", orders: 8, totalSpent: 21000000, joinDate: "2024-03-10T00:00:00Z" },
  { id: "4", name: "Phạm Thị Hồng", email: "hong@email.com", phone: "0934567890", orders: 2, totalSpent: 5600000, joinDate: "2024-10-01T00:00:00Z" },
  { id: "5", name: "Hoàng Đức Anh", email: "anh@email.com", phone: "0945678901", orders: 6, totalSpent: 15200000, joinDate: "2024-05-25T00:00:00Z" },
  { id: "6", name: "Võ Minh Tuấn", email: "tuan@email.com", phone: "0956789012", orders: 1, totalSpent: 2800000, joinDate: "2024-11-12T00:00:00Z" },
];

export default function AdminCustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = mockCustomers.filter((c) =>
    searchQuery
      ? c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold text-brown-900 mb-6">Khách hàng</h1>

      <div className="relative mb-6">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brown-400" />
        <input type="text" placeholder="Tìm kiếm khách hàng..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-field pl-11 bg-white" />
      </div>

      <div className="bg-white rounded-2xl shadow-warm-sm border border-cream-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-cream-50 border-b border-cream-200">
                <th className="text-left py-4 px-4 text-brown-600 font-semibold">Khách hàng</th>
                <th className="text-left py-4 px-4 text-brown-600 font-semibold">Liên hệ</th>
                <th className="text-right py-4 px-4 text-brown-600 font-semibold">Đơn hàng</th>
                <th className="text-right py-4 px-4 text-brown-600 font-semibold">Tổng chi tiêu</th>
                <th className="text-right py-4 px-4 text-brown-600 font-semibold">Ngày tham gia</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((customer) => (
                <tr key={customer.id} className="border-b border-cream-100 hover:bg-cream-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-sm font-bold text-primary-700">{customer.name[0]}</span>
                      </div>
                      <span className="font-medium text-brown-900">{customer.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="flex items-center gap-1 text-brown-500 text-xs"><Mail size={12} /> {customer.email}</span>
                      <span className="flex items-center gap-1 text-brown-500 text-xs"><Phone size={12} /> {customer.phone}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right font-medium text-brown-700">{customer.orders}</td>
                  <td className="py-3 px-4 text-right font-medium text-primary-600">{formatCurrency(customer.totalSpent)}</td>
                  <td className="py-3 px-4 text-right text-brown-500">{formatDateShort(customer.joinDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-sm text-brown-500 mt-4">Tổng: {filtered.length} khách hàng</p>
    </div>
  );
}
