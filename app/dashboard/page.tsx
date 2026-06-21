import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a1929]">
      <Navbar />
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-[#c5a059]">แดชบอร์ดร้าน</h1>
            <Link
              href="/"
              className="text-sm text-slate-400 hover:text-[#c5a059] transition"
            >
              ← กลับไปหน้าแรก
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { label: "คิววันนี้", value: "12" },
              { label: "คิวพรุ่งนี้", value: "8" },
              { label: "รายได้วันนี้", value: "฿4,200" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-[#0d2137] p-6 text-center">
                <p className="text-2xl font-bold text-[#c5a059]">{stat.value}</p>
                <p className="text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0d2137] p-6">
            <h3 className="font-bold text-white mb-4">รายการคิววันนี้</h3>
            <div className="space-y-2">
              {[
                { name: "คุณสมชาย", time: "10:00", service: "ตัดผม", status: "มาแล้ว" },
                { name: "คุณสมหญิง", time: "11:00", service: "ทำสี", status: "รอ" },
                { name: "คุณสมศรี", time: "13:00", service: "สระ+ไดร์", status: "รอ" },
                { name: "คุณสมพร", time: "14:00", service: "ตัดผม", status: "รอ" },
              ].map((q) => (
                <div key={q.name} className="flex items-center justify-between rounded-lg bg-[#0a1929] p-3">
                  <div>
                    <p className="text-sm font-medium text-white">{q.name}</p>
                    <p className="text-xs text-slate-400">{q.time} — {q.service}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    q.status === "มาแล้ว" 
                      ? "bg-emerald-500/20 text-emerald-400" 
                      : "bg-amber-500/20 text-amber-400"
                  }`}>
                    {q.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
