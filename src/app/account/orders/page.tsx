"use client";

import { useState, useEffect } from "react";
import { getStatusLabel, getStatusColor, formatCurrency, formatDate } from "@/lib/utils";
import { Package, ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function OrdersPage() {
  const { status } = useSession();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      if (status !== "authenticated") {
        if (status !== "loading") setLoading(false);
        return;
      }
      try {
        const res = await fetch("/api/orders");
        const data = await res.json();
        if (res.ok) {
          setOrders(data.orders || []);
        } else {
          console.error("Failed to fetch orders:", data.error);
        }
      } catch (err) {
        console.error("Fetch orders error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [status]);

  if (loading || status === "loading") {
    return (
      <div className="container-custom py-16 text-center text-brown-500">
        <Loader2 size={32} className="animate-spin mx-auto mb-4" />
        <p>Đang tải đơn hàng...</p>
      </div>
    );
  }

  // Nếu người dùng chưa đăng nhập nhưng vào được đây
  if (status === "unauthenticated") {
    return (
      <div className="container-custom py-16 text-center text-brown-500">
        <p>Vui lòng đăng nhập để xem đơn hàng.</p>
        <Link href="/login" className="btn-primary mt-4 inline-flex">Đăng nhập</Link>
      </div>
    );
  }

  return (
    <div className="container-custom py-8 md:py-12 max-w-3xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/account" className="text-sm text-brown-500 hover:text-primary-600">Tài khoản</Link>
        <ChevronRight size={14} className="text-brown-400" />
        <span className="text-sm font-medium text-brown-900">Đơn hàng</span>
      </div>

      <h1 className="text-2xl font-serif font-bold text-brown-900 mb-6">Đơn hàng của tôi</h1>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <Package size={48} className="text-cream-300 mx-auto mb-4" />
          <p className="text-brown-500">Bạn chưa có đơn hàng nào</p>
          <Link href="/products" className="btn-primary mt-4 inline-flex">Bắt đầu mua sắm</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="card p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-medium text-brown-900">{order.orderNumber}</p>
                  <p className="text-xs text-brown-500">{formatDate(order.createdAt)}</p>
                </div>
                <span className={`badge text-xs ${getStatusColor(order.status)}`}>
                  {getStatusLabel(order.status)}
                </span>
              </div>
              <div className="space-y-1 mb-3">
                {order.items.map((item: any, i: number) => (
                  <p key={i} className="text-sm text-brown-600">
                    {item.productName} x{item.quantity}
                  </p>
                ))}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-cream-200">
                <span className="text-sm text-brown-500">Tổng cộng</span>
                <span className="font-semibold text-primary-600">{formatCurrency(order.total)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
