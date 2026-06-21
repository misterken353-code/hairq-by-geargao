export default function StaffPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">ช่าง / พนักงาน</h1>
      <div className="mb-6">
        <button className="rounded-xl bg-[#c5a059] px-5 py-2.5 text-sm font-bold text-[#062c1b] hover:bg-[#d4af37] transition">
          + เพิ่มช่าง
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { name: "ช่าง A", role: "ช่างตัดผม", phone: "081-111-1111", active: true, bookings: 45 },
          { name: "ช่าง B", role: "ช่างทำสี", phone: "082-222-2222", active: true, bookings: 32 },
          { name: "ช่าง C", role: "ช่างสระ/ไดร์", phone: "083-333-3333", active: true, bookings: 28 },
          { name: "ช่าง D", role: "ช่างตัดผม", phone: "084-444-4444", active: false, bookings: 0 },
        ].map((s) => (
          <div key={s.name} className="rounded-2xl border border-white/10 bg-[#0d2137] p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-full bg-[#0a3d29] flex items-center justify-center text-lg font-bold text-[#c5a059]">
                {s.name.charAt(0)}
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                s.active ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-500/20 text-slate-400"
              }`}>
                {s.active ? "ทำงาน" : "ลา"}
              </span>
            </div>
            <h3 className="font-bold text-white mb-1">{s.name}</h3>
            <p className="text-sm text-slate-400 mb-1">{s.role}</p>
            <p className="text-sm text-slate-400 mb-4">{s.phone}</p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-slate-400">คิวทั้งหมด</span>
              <span className="font-bold text-[#c5a059]">{s.bookings}</span>
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
        ))}
      </div>
    </div>
  );
}
