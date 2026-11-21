'use client';

import React, { useState, useEffect, useCallback } from 'react';
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
  ChevronLeft,
  ChevronRight,
  RotateCw,
} from 'lucide-react';

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

interface OrderItem {
  rawId?: number;
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

const DEFAULT_ORDERS: OrderItem[] = [
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
    statusBg: 'bg-[#EEF2FF] text-[#4338CA] border-indigo-200',
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
    statusBg: 'bg-[#EEF2FF] text-[#4338CA] border-indigo-200',
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
];

const formatRupiah = (angka: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(angka || 0);
};

export default function ManajemenPesananPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

  const [orders, setOrders] = useState<OrderItem[]>(DEFAULT_ORDERS);
  const [isLiveConnected, setIsLiveConnected] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [activeTab, setActiveTab] = useState<'semua' | 'konfirmasi' | 'diproses' | 'diantar' | 'selesai' | 'dibatalkan'>('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGallon, setSelectedGallon] = useState('semua');
  const [selectedPayment, setSelectedPayment] = useState('semua');

  // STATE FITUR PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [selectedCourierName, setSelectedCourierName] = useState('Pak Budi K.');

  // Pemetaan data dari database ke format tabel UI
  const mapBackendOrder = (item: any): OrderItem => {
    const rawStatus = (item.status || 'pending').toLowerCase();
    let normalizedStatus = 'konfirmasi';
    let statusLabel = '• Menunggu Konfirmasi';
    let statusBg = 'bg-amber-50 text-amber-700 border-amber-200';

    if (rawStatus === 'diproses') {
      normalizedStatus = 'diproses';
      statusLabel = '• Diproses Depo';
      statusBg = 'bg-[#EEF2FF] text-[#4338CA] border-indigo-200';
    } else if (rawStatus === 'dikirim' || rawStatus === 'diantar') {
      normalizedStatus = 'diantar';
      statusLabel = '• Diantar Kurir';
      statusBg = 'bg-cyan-50 text-cyan-700 border-cyan-200';
    } else if (rawStatus === 'selesai') {
      normalizedStatus = 'selesai';
      statusLabel = '• Selesai Diterima';
      statusBg = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    } else if (rawStatus === 'dibatalkan') {
      normalizedStatus = 'dibatalkan';
      statusLabel = '• Dibatalkan';
      statusBg = 'bg-red-50 text-red-600 border-red-200';
    }

    const productName = item.productSummary || item.items?.[0]?.product?.name || 'Pesanan Galon';
    const lowerProduct = productName.toLowerCase();
    let brand = 'aqua';
    let img = '/aqua.png';
    let fb = 'Aqua';
    if (lowerProduct.includes('minerale')) {
      brand = 'leminerale';
      img = '/leminerale.png';
      fb = 'Le M';
    } else if (lowerProduct.includes('cleo')) {
      brand = 'cleo';
      img = '/cleo.png';
      fb = 'Cleo';
    } else if (lowerProduct.includes('vit')) {
      brand = 'vit';
      img = '/vit.png';
      fb = 'Vit';
    }

    const totalNominal = Number(item.totalAmount ?? item.total_amount ?? item.total_price ?? 0);
    const createdDate = item.createdAt || item.created_at;

    return {
      rawId: Number(item.id),
      id: `#ORD-${item.id}`,
      time: createdDate
        ? new Date(createdDate).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB'
        : 'Baru saja',
      customerName: item.customerName || item.user?.name || `Pelanggan #${item.userId || item.user_id || '-'}`,
      customerPhone: item.customerPhone || item.user?.phone || '0812-0000-0000',
      customerAddress: item.address || item.shippingAddress || 'Alamat terdaftar di sistem',
      product: productName,
      productNote: item.items ? `${item.items.length} item produk` : 'Refill / Galon',
      productBrand: brand,
      image: img,
      fallback: fb,
      total: formatRupiah(totalNominal),
      paymentMethod: (item.paymentMethod || item.payment_method || 'qris').toLowerCase(),
      paymentLabel: item.paymentMethod || item.payment_method || 'QRIS',
      paymentStatus: rawStatus === 'selesai' ? 'Lunas' : 'Terverifikasi',
      paymentBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      status: normalizedStatus,
      statusLabel,
      statusBg,
      courier: normalizedStatus === 'diantar' || normalizedStatus === 'selesai' ? 'Kurir Depo' : null,
      courierDetail: normalizedStatus === 'diantar' ? 'Dalam perjalanan' : normalizedStatus === 'selesai' ? 'Terkirim' : null,
    };
  };

  // Fetch data dari GET /api/orders/manage/all
  const fetchOrdersFromBackend = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (!token) {
        setIsRefreshing(false);
        return;
      }

      const res = await fetch(`${API_URL}/orders/manage/all`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const json = await res.json();
        const rawList = Array.isArray(json.data) ? json.data : [];
        if (rawList.length > 0) {
          setOrders(rawList.map(mapBackendOrder));
        }
        setIsLiveConnected(true);
      }
    } catch (error) {
      console.error('Gagal memuat data pesanan:', error);
    } finally {
      setTimeout(() => setIsRefreshing(false), 400);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchOrdersFromBackend();
  }, [fetchOrdersFromBackend]);

  // Reset ke halaman 1 jika user mengubah pencarian/filter
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedGallon, selectedPayment, activeTab]);

  // Konfirmasi Pesanan -> PATCH /api/orders/:id/status { status: 'diproses' }
  const handleConfirmOrder = async (order: OrderItem) => {
    if (order.rawId) {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/orders/${order.rawId}/status`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ status: 'diproses' }),
        });

        if (res.ok) {
          alert(`Pesanan ${order.id} berhasil dikonfirmasi!`);
          fetchOrdersFromBackend();
          return;
        }
      } catch (err) {
        console.error('Error konfirmasi pesanan:', err);
      }
    }

    setOrders((prev) =>
      prev.map((o) =>
        o.id === order.id
          ? {
              ...o,
              status: 'diproses',
              statusLabel: '• Diproses Depo',
              statusBg: 'bg-[#EEF2FF] text-[#4338CA] border-indigo-200',
            }
          : o
      )
    );
    alert(`Pesanan ${order.id} berhasil dikonfirmasi!`);
  };

  // Tugaskan Kurir -> PATCH /api/orders/:id/status { status: 'dikirim' }
  const handleAssignCourier = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    if (selectedOrder.rawId) {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/orders/${selectedOrder.rawId}/status`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ status: 'dikirim' }),
        });

        if (res.ok) {
          setShowAssignModal(false);
          alert(`Kurir ${selectedCourierName} berhasil ditugaskan untuk ${selectedOrder.id}!`);
          fetchOrdersFromBackend();
          return;
        }
      } catch (err) {
        console.error('Error tugaskan kurir:', err);
      }
    }

    setOrders((prev) =>
      prev.map((o) =>
        o.id === selectedOrder.id
          ? {
              ...o,
              status: 'diantar',
              statusLabel: '• Diantar Kurir',
              statusBg: 'bg-cyan-50 text-cyan-700 border-cyan-200',
              courier: selectedCourierName,
              courierDetail: 'Tiba ~15 mnt lagi',
            }
          : o
      )
    );
    setShowAssignModal(false);
    alert(`Kurir ${selectedCourierName} berhasil ditugaskan untuk ${selectedOrder.id}!`);
  };

  // Hitung badge tab dinamis saat API Connected
  const countAll = isLiveConnected ? orders.length : 48;
  const countKonfirmasi = isLiveConnected ? orders.filter((o) => o.status === 'konfirmasi').length : 1;
  const countDiproses = isLiveConnected ? orders.filter((o) => o.status === 'diproses').length : 2;
  const countDiantar = isLiveConnected ? orders.filter((o) => o.status === 'diantar').length : 1;
  const countSelesai = isLiveConnected ? orders.filter((o) => o.status === 'selesai').length : 43;
  const countDibatalkan = isLiveConnected ? orders.filter((o) => o.status === 'dibatalkan').length : 1;

  // Filter Data Utama
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

  // LOGIKA PEMBAGIAN HALAMAN (SLICING PAGINATION)
  const totalItems = filteredOrders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  const handleResetFilter = () => {
    setSearchQuery('');
    setSelectedGallon('semua');
    setSelectedPayment('semua');
    setActiveTab('semua');
    setCurrentPage(1);
  };

  return (
    <main className="w-full bg-[#F8FAFC] min-h-screen p-6 pt-4 font-sans text-slate-800">
      {/* 1. HEADER HALAMAN */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="text-[11px] font-bold text-blue-600 uppercase tracking-wider mb-0.5 h-4 flex items-center gap-2">
            <span>MANAJEMEN TRANSAKSI &amp; DISPATCH</span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1 normal-case">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              {isLiveConnected ? 'API Connected' : 'Local Mode'}
            </span>
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
            onClick={fetchOrdersFromBackend}
            className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold px-3.5 py-2.5 rounded-xl shadow-sm flex items-center gap-2 transition cursor-pointer"
          >
            <RotateCw className={`w-3.5 h-3.5 text-blue-600 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
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

      {/* 2. TOP KPI CARDS */}
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
              <span className="text-2xl font-bold text-slate-900">{isLiveConnected ? orders.length : 48}</span>
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
              <span className="text-2xl font-bold text-red-600">
                {isLiveConnected ? orders.filter((o) => o.status === 'konfirmasi').length : 4}
              </span>
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
              <span className="text-2xl font-bold text-slate-900">
                {isLiveConnected ? orders.filter((o) => o.status === 'diantar').length : 5}
              </span>
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

      {/* 3. TABS STATUS */}
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
            {countAll}
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
            {countKonfirmasi}
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
            {countDiproses}
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
            {countDiantar}
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
            {countSelesai}
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
            {countDibatalkan}
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

      {/* 5. TABEL UTAMA MANAJEMEN PESANAN */}
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
              {paginatedOrders.length > 0 ? (
                paginatedOrders.map((order) => (
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

                    {/* KOLOM 2: PELANGGAN & LOKASI */}
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
                        ✓ {order.paymentLabel} - {order.paymentStatus}
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
                      ) : order.status === 'konfirmasi' || order.status === 'diproses' ? (
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
                            onClick={() => handleConfirmOrder(order)}
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

        {/* FOOTER TABEL: SLIDE & CONTROL PAGINATION */}
        <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>
              Menampilkan <strong>{totalItems === 0 ? 0 : startIndex + 1}-{endIndex}</strong> dari <strong>{totalItems}</strong> pesanan
            </span>
            <span className="text-slate-300">•</span>
            <span>Baris per halaman:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-semibold focus:outline-none cursor-pointer"
            >
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>

          {/* TOMBOL-TOMBOL NAVIGASI HALAMAN */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
              <button
                key={pageNum}
                type="button"
                onClick={() => setCurrentPage(pageNum)}
                className={`w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center transition cursor-pointer ${
                  currentPage === pageNum
                    ? 'bg-[#2563EB] text-white shadow-sm'
                    : 'border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              type="button"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
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
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-500 block">Pelanggan: <strong>{selectedOrder.customerName}</strong></span>
                <span className="text-slate-500 block mt-0.5">Alamat: {selectedOrder.customerAddress}</span>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Pilih Armada Kurir</label>
                <select
                  value={selectedCourierName}
                  onChange={(e) => setSelectedCourierName(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-2.5 text-xs font-medium focus:outline-none focus:border-blue-500"
                >
                  <option value="Pak Budi K.">Pak Budi K. - Motor 01 (Siap)</option>
                  <option value="Rian Irawan">Rian Irawan - Motor 02 (Siap)</option>
                  <option value="Deni Setiawan">Deni Setiawan - Motor 03 (Standby)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAssignModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm cursor-pointer"
                >
                  Simpan &amp; Tugaskan
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
                <h3 className="font-bold text-slate-900 text-base">
                  Detail Pesanan {selectedOrder.id}
                </h3>
                <span className="text-[10px] text-slate-400">Waktu: {selectedOrder.time}</span>
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
              <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl">
                <span className="font-bold text-blue-900 block mb-1">Informasi Pelanggan</span>
                <p className="text-slate-700 font-semibold">{selectedOrder.customerName} ({selectedOrder.customerPhone})</p>
                <p className="text-slate-500 mt-0.5">{selectedOrder.customerAddress}</p>
              </div>

              <div className="border border-slate-100 rounded-xl p-3 space-y-2">
                <span className="font-bold text-slate-900 block">Item Produk</span>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-800">{selectedOrder.product}</p>
                    <p className="text-[10px] text-slate-400">{selectedOrder.productNote}</p>
                  </div>
                  <span className="font-bold text-slate-900">{selectedOrder.total}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <div>
                  <span className="text-slate-400 block text-[10px]">Metode Pembayaran</span>
                  <span className="font-semibold text-slate-700">{selectedOrder.paymentLabel} ({selectedOrder.paymentStatus})</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Kurir</span>
                  <span className="font-semibold text-slate-700">{selectedOrder.courier || '-'}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold cursor-pointer"
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