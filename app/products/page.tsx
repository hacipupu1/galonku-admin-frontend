'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Data Inventaris Produk & Varian Sesuai Wireframe
const initialProducts = [
  {
    id: 'p1',
    nama: 'Aqua 19 Liter Refill',
    deskripsi: 'Air Mineral Pegunungan Alami',
    sku: 'GLN-AQUA-19L',
    tipe: 'Galon Tukar Refill',
    hargaJual: 18000,
    hargaModal: 14200,
    stokTerisi: 35,
    stokStatusText: 'Aman (70%)',
    stokColorPct: '70%',
    stokBarClass: 'bg-emerald-500',
    botolKosong: '18 Botol',
    status: 'Tersedia',
    typeStatus: 'tersedia',
    image: '/aqua.png',
  },
  {
    id: 'p2',
    nama: 'Le Minerale 15 Liter',
    deskripsi: 'Galon Sekali Pakai Tanpa Tukar',
    sku: 'GLN-LMN-15L',
    tipe: 'Bebas BPA / Sekali Pakai',
    hargaJual: 17000,
    hargaModal: 13800,
    stokTerisi: 25,
    stokStatusText: 'Optimal (50%)',
    stokColorPct: '50%',
    stokBarClass: 'bg-teal-500',
    botolKosong: '- (Non-Refill)',
    status: 'Tersedia',
    typeStatus: 'tersedia',
    image: '/leminerale.png',
  },
  {
    id: 'p3',
    nama: 'Cleo 19 Liter Refill',
    deskripsi: 'Pure Water Demineral 0 ppm',
    sku: 'GLN-CLE-19L',
    tipe: 'Galon Tukar Refill',
    hargaJual: 16500,
    hargaModal: 13000,
    stokTerisi: 15,
    stokStatusText: 'Menipis (30%)',
    stokColorPct: '30%',
    stokBarClass: 'bg-red-500',
    botolKosong: '14 Botol',
    status: 'Stok Kritis',
    typeStatus: 'kritis',
    image: '/cleo.png',
  },
  {
    id: 'p4',
    nama: 'Vit 19 Liter Refill',
    deskripsi: 'Air Mineral Higienis Terjangkau',
    sku: 'GLN-VIT-19L',
    tipe: 'Galon Tukar Refill',
    hargaJual: 15000,
    hargaModal: 11500,
    stokTerisi: 10,
    stokStatusText: 'Sisa 20%',
    stokColorPct: '20%',
    stokBarClass: 'bg-red-500',
    botolKosong: '10 Botol',
    status: 'Stok Kritis',
    typeStatus: 'kritis',
    image: '/aqua.png', // Fallback galon
  },
];

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState<'semua' | 'refill' | 'sekalipakai' | 'kritis'>('semua');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter Data Produk Sesuai Tab & Pencarian
  const filteredProducts = initialProducts.filter((p) => {
    const matchesSearch =
      p.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.deskripsi.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === 'refill') return p.tipe.includes('Refill');
    if (activeTab === 'sekalipakai') return p.tipe.includes('Sekali Pakai');
    if (activeTab === 'kritis') return p.typeStatus === 'kritis';
    return true; // 'semua'
  });

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-slate-800 font-sans antialiased">
      

      {/* ==================== MAIN CONTENT ==================== */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
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

        {/* Content Body */}
        <div className="p-8 space-y-6">
          {/* Header Title */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold text-blue-600 uppercase tracking-wider mb-1">
                LOGISTIK & GUDANG DEPO / <span className="text-slate-400">PRODUK & STOK</span>
              </p>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Produk & Stok Galon</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Monitoring ketersediaan pasokan galon, inventaris botol kosong, dan penyesuaian harga jual.
              </p>
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all self-start md:self-auto">
              <span>+</span> Tambah Produk Baru
            </button>
          </div>

          {/* ==================== 4 STATS CARDS ROW ==================== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Total Galon Terisi */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">TOTAL GALON TERISI</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-extrabold text-slate-900">85</span>
                  <span className="text-xs font-medium text-slate-500">Galon</span>
                </div>
                <div className="mt-2 text-[10px] text-slate-400 space-y-0.5">
                  <p><span className="font-semibold text-slate-600">Aqua: 35</span> • LeMin: 25</p>
                  <p><span className="font-semibold text-slate-600">Cleo: 15</span> • Vit: 10</p>
                </div>
              </div>
              <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                💧
              </div>
            </div>

            {/* Card 2: Stok Galon Kosong */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">STOK GALON KOSONG</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-extrabold text-slate-900">42</span>
                  <span className="text-xs font-medium text-slate-500">Galon Kosong</span>
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-[10px]">
                  <span className="text-slate-400">Pool siap tukar pabrik</span>
                  <span className="px-2 py-0.5 rounded-md bg-sky-50 text-sky-600 font-semibold border border-sky-100">
                    Tersortir Baik
                  </span>
                </div>
              </div>
              <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                🔄
              </div>
            </div>

            {/* Card 3: Stok Kritis / Menipis */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider">STOK KRITIS / MENIPIS</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-extrabold text-red-600">2</span>
                  <span className="text-xs font-medium text-slate-500">Varian</span>
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-[10px]">
                  <span className="text-red-600 font-semibold">VIT 19L & Cleo 19L</span>
                  <span className="px-2 py-0.5 rounded-md bg-red-50 text-red-600 font-semibold border border-red-100">
                    Perlu PO
                  </span>
                </div>
              </div>
              <div className="w-9 h-9 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                ⚠️
              </div>
            </div>

            {/* Card 4: Total Nilai Inventaris */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">TOTAL NILAI INVENTARIS</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-xl font-extrabold text-slate-900">Rp 1.620.000</span>
                </div>
                <div className="mt-3 flex items-center gap-2 text-[10px]">
                  <span className="text-slate-400">Modal: Rp 1.350.000</span>
                  <span className="text-emerald-600 font-bold">+22.3% Margin</span>
                </div>
              </div>
              <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                💵
              </div>
            </div>
          </div>

          {/* ==================== FILTER & SEARCH BAR ==================== */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Search Box */}
            <div className="relative w-full sm:w-80">
              <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Cari merk galon, ukuran, SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200/80 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs text-slate-400 font-medium mr-1">Filter Kategori:</span>
              <button
                onClick={() => setActiveTab('semua')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'semua'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white border border-slate-100 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Semua Produk (4)
              </button>
              <button
                onClick={() => setActiveTab('refill')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'refill'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white border border-slate-100 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Refill 19L (3)
              </button>
              <button
                onClick={() => setActiveTab('sekalipakai')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'sekalipakai'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white border border-slate-100 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Sekali Pakai (1)
              </button>
              <button
                onClick={() => setActiveTab('kritis')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'kritis'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white border border-slate-100 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Perlu Restok (2)
              </button>
            </div>
          </div>

          {/* ==================== TABEL INVENTARIS DEPO AKTIF ==================== */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <h3 className="font-bold text-slate-800 text-base">Daftar Inventaris Depo Aktif</h3>
                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 text-[10px] font-semibold">
                  Live Sync Terkini
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Update otomatis setiap pesanan/kirim diselesaikan</p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-indigo-50/50 text-indigo-900 font-bold uppercase tracking-wider text-[10px] rounded-xl">
                    <th className="py-3 px-3 rounded-l-xl">PRODUK & VARIAN</th>
                    <th className="py-3 px-3">SKU / TIPE</th>
                    <th className="py-3 px-3">HARGA JUAL</th>
                    <th className="py-3 px-3">HARGA MODAL</th>
                    <th className="py-3 px-3">STOK TERISI (DEPO)</th>
                    <th className="py-3 px-3">BOTOL KOSONG</th>
                    <th className="py-3 px-3">STATUS</th>
                    <th className="py-3 px-3 text-center rounded-r-xl">AKSI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-slate-400 text-xs">
                        Tidak ada varian produk yang cocok dengan pencarian ini.
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                        {/* 1. PRODUK & VARIAN */}
                        <td className="py-4 px-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 p-1 flex items-center justify-center shrink-0">
                              <img
                                src={p.image}
                                alt={p.nama}
                                className="max-h-full max-w-full object-contain"
                                onError={(e) => {
                                  // Fallback jika file gambar tidak ditemukan
                                  (e.target as HTMLElement).style.display = 'none';
                                }}
                              />
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 text-sm leading-tight">{p.nama}</p>
                              <p className="text-[11px] text-slate-400 mt-0.5">{p.deskripsi}</p>
                            </div>
                          </div>
                        </td>

                        {/* 2. SKU / TIPE */}
                        <td className="py-4 px-3">
                          <p className="font-bold text-slate-800 text-xs">{p.sku}</p>
                          <p className="text-[10px] text-blue-600 font-medium">{p.tipe}</p>
                        </td>

                        {/* 3. HARGA JUAL */}
                        <td className="py-4 px-3">
                          <div className="flex items-center gap-1 font-extrabold text-slate-900 text-sm">
                            <span>Rp {p.hargaJual.toLocaleString('id-ID')}</span>
                            <button className="text-slate-400 hover:text-blue-600 transition-colors p-0.5">
                              ✏️
                            </button>
                          </div>
                        </td>

                        {/* 4. HARGA MODAL */}
                        <td className="py-4 px-3 text-slate-500 font-medium">
                          Rp {p.hargaModal.toLocaleString('id-ID')}
                        </td>

                        {/* 5. STOK TERISI (DEPO) */}
                        <td className="py-4 px-3">
                          <div className="w-32 space-y-1">
                            <div className="flex justify-between items-center text-[11px] font-semibold">
                              <span className="text-slate-900 font-bold">{p.stokTerisi} Unit</span>
                              <span className="text-[10px] text-slate-500 font-normal">{p.stokStatusText}</span>
                            </div>
                            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                              <div
                                className={`${p.stokBarClass} h-full rounded-full`}
                                style={{ width: p.stokColorPct }}
                              ></div>
                            </div>
                          </div>
                        </td>

                        {/* 6. BOTOL KOSONG */}
                        <td className="py-4 px-3 font-semibold text-slate-700">
                          {p.botolKosong}
                        </td>

                        {/* 7. STATUS */}
                        <td className="py-4 px-3">
                          {p.status === 'Tersedia' ? (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 inline-flex items-center gap-1 border border-emerald-100">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Tersedia
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-50 text-red-600 inline-flex items-center gap-1 border border-red-100">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span> Stok Kritis
                            </span>
                          )}
                        </td>

                        {/* 8. AKSI */}
                        <td className="py-4 px-3 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-3 py-1.5 rounded-lg text-xs transition-colors">
                              Update
                            </button>
                            <button className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors">
                              ⚙️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500 gap-2">
              <p>Menampilkan {filteredProducts.length} dari {initialProducts.length} varian produk galon depo</p>
              <p className="font-bold text-slate-800">
                Estimasi Omset Hari Ini: <span className="text-blue-600 text-sm font-extrabold">Rp 1.442.500</span>
              </p>
            </div>
          </div>

          {/* ==================== BOTTOM 2 COLUMNS ==================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT: RIWAYAT & JADWAL KIRIM RESTOK PABRIK (7/12) */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">🕒</span>
                  <h3 className="font-bold text-slate-800 text-sm">Riwayat & Jadwal Kirim Restok Pabrik</h3>
                </div>
                <button className="text-xs font-semibold text-blue-600 hover:underline">
                  Lihat Semua PO
                </button>
              </div>

              <div className="space-y-3">
                {/* Item 1 */}
                <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center font-bold text-sm shrink-0">
                      🚚
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900">Pabrik PT Danone Aqua Pulogadung</h4>
                        <span className="px-2 py-0.5 rounded-md bg-sky-100 text-sky-700 font-semibold text-[10px]">
                          Dalam Pengiriman
                        </span>
                      </div>
                      <p className="text-slate-500 text-[11px] mt-0.5">
                        Truk Hino B-9142-SDA • Muatan: 50 Galon Aqua 19L • Tukar 50 Galon Kosong
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-slate-800">ETA: Hari ini, 15:30 WIB</p>
                    <p className="text-[10px] text-slate-400">Sopir: Pak Winarno (+62 813-8872)</p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm shrink-0">
                      📦
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900">Pabrik Sariguna Primatirta (Cleo)</h4>
                        <span className="px-2 py-0.5 rounded-md bg-red-100 text-red-700 font-semibold text-[10px]">
                          PO Kritis #PO-882
                        </span>
                      </div>
                      <p className="text-slate-500 text-[11px] mt-0.5">
                        Permintaan Restok: 30 Galon Cleo 19L • Depo butuh percepatan
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-slate-800">Jadwal: Besok, 09:00 WIB</p>
                    <button className="text-[10px] font-bold text-blue-600 hover:underline">
                      Follow-up Sales
                    </button>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm shrink-0">
                      ✔
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900">Distributor Mayora Le Minerale</h4>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 font-semibold text-[10px]">
                          Selesai Diterima
                        </span>
                      </div>
                      <p className="text-slate-500 text-[11px] mt-0.5">
                        Masuk: 40 Galon Baru 15L • Diterima Staf Depo: Riko
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-slate-800">Kemarin, 14:10 WIB</p>
                    <p className="text-[10px] text-slate-400">Faktur: #INV-LMN-9921</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 text-[11px] text-slate-400 border-t border-slate-100">
                <span>Supplier resmi Danone, Mayora, Tirta Sariguna terverifikasi.</span>
                <button className="font-bold text-blue-600 hover:underline">
                  Buat Surat Jalan Restok →
                </button>
              </div>
            </div>

            {/* RIGHT: STATUS GALON KOSONG (5/12) */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-800 text-sm">Status Galon Kosong</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-xs font-semibold text-slate-500">Total Botol di Depo:</span>
                    <span className="text-lg font-extrabold text-slate-900">42 Botol</span>
                  </div>

                  {/* Split Progress Bar */}
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex">
                    <div className="bg-emerald-500 h-full w-[80%]"></div>
                    <div className="bg-red-500 h-full w-[20%]"></div>
                  </div>

                  <div className="flex justify-between text-[10px] font-semibold mt-1">
                    <span className="text-emerald-600">● 34 Siap Tukar</span>
                    <span className="text-red-600">● 8 Afkir / Rusak</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl space-y-2 text-xs">
                  <div className="flex justify-between items-center border-b border-slate-200/60 pb-1.5">
                    <span className="text-slate-600 font-medium">Aqua 19L Kosong</span>
                    <span className="font-bold text-slate-900">18 Galon</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200/60 pb-1.5">
                    <span className="text-slate-600 font-medium">Cleo 19L Kosong</span>
                    <span className="font-bold text-slate-900">14 Galon</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 font-medium">VIT 19L Kosong</span>
                    <span className="font-bold text-slate-900">10 Galon</span>
                  </div>
                </div>

                {/* Klaim Garansi Box */}
                <div className="bg-red-50/80 border border-red-100 p-3 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-red-700">Klaim Garansi Retur Bocor</p>
                    <p className="text-[10px] text-red-500">3 Galon Diajukan</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-red-100 text-red-700 font-bold text-[10px]">
                    3 Galon Diajukan
                  </span>
                </div>

                <button className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5">
                  🖨️ Cetak Manifest Galon Tukar
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}