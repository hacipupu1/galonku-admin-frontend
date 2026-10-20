"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Package,
  Truck,
  Wallet,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Manajemen Pesanan",
    href: "/orders",
    icon: ClipboardList,
  },
  {
    name: "Produk & Stok",
    href: "/products",
    icon: Package,
  },
  {
    name: "Monitoring Pengantaran",
    href: "/monitoring",
    icon: Truck,
  },
  {
    name: "Laporan Keuangan",
    href: "/reports",
    icon: Wallet,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[308px] flex-col border-r border-gray-100 bg-white">
      
      {/* LOGO */}
      <div className="border-b border-gray-100 px-8 py-7">
        <h1 className="text-2xl font-bold text-[#0052FF]">
          GalonKu Admin
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Portal Manajemen & Operasional
        </p>
      </div>

      {/* MENU */}
      <div className="flex-1 px-5 py-8">
        <p className="mb-5 px-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
          Menu Utama
        </p>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-4 rounded-2xl px-4 py-4 text-base font-medium transition-all ${
                  active
                    ? "bg-[#0052FF] text-white shadow-lg shadow-blue-200"
                    : "text-[#131B2E] hover:bg-[#E8F1FF] hover:text-[#0052FF]"
                }`}
              >
                <Icon size={22} />

                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ADMIN */}
      <div className="border-t border-gray-100 p-5">
        <div className="flex items-center gap-3 rounded-2xl bg-[#E8F1FF] p-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#131B2E] text-sm font-bold text-white">
            BS
          </div>

          <div>
            <p className="text-sm font-semibold text-[#131B2E]">
              Budi Santoso
            </p>

            <p className="text-xs text-gray-500">
              Super Admin
            </p>
          </div>
        </div>
      </div>

    </aside>
  );
}