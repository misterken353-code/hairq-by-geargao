import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BookPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <div className="flex flex-col min-h-screen bg-[#0a1929]">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="mx-auto max-w-md w-full">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-[#c5a059] mb-2">จองคิว: {slug}</h1>
            <p className="text-slate-400 text-sm">
              เลือกบริการและวันเวลาที่ต้องการ
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0d2137] p-6">
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">ชื่อ</label>
                <input
                  type="text"
                  placeholder="ชื่อลูกค้า"
                  className="w-full rounded-lg bg-[#0a1929] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-[#c5a059] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">เบอร์โทร</label>
                <input
                  type="tel"
                  placeholder="081-234-5678"
                  className="w-full rounded-lg bg-[#0a1929] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-[#c5a059] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">เลือกบริการ</label>
                <select className="w-full rounded-lg bg-[#0a1929] border border-white/10 px-4 py-2.5 text-sm text-white focus:border-[#c5a059] focus:outline-none">
                  <option>ตัดผม - 200 บาท</option>
                  <option>สระ+ไดร์ - 300 บาท</option>
                  <option>ทำสี - 1,500 บาท</option>
                  <option>ตัด+สระ+ไดร์ - 450 บาท</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">เลือกวันที่</label>
                <input
                  type="date"
                  className="w-full rounded-lg bg-[#0a1929] border border-white/10 px-4 py-2.5 text-sm text-white focus:border-[#c5a059] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">เลือกเวลา</label>
                <select className="w-full rounded-lg bg-[#0a1929] border border-white/10 px-4 py-2.5 text-sm text-white focus:border-[#c5a059] focus:outline-none">
                  <option>10:00</option>
                  <option>11:00</option>
                  <option>13:00</option>
                  <option>14:00</option>
                  <option>15:00</option>
                  <option>16:00</option>
                </select>
              </div>
              <button
                type="button"
                className="w-full rounded-xl bg-[#c5a059] py-3 text-sm font-bold text-[#062c1b] hover:bg-[#d4af37] transition"
              >
                จองคิว
              </button>
            </form>

            <p className="mt-4 text-center text-xs text-slate-500">
              ระบบนี้เป็นตัวอย่าง — ยังไม่มีการบันทึกจริง
            </p>
          </div>

          <p className="mt-6 text-center text-sm text-slate-400">
            <Link href="/" className="text-[#c5a059] hover:underline">
              ← กลับไปหน้าแรก
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
