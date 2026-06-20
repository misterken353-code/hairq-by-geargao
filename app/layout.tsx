import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";
import "./globals.css";

export const metadata: Metadata = {
  title: "HairQ by GearGaoPro — ระบบจองคิวร้านทำผมและร้านเสริมสวย",
  description:
    "HairQ ช่วยร้านทำผม สปา และร้านเสริมสวย รับจองออนไลน์ เก็บเงิน PromptPay ขายคอร์ส และส่งเตือน LINE — เริ่มใช้ฟรี 14 วัน",
  keywords: ["จองคิวร้านทำผม", "ระบบจองคิว", "ร้านเสริมสวย", "จองคิวออนไลน์", "HairQ"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className="min-h-screen bg-[#0a1929] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
