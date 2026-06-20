const features = [
  {
    icon: "✂️",
    title: "จองคิวออนไลน์",
    desc: "ลูกค้าจองเองผ่านลิงก์ /book/ร้านคุณ ตลอด 24 ชม. ไม่ต้องรับสาย ไม่ต้องตอบแชท",
  },
  {
    icon: "💳",
    title: "PromptPay QR",
    desc: "สร้าง QR ชำระทันทีหลังจอง ไม่ต้องติดตั้งเครื่องรูดบัตร ลูกค้าสแกนจ่ายเองได้",
  },
  {
    icon: "🎫",
    title: "ขายคอร์ส & E-Card",
    desc: "ขายคอร์สตัดผม สปา ทำสี แบบครั้ง/แพ็กเกจ ระบบตัดยอดอัตโนมัติ ลูกค้าเห็นคงเหลือเองได้",
  },
  {
    icon: "📱",
    title: "LINE เตือนนัด",
    desc: "ส่งข้อความอัตโนมัติทุกเช้าสำหรับคิวพรุ่งนี้ ลูกค้าไม่ลืม ร้านไม่เสียคิวเปล่า",
  },
  {
    icon: "📅",
    title: "ปฏิทินคิวช่าง",
    desc: "ยืนยัน ยกเลิก ย้ายคิว และติดตามสถานะชำระเงิน ในหน้าเดียว ทุกช่างเห็นคิวตัวเอง",
  },
  {
    icon: "👥",
    title: "ดูแลลูกค้า",
    desc: "ประวัติการตัดผม รูป before/after สไตล์ที่ชอบ และแพ้ยา/เคมี เก็บครบในระบบ",
  },
];

export default function Features() {
  return (
    <section id="features" className="px-4 py-20 bg-[#0a1929]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#c5a059]">
            ฟีเจอร์หลัก
          </p>
          <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            ทุกอย่างที่ร้านทำผมต้องการ
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="card-dark hover:border-[#c5a059]/30 transition">
              <div className="mb-3 text-3xl">{f.icon}</div>
              <h3 className="mb-2 text-xl font-bold text-white">{f.title}</h3>
              <p className="text-sm leading-relaxed text-slate-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
