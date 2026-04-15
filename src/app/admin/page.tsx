import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";
import { Package, ShoppingCart, Users, TrendingUp, ArrowUpRight } from "lucide-react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-blue-100 text-blue-800",
  SHIPPING: "bg-purple-100 text-purple-800",
  COMPLETED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

const statusLabels: Record<string, string> = {
  PENDING: "Chờ xử lý",
  CONFIRMED: "Đã xác nhận",
  SHIPPING: "Đang giao",
  COMPLETED: "Hoàn thành",
  CANCELLED: "Đã hủy",
};

export default async function AdminDashboard() {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    redirect("/"); // Không cho phép truy cập nếu không phải admin
  }

  // Lấy dữ liệu thực từ Prisma
  const totalOrders = await prisma.order.count();
  const totalProducts = await prisma.product.count();
  const totalCustomers = await prisma.user.count({ where: { role: "USER" } });
  
  const completedOrders = await prisma.order.findMany({
    where: { status: "COMPLETED" },
    select: { total: true },
  });
  const revenue = completedOrders.reduce((sum, order) => sum + order.total, 0);

  const recentOrders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { user: true },
  });

  const topProducts = await prisma.product.findMany({
    orderBy: { reviewCount: "desc" },
    take: 5,
  });

  const stats = [
    { label: "Tổng đơn hàng", value: totalOrders.toString(), change: "+0%", icon: ShoppingCart, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Doanh thu", value: formatCurrency(revenue), change: "+0%", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
    { label: "Sản phẩm", value: totalProducts.toString(), change: "+0", icon: Package, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Khách hàng", value: totalCustomers.toString(), change: "+0%", icon: Users, color: "text-primary-600", bg: "bg-primary-50" },
  ];

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-bold text-brown-900">Tổng Quan</h1>
        <p className="text-sm font-medium text-brown-600 bg-cream-100 px-4 py-2 rounded-xl">🛒 Quản trị hệ thống (Admin)</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-warm-sm border border-cream-200">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center`}>
                <stat.icon size={20} className={stat.color} />
              </div>
              <span className="text-xs font-medium text-green-600 flex items-center gap-0.5">
                {stat.change} <ArrowUpRight size={12} />
              </span>
            </div>
            <p className="text-2xl font-bold text-brown-900">{stat.value}</p>
            <p className="text-sm text-brown-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl p-6 shadow-warm-sm border border-cream-200 lg:col-span-2">
          <h2 className="font-serif font-semibold text-brown-900 mb-4">Đơn hàng mới nhất</h2>
          <div className="space-y-3">
            {recentOrders.length === 0 ? (
              <p className="text-sm text-brown-500 text-center py-4">Chưa có đơn hàng nào</p>
            ) : (
              recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-2 border-b border-cream-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-brown-900">{order.shippingName || order.user.name}</p>
                    <p className="text-xs text-brown-400">{order.orderNumber} • {order.createdAt.toLocaleDateString("vi-VN")}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-primary-600">{formatCurrency(order.total)}</p>
                    <span className={`inline-block text-xs px-2 py-0.5 rounded-full ${statusColors[order.status]}`}>
                      {statusLabels[order.status]}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-2xl p-6 shadow-warm-sm border border-cream-200 mt-6">
        <h2 className="font-serif font-semibold text-brown-900 mb-4">Danh sách sản phẩm</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cream-200">
                <th className="text-left py-3 px-2 text-brown-500 font-medium">Sản phẩm</th>
                <th className="text-left py-3 px-2 text-brown-500 font-medium">Loại</th>
                <th className="text-right py-3 px-2 text-brown-500 font-medium">Giá</th>
                <th className="text-right py-3 px-2 text-brown-500 font-medium">Đánh giá</th>
                <th className="text-right py-3 px-2 text-brown-500 font-medium">Kho</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product) => (
                <tr key={product.id} className="border-b border-cream-100 hover:bg-cream-50">
                  <td className="py-3 px-2 font-medium text-brown-900">{product.name}</td>
                  <td className="py-3 px-2 text-brown-500">
                    {product.category === "RAW" ? "Yến thô" : product.category === "REFINED" ? "Tinh chế" : "Chưng sẵn"}
                  </td>
                  <td className="py-3 px-2 text-right text-primary-600 font-medium">{formatCurrency(product.price)}</td>
                  <td className="py-3 px-2 text-right">⭐ {product.averageRating || 0}</td>
                  <td className="py-3 px-2 text-right text-brown-600">{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
