import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "เข้าสู่ระบบ — HairQ",
  description: "เข้าสู่ระบบ HairQ จัดการร้านทำผมของคุณ",
};

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a1929]">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">เข้าสู่ระบบ</h1>
            <p className="text-slate-400">จัดการร้านทำผมของคุณได้ที่นี่</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0d2137] p-8">
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">อีเมล</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full rounded-lg bg-[#0a1929] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-[#c5a059] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">รหัสผ่าน</label>
                <input
                  type="password"
                  placeholder="รหัสผ่านของคุณ"
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
              ระบบนี้เป็นตัวอย่าง — ฟอร์มนี้ยังไม่มีระบบล็อกอินจริง
            </p>
          </div>

          <p className="mt-6 text-center text-sm text-slate-400">
            ยังไม่มีบัญชี?{" "}
            <Link href="/register" className="text-[#c5a059] hover:underline font-medium">
              สมัครใช้งาน
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
