import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";
import { Package, ShoppingCart, Users, TrendingUp, ArrowUpRight, UserCircle, Award } from "lucide-react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Link } from "next-view-transitions";

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
    redirect("/");
  }

  const [
    totalOrders,
    totalProducts,
    totalCustomers,
    completedOrders,
    recentOrders,
    ordersByStatus,
    topProducts,
    recentUsers,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.product.count(),
    prisma.user.count({ where: { role: "USER" } }),
    prisma.order.findMany({ where: { status: "COMPLETED" }, select: { total: true } }),
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { user: { select: { name: true } }, items: { select: { productName: true, quantity: true } } },
    }),
    prisma.order.groupBy({ by: ["status"], _count: { status: true } }),
    prisma.product.findMany({ orderBy: { reviewCount: "desc" }, take: 5 }),
    prisma.user.findMany({
      where: { role: "USER" },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, name: true, email: true, createdAt: true }
    }),
  ]);

  const revenue = completedOrders.reduce((sum, order) => sum + order.total, 0);
  const pendingCount = ordersByStatus.find(o => o.status === "PENDING")?._count?.status || 0;
  const shippingCount = ordersByStatus.find(o => o.status === "SHIPPING")?._count?.status || 0;
  const completedCount = ordersByStatus.find(o => o.status === "COMPLETED")?._count?.status || 0;

  const stats = [
    { label: "Tổng đơn hàng", value: totalOrders.toString(), sub: `${pendingCount} chờ xử lý`, icon: ShoppingCart, color: "text-blue-600", bg: "bg-blue-50", href: "/admin/orders" },
    { label: "Doanh thu", value: formatCurrency(revenue), sub: `${completedCount} đơn hoàn thành`, icon: TrendingUp, color: "text-green-600", bg: "bg-green-50", href: "/admin/orders" },
    { label: "Sản phẩm", value: totalProducts.toString(), sub: "Đang kinh doanh", icon: Package, color: "text-purple-600", bg: "bg-purple-50", href: "/admin/products" },
    { label: "Khách hàng", value: totalCustomers.toString(), sub: `${shippingCount} đang giao hàng`, icon: Users, color: "text-primary-600", bg: "bg-primary-50", href: "/admin/customers" },
  ];

  // Bar chart data - order status distribution
  const statusData = ordersByStatus.map(o => ({
    status: statusLabels[o.status] || o.status,
    count: o._count.status,
    color: o.status === "COMPLETED" ? "#22c55e"
      : o.status === "SHIPPING" ? "#a855f7"
      : o.status === "CONFIRMED" ? "#3b82f6"
      : o.status === "CANCELLED" ? "#ef4444"
      : "#eab308",
  }));
  const maxCount = Math.max(...statusData.map(d => d.count), 1);

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-bold text-brown-900">Tổng Quan</h1>
        <p className="text-sm font-medium text-brown-600 bg-cream-100 px-4 py-2 rounded-xl">🛒 Quản trị hệ thống (Admin)</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="bg-white rounded-2xl p-5 shadow-warm-sm border border-cream-200 hover:shadow-warm-md transition-shadow block">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center`}>
                <stat.icon size={20} className={stat.color} />
              </div>
              <ArrowUpRight size={16} className="text-brown-300" />
            </div>
            <p className="text-2xl font-bold text-brown-900">{stat.value}</p>
            <p className="text-sm text-brown-500 mt-0.5">{stat.label}</p>
            <p className="text-xs text-brown-400 mt-1">{stat.sub}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Orders by Status - Bar Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-warm-sm border border-cream-200">
          <h2 className="font-serif font-semibold text-brown-900 mb-4">Đơn hàng theo trạng thái</h2>
          {statusData.length === 0 ? (
            <p className="text-sm text-brown-400 text-center py-6">Chưa có dữ liệu</p>
          ) : (
            <div className="space-y-3">
              {statusData.map((item) => (
                <div key={item.status}>
                  <div className="flex justify-between text-xs text-brown-600 mb-1">
                    <span>{item.status}</span>
                    <span className="font-semibold">{item.count}</span>
                  </div>
                  <div className="w-full bg-cream-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(item.count / maxCount) * 100}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl p-6 shadow-warm-sm border border-cream-200 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif font-semibold text-brown-900">Đơn hàng mới nhất</h2>
            <Link href="/admin/orders" className="text-xs text-primary-600 hover:text-primary-700 font-medium">Xem tất cả →</Link>
          </div>
          <div className="space-y-3">
            {recentOrders.length === 0 ? (
              <p className="text-sm text-brown-500 text-center py-4">Chưa có đơn hàng nào</p>
            ) : (
              recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-2 border-b border-cream-100 last:border-0">
                  <div>
                    <p className="text-sm font-mono font-semibold text-primary-600">{order.orderNumber}</p>
                    <p className="text-xs text-brown-400">{order.shippingName || order.user.name}</p>
                    {order.items.slice(0, 2).map((item, i) => (
                      <p key={i} className="text-xs text-brown-400">{item.productName} x{item.quantity}</p>
                    ))}
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

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-2xl p-6 shadow-warm-sm border border-cream-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif font-semibold text-brown-900">Sản phẩm nổi bật</h2>
            <Link href="/admin/products" className="text-xs text-primary-600 hover:text-primary-700 font-medium">Xem tất cả →</Link>
          </div>
          <div className="space-y-3">
            {topProducts.map((product, i) => (
              <div key={product.id} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-cream-100 rounded-lg flex items-center justify-center text-base flex-shrink-0">
                  {product.images?.[0]
                    ? <img src={product.images[0]} alt="" className="w-full h-full object-cover rounded-lg" />
                    : (product.category === "RAW" ? "🪹" : product.category === "REFINED" ? "✨" : "🍯")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-brown-900 truncate">{product.name}</p>
                  <p className="text-xs text-brown-400">⭐ {product.averageRating} • {product.reviewCount} đánh giá</p>
                </div>
                <p className="text-sm font-semibold text-primary-600 flex-shrink-0">{formatCurrency(product.price)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white rounded-2xl p-6 shadow-warm-sm border border-cream-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif font-semibold text-brown-900">Tài khoản mới</h2>
            <Link href="/admin/accounts" className="text-xs text-primary-600 hover:text-primary-700 font-medium">Xem tất cả →</Link>
          </div>
          <div className="space-y-3">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary-700">{user.name[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-brown-900 truncate">{user.name}</p>
                  <p className="text-xs text-brown-400 truncate">{user.email}</p>
                </div>
                <p className="text-xs text-brown-400 flex-shrink-0">
                  {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
