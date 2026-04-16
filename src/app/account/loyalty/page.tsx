"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { ChevronRight, Loader2, Award, TrendingUp, Gift, ArrowRightLeft } from "lucide-react";
import { Link } from "next-view-transitions";
import { formatCurrency, formatDate } from "@/lib/utils";
import { getMemberTier, LOYALTY_TIERS, LOYALTY_REDEEM_VALUE } from "@/types";

export default function LoyaltyPage() {
  const { status } = useSession();
  const [loading, setLoading] = useState(true);
  const [points, setPoints] = useState(0);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    if (status === "authenticated") fetchLoyalty();
    else if (status !== "loading") setLoading(false);
  }, [status]);

  const fetchLoyalty = async () => {
    try {
      const res = await fetch("/api/account/loyalty");
      const data = await res.json();
      if (res.ok) {
        setPoints(data.points || 0);
        setTransactions(data.transactions || []);
      }
    } catch {} finally { setLoading(false); }
  };

  if (loading || status === "loading") {
    return <div className="container-custom py-16 text-center"><Loader2 size={32} className="animate-spin mx-auto mb-4 text-brown-400" /><p className="text-brown-500">Đang tải...</p></div>;
  }

  const tier = getMemberTier(points);
  const nextTierIndex = LOYALTY_TIERS.findIndex(t => t.name === tier.name) + 1;
  const nextTier = nextTierIndex < LOYALTY_TIERS.length ? LOYALTY_TIERS[nextTierIndex] : null;
  const progressToNext = nextTier ? Math.min(((points - tier.minPoints) / (nextTier.minPoints - tier.minPoints)) * 100, 100) : 100;

  return (
    <div className="container-custom py-8 md:py-12 max-w-3xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/account" className="text-sm text-brown-500 hover:text-primary-600">Tài khoản</Link>
        <ChevronRight size={14} className="text-brown-400" />
        <span className="text-sm font-medium text-brown-900">Điểm tích lũy</span>
      </div>

      <h1 className="text-2xl font-serif font-bold text-brown-900 mb-6 flex items-center gap-2">
        <Award size={28} className="text-yellow-500" /> Điểm tích lũy
      </h1>

      {/* Points Card */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 rounded-2xl p-6 text-white mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-primary-200 text-sm">Hạng thành viên</p>
              <p className="text-2xl font-bold mt-1">{tier.icon} {tier.name}</p>
            </div>
            <div className="text-right">
              <p className="text-primary-200 text-sm">Điểm hiện tại</p>
              <p className="text-3xl font-bold mt-1">{points.toLocaleString()}</p>
            </div>
          </div>
          
          {/* Progress to next tier */}
          {nextTier && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-primary-200 mb-1">
                <span>{tier.icon} {tier.name}</span>
                <span>{nextTier.icon} {nextTier.name} ({nextTier.minPoints.toLocaleString()} điểm)</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-yellow-400 h-2 rounded-full transition-all" style={{ width: `${progressToNext}%` }} />
              </div>
              <p className="text-xs text-primary-200 mt-1">Còn {(nextTier.minPoints - points).toLocaleString()} điểm nữa</p>
            </div>
          )}

          {/* Redeem value */}
          <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between">
            <span className="text-sm text-primary-200">Giá trị quy đổi</span>
            <span className="font-semibold">{formatCurrency(points * LOYALTY_REDEEM_VALUE)}</span>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="card p-4 text-center">
          <TrendingUp size={24} className="text-green-500 mx-auto mb-2" />
          <p className="text-xs text-brown-500">Tích điểm</p>
          <p className="font-bold text-brown-900 mt-1">1.000đ = 1 điểm</p>
        </div>
        <div className="card p-4 text-center">
          <ArrowRightLeft size={24} className="text-blue-500 mx-auto mb-2" />
          <p className="text-xs text-brown-500">Quy đổi</p>
          <p className="font-bold text-brown-900 mt-1">1 điểm = {LOYALTY_REDEEM_VALUE}đ</p>
        </div>
        <div className="card p-4 text-center">
          <Gift size={24} className="text-purple-500 mx-auto mb-2" />
          <p className="text-xs text-brown-500">Bonus hạng {tier.name}</p>
          <p className="font-bold text-brown-900 mt-1">+{(tier.bonusRate * 100).toFixed(0)}% điểm</p>
        </div>
      </div>

      {/* Tiers */}
      <div className="card p-6 mb-6">
        <h2 className="font-serif font-semibold text-brown-900 mb-4">Hạng thành viên</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {LOYALTY_TIERS.map((t) => (
            <div key={t.name} className={`p-3 rounded-xl text-center border-2 transition-all ${t.name === tier.name ? "border-primary-400 bg-primary-50" : "border-cream-200"}`}>
              <span className="text-2xl">{t.icon}</span>
              <p className="font-semibold text-brown-900 mt-1 text-sm">{t.name}</p>
              <p className="text-xs text-brown-500 mt-0.5">{t.minPoints.toLocaleString()}+ điểm</p>
              <p className="text-xs text-primary-600 mt-1">+{(t.bonusRate * 100).toFixed(0)}% bonus</p>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <div className="card p-6">
        <h2 className="font-serif font-semibold text-brown-900 mb-4">Lịch sử điểm</h2>
        {transactions.length === 0 ? (
          <p className="text-sm text-brown-500 text-center py-8">Chưa có lịch sử tích điểm</p>
        ) : (
          <div className="space-y-3">
            {transactions.map((tx: any) => (
              <div key={tx.id} className="flex items-center justify-between py-2 border-b border-cream-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-brown-900">{tx.description}</p>
                  <p className="text-xs text-brown-400">{formatDate(tx.createdAt)}</p>
                </div>
                <span className={`font-bold text-sm ${tx.points > 0 ? "text-green-600" : "text-red-500"}`}>
                  {tx.points > 0 ? "+" : ""}{tx.points}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
