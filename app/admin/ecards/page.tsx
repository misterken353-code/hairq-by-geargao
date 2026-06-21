"use client";

import { useEffect, useState } from "react";

interface ECard {
  id: string;
  name: string;
  price: number;
  totalUses: number;
  usedCount: number;
  isActive: boolean;
}

export default function ECardsPage() {
  const [eCards, setECards] = useState<ECard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("hairq_token");
    if (!token) return;
    fetch("/api/admin/ecards", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => { setECards(d.eCards || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-slate-400">กำลังโหลด...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">คอร์ส / E-Card</h1>
      <div className="mb-6">
        <button className="rounded-xl bg-[#c5a059] px-5 py-2.5 text-sm font-bold text-[#062c1b] hover:bg-[#d4af37] transition">
          + เพิ่มคอร์ส
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {eCards.length === 0 ? (
          <p className="text-slate-400 col-span-full">ยังไม่มีคอร์ส</p>
        ) : (
          eCards.map((c) => (
            <div key={c.id} className="rounded-2xl border border-white/10 bg-[#0d2137] p-5">
              <h3 className="font-bold text-white mb-2">{c.name}</h3>
              <p className="text-sm text-slate-400 mb-1">ราคา: ฿{c.price.toLocaleString()}</p>
              <p className="text-sm text-slate-400 mb-4">{c.totalUses} ครั้ง / คอร์ส</p>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">ใช้ไปแล้ว</span>
                  <span className="text-white font-medium">{c.usedCount} ครั้ง</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">เหลือ</span>
                  <span className="text-white font-medium">{c.totalUses - c.usedCount} ครั้ง</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 rounded-lg bg-white/10 py-2 text-sm text-white hover:bg-white/20 transition">
                  แก้ไข
                </button>
                <button className="flex-1 rounded-lg bg-red-500/10 py-2 text-sm text-red-400 hover:bg-red-500/20 transition">
                  ลบ
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
