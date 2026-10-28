'use client';

import React, { useState } from 'react';
import { Search, CalendarDays, Bell, Plus } from 'lucide-react';

export default function Header() {
  const [search, setSearch] = useState('');

  return (
    <header className="sticky top-0 z-30 flex h-[72px] w-full items-center justify-between border-b border-[#EEF0F5] bg-white/95 px-6 backdrop-blur">
      <div className="ml-auto flex items-center gap-3">
        {/* Input Pencarian */}
        <div className="relative w-[280px]">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A91A3]"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari pesanan, resi, kurir..."
            className="h-10 w-full rounded-xl border border-transparent bg-[#F2F4FA] pl-10 pr-4 text-xs text-[#131B2E] outline-none transition placeholder:text-[#8A91A3] focus:border-[#0052FF] focus:bg-white"
          />
        </div>

        {/* Info Tanggal */}
        <button
          type="button"
          className="flex h-10 items-center gap-2 rounded-xl bg-[#F2F4FA] px-3.5 text-xs font-bold text-[#293246]"
        >
          <CalendarDays size={15} className="text-[#0052FF]" />
          <span>Hari ini, 24 Mei</span>
        </button>

        {/* Tombol Notifikasi */}
        <button
          type="button"
          aria-label="Notifikasi"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#596378] hover:bg-[#F3F5FA]"
        >
          <Bell size={18} />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#D93636]" />
        </button>

        {/* Tombol Buat Pesanan */}
        <button
          type="button"
          className="flex h-10 items-center gap-2 rounded-xl bg-[#0052FF] px-4 text-xs font-bold text-white shadow-sm shadow-[#0052FF]/20 transition hover:bg-[#0047DE]"
        >
          <Plus size={16} />
          <span>Buat Pesanan</span>
        </button>
      </div>
    </header>
  );
}