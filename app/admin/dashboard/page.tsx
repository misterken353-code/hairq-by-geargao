export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">แดชบอร์ด</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "คิววันนี้", value: "12", icon: "📋" },
          { label: "รายได้วันนี้", value: "฿4,200", icon: "💰" },
          { label: "ลูกค้าวันนี้", value: "8", icon: "👥" },
          { label: "คิวพรุ่งนี้", value: "5", icon: "📅" },
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
                  q.status === "มาแล้ว" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
                }`}>
                  {q.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0d2137] p-6">
          <h2 className="text-lg font-bold text-white mb-4">บริการยอดนิยม</h2>
          <div className="space-y-4">
            {[
              { name: "ตัดผม", count: 45, total: "฿9,000" },
              { name: "ทำสี", count: 12, total: "฿18,000" },
              { name: "สระ+ไดร์", count: 30, total: "฿9,000" },
              { name: "ทรีตเมนต์", count: 8, total: "฿8,000" },
            ].map((s) => (
              <div key={s.name} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">{s.name}</p>
                  <p className="text-xs text-slate-400">{s.count} ครั้ง</p>
                </div>
                <p className="text-sm font-bold text-[#c5a059]">{s.total}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
