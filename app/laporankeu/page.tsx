'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  ShoppingBag,
  Wallet,
  Droplets,
  Truck,
  X,
  CheckCircle2,
} from 'lucide-react';

type GallonBrand = 'aqua' | 'leminerale' | 'cleo' | 'vit' | 'amdis';

interface OrderItemView {
  rawId?: number;
  id: string;
  time: string;
  customerName: string;
  product: string;
  brand: GallonBrand;
  qty: number;
  totalNumber: number;
  status: string;
}

type ChartRange = 'hari' | '7hari' | '30hari';

const GALLON_PRICING: Record<
  GallonBrand,
  { name: string; sellPrice: number; costPrice: number; stock: number }
> = {
  aqua: { name: 'Galon Aqua 19L', sellPrice: 20000, costPrice: 16000, stock: 50 },
  cleo: { name: 'Galon Cleo 19L', sellPrice: 19000, costPrice: 15200, stock: 50 },
  leminerale: { name: 'Galon Le Minerale 15L', sellPrice: 21000, costPrice: 16800, stock: 50 },
  vit: { name: 'Galon VIT 19L', sellPrice: 18000, costPrice: 14400, stock: 50 },
  amdis: { name: 'Galon Amdis', sellPrice: 17000, costPrice: 13600, stock: 11 },
};

const INITIAL_GALLON_STOCK =
  GALLON_PRICING.aqua.stock +
  GALLON_PRICING.cleo.stock +
  GALLON_PRICING.leminerale.stock +
  GALLON_PRICING.vit.stock +
  GALLON_PRICING.amdis.stock; // 211

const TOTAL_FLEET_COURIERS = 6;

const DEFAULT_MOCK_ORDERS: OrderItemView[] = [
  {
    id: '#ORD-8824',
    time: 'baru saja',
    customerName: 'Ria Ika',
    product: '2x Galon Aqua 19L',
    brand: 'aqua',
    qty: 2,
    totalNumber: 2 * GALLON_PRICING.aqua.sellPrice,
    status: 'diproses',
  },
  {
    id: '#ORD-8823',
    time: '5 mnt lalu',
    customerName: 'Bpk. Hendra Gunawan',
    product: '1x Galon Le Minerale 15L',
    brand: 'leminerale',
    qty: 1,
    totalNumber: 1 * GALLON_PRICING.leminerale.sellPrice,
    status: 'diantar',
  },
  {
    id: '#ORD-8822',
    time: '12 mnt lalu',
    customerName: 'Ibu Rina Kartika',
    product: '3x Galon Aqua 19L',
    brand: 'aqua',
    qty: 3,
    totalNumber: 3 * GALLON_PRICING.aqua.sellPrice,
    status: 'diantar',
  },
  {
    id: '#ORD-8821',
    time: '18 mnt lalu',
    customerName: 'Kedai Kopi Senja',
    product: '2x Galon Cleo 19L',
    brand: 'cleo',
    qty: 2,
    totalNumber: 2 * GALLON_PRICING.cleo.sellPrice,
    status: 'selesai',
  },
  {
    id: '#ORD-8820',
    time: '30 mnt lalu',
    customerName: 'Klinik Gigi Medika',
    product: '1x Galon VIT 19L',
    brand: 'vit',
    qty: 1,
    totalNumber: 1 * GALLON_PRICING.vit.sellPrice,
    status: 'selesai',
  },
];

const CHART_DATA: Record<
  ChartRange,
  {
    subtitle: string;
    badgeText: string;
    tooltipText: string;
    tooltipLeft: string;
    areaPath: string;
    linePath: string;
    peakX: number;
    peakY: number;
    secondaryX: number;
    secondaryY: number;
    bars: { x: number; y: number; h: number; color: string; opacity?: number }[];
    xLabels: { text: string; highlight?: boolean }[];
    highlights: { label: string; value: string; accent: string }[];
  }
