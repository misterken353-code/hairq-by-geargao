export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">ตั้งค่าร้าน</h1>
      <div className="max-w-2xl space-y-6">
        <div className="rounded-2xl border border-white/10 bg-[#0d2137] p-6">
          <h2 className="text-lg font-bold text-white mb-4">ข้อมูลร้าน</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">ชื่อร้าน</label>
              <input
                type="text"
                defaultValue="ร้านทำผม HairQ"
                className="w-full rounded-lg bg-[#0a1929] border border-white/10 px-4 py-2.5 text-sm text-white focus:border-[#c5a059] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Slug (ลิงก์จอง)</label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-400">hairq-by-geargao.vercel.app/book/</span>
                <input
                  type="text"
                  defaultValue="hairq-salon"
                  className="flex-1 rounded-lg bg-[#0a1929] border border-white/10 px-4 py-2.5 text-sm text-white focus:border-[#c5a059] focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">เบอร์โทร</label>
              <input
                type="tel"
                defaultValue="081-234-5678"
                className="w-full rounded-lg bg-[#0a1929] border border-white/10 px-4 py-2.5 text-sm text-white focus:border-[#c5a059] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">ที่อยู่</label>
              <textarea
                defaultValue="123 ถนนสุขุมวิท กรุงเทพฯ"
                rows={3}
                className="w-full rounded-lg bg-[#0a1929] border border-white/10 px-4 py-2.5 text-sm text-white focus:border-[#c5a059] focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0d2137] p-6">
          <h2 className="text-lg font-bold text-white mb-4">เวลาทำการ</h2>
          <div className="space-y-3">
            {[
              { day: "จันทร์ - ศุกร์", open: "10:00", close: "20:00" },
              { day: "เสาร์", open: "10:00", close: "18:00" },
              { day: "อาทิตย์", open: "ปิด", close: "" },
            ].map((d) => (
              <div key={d.day} className="flex items-center gap-4">
                <span className="text-sm text-white w-24">{d.day}</span>
                <input
                  type="text"
                  defaultValue={d.open}
                  className="w-20 rounded-lg bg-[#0a1929] border border-white/10 px-3 py-2 text-sm text-white focus:border-[#c5a059] focus:outline-none"
                />
                <span className="text-slate-400">-</span>
                <input
                  type="text"
                  defaultValue={d.close}
                  className="w-20 rounded-lg bg-[#0a1929] border border-white/10 px-3 py-2 text-sm text-white focus:border-[#c5a059] focus:outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button className="rounded-xl bg-[#c5a059] px-6 py-3 text-sm font-bold text-[#062c1b] hover:bg-[#d4af37] transition">
            บันทึกการตั้งค่า
          </button>
        </div>
      </div>
    </div>
  );
}
