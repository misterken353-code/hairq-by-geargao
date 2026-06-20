# HairQ by GearGaoPro

> ระบบจองคิวออนไลน์สำหรับร้านทำผม และร้านเสริมสวย

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6)](https://www.typescriptlang.org/)

## 🎯 เกี่ยวกับ HairQ

**HairQ** คือระบบจองคิวออนไลน์ SaaS ที่ออกแบบมาสำหรับร้านทำผม และร้านเสริมสวยโดยเฉพาะ ช่วยให้ร้านค้ารับจองคิว ขายคอร์ส เก็บเงิน และดูแลลูกค้าได้ครบในที่เดียว โดยไม่ต้องติดตั้งแอป

## ✨ ฟีเจอร์หลัก

| ฟีเจอร์ | รายละเอียด |
|---------|------------|
| ✅ **จองคิวออนไลน์** | ลูกค้าจองผ่านลิงก์ /book/ร้านคุณ ได้ตลอด 24 ชม. |
| ✅ **PromptPay QR** | สร้าง QR ชำระเงินอัตโนมัติหลังจอง ไม่ต้องติดตั้งเครื่องรูดบัตร |
| ✅ **ขายคอร์ส & E-Card** | ขายคอร์สตัดผม สปา ทำสี แบบครั้ง/แพ็กเกจ ระบบตัดยอดอัตโนมัติ |
| ✅ **LINE เตือนนัด** | ส่งข้อความเตือนอัตโนมัติทุกเช้า ลูกค้าไม่ลืม ร้านไม่เสียคิว |
| ✅ **ปฏิทินคิวช่าง** | ยืนยัน ยกเลิก ย้ายคิว และติดตามสถานะชำระเงินในหน้าเดียว |
| ✅ **ดูแลลูกค้า** | ประวัติการตัดผม รูป before/after สไตล์ที่ชอบ และแพ้ยา/เคมี |

## 🛠️ เทคโนโลยี

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Deploy:** [Vercel](https://vercel.com/)

## 🚀 เริ่มต้นใช้งาน (สำหรับ Developer)

### 1. Clone โปรเจกต์

```bash
git clone https://github.com/misterken353-code/hairq-by-geargao.git
cd hairq-by-geargao
```

### 2. ติดตั้ง dependencies

```bash
npm install
```

### 3. รันในโหมด Development

```bash
npm run dev
```

เปิดเบราว์เซอร์ไปที่ `http://localhost:3000`

### 4. Build สำหรับ Production

```bash
npm run build
```

## 📦 โครงสร้างโปรเจกต์

```
├── app/                    # Next.js App Router
│   ├── page.tsx            # Landing Page (หน้าขาย)
│   ├── layout.tsx          # Root Layout
│   ├── globals.css         # Global Styles
│   ├── book/               # หน้าจองคิว
│   │   ├── page.tsx        # หน้าจองคิว (index)
│   │   └── [slug]/         # หน้าจองคิวของแต่ละร้าน
│   └── dashboard/          # หน้าแดชบอร์ดร้าน
├── components/             # React Components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── HowItWorks.tsx
│   ├── Pricing.tsx
│   ├── CTA.tsx
│   └── Footer.tsx
├── lib/                    # Utilities & Brand config
│   └── brand.ts
├── public/                 # Static assets
│   └── images/
├── package.json
├── tsconfig.json
├── next.config.ts
└── postcss.config.mjs
```

## 🎨 Design System

| Token | ค่า | ใช้สำหรับ |
|-------|------|-----------|
| `--color-background` | `#0a1929` | พื้นหลังหลัก |
| `--color-brand` | `#0a3d29` | สีเขียวแบรนด์ |
| `--color-gold` | `#c5a059` | สีทอง (CTA, accent) |
| `--color-gold-light` | `#d4af37` | สีทองสว่าง (hover) |

## 🌐 Deploy

### Deploy บน Vercel (แนะนำ)

1. Fork หรือ Push โปรเจกต์นี้ขึ้น GitHub
2. ไปที่ [vercel.com](https://vercel.com)
3. กด **Add New Project** → Import จาก GitHub
4. Framework Preset: **Next.js**
5. กด **Deploy**

โปรเจกต์จะถูก Deploy อัตโนมัติทุกครั้งที่ push code ใหม่ (Auto Deploy)

## 📝 สถานะการพัฒนา

| ส่วน | สถานะ | หมายเหตุ |
|------|--------|----------|
| Landing Page | ✅ เสร็จ | หน้าขายครบถ้วน |
| UI Components | ✅ เสร็จ | Navbar, Hero, Features, Pricing, CTA, Footer |
| หน้าจองคิว (demo) | ✅ เสร็จ | ตัวอย่างหน้าจอง |
| หน้า Dashboard (demo) | ✅ เสร็จ | ตัวอย่างแดชบอร์ด |
| Database | 🚧 รอพัฒนา | ต้องเพิ่ม Supabase/PostgreSQL |
| Authentication | 🚧 รอพัฒนา | ต้องเพิ่ม NextAuth/Clerk |
| Payment (PromptPay) | 🚧 รอพัฒนา | ต้องเพิ่ม PromptPay API |
| LINE Notify | 🚧 รอพัฒนา | ต้องเพิ่ม LINE API |

## 🤝 ติดต่อเรา

- **LINE:** [@GearGaoPro](https://lin.ee/YQxNyz4)
- **Email:** mister.ken353@gmail.com
- **Website:** [geargaopro.com](https://www.geargaopro.com)

## 📄 License

Copyright © 2024 HairQ by GearGaoPro. All rights reserved.

---

<p align="center">
  <strong>HairQ</strong> — ระบบจองคิวที่ร้านทำผมไว้วางใจ
</p>
