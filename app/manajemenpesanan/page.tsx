'use client';

import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Check,
  Eye,
  X,
  ShoppingBag,
  Clock,
  Truck,
  Wallet,
  Droplets,
  CreditCard,
  User,
  Printer,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

// Sub-komponen Gambar Thumbnail Galon Mini
function ProductThumb({ src, alt, fallbackText }: { src: string; alt: string; fallbackText: string }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="w-9 h-9 rounded-xl bg-blue-50/70 border border-blue-100 p-1 flex items-center justify-center shrink-0 shadow-sm">
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

// Tipe Data TypeScript untuk Pesanan
interface OrderItem {
  id: string;
  time: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  product: string;
  productNote: string;
  productBrand: string;
  image: string;
  fallback: string;
  total: string;
  paymentMethod: string;
  paymentLabel: string;
  paymentStatus: string;
  paymentBg: string;
  status: string;
  statusLabel: string;
  statusBg: string;
  courier: string | null;
  courierDetail: string | null;
}

export default function ManajemenPesananPage() {
  const [orders, setOrders] = useState<OrderItem[]>([
    {
      id: '#ORD-8824',
      time: '10:15 WIB',
      customerName: 'Fia Salsa',
      customerPhone: '0812-9844-3211',
      customerAddress: 'Kost Sakura No. 4, Lt. 2',
      product: '2x Aqua 19L Refill',
      productNote: 'Tukar Galon Kosong',
      productBrand: 'aqua',
      image: '/aqua.png',
      fallback: 'Aqua',
      total: 'Rp 36.000',
      paymentMethod: 'qris',
      paymentLabel: 'QRIS',
      paymentStatus: 'Lunas',
      paymentBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      status: 'konfirmasi',
      statusLabel: '• Menunggu Konfirmasi',
      statusBg: 'bg-amber-50 text-amber-700 border-amber-200',
      courier: null,
      courierDetail: null,
    },
    {
      id: '#ORD-8823',
      time: '10:02 WIB',
      customerName: 'Agus Setiawan',
      customerPhone: '0857-1120-9963',
      customerAddress: 'Jl. Ciputat Raya No. 188',
      product: '3x Le Minerale 15L',
      productNote: '1 Galon Baru + 2 Refill',
      productBrand: 'leminerale',
      image: '/leminerale.png',
      fallback: 'Le M',
      total: 'Rp 89.000',
      paymentMethod: 'bca',
      paymentLabel: 'BCA TF',
      paymentStatus: 'Lunas',
      paymentBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      status: 'diproses',
      statusLabel: '• Diproses Depo',
      statusBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      courier: 'Pak Budi K.',
      courierDetail: 'Motor 01 (Siap Angkut)',
    },
    {
      id: '#ORD-8822',
      time: '09:48 WIB',
      customerName: 'Dewi Anggraini',
      customerPhone: '0813-8871-0021',
      customerAddress: 'Paku Terrace Twr S-1208',
      product: '1x Aqua 19L Refill',
      productNote: 'Tukar Galon Kosong',
      productBrand: 'aqua',
      image: '/aqua.png',
      fallback: 'Aqua',
      total: 'Rp 18.000',
      paymentMethod: 'cod',
      paymentLabel: 'COD (Tunai)',
      paymentStatus: 'COD',
      paymentBg: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      status: 'diantar',
      statusLabel: '• Diantar Kurir',
      statusBg: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      courier: 'Rian Irawan',
      courierDetail: 'ETA: 8 mnt lagi',
    },
    {
      id: '#ORD-8821',
      time: '09:20 WIB',
      customerName: 'Warung Kopi Mas Jon',
      customerPhone: '0878-5544-2201',
      customerAddress: 'Jl. Teuku Nyak Arief No. 51',
      product: '5x Aqua 19L Refill',
      productNote: 'Langganan Bisnis UMKM',
      productBrand: 'aqua',
      image: '/aqua.png',
      fallback: 'Aqua',
      total: 'Rp 90.000',
      paymentMethod: 'qris',
      paymentLabel: 'QRIS',
      paymentStatus: 'Lunas',
      paymentBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      status: 'selesai',
      statusLabel: '• Selesai Diterima',
      statusBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      courier: 'Pak Budi K.',
      courierDetail: 'Diterima 09:42 WIB',
    },
    {
      id: '#ORD-8820',
      time: '08:50 WIB',
      customerName: 'Hendro Pratama',
      customerPhone: '0812-7788-3312',
      customerAddress: 'Komplek Lamigres Blok B4/12',
      product: '2x Cleo 19L',
      productNote: 'Bebas BPA Galon',
      productBrand: 'cleo',
      image: '/cleo.png',
      fallback: 'Cleo',
      total: 'Rp 34.000',
      paymentMethod: 'gopay',
      paymentLabel: 'GoPay',
      paymentStatus: 'Lunas',
      paymentBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      status: 'selesai',
      statusLabel: '• Selesai Diterima',
      statusBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      courier: 'Deni Setiawan',
      courierDetail: 'Diterima 09:18 WIB',
    },
    {
      id: '#ORD-8819',
      time: '08:35 WIB',
      customerName: 'Siti Nurhaliza',
      customerPhone: '0896-1234-9001',
      customerAddress: 'Jl. Kebayoran Lama No. 44',
      product: '1x Aqua 19L + Pompa',
      productNote: 'Beli Unit Pompa Baru',
      productBrand: 'aqua',
      image: '/aqua.png',
      fallback: 'Aqua',
      total: 'Rp 68.000',
      paymentMethod: 'bca',
      paymentLabel: 'BCA TF',
      paymentStatus: 'Lunas',
      paymentBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      status: 'diproses',
      statusLabel: '• Diproses Depo',
      statusBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      courier: null,
      courierDetail: 'Jadwalkan',
    },
    {
      id: '#ORD-8818',
      time: '08:10 WIB',
      customerName: 'Bambang Tri',
      customerPhone: '0811-9922-3112',
      customerAddress: 'Jl. Praja Raya No. 10',
      product: '2x Vit 19L Refill',
      productNote: 'Alasan: Salah input alamat',
      productBrand: 'vit',
      image: '/vit.png',
      fallback: 'Vit',
      total: 'Rp 30.000',
      paymentMethod: 'cod',
      paymentLabel: 'COD (Tunai)',
      paymentStatus: 'Refunded',
      paymentBg: 'bg-red-50 text-red-600 border-red-200',
      status: 'dibatalkan',
      statusLabel: '• Dibatalkan',
      statusBg: 'bg-red-50 text-red-600 border-red-200',
      courier: null,
      courierDetail: '-',
    },
  ]);

  const [activeTab, setActiveTab] = useState<'semua' | 'konfirmasi' | 'diproses' | 'diantar' | 'selesai' | 'dibatalkan'>('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGallon, setSelectedGallon] = useState('semua');
  const [selectedPayment, setSelectedPayment] = useState('semua');

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [selectedCourierName, setSelectedCourierName] = useState('Pak Budi Santoso');

  const handleConfirmOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            status: 'diproses',
            statusLabel: '• Diproses Depo',
            statusBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          };
        }
        return o;
      })
    );
    alert(`Pesanan ${orderId} berhasil dikonfirmasi!`);
  };

  const handleAssignCourier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === selectedOrder.id) {
          return {
            ...o,
            status: 'diantar',
            statusLabel: '• Diantar Kurir',
            statusBg: 'bg-cyan-50 text-cyan-700 border-cyan-200',
            courier: selectedCourierName,
            courierDetail: 'Tiba ~15 mnt lagi',
          };
        }
        return o;
      })
    );
    setShowAssignModal(false);
    alert(`Kurir ${selectedCourierName} berhasil ditugaskan untuk ${selectedOrder.id}!`);
  };

  const filteredOrders = orders.filter((o) => {
    let matchTab = true;
    if (activeTab === 'konfirmasi') matchTab = o.status === 'konfirmasi';
    if (activeTab === 'diproses') matchTab = o.status === 'diproses';
    if (activeTab === 'diantar') matchTab = o.status === 'diantar';
    if (activeTab === 'selesai') matchTab = o.status === 'selesai';
    if (activeTab === 'dibatalkan') matchTab = o.status === 'dibatalkan';

    let matchGallon = true;
    if (selectedGallon !== 'semua') {
      matchGallon = o.productBrand === selectedGallon;
    }

    let matchPayment = true;
    if (selectedPayment !== 'semua') {
      matchPayment = o.paymentMethod === selectedPayment;
    }

    const matchSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerPhone.includes(searchQuery) ||
      o.product.toLowerCase().includes(searchQuery.toLowerCase());

    return matchTab && matchGallon && matchPayment && matchSearch;
  });

  const handleResetFilter = () => {
    setSearchQuery('');
    setSelectedGallon('semua');
    setSelectedPayment('semua');
    setActiveTab('semua');
  };

  return (
    <main className="w-full bg-[#F8FAFC] min-h-screen p-6 pt-4 font-sans text-slate-800">
      
      {/* 1. HEADER HALAMAN */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="text-[11px] font-bold text-blue-600 uppercase tracking-wider mb-0.5 h-4 flex items-center gap-1.5">
            <span>MANAJEMEN TRANSAKSI &amp; DISPATCH</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight leading-tight">
            Manajemen Pesanan
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Kelola, verifikasi, dan pantau status transaksi pemesanan galon pelanggan secara real-time.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => alert('Mengunduh Laporan Pesanan (CSV/Excel)...')}
            className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold px-3.5 py-2.5 rounded-xl shadow-sm flex items-center gap-2 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-blue-600" />
            <span>Ekspor (CSV/Excel)</span>
          </button>
        </div>
      </div>

      {/* 2. TOP 4 KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center text-[11px]">
            <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold">
              ↗ +14% dibanding kemarin
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">PERLU KONFIRMASI</span>
              <div className="p-2.5 bg-red-50 text-red-600 rounded-xl">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-red-600">4</span>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center text-[11px]">
            <span className="text-red-600 bg-red-50 px-2 py-0.5 rounded-md font-semibold">
              ⚡ Respon &lt; 5 mnt
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">SEDANG DIANTAR</span>
              <div className="p-2.5 bg-cyan-50 text-cyan-600 rounded-xl">
                <Truck className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-slate-900">5</span>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center text-[11px]">
            <span className="text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-md font-semibold">
              🛵 4 Armada aktif
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">TOTAL OMZET TERCATAT</span>
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                <Wallet className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-1">
              <span className="text-2xl font-bold text-slate-900">Rp 864.000</span>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center text-[11px]">
            <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold">
              🛡️ 92% Lunas
            </span>
          </div>
        </div>
      </div>

      {/* 3. TABS FILTER STATUS PESANAN */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab('semua')}
          className={`text-xs font-semibold px-4 py-2 rounded-xl transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'semua'
              ? 'bg-[#2563EB] text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <span>Semua</span>
          <span className={`px-1.5 py-0.5 rounded-md text-[10px] ${activeTab === 'semua' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'}`}>
            48
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('konfirmasi')}
          className={`text-xs font-semibold px-4 py-2 rounded-xl transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'konfirmasi'
              ? 'bg-[#2563EB] text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <span>Menunggu Konfirmasi</span>
          <span className="px-1.5 py-0.5 rounded-md text-[10px] bg-red-100 text-red-600 font-bold">
            1
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('diproses')}
          className={`text-xs font-semibold px-4 py-2 rounded-xl transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'diproses'
              ? 'bg-[#2563EB] text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <span>Diproses Depo</span>
          <span className="px-1.5 py-0.5 rounded-md text-[10px] bg-slate-100 text-slate-700 font-bold">
            2
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('diantar')}
          className={`text-xs font-semibold px-4 py-2 rounded-xl transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'diantar'
              ? 'bg-[#2563EB] text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <span>Dalam Pengantaran</span>
          <span className="px-1.5 py-0.5 rounded-md text-[10px] bg-cyan-100 text-cyan-700 font-bold">
            1
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('selesai')}
          className={`text-xs font-semibold px-4 py-2 rounded-xl transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'selesai'
              ? 'bg-[#2563EB] text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <span>Selesai</span>
          <span className="px-1.5 py-0.5 rounded-md text-[10px] bg-emerald-100 text-emerald-700 font-bold">
            43
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('dibatalkan')}
          className={`text-xs font-semibold px-4 py-2 rounded-xl transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'dibatalkan'
              ? 'bg-[#2563EB] text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <span>Dibatalkan</span>
          <span className="px-1.5 py-0.5 rounded-md text-[10px] bg-slate-100 text-slate-600 font-bold">
            1
          </span>
        </button>
      </div>

      {/* 4. SEARCH & DROPDOWN FILTER BAR */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-6">
        <div className="md:col-span-5 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari berdasarkan No. Order (#ORD-...), nama..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs focus:outline-none focus:border-blue-500 shadow-sm"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        </div>

        <div className="md:col-span-3 relative">
          <select
            value={selectedGallon}
            onChange={(e) => setSelectedGallon(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-8 py-2.5 text-xs text-slate-800 font-bold focus:outline-none focus:border-blue-500 shadow-sm appearance-none cursor-pointer"
          >
            <option value="semua">Semua Galon</option>
            <option value="aqua">Aqua 19L</option>
            <option value="leminerale">Le Minerale 15L</option>
            <option value="cleo">Cleo 19L</option>
            <option value="vit">Vit 19L</option>
          </select>
          <Droplets className="w-4 h-4 text-blue-600 absolute left-3 top-3" />
        </div>

        <div className="md:col-span-3 relative">
          <select
            value={selectedPayment}
            onChange={(e) => setSelectedPayment(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-8 py-2.5 text-xs text-slate-800 font-bold focus:outline-none focus:border-blue-500 shadow-sm appearance-none cursor-pointer"
          >
            <option value="semua">Semua Pembayaran</option>
            <option value="qris">QRIS</option>
            <option value="bca">Transfer BCA</option>
            <option value="cod">COD (Tunai)</option>
            <option value="gopay">GoPay</option>
          </select>
          <CreditCard className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
        </div>

        <div className="md:col-span-1 flex items-center justify-end">
          <button
            type="button"
            onClick={handleResetFilter}
            title="Reset Semua Filter"
            className="w-full h-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl flex items-center justify-center p-2.5 shadow-sm transition cursor-pointer"
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 5. TABEL MANAJEMEN PESANAN (7 KOLOM SEPERTI WIREFRAME) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4 whitespace-nowrap">NO. ORDER &amp; WAKTU</th>
                <th className="py-3.5 px-4 whitespace-nowrap">PELANGGAN &amp; LOKASI</th>
                <th className="py-3.5 px-4 whitespace-nowrap">ITEM PESANAN</th>
                <th className="py-3.5 px-3 whitespace-nowrap">TAGIHAN &amp; BAYAR</th>
                <th className="py-3.5 px-3 whitespace-nowrap">STATUS</th>
                <th className="py-3.5 px-4 whitespace-nowrap">KURIR PENGANTAR</th>
                <th className="py-3.5 px-4 text-center whitespace-nowrap">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/80 transition">
                    
                    {/* KOLOM 1: NO. ORDER & WAKTU */}
                    <td className="py-3.5 px-4 align-top whitespace-nowrap">
                      <span
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowDetailModal(true);
                        }}
                        className="font-bold text-blue-600 text-xs hover:underline cursor-pointer block"
                      >
                        {order.id}
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{order.time}</span>
                    </td>

                    {/* KOLOM 2: PELANGGAN & LOKASI (TANPA IKON MAPS MERAH) */}
                    <td className="py-3.5 px-4 align-top">
                      <span className="font-bold text-slate-900 block text-xs">{order.customerName}</span>
                      <span className="text-[10px] text-slate-400 block">{order.customerPhone}</span>
                      <span className="text-[10px] text-slate-500 block mt-0.5 line-clamp-1 max-w-[180px]">
                        {order.customerAddress}
                      </span>
                    </td>

                    {/* KOLOM 3: ITEM PESANAN */}
                    <td className="py-3.5 px-4 align-top">
                      <div className="flex items-start gap-2.5">
                        <ProductThumb src={order.image} alt={order.product} fallbackText={order.fallback} />
                        <div className="min-w-0">
                          <span className="font-bold text-slate-800 block text-xs whitespace-nowrap">
                            {order.product}
                          </span>
                          <span className="text-[10px] text-slate-400 block whitespace-nowrap">
                            {order.productNote}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* KOLOM 4: TAGIHAN & BAYAR */}
                    <td className="py-3.5 px-3 align-top whitespace-nowrap">
                      <span className="font-bold text-slate-900 block text-xs">{order.total}</span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-bold border mt-1 ${order.paymentBg}`}>
                        ✓ {order.paymentLabel} • {order.paymentStatus}
                      </span>
                    </td>

                    {/* KOLOM 5: STATUS */}
                    <td className="py-3.5 px-3 align-top whitespace-nowrap">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border ${order.statusBg}`}>
                        {order.statusLabel}
                      </span>
                    </td>

                    {/* KOLOM 6: KURIR PENGANTAR */}
                    <td className="py-3.5 px-4 align-top whitespace-nowrap">
                      {order.courier ? (
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                            {order.courier.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <span className="font-bold text-slate-800 block text-xs">{order.courier}</span>
                            <span className="text-[10px] text-slate-400 block">{order.courierDetail}</span>
                          </div>
                        </div>
                      ) : order.status === 'konfirmasi' ? (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowAssignModal(true);
                          }}
                          className="bg-[#2563EB] hover:bg-blue-700 text-white text-[10px] font-semibold px-3 py-1.5 rounded-xl shadow-sm transition active:scale-95 cursor-pointer flex items-center gap-1"
                        >
                          <User className="w-3 h-3" />
                          <span>Tugaskan Kurir</span>
                        </button>
                      ) : (
                        <span className="text-slate-300 italic text-xs">-</span>
                      )}
                    </td>

                    {/* KOLOM 7: AKSI */}
                    <td className="py-3.5 px-4 align-top text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        {order.status === 'konfirmasi' && (
                          <button
                            type="button"
                            onClick={() => handleConfirmOrder(order.id)}
                            title="Konfirmasi Pesanan"
                            className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl transition cursor-pointer border border-blue-100"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowDetailModal(true);
                          }}
                          title="Lihat Detail Pesanan"
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition cursor-pointer border border-slate-200"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 font-medium">
                    Tidak ada pesanan yang sesuai dengan filter pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination */}
        <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>Menampilkan <strong>1-{filteredOrders.length}</strong> dari <strong>48</strong> pesanan</span>
            <span className="text-slate-300">•</span>
            <span>Baris per halaman:</span>
            <select className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-semibold focus:outline-none">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>

          <div className="flex items-center gap-1">
            <button type="button" disabled className="p-1.5 rounded-lg border border-slate-200 text-slate-300 disabled:opacity-50">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button type="button" className="w-8 h-8 rounded-lg bg-[#2563EB] text-white font-bold text-xs flex items-center justify-center">
              1
            </button>
            <button type="button" className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center">
              2
            </button>
            <button type="button" className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center">
              3
            </button>
            <span className="px-1 text-slate-400">...</span>
            <button type="button" className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center">
              5
            </button>
            <button type="button" className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* MODAL TUGASKAN KURIR */}
      {showAssignModal && selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-slate-900 text-base">
                Tugaskan Kurir untuk {selectedOrder.id}
              </h3>
              <button
                type="button"
                onClick={() => setShowAssignModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAssignCourier} className="space-y-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Pelanggan:</span>
                  <strong className="text-slate-800">{selectedOrder.customerName}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Item Pesanan:</span>
                  <strong className="text-slate-800">{selectedOrder.product}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Alamat:</span>
                  <span className="text-slate-700 text-[11px] truncate max-w-[200px]">{selectedOrder.customerAddress}</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Pilih Kurir Standby Depo</label>
                <select
                  value={selectedCourierName}
                  onChange={(e) => setSelectedCourierName(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-500 font-semibold"
                >
                  <option value="Pak Budi Santoso">Pak Budi Santoso (Motor 01 - Standby Depo)</option>
                  <option value="Mas Doni Wijaya">Mas Doni Wijaya (Motor 02 - Standby Depo)</option>
                  <option value="Pak Agus Prasetyo">Pak Agus Prasetyo (Motor 03 - Standby Depo)</option>
                  <option value="Rian Irawan">Rian Irawan (Motor 04 - Standby Depo)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Catatan Khusus Pengiriman</label>
                <textarea
                  placeholder="Contoh: Titipkan di pos satpam / Naik ke lantai 2"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500 h-20"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAssignModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#2563EB] text-white font-semibold hover:bg-blue-700 transition shadow-sm cursor-pointer"
                >
                  Konfirmasi Penugasan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DETAIL PESANAN */}
      {showDetailModal && selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <span>Detail Pesanan {selectedOrder.id}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${selectedOrder.statusBg}`}>
                    {selectedOrder.statusLabel}
                  </span>
                </h3>
                <span className="text-[11px] text-slate-400">{selectedOrder.time}</span>
              </div>
              <button
                type="button"
                onClick={() => setShowDetailModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  <span>Informasi Pelanggan</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-400 block">Nama:</span>
                    <strong className="text-slate-800">{selectedOrder.customerName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">No. HP:</span>
                    <strong className="text-slate-800">{selectedOrder.customerPhone}</strong>
                  </div>
                </div>
                <div className="pt-1 text-[11px]">
                  <span className="text-slate-400 block">Alamat Pengiriman:</span>
                  <span className="text-slate-700 font-medium">{selectedOrder.customerAddress}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
                  <Droplets className="w-3.5 h-3.5 text-blue-600" />
                  <span>Rincian Produk Galon</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-bold text-slate-800">{selectedOrder.product}</span>
                  <span className="font-bold text-slate-900">{selectedOrder.total}</span>
                </div>
                <span className="text-[10px] text-slate-400 block">{selectedOrder.productNote}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center text-[11px]">
                <div>
                  <span className="text-slate-400 block">Metode Pembayaran:</span>
                  <strong className="text-slate-800">{selectedOrder.paymentLabel}</strong>
                </div>
                <span className={`px-2.5 py-1 rounded-md font-bold text-[10px] border ${selectedOrder.paymentBg}`}>
                  {selectedOrder.paymentStatus}
                </span>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => alert('Mencetak struk transaksi...')}
                className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-slate-500" />
                <span>Cetak Struk</span>
              </button>

              <button
                type="button"
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 rounded-xl bg-[#2563EB] text-white font-semibold hover:bg-blue-700 transition cursor-pointer shadow-sm"
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