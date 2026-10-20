'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Data Kurir Lapangan
const kurirData = [
  {
    id: 'k1',
    nama: 'Pak Budi Santoso',
    motor: 'Honda Beat • B 4120 SZX',
    initial: 'BS',
    status: 'jalan', // 'jalan' | 'standby'
    tugas: '#ORD-8821',
    deskripsi: 'Membawa 3 Galon Aqua ke Jl. Mawar No. 12, Kebayoran Lama',
    progress: 75,
    berangkat: '10:45',
    estimasi: 'Est. 6 menit lagi',
  },
  {
    id: 'k2',
    nama: 'Mas Doni Wijaya',
    motor: 'Honda Vario • B 6891 PQR',
    initial: 'DW',
    status: 'jalan',
    tugas: '#ORD-8822',
    deskripsi: 'Membawa 2 Galon Le Minerale ke Gandaria Heights Lt. 08',
    progress: 45,
    berangkat: '10:55',
    estimasi: 'Est. 12 menit lagi',
  },
  {
    id: 'k3',
    nama: 'Pak Agus Prasetyo',
    motor: 'Honda Scoopy • B 3310 KLM',
    initial: 'AP',
    status: 'standby',
    statusDepoTitle: 'Siap Antar Kloter Baru',
    deskripsi: 'Telah menyelesaikan 7 pengantaran pagi. Siap menerima penugasan kloter berikutnya.',
  },
  {
    id: 'k4',
    nama: 'Hendra Kurnia',
    motor: 'Honda Revo • B 5502 TYA',
    initial: 'HK',
    status: 'jalan',
    tugas: '#ORD-8824',
    deskripsi: 'Membawa 4 Galon (2 Aqua + 2 Club) ke Apartemen Gandaria Lt. 14',
    progress: 25,
    berangkat: '11:05',
    estimasi: 'Est. 15 menit lagi',
  },
];

// Data Tabel Pengantaran Aktif
const pengantaranData = [
  {
    id: 'p1',
    noOrder: '#ORD-8821',
    jam: '10:42 WIB',
    kurirNama: 'Pak Budi',
    kurirPlat: 'B 4120 SZX',
    alamatUtama: 'Jl. Mawar No. 12',
    alamatDetail: 'Ibu Fitriani (0812-9988-xxxx)',
    patokan: 'Patokan: Sebelah Pos RW 03',
    muatan: '3 Galon Aqua',
    progressPct: 75,
    estimasiText: '75% Selesai 6 mnt lagi',
    jarakText: 'Jarak: 600m ke titik kirim',
    status: 'Diantar', // 'Diantar' | 'Diproses' | 'Selesai'
    typeStatus: 'diantar',
  },
  {
    id: 'p2',
    noOrder: '#ORD-8822',
    jam: '10:51 WIB',
    kurirNama: 'Mas Doni',
    kurirPlat: 'B 6891 PQR',
    alamatUtama: 'Gandaria Heights Lt. 08 #8B',
    alamatDetail: 'Bpk. Ronald (0817-2345-xxxx)',
    patokan: 'Titip di Lobby Resepsionis',
    muatan: '2 Galon Le Minerale',
    progressPct: 45,
    estimasiText: '45% Selesai 12 mnt lagi',
    jarakText: 'Jarak: 1.8 KM (Lampu Merah Kyai Maja)',
    status: 'Diantar',
    typeStatus: 'diantar',
  },
  {
    id: 'p3',
    noOrder: '#ORD-8824',
    jam: '11:02 WIB',
    kurirNama: 'Hendra K.',
    kurirPlat: 'B 5502 TYA',
    alamatUtama: 'Apartemen 1Park Residences Lt. 14',
    alamatDetail: 'Sdr. Kevin Hadi (0852-1100-xxxx)',
    patokan: 'Bawa Troli Depo',
    isHighlightPatokan: true,
    muatan: '4 Galon Campur',
    progressPct: 25,
    estimasiText: '25% Selesai 15 mnt lagi',
    jarakText: 'Jarak: 2.7 KM (Baru keluar Depo)',
    status: 'Diantar',
    typeStatus: 'diantar',
  },
  {
    id: 'p4',
    noOrder: '#ORD-8825',
    jam: '11:15 WIB',
    kurirNama: 'Rian Pratama',
    kurirPlat: 'B 3912 BKN',
    alamatUtama: 'Komp. Lemigas Blok B4',
    alamatDetail: 'Ibu Maya (0811-9481-xxxx)',
    patokan: 'Bayar COD Rp 54.000',
    muatan: '3 Galon Aqua',
    progressPct: 10,
    estimasiText: 'Sedang Muat Depo JKT-04',
    jarakText: 'Persiapan berangkat',
    status: 'Diproses',
    typeStatus: 'diproses',
  },
];

export default function MonitoringPage() {
  const [activeTab, setActiveTab] = useState<'semua' | 'jalan' | 'standby' | 'riwayat'>('semua');
  const [activeView, setActiveView] = useState<'daftar' | 'peta'>('daftar');

  // Filter Kurir Lapangan
  const filteredKurir = kurirData.filter((k) => {
    if (activeTab === 'jalan') return k.status === 'jalan';
    if (activeTab === 'standby') return k.status === 'standby';
    if (activeTab === 'riwayat') return false; // Riwayat khusus daftar selesai
    return true; // 'semua'
  });

  // Filter Tabel Pengantaran Aktif
  const filteredPengantaran = pengantaranData.filter((p) => {
    if (activeTab === 'jalan') return p.typeStatus === 'diantar';
    if (activeTab === 'standby') return p.typeStatus === 'diproses';
    if (activeTab === 'riwayat') return false;
    return true; // 'semua'
  });

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-slate-800 font-sans antialiased">
      {/* ==================== SIDEBAR ==================== */}
      <aside className="w-64 bg-white border-r border-slate-100 flex flex-col justify-between shrink-0 sticky top-0 h-screen p-5 z-20">
        <div>
          {/* Logo Brand */}
          <div className="mb-8">
            <h1 className="text-xl font-bold text-blue-600 tracking-tight">GalonKu Admin</h1>
            <p className="text-xs text-slate-400 mt-0.5">Portal Manajemen & Operasional</p>
          </div>

          {/* Navigasi Menu Utama */}
          <div className="space-y-1">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3 px-3">
              MENU UTAMA
            </p>

            {/* 1. Dashboard */}
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 transition-all font-medium text-sm"
            >
              <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Dashboard
            </Link>

            {/* 2. Manajemen Pesanan */}
            <Link
              href="/pesanan"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 transition-all font-medium text-sm"
            >
              <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Manajemen Pesanan
            </Link>

            {/* 3. Produk & Stok */}
            <Link
              href="/produk"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 transition-all font-medium text-sm"
            >
              <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              Produk & Stok
            </Link>

            {/* 4. Monitoring Pengantaran (AKTIF - TRUK LOGISTIK) */}
            <Link
              href="/monitoring"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20 font-medium text-sm transition-all"
            >
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4zm-12-3h10a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2zm12 0h2a2 2 0 002-2v-3l-2-3h-2v8z" />
              </svg>
              Monitoring Pengantaran
            </Link>

            {/* 5. Laporan Keuangan */}
            <Link
              href="/laporan"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 transition-all font-medium text-sm"
            >
              <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Laporan Keuangan
            </Link>
          </div>
        </div>

        {/* User Card */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-900 text-white font-semibold flex items-center justify-center text-sm shadow-sm">
              BS
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800 leading-tight">Budi Santoso</p>
              <p className="text-[11px] text-slate-400">Super Admin</p>
            </div>
          </div>
          <button className="text-slate-400 hover:text-slate-600 p-1.5 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </aside>

      {/* ==================== MAIN CONTENT ==================== */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header Bar */}
        <header className="h-16 bg-white border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="relative w-96">
            <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Cari pesanan, resi, kurir..."
              className="w-full bg-slate-50 border-none rounded-xl pl-10 pr-4 py-2 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-3 py-1.5 text-xs text-slate-600 font-medium">
              <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Hari ini, 24 Mei</span>
            </div>

            <button className="relative p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-100 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v1.341C7.67 7.165 6 9.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9" />
              </svg>
              <span className="w-2 h-2 bg-red-500 rounded-full absolute top-2 right-2 ring-2 ring-white"></span>
            </button>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all">
              <span className="text-sm font-bold">+</span> Buat Pesanan
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8 space-y-6">
          {/* Header Title */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-teal-600 font-semibold text-[11px] uppercase tracking-wider mb-1">
                <svg className="w-4 h-4 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4zm-12-3h10a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2zm12 0h2a2 2 0 002-2v-3l-2-3h-2v8z" />
                </svg>
                FLEET LOGISTICS & LIVE DISPATCH
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Monitoring Pengantaran</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Pelacak armada kurir motor, status pengiriman pesanan, dan efisiensi rute depo secara langsung.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-slate-100 p-1 rounded-xl flex items-center text-xs font-medium border border-slate-200/60">
                <button
                  onClick={() => setActiveView('daftar')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                    activeView === 'daftar' ? 'bg-white text-slate-800 shadow-sm font-semibold' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  Daftar
                </button>
                <button
                  onClick={() => setActiveView('peta')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                    activeView === 'peta' ? 'bg-white text-slate-800 shadow-sm font-semibold' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Live Peta
                </button>
              </div>

              <button className="bg-blue-900 hover:bg-slate-900 text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm flex items-center gap-2 transition-all">
                <span>+</span> Tambah Armada Kurir
              </button>
            </div>
          </div>

          {/* ==================== STATS CARDS ROW ==================== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400">Total Armada</p>
                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="text-2xl font-bold text-slate-900">6</span>
                  <span className="text-xs font-medium text-slate-500">Kurir Motor</span>
                </div>
                <p className="text-[11px] text-teal-600 font-medium mt-2 flex items-center gap-1">
                  <span>⚡</span> Kapasitas 100% Siaga
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400">Sedang Mengantar</p>
                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="text-2xl font-bold text-slate-900">4</span>
                  <span className="text-xs font-medium text-slate-500">Kurir di Jalan</span>
                </div>
                <p className="text-[11px] text-blue-600 font-medium mt-2 flex items-center gap-1">
                  <span>📦</span> 11 Galon Sedang Dikirim
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400">Standby Depo</p>
                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="text-2xl font-bold text-slate-900">2</span>
                  <span className="text-xs font-medium text-slate-500">Siap Muat Kirim</span>
                </div>
                <p className="text-[11px] text-emerald-600 font-medium mt-2 flex items-center gap-1">
                  <span>✔</span> Idle &lt; 8 Menit
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0h4m-4 0v-4" />
                </svg>
              </div>
            </div>

            {/* Card 4: Rata-rata Waktu */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400">Rata-rata Waktu</p>
                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="text-2xl font-bold text-slate-900">18</span>
                  <span className="text-xs font-medium text-slate-500">Menit / Pesanan</span>
                </div>
                <p className="text-[11px] text-emerald-600 font-medium mt-2 flex items-center gap-1">
                  <span>📉</span> 3.2 mnt lebih cepat dr SLA
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* ==================== FILTER TABS & SEARCH ==================== */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => setActiveTab('semua')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'semua'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-white border border-slate-100 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Semua Armada (4)
              </button>
              <button
                onClick={() => setActiveTab('jalan')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'jalan'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-white border border-slate-100 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Sedang Jalan (3)
              </button>
              <button
                onClick={() => setActiveTab('standby')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'standby'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-white border border-slate-100 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Standby Depo (1)
              </button>
              <button
                onClick={() => setActiveTab('riwayat')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'riwayat'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-white border border-slate-100 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Riwayat Hari Ini
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Cari kurir, plat, order..."
                className="w-full bg-white border border-slate-200/80 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {/* ==================== 2 COLUMNS CONTENT ==================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT: KURIR LAPANGAN (4/12) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <h3 className="font-bold text-slate-800 text-sm">Kurir Lapangan</h3>
                </div>
                <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                  {filteredKurir.filter((k) => k.status === 'jalan').length} / {filteredKurir.length} Bergerak
                </span>
              </div>

              {filteredKurir.length === 0 ? (
                <div className="bg-white p-8 text-center rounded-2xl border border-slate-100 text-slate-400 text-xs">
                  Tidak ada data kurir untuk kategori ini.
                </div>
              ) : (
                filteredKurir.map((kurir) => (
                  <div key={kurir.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-xs">
                          {kurir.initial}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm">{kurir.nama}</h4>
                          <p className="text-[11px] text-slate-400">{kurir.motor}</p>
                        </div>
                      </div>

                      {kurir.status === 'jalan' ? (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-sky-50 text-sky-600 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span> Di Jalan
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Standby Depo
                        </span>
                      )}
                    </div>

                    {kurir.status === 'jalan' ? (
                      <>
                        <div className="bg-slate-50 p-3 rounded-xl space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] text-slate-400">Tugas Saat Ini</span>
                            <span className="font-bold text-blue-600">{kurir.tugas}</span>
                          </div>

                          <p className="text-slate-700 font-medium leading-snug">{kurir.deskripsi}</p>

                          {/* Progress Bar */}
                          <div className="w-full bg-slate-200/60 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-blue-600 h-full rounded-full transition-all duration-300" style={{ width: `${kurir.progress}%` }}></div>
                          </div>

                          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
                            <span>Berangkat {kurir.berangkat}</span>
                            <span className="text-sky-600 font-semibold">{kurir.estimasi}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <button className="w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5 transition-colors">
                            <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            Hubungi
                          </button>
                          <button className="w-full py-2 bg-blue-50 hover:bg-blue-100 border border-blue-100 rounded-xl text-xs font-semibold text-blue-600 flex items-center justify-center gap-1.5 transition-colors">
                            <svg className="w-3.5 h-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                            Pantau Rute
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="bg-slate-50 p-3 rounded-xl space-y-1 text-xs">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-slate-400">Status Depo</span>
                            <span className="font-semibold text-emerald-600">{kurir.statusDepoTitle}</span>
                          </div>
                          <p className="text-slate-600 text-[11px] leading-relaxed mt-1">{kurir.deskripsi}</p>
                        </div>

                        <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors flex items-center justify-center gap-1">
                          <span>+</span> Tugaskan Pesanan Antre
                        </button>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* RIGHT: TABEL PENGANTARAN AKTIF (7/12) */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-bold text-slate-800 text-base">Tabel Pengantaran Aktif</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Pesanan yang sedang dalam proses pengiriman oleh kurir depo</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Diurutkan:</span>
                  <select className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-xs font-semibold text-slate-700 focus:outline-none">
                    <option>Estimasi SLA Terdekat</option>
                    <option>Terbaru Hari Ini</option>
                    <option>Status Pengiriman</option>
                  </select>
                </div>
              </div>

              {/* Table Wrapper */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-2">NO. ORDER</th>
                      <th className="py-3 px-2">KURIR & ARMADA</th>
                      <th className="py-3 px-2">ALAMAT TUJUAN</th>
                      <th className="py-3 px-2">MUATAN</th>
                      <th className="py-3 px-2">PROGRESS / ESTIMASI</th>
                      <th className="py-3 px-2 text-center">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredPengantaran.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-400 text-xs">
                          Tidak ada data pengantaran untuk status ini.
                        </td>
                      </tr>
                    ) : (
                      filteredPengantaran.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                          {/* 1. NO ORDER */}
                          <td className="py-4 px-2 font-bold text-blue-600">
                            {item.noOrder}
                            <span className="block text-[10px] text-slate-400 font-normal">{item.jam}</span>
                          </td>

                          {/* 2. KURIR & ARMADA */}
                          <td className="py-4 px-2">
                            <p className="font-bold text-slate-800">{item.kurirNama}</p>
                            <p className="text-[10px] text-slate-400">{item.kurirPlat}</p>
                          </td>

                          {/* 3. ALAMAT TUJUAN */}
                          <td className="py-4 px-2 max-w-[180px]">
                            <p className="font-semibold text-slate-800 leading-tight">{item.alamatUtama}</p>
                            <p className="text-[10px] text-slate-400 leading-tight mt-0.5">{item.alamatDetail}</p>
                            <p className={`text-[10px] mt-0.5 ${item.isHighlightPatokan ? 'font-bold text-blue-600' : 'text-slate-500'}`}>
                              {item.patokan}
                            </p>
                          </td>

                          {/* 4. MUATAN */}
                          <td className="py-4 px-2">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-sky-50 text-sky-700 whitespace-nowrap border border-sky-100">
                              💧 {item.muatan}
                            </span>
                          </td>

                          {/* 5. PROGRESS / ESTIMASI */}
                          <td className="py-4 px-2">
                            <div className="w-28 space-y-1">
                              <div className="flex justify-between text-[10px] font-semibold text-slate-700">
                                <span>{item.estimasiText}</span>
                              </div>
                              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                <div
                                  className="bg-blue-600 h-full rounded-full"
                                  style={{ width: `${item.progressPct}%` }}
                                ></div>
                              </div>
                              <span className="text-[9px] text-slate-400 block">{item.jarakText}</span>
                            </div>
                          </td>

                          {/* 6. STATUS (Paling Kanan) */}
                          <td className="py-4 px-2 text-center">
                            {item.status === 'Diantar' ? (
                              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-sky-50 text-sky-600 inline-flex items-center gap-1 border border-sky-100">
                                <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span> Diantar
                              </span>
                            ) : (
                              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 inline-flex items-center gap-1 border border-blue-100">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span> Diproses
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}