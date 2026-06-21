"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Booking {
  id: string;
  customerName: string;
  time: string;
  service: string;
  status: string;
  paid: boolean;
}

interface DashboardData {
  salon: { id: string; name: string; slug: string };
  stats: {
    todayBookings: number;
    todayRevenue: number;
    todayCustomers: number;
    tomorrowBookings: number;
  };
  recentBookings: Booking[];
  services: { id: string; name: string; price: number }[];
}

export default function AdminDashboard() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("hairq_token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetch("/api/admin/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => {
        setError("กรุณาเข้าสู่ระบบใหม่");
        setLoading(false);
        router.push("/login");
      });
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-slate-400">กำลังโหลด...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-400">{error || "เกิดข้อผิดพลาด"}</p>
      </div>
    );
  }

  const statusLabel: Record<string, string> = {
    pending: "รอ",
    confirmed: "ยืนยัน",
    completed: "เสร็จสิ้น",
    cancelled: "ยกเลิก",
  };

  const statusClass = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500/20 text-emerald-400";
      case "confirmed":
        return "bg-sky-500/20 text-sky-400";
      case "cancelled":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-amber-500/20 text-amber-400";
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">{data.salon.name}</h1>
      <p className="text-slate-400 mb-6">แดชบอร์ด</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "คิววันนี้", value: String(data.stats.todayBookings), icon: "📋" },
          { label: "รายได้วันนี้", value: `฿${data.stats.todayRevenue.toLocaleString()}`, icon: "💰" },
          { label: "ลูกค้าวันนี้", value: String(data.stats.todayCustomers), icon: "👥" },
          { label: "คิวพรุ่งนี้", value: String(data.stats.tomorrowBookings), icon: "📅" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-white/10 bg-[#0d2137] p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{stat.icon}</span>
              <span className="text-xs text-slate-400">วันนี้</span>
            </div>
            <p className="text-2xl font-bold text-[#c5a059]">{stat.value}</p>
            <p className="text-sm text-slate-400">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-white/10 bg-[#0d2137] p-6">
          <h2 className="text-lg font-bold text-white mb-4">คิวล่าสุด</h2>
          <div className="space-y-3">
            {data.recentBookings.length === 0 ? (
              <p className="text-sm text-slate-400">ยังไม่มีคิว</p>
            ) : (
              data.recentBookings.map((q) => (
                <div key={q.id} className="flex items-center justify-between rounded-lg bg-[#0a1929] p-3">
                  <div>
                    <p className="text-sm font-medium text-white">{q.customerName}</p>
                    <p className="text-xs text-slate-400">{q.time} — {q.service}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusClass(q.status)}`}>
                    {statusLabel[q.status] || q.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0d2137] p-6">
          <h2 className="text-lg font-bold text-white mb-4">บริการ</h2>
          <div className="space-y-4">
            {data.services.length === 0 ? (
              <p className="text-sm text-slate-400">ยังไม่มีบริการ</p>
            ) : (
              data.services.map((s) => (
                <div key={s.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">{s.name}</p>
                  </div>
                  <p className="text-sm font-bold text-[#c5a059]">฿{s.price.toLocaleString()}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
