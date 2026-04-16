"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { ChevronRight, Loader2, Plus, MapPin, Trash2, Star, Edit2, X, Save } from "lucide-react";
import { Link } from "next-view-transitions";
import { AddressType } from "@/types";

export default function AddressesPage() {
  const { status } = useSession();
  const [addresses, setAddresses] = useState<AddressType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ fullName: "", phone: "", street: "", ward: "", district: "", city: "", isDefault: false });

  useEffect(() => {
    if (status === "authenticated") fetchAddresses();
    else if (status !== "loading") setLoading(false);
  }, [status]);

  const fetchAddresses = async () => {
    try {
      const res = await fetch("/api/account/addresses");
      const data = await res.json();
      if (res.ok) setAddresses(data.addresses || []);
    } catch {} finally { setLoading(false); }
  };

  const resetForm = () => {
    setForm({ fullName: "", phone: "", street: "", ward: "", district: "", city: "", isDefault: false });
    setShowForm(false);
    setEditingId(null);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const url = editingId ? `/api/account/addresses/${editingId}` : "/api/account/addresses";
      const method = editingId ? "PATCH" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (res.ok) { await fetchAddresses(); resetForm(); }
      else { const d = await res.json(); alert(d.error || "Lỗi"); }
    } catch { alert("Lỗi kết nối"); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Xóa địa chỉ này?")) return;
    try {
      await fetch(`/api/account/addresses/${id}`, { method: "DELETE" });
      await fetchAddresses();
    } catch { alert("Lỗi kết nối"); }
  };

  const startEdit = (addr: AddressType) => {
    setForm({ fullName: addr.fullName, phone: addr.phone, street: addr.street, ward: addr.ward, district: addr.district, city: addr.city, isDefault: addr.isDefault });
    setEditingId(addr.id);
    setShowForm(true);
  };

  if (loading || status === "loading") {
    return <div className="container-custom py-16 text-center"><Loader2 size={32} className="animate-spin mx-auto mb-4 text-brown-400" /><p className="text-brown-500">Đang tải...</p></div>;
  }

  return (
    <div className="container-custom py-8 md:py-12 max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/account" className="text-sm text-brown-500 hover:text-primary-600">Tài khoản</Link>
        <ChevronRight size={14} className="text-brown-400" />
        <span className="text-sm font-medium text-brown-900">Địa chỉ giao hàng</span>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-bold text-brown-900 flex items-center gap-2">
          <MapPin size={28} className="text-primary-600" /> Địa chỉ giao hàng
        </h1>
        {!showForm && (
          <button onClick={() => { resetForm(); setShowForm(true); }} className="btn-primary text-sm gap-1">
            <Plus size={16} /> Thêm mới
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="card p-6 mb-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-brown-900">{editingId ? "Sửa địa chỉ" : "Thêm địa chỉ mới"}</h2>
            <button onClick={resetForm}><X size={20} className="text-brown-400" /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-brown-700 mb-1">Họ tên *</label><input value={form.fullName} onChange={(e) => setForm({...form, fullName: e.target.value})} className="input-field" placeholder="Nguyễn Văn A" /></div>
            <div><label className="block text-sm font-medium text-brown-700 mb-1">SĐT *</label><input value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} className="input-field" placeholder="0901 234 567" /></div>
            <div className="sm:col-span-2"><label className="block text-sm font-medium text-brown-700 mb-1">Địa chỉ *</label><input value={form.street} onChange={(e) => setForm({...form, street: e.target.value})} className="input-field" placeholder="Số nhà, đường" /></div>
            <div><label className="block text-sm font-medium text-brown-700 mb-1">Phường/Xã</label><input value={form.ward} onChange={(e) => setForm({...form, ward: e.target.value})} className="input-field" /></div>
            <div><label className="block text-sm font-medium text-brown-700 mb-1">Quận/Huyện</label><input value={form.district} onChange={(e) => setForm({...form, district: e.target.value})} className="input-field" /></div>
            <div className="sm:col-span-2"><label className="block text-sm font-medium text-brown-700 mb-1">Tỉnh/Thành *</label><input value={form.city} onChange={(e) => setForm({...form, city: e.target.value})} className="input-field" /></div>
            <div className="sm:col-span-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.isDefault} onChange={(e) => setForm({...form, isDefault: e.target.checked})} className="rounded border-cream-300" />
                <span className="text-sm text-brown-700">Đặt làm địa chỉ mặc định</span>
              </label>
            </div>
          </div>
          <button onClick={handleSave} disabled={saving || !form.fullName || !form.phone || !form.street || !form.city} className="btn-primary w-full mt-4 gap-2">
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {saving ? "Đang lưu..." : "Lưu địa chỉ"}
          </button>
        </div>
      )}

      {/* Address List */}
      {addresses.length === 0 ? (
        <div className="text-center py-12 card">
          <MapPin size={40} className="text-cream-300 mx-auto mb-3" />
          <p className="text-brown-500">Chưa có địa chỉ nào</p>
          <p className="text-sm text-brown-400 mt-1">Thêm địa chỉ giao hàng để đặt hàng nhanh hơn</p>
        </div>
      ) : (
        <div className="space-y-3">
          {addresses.map((addr) => (
            <div key={addr.id} className={`card p-4 ${addr.isDefault ? "border-primary-300 bg-primary-50/30" : ""}`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-brown-900">{addr.fullName}</p>
                    <span className="text-brown-400">•</span>
                    <p className="text-sm text-brown-500">{addr.phone}</p>
                    {addr.isDefault && (
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-primary-100 text-primary-700">
                        <Star size={10} /> Mặc định
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-brown-600">{[addr.street, addr.ward, addr.district, addr.city].filter(Boolean).join(", ")}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button onClick={() => startEdit(addr)} className="p-2 hover:bg-primary-50 rounded-lg text-brown-400 hover:text-primary-600 transition"><Edit2 size={16} /></button>
                  <button onClick={() => handleDelete(addr.id)} className="p-2 hover:bg-error-50 rounded-lg text-brown-400 hover:text-error-500 transition"><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
