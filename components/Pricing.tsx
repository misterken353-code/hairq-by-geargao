import { LINKS } from "@/lib/brand";

const plans = [
  {
    name: "Free",
    price: "0",
    period: "บาท/เดือน",
    desc: "เหมาะสำหรับร้านเล็ก เริ่มต้น",
    features: [
      "20 คิว/เดือน",
      "1 ช่าง",
      "จองคิวออนไลน์",
      "LINE เตือน",
    ],
    cta: "สมัครฟรี",
    href: LINKS.register,
    popular: false,
  },
  {
    name: "Pro",
    price: "590",
    period: "บาท/เดือน",
    desc: "ที่นิยมที่สุด สำหรับร้านทำผมมืออาชีพ",
    features: [
      "ไม่จำกัดคิว",
      "ไม่จำกัดช่าง",
      "PromptPay + ขายคอร์ส",
      "LINE เตือน + ประวัติลูกค้า",
      "รายงาน Excel",
    ],
    cta: "สมัคร Pro",
    href: LINKS.register,
    popular: true,
  },
  {
    name: "Salon",
    price: "1,490",
    period: "บาท/เดือน",
    desc: "สำหรับร้านใหญ่ หรือร้านเชน",
    features: [
      "ทุกอย่างใน Pro",
      "หลายสาขา",
      "แอดมินระดับสาขา",
      "API Integration",
      "ทีมดูแลใกล้ชิด",
    ],
    cta: "ติดต่อเรา",
    href: "mailto:mister.ken353@gmail.com",
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="px-4 py-20 bg-[#0a1929]">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#c5a059]">
            ราคา
          </p>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            เลือกแพ็กเกจที่เหมาะกับร้านคุณ
          </h2>
          <p className="mt-3 text-slate-400">เริ่มฟรี อัปเกรดเมื่อพร้อม ยกเลิกได้ทุกเมื่อ</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border bg-[#0d2137] p-7 transition hover:shadow-md ${
                plan.popular
                  ? "border-[#c5a059] ring-2 ring-[#c5a059]/15 scale-[1.02]"
                  : "border-white/10"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#c5a059] px-4 py-1 text-xs font-bold text-[#062c1b]">
                  แนะนำ
                </span>
              )}
              <h3 className="text-xl font-bold text-white">{plan.name}</h3>
              <div className="my-5">
                <span className="text-4xl font-extrabold text-white">฿{plan.price}</span>
                <span className="text-sm text-slate-400"> / {plan.period}</span>
              </div>
              <p className="mb-6 text-sm text-slate-400">{plan.desc}</p>
              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <span className="mt-0.5 shrink-0 font-bold text-emerald-400">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href={plan.href}
                className={`block rounded-xl py-3.5 text-center text-sm font-semibold transition ${
                  plan.popular
                    ? "bg-[#c5a059] text-[#062c1b] hover:bg-[#d4af37]"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
