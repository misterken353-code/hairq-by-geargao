"use client";

import { useEffect, useState } from "react";

interface Booking {
  id: string;
  customer: { name: string };
  date: string;
  time: string;
  service: { name: string };
  staff: { name: string } | null;
  status: string;
  paid: boolean;
  price: number;
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("hairq_token");
    if (!token) return;
    fetch("/api/admin/bookings", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => { setBookings(d.bookings || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const statusClass = (status: string) => {
    switch (status) {
      case "completed": return "bg-emerald-500/20 text-emerald-400";
      case "confirmed": return "bg-sky-500/20 text-sky-400";
      case "cancelled": return "bg-red-500/20 text-red-400";
      default: return "bg-amber-500/20 text-amber-400";
    }
  };
  const statusLabel: Record<string, string> = {
    pending: "รอ", confirmed: "ยืนยัน", completed: "เสร็จสิ้น", cancelled: "ยกเลิก",
  };

  if (loading) return <p className="text-slate-400">กำลังโหลด...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">รายการจอง</h1>
      <div className="rounded-2xl border border-white/10 bg-[#0d2137] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#0a1929]">
            <tr>
              <th className="text-left px-4 py-3 text-slate-400 font-medium">ลูกค้า</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium">วันที่</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium">เวลา</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium">บริการ</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium">ช่าง</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium">สถานะ</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium">ราคา</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {bookings.length === 0 ? (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-slate-400">ยังไม่มีการจอง</td></tr>
            ) : (
              bookings.map((b) => (
                <tr key={b.id} className="hover:bg-white/5 transition">
                  <td className="px-4 py-3 text-white font-medium">{b.customer?.name || "ไม่ระบุ"}</td>
                  <td className="px-4 py-3 text-slate-300">{new Date(b.date).toLocaleDateString("th-TH")}</td>
                  <td className="px-4 py-3 text-slate-300">{b.time}</td>
                  <td className="px-4 py-3 text-slate-300">{b.service?.name || ""}</td>
                  <td className="px-4 py-3 text-slate-300">{b.staff?.name || "ไม่ระบุ"}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusClass(b.status)}`}>
                      {statusLabel[b.status] || b.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#c5a059] font-medium">฿{b.price.toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
