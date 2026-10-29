'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  RotateCw,
  ShoppingBag,
  Wallet,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
  Truck,
  Plus,
  Droplets,
  ChevronRight,
  MapPin,
  X,
  PhoneCall,
  Activity,
  CheckCircle2,
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();

  // STATE INTERAKTIF
  const [chartTab, setChartTab] = useState<'hari' | 'minggu' | 'bulan'>('hari');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showRestokModal, setShowRestokModal] = useState(false);
  const [showDispatchModal, setShowDispatchModal] = useState(false);

  // DATA PRODUK GALON (Gunakan path gambar dari public folder)
  const [products, setProducts] = useState([
    {
      id: 'aqua-19l',
      name: 'Aqua 19 Liter',
      desc: 'Air Mineral Pegunungan',
      price: 'Rp 18.000',
      priceLabel: 'Harga Refill',
      current: 4,
      max: 20,
      statusBadge: '• Kritis: 4 Sisa',
      statusStyle: 'bg-red-50 text-red-600 border-red-200',
      progressBg: 'bg-red-500',
      imageSrc: '/aqua.png', // sesuaikan nama file gambar di folder public kamu
      cardBg: 'bg-blue-50/40 border-blue-100',
    },
    {
      id: 'le-minerale-15l',
      name: 'Le Minerale 15L',
      desc: 'Galon Sekali Pakai BPA Free',
      price: 'Rp 17.000',
      priceLabel: 'Harga Beli Baru',
      current: 3,
      max: 20,
      statusBadge: '• Rendah: 3 Sisa',
      statusStyle: 'bg-orange-50 text-orange-600 border-orange-200',
      progressBg: 'bg-orange-500',
      imageSrc: '/leminerale.png',
      cardBg: 'bg-teal-50/30 border-teal-100',
    },
    {
      id: 'cleo-19l',
      name: 'Cleo Pure Water 19L',
      desc: 'Air Demineral Murni',
      price: 'Rp 16.000',
      priceLabel: 'Harga Refill',
      current: 3,
      max: 15,
      statusBadge: '• Tersedia: 3 Sisa',
      statusStyle: 'bg-cyan-50 text-cyan-600 border-cyan-200',
      progressBg: 'bg-cyan-500',
      imageSrc: '/cleo.png',
      cardBg: 'bg-cyan-50/30 border-cyan-100',
    },
    {
      id: 'vit-19l',
      name: 'Vit 19 Liter',
      desc: 'Air Mineral Higienis Teruji',
      price: 'Rp 15.000',
      priceLabel: 'Harga Refill',
      current: 2,
      max: 15,
      statusBadge: '• Kritis: 2 Sisa',
      statusStyle: 'bg-red-50 text-red-600 border-red-200',
      progressBg: 'bg-red-500',
      imageSrc: '/vit.png',
      cardBg: 'bg-indigo-50/30 border-indigo-100',
    },
  ]);

  // Tambah Stok Per Item Interaktif
  const handleRestokItem = (id: string) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, current: Math.min(item.current + 5, item.max) } : item
      )
    );
  };

  // Simulation Refresh Data
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <main className="w-full bg-[#F8FAFC] min-h-screen p-6 pt-4 font-sans text-slate-800">
      {/* 1. HEADER PAGE */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-600 uppercase tracking-wider mb-0.5 h-4">
            <Activity className="w-3.5 h-3.5" />
            <span>Monitoring Operasional Realtime</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight leading-tight">
            Ringkasan Operasional Hari Ini
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Update terkini aktivitas refill dan inventaris Depo Kebayoran Lama (JKT-04)
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleRefresh}
            className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2 transition active:scale-95 cursor-pointer"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
            <span>Refresh Data</span>
          </button>
          <span className="bg-emerald-100/70 text-emerald-700 text-xs font-semibold px-3 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Sinkron: Aktif
          </span>
        </div>
      </div>

      {/* 2. TOP 3 SUMMARY KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        {/* Total Pesanan */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Total Pesanan</span>
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-slate-900">48</span>
              <span className="text-xs text-slate-400 font-medium">transaksi</span>
            </div>
          </div>
          <div className="pt-3 border-t border-slate-100 mt-4 flex items-center justify-between text-xs">
            <span className="text-emerald-600 font-semibold flex items-center gap-1 text-[11px]">
              <TrendingUp className="w-3.5 h-3.5" /> +12% vs kemarin (42 pesanan)
            </span>
            <Link
              href="/manajemenpesanan"
              className="text-blue-600 hover:underline font-semibold flex items-center gap-0.5 text-[11px]"
            >
              Detail <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Pendapatan Bersih */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Pendapatan Bersih</span>
              <div className="p-2 bg-cyan-50 text-cyan-600 rounded-xl">
                <Wallet className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-1">
              <span className="text-2xl font-bold text-slate-900">Rp 864.000</span>
            </div>
          </div>
          <div className="pt-3 border-t border-slate-100 mt-4 flex items-center justify-between text-xs">
            <span className="text-emerald-600 font-semibold flex items-center gap-1 text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5" /> +8.5% melampaui target harian
            </span>
            <Link
              href="/laporankeu"
              className="text-blue-600 hover:underline font-semibold flex items-center gap-0.5 text-[11px]"
            >
              Laporan <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Status Stock Galon */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Status Stock Galon</span>
              <div className="p-2 bg-red-50 text-red-600 rounded-xl">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-red-600">12</span>
              <span className="text-xs text-slate-400 font-medium">galon terisi</span>
            </div>
          </div>
          <div className="pt-3 border-t border-slate-100 mt-4 flex items-center justify-between text-xs">
            <span className="text-red-500 font-semibold text-[11px]">
              • Perlu Restok Segera (&lt; 20 unit)
            </span>
            <button
              type="button"
              onClick={() => setShowRestokModal(true)}
              className="text-red-600 hover:underline font-semibold flex items-center gap-0.5 text-[11px] cursor-pointer"
            >
              Restok <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. MIDDLE SECTION: GRAFIK PESANAN & LIVE FEED PESANAN TERBARU */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* GRAFIK PESANAN (2 KOLOM) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-slate-900">Grafik Pesanan</h2>
                  <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                    Realtime
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Fluktuasi lonjakan pesanan jam kerja per 2 jam (08:00 - 18:00)
                </p>
              </div>

              {/* Tab Selector Grafik */}
              <div className="bg-slate-100/80 p-1 rounded-xl flex items-center gap-1 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setChartTab('hari')}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition cursor-pointer ${
                    chartTab === 'hari' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Hari Ini
                </button>
                <button
                  type="button"
                  onClick={() => setChartTab('minggu')}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition cursor-pointer ${
                    chartTab === 'minggu' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Mingguan
                </button>
                <button
                  type="button"
                  onClick={() => setChartTab('bulan')}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition cursor-pointer ${
                    chartTab === 'bulan' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Bulanan
                </button>
              </div>
            </div>

            {/* Sub Stats Bar */}
            <div className="grid grid-cols-3 gap-3 bg-slate-50 p-3 rounded-xl mb-4 text-xs">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">JAM PUNCAK (PEAK)</span>
                <span className="font-bold text-slate-800 text-xs">11:00 – 13:00 (15 pesanan)</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">RATA-RATA PENGIRIMAN</span>
                <span className="font-bold text-blue-600 text-xs">22.4 Menit</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">TINGKAT PENYELESAIAN</span>
                <span className="font-bold text-emerald-600 text-xs">96.8% Sukses</span>
              </div>
            </div>

            {/* VISUAL GRAFIK SVG CURVE */}
            <div className="relative w-full h-[180px] mt-4">
              {/* Badge Peak Marker */}
              <div className="absolute left-[41%] top-[8%] -translate-x-1/2 bg-[#1E3A8A] text-white text-[10px] font-semibold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 z-10">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                Puncak: 15 Pesanan @ 12:00
              </div>

              <svg className="w-full h-full overflow-visible" viewBox="0 0 600 160" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Area Fill */}
                <path
                  d="M 30 120 C 80 100, 110 80, 140 80 C 180 80, 210 30, 250 30 C 290 30, 320 95, 360 95 C 400 95, 430 45, 470 40 C 510 35, 550 25, 580 20 L 580 160 L 30 160 Z"
                  fill="url(#blueGradient)"
                />

                {/* Dotted Average Line */}
                <path
                  d="M 30 110 Q 250 90, 580 80"
                  fill="none"
                  stroke="#94A3B8"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />

                {/* Main Blue Curve */}
                <path
                  d="M 30 120 C 80 100, 110 80, 140 80 C 180 80, 210 30, 250 30 C 290 30, 320 95, 360 95 C 400 95, 430 45, 470 40 C 510 35, 550 25, 580 20"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="3"
                />

                {/* Points */}
                <circle cx="140" cy="80" r="4" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
                <circle cx="250" cy="30" r="4" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
                <circle cx="360" cy="95" r="4" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
                <circle cx="580" cy="20" r="4" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
              </svg>

              {/* X Axis Labels */}
              <div className="flex justify-between text-[10px] font-semibold text-slate-400 mt-2 px-2">
                <span>08:00</span>
                <span>10:00</span>
                <span>12:00</span>
                <span>14:00</span>
                <span>16:00</span>
                <span>18:00</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100 mt-4">
            <div className="flex items-center gap-4 text-[11px]">
              <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> Hari Ini (Aktual)
              </span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2.5 h-0.5 bg-slate-400 border border-dashed"></span> Rata-rata 7 Hari
              </span>
            </div>
            <span className="text-[10px] text-slate-400">Estimasi Tutup Buku: 21:00</span>
          </div>
        </div>

        {/* PESANAN TERBARU (LIVE FEED - 1 KOLOM) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-0.5">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">Pesanan Terbaru</h2>
                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Live Feed
                </span>
              </div>
              <Link
                href="/manajemenpesanan"
                className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-0.5"
              >
                Lihat Semua <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <p className="text-xs text-slate-400 mb-3">5 antrean pesanan terakhir masuk dari aplikasi konsumen</p>

            {/* List Order Feed */}
            <div className="space-y-2.5">
              {/* Item 1 */}
              <div className="p-2.5 bg-slate-50/70 rounded-xl border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                    <Droplets className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-900 text-xs">#ORD-9021</span>
                      <span className="text-[10px] text-slate-400">• 10:48</span>
                    </div>
                    <p className="text-xs text-slate-600 font-semibold leading-tight">Fia Salshabila</p>
                    <span className="text-[10px] text-blue-600 font-medium">Aqua 19L (3 Galon)</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full inline-block mb-1">
                    • Diantar
                  </span>
                  <span className="font-bold text-xs text-slate-800 block">Rp 54.000</span>
                </div>
              </div>

              {/* Item 2 */}
              <div className="p-2.5 bg-slate-50/70 rounded-xl border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-teal-50 text-teal-600 rounded-lg shrink-0">
                    <Droplets className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-900 text-xs">#ORD-9020</span>
                      <span className="text-[10px] text-slate-400">• 10:35</span>
                    </div>
                    <p className="text-xs text-slate-600 font-semibold leading-tight">Rian Mahendra</p>
                    <span className="text-[10px] text-teal-600 font-medium">Le Minerale 15L (2 Galon)</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full inline-block mb-1">
                    • Diproses
                  </span>
                  <span className="font-bold text-xs text-slate-800 block">Rp 34.000</span>
                </div>
              </div>

              {/* Item 3 */}
              <div className="p-2.5 bg-slate-50/70 rounded-xl border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg shrink-0">
                    <Droplets className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-900 text-xs">#ORD-9019</span>
                      <span className="text-[10px] text-slate-400">• 10:12</span>
                    </div>
                    <p className="text-xs text-slate-600 font-semibold leading-tight">Kantor Notaris Hendra</p>
                    <span className="text-[10px] text-emerald-600 font-medium">Cleo 19L (5 Galon)</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mb-1">
                    • Selesai
                  </span>
                  <span className="font-bold text-xs text-slate-800 block">Rp 80.000</span>
                </div>
              </div>

              {/* Item 4 */}
              <div className="p-2.5 bg-slate-50/70 rounded-xl border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
                    <Droplets className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-900 text-xs">#ORD-9018</span>
                      <span className="text-[10px] text-slate-400">• 09:55</span>
                    </div>
                    <p className="text-xs text-slate-600 font-semibold leading-tight">Siti Nurhaliza</p>
                    <span className="text-[10px] text-indigo-600 font-medium">Vit 19L (2 Galon)</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mb-1">
                    • Selesai
                  </span>
                  <span className="font-bold text-xs text-slate-800 block">Rp 30.000</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dispatch CTA */}
          <div className="bg-[#F0F5FF] p-3 rounded-xl border border-blue-100 flex items-center justify-between mt-3">
            <span className="text-xs text-slate-600 font-medium">
              Masuk antrean baru? Segera tugaskan kurir
            </span>
            <button
              type="button"
              onClick={() => router.push('/monitoring/kurir')}
              className="bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-semibold px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition active:scale-95 cursor-pointer shrink-0"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Dispatch Kurir</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. BOTTOM SECTION: STATUS STOK GALON FISIK DI DEPO */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-600" />
              <span>Status Stok Galon Fisik di Depo</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Ketersediaan galon isi siap kirim berdasarkan inventaris rak fisik Depo JKT-04
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowRestokModal(true)}
            className="bg-[#1E293B] hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition active:scale-95 cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Pesan Restok Pabrik</span>
          </button>
        </div>

        {/* 4 KARTU PRODUK STOK */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((item) => (
            <div
              key={item.id}
              className={`${item.cardBg} p-4 rounded-2xl border shadow-sm flex flex-col justify-between relative`}
            >
              {/* Badge Status Atas */}
              <div className="flex justify-end mb-2">
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${item.statusStyle}`}
                >
                  {item.statusBadge}
                </span>
              </div>

              {/* Tempat Gambar Galon Asli */}
              <div className="w-24 h-24 mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center p-2 mb-3">
                <img
                  src={item.imageSrc}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    // Fallback jika file gambar tidak ditemukan di folder public
                    e.currentTarget.style.display = 'none';
                    if (e.currentTarget.parentElement) {
                      e.currentTarget.parentElement.innerHTML = '<div class="text-blue-500 font-bold text-xs text-center">Galon</div>';
                    }
                  }}
                />
              </div>

              {/* Judul & Deskripsi */}
              <div className="text-center mb-3">
                <h3 className="font-bold text-slate-900 text-sm">{item.name}</h3>
                <p className="text-[11px] text-slate-400">{item.desc}</p>
              </div>

              {/* Detail Harga & Bar Stok */}
              <div className="space-y-2 pt-2 border-t border-slate-200/60 text-xs">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-400">{item.priceLabel}</span>
                  <span className="font-bold text-slate-900">{item.price}</span>
                </div>

                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-600 font-medium">
                    Tersedia: <strong className="text-slate-900">{item.current} / {item.max} Rak</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRestokItem(item.id)}
                    className="text-blue-600 hover:text-blue-700 bg-blue-50/80 hover:bg-blue-100 font-semibold px-2.5 py-1 rounded-lg transition active:scale-95 cursor-pointer text-[11px]"
                  >
                    + Restok
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. FOOTER BAR: ARMADA PENGANTARAN AKTIF */}
      <div className="bg-[#F0F5FF] p-4 rounded-2xl border border-blue-100 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-sm shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 text-sm">Armada Pengantaran Aktif</h3>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                4 Kurir Beroperasi
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Budi Pratama (8 galon), Joko Susilo (6 galon), Ahmad D. (4 galon), Indra (Standby di Depo)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => router.push('/monitoring/kurir')}
            className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>Live Map GPS</span>
          </button>
          <button
            type="button"
            onClick={() => router.push('/monitoring/kurir')}
            className="bg-[#1E293B] hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Panggil Kurir Standby</span>
          </button>
        </div>
      </div>

      {/* MODAL PESAN RESTOK PABRIK */}
      {showRestokModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-slate-900 text-base">Pesan Restok Pabrik</h3>
              <button
                type="button"
                onClick={() => setShowRestokModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowRestokModal(false);
                alert('Pesanan restok berhasil dikirim ke Pabrik!');
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">Pilih Produk Galon</label>
                <select className="w-full border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500">
                  <option value="aqua">Aqua 19 Liter</option>
                  <option value="leminerale">Le Minerale 15L</option>
                  <option value="cleo">Cleo Pure Water 19L</option>
                  <option value="vit">Vit 19 Liter</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Jumlah Unit Galon</label>
                <input
                  type="number"
                  defaultValue={50}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowRestokModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition cursor-pointer shadow-sm"
                >
                  Kirim Pesanan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}