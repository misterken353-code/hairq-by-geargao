"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export default function RegisterPageClient() {
  const router = useRouter();
  const [form, setForm] = useState({
    salonName: "",
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          salonSlug: slugify(form.salonName),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "เกิดข้อผิดพลาด");
      } else {
        router.push("/login");
      }
    } catch {
      setError("เกิดข้อผิดพลาด กรุณาลองใหม่");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0a1929]">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">เปิดร้านกับ HairQ</h1>
            <p className="text-slate-400">สมัครใช้งานฟรี ไม่ต้องใช้บัตรเครดิต</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0d2137] p-8">
            {error && (
              <p className="mb-4 rounded-lg bg-red-950/50 px-3 py-2 text-sm text-red-300">
                {error}
              </p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">ชื่อร้าน</label>
                <input
                  name="salonName"
                  type="text"
                  required
                  placeholder="เช่น ร้านตัดผมสมชาย"
                  value={form.salonName}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-[#0a1929] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-[#c5a059] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">ชื่อ-นามสกุล</label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="ชื่อของคุณ"
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
                <label className="block text-sm font-medium text-slate-300 mb-1">อีเมล</label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-[#0a1929] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-[#c5a059] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">รหัสผ่าน</label>
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="ตั้งรหัสผ่าน"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-[#0a1929] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-[#c5a059] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#c5a059] py-3 text-sm font-bold text-[#062c1b] hover:bg-[#d4af37] transition disabled:opacity-50"
              >
                {loading ? "กำลังสมัคร..." : "สมัครใช้งานฟรี"}
              </button>
            </form>
          </div>

          <p className="mt-6 text-center text-sm text-slate-400">
            มีบัญชีอยู่แล้ว?{" "}
            <Link href="/login" className="text-[#c5a059] hover:underline font-medium">
              เข้าสู่ระบบ
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
