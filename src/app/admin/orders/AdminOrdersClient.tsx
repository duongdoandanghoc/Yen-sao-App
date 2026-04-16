"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { Search, ChevronDown, ChevronUp, Package } from "lucide-react";
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
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
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
                <th className="text-left py-4 px-4 text-brown-600 font-semibold">Sản phẩm</th>
                <th className="text-right py-4 px-4 text-brown-600 font-semibold">Tổng tiền</th>
                <th className="text-center py-4 px-4 text-brown-600 font-semibold">Trạng thái</th>
                <th className="text-right py-4 px-4 text-brown-600 font-semibold">Ngày đặt</th>
                <th className="text-center py-4 px-4 text-brown-600 font-semibold">Đổi trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-brown-500">
                    Không tìm thấy đơn hàng nào.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const customerName = order.shippingName || order.user?.name;
                  const customerPhone = order.shippingPhone || order.user?.phone;
                  const isExpanded = expandedOrder === order.id;
                  const items = order.items || [];

                  return (
                    <tr key={order.id} className="border-b border-cream-100 hover:bg-cream-50 transition-colors">
                      <td className="py-3 px-4">
                        <p className="font-mono font-semibold text-primary-700">{order.orderNumber}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-brown-900 font-medium">{customerName}</p>
                        <p className="text-xs text-brown-400">{customerPhone}</p>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          {/* Show first item + count */}
                          {items.length > 0 && (
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-cream-100 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                                {items[0].productImage ? (
                                  <img src={items[0].productImage} alt="" className="w-full h-full object-cover" />
                                ) : (
                                  <Package size={14} className="text-brown-400" />
                                )}
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs text-brown-900 truncate max-w-[150px]">
                                  {items[0].productName} <span className="text-brown-400">x{items[0].quantity}</span>
                                </p>
                                {items.length > 1 && (
                                  <button
                                    onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                                    className="text-xs text-primary-600 hover:text-primary-700 flex items-center gap-0.5"
                                  >
                                    +{items.length - 1} sản phẩm khác
                                    {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                                  </button>
                                )}
                              </div>
                            </div>
                          )}
                          {/* Expanded items */}
                          {isExpanded && items.length > 1 && (
                            <div className="mt-2 space-y-1.5 pl-10">
                              {items.slice(1).map((item: any) => (
                                <div key={item.id} className="flex items-center gap-2">
                                  <div className="w-6 h-6 bg-cream-100 rounded flex-shrink-0 flex items-center justify-center overflow-hidden">
                                    {item.productImage ? (
                                      <img src={item.productImage} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                      <Package size={10} className="text-brown-400" />
                                    )}
                                  </div>
                                  <p className="text-xs text-brown-600 truncate">
                                    {item.productName} <span className="text-brown-400">x{item.quantity}</span>
                                    <span className="ml-1 text-primary-600">{formatCurrency(item.price * item.quantity)}</span>
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-primary-600">{formatCurrency(order.total)}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-block text-xs px-3 py-1 rounded-full font-medium ${statusColors[order.status]}`}>
                          {statusOptions.find(o => o.value === order.status)?.label || order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-brown-500 text-xs">
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
                  );
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
