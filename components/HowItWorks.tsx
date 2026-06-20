const steps = [
  {
    num: "1",
    title: "สมัครเปิดร้าน",
    desc: "ใส่ชื่อร้าน + slug ใช้เวลา 1 นาที ไม่ต้องใช้บัตรเครดิต",
  },
  {
    num: "2",
    title: "เพิ่มบริการ & ช่าง",
    desc: "ตั้งราคา ระยะเวลา และคอร์ส แยกตามช่างแต่ละคน",
  },
  {
    num: "3",
    title: "แชร์ลิงก์จอง",
    desc: "ลูกค้าจองและชำระ PromptPay ได้เลย ไม่ต้องติดตั้งแอป",
  },
];

export default function HowItWorks() {
  return (
    <section className="px-4 py-20 bg-[#0d2137]">
      <div className="mx-auto max-w-4xl">
        <div className="mb-14 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#c5a059]">
            เริ่มต้นง่าย 3 ขั้นตอน
          </p>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            เปิดร้านและรับจองใน 5 นาที
          </h2>
        </div>
        <div className="space-y-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="flex items-start gap-5 rounded-2xl border border-white/10 bg-[#0a1929] p-6"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#c5a059] text-sm font-bold text-[#062c1b]">
                {step.num}
              </span>
              <div>
                <h3 className="mb-1 text-lg font-bold text-white">{step.title}</h3>
                <p className="text-sm text-slate-400">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
