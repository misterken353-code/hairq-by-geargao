import Link from "next/link";
import { BRAND, LINKS } from "@/lib/brand";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0a1929]/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-[#c5a059]">{BRAND.name}</span>
          <span className="text-xs text-slate-400">by {BRAND.company}</span>
        </Link>
        <div className="flex items-center gap-3">
          <a href={LINKS.register} className="btn-gold text-sm">
            เปิดร้านฟรี
          </a>
        </div>
      </div>
    </nav>
  );
}
