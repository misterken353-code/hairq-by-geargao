export default function CustomersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">ลูกค้า</h1>
      <div className="rounded-2xl border border-white/10 bg-[#0d2137] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#0a1929]">
            <tr>
              <th className="text-left px-4 py-3 text-slate-400 font-medium">ชื่อ</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium">เบอร์โทร</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium">ครั้งที่มา</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium">ครั้งล่าสุด</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium">ยอดรวม</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {[
              { name: "คุณสมชาย", phone: "081-111-1111", visits: 5, last: "21/06/2026", total: "2,500" },
              { name: "คุณสมหญิง", phone: "082-222-2222", visits: 3, last: "21/06/2026", total: "4,500" },
              { name: "คุณสมศรี", phone: "083-333-3333", visits: 8, last: "21/06/2026", total: "3,200" },
              { name: "คุณสมพร", phone: "084-444-4444", visits: 1, last: "21/06/2026", total: "200" },
              { name: "คุณสมปอง", phone: "085-555-5555", visits: 12, last: "15/06/2026", total: "8,500" },
            ].map((c, i) => (
              <tr key={i} className="hover:bg-white/5 transition cursor-pointer">
                <td className="px-4 py-3 text-white font-medium">{c.name}</td>
                <td className="px-4 py-3 text-slate-300">{c.phone}</td>
                <td className="px-4 py-3 text-slate-300">{c.visits} ครั้ง</td>
                <td className="px-4 py-3 text-slate-300">{c.last}</td>
                <td className="px-4 py-3 text-[#c5a059] font-medium">฿{c.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
