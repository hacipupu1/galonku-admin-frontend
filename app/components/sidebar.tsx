'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ClipboardList,
  Package,
  Truck,
  CreditCard,
  UserRound,
  LogOut,
} from 'lucide-react';

export const menuItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Manajemen Pesanan',
    href: '/manajemenpesanan',
    icon: ClipboardList,
  },
  {
    label: 'Produk & Stok',
    href: '/products',
    icon: Package,
  },
  {
    label: 'Monitoring Pengantaran',
    href: '/monitoring',
    icon: Truck,
  },
  {
    label: 'Laporan Keuangan',
    href: '/laporankeu',
    icon: CreditCard,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex w-[248px] flex-col border-r border-[#E9ECF4] bg-white">
      {/* BRAND */}
      <div className="flex h-[72px] items-center border-b border-[#EEF0F5] px-6">
        <div>
          <div className="text-[18px] font-extrabold tracking-[-0.04em] text-[#0052FF]">
            GalonKu Admin
          </div>
          <div className="mt-0.5 text-[10px] font-medium text-[#6F7890]">
            Portal Manajemen &amp; Operasional
          </div>
        </div>
      </div>

      {/* MENU UTAMA */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <p className="px-3 text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#737C91]">
          Menu Utama
        </p>

        <nav className="mt-4 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[14px] font-semibold transition ${
                  isActive
                    ? 'bg-[#0052FF] text-white shadow-[0_8px_18px_rgba(0,82,255,0.18)]'
                    : 'text-[#293246] hover:bg-[#F1F4FB]'
                }`}
              >
                <Icon size={18} strokeWidth={1.8} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* USER PROFILE */}
      <div className="border-t border-[#EEF0F5] p-4">
        <div className="flex items-center gap-3 rounded-xl bg-[#F1F3FF] px-3 py-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0052FF] text-white">
            <UserRound size={18} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-bold text-[#131B2E]">
              Budi Santoso
            </p>
            <p className="text-[10px] text-[#687289]">
              Super Admin
            </p>
          </div>

          <button
            type="button"
            aria-label="Keluar"
            className="rounded-lg p-1.5 text-[#536079] hover:bg-white transition"
          >
            <LogOut size={17} />
          </button>
        </div>
      </div>
    </aside>
  );
}