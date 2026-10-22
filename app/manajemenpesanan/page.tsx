'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Data Pesanan Sesuai Wireframe
const pesananData = [
  {
    id: '1',
    noOrder: '#ORD-8824',
    jam: 'Hari ini, 10:15 WIB',
    tipeRefill: 'Refill Instan (30m)',
    isInstant: true,
    pelanggan: 'Fia Salsa',
    hp: '0812-9844-3211',
    alamat: 'Kost Sakura No. 4, Lt. 2',
    qty: '2x',
    produk: 'Aqua 19L Refill',
    catatan: 'Tukar Galon Kosong',
    total: 'Rp 36.000',
    metode: 'QRIS • Lunas',
    statusTag: 'Menunggu Konfirmasi',
    statusType: 'konfirmasi',
    kurirText: 'Tugaskan Kurir',
    isKurirButton: true,
  },
  {
    id: '2',
    noOrder: '#ORD-8823',
    jam: 'Hari ini, 10:02 WIB',
    tipeRefill: 'Refill Terjadwal',
    isInstant: false,
    pelanggan: 'Agus Setiawan',
    hp: '0857-1120-9943',
    alamat: 'Jl. Ciputat Raya No. 18B',
    qty: '3x',
    produk: 'Le Minerale 19L',
    catatan: '1 Galon Baru + 2 Refill',
    total: 'Rp 89.000',
    metode: 'BCA TF • Lunas',
    statusTag: 'Diproses Depo',
    statusType: 'diproses',
    kurirNama: 'Pak Budi K.',
    kurirSub: 'Motor 01 (Siap Angkut)',
    isKurirButton: false,
  },
  {
    id: '3',
    noOrder: '#ORD-8822',
    jam: 'Hari ini, 09:48 WIB',
    tipeRefill: 'Refill Instan',
    isInstant: true,
    pelanggan: 'Dewi Anggraini',
    hp: '0813-8871-0021',
    alamat: 'Paku Terrace Twr S-1208',
    qty: '1x',
    produk: 'Aqua 19L Refill',
    catatan: 'Tukar Galon Kosong',
    total: 'Rp 18.000',
    metode: 'COD (Tunai)',
    statusTag: 'Diantar Kurir',
    statusType: 'diantar',
    kurirNama: 'Rian Irawan',
    kurirSub: 'ETA: 8 mnt lagi',
    isKurirButton: false,
  },
  {
    id: '4',
    noOrder: '#ORD-8821',
    jam: 'Hari ini, 09:20 WIB',
    tipeRefill: 'Refill Reguler',
    isInstant: false,
    pelanggan: 'Warung Kopi Mas Jon',
    hp: '0878-5544-2201',
    alamat: 'Jl. Teuku Nyak Arief No. 51',
    qty: '5x',
    produk: 'Aqua 19L Refill',
    catatan: 'Langganan Bisnis UMKM',
    total: 'Rp 90.000',
    metode: 'QRIS • Lunas',
    statusTag: 'Selesai Diterima',
    statusType: 'selesai',
    kurirNama: 'Pak Budi K.',
    kurirSub: 'Diterima 09:42 WIB',
    isKurirButton: false,
  },
  {
    id: '5',
    noOrder: '#ORD-8820',
    jam: 'Hari ini, 08:50 WIB',
    tipeRefill: 'Refill Reguler',
    isInstant: false,
    pelanggan: 'Hendro Pratama',
    hp: '0812-7788-3312',
    alamat: 'Komplek Lemigas Blok B4/12',
    qty: '2x',
    produk: 'Cleo 19L Eco Refill',
    catatan: 'Bebas BPA Galon',
    total: 'Rp 34.000',
    metode: 'GoPay • Lunas',
    statusTag: 'Selesai Diterima',
    statusType: 'selesai',
    kurirNama: 'Deni Setiawan',
    kurirSub: 'Diterima 09:18 WIB',
    isKurirButton: false,
  },
  {
    id: '6',
    noOrder: '#ORD-8819',
    jam: 'Hari ini, 08:35 WIB',
    tipeRefill: 'Refill Terjadwal (Siang)',
    isInstant: false,
    pelanggan: 'Siti Nurhaliza',
    hp: '0896-1234-9001',
    alamat: 'Jl. Kebayoran Lama No. 44',
    qty: '1x',
    produk: 'Aqua 19L + Pompa Elektrik',
    catatan: 'Beli Unit Pompa Baru',
    total: 'Rp 68.000',
    metode: 'Menunggu Verif',
    statusTag: 'Diproses Depo',
    statusType: 'diproses',
    kurirText: 'Jadwalkan',
    isKurirButton: true,
  },
  {
    id: '7',
    noOrder: '#ORD-8818',
    jam: 'Hari ini, 08:10 WIB',
    tipeRefill: 'Dibatalkan Pelanggan',
    isCancel: true,
    pelanggan: 'Bambang Tri',
    hp: '0811-9922-3112',
    alamat: 'Jl. Praja Raya No. 10',
    qty: '2x',
    produk: 'Vit 19L Refill',
    catatan: 'Alasan: Salah input alamat',
    total: 'Rp 30.000',
    metode: 'Refund Dana Selesai',
    statusTag: 'Dibatalkan',
    statusType: 'dibatalkan',
    kurirText: '-',
    isKurirButton: false,
  },
];

export default function ManajemenPesananPage() {
  const [activeTab, setActiveTab] = useState<'semua' | 'konfirmasi' | 'diproses' | 'diantar' | 'selesai' | 'dibatalkan'>('semua');

  const filteredData = pesananData.filter((item) => {
    if (activeTab === 'konfirmasi') return item.statusType === 'konfirmasi';
    if (activeTab === 'diproses') return item.statusType === 'diproses';
    if (activeTab === 'diantar') return item.statusType === 'diantar';
    if (activeTab === 'selesai') return item.statusType === 'selesai';
    if (activeTab === 'dibatalkan') return item.statusType === 'dibatalkan';
    return true;
  });

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-slate-800 font-sans antialiased">
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

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5">
              <span>+</span> Buat Pesanan
            </button>
          </div>
        </header>

        {/* Subheader & Content Body */}
        <div className="p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-blue-600 font-semibold text-[11px] uppercase tracking-wider mb-1">
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Manajemen Pesanan</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Kelola, verifikasi, dan pantau status transaksi pemesanan galon pelanggan secara real-time.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all">
                📥 Ekspor (CSV/Excel)
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5">
                <span>+</span> Buat Pesanan Manual
              </button>
            </div>
          </div>

          {/* 4 Cards Stat Ringkasan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">TOTAL PESANAN HARI INI</p>
                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="text-2xl font-bold text-slate-900">48</span>
                </div>
                <p className="text-[11px] text-emerald-600 font-semibold mt-2 flex items-center gap-1">
                  📈 +14% dr kemarin
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                🛒
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">PERLU KONFIRMASI</p>
                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="text-2xl font-bold text-slate-900">4</span>
                </div>
                <p className="text-[11px] text-red-500 font-semibold mt-2 flex items-center gap-1">
                  ⏱ Respon &lt; 5 mnt
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                🚨
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">SEDANG DIANTAR</p>
                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="text-2xl font-bold text-slate-900">5</span>
                </div>
                <p className="text-[11px] text-sky-600 font-semibold mt-2 flex items-center gap-1">
                  🛵 4 Armada aktif
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                🚚
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">TOTAL OMZET TERCATAT</p>
                <p className="text-2xl font-bold text-slate-900 mt-2">Rp 864.000</p>
                <p className="text-[11px] text-emerald-600 font-semibold mt-2 flex items-center gap-1">
                  ✔ 92% Lunas
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                💵
              </div>
            </div>
          </div>

          {/* TAB FILTER STATUS PESANAN */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveTab('semua')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'semua' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'bg-white border border-slate-100 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Semua <span className="ml-1 bg-blue-500 text-white px-1.5 py-0.5 rounded-full text-[10px]">48</span>
            </button>
            <button
              onClick={() => setActiveTab('konfirmasi')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'konfirmasi' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'bg-white border border-slate-100 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Menunggu Konfirmasi <span className="ml-1 bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full text-[10px]">1</span>
            </button>
            <button
              onClick={() => setActiveTab('diproses')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'diproses' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'bg-white border border-slate-100 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Diproses Depo <span className="ml-1 bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded-full text-[10px]">2</span>
            </button>
            <button
              onClick={() => setActiveTab('diantar')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'diantar' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'bg-white border border-slate-100 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Dalam Pengantaran <span className="ml-1 bg-sky-100 text-sky-700 px-1.5 py-0.5 rounded-full text-[10px]">1</span>
            </button>
            <button
              onClick={() => setActiveTab('selesai')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'selesai' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'bg-white border border-slate-100 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Selesai <span className="ml-1 bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full text-[10px]">45</span>
            </button>
            <button
              onClick={() => setActiveTab('dibatalkan')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'dibatalkan' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'bg-white border border-slate-100 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Dibatalkan <span className="ml-1 bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded-full text-[10px]">1</span>
            </button>
          </div>

          {/* SECONDARY FILTER BAR */}
          <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative flex-1 w-full">
              <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Cari berdasarkan No. Order (#ORD-...), nama..."
                className="w-full bg-slate-50 border border-slate-200/60 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select className="bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none">
                <option>Hari Ini (24 Mei)</option>
                <option>7 Hari Terakhir</option>
                <option>Bulan Ini</option>
              </select>

              <select className="bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none">
                <option>Semua Galon</option>
                <option>Aqua 19L</option>
                <option>Le Minerale 19L</option>
                <option>Cleo 19L</option>
              </select>

              <select className="bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none">
                <option>Pembayaran</option>
                <option>QRIS</option>
                <option>Transfer Bank</option>
                <option>COD (Tunai)</option>
              </select>

              <button className="p-2 bg-slate-50 border border-slate-200/80 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors">
                ⚙️
              </button>
            </div>
          </div>

          {/* TABEL MANAJEMEN PESANAN */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-3 min-w-[150px]">NO. ORDER & WAKTU</th>
                    <th className="py-3 px-3 min-w-[180px]">PELANGGAN & LOKASI</th>
                    <th className="py-3 px-3 min-w-[180px]">ITEM PESANAN</th>
                    <th className="py-3 px-3 min-w-[130px]">TAGIHAN & BAYAR</th>
                    <th className="py-3 px-3 min-w-[150px]">STATUS</th>
                    <th className="py-3 px-3 min-w-[160px]">KURIR PENGANTAR</th>
                    <th className="py-3 px-3 text-right min-w-[110px]">AKSI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400 text-xs">
                        Tidak ada pesanan untuk kategori ini.
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                        {/* 1. NO ORDER */}
                        <td className="py-4 px-3">
                          <p className="font-bold text-blue-600">{item.noOrder}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{item.jam}</p>
                          {item.isInstant ? (
                            <span className="inline-block mt-1 bg-red-50 text-red-600 text-[9px] font-bold px-1.5 py-0.5 rounded">
                              ⚡ {item.tipeRefill}
                            </span>
                          ) : item.isCancel ? (
                            <span className="inline-block mt-1 bg-red-50 text-red-600 text-[9px] font-bold px-1.5 py-0.5 rounded">
                              {item.tipeRefill}
                            </span>
                          ) : (
                            <span className="inline-block mt-1 bg-slate-100 text-slate-600 text-[9px] font-bold px-1.5 py-0.5 rounded">
                              {item.tipeRefill}
                            </span>
                          )}
                        </td>

                        {/* 2. PELANGGAN */}
                        <td className="py-4 px-3">
                          <p className="font-bold text-slate-800">{item.pelanggan}</p>
                          <p className="text-[10px] text-slate-400">{item.hp}</p>
                          <p className="text-[10px] text-slate-400 truncate max-w-[160px] mt-0.5">
                            📍 {item.alamat}
                          </p>
                        </td>

                        {/* 3. ITEM PESANAN */}
                        <td className="py-4 px-3">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 font-bold flex items-center justify-center shrink-0">
                              🛢️
                            </div>
                            <div>
                              <p className="font-bold text-slate-800">{item.qty} {item.produk}</p>
                              <p className="text-[10px] text-slate-400">{item.catatan}</p>
                            </div>
                          </div>
                        </td>

                        {/* 4. TAGIHAN */}
                        <td className="py-4 px-3">
                          <p className="font-bold text-slate-800">{item.total}</p>
                          <span className="inline-block mt-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                            {item.metode}
                          </span>
                        </td>

                        {/* 5. STATUS */}
                        <td className="py-4 px-3">
                          {item.statusType === 'konfirmasi' && (
                            <span className="bg-red-100 text-red-700 px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1">
                              ● {item.statusTag}
                            </span>
                          )}
                          {item.statusType === 'diproses' && (
                            <span className="bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1">
                              ● {item.statusTag}
                            </span>
                          )}
                          {item.statusType === 'diantar' && (
                            <span className="bg-sky-100 text-sky-700 px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1">
                              ● {item.statusTag}
                            </span>
                          )}
                          {item.statusType === 'selesai' && (
                            <span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1">
                              ● {item.statusTag}
                            </span>
                          )}
                          {item.statusType === 'dibatalkan' && (
                            <span className="bg-red-50 text-red-600 px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1">
                              ● {item.statusTag}
                            </span>
                          )}
                        </td>

                        {/* 6. KURIR PENGANTAR */}
                        <td className="py-4 px-3">
                          {item.isKurirButton ? (
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-xl text-[11px] font-semibold shadow-sm transition-all">
                              👤 {item.kurirText}
                            </button>
                          ) : item.kurirNama ? (
                            <div>
                              <p className="font-bold text-slate-800">{item.kurirNama}</p>
                              <p className="text-[10px] text-slate-400">{item.kurirSub}</p>
                            </div>
                          ) : (
                            <span className="text-slate-400">-</span>
                          )}
                        </td>

                        {/* 7. AKSI */}
                        <td className="py-4 px-3 text-right">
                          <div className="flex items-center justify-end gap-1.5 text-slate-400">
                            <button className="p-1 hover:text-blue-600 transition-colors">✔</button>
                            <button className="p-1 hover:text-blue-600 transition-colors">👁</button>
                            <button className="p-1 hover:text-blue-600 transition-colors">⋮</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* FOOTER PAGINASI */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-3 border-t border-slate-100 gap-3 text-xs text-slate-500">
              <p>Menampilkan <span className="font-bold text-slate-800">1-7</span> dari <span className="font-bold text-slate-800">48</span> pesanan</p>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <span>Baris per halaman:</span>
                  <select className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-0.5 text-xs font-semibold text-slate-700">
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                  </select>
                </div>

                <div className="flex items-center gap-1">
                  <button className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                    1
                  </button>
                  <button className="w-7 h-7 rounded-lg text-slate-600 hover:bg-slate-100 text-xs flex items-center justify-center">
                    2
                  </button>
                  <button className="w-7 h-7 rounded-lg text-slate-600 hover:bg-slate-100 text-xs flex items-center justify-center">
                    3
                  </button>
                  <span className="text-slate-400">...</span>
                  <button className="w-7 h-7 rounded-lg text-slate-600 hover:bg-slate-100 text-xs flex items-center justify-center">
                    5
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}