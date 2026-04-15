"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

const statusOptions = [
  { value: "ALL", label: "Tất cả" },
  { value: "PENDING", label: "Chờ xử lý" },
  { value: "CONFIRMED", label: "Đã xác nhận" },
  { value: "SHIPPING", label: "Đang giao" },
  { value: "COMPLETED", label: "Hoàn thành" },
  { value: "CANCELLED", label: "Đã hủy" },
];

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-blue-100 text-blue-800",
  SHIPPING: "bg-purple-100 text-purple-800",
  COMPLETED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

export default function AdminOrdersClient({ initialOrders }: { initialOrders: any[] }) {
  const [orders, setOrders] = useState(initialOrders);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      // Optimistic update
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));

      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        alert("Lỗi khi cập nhật trạng thái!");
        router.refresh();
      }
    } catch (error) {
      alert("Lỗi kết nối khi cập nhật!");
      router.refresh();
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === "ALL" || order.status === statusFilter;
    const nameStr = order.shippingName || order.user?.name || "";
    const matchesSearch = searchQuery
      ? order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        nameStr.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-serif font-bold text-brown-900 mb-6">Quản lý đơn hàng</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brown-400" />
          <input 
            type="text" 
            placeholder="Tìm theo mã đơn hoặc tên khách..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            className="input-field pl-11 bg-white" 
          />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="input-field md:w-48 bg-white">
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-warm-sm border border-cream-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-cream-50 border-b border-cream-200">
                <th className="text-left py-4 px-4 text-brown-600 font-semibold">Mã đơn</th>
                <th className="text-left py-4 px-4 text-brown-600 font-semibold">Khách hàng</th>
                <th className="text-right py-4 px-4 text-brown-600 font-semibold">Tổng tiền</th>
                <th className="text-center py-4 px-4 text-brown-600 font-semibold">Trạng thái hiện tại</th>
                <th className="text-right py-4 px-4 text-brown-600 font-semibold">Ngày đặt</th>
                <th className="text-center py-4 px-4 text-brown-600 font-semibold">Đổi trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-brown-500">
                    Không tìm thấy đơn hàng nào.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const customerName = order.shippingName || order.user?.name;
                  const customerPhone = order.shippingPhone || order.user?.phone;
                  return (
                    <tr key={order.id} className="border-b border-cream-100 hover:bg-cream-50 transition-colors">
                      <td className="py-3 px-4 font-medium text-brown-900">{order.orderNumber}</td>
                      <td className="py-3 px-4">
                        <p className="text-brown-900">{customerName}</p>
                        <p className="text-xs text-brown-400">{customerPhone}</p>
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-primary-600">{formatCurrency(order.total)}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-block text-xs px-3 py-1 rounded-full font-medium ${statusColors[order.status]}`}>
                          {statusOptions.find(o => o.value === order.status)?.label || order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-brown-500">
                        {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className="text-xs border border-cream-300 rounded-lg px-2 py-1.5 bg-white focus:ring-2 focus:ring-primary-300"
                        >
                          <option value="PENDING">Chờ xử lý</option>
                          <option value="CONFIRMED">Xác nhận</option>
                          <option value="SHIPPING">Đang giao</option>
                          <option value="COMPLETED">Hoàn thành</option>
                          <option value="CANCELLED">Hủy</option>
                        </select>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-sm text-brown-500 mt-4">
        Hiển thị {filteredOrders.length} / {orders.length} đơn hàng
      </p>
    </div>
  );
}
