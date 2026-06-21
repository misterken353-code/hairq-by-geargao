"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
}

interface Staff {
  id: string;
  name: string;
}

interface Salon {
  id: string;
  name: string;
  slug: string;
  services: Service[];
  staff: Staff[];
}

function BookingForm({ salon }: { salon: Salon }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    serviceId: "",
    staffId: "",
    date: "",
    time: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [qrUrl, setQrUrl] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  const selectedService = salon.services.find((s) => s.id === form.serviceId);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          salonId: salon.id,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "เกิดข้อผิดพลาด");
      } else {
        setSuccess("จองคิวสำเร็จ! กรุณาชำระเงินเพื่อยืนยัน");
        setBookingId(data.booking.id);
        setShowPayment(true);
        setForm({ name: "", phone: "", serviceId: "", staffId: "", date: "", time: "" });
      }
    } catch {
      setError("เกิดข้อผิดพลาด กรุณาลองใหม่");
    } finally {
      setLoading(false);
    }
  };

  const createPayment = async () => {
    setPaymentError("");
    setPaymentLoading(true);
    try {
      const res = await fetch("/api/payments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          salonId: salon.id,
          bookingId,
          amount: selectedService?.price || 0,
          description: `จองคิว ${selectedService?.name} ที่ ${salon.name}`,
          customerName: form.name,
          customerPhone: form.phone,
          paymentMethod: "qr",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setPaymentError(data.error || "ไม่สามารถสร้างรายการชำระเงิน");
      } else {
        setQrUrl(data.qrCodeUrl || "");
      }
    } catch {
      setPaymentError("เกิดข้อผิดพลาดในการชำระเงิน");
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0d2137] p-6">
      {error && (
        <p className="mb-4 rounded-lg bg-red-950/50 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      )}
      {success && (
        <p className="mb-4 rounded-lg bg-emerald-950/50 px-3 py-2 text-sm text-emerald-300">
          {success}
        </p>
      )}

      {!showPayment ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">ชื่อ</label>
            <input
              name="name"
              type="text"
              required
              placeholder="ชื่อลูกค้า"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg bg-[#0a1929] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-[#c5a059] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">เบอร์โทร</label>
            <input
              name="phone"
              type="tel"
              required
              placeholder="081-234-5678"
              value={form.phone}
              onChange={handleChange}
              className="w-full rounded-lg bg-[#0a1929] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-[#c5a059] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">เลือกบริการ</label>
            <select
              name="serviceId"
              required
              value={form.serviceId}
              onChange={handleChange}
              className="w-full rounded-lg bg-[#0a1929] border border-white/10 px-4 py-2.5 text-sm text-white focus:border-[#c5a059] focus:outline-none"
            >
              <option value="">-- เลือกบริการ --</option>
              {salon.services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} — ฿{s.price.toLocaleString()} ({s.duration} นาที)
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">เลือกช่าง (ถ้ามี)</label>
            <select
              name="staffId"
              value={form.staffId}
              onChange={handleChange}
              className="w-full rounded-lg bg-[#0a1929] border border-white/10 px-4 py-2.5 text-sm text-white focus:border-[#c5a059] focus:outline-none"
            >
              <option value="">-- ไม่ระบุ --</option>
              {salon.staff.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">เลือกวันที่</label>
            <input
              name="date"
              type="date"
              required
              value={form.date}
              onChange={handleChange}
              className="w-full rounded-lg bg-[#0a1929] border border-white/10 px-4 py-2.5 text-sm text-white focus:border-[#c5a059] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">เลือกเวลา</label>
            <select
              name="time"
              required
              value={form.time}
              onChange={handleChange}
              className="w-full rounded-lg bg-[#0a1929] border border-white/10 px-4 py-2.5 text-sm text-white focus:border-[#c5a059] focus:outline-none"
            >
              <option value="">-- เลือกเวลา --</option>
              {Array.from({ length: 11 }, (_, i) => {
                const h = i + 9;
                return [`${h}:00`, `${h}:30`];
              }).flat().map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#c5a059] py-3 text-sm font-bold text-[#062c1b] hover:bg-[#d4af37] transition disabled:opacity-50"
          >
            {loading ? "กำลังจอง..." : "จองคิว"}
          </button>
        </form>
      ) : (
        <div className="space-y-4 text-center">
          <p className="text-white font-medium">
            จองคิวสำเร็จ! กรุณาชำระเงินเพื่อยืนยัน
          </p>
          {selectedService && (
            <p className="text-slate-300">
              บริการ: {selectedService.name} — ฿{selectedService.price.toLocaleString()}
            </p>
          )}

          {qrUrl ? (
            <div className="space-y-3">
              <p className="text-sm text-slate-400">สแกน QR Code เพื่อชำระเงิน</p>
              <img
                src={qrUrl}
                alt="PromptPay QR Code"
                className="mx-auto rounded-lg border border-white/10"
              />
              <p className="text-xs text-slate-500">
                หลังชำระเงินแล้ว ระบบจะอัปเดตสถานะอัตโนมัติ
              </p>
            </div>
          ) : (
            <>
              {paymentError && (
                <p className="rounded-lg bg-red-950/50 px-3 py-2 text-sm text-red-300">
                  {paymentError}
                </p>
              )}
              <button
                onClick={createPayment}
                disabled={paymentLoading}
                className="w-full rounded-xl bg-[#c5a059] py-3 text-sm font-bold text-[#062c1b] hover:bg-[#d4af37] transition disabled:opacity-50"
              >
                {paymentLoading ? "กำลังสร้าง QR..." : "ชำระเงินด้วย PromptPay"}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default function BookPage({ salon }: { salon: Salon }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a1929]">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="mx-auto max-w-md w-full">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-[#c5a059] mb-2">จองคิว: {salon.name}</h1>
            <p className="text-slate-400 text-sm">
              เลือกบริการและวันเวลาที่ต้องการ
            </p>
          </div>

          <BookingForm salon={salon} />

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
