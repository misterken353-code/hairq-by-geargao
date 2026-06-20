import { BRAND, LINKS } from "@/lib/brand";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0a3d29] via-[#062c1b] to-[#0a1929] px-4 py-20 text-center lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(197,160,89,0.15)_0%,transparent_50%)]" />
      <div className="relative mx-auto max-w-3xl">
        <span className="mb-4 inline-block rounded-full border border-[#c5a059]/50 bg-[#c5a059]/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#f0dfa8]">
          SaaS สำหรับร้านทำผม & ร้านเสริมสวย
        </span>
        <h1 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          จองคิว · ขายคอร์ส · ดูแลลูกค้า
          <br />
          <span className="gradient-text">ในระบบเดียว</span>
        </h1>
        <p className="mb-8 text-lg leading-relaxed text-emerald-100/80">
          {BRAND.description}
          <br />
          รับจองออนไลน์ เก็บเงิน PromptPay ขายคอร์ส และส่งเตือน LINE — เริ่มใช้ฟรี 14 วัน
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <a href={LINKS.register} className="btn-gold">
            เปิดร้านฟรี 14 วัน
          </a>
          <a href="#features" className="btn-outline">
            ดูฟีเจอร์ทั้งหมด
          </a>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-emerald-100/70">
          <span>✓ ไม่ต้องใช้บัตร</span>
          <span>✓ ยกเลิกได้ทุกเมื่อ</span>
          <span>✓ ซัพพอร์ตไทย</span>
        </div>
      </div>
    </section>
  );
}
