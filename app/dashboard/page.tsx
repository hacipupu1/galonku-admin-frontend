'use client';

import React, { useState } from 'react';
import {
  Activity,
  RefreshCw,
  ShoppingBag,
  Wallet,
  AlertTriangle,
  ArrowRight,
  Truck,
  Plus,
  MapPin,
  Droplets,
  X,
  CheckCircle2,
  User,
  Clock,
  Send,
  Navigation,
} from 'lucide-react';

// Sub-komponen Gambar Produk Utama
function ProductImage({ src, alt, fallbackIcon: Icon }: { src: string; alt: string; fallbackIcon: React.ElementType }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <Icon className="w-8 h-8 text-blue-600" />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className="max-h-full max-w-full object-contain"
      onError={() => setHasError(true)}
    />
  );
}

// Sub-komponen Mini Thumbnail Gambar Galon untuk Live Feed
function MiniProductThumb({ src, alt, fallbackText }: { src: string; alt: string; fallbackText: string }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="w-9 h-9 rounded-xl bg-blue-50/80 border border-blue-100 p-1 flex items-center justify-center shrink-0 shadow-sm">
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          className="max-h-full max-w-full object-contain"
          onError={() => setHasError(true)}
        />
      ) : (
        <span className="font-bold text-[8px] text-blue-600 uppercase">{fallbackText}</span>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const [timeFilter, setTimeFilter] = useState<'hari' | 'minggu' | 'bulan'>('hari');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // State Modal Interaktif
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [selectedGalonBrand, setSelectedGalonBrand] = useState('Aqua 19L');
  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showOrderDetailModal, setShowOrderDetailModal] = useState<any | null>(null);

  // Fungsi Toast Notifikasi Sementara
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Handler Refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      triggerToast('Data operasional berhasil diperbarui!');
    }, 800);
  };

  // Data Mock Live Feed
  const recentOrders = [
    { id: '#ORD-9021', time: '10:48 WIB', name: 'Fia Salshabila', item: 'Aqua 19L (3 Galon)', price: 'Rp 54.000', status: 'Diantar', statusBg: 'bg-cyan-50 text-cyan-700 border-cyan-100', img: '/aqua.png', fallback: 'Aqua', phone: '0812-9844-3211', address: 'Kost Sakura No. 4, Lt. 2' },
    { id: '#ORD-9020', time: '10:35 WIB', name: 'Rian Mahendra', item: 'Le Minerale 15L (2 Galon)', price: 'Rp 34.000', status: 'Diproses', statusBg: 'bg-indigo-50 text-indigo-700 border-indigo-100', img: '/leminerale.png', fallback: 'Le M', phone: '0857-1120-9963', address: 'Jl. Ciputat Raya No. 188' },
    { id: '#ORD-9019', time: '10:12 WIB', name: 'Kantor Notaris Hendra', item: 'Cleo 19L (5 Galon)', price: 'Rp 80.000', status: 'Selesai', statusBg: 'bg-emerald-50 text-emerald-700 border-emerald-100', img: '/cleo.png', fallback: 'Cleo', phone: '0878-5544-2201', address: 'Jl. Teuku Nyak Arief No. 51' },
    { id: '#ORD-9018', time: '09:55 WIB', name: 'Siti Nurhaliza', item: 'Vit 19L (2 Galon)', price: 'Rp 30.000', status: 'Selesai', statusBg: 'bg-emerald-50 text-emerald-700 border-emerald-100', img: '/vit.png', fallback: 'Vit', phone: '0896-1234-9001', address: 'Jl. Kebayoran Lama No. 44' },
  ];

  return (
    <main className="w-full bg-[#F8FAFC] min-h-screen p-6 pt-4 font-sans text-slate-800 relative">
      
      {/* TOAST NOTIFIKASI AKSI */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-2.5 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. HEADER HALAMAN */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="text-[11px] font-bold text-blue-600 uppercase tracking-wider mb-0.5 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-blue-600" />
            <span>MONITORING OPERASIONAL REALTIME</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight leading-tight">
            Ringkasan Operasional Hari Ini
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Update terkini aktivitas refill dan inventaris Depo Kebayoran Lama (JKT-04)
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleRefresh}
            className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold px-3.5 py-2.5 rounded-xl shadow-sm flex items-center gap-2 transition cursor-pointer active:scale-95"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
            <span>{isRefreshing ? 'Memuat...' : 'Refresh Data'}</span>
          </button>
          
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold px-3 py-2.5 rounded-xl flex items-center gap-2 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Sinkron: Aktif</span>
          </div>
        </div>
      </div>

      {/* 2. TOP 3 KPI SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        
        {/* Total Pesanan */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Pesanan</span>
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-bold text-slate-900">48</span>
              <span className="text-xs font-medium text-slate-400">transaksi</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold">
              ↗ +12% vs kemarin (42 pesanan)
            </span>
            <button
              type="button"
              onClick={() => triggerToast('Menampilkan rincian statistik pesanan harian...')}
              className="text-blue-600 font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>Detail</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Pendapatan Bersih */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pendapatan Bersih</span>
              <div className="p-2.5 bg-cyan-50 text-cyan-600 rounded-xl">
                <Wallet className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-3xl font-bold text-slate-900">Rp 864.000</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold">
              ✓ +8.5% melampaui target harian
            </span>
            <button
              type="button"
              onClick={() => triggerToast('Membuka laporan arus kas depo...')}
              className="text-blue-600 font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>Laporan</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Status Stock Galon */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status Stock Galon</span>
              <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-bold text-rose-600">12</span>
              <span className="text-xs font-medium text-slate-400">galon terisi</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md font-semibold">
              • Perlu Restok Segera (&lt; 20 unit)
            </span>
            <button
              type="button"
              onClick={() => {
                setSelectedGalonBrand('Semua Brand');
                setShowRestockModal(true);
              }}
              className="text-rose-600 font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>Restok</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>

      {/* 3. MIDDLE SECTION: GRAFIK PESANAN & LIVE FEED PESANAN TERBARU */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        
        {/* LEFT: GRAFIK PESANAN (8 Cols) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-slate-900">Grafik Pesanan</h2>
                  <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-md border border-blue-100">
                    Realtime
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Fluktualisasi lonjakan pesanan jam kerja per 2 jam (08:00 - 18:00)
                </p>
              </div>

              {/* Toggle Time Interaktif */}
              <div className="bg-slate-100/80 p-1 rounded-xl flex items-center gap-1 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => {
                    setTimeFilter('hari');
                    triggerToast('Menampilkan grafik filter: Hari Ini');
                  }}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition cursor-pointer ${
                    timeFilter === 'hari' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Hari Ini
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTimeFilter('minggu');
                    triggerToast('Menampilkan grafik filter: Mingguan');
                  }}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition cursor-pointer ${
                    timeFilter === 'minggu' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Mingguan
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTimeFilter('bulan');
                    triggerToast('Menampilkan grafik filter: Bulanan');
                  }}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition cursor-pointer ${
                    timeFilter === 'bulan' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Bulanan
                </button>
              </div>
            </div>

            {/* Sub Metrics Banner */}
            <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-xs">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">JAM PUNCAK (PEAK)</span>
                <span className="font-bold text-slate-800 text-xs mt-0.5 block">11:00 - 13:00 (15 pesanan)</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">RATA-RATA PENGIRIMAN</span>
                <span className="font-bold text-blue-600 text-xs mt-0.5 block">22.4 Menit</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">TINGKAT PENYELESAIAN</span>
                <span className="font-bold text-emerald-600 text-xs mt-0.5 block">96.8% Sukses</span>
              </div>
            </div>

            {/* SVG Line Chart */}
            <div className="relative w-full h-52 mt-4">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 600 180" preserveAspectRatio="none">
                <line x1="0" y1="30" x2="600" y2="30" stroke="#E2E8F0" strokeDasharray="4 4" />
                <line x1="0" y1="80" x2="600" y2="80" stroke="#E2E8F0" strokeDasharray="4 4" />
                <line x1="0" y1="130" x2="600" y2="130" stroke="#E2E8F0" strokeDasharray="4 4" />

                <defs>
                  <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                <path
                  d="M 0 130 Q 120 100 240 30 T 480 50 L 600 20 L 600 180 L 0 180 Z"
                  fill="url(#blueGradient)"
                />

                <path
                  d="M 0 130 Q 120 100 240 30 T 480 50 L 600 20"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                <circle cx="120" cy="100" r="4" fill="#2563EB" />
                <circle cx="240" cy="30" r="6" fill="#1E3A8A" stroke="#FFFFFF" strokeWidth="2" />
                <circle cx="360" cy="110" r="4" fill="#2563EB" />
                <circle cx="600" cy="20" r="5" fill="#2563EB" />
              </svg>

              <div className="absolute top-[8px] left-[32%] -translate-x-1/2 bg-[#1E293B] text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                <span>Puncak: 15 Pesanan @ 12:00</span>
              </div>

              <div className="flex justify-between items-center text-[10px] font-medium text-slate-400 mt-3">
                <span>08:00</span>
                <span>10:00</span>
                <span>12:00</span>
                <span>14:00</span>
                <span>16:00</span>
                <span>18:00</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                <span>Hari Ini (Aktual)</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                <span>Rata-rata 7 Hari</span>
              </span>
            </div>
            <span className="text-slate-400 italic">Estimasi Tutup Buku: 21:00</span>
          </div>
        </div>

        {/* RIGHT: PESANAN TERBARU LIVE FEED */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-1 mb-1">
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm font-bold text-slate-900 whitespace-nowrap">Pesanan Terbaru</h2>
                <span className="bg-emerald-50 text-emerald-600 text-[9px] font-bold px-1.5 py-0.5 rounded-md border border-emerald-100 shrink-0">
                  Live Feed
                </span>
              </div>
              <button
                type="button"
                onClick={() => triggerToast('Membuka seluruh daftar pesanan...')}
                className="text-xs font-bold text-blue-600 hover:underline shrink-0 cursor-pointer"
              >
                Lihat Semua &gt;
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mb-3">
              5 antrean pesanan terakhir masuk dari aplikasi konsumen
            </p>

            {/* List Pesanan Terbaru - Bisa diklik untuk buka detail */}
            <div className="space-y-2">
              {recentOrders.map((ord) => (
                <div
                  key={ord.id}
                  onClick={() => setShowOrderDetailModal(ord)}
                  className="p-2.5 bg-slate-50/80 hover:bg-blue-50/50 rounded-xl border border-slate-100 transition flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <MiniProductThumb src={ord.img} alt={ord.item} fallbackText={ord.fallback} />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <strong className="text-xs font-bold text-blue-600 group-hover:underline">{ord.id}</strong>
                        <span className="text-[10px] text-slate-400">• {ord.time}</span>
                      </div>
                      <span className="text-xs font-bold text-slate-900 block truncate">{ord.name}</span>
                      <span className="text-[10px] text-slate-500 font-medium block truncate">{ord.item}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0 pl-2">
                    <span className={`inline-block px-2 py-0.5 rounded-md text-[9px] font-bold border mb-1 ${ord.statusBg}`}>
                      • {ord.status}
                    </span>
                    <strong className="text-xs font-bold text-slate-900 block">{ord.price}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BANNER ANTREAN BARU - TOMBOL DISPATCH KURIR INTERAKTIF */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 p-2 bg-blue-50/70 rounded-xl border border-blue-100 flex items-center justify-between gap-1.5">
            <span className="text-[11px] font-semibold text-blue-900 truncate">
              Masuk antrean baru? Segera tugaskan kurir
            </span>
            <button
              type="button"
              onClick={() => setShowDispatchModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-sm transition active:scale-95 cursor-pointer shrink-0 whitespace-nowrap flex items-center gap-1"
            >
              <Send className="w-3 h-3" />
              <span>Dispatch Kurir</span>
            </button>
          </div>
        </div>

      </div>

      {/* 4. BOTTOM SECTION 1: STATUS STOK GALON FISIK DI DEPO */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-6">
        
        {/* Header section & Button Blue */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-600" />
              <h2 className="text-base font-bold text-slate-900">Status Stok Galon Fisik di Depo</h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Ketersediaan galon isi siap kirim berdasarkan inventaris rak fisik Depo JKT-04
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setSelectedGalonBrand('Semua Brand');
              setShowRestockModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-1.5 transition cursor-pointer self-start sm:self-auto active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Pesan Restok Pabrik</span>
          </button>
        </div>

        {/* 4 Cards Galon Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Aqua */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between hover:border-blue-300 transition shadow-sm relative">
            <div>
              <div className="flex justify-end mb-2">
                <span className="bg-rose-50 text-rose-600 border border-rose-200 text-[10px] font-bold px-2 py-0.5 rounded-md">
                  • Kritis: 4 Sisa
                </span>
              </div>
              <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center p-1 bg-blue-50/50 rounded-xl">
                <ProductImage src="/aqua.png" alt="Aqua 19L" fallbackIcon={Droplets} />
              </div>
              <h3 className="font-bold text-slate-900 text-xs text-center">Aqua 19 Liter</h3>
              <p className="text-[10px] text-slate-400 text-center mb-3">Air Mineral Pegunungan</p>
            </div>
            <div>
              <div className="flex justify-between items-center text-[11px] mb-1">
                <span className="text-slate-400">Harga Refill</span>
                <strong className="text-slate-900 font-bold">Rp 18.000</strong>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-600 font-semibold">Tersedia: <strong>4 / 20 Rak</strong></span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedGalonBrand('Aqua 19L');
                    setShowRestockModal(true);
                  }}
                  className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  + Restok
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Le Minerale */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between hover:border-blue-300 transition shadow-sm relative">
            <div>
              <div className="flex justify-end mb-2">
                <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-md">
                  • Rendah: 3 Sisa
                </span>
              </div>
              <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center p-1 bg-blue-50/50 rounded-xl">
                <ProductImage src="/leminerale.png" alt="Le Minerale 15L" fallbackIcon={Droplets} />
              </div>
              <h3 className="font-bold text-slate-900 text-xs text-center">Le Minerale 15L</h3>
              <p className="text-[10px] text-slate-400 text-center mb-3">Galon Sekali Pakai BPA Free</p>
            </div>
            <div>
              <div className="flex justify-between items-center text-[11px] mb-1">
                <span className="text-slate-400">Harga Beli Baru</span>
                <strong className="text-slate-900 font-bold">Rp 17.000</strong>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-600 font-semibold">Tersedia: <strong>3 / 20 Rak</strong></span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedGalonBrand('Le Minerale 15L');
                    setShowRestockModal(true);
                  }}
                  className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  + Restok
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Cleo */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between hover:border-blue-300 transition shadow-sm relative">
            <div>
              <div className="flex justify-end mb-2">
                <span className="bg-cyan-50 text-cyan-700 border border-cyan-200 text-[10px] font-bold px-2 py-0.5 rounded-md">
                  • Tersedia: 3 Sisa
                </span>
              </div>
              <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center p-1 bg-blue-50/50 rounded-xl">
                <ProductImage src="/cleo.png" alt="Cleo 19L" fallbackIcon={Droplets} />
              </div>
              <h3 className="font-bold text-slate-900 text-xs text-center">Cleo Pure Water 19L</h3>
              <p className="text-[10px] text-slate-400 text-center mb-3">Air Demineral Murni</p>
            </div>
            <div>
              <div className="flex justify-between items-center text-[11px] mb-1">
                <span className="text-slate-400">Harga Refill</span>
                <strong className="text-slate-900 font-bold">Rp 16.000</strong>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-600 font-semibold">Tersedia: <strong>3 / 15 Rak</strong></span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedGalonBrand('Cleo Pure Water 19L');
                    setShowRestockModal(true);
                  }}
                  className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  + Restok
                </button>
              </div>
            </div>
          </div>

          {/* Card 4: Vit */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between hover:border-blue-300 transition shadow-sm relative">
            <div>
              <div className="flex justify-end mb-2">
                <span className="bg-rose-50 text-rose-600 border border-rose-200 text-[10px] font-bold px-2 py-0.5 rounded-md">
                  • Kritis: 2 Sisa
                </span>
              </div>
              <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center p-1 bg-blue-50/50 rounded-xl">
                <ProductImage src="/vit.png" alt="Vit 19L" fallbackIcon={Droplets} />
              </div>
              <h3 className="font-bold text-slate-900 text-xs text-center">Vit 19 Liter</h3>
              <p className="text-[10px] text-slate-400 text-center mb-3">Air Mineral Higienis Teruji</p>
            </div>
            <div>
              <div className="flex justify-between items-center text-[11px] mb-1">
                <span className="text-slate-400">Harga Refill</span>
                <strong className="text-slate-900 font-bold">Rp 15.000</strong>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-600 font-semibold">Tersedia: <strong>2 / 15 Rak</strong></span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedGalonBrand('Vit 19L');
                    setShowRestockModal(true);
                  }}
                  className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  + Restok
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 5. BOTTOM SECTION 2: ARMADA PENGANTARAN AKTIF */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Status Info */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-600 text-white rounded-xl shadow-sm">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <strong className="text-xs font-bold text-slate-900">Armada Pengantaran Aktif</strong>
              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-200">
                4 Kurir Beroperasi
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Budi Pratama (8 galon), Joko Susilo (5 galon), Ahmad D. (4 galon), Indra (Standby di Depo)
            </p>
          </div>
        </div>

        {/* Right Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setShowMapModal(true)}
            className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-sm transition flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>Live Map GPS</span>
          </button>

          <button
            type="button"
            onClick={() => setShowDispatchModal(true)}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Panggil Kurir Standby</span>
          </button>
        </div>

      </div>

      {/* ========================================================= */}
      {/* MODAL 1: PESAN RESTOK PABRIK */}
      {showRestockModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600" />
                <span>Form Pesan Restok Pabrik</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowRestockModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowRestockModal(false);
                triggerToast(`Permintaan Restok ${selectedGalonBrand} berhasil dikirim ke Pabrik!`);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">Merek Galon</label>
                <select
                  value={selectedGalonBrand}
                  onChange={(e) => setSelectedGalonBrand(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 font-bold text-slate-800 focus:outline-none focus:border-blue-500"
                >
                  <option value="Aqua 19L">Aqua 19L Refill</option>
                  <option value="Le Minerale 15L">Le Minerale 15L Baru</option>
                  <option value="Cleo Pure Water 19L">Cleo Pure Water 19L</option>
                  <option value="Vit 19L">Vit 19L Refill</option>
                  <option value="Semua Brand">Semua Merek Galon</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Jumlah Galon (Unit)</label>
                <input
                  type="number"
                  defaultValue="50"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 font-semibold focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Catatan Tambahan</label>
                <textarea
                  placeholder="Contoh: Minta pengiriman jadwal jam 14:00 WIB"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500 h-20"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowRestockModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition cursor-pointer shadow-sm"
                >
                  Kirim Pesanan Restok
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: TUGASKAN / DISPATCH KURIR */}
      {showDispatchModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Truck className="w-5 h-5 text-blue-600" />
                <span>Panggil &amp; Dispatch Kurir Standby</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowDispatchModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowDispatchModal(false);
                triggerToast('Kurir Standby (Pak Budi) berhasil ditugaskan!');
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">Pilih Kurir Standby Depo</label>
                <select className="w-full border border-slate-200 rounded-xl px-3 py-2.5 font-bold text-slate-800 focus:outline-none focus:border-blue-500">
                  <option>Pak Budi Santoso (Motor 01 - Standby Depo)</option>
                  <option>Mas Doni Wijaya (Motor 02 - Standby Depo)</option>
                  <option>Rian Irawan (Motor 04 - Standby Depo)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Tujuan / Zona Pengiriman</label>
                <input
                  type="text"
                  defaultValue="Zona A (Kebest / Kebayoran Lama)"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 font-semibold focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowDispatchModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition cursor-pointer shadow-sm"
                >
                  Tugaskan Sekarang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: LIVE MAP GPS */}
      {showMapModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Navigation className="w-5 h-5 text-blue-600" />
                <span>Live Map GPS - Armada Depo JKT-04</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowMapModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-100 h-60 rounded-xl flex flex-col items-center justify-center border border-slate-200 relative overflow-hidden mb-4">
              <div className="absolute inset-0 bg-blue-50/30 flex items-center justify-center">
                <div className="text-center p-4">
                  <MapPin className="w-10 h-10 text-blue-600 mx-auto mb-2 animate-bounce" />
                  <strong className="text-xs font-bold text-slate-800 block">GPS Tracker Online</strong>
                  <p className="text-[11px] text-slate-500 mt-0.5">4 Kurir sedang aktif bergerak di Kebayoran Lama</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="font-bold text-slate-800">Budi Pratama (Motor 01)</span>
                <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">🛵 Active (8 Galon)</span>
              </div>
              <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="font-bold text-slate-800">Joko Susilo (Motor 02)</span>
                <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">🛵 Active (5 Galon)</span>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setShowMapModal(false)}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition cursor-pointer"
              >
                Tutup Peta
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: DETAIL PESANAN TERBARU */}
      {showOrderDetailModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  Detail {showOrderDetailModal.id}
                </h3>
                <span className="text-[11px] text-slate-400">{showOrderDetailModal.time}</span>
              </div>
              <button
                type="button"
                onClick={() => setShowOrderDetailModal(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs mb-6">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Pemesan:</span>
                  <strong className="text-slate-800">{showOrderDetailModal.name}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">No. HP:</span>
                  <strong className="text-slate-800">{showOrderDetailModal.phone}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Alamat:</span>
                  <span className="text-slate-700 font-medium truncate max-w-[200px]">{showOrderDetailModal.address}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                <div>
                  <strong className="text-slate-900 block">{showOrderDetailModal.item}</strong>
                  <span className="text-[10px] text-slate-400">Total Tagihan</span>
                </div>
                <strong className="text-blue-600 text-sm">{showOrderDetailModal.price}</strong>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowOrderDetailModal(null)}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}