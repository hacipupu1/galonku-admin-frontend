'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Data 5 Pesanan Terbaru Sesuai Wireframe
const ordersData = [
  {
    id: 'o1',
    noOrder: '#ORD-8824',
    waktu: 'Baru saja (1 mnt lalu)',
    nama: 'Fia Salsa',
    hp: '0812-9844-3211',
    alamat: 'Kost Sakura No. 4, Kebayoran',
    qty: '2x',
    produk: 'Aqua 19L Refill',
    tipeProduk: 'Tukar Galon',
    total: 'Rp 36.000',
    subTotal: 'Gratis Ongkir',
    metode: 'QRIS Instan',
    statusText: 'Diproses Depo',
    statusType: 'diproses',
    isActionAssign: true,
  },
  {
    id: 'o2',
    noOrder: '#ORD-8823',
    waktu: '5 mnt lalu',
    nama: 'Bpk. Hendra Gunawan',
    hp: '0857-1120-9941',
    alamat: 'Jl. Cendrawasih 3 No. 8B',
    qty: '1x',
    produk: 'Le Minerale 15L',
    tipeProduk: 'Galon Baru',
    total: 'Rp 17.000',
    subTotal: 'Lunas',
    metode: 'Transfer BCA',
    statusText: 'Diantar (Mas Doni)',
    statusType: 'diantar',
    isActionAssign: false,
  },
  {
    id: 'o3',
    noOrder: '#ORD-8822',
    waktu: '12 mnt lalu',
    nama: 'Ibu Rina Kartika',
    hp: '0813-8877-4401',
    alamat: 'Apartemen Gandaria Lt. 14',
    qty: '3x',
    produk: 'Aqua 19L Refill',
    tipeProduk: 'Tukar Galon',
    total: 'Rp 54.000',
    subTotal: 'Bayar di Tempat',
    metode: 'COD Tunai',
    statusText: 'Diantar (Pak Budi)',
    statusType: 'diantar',
    isActionAssign: false,
  },
  {
    id: 'o4',
    noOrder: '#ORD-8821',
    waktu: '18 mnt lalu',
    nama: 'Kedai Kopi Senja',
    hp: '0821-4560-1289',
    alamat: 'Ruko Permata Blok B-3',
    qty: '3x',
    produk: 'Aqua 19L Refill',
    tipeProduk: 'Tukar Galon',
    total: 'Rp 58.000',
    subTotal: 'Bayar di Tempat',
    metode: 'COD Tunai',
    statusText: 'Selesai Diterima',
    statusType: 'selesai',
    isActionAssign: false,
  },
  {
    id: 'o5',
    noOrder: '#ORD-8820',
    waktu: '30 mnt lalu',
    nama: 'Klinik Gigi Medika',
    hp: '0811-9233-0012',
    alamat: 'Jl. Radio Dalam No. 44',
    qty: '4x',
    produk: 'Aqua 19L Refill',
    tipeProduk: 'Tukar Galon',
    total: 'Rp 72.000',
    subTotal: 'Lunas',
    metode: 'QRIS Statis',
    statusText: 'Selesai Diterima',
    statusType: 'selesai',
    isActionAssign: false,
  },
];

export default function LaporanKeuanganPage() {
  const [chartPeriod, setChartPeriod] = useState<'hari' | '7hari' | '30hari'>('hari');
  const [orderFilter, setOrderFilter] = useState<'semua' | 'perlu-ditugaskan' | 'diantar'>('semua');

  const filteredOrders = ordersData.filter((item) => {
    if (orderFilter === 'perlu-ditugaskan') return item.statusType === 'diproses';
    if (orderFilter === 'diantar') return item.statusType === 'diantar';
    return true;
  });

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-slate-800 font-sans antialiased">
      {/* ==================== SIDEBAR ==================== */}
      <aside className="w-64 bg-white border-r border-slate-100 flex flex-col justify-between shrink-0 sticky top-0 h-screen p-5 z-20">
        <div>
          <div className="mb-8">
            <h1 className="text-xl font-bold text-blue-600 tracking-tight">GalonKu Admin</h1>
            <p className="text-xs text-slate-400 mt-0.5">Portal Manajemen & Operasional</p>
          </div>

          <nav className="space-y-1">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3 px-3">
              MENU UTAMA
            </p>

            <Link href="/dashboard" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 transition-all font-medium text-sm">
              <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Dashboard
            </Link>

            <Link href="/manajemen-pesanan" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 transition-all font-medium text-sm">
              <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Manajemen Pesanan
            </Link>

            <Link href="/products" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 transition-all font-medium text-sm">
              <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              Produk & Stok
            </Link>

            <Link href="/monitoring" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 transition-all font-medium text-sm">
              <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4zm-12-3h10a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2zm12 0h2a2 2 0 002-2v-3l-2-3h-2v8z" />
              </svg>
              Monitoring Pengantaran
            </Link>

            <Link href="/laporan-keuangan" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20 font-medium text-sm transition-all">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Laporan Keuangan
            </Link>
          </nav>
        </div>

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
              placeholder="Cari no. order, nama pelanggan, galon..."
              className="w-full bg-slate-50 border-none rounded-xl pl-10 pr-4 py-2 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-3 py-1.5 text-xs text-slate-600 font-medium">
              <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Hari ini, 12 Agu 2026</span>
            </div>

            <span className="bg-emerald-50 text-emerald-600 text-xs px-3 py-1.5 rounded-xl font-medium border border-emerald-100 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Depo Buka (Melayani Pengiriman)
            </span>

            <button className="relative p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-100 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v1.341C7.67 7.165 6 9.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9" />
              </svg>
              <span className="w-2 h-2 bg-red-500 rounded-full absolute top-2 right-2 ring-2 ring-white"></span>
            </button>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5">
              <span>+</span> Tambah Pesanan / Restok
            </button>
          </div>
        </header>

        {/* Subheader */}
        <div className="p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-blue-600 font-semibold mb-1">
                <span className="bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">Depo Kebayoran Lama</span>
                <span className="text-slate-400">• ID: DEPO-JKT-04</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Ringkasan Operasional Hari Ini</h2>
              <p className="text-xs text-slate-500 mt-0.5">Pantau status pasokan galon, armada kurir motor, dan kelancaran order real-time.</p>
            </div>

            <div className="flex items-center gap-2">
              <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-3.5 py-2 rounded-xl text-xs font-semibold shadow-sm flex items-center gap-2 transition-all">
                <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filter Tampilan
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-sm flex items-center gap-2 transition-all">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh Data
              </button>
            </div>
          </div>

          {/* 4 Cards Ringkasan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start justify-between">
              <div>
                <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">TOTAL PESANAN HARI INI</p>
                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="text-2xl font-bold text-slate-900">48</span>
                  <span className="text-xs font-medium text-slate-500">Pesanan</span>
                </div>
                <p className="text-[11px] text-emerald-600 font-semibold mt-2 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-lg w-fit">
                  ↑ +12% vs kemarin (42 pesanan)
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                🛍️
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start justify-between">
              <div>
                <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">TOTAL PENDAPATAN</p>
                <p className="text-2xl font-bold text-slate-900 mt-2">Rp 864.000</p>
                <p className="text-[11px] text-emerald-600 font-semibold mt-2 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-lg w-fit">
                  ↑ +8.5% melebihi target harian
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                💵
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start justify-between">
              <div>
                <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">SISA STOK GALON</p>
                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="text-2xl font-bold text-amber-600">12</span>
                  <span className="text-xs font-medium text-slate-500">Galon Terisi</span>
                </div>
                <p className="text-[11px] text-red-600 font-semibold mt-2 flex items-center gap-1 bg-red-50 px-2 py-0.5 rounded-lg w-fit">
                  ⚠️ Perlu Restok Segera (&lt;20% limit)
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                🛢️
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start justify-between">
              <div>
                <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">KURIR BERTUGAS</p>
                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="text-2xl font-bold text-slate-900">5 / 6</span>
                </div>
                <p className="text-[11px] text-blue-600 font-semibold mt-2 flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded-lg w-fit">
                  🛵 18 menit Rata-rata waktu sampai
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                🛵
              </div>
            </div>
          </div>

          {/* GRID UTAMA */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* KIRI: GRAFIK & TABEL (8/12) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Grafik Card Presisi Wireframe */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-800 text-base">Grafik Tren Pesanan & Pendapatan</h3>
                    <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full">Live Sync</span>
                  </div>
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-medium">
                    <button
                      onClick={() => setChartPeriod('hari')}
                      className={`px-3 py-1 rounded-lg transition-all ${chartPeriod === 'hari' ? 'bg-white text-blue-600 shadow-sm font-semibold' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      Hari Ini
                    </button>
                    <button
                      onClick={() => setChartPeriod('7hari')}
                      className={`px-3 py-1 rounded-lg transition-all ${chartPeriod === '7hari' ? 'bg-white text-blue-600 shadow-sm font-semibold' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      7 Hari
                    </button>
                    <button
                      onClick={() => setChartPeriod('30hari')}
                      className={`px-3 py-1 rounded-lg transition-all ${chartPeriod === '30hari' ? 'bg-white text-blue-600 shadow-sm font-semibold' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      30 Hari
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-400">Distribusi muatan pengantaran galon jam sibuk (08:00 - 18:00 WIB)</p>

                {/* SVG Visual Chart Dengan Batang & Kurva Aman */}
                <div className="relative h-48 w-full pt-8">
                  {/* Tooltip Puncak Jam 13:00 Sesuai Wireframe */}
                  <div className="absolute left-[42%] top-0 -translate-x-1/2 bg-slate-900 text-white text-[11px] px-3 py-1.5 rounded-xl shadow-xl z-10 text-center">
                    <p className="font-bold whitespace-nowrap">13:00 • Puncak Pesanan</p>
                    <p className="text-slate-300 text-[10px] whitespace-nowrap">9 Galon / Jam • Rp 162.000</p>
                  </div>

                  <svg className="w-full h-32 overflow-hidden" viewBox="0 0 500 100" preserveAspectRatio="none">
                    {/* Diagram Batang Vertikal di Setiap Jam */}
                    <rect x="16" y="65" width="8" height="35" rx="3" fill="#E2E8F0" />
                    <rect x="62" y="55" width="8" height="45" rx="3" fill="#E2E8F0" />
                    <rect x="108" y="45" width="8" height="55" rx="3" fill="#E2E8F0" />
                    <rect x="154" y="50" width="8" height="50" rx="3" fill="#E2E8F0" />
                    <rect x="200" y="55" width="8" height="45" rx="3" fill="#E2E8F0" />
                    {/* Batang Aktif Jam 13:00 */}
                    <rect x="246" y="25" width="8" height="75" rx="3" fill="#3B82F6" />
                    <rect x="292" y="70" width="8" height="30" rx="3" fill="#CBD5E1" />
                    <rect x="338" y="30" width="8" height="70" rx="3" fill="#3B82F6" opacity="0.6" />
                    <rect x="384" y="60" width="8" height="40" rx="3" fill="#CBD5E1" />
                    <rect x="430" y="50" width="8" height="50" rx="3" fill="#CBD5E1" />
                    <rect x="476" y="65" width="8" height="35" rx="3" fill="#E2E8F0" />

                    {/* Kurva Biru Terjaga (Batas Y Terjaga di 25 - 80) */}
                    <path
                      d="M 20,65 C 40,55 50,50 66,55 C 80,60 100,45 112,45 C 130,45 145,50 158,50 C 175,50 190,55 204,55 C 220,55 235,25 250,25 C 265,25 280,70 296,70 C 315,70 330,30 342,30 C 360,30 375,60 388,60 C 405,60 420,50 434,50 C 450,50 465,65 480,65"
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* Area Gradien Bawah Line */}
                    <path
                      d="M 20,65 C 40,55 50,50 66,55 C 80,60 100,45 112,45 C 130,45 145,50 158,50 C 175,50 190,55 204,55 C 220,55 235,25 250,25 C 265,25 280,70 296,70 C 315,70 330,30 342,30 C 360,30 375,60 388,60 C 405,60 420,50 434,50 C 450,50 465,65 480,65 L 480,100 L 20,100 Z"
                      fill="rgba(59, 130, 246, 0.1)"
                    />

                    {/* Titik Puncak Jam 13:00 */}
                    <circle cx="250" cy="25" r="5" fill="#2563EB" />
                    <circle cx="250" cy="25" r="8" fill="rgba(37, 99, 235, 0.3)" />
                  </svg>

                  <div className="flex justify-between text-[10px] text-slate-400 mt-2 border-t border-slate-100 pt-2 px-1">
                    <span>08:00</span>
                    <span>09:00</span>
                    <span>10:00</span>
                    <span>11:00</span>
                    <span>12:00</span>
                    <span className="font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">13:00</span>
                    <span>14:00</span>
                    <span>15:00</span>
                    <span>16:00</span>
                    <span>17:00</span>
                    <span>18:00</span>
                  </div>
                </div>

                {/* Sub Cards Dengan Indikator Garis Samping Sesuai Wireframe */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-xs">
                  <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100 flex items-center gap-3">
                    <div className="w-1.5 h-8 bg-blue-600 rounded-full shrink-0"></div>
                    <div>
                      <p className="text-[11px] text-slate-400">Aqua 19L Dominan</p>
                      <p className="font-bold text-slate-800 text-xs mt-0.5">58.3% Total Order</p>
                    </div>
                  </div>
                  <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100 flex items-center gap-3">
                    <div className="w-1.5 h-8 bg-cyan-400 rounded-full shrink-0"></div>
                    <div>
                      <p className="text-[11px] text-slate-400">Rute Pengiriman</p>
                      <p className="font-bold text-slate-800 text-xs mt-0.5">Cepat Radius 2.4 KM</p>
                    </div>
                  </div>
                  <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100 flex items-center gap-3">
                    <div className="w-1.5 h-8 bg-emerald-500 rounded-full shrink-0"></div>
                    <div>
                      <p className="text-[11px] text-slate-400">Pembayaran Non-Tunai</p>
                      <p className="font-bold text-slate-800 text-xs mt-0.5">82% Via QRIS & Transfer</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ringkasan Kategori Galon Terjual Hari Ini */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-800 text-base">Ringkasan Kategori Galon Terjual Hari Ini</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Total akumulasi 48 galon terjual dari 4 merek utama</p>
                  </div>
                  <span className="text-xs font-bold text-blue-600">100% Tercapai</span>
                </div>

                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
                  <div className="bg-blue-600 h-full" style={{ width: '58%' }}></div>
                  <div className="bg-sky-400 h-full" style={{ width: '25%' }}></div>
                  <div className="bg-teal-400 h-full" style={{ width: '10%' }}></div>
                  <div className="bg-red-400 h-full" style={{ width: '7%' }}></div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-100/50">
                    <p className="font-bold text-blue-700">● Aqua 19L</p>
                    <p className="text-base font-extrabold text-slate-800 mt-1">28 <span className="text-xs font-normal text-slate-500">galon</span></p>
                    <p className="text-[11px] text-slate-400">Rp 504.000 (58%)</p>
                  </div>
                  <div className="bg-sky-50/60 p-3 rounded-xl border border-sky-100/50">
                    <p className="font-bold text-sky-700">● Le Minerale 15L</p>
                    <p className="text-base font-extrabold text-slate-800 mt-1">12 <span className="text-xs font-normal text-slate-500">galon</span></p>
                    <p className="text-[11px] text-slate-400">Rp 204.000 (25%)</p>
                  </div>
                  <div className="bg-teal-50/60 p-3 rounded-xl border border-teal-100/50">
                    <p className="font-bold text-teal-700">● Cleo 19L</p>
                    <p className="text-base font-extrabold text-slate-800 mt-1">5 <span className="text-xs font-normal text-slate-500">galon</span></p>
                    <p className="text-[11px] text-slate-400">Rp 95.000 (10%)</p>
                  </div>
                  <div className="bg-red-50/60 p-3 rounded-xl border border-red-100/50">
                    <p className="font-bold text-red-700">● Vit 19L</p>
                    <p className="text-base font-extrabold text-slate-800 mt-1">3 <span className="text-xs font-normal text-slate-500">galon</span></p>
                    <p className="text-[11px] text-slate-400">Rp 61.000 (7%)</p>
                  </div>
                </div>
              </div>

              {/* Tabel Pesanan Rapi Sesuai Wireframe */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-800 text-base">Pesanan Terbaru Masuk (Live Orders)</h3>
                      <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Real-Time Queue
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">Daftar transaksi pesanan galon yang perlu diproses dan ditugaskan ke kurir</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-medium">
                      <button
                        onClick={() => setOrderFilter('semua')}
                        className={`px-3 py-1.5 rounded-lg transition-all ${orderFilter === 'semua' ? 'bg-white text-blue-600 shadow-sm font-semibold' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        Semua
                      </button>
                      <button
                        onClick={() => setOrderFilter('perlu-ditugaskan')}
                        className={`px-3 py-1.5 rounded-lg transition-all ${orderFilter === 'perlu-ditugaskan' ? 'bg-white text-blue-600 shadow-sm font-semibold' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        Perlu Ditugaskan (2)
                      </button>
                      <button
                        onClick={() => setOrderFilter('diantar')}
                        className={`px-3 py-1.5 rounded-lg transition-all ${orderFilter === 'diantar' ? 'bg-white text-blue-600 shadow-sm font-semibold' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        Diantar (3)
                      </button>
                    </div>

                    <button className="bg-slate-50 border border-slate-200 text-slate-600 px-3 py-1.5 rounded-xl text-xs font-semibold hover:bg-slate-100 flex items-center gap-1">
                      📥 Ekspor CSV
                    </button>
                  </div>
                </div>

                {/* Table Rapi Tanpa Text Wrapping Berantakan */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                        <th className="py-3 px-3 min-w-[140px]">NO. ORDER & TEPAT WAKTU</th>
                        <th className="py-3 px-3 min-w-[170px]">PELANGGAN</th>
                        <th className="py-3 px-3 min-w-[150px]">PRODUK GALON</th>
                        <th className="py-3 px-3 min-w-[120px]">TOTAL BAYAR</th>
                        <th className="py-3 px-3 min-w-[120px]">METODE BAYAR</th>
                        <th className="py-3 px-3 min-w-[160px]">STATUS PENGANTARAN</th>
                        <th className="py-3 px-3 text-right min-w-[130px]">AKSI CEPAT</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-6 text-center text-slate-400 text-xs">
                            Tidak ada pesanan untuk kategori ini.
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map((order) => (
                          <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3.5 px-3">
                              <p className="font-bold text-blue-600">{order.noOrder}</p>
                              <p className="text-[10px] text-slate-400 mt-0.5">{order.waktu}</p>
                            </td>
                            <td className="py-3.5 px-3">
                              <p className="font-bold text-slate-800">{order.nama}</p>
                              <p className="text-[10px] text-slate-400">{order.hp}</p>
                              <p className="text-[10px] text-slate-400 truncate max-w-[150px]">{order.alamat}</p>
                            </td>
                            <td className="py-3.5 px-3">
                              <div className="flex items-center gap-1.5">
                                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0">
                                  {order.qty}
                                </span>
                                <span className="font-bold text-slate-800">{order.produk}</span>
                              </div>
                              <p className="text-[10px] text-slate-400 mt-0.5">{order.tipeProduk}</p>
                            </td>
                            <td className="py-3.5 px-3">
                              <p className="font-bold text-slate-800">{order.total}</p>
                              <p className="text-[10px] text-emerald-600 font-medium">{order.subTotal}</p>
                            </td>
                            <td className="py-3.5 px-3">
                              <span className="inline-block whitespace-nowrap bg-slate-100 border border-slate-200 text-slate-700 px-2.5 py-1 rounded-lg text-[11px] font-bold">
                                {order.metode}
                              </span>
                            </td>
                            <td className="py-3.5 px-3">
                              {order.statusType === 'diproses' && (
                                <span className="inline-flex items-center gap-1.5 whitespace-nowrap bg-amber-100/80 text-amber-800 px-3 py-1 rounded-full text-[11px] font-bold">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                  {order.statusText}
                                </span>
                              )}
                              {order.statusType === 'diantar' && (
                                <span className="inline-flex items-center gap-1.5 whitespace-nowrap bg-sky-100/80 text-sky-800 px-3 py-1 rounded-full text-[11px] font-bold">
                                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                                  {order.statusText}
                                </span>
                              )}
                              {order.statusType === 'selesai' && (
                                <span className="inline-flex items-center gap-1.5 whitespace-nowrap bg-emerald-100/80 text-emerald-800 px-3 py-1 rounded-full text-[11px] font-bold">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                  {order.statusText}
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-3 text-right">
                              <div className="flex items-center justify-end gap-2">
                                {order.isActionAssign ? (
                                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-xl text-[11px] font-semibold shadow-sm transition-all whitespace-nowrap">
                                    Tugaskan Kurir
                                  </button>
                                ) : (
                                  <button className="bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all whitespace-nowrap">
                                    Detail
                                  </button>
                                )}
                                <button className="text-slate-400 hover:text-slate-600 p-1">
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between pt-3 border-t border-slate-100 gap-3 text-xs text-slate-500">
                  <p>Menampilkan <span className="font-bold text-slate-800">{filteredOrders.length}</span> dari <span className="font-bold text-slate-800">48</span> pesanan hari ini</p>

                  <div className="flex items-center gap-1">
                    <button className="px-3 py-1 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50 text-[11px]">
                      Sebelumnya
                    </button>
                    <button className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                      1
                    </button>
                    <button className="w-7 h-7 rounded-lg text-slate-600 hover:bg-slate-100 text-xs flex items-center justify-center">
                      2
                    </button>
                    <button className="w-7 h-7 rounded-lg text-slate-600 hover:bg-slate-100 text-xs flex items-center justify-center">
                      3
                    </button>
                    <button className="px-3 py-1 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-[11px]">
                      Selanjutnya
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* KANAN: STOK GALON & STATUS KURIR (4/12) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Stok Galon Menipis */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">📦</span>
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">Stok Galon Menipis</h3>
                      <p className="text-[10px] text-slate-400">Depo Pusat Kebayoran</p>
                    </div>
                  </div>
                  <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full">4 Varian</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
                    <div className="flex items-center gap-3">
                      <img src="/products/aqua-19l.png" alt="Aqua 19L" className="w-10 h-10 object-contain rounded-lg bg-white p-1 border border-slate-100" />
                      <div>
                        <h4 className="font-bold text-slate-800 text-xs">Aqua 19L</h4>
                        <p className="text-[10px] text-slate-400">Air Mineral Alami</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md">Sisa 5 galon</span>
                      <p className="text-[10px] text-slate-400 mt-0.5">Status Kritis</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
                    <div className="flex items-center gap-3">
                      <img src="/products/le-minerale-15l.png" alt="Le Minerale 15L" className="w-10 h-10 object-contain rounded-lg bg-white p-1 border border-slate-100" />
                      <div>
                        <h4 className="font-bold text-slate-800 text-xs">Le Minerale 15L</h4>
                        <p className="text-[10px] text-slate-400">Galon Sekali Pakai</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md">Sisa 4 galon</span>
                      <p className="text-[10px] text-slate-400 mt-0.5">Mendekati Limit</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
                    <div className="flex items-center gap-3">
                      <img src="/products/cleo-19l.png" alt="Cleo 19L" className="w-10 h-10 object-contain rounded-lg bg-white p-1 border border-slate-100" />
                      <div>
                        <h4 className="font-bold text-slate-800 text-xs">Cleo 19L</h4>
                        <p className="text-[10px] text-slate-400">Murni Demineralisasi</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md">Sisa 2 galon</span>
                      <p className="text-[10px] text-slate-400 mt-0.5">Sangat Kritis</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
                    <div className="flex items-center gap-3">
                      <img src="/products/vit-19l.png" alt="Vit 19L" className="w-10 h-10 object-contain rounded-lg bg-white p-1 border border-slate-100" />
                      <div>
                        <h4 className="font-bold text-slate-800 text-xs">Vit 19L</h4>
                        <p className="text-[10px] text-slate-400">Air Minum Higienis</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md">Sisa 1 galon</span>
                      <p className="text-[10px] text-slate-400 mt-0.5">Segera Habis</p>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-1">
                  <span>+</span> Order Restok Galon ke Pabrik
                </button>
              </div>

              {/* Status Kurir GalonKu */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">Status Kurir GalonKu</h3>
                    <p className="text-[10px] text-slate-400">Armada Motor Depo Kebayoran</p>
                  </div>
                  <span className="text-xs text-blue-600 font-semibold">Kelola (5)</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                        PB
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-xs">Pak Budi Santoso</h4>
                        <p className="text-[10px] text-slate-400">#ORD-8821 • Jl. Mawar No. 12</p>
                      </div>
                    </div>
                    <span className="bg-sky-50 text-sky-600 text-[10px] font-bold px-2 py-0.5 rounded-full">Di Jalan</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-xs">
                        MD
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-xs">Mas Doni Wijaya</h4>
                        <p className="text-[10px] text-slate-400">#ORD-8822 • Gandaria Heights</p>
                      </div>
                    </div>
                    <span className="bg-sky-50 text-sky-600 text-[10px] font-bold px-2 py-0.5 rounded-full">Di Jalan</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs">
                        AG
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-xs">Pak Agus Prasetyo</h4>
                        <p className="text-[10px] text-slate-400">Siap antar 4 galon berikutnya</p>
                      </div>
                    </div>
                    <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded-full">Standby Depo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}