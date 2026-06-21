export default function ServicesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">บริการ</h1>
      <div className="mb-6">
        <button className="rounded-xl bg-[#c5a059] px-5 py-2.5 text-sm font-bold text-[#062c1b] hover:bg-[#d4af37] transition">
          + เพิ่มบริการ
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { name: "ตัดผม", price: 200, duration: 30, active: true },
          { name: "สระ+ไดร์", price: 300, duration: 45, active: true },
          { name: "ทำสี", price: 1500, duration: 120, active: true },
          { name: "ตัด+สระ+ไดร์", price: 450, duration: 60, active: true },
          { name: "ทรีตเมนต์", price: 1000, duration: 60, active: false },
        ].map((s) => (
          <div key={s.name} className="rounded-2xl border border-white/10 bg-[#0d2137] p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-white">{s.name}</h3>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                s.active ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-500/20 text-slate-400"
              }`}>
                {s.active ? "ใช้งาน" : "ปิด"}
              </span>
            </div>
            <p className="text-sm text-slate-400 mb-1">ราคา: ฿{s.price}</p>
            <p className="text-sm text-slate-400 mb-4">ระยะเวลา: {s.duration} นาที</p>
            <div className="flex gap-2">
              <button className="flex-1 rounded-lg bg-white/10 py-2 text-sm text-white hover:bg-white/20 transition">
                แก้ไข
              </button>
              <button className="flex-1 rounded-lg bg-red-500/10 py-2 text-sm text-red-400 hover:bg-red-500/20 transition">
                ลบ
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
