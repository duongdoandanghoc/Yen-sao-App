"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { LOYALTY_TIERS, LOYALTY_RATE, LOYALTY_REDEEM_VALUE, LOYALTY_MAX_REDEEM_PERCENT, getMemberTier } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Award, TrendingUp, ChevronRight, Loader2, ArrowUpRight, ArrowDownLeft, Gift } from "lucide-react";
import { Link } from "next-view-transitions";

export default function LoyaltyPage() {
  const { data: session, status } = useSession();
  const [points, setPoints] = useState(0);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") { setLoading(false); return; }
    if (status !== "authenticated") return;
    fetch("/api/account/loyalty")
      .then(r => r.json())
      .then(d => { setPoints(d.points || 0); setTransactions(d.transactions || []); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [status]);

  if (loading || status === "loading") {
    return (
      <div className="container-custom py-16 text-center text-brown-500">
        <Loader2 size={32} className="animate-spin mx-auto mb-4" />
        <p>Đang tải...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="container-custom py-16 text-center">
        <p className="text-brown-500">Vui lòng đăng nhập để xem điểm tích lũy.</p>
        <Link href="/login" className="btn-primary mt-4 inline-flex">Đăng nhập</Link>
      </div>
    );
  }

  const currentTier = getMemberTier(points);
  const currentTierIndex = LOYALTY_TIERS.findIndex(t => t.name === currentTier.name);
  const nextTier = LOYALTY_TIERS[currentTierIndex + 1] ?? null;
  const progressPct = nextTier
    ? Math.min(100, ((points - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100)
    : 100;
  const pointsToNextTier = nextTier ? nextTier.minPoints - points : 0;
  const redeemValue = points * LOYALTY_REDEEM_VALUE;

  // Tier gradient style
  const tierGradients: Record<string, string> = {
    "Đồng":      "from-orange-700 to-orange-500",
    "Bạc":       "from-gray-600 to-gray-400",
    "Vàng":      "from-yellow-600 to-amber-400",
    "Kim Cương": "from-purple-700 to-indigo-500",
  };
  const grad = tierGradients[currentTier.name] || "from-primary-700 to-primary-500";

  return (
    <div className="container-custom py-8 md:py-12 max-w-2xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6">
        <Link href="/account" className="text-sm text-brown-500 hover:text-primary-600">Tài khoản</Link>
        <ChevronRight size={14} className="text-brown-400" />
        <span className="text-sm font-medium text-brown-900">Điểm tích lũy</span>
      </div>

      {/* Main Tier Card */}
      <div className={`bg-gradient-to-br ${grad} rounded-2xl p-6 text-white shadow-lg mb-6`}>
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-white/70 text-sm font-medium mb-1">Hạng thành viên</p>
            <p className="text-2xl font-bold flex items-center gap-2">
              {currentTier.icon} {currentTier.name}
            </p>
            {currentTier.bonusRate > 0 && (
              <p className="text-white/80 text-xs mt-1">+{currentTier.bonusRate * 100}% bonus điểm</p>
            )}
          </div>
          <div className="text-right">
            <p className="text-white/70 text-sm">Điểm hiện tại</p>
            <p className="text-4xl font-bold">{points.toLocaleString()}</p>
          </div>
        </div>

        {/* Progress bar to next tier */}
        {nextTier ? (
          <div>
            <div className="flex justify-between text-xs text-white/70 mb-1.5">
              <span>{currentTier.icon} {currentTier.name}</span>
              <span>{nextTier.icon} {nextTier.name} ({nextTier.minPoints.toLocaleString()} điểm)</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-2 bg-white rounded-full transition-all duration-700"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <p className="text-xs text-white/80 mt-1.5 text-center">
              Còn <strong>{pointsToNextTier.toLocaleString()}</strong> điểm nữa để lên hạng {nextTier.name}
            </p>
          </div>
        ) : (
          <div className="text-center mt-2">
            <p className="text-white/90 font-medium">🎉 Bạn đã đạt hạng cao nhất — Kim Cương!</p>
          </div>
        )}

        {/* Redeem value */}
        <div className="mt-4 bg-white/10 rounded-xl p-3 text-center">
          <p className="text-white/70 text-xs">Giá trị quy đổi hiện tại</p>
          <p className="text-xl font-bold">{formatCurrency(redeemValue)}</p>
        </div>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="card p-4 text-center">
          <TrendingUp size={20} className="text-primary-600 mx-auto mb-2" />
          <p className="text-xs text-brown-500">Tích điểm</p>
          <p className="text-sm font-bold text-brown-900">1.000đ = 1 điểm</p>
        </div>
        <div className="card p-4 text-center">
          <Award size={20} className="text-yellow-500 mx-auto mb-2" />
          <p className="text-xs text-brown-500">Quy đổi</p>
          <p className="text-sm font-bold text-brown-900">1 điểm = {formatCurrency(LOYALTY_REDEEM_VALUE)}</p>
        </div>
        <div className="card p-4 text-center">
          <Gift size={20} className="text-pink-500 mx-auto mb-2" />
          <p className="text-xs text-brown-500">Max dùng/đơn</p>
          <p className="text-sm font-bold text-brown-900">{LOYALTY_MAX_REDEEM_PERCENT}% đơn hàng</p>
        </div>
      </div>

      {/* Member Tiers */}
      <div className="card p-5 mb-6">
        <h2 className="font-serif font-semibold text-brown-900 mb-4">Hạng thành viên</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {LOYALTY_TIERS.map((tier) => {
            const isActive = tier.name === currentTier.name;
            return (
              <div
                key={tier.name}
                className={`rounded-xl p-3 text-center transition-all border-2
                  ${isActive ? `${tier.color} ${tier.border} shadow-sm scale-105` : "bg-cream-50 border-cream-200 opacity-70"}`}
              >
                <div className="text-2xl mb-1">{tier.icon}</div>
                <p className="text-xs font-bold">{tier.name}</p>
                <p className="text-[10px] text-brown-500 mt-0.5">{tier.minPoints.toLocaleString()}+ điểm</p>
                <p className="text-[10px] font-semibold text-primary-600 mt-1">
                  +{tier.bonusRate * 100}% bonus
                </p>
                {isActive && (
                  <div className="mt-2 text-[10px] font-bold text-white bg-primary-500 rounded-full px-2 py-0.5">
                    Hạng hiện tại
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-4 p-3 bg-cream-50 rounded-xl">
          <p className="text-xs text-brown-500 text-center">
            💡 Mỗi đơn hàng được cộng điểm vào tài khoản. Có thể dùng điểm để giảm tối đa {LOYALTY_MAX_REDEEM_PERCENT}% giá trị đơn hàng.
          </p>
        </div>
      </div>

      {/* Transaction History */}
      <div className="card p-5">
        <h2 className="font-serif font-semibold text-brown-900 mb-4">Lịch sử điểm</h2>
        {transactions.length === 0 ? (
          <p className="text-center text-brown-400 py-6 text-sm">Chưa có lịch sử điểm</p>
        ) : (
          <div className="space-y-3">
            {transactions.map((t) => (
              <div key={t.id} className="flex items-center gap-3 py-3 border-b border-cream-100 last:border-0">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0
                  ${t.points > 0 ? "bg-green-50" : "bg-orange-50"}`}>
                  {t.points > 0
                    ? <ArrowUpRight size={16} className="text-green-600" />
                    : <ArrowDownLeft size={16} className="text-orange-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-brown-900 truncate">{t.description}</p>
                  <p className="text-xs text-brown-400">{formatDate(t.createdAt)}</p>
                </div>
                <span className={`text-sm font-bold ${t.points > 0 ? "text-green-600" : "text-orange-500"}`}>
                  {t.points > 0 ? "+" : ""}{t.points.toLocaleString()} điểm
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
