"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { href: "/admin/dashboard", label: "แดชบอร์ด", icon: "📊" },
  { href: "/admin/calendar", label: "ปฏิทิน", icon: "📅" },
  { href: "/admin/bookings", label: "รายการจอง", icon: "📋" },
  { href: "/admin/services", label: "บริการ", icon: "✂️" },
  { href: "/admin/staff", label: "ช่าง", icon: "👤" },
  { href: "/admin/customers", label: "ลูกค้า", icon: "👥" },
  { href: "/admin/ecards", label: "คอร์ส/E-Card", icon: "🎫" },
  { href: "/admin/settings", label: "ตั้งค่า", icon: "⚙️" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-[#0d2137] border-r border-white/10 fixed left-0 top-0 z-40">
      <div className="p-6 border-b border-white/10">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <span className="text-xl font-bold text-[#c5a059]">HairQ</span>
          <span className="text-xs text-slate-400">Admin</span>
        </Link>
      </div>

      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                isActive
                  ? "bg-[#0a3d29] text-[#c5a059]"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-400 hover:text-white transition"
        >
          <span>←</span>
          <span>กลับไปหน้าเว็บ</span>
        </Link>
      </div>
    </aside>
  );
}
