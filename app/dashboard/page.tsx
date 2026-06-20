export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#0a1929] text-white p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl font-bold text-[#c5a059] mb-6">แดชบอร์ดร้าน</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: "คิววันนี้", value: "12" },
            { label: "คิวพรุ่งนี้", value: "8" },
            { label: "รายได้วันนี้", value: "฿4,200" },
          ].map((stat) => (
            <div key={stat.label} className="card-dark text-center">
              <p className="text-2xl font-bold text-[#c5a059]">{stat.value}</p>
              <p className="text-sm text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="card-dark">
          <h3 className="font-bold mb-4">รายการคิววันนี้ (ตัวอย่าง)</h3>
          <div className="space-y-2">
            {[
              { name: "คุณสมชาย", time: "10:00", service: "ตัดผม", status: "มาแล้ว" },
              { name: "คุณสมหญิง", time: "11:00", service: "ทำสี", status: "รอ" },
              { name: "คุณสมศรี", time: "13:00", service: "สระ+ไดร์", status: "รอ" },
            ].map((q) => (
              <div key={q.name} className="flex items-center justify-between rounded-lg bg-[#0a1929] p-3">
                <div>
                  <p className="text-sm font-medium">{q.name}</p>
                  <p className="text-xs text-slate-400">{q.time} — {q.service}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${q.status === "มาแล้ว" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"}`}>
                  {q.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