> = {
  hari: {
    subtitle: 'Distribusi lonjakan pengantaran galon jam sibuk (08:00 - 18:00 WIB)',
    badgeText: 'Harian • Jam Kerja',
    tooltipText: '13:00 Puncak Pesanan • 9 Galon / jam • Rp 180.000',
    tooltipLeft: '36%',
    areaPath:
      'M 20 120 C 70 100, 110 80, 150 75 C 190 70, 220 20, 260 20 C 300 20, 330 110, 370 110 C 420 110, 460 50, 500 45 C 540 40, 570 30, 580 25 L 580 160 L 20 160 Z',
    linePath:
      'M 20 120 C 70 100, 110 80, 150 75 C 190 70, 220 20, 260 20 C 300 20, 330 110, 370 110 C 420 110, 460 50, 500 45 C 540 40, 570 30, 580 25',
    peakX: 260,
    peakY: 20,
    secondaryX: 500,
    secondaryY: 45,
    bars: [
      { x: 50, y: 100, h: 40, color: '#3B82F6', opacity: 0.3 },
      { x: 110, y: 80, h: 60, color: '#3B82F6', opacity: 0.4 },
      { x: 170, y: 70, h: 70, color: '#3B82F6', opacity: 0.5 },
      { x: 230, y: 25, h: 115, color: '#2563EB', opacity: 1 },
      { x: 290, y: 90, h: 50, color: '#3B82F6', opacity: 0.4 },
      { x: 350, y: 105, h: 35, color: '#3B82F6', opacity: 0.3 },
      { x: 410, y: 50, h: 90, color: '#00C49F', opacity: 0.7 },
      { x: 470, y: 40, h: 100, color: '#00C49F', opacity: 0.8 },
    ],
    xLabels: [
      { text: '08:00' },
      { text: '09:30' },
      { text: '10:00' },
      { text: '11:00' },
      { text: '12:00' },
      { text: '13:00', highlight: true },
      { text: '14:00' },
      { text: '15:00' },
      { text: '16:30' },
      { text: '17:30' },
      { text: '18:00' },
    ],
    highlights: [
      { label: 'Varian Dominan', value: 'Galon Aqua 19L Terlaris', accent: 'text-slate-800' },
      { label: 'Rute Pengiriman Cepat', value: 'Radius 2.4 KM', accent: 'text-blue-600' },
      { label: 'Pembayaran Non-Tunai', value: '82% QRIS & Transfer', accent: 'text-emerald-600' },
    ],
  },
  '7hari': {
    subtitle: 'Rekapitulasi volume galon terjual & pendapatan mingguan (Senin - Minggu)',
    badgeText: '7 Hari • Mingguan',
    tooltipText: 'Sabtu Puncak Mingguan • 64 Galon • Rp 1.280.000',
    tooltipLeft: '72%',
    areaPath:
      'M 20 135 C 95 115, 155 120, 220 88 C 290 55, 355 75, 425 42 C 490 15, 540 35, 580 30 L 580 160 L 20 160 Z',
    linePath:
      'M 20 135 C 95 115, 155 120, 220 88 C 290 55, 355 75, 425 42 C 490 15, 540 35, 580 30',
    peakX: 425,
    peakY: 42,
    secondaryX: 220,
    secondaryY: 88,
    bars: [
      { x: 55, y: 112, h: 28, color: '#3B82F6', opacity: 0.35 },
      { x: 140, y: 98, h: 42, color: '#3B82F6', opacity: 0.45 },
      { x: 225, y: 72, h: 68, color: '#3B82F6', opacity: 0.55 },
      { x: 310, y: 84, h: 56, color: '#3B82F6', opacity: 0.45 },
      { x: 395, y: 38, h: 102, color: '#00C49F', opacity: 0.8 },
      { x: 480, y: 22, h: 118, color: '#2563EB', opacity: 1 },
      { x: 555, y: 34, h: 106, color: '#00C49F', opacity: 0.75 },
    ],
    xLabels: [
      { text: 'Senin' },
      { text: 'Selasa' },
      { text: 'Rabu' },
      { text: 'Kamis' },
      { text: 'Jumat' },
      { text: 'Sabtu', highlight: true },
      { text: 'Minggu' },
    ],
    highlights: [
      { label: 'Total 7 Hari', value: '348 Galon Terkirim', accent: 'text-slate-800' },
      { label: 'Rata-rata Harian', value: '~49 Galon / Hari', accent: 'text-blue-600' },
      { label: 'Pelanggan Langganan', value: '68% Order Rutin', accent: 'text-emerald-600' },
    ],
  },
  '30hari': {
    subtitle: 'Tren pertumbuhan bulanan penjualan galon Depo JKT-04 (Minggu 1 - Minggu 4)',
    badgeText: '30 Hari • Bulanan',
    tooltipText: 'Minggu ke-4 Tertinggi • 420 Galon • Rp 8.400.000',
    tooltipLeft: '82%',
    areaPath:
      'M 20 142 C 130 125, 220 96, 330 74 C 440 52, 515 24, 580 16 L 580 160 L 20 160 Z',
    linePath:
      'M 20 142 C 130 125, 220 96, 330 74 C 440 52, 515 24, 580 16',
    peakX: 580,
    peakY: 16,
    secondaryX: 330,
    secondaryY: 74,
    bars: [
      { x: 85, y: 110, h: 30, color: '#3B82F6', opacity: 0.35 },
      { x: 245, y: 82, h: 58, color: '#3B82F6', opacity: 0.55 },
      { x: 405, y: 50, h: 90, color: '#00C49F', opacity: 0.75 },
      { x: 555, y: 20, h: 120, color: '#2563EB', opacity: 1 },
    ],
    xLabels: [
      { text: 'Minggu 1' },
      { text: 'Minggu 2' },
      { text: 'Minggu 3' },
      { text: 'Minggu 4', highlight: true },
    ],
    highlights: [
      { label: 'Akumulasi 30 Hari', value: '1.420 Galon Terjual', accent: 'text-slate-800' },
      { label: 'Pertumbuhan Bulanan', value: '+18.4% vs Bulan Lalu', accent: 'text-blue-600' },
      { label: 'Efisiensi Depo', value: '98.2% Tepat Waktu', accent: 'text-emerald-600' },
    ],
  },
};

