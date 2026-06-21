"use client";

import { useEffect, useState } from "react";

interface Booking {
  id: string;
  date: string;
  time: string;
  customer: { name: string };
  service: { name: string };
}

export default function CalendarPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("hairq_token");
    if (!token) return;
    fetch("/api/admin/calendar", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => { setBookings(d.bookings || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const daysInMonth = 30;
  const bookingDays = new Set(bookings.map((b) => new Date(b.date).getDate()));

  if (loading) return <p className="text-slate-400">กำลังโหลด...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">ปฏิทิน</h1>
      <div className="rounded-2xl border border-white/10 bg-[#0d2137] p-6">
        <p className="text-slate-400 mb-4">มุมมองปฏิทินรายวัน</p>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"].map((d) => (
            <div key={d} className="text-center text-sm font-medium text-slate-400 py-2">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const hasBooking = bookingDays.has(day);
            return (
              <div
                key={day}
                className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium relative cursor-pointer transition ${
                  hasBooking
                    ? "bg-[#0a3d29] text-[#c5a059] hover:bg-[#14532d]"
                    : "bg-[#0a1929] text-slate-400 hover:bg-white/5"
                }`}
              >
                {day}
                {hasBooking && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#c5a059]" />
                )}
              </div>
            );
          })}
        </div>
        {bookings.length > 0 && (
          <div className="mt-6 space-y-2">
            <p className="text-sm font-medium text-white">คิวในเดือนนี้</p>
            {bookings.slice(0, 10).map((b) => (
              <div key={b.id} className="flex justify-between text-sm rounded-lg bg-[#0a1929] px-3 py-2">
                <span className="text-white">{b.customer?.name || "ไม่ระบุ"}</span>
                <span className="text-slate-400">{new Date(b.date).toLocaleDateString("th-TH")} {b.time}</span>
                <span className="text-[#c5a059]">{b.service?.name || ""}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
