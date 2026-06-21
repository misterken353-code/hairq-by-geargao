export default function BookingsPage() {
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
            {[
              { name: "คุณสมชาย", date: "21/06/2026", time: "10:00", service: "ตัดผม", staff: "ช่าง A", status: "มาแล้ว", price: "200" },
              { name: "คุณสมหญิง", date: "21/06/2026", time: "11:00", service: "ทำสี", staff: "ช่าง B", status: "รอ", price: "1,500" },
              { name: "คุณสมศรี", date: "21/06/2026", time: "13:00", service: "สระ+ไดร์", staff: "ช่าง C", status: "รอ", price: "300" },
              { name: "คุณสมพร", date: "21/06/2026", time: "14:00", service: "ตัดผม", staff: "ช่าง A", status: "รอ", price: "200" },
              { name: "คุณสมชาย", date: "22/06/2026", time: "10:00", service: "ทำสี", staff: "ช่าง B", status: "ยืนยัน", price: "1,500" },
            ].map((b, i) => (
              <tr key={i} className="hover:bg-white/5 transition">
                <td className="px-4 py-3 text-white font-medium">{b.name}</td>
                <td className="px-4 py-3 text-slate-300">{b.date}</td>
                <td className="px-4 py-3 text-slate-300">{b.time}</td>
                <td className="px-4 py-3 text-slate-300">{b.service}</td>
                <td className="px-4 py-3 text-slate-300">{b.staff}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    b.status === "มาแล้ว" ? "bg-emerald-500/20 text-emerald-400" :
                    b.status === "ยืนยัน" ? "bg-blue-500/20 text-blue-400" :
                    "bg-amber-500/20 text-amber-400"
                  }`}>
                    {b.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#c5a059] font-medium">฿{b.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
