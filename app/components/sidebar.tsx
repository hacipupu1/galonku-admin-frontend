'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  ClipboardList,
  Package,
  Truck,
  FileText,
  LogOut,
  UserRound,
} from 'lucide-react';

const menuItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    aliases: ['/dashboard'],
    icon: LayoutDashboard,
  },
  {
    name: 'Manajemen Pesanan',
    href: '/manajemenpesanan',
    aliases: ['/manajemenpesanan', '/manajemen-pesanan'],
    icon: ClipboardList,
  },
  {
    name: 'Produk & Stok',
    href: '/products',
    aliases: ['/products', '/produk-stok'],
    icon: Package,
  },
  {
    name: 'Monitoring Pengantaran',
    href: '/monitoring',
    aliases: ['/monitoring'],
    icon: Truck,
  },
  {
    name: 'Laporan Keuangan',
    href: '/laporankeu',
    aliases: ['/laporankeu', '/laporan-keuangan'],
    icon: FileText,
  },
];

export default function Sidebar() {
  const pathname = usePathname() || '';
  const router = useRouter();

  const handleLogout = () => {
    // Navigasi langsung ke halaman login
    router.push('/login');
  };

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[248px] flex-col justify-between border-r border-slate-100 bg-white p-5 select-none pointer-events-auto">
      {/* Header Brand */}
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-[18px] font-extrabold tracking-tight text-[#0052FF]">
            GalonKu Admin
          </h1>
          <p className="mt-0.5 text-[10px] font-medium text-slate-400">
            Portal Manajemen &amp; Operasional
          </p>
        </div>

        {/* List Navigasi Utama */}
        <nav className="flex flex-col gap-1.5">
          <span className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            MENU UTAMA
          </span>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.aliases.some(
              (alias) => pathname === alias || pathname.startsWith(alias)
            );

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-[#0052FF] text-white shadow-md shadow-[#0052FF]/20'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon
                  size={18}
                  className={isActive ? 'text-white' : 'text-slate-400'}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Profil User (Kotak Bawah) */}
      <div className="border-t border-slate-100 pt-4">
        <div className="flex items-center justify-between rounded-xl bg-[#F1F4FF] p-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0052FF] text-white">
              <UserRound size={18} />
            </div>
            <div className="flex flex-col leading-tight min-w-0">
              <span className="truncate text-xs font-bold text-slate-800">
                Budi Santoso
              </span>
              <span className="text-[10px] font-medium text-slate-400">
                Super Admin
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white hover:text-red-600 cursor-pointer"
            title="Keluar"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}