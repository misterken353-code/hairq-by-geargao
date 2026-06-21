"use client";

import { useEffect, useState } from "react";

interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
  isActive: boolean;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", price: "", duration: "" });

  const fetchServices = () => {
    const token = localStorage.getItem("hairq_token");
    if (!token) return;
    fetch("/api/admin/services", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => { setServices(d.services || []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchServices(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("hairq_token");
    if (!token) return;
    const res = await fetch("/api/admin/services", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name: form.name, price: Number(form.price), duration: Number(form.duration) }),
    });
    if (res.ok) {
      setForm({ name: "", price: "", duration: "" });
      setShowForm(false);
      fetchServices();
    }
  };

  if (loading) return <p className="text-slate-400">กำลังโหลด...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">บริการ</h1>
      <div className="mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-xl bg-[#c5a059] px-5 py-2.5 text-sm font-bold text-[#062c1b] hover:bg-[#d4af37] transition"
        >
          + เพิ่มบริการ
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 rounded-2xl border border-white/10 bg-[#0d2137] p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">ชื่อบริการ</label>
            <input
              type="text" required value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full rounded-lg bg-[#0a1929] border border-white/10 px-4 py-2.5 text-sm text-white focus:border-[#c5a059] focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">ราคา (บาท)</label>
              <input
                type="number" required value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                className="w-full rounded-lg bg-[#0a1929] border border-white/10 px-4 py-2.5 text-sm text-white focus:border-[#c5a059] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">ระยะเวลา (นาที)</label>
              <input
                type="number" required value={form.duration}
                onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}
                className="w-full rounded-lg bg-[#0a1929] border border-white/10 px-4 py-2.5 text-sm text-white focus:border-[#c5a059] focus:outline-none"
              />
            </div>
          </div>
          <button type="submit" className="rounded-xl bg-[#c5a059] px-5 py-2.5 text-sm font-bold text-[#062c1b] hover:bg-[#d4af37] transition">
            บันทึก
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.length === 0 ? (
          <p className="text-slate-400 col-span-full">ยังไม่มีบริการ</p>
        ) : (
          services.map((s) => (
            <div key={s.id} className="rounded-2xl border border-white/10 bg-[#0d2137] p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-white">{s.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  s.isActive ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-500/20 text-slate-400"
                }`}>
                  {s.isActive ? "ใช้งาน" : "ปิด"}
                </span>
              </div>
              <p className="text-sm text-slate-400 mb-1">ราคา: ฿{s.price.toLocaleString()}</p>
              <p className="text-sm text-slate-400 mb-4">ระยะเวลา: {s.duration} นาที</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
