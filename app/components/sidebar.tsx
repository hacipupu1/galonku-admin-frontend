'use client';

import React, { useState } from 'react';
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
  ChevronDown,
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
    children: [
      {
        name: 'Kurir Lapangan',
        href: '/monitoring/kurir',
        aliases: ['/monitoring/kurir-lapangan'],
      },
    ],
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

  // State dropdown terbuka/tertutup (default tertutup)
  const [isMonitoringOpen, setIsMonitoringOpen] = useState(false);

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[260px] flex-col justify-between border-r border-slate-100 bg-white p-5 select-none pointer-events-auto">
      {/* Header Brand */}
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-[18px] font-extrabold tracking-tight text-blue-600">
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

            // BILA MENU MEMILIKI SUB-MENU (Monitoring Pengantaran)
            if (item.children) {
              // Halaman persis /monitoring
              const isParentExactActive = pathname === item.href;
              // Sub-menu /monitoring/kurir-lapangan sedang aktif
              const isChildActive = item.children.some((child) =>
                child.aliases.some((alias) => pathname === alias)
              );

              return (
                <div key={item.name} className="flex flex-col gap-1.5">
                  {/* Container Menu Utama Monitoring */}
                  <div
                    className={`flex w-full items-center justify-between rounded-xl transition-all duration-150 ${
                      isParentExactActive
                        ? 'bg-[#2563EB] text-white shadow-md' // Biru Solid saat di /monitoring
                        : isChildActive
                        ? 'bg-[#F0F5FF] text-[#2563EB]' // Biru Muda jika Kurir Lapangan yang aktif
                        : 'text-slate-600 hover:bg-slate-50' // Putih Netral untuk hal lain (misal Dashboard)
                    }`}
                  >
                    {/* LINK UTAMA: Klik teks/icon ini akan mengarah ke /monitoring */}
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 px-3.5 py-3 text-xs font-bold flex-1 min-w-0"
                    >
                      <Icon
                        size={18}
                        className={`shrink-0 ${
                          isParentExactActive
                            ? 'text-white'
                            : isChildActive
                            ? 'text-[#2563EB]'
                            : 'text-slate-400'
                        }`}
                      />
                      <span className="whitespace-nowrap">{item.name}</span>
                    </Link>

                    {/* TOMBOL PANAH: Khusus untuk Buka / Tutup Sub-menu */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMonitoringOpen(!isMonitoringOpen);
                      }}
                      className="p-3 hover:opacity-80 transition cursor-pointer shrink-0"
                      title="Buka Sub-menu"
                    >
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          isMonitoringOpen ? 'rotate-180' : 'rotate-0'
                        } ${
                          isParentExactActive
                            ? 'text-white'
                            : isChildActive
                            ? 'text-[#2563EB]'
                            : 'text-slate-400'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Sub-menu Kurir Lapangan (Hanya muncul jika Panah di-klik) */}
                  {isMonitoringOpen && (
                    <div className="flex items-center gap-2 pl-3 py-0.5">
                      {/* Garis Vertikal Kiri */}
                      <div className="h-8 w-[2px] rounded-full bg-blue-400 shrink-0 ml-1.5" />

                      {/* Item Sub-Menu */}
                      <div className="flex-1 flex flex-col gap-1">
                        {item.children.map((subItem) => {
                          const isSubActive = subItem.aliases.some(
                            (alias) => pathname === alias
                          );

                          return (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={`flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all duration-150 ${
                                isSubActive
                                  ? 'bg-[#2563EB] text-white shadow-sm'
                                  : 'text-slate-600 hover:bg-slate-50'
                              }`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                                  isSubActive ? 'bg-white' : 'bg-slate-400'
                                }`}
                              />
                              <span className="whitespace-nowrap">
                                {subItem.name}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            // MENU BIASA (Dashboard, Pesanan, Produk, Laporan)
            const isActive = item.aliases.some(
              (alias) => pathname === alias || (alias !== '/' && pathname.startsWith(alias))
            );

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-[#2563EB] text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon
                  size={18}
                  className={`shrink-0 ${
                    isActive ? 'text-white' : 'text-slate-400'
                  }`}
                />
                <span className="whitespace-nowrap">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Profil User */}
      <div className="border-t border-slate-100 pt-4">
        <div className="flex items-center justify-between rounded-xl bg-[#F1F4FF] p-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-white">
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