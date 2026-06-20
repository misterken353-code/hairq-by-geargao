import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "จองคิว — HairQ",
  description: "จองคิวร้านทำผมออนไลน์",
};

export default function BookIndexPage() {
  return (
    <div className="min-h-screen bg-[#0a1929] text-white p-8 text-center">
      <h1 className="text-2xl font-bold text-[#c5a059] mb-4">จองคิวออนไลน์</h1>
      <p className="text-slate-400 mb-6">
        กรุณาใช้ลิงก์จองคิวของร้าน เช่น /book/ชื่อร้าน
      </p>
      <div className="mx-auto max-w-sm card-dark p-6">
        <p className="text-sm text-slate-400">
          ตัวอย่าง: /book/salon-premium
        </p>
      </div>
    </div>
  );
}
