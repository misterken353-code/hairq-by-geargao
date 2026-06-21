import Link from "next/link";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#0a1929] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#c5a059] mb-2">HairQ Admin</h1>
          <p className="text-slate-400 text-sm">เข้าสู่ระบบจัดการร้าน</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0d2137] p-6">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">อีเมล</label>
              <input
                type="email"
                placeholder="admin@example.com"
                className="w-full rounded-lg bg-[#0a1929] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-[#c5a059] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">รหัสผ่าน</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-lg bg-[#0a1929] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-[#c5a059] focus:outline-none"
              />
            </div>
            <button
              type="button"
              className="w-full rounded-xl bg-[#c5a059] py-3 text-sm font-bold text-[#062c1b] hover:bg-[#d4af37] transition"
            >
              เข้าสู่ระบบ
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-slate-500">
            ระบบนี้เป็นตัวอย่าง — ยังไม่มีระบบล็อกอินจริง
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-slate-400">
          <Link href="/" className="text-[#c5a059] hover:underline">
            ← กลับไปหน้าเว็บ
          </Link>
        </p>
      </div>
    </div>
  );
}
