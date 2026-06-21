export default function CalendarPage() {
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
          {Array.from({ length: 30 }, (_, i) => {
            const day = i + 1;
            const hasBooking = [5, 12, 15, 18, 20, 25].includes(day);
            return (
              <div
                key={day}
                className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium relative ${
                  hasBooking
                    ? "bg-[#0a3d29] text-[#c5a059] cursor-pointer hover:bg-[#14532d]"
                    : "bg-[#0a1929] text-slate-400"
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
      </div>
    </div>
  );
}
