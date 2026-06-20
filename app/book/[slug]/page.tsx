type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BookPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <div className="min-h-screen bg-[#0a1929] text-white p-8">
      <div className="mx-auto max-w-md text-center">
        <h1 className="text-2xl font-bold text-[#c5a059] mb-4">จองคิว: {slug}</h1>
        <p className="text-slate-400 mb-6">
          หน้านี้เป็นตัวอย่างหน้าจองคิวของร้าน <strong>{slug}</strong>
          <br />
          ในระบบจริงจะมีฟอร์มจองคิว ปฏิทิน และระบบชำระเงิน
        </p>
        <div className="rounded-2xl border border-white/10 bg-[#0d2137] p-6 text-left">
          <h3 className="font-bold mb-3">ฟอร์มจองคิว (ตัวอย่าง)</h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-slate-400">ชื่อ</label>
              <input disabled className="w-full mt-1 rounded-lg bg-[#0a1929] border border-white/10 p-2 text-sm text-slate-500" placeholder="ชื่อลูกค้า" />
            </div>
            <div>
              <label className="text-sm text-slate-400">เบอร์โทร</label>
              <input disabled className="w-full mt-1 rounded-lg bg-[#0a1929] border border-white/10 p-2 text-sm text-slate-500" placeholder="081-234-5678" />
            </div>
            <div>
              <label className="text-sm text-slate-400">เลือกบริการ</label>
              <select disabled className="w-full mt-1 rounded-lg bg-[#0a1929] border border-white/10 p-2 text-sm text-slate-500">
                <option>ตัดผม - 200 บาท</option>
                <option>สระ+ไดร์ - 300 บาท</option>
                <option>ทำสี - 1,500 บาท</option>
              </select>
            </div>
            <button disabled className="w-full rounded-lg bg-[#c5a059]/30 text-[#c5a059]/50 py-2.5 font-semibold text-sm mt-2 cursor-not-allowed">
              จองคิว (ต้องพัฒนาต่อ)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
