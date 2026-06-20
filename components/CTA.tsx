import { LINKS } from "@/lib/brand";

export default function CTA() {
  return (
    <section className="px-4 py-20 text-center bg-gradient-to-br from-[#0a3d29] via-[#062c1b] to-[#0a1929]">
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-4 text-2xl font-bold text-white sm:text-4xl">
          พร้อมเปิดรับจองแล้วหรือยัง?
        </h2>
        <p className="mb-8 text-lg leading-relaxed text-emerald-100/80">
          Trial ฟรี 14 วัน — ไม่ต้องใส่บัตร
          <br />
          ลูกค้าจองผ่านลิงก์ คุณรับเงินได้เลย
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <a href={LINKS.register} className="btn-gold">
            เปิดร้านเลย
          </a>
          <a href={LINKS.lineOA} className="btn-outline" target="_blank" rel="noopener noreferrer">
            สอบถาม LINE
          </a>
        </div>
      </div>
    </section>
  );
}
