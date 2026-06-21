import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a1929] text-white flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-[#c5a059] mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-2">ไม่พบหน้านี้</h2>
      <p className="text-slate-400 mb-8">
        หน้าที่คุณกำลังค้นหาอาจถูกย้ายหรือลบไปแล้ว
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-xl bg-[#c5a059] px-6 py-3 text-sm font-bold text-[#062c1b] hover:bg-[#d4af37] transition"
      >
        กลับไปหน้าแรก
      </Link>
    </div>
  );
}
