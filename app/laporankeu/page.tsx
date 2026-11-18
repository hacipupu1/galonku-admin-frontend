'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  RotateCw,
  ShoppingBag,
  Wallet,
  Droplets,
  Truck,
  Filter,
  Download,
  Plus,
  X,
  CheckCircle2,
} from 'lucide-react';

// Sub-komponen Gambar Galon Mini dengan Fallback
function GalonThumb({ src, alt, fallbackText }: { src: string; alt: string; fallbackText: string }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 p-1 flex items-center justify-center shrink-0 shadow-sm">
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          className="max-h-full max-w-full object-contain"
          onError={() => setHasError(true)}
        />
      ) : (
        <span className="font-bold text-[9px] text-blue-600 uppercase">{fallbackText}</span>
      )}
    </div>
  );
}

export default function RingkasanOperasionalPage() {
  const router = useRouter();

  // STATE INTERAKTIF
  const [chartTab, setChartTab] = useState<'hari' | '7hari' | '30hari'>('hari');
  const [orderTab, setOrderTab] = useState<'semua' | 'ditugaskan' | 'diantar'>('semua');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showRestokModal, setShowRestokModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  // Data Mock Live Orders
  const [orders] = useState([
    {
      id: '#ORD-8824',
      time: 'baru saja',
      customerName: 'Ria Ika',
      customerPhone: '0812-9944-3211',
      customerAddress: 'Komp. Srikandi No. 4, Kebayoran',
      product: '2x Aqua 19L Refill',
      productSub: 'Tukar Galon',
      total: 'Rp 36.000',
      totalSub: 'Gratis Ongkir',
      paymentMethod: 'QRIS Instan',
      status: 'diproses',
      statusLabel: '• Diproses Depo',
      statusBg: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      id: '#ORD-8823',
      time: '5 mnt lalu',
      customerName: 'Bpk. Hendra Gunawan',
      customerPhone: '0817-1122-9988',
      customerAddress: 'Jl. Cendrawasih 3 No. 82',
      product: '1x Le Minerale 15L',
      productSub: 'Galon Baru',
      total: 'Rp 17.000',
      totalSub: 'Lunas',
      paymentMethod: 'Transfer BCA',
      status: 'diantar',
      statusLabel: '• Diantar (Mas Doni)',
      statusBg: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    },
    {
      id: '#ORD-8822',
      time: '12 mnt lalu',
      customerName: 'Ibu Rina Kartika',
      customerPhone: '0813-8817-0101',
      customerAddress: 'Apartemen Gandaria Lt. 14',
      product: '3x Aqua 19L Refill',
      productSub: 'Tukar Galon',
      total: 'Rp 54.000',
      totalSub: 'Bayar di Tempat',
      paymentMethod: 'COD Tunai',
      status: 'diantar',
      statusLabel: '• Diantar (Pak Budi)',
      statusBg: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    },
    {
      id: '#ORD-8821',
      time: '18 mnt lalu',
      customerName: 'Kedai Kopi Senja',
      customerPhone: '0821-4560-1289',
      customerAddress: 'Ruko Permata Blok B-3',
      product: '3x Aqua 19L Refill',
      productSub: 'Tukar Galon',
      total: 'Rp 54.000',
      totalSub: 'Bayar di Tempat',
      paymentMethod: 'COD Tunai',
      status: 'selesai',
      statusLabel: '• Selesai Diterima',
      statusBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      id: '#ORD-8820',
      time: '30 mnt lalu',
      customerName: 'Klinik Gigi Medika',
      customerPhone: '0815-9233-0012',
      customerAddress: 'Jl. Radio Dalam No. 44',
      product: '4x Aqua 19L Refill',
      productSub: 'Tukar Galon',
      total: 'Rp 72.000',
      totalSub: 'Lunas',
      paymentMethod: 'QRIS Instan',
      status: 'selesai',
      statusLabel: '• Selesai Diterima',
      statusBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
  ]);

  const filteredOrders = orders.filter((o) => {
    if (orderTab === 'ditugaskan') return o.status === 'diproses';
    if (orderTab === 'diantar') return o.status === 'diantar';
    return true;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <main className="w-full bg-[#F8FAFC] min-h-screen p-6 pt-4 font-sans text-slate-800">
      
      {/* 1. HEADER HALAMAN */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="text-[11px] font-bold text-blue-600 uppercase tracking-wider mb-0.5 h-4">
            Depo Kebayoran Lama • ID DEPO: JKT-04
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight leading-tight">
            Ringkasan Operasional Hari Ini
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Pantau status pasokan galon, armada kurir motor, dan kelancaran order real-time.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold px-3.5 py-2.5 rounded-xl shadow-sm flex items-center gap-2 transition cursor-pointer"
          >
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            
          </button>
          <button
            type="button"
            onClick={handleRefresh}
            className="bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2 transition active:scale-95 cursor-pointer"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh Data</span>
          </button>
        </div>
      </div>

      {/* 2. TOP 4 KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Card 1: Total Pesanan */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">TOTAL PESANAN HARI INI</span>
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-slate-900">48</span>
              <span className="text-xs font-medium text-slate-500">Pesanan</span>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center text-[11px]">
            <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold">
              ↗ +12% vs kemarin (42 pesanan)
            </span>
          </div>
        </div>

        {/* Card 2: Total Pendapatan */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">TOTAL PENDAPATAN</span>
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                <Wallet className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-1">
              <span className="text-2xl font-bold text-slate-900">Rp 864.000</span>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center text-[11px]">
            <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold">
              ↗ +8.5% melampaui target harian
            </span>
          </div>
        </div>

        {/* Card 3: Sisa Stok Galon */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">SISA STOK GALON</span>
              <div className="p-2.5 bg-red-50 text-red-600 rounded-xl">
                <Droplets className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-red-600">12</span>
              <span className="text-xs font-semibold text-slate-600">Galon Tersisa</span>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-red-600 font-semibold flex items-center gap-1">
              ⚠️ Perlu Restok Segera
            </span>
            <span className="text-slate-400">(&lt; 20 unit)</span>
          </div>
        </div>

        {/* Card 4: Kurir Bertugas (RATA-RATA WAKTU DISAJIKAN SEJAJAR DENGAN RAPI) */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">KURIR BERTUGAS</span>
              <div className="p-2.5 bg-cyan-50 text-cyan-600 rounded-xl">
                <Truck className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-bold text-slate-900">5</span>
              <span className="text-sm font-semibold text-slate-400">/ 6</span>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-2 text-[11px]">
            <span className="text-cyan-700 bg-cyan-50 px-2 py-1 rounded-md font-semibold whitespace-nowrap flex items-center gap-1 shrink-0">
              ⚡ 18 mnt
            </span>
            <span className="text-slate-500 font-medium whitespace-nowrap">Rata-rata waktu sampai</span>
          </div>
        </div>
      </div>

      {/* 3. MIDDLE AREA: GRAFIK & WIDGET KANAN */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* GRAFIK TREN PESANAN */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-slate-900">Grafik Tren Pesanan &amp; Pendapatan</h2>
                  <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                    Live Sync
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Distribusi lonjakan pengantaran galon jam sibuk (08:00 - 18:00 WIB)
                </p>
              </div>

              <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 self-start sm:self-auto">
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
                  onClick={() => setChartTab('7hari')}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition cursor-pointer ${
                    chartTab === '7hari' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  7 Hari
                </button>
                <button
                  type="button"
                  onClick={() => setChartTab('30hari')}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition cursor-pointer ${
                    chartTab === '30hari' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  30 Hari
                </button>
              </div>
            </div>

            {/* AREA CHART SVG */}
            <div className="relative w-full h-[220px] pt-6">
              <div className="absolute left-[36%] top-1 -translate-x-1/2 bg-[#1E293B] text-white text-[10px] font-medium px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5 z-10">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                <span><strong>13:00 Puncak Pesanan</strong> • 9 Galon / jam • Rp 162.000</span>
              </div>

              <svg className="w-full h-full overflow-visible" viewBox="0 0 600 160" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                <path
                  d="M 20 120 C 70 100, 110 80, 150 75 C 190 70, 220 20, 260 20 C 300 20, 330 110, 370 110 C 420 110, 460 50, 500 45 C 540 40, 570 30, 580 25 L 580 160 L 20 160 Z"
                  fill="url(#areaGradient)"
                />

                <rect x="50" y="100" width="8" height="40" fill="#3B82F6" opacity="0.3" rx="2" />
                <rect x="110" y="80" width="8" height="60" fill="#3B82F6" opacity="0.4" rx="2" />
                <rect x="170" y="70" width="8" height="70" fill="#3B82F6" opacity="0.5" rx="2" />
                <rect x="230" y="25" width="10" height="115" fill="#2563EB" rx="3" />
                <rect x="290" y="90" width="8" height="50" fill="#3B82F6" opacity="0.4" rx="2" />
                <rect x="350" y="105" width="8" height="35" fill="#3B82F6" opacity="0.3" rx="2" />
                <rect x="410" y="50" width="8" height="90" fill="#00C49F" opacity="0.7" rx="2" />
                <rect x="470" y="40" width="8" height="100" fill="#00C49F" opacity="0.8" rx="2" />

                <path
                  d="M 20 120 C 70 100, 110 80, 150 75 C 190 70, 220 20, 260 20 C 300 20, 330 110, 370 110 C 420 110, 460 50, 500 45 C 540 40, 570 30, 580 25"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="3"
                />

                <circle cx="260" cy="20" r="4" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
                <circle cx="500" cy="45" r="4" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
              </svg>

              <div className="flex justify-between text-[10px] font-semibold text-slate-400 mt-2 px-1">
                <span>08:00</span>
                <span>09:30</span>
                <span>10:00</span>
                <span>11:00</span>
                <span>12:00</span>
                <span className="font-bold text-blue-600">13:00</span>
                <span>14:00</span>
                <span>15:00</span>
                <span>16:30</span>
                <span>17:30</span>
                <span>18:00</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-slate-100 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Aqua 19L Dominan</span>
                <span className="font-bold text-slate-800">58.3% Total Order</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Rute Pengiriman Cepat</span>
                <span className="font-bold text-blue-600">Radius 2.4 KM</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Pembayaran Non-Tunai</span>
                <span className="font-bold text-emerald-600">82% Via QRIS &amp; Transfer</span>
              </div>
            </div>
          </div>

          {/* RINGKASAN KATEGORI */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">Ringkasan Kategori Galon Terjual Hari Ini</h2>
                <p className="text-xs text-slate-400 mt-0.5">Total akumulasi 48 galon terjual dari 4 varian utama</p>
              </div>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                100% Tercatat
              </span>
            </div>

            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex mb-4">
              <div className="h-full bg-blue-600" style={{ width: '58%' }}></div>
              <div className="h-full bg-cyan-500" style={{ width: '25%' }}></div>
              <div className="h-full bg-emerald-500" style={{ width: '10%' }}></div>
              <div className="h-full bg-red-500" style={{ width: '7%' }}></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span> Aqua 19L
                </div>
                <div className="font-extrabold text-sm text-slate-900">28 <span className="text-xs font-normal text-slate-400">galon</span></div>
                <div className="text-[10px] text-slate-400 mt-0.5">Rp 504.000 (58%)</div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-500"></span> Le Minerale 15L
                </div>
                <div className="font-extrabold text-sm text-slate-900">12 <span className="text-xs font-normal text-slate-400">galon</span></div>
                <div className="text-[10px] text-slate-400 mt-0.5">Rp 204.000 (25%)</div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Cleo 19L
                </div>
                <div className="font-extrabold text-sm text-slate-900">5 <span className="text-xs font-normal text-slate-400">galon</span></div>
                <div className="text-[10px] text-slate-400 mt-0.5">Rp 80.000 (10%)</div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span> Vit 19L
                </div>
                <div className="font-extrabold text-sm text-slate-900">3 <span className="text-xs font-normal text-slate-400">galon</span></div>
                <div className="text-[10px] text-slate-400 mt-0.5">Rp 45.000 (7%)</div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          
          {/* BOX STOK GALON MENIPIS (SEJAJAR DAN RAPI TANPA BANYAK BARS) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-red-50 text-red-600 rounded-xl">
                    <Droplets className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">Stok Galon Menipis</h2>
                    <p className="text-[10px] text-slate-400">Depo Pusat Kebayoran</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                  4 Variasi
                </span>
              </div>

              {/* Items List dengan layout flex rapat */}
              <div className="space-y-2.5 mt-4 text-xs">
                
                {/* Item 1 */}
                <div className="p-2.5 bg-slate-50/80 rounded-xl flex items-center justify-between gap-2 border border-slate-100">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <GalonThumb src="/aqua.png" alt="Aqua 19L" fallbackText="Aqua" />
                    <div className="truncate">
                      <h4 className="font-bold text-slate-800 text-xs truncate">Aqua 19L</h4>
                      <p className="text-[10px] text-slate-400 truncate">Isi Mineral Alami</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-red-600 bg-red-100/70 px-2.5 py-1 rounded-md whitespace-nowrap shrink-0 text-center">
                    Sisa 4 galon • Kritis
                  </span>
                </div>

                {/* Item 2 */}
                <div className="p-2.5 bg-slate-50/80 rounded-xl flex items-center justify-between gap-2 border border-slate-100">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <GalonThumb src="/leminerale.png" alt="Le Minerale 15L" fallbackText="Le M" />
                    <div className="truncate">
                      <h4 className="font-bold text-slate-800 text-xs truncate">Le Minerale 15L</h4>
                      <p className="text-[10px] text-slate-400 truncate">Galon Sekali Pakai</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-orange-600 bg-orange-100/70 px-2.5 py-1 rounded-md whitespace-nowrap shrink-0 text-center">
                    Sisa 4 galon • Batas
                  </span>
                </div>

                {/* Item 3 */}
                <div className="p-2.5 bg-slate-50/80 rounded-xl flex items-center justify-between gap-2 border border-slate-100">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <GalonThumb src="/cleo.png" alt="Cleo 19L" fallbackText="Cleo" />
                    <div className="truncate">
                      <h4 className="font-bold text-slate-800 text-xs truncate">Cleo 19L</h4>
                      <p className="text-[10px] text-slate-400 truncate">Pure Demineralized</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-red-600 bg-red-100/70 px-2.5 py-1 rounded-md whitespace-nowrap shrink-0 text-center">
                    Sisa 2 galon • Sangat Kritis
                  </span>
                </div>

                {/* Item 4 */}
                <div className="p-2.5 bg-slate-50/80 rounded-xl flex items-center justify-between gap-2 border border-slate-100">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <GalonThumb src="/vit.png" alt="Vit 19L" fallbackText="Vit" />
                    <div className="truncate">
                      <h4 className="font-bold text-slate-800 text-xs truncate">Vit 19L</h4>
                      <p className="text-[10px] text-slate-400 truncate">Air Mineral Higienis</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-red-600 bg-red-100/70 px-2.5 py-1 rounded-md whitespace-nowrap shrink-0 text-center">
                    Sisa 1 galon • Segera Habis!
                  </span>
                </div>

              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowRestokModal(true)}
              className="w-full mt-4 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-semibold py-2.5 rounded-xl shadow-sm transition active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>+ Order Restok Galon ke Pabrik</span>
            </button>
          </div>

          {/* BOX STATUS KURIR GALONKU */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Status Kurir GalonKu</h2>
                  <p className="text-[10px] text-slate-400">Armada motor beroperasi</p>
                </div>
              </div>
              {/* LINK RUTE DIPERBAIKI MENJADI /monitoring/kurir */}
              <Link
                href="/monitoring/kurir"
                className="text-[11px] font-semibold text-blue-600 hover:underline"
              >
                Kelola (6)
              </Link>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-xl flex items-center justify-between border border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center justify-center">
                    PB
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Pak Budi Santoso</h4>
                    <p className="text-[10px] text-slate-400">#ORD-8821 • Jl. Mawar No. 12</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Di Jalan
                </span>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl flex items-center justify-between border border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-700 font-bold text-[10px] flex items-center justify-center">
                    MD
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Mas Doni Wijaya</h4>
                    <p className="text-[10px] text-slate-400">#ORD-8822 • Gandaria Heights</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Di Jalan
                </span>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl flex items-center justify-between border border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px] flex items-center justify-center">
                    AG
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Pak Agus Prasetyo</h4>
                    <p className="text-[10px] text-slate-400">Siap kirim 3 galon berikutnya</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Standby Depo
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 4. TABEL LIVE ORDERS */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-6">
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-slate-900 text-base">Pesanan Terbaru Masuk (Live Orders)</h2>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Real-Time Queue
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Daftar transaksi pesanan galon yang perlu diproses dan ditugaskan ke kurir
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <button
              type="button"
              onClick={() => setOrderTab('semua')}
              className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition cursor-pointer whitespace-nowrap ${
                orderTab === 'semua' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              Semua
            </button>
            <button
              type="button"
              onClick={() => setOrderTab('ditugaskan')}
              className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition cursor-pointer whitespace-nowrap ${
                orderTab === 'ditugaskan' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              Perlu Ditugaskan (3)
            </button>
            <button
              type="button"
              onClick={() => setOrderTab('diantar')}
              className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition cursor-pointer whitespace-nowrap ${
                orderTab === 'diantar' ? 'bg-cyan-50 text-cyan-600' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              Diantar (2)
            </button>
            <button
              type="button"
              className="border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1 transition cursor-pointer ml-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Ekspor CSV</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-5">NO. ORDER &amp; TEPAT WAKTU</th>
                <th className="py-3 px-5">PELANGGAN</th>
                <th className="py-3 px-5">PRODUK GALON</th>
                <th className="py-3 px-5">TOTAL BAYAR</th>
                <th className="py-3 px-5">METODE BAYAR</th>
                <th className="py-3 px-5">STATUS PENGANTARAN</th>
                <th className="py-3 px-5 text-right">AKSI CEPAT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-4 px-5 align-top">
                    <span className="font-bold text-slate-900 block">{order.id}</span>
                    <span className="text-[10px] text-slate-400">{order.time}</span>
                  </td>

                  <td className="py-4 px-5 align-top">
                    <span className="font-bold text-slate-800 block">{order.customerName}</span>
                    <span className="text-[10px] text-slate-400 block">{order.customerPhone}</span>
                    <span className="text-[10px] text-slate-500 block line-clamp-1">{order.customerAddress}</span>
                  </td>

                  <td className="py-4 px-5 align-top">
                    <div className="flex items-center gap-1.5 font-bold text-slate-800">
                      <Droplets className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{order.product}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block ml-5">{order.productSub}</span>
                  </td>

                  <td className="py-4 px-5 align-top">
                    <span className="font-bold text-slate-900 block">{order.total}</span>
                    <span className="text-[10px] text-emerald-600 font-medium block">{order.totalSub}</span>
                  </td>

                  <td className="py-4 px-5 align-top">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-semibold">
                      {order.paymentMethod}
                    </span>
                  </td>

                  <td className="py-4 px-5 align-top">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border ${order.statusBg}`}>
                      {order.statusLabel}
                    </span>
                  </td>

                  <td className="py-4 px-5 align-top text-right">
                    {order.status === 'diproses' ? (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedOrder(order.id);
                          setShowAssignModal(true);
                        }}
                        className="bg-[#2563EB] hover:bg-blue-700 text-white text-[11px] font-semibold px-3 py-1.5 rounded-xl transition shadow-sm cursor-pointer"
                      >
                        Tugaskan Kurir
                      </button>
                    ) : (
                      /* ROUTE LINK KETAUGASKAN KURIR DIBERSIHKAN KE /monitoring/kurir */
                      <button
                        type="button"
                        onClick={() => router.push('/monitoring/kurir')}
                        className="border border-slate-200 hover:bg-slate-50 text-slate-600 text-[11px] font-semibold px-3 py-1.5 rounded-xl transition cursor-pointer"
                      >
                        Detail
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL TUGASKAN KURIR */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-slate-900 text-base">Tugaskan Kurir untuk {selectedOrder}</h3>
              <button
                type="button"
                onClick={() => setShowAssignModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowAssignModal(false);
                alert(`Order ${selectedOrder} berhasil ditugaskan!`);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">Pilih Kurir Standby</label>
                <select className="w-full border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500">
                  <option value="agus">Pak Agus Prasetyo (Standby Depo JKT-04)</option>
                  <option value="raynar">Raynar Putra M. (Standby Depo MHG-03)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Catatan Tambahan untuk Kurir</label>
                <textarea
                  placeholder="Contoh: Bawa kembalian Rp 50.000 / Naik ke lantai 3"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500 h-20"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAssignModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-sm"
                >
                  Konfirmasi Penugasan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL PESAN RESTOK PABRIK */}
      {showRestokModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-slate-900 text-base">Pesan Restok Galon ke Pabrik</h3>
              <button
                type="button"
                onClick={() => setShowRestokModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowRestokModal(false);
                alert('Order restok ke pabrik berhasil dibuat!');
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">Merek Galon</label>
                <select className="w-full border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500">
                  <option value="aqua">Aqua 19L</option>
                  <option value="leminerale">Le Minerale 15L</option>
                  <option value="cleo">Cleo 19L</option>
                  <option value="vit">Vit 19L</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Jumlah Unit Galon</label>
                <input
                  type="number"
                  defaultValue={40}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowRestokModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-sm"
                >
                  Kirim Order Restok
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </main>
  );
}