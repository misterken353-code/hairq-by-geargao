import { LINKS } from "@/lib/brand";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0a1929] px-4 py-10">
      <div className="mx-auto max-w-6xl text-center">
        <p className="mb-2 text-xl font-bold text-[#c5a059]">HairQ</p>
        <p className="mb-4 text-sm text-slate-400">
          ระบบจองคิวสำหรับร้านทำผมและร้านเสริมสวย — โดย GearGaoPro
        </p>
        <div className="flex justify-center gap-4 text-sm text-slate-500">
          <a href={LINKS.lineOA} className="hover:text-[#c5a059]" target="_blank" rel="noopener noreferrer">LINE</a>
          <a href={`mailto:${LINKS.email}`} className="hover:text-[#c5a059]">Email</a>
        </div>
        <p className="mt-4 text-xs text-slate-600">
          © {new Date().getFullYear()} HairQ by GearGaoPro. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