const formatRupiah = (angka: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(angka || 0);
};

function detectBrandAndQty(
  rawText: string,
  rawQty?: number
): {
  brand: GallonBrand;
  qty: number;
  label: string;
} {
  const lower = (rawText || '').toLowerCase();
  const matchQty = rawText?.match(/(\d+)\s*x/i);
  const qty = Math.max(1, Number(rawQty || (matchQty ? matchQty[1] : 1)) || 1);

  if (lower.includes('minerale')) {
    return {
      brand: 'leminerale',
      qty,
      label: rawText || `${qty}x Galon Le Minerale 15L`,
    };
  }
  if (lower.includes('cleo')) {
    return {
      brand: 'cleo',
      qty,
      label: rawText || `${qty}x Galon Cleo 19L`,
    };
  }
  if (lower.includes('vit')) {
    return {
      brand: 'vit',
      qty,
      label: rawText || `${qty}x Galon VIT 19L`,
    };
  }
  if (lower.includes('amdis')) {
    return {
      brand: 'amdis',
      qty,
      label: rawText || `${qty}x Galon Amdis`,
    };
  }
  return {
    brand: 'aqua',
    qty,
    label: rawText || `${qty}x Galon Aqua 19L`,
  };
}

export default function RingkasanOperasionalPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  const [chartTab, setChartTab] = useState<ChartRange>('hari');
  const [orders, setOrders] = useState<OrderItemView[]>(DEFAULT_MOCK_ORDERS);
  const [activeCouriers, setActiveCouriers] = useState<number>(4);
  const [showCourierModal, setShowCourierModal] = useState(false);
  const [selectedKpiNote, setSelectedKpiNote] = useState<string | null>(null);

  const mapBackendOrder = (item: any): OrderItemView => {
    const rawStatus = (item.status || 'pending').toLowerCase();
    const createdDate = item.createdAt || item.created_at;
    const rawProduct =
      item.productSummary || item.items?.[0]?.product?.name || 'Galon Aqua 19L';
    const rawItemQty = item.items?.[0]?.quantity;
    const detected = detectBrandAndQty(rawProduct, rawItemQty);

    const rawNominal = Number(
      item.totalAmount ?? item.total_amount ?? item.total_price ?? 0
    );
    const totalNominal =
      rawNominal > 0
        ? rawNominal
        : GALLON_PRICING[detected.brand].sellPrice * detected.qty;

    return {
      rawId: Number(item.id),
      id: `#ORD-${item.id}`,
      time: createdDate
        ? new Date(createdDate).toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
          })
        : 'baru saja',
      customerName:
        item.customerName ||
        item.user?.name ||
        `Pelanggan #${item.userId || item.user_id || '-'}`,
      product: detected.label,
      brand: detected.brand,
      qty: detected.qty,
      totalNumber: totalNominal,
      status: rawStatus,
    };
  };

  const fetchBackendData = useCallback(async () => {
    try {
      const token =
        typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (!token) return;

      const ordersRes = await fetch(`${API_URL}/orders/manage/all`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (ordersRes.ok) {
        const ordersJson = await ordersRes.json();
        const rawList = Array.isArray(ordersJson.data) ? ordersJson.data : [];
        if (rawList.length > 0) {
          setOrders(rawList.map(mapBackendOrder));
        }
      }
    } catch (error) {
      console.error('Gagal mengambil data dari backend:', error);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchBackendData();
  }, [fetchBackendData]);

  const operationalMetrics = useMemo(() => {
    const validOrders = orders.filter((o) => o.status !== 'dibatalkan');

    const categoryTotals: Record<GallonBrand, { qty: number; revenue: number }> = {
      aqua: { qty: 0, revenue: 0 },
      leminerale: { qty: 0, revenue: 0 },
      cleo: { qty: 0, revenue: 0 },
      vit: { qty: 0, revenue: 0 },
      amdis: { qty: 0, revenue: 0 },
    };

    for (const ord of validOrders) {
      const unitPrice = GALLON_PRICING[ord.brand].sellPrice;
      const lineRevenue = ord.totalNumber > 0 ? ord.totalNumber : unitPrice * ord.qty;
      categoryTotals[ord.brand].qty += ord.qty;
      categoryTotals[ord.brand].revenue += lineRevenue;
    }

    const totalGalonTerjual = Object.values(categoryTotals).reduce(
      (sum, item) => sum + item.qty,
      0
    );

    const totalPendapatanAngka = Object.values(categoryTotals).reduce(
      (sum, item) => sum + item.revenue,
      0
    );

    const sisaStokGalon = Math.max(0, INITIAL_GALLON_STOCK - totalGalonTerjual);

    const pct = (val: number) =>
      totalGalonTerjual > 0 ? Math.round((val / totalGalonTerjual) * 100) : 0;

    return {
      totalGalonTerjual,
      totalPendapatan: formatRupiah(totalPendapatanAngka),
      sisaStokGalon,
      categoryTotals,
      percentages: {
        aqua: pct(categoryTotals.aqua.qty),
        leminerale: pct(categoryTotals.leminerale.qty),
        cleo: pct(categoryTotals.cleo.qty),
        vit: pct(categoryTotals.vit.qty),
        amdis: pct(categoryTotals.amdis.qty),
      },
    };
  }, [orders]);

  const activeChart = CHART_DATA[chartTab];

  return (
    <main className="w-full bg-[#F8FAFC] min-h-screen p-6 pt-4 font-sans text-slate-800">
      {/* 1. HEADER HALAMAN */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="text-[11px] font-bold text-blue-600 uppercase tracking-wider mb-0.5 h-4">
            Depo Kebayoran Lama • ID DEPO: JKT-04
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight leading-tight">
            Ringkasan Operasional
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Pantau pesanan galon terjual, pendapatan, sisa stok, dan kurir yang bertugas.
          </p>
        </div>
      </div>

      {/* BANNER INTERAKSI KPI SAAT DIKLIK */}
      {selectedKpiNote && (
        <div className="mb-4 bg-blue-50 border border-blue-200 text-blue-900 px-4 py-2.5 rounded-xl text-xs font-medium flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
            <span>{selectedKpiNote}</span>
          </div>
          <button
            type="button"
            onClick={() => setSelectedKpiNote(null)}
            className="text-blue-600 hover:text-blue-800 p-1 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 2. TOP 4 KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <button
          type="button"
          onClick={() =>
            setSelectedKpiNote(
              `Hari ini terjual ${operationalMetrics.totalGalonTerjual} galon dari ${orders.length} transaksi, menghasilkan ${operationalMetrics.totalPendapatan}.`
            )
          }
          className="text-left bg-white p-4 rounded-2xl border border-slate-100 hover:border-blue-200 shadow-sm flex flex-col justify-between transition cursor-pointer"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                TOTAL PESANAN HARI INI
              </span>
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-slate-900">
                {operationalMetrics.totalGalonTerjual}
              </span>
              <span className="text-xs font-medium text-slate-500">
                Galon Terjual
              </span>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold">
              {orders.length} order tercatat
            </span>
            <span className="text-blue-600 font-semibold">Klik detail</span>
          </div>
        </button>

        <button
          type="button"
          onClick={() =>
            setSelectedKpiNote(
              `Total pendapatan hari ini ${operationalMetrics.totalPendapatan} dari ${operationalMetrics.totalGalonTerjual} galon terjual.`
            )
          }
          className="text-left bg-white p-4 rounded-2xl border border-slate-100 hover:border-emerald-200 shadow-sm flex flex-col justify-between transition cursor-pointer"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                TOTAL PENDAPATAN
              </span>
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                <Wallet className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-1">
              <span className="text-2xl font-bold text-slate-900">
                {operationalMetrics.totalPendapatan}
              </span>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold">
              Terhitung dari {operationalMetrics.totalGalonTerjual} galon
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() =>
            setSelectedKpiNote(
              `Stok awal depo ${INITIAL_GALLON_STOCK} galon (Aqua 50, Cleo 50, Le Minerale 50, VIT 50, Amdis 11), terjual ${operationalMetrics.totalGalonTerjual} galon, tersisa ${operationalMetrics.sisaStokGalon} galon.`
            )
          }
          className="text-left bg-white p-4 rounded-2xl border border-slate-100 hover:border-amber-200 shadow-sm flex flex-col justify-between transition cursor-pointer"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                SISA STOK GALON
              </span>
              <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
                <Droplets className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-slate-900">
                {operationalMetrics.sisaStokGalon}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                / {INITIAL_GALLON_STOCK} Galon
              </span>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-600 font-medium">
              Terjual {operationalMetrics.totalGalonTerjual} galon hari ini
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setShowCourierModal(true)}
          className="text-left bg-white p-4 rounded-2xl border border-slate-100 hover:border-cyan-200 shadow-sm flex flex-col justify-between transition cursor-pointer"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                KURIR BERTUGAS
              </span>
              <div className="p-2.5 bg-cyan-50 text-cyan-600 rounded-xl">
                <Truck className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-bold text-slate-900">
                {activeCouriers}
              </span>
              <span className="text-sm font-semibold text-slate-400">
                / {TOTAL_FLEET_COURIERS}
              </span>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px]">
            <span className="text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-md font-semibold">
              {activeCouriers} kurir aktif bertugas
            </span>
            <span className="text-cyan-700 font-semibold">Atur</span>
          </div>
        </button>
      </div>

      {/* 3. GRAFIK TREN */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">
                Grafik Tren Pesanan &amp; Pendapatan
              </h2>
              <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                {activeChart.badgeText}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {activeChart.subtitle}
            </p>
          </div>

          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setChartTab('hari')}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition cursor-pointer ${
                chartTab === 'hari'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Hari Ini
            </button>
            <button
              type="button"
              onClick={() => setChartTab('7hari')}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition cursor-pointer ${
                chartTab === '7hari'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              7 Hari
            </button>
            <button
              type="button"
              onClick={() => setChartTab('30hari')}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition cursor-pointer ${
                chartTab === '30hari'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              30 Hari
            </button>
          </div>
        </div>

        <div className="relative w-full h-[220px] pt-6">
          <div
            style={{ left: activeChart.tooltipLeft }}
            className="absolute top-1 -translate-x-1/2 bg-[#1E293B] text-white text-[10px] font-medium px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5 z-10 whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            <span>{activeChart.tooltipText}</span>
          </div>

          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 600 160"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id="areaGradientRange"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            <path d={activeChart.areaPath} fill="url(#areaGradientRange)" />

            {activeChart.bars.map((bar, idx) => (
              <rect
                key={`${chartTab}-bar-${idx}`}
                x={bar.x}
                y={bar.y}
                width="10"
                height={bar.h}
                fill={bar.color}
                opacity={bar.opacity ?? 0.6}
                rx="3"
              />
            ))}

            <path
              d={activeChart.linePath}
              fill="none"
              stroke="#2563EB"
              strokeWidth="3"
            />

            <circle
              cx={activeChart.peakX}
              cy={activeChart.peakY}
              r="4.5"
              fill="#2563EB"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
            <circle
              cx={activeChart.secondaryX}
              cy={activeChart.secondaryY}
              r="4.5"
              fill="#2563EB"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
          </svg>

          <div className="flex justify-between text-[10px] font-semibold text-slate-400 mt-2 px-1">
            {activeChart.xLabels.map((lbl) => (
              <span
                key={`${chartTab}-${lbl.text}`}
                className={lbl.highlight ? 'font-bold text-blue-600' : ''}
              >
                {lbl.text}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 pt-4 border-t border-slate-100 text-xs">
          {activeChart.highlights.map((item) => (
            <div key={item.label} className="bg-slate-50 p-3 rounded-xl">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">
                {item.label}
              </span>
              <span className={`font-bold ${item.accent}`}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. RINGKASAN KATEGORI GALON TERJUAL HARI INI */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Ringkasan Kategori Galon Terjual Hari Ini
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Total akumulasi {operationalMetrics.totalGalonTerjual} galon terjual dari 5 varian depo
            </p>
          </div>
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
            {operationalMetrics.totalPendapatan}
          </span>
        </div>

        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex mb-4">
          <div
            className="h-full bg-blue-600 transition-all"
            style={{ width: `${operationalMetrics.percentages.aqua}%` }}
          ></div>
          <div
            className="h-full bg-cyan-500 transition-all"
            style={{ width: `${operationalMetrics.percentages.leminerale}%` }}
          ></div>
          <div
            className="h-full bg-emerald-500 transition-all"
            style={{ width: `${operationalMetrics.percentages.cleo}%` }}
          ></div>
          <div
            className="h-full bg-amber-500 transition-all"
            style={{ width: `${operationalMetrics.percentages.vit}%` }}
          ></div>
          <div
            className="h-full bg-rose-500 transition-all"
            style={{ width: `${operationalMetrics.percentages.amdis}%` }}
          ></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span> Galon Aqua 19L
            </div>
            <div className="font-extrabold text-sm text-slate-900">
              {operationalMetrics.categoryTotals.aqua.qty}{' '}
              <span className="text-xs font-normal text-slate-400">galon</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {formatRupiah(operationalMetrics.categoryTotals.aqua.revenue)} (
              {operationalMetrics.percentages.aqua}%)
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
              <span className="w-2 h-2 rounded-full bg-cyan-500"></span> Galon Le Minerale 15L
            </div>
            <div className="font-extrabold text-sm text-slate-900">
              {operationalMetrics.categoryTotals.leminerale.qty}{' '}
              <span className="text-xs font-normal text-slate-400">galon</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {formatRupiah(operationalMetrics.categoryTotals.leminerale.revenue)} (
              {operationalMetrics.percentages.leminerale}%)
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Galon Cleo 19L
            </div>
            <div className="font-extrabold text-sm text-slate-900">
              {operationalMetrics.categoryTotals.cleo.qty}{' '}
              <span className="text-xs font-normal text-slate-400">galon</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {formatRupiah(operationalMetrics.categoryTotals.cleo.revenue)} (
              {operationalMetrics.percentages.cleo}%)
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span> Galon VIT 19L
            </div>
            <div className="font-extrabold text-sm text-slate-900">
              {operationalMetrics.categoryTotals.vit.qty}{' '}
              <span className="text-xs font-normal text-slate-400">galon</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {formatRupiah(operationalMetrics.categoryTotals.vit.revenue)} (
              {operationalMetrics.percentages.vit}%)
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span> Galon Amdis
            </div>
            <div className="font-extrabold text-sm text-slate-900">
              {operationalMetrics.categoryTotals.amdis.qty}{' '}
              <span className="text-xs font-normal text-slate-400">galon</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {formatRupiah(operationalMetrics.categoryTotals.amdis.revenue)} (
              {operationalMetrics.percentages.amdis}%)
            </div>
          </div>
        </div>
      </div>

      {/* MODAL ATUR KURIR BERTUGAS */}
      {showCourierModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-slate-900 text-sm">
                Atur Kurir Bertugas
              </h3>
              <button
                type="button"
                onClick={() => setShowCourierModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500 mb-3">
              Pilih jumlah kurir yang sedang bertugas dari total {TOTAL_FLEET_COURIERS} armada depo:
            </p>

            <div className="grid grid-cols-3 gap-2 mb-4">
              {[2, 3, 4, 5, 6].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => {
                    setActiveCouriers(num);
                    setShowCourierModal(false);
                  }}
                  className={`py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    activeCouriers === num
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {num} / {TOTAL_FLEET_COURIERS} Kurir
                </button>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowCourierModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 cursor-pointer"
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