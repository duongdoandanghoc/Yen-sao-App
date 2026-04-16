"use client";

import { useState, useEffect } from "react";
import { getStatusLabel, getStatusColor, formatCurrency, formatDate } from "@/lib/utils";
import { Package, ChevronRight, Loader2, ChevronDown, ChevronUp, MapPin, Award, Clock } from "lucide-react";
import { Link } from "next-view-transitions";
import { useSession } from "next-auth/react";

const TRACKING_STEPS = [
  { status: "PENDING", label: "Chờ xác nhận", icon: "📋" },
  { status: "CONFIRMED", label: "Đã xác nhận", icon: "✅" },
  { status: "SHIPPING", label: "Đang giao hàng", icon: "🚚" },
  { status: "COMPLETED", label: "Đã nhận hàng", icon: "🎉" },
];

const STATUS_ORDER = ["PENDING", "CONFIRMED", "SHIPPING", "COMPLETED"];

function TrackingTimeline({ status }: { status: string }) {
  if (status === "CANCELLED") {
    return (
      <div className="flex items-center gap-2 py-2 px-3 bg-red-50 rounded-xl text-sm text-red-600">
        <span>❌</span> Đơn hàng đã bị hủy
      </div>
    );
  }
  const currentIndex = STATUS_ORDER.indexOf(status);
  return (
    <div className="flex items-center gap-1 mt-3 overflow-x-auto py-2">
      {TRACKING_STEPS.map((step, i) => {
        const done = i <= currentIndex;
        const active = i === currentIndex;
        return (
          <div key={step.status} className="flex items-center gap-1">
            <div className="flex flex-col items-center gap-1 min-w-[64px]">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-base transition-all
                ${done ? "bg-primary-500 shadow-md" : "bg-cream-200"}
                ${active ? "ring-2 ring-primary-300 ring-offset-1" : ""}`}>
                {step.icon}
              </div>
              <span className={`text-[10px] text-center leading-tight font-medium ${done ? "text-primary-600" : "text-brown-400"}`}>
                {step.label}
              </span>
            </div>
            {i < TRACKING_STEPS.length - 1 && (
              <div className={`h-0.5 w-6 flex-shrink-0 mb-4 rounded ${i < currentIndex ? "bg-primary-400" : "bg-cream-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function OrdersPage() {
  const { status } = useSession();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      if (status !== "authenticated") {
        if (status !== "loading") setLoading(false);
        return;
      }
      try {
        const res = await fetch("/api/orders");
        const data = await res.json();
        if (res.ok) setOrders(data.orders || []);
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

      <h1 className="text-2xl font-serif font-bold text-brown-900 mb-6 flex items-center gap-2">
        <Package size={28} className="text-orange-500" /> Đơn hàng của tôi
      </h1>

      {orders.length === 0 ? (
        <div className="text-center py-16 card">
          <Package size={48} className="text-cream-300 mx-auto mb-4" />
          <p className="text-brown-500">Bạn chưa có đơn hàng nào</p>
          <Link href="/products" className="btn-primary mt-4 inline-flex">Bắt đầu mua sắm</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const isExpanded = expandedId === order.id;
            return (
              <div key={order.id} className="card overflow-hidden">
                {/* Order Header */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <p className="font-mono font-bold text-primary-600 text-base">{order.orderNumber}</p>
                      <p className="text-xs text-brown-400 flex items-center gap-1 mt-0.5">
                        <Clock size={11} /> {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <span className={`badge text-xs ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </div>

                  {/* Tracking Timeline */}
                  <TrackingTimeline status={order.status} />

                  {/* Address */}
                  <div className="flex items-start gap-1.5 mt-3 text-xs text-brown-500">
                    <MapPin size={12} className="flex-shrink-0 mt-0.5" />
                    <span>{order.shippingName} • {order.shippingPhone}<br />{order.shippingAddress}</span>
                  </div>

                  {/* Loyalty */}
                  {order.loyaltyEarned > 0 && (
                    <div className="flex items-center gap-1.5 mt-2 text-xs text-yellow-600">
                      <Award size={12} /> Tích được <strong>{order.loyaltyEarned}</strong> điểm
                    </div>
                  )}
                </div>

                {/* Items Section (collapsible) */}
                <div className="border-t border-cream-200">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : order.id)}
                    className="w-full flex items-center justify-between px-5 py-3 text-sm text-brown-600 hover:bg-cream-50 transition"
                  >
                    <span>{order.items?.length || 0} sản phẩm</span>
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-4 space-y-2 animate-fade-in">
                      {order.items.map((item: any, i: number) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-cream-100 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                            {item.productImage
                              ? <img src={item.productImage} alt="" className="w-full h-full object-cover" />
                              : <Package size={16} className="text-brown-300" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-brown-900 truncate">{item.productName}</p>
                            <p className="text-xs text-brown-400">x{item.quantity}</p>
                          </div>
                          <p className="text-sm font-medium text-primary-600">{formatCurrency(item.price * item.quantity)}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-5 py-3 bg-cream-50 border-t border-cream-200">
                  <span className="text-sm text-brown-500">Tổng cộng</span>
                  <span className="font-bold text-primary-600">{formatCurrency(order.total)}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
