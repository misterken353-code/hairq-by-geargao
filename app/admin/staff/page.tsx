"use client";

import { useEffect, useState } from "react";

interface StaffMember {
  id: string;
  name: string;
  role: string;
  phone: string | null;
  isActive: boolean;
}

export default function StaffPage() {
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", role: "" });

  const fetchStaff = () => {
    const token = localStorage.getItem("hairq_token");
    if (!token) return;
    fetch("/api/admin/staff", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => { setStaffList(d.staff || []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchStaff(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("hairq_token");
    if (!token) return;
    const res = await fetch("/api/admin/staff", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name: form.name, phone: form.phone, role: form.role || "ช่าง" }),
    });
    if (res.ok) {
      setForm({ name: "", phone: "", role: "" });
      setShowForm(false);
      fetchStaff();
    }
  };

  if (loading) return <p className="text-slate-400">กำลังโหลด...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">ช่าง / พนักงาน</h1>
      <div className="mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-xl bg-[#c5a059] px-5 py-2.5 text-sm font-bold text-[#062c1b] hover:bg-[#d4af37] transition"
        >
          + เพิ่มช่าง
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 rounded-2xl border border-white/10 bg-[#0d2137] p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">ชื่อ</label>
            <input
              type="text" required value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full rounded-lg bg-[#0a1929] border border-white/10 px-4 py-2.5 text-sm text-white focus:border-[#c5a059] focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">เบอร์โทร</label>
              <input
                type="tel" value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className="w-full rounded-lg bg-[#0a1929] border border-white/10 px-4 py-2.5 text-sm text-white focus:border-[#c5a059] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">ตำแหน่ง</label>
              <input
                type="text" value={form.role}
                placeholder="ช่าง"
                onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
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
        {staffList.length === 0 ? (
          <p className="text-slate-400 col-span-full">ยังไม่มีช่าง</p>
        ) : (
          staffList.map((s) => (
            <div key={s.id} className="rounded-2xl border border-white/10 bg-[#0d2137] p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-full bg-[#0a3d29] flex items-center justify-center text-lg font-bold text-[#c5a059]">
                  {s.name.charAt(0)}
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  s.isActive ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-500/20 text-slate-400"
                }`}>
                  {s.isActive ? "ทำงาน" : "ลา"}
                </span>
              </div>
              <h3 className="font-bold text-white mb-1">{s.name}</h3>
              <p className="text-sm text-slate-400 mb-1">{s.role}</p>
              <p className="text-sm text-slate-400">{s.phone || "-"}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
