"use client";

import { useEffect, useState } from "react";

interface Customer {
  id: string;
  name: string;
  phone: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("hairq_token");
    if (!token) return;
    fetch("/api/admin/customers", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => { setCustomers(d.customers || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-slate-400">กำลังโหลด...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">ลูกค้า</h1>
      <div className="rounded-2xl border border-white/10 bg-[#0d2137] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#0a1929]">
            <tr>
              <th className="text-left px-4 py-3 text-slate-400 font-medium">ชื่อ</th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium">เบอร์โทร</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {customers.length === 0 ? (
              <tr><td colSpan={2} className="px-4 py-8 text-center text-slate-400">ยังไม่มีลูกค้า</td></tr>
            ) : (
              customers.map((c) => (
                <tr key={c.id} className="hover:bg-white/5 transition cursor-pointer">
                  <td className="px-4 py-3 text-white font-medium">{c.name}</td>
                  <td className="px-4 py-3 text-slate-300">{c.phone}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
