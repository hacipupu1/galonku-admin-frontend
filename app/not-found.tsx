'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Droplets, ArrowLeft, LayoutDashboard, SearchX } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-[82vh] w-full items-center justify-center bg-[#F8FAFC] p-6 font-sans text-[#131B2E] antialiased">
      <div className="w-full max-w-md rounded-3xl border border-[#EEF0F5] bg-white p-8 text-center shadow-sm">
        {/* Ikon & Badge 404 */}
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EEF0FF] text-[#0052FF]">
          <SearchX className="h-8 w-8" />
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F6FD] px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#0052FF]">
          <Droplets className="h-3.5 w-3.5" />
          <span>Error 404 • GalonKu Admin</span>
        </div>

        {/* Judul & Keterangan */}
        <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-[#131B2E]">
          Halaman Tidak Ditemukan
        </h1>
        <p className="mt-2 text-xs leading-relaxed text-[#69738A]">
          Maaf, URL atau halaman operasional yang Anda tuju tidak tersedia, sudah dipindahkan, atau terjadi kesalahan penulisan alamat.
        </p>

        {/* Tombol Navigasi */}
        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#EEF0F5] bg-white px-4 py-2.5 text-xs font-bold text-[#293246] transition hover:bg-[#F4F6FD]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali</span>
          </button>

          <Link
            href="/dashboard"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0052FF] px-4 py-2.5 text-xs font-bold text-white shadow-sm shadow-[#0052FF]/20 transition hover:bg-[#0047DE]"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>Ke Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}