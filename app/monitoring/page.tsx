'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  Plus,
  RotateCw,
  Search,
  Users,
  Zap,
  Building2,
  Clock,
  Droplets,
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  MapPin,
  Phone,
  Truck,
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

type DeliveryStatus = 'diantar' | 'diproses' | 'selesai';
type ItemType = 'aqua' | 'le_minerale' | 'campur' | 'vit';

interface DeliveryItem {
  id: string;
  orderNo: string;
  orderNumeric: number;
  time: string;
  courierName: string;
  courierPhone: string;
  vehicle: string;
  addressTitle: string;
  customerInfo: string;
  note: string;
  itemCount: string;
  gallonQty: number;
  itemType: ItemType;
  progressPercent: number;
  progressText: string;
  etaText: string;
  etaMinutes: number;
  distanceText: string;
  status: DeliveryStatus;
  depoInfo: string;
}

// 8 Data Awal Utama
const baseDeliveries: DeliveryItem[] = [
  {
    id: '1',
    orderNo: '#ORD-8821',
    orderNumeric: 8821,
    time: '10.42 WIB',
    courierName: 'Pak Budi Santoso',
    courierPhone: '0812-4411-9021',
    vehicle: 'Honda Beat • B 4120 SZX',
    addressTitle: 'Jl. Mawar No. 12',
    customerInfo: 'Ibu Fitriani (0812-9988-xxxx)',
    note: 'Patokan: Sebelah Pos RW 03',
    itemCount: '3 Galon Aqua',
    gallonQty: 3,
    itemType: 'aqua',
    progressPercent: 75,
    progressText: '75% Selesai',
    etaText: '6 mnt lagi',
    etaMinutes: 6,
    distanceText: 'Jarak: 600m ke titik kirim',
    status: 'diantar',
    depoInfo: 'Depo JKT-04',
  },
  {
    id: '2',
    orderNo: '#ORD-8822',
    orderNumeric: 8822,
    time: '10.51 WIB',
    courierName: 'Mas Doni Wijaya',
    courierPhone: '0813-7722-8810',
    vehicle: 'Honda Vario • B 6891 PQR',
    addressTitle: 'Gandaria Heights Lt. 08 #8B',
    customerInfo: 'Bpk. Ronald (0817-2345-xxxx)',
    note: 'Titip di Lobby Resepsionis',
    itemCount: '2 Galon Le Minerale',
    gallonQty: 2,
    itemType: 'le_minerale',
    progressPercent: 45,
    progressText: '45% Selesai',
    etaText: '12 mnt lagi',
    etaMinutes: 12,
    distanceText: 'Jarak: 1.8 KM (Lampu Merah Kyai Maja)',
    status: 'diantar',
    depoInfo: 'Depo JKT-04',
  },
  {
    id: '3',
    orderNo: '#ORD-8824',
    orderNumeric: 8824,
    time: '11.02 WIB',
    courierName: 'Hendra Kurnia',
    courierPhone: '0857-9012-3341',
    vehicle: 'Honda Revo • B 5502 TYA',
    addressTitle: 'Apartemen 1Park Residences Lt. 14',
    customerInfo: 'Sdr. Kevin Hadi (0852-1100-xxxx)',
    note: 'Bawa Troli Depo',
    itemCount: '4 Galon Campur',
    gallonQty: 4,
    itemType: 'campur',
    progressPercent: 25,
    progressText: '25% Selesai',
    etaText: '15 mnt lagi',
    etaMinutes: 15,
    distanceText: 'Jarak: 2.7 KM (Baru keluar Depo)',
    status: 'diantar',
    depoInfo: 'Depo JKT-04',
  },
  {
    id: '4',
    orderNo: '#ORD-8825',
    orderNumeric: 8825,
    time: '11.15 WIB',
    courierName: 'Rian Pratama',
    courierPhone: '0812-8834-1209',
    vehicle: 'Honda Scoopy • B 3912 BKN',
    addressTitle: 'Komp. Rempoa Blok B4',
    customerInfo: 'Ibu Maya (0811-9481-xxxx)',
    note: 'Bayar COD Rp 54.000',
    itemCount: '3 Galon Aqua',
    gallonQty: 3,
    itemType: 'aqua',
    progressPercent: 20,
    progressText: 'Sedang Muat',
    etaText: '',
    etaMinutes: 25,
    distanceText: 'Persiapan berangkat',
    status: 'diproses',
    depoInfo: 'Depo JKT-04',
  },
  {
    id: '5',
    orderNo: '#ORD-8826',
    orderNumeric: 8826,
    time: '12.05 WIB',
    courierName: 'Raynar Putra M.',
    courierPhone: '0819-3321-7765',
    vehicle: 'Honda Beat • B 3434 RTA',
    addressTitle: 'Jl. Indah Megah (Araya)',
    customerInfo: 'Ibu Susi (0811-9481-xxxx)',
    note: 'Taruh di pos satpam',
    itemCount: '5 Galon Aqua',
    gallonQty: 5,
    itemType: 'aqua',
    progressPercent: 20,
    progressText: 'Sedang Muat',
    etaText: '',
    etaMinutes: 28,
    distanceText: 'Persiapan berangkat',
    status: 'diproses',
    depoInfo: 'Depo Mhg-03',
  },
  {
    id: '6',
    orderNo: '#ORD-8827',
    orderNumeric: 8827,
    time: '13.17 WIB',
    courierName: 'Tono Sani',
    courierPhone: '0852-6671-4432',
    vehicle: 'Yamaha Mio • B 5879 SFN',
    addressTitle: 'Jl. Mawar No. 12',
    customerInfo: 'Ibu Fitriani (0812-9988-xxxx)',
    note: 'Patokan: Sebelah Pos RW 03',
    itemCount: '3 Galon Aqua',
    gallonQty: 3,
    itemType: 'aqua',
    progressPercent: 20,
    progressText: 'Sedang Muat',
    etaText: '',
    etaMinutes: 30,
    distanceText: 'Persiapan berangkat',
    status: 'diproses',
    depoInfo: 'Depo JKT-05',
  },
  {
    id: '7',
    orderNo: '#ORD-8828',
    orderNumeric: 8828,
    time: '14.15 WIB',
    courierName: 'Iwan Dwi',
    courierPhone: '0813-5509-1123',
    vehicle: 'Honda Beat • B 2567 SMF',
    addressTitle: 'Gandaria Heights Lt. 08 #8B',
    customerInfo: 'Bpk. Ronald (0817-2345-xxxx)',
    note: 'Titip di Lobby Resepsionis',
    itemCount: '2 Galon Le Minerale',
    gallonQty: 2,
    itemType: 'le_minerale',
    progressPercent: 20,
    progressText: 'Sedang Muat',
    etaText: '',
    etaMinutes: 32,
    distanceText: 'Persiapan berangkat',
    status: 'diproses',
    depoInfo: 'Depo JKT-04',
  },
  {
    id: '8',
    orderNo: '#ORD-8829',
    orderNumeric: 8829,
    time: '16.00 WIB',
    courierName: 'Kevin Hadi',
    courierPhone: '0812-1098-7654',
    vehicle: 'Honda Vario • B 5678 OPQ',
    addressTitle: 'Apartemen 1Park Residences Lt. 14',
    customerInfo: 'Sdr. Jonathan C. (0852-1100-xxxx)',
    note: 'Bawa Troli Depo',
    itemCount: '4 Galon Vit',
    gallonQty: 4,
    itemType: 'vit',
    progressPercent: 20,
    progressText: 'Sedang Muat',
    etaText: '',
    etaMinutes: 35,
    distanceText: 'Persiapan berangkat',
    status: 'diproses',
    depoInfo: 'Depo JKT-06',
  },
];

// Generate tambahan 100 data pesanan (Total 108 pesanan) agar pagination multi-halaman langsung teruji
function generateExtendedDeliveries(): DeliveryItem[] {
  const couriers = [
    { name: 'Pak Budi Santoso', phone: '0812-4411-9021', vehicle: 'Honda Beat • B 4120 SZX' },
    { name: 'Mas Doni Wijaya', phone: '0813-7722-8810', vehicle: 'Honda Vario • B 6891 PQR' },
    { name: 'Hendra Kurnia', phone: '0857-9012-3341', vehicle: 'Honda Revo • B 5502 TYA' },
    { name: 'Rian Pratama', phone: '0812-8834-1209', vehicle: 'Honda Scoopy • B 3912 BKN' },
    { name: 'Raynar Putra M.', phone: '0819-3321-7765', vehicle: 'Honda Beat • B 3434 RTA' },
    { name: 'Tono Sani', phone: '0852-6671-4432', vehicle: 'Yamaha Mio • B 5879 SFN' },
  ];

  const locations = [
    { addr: 'Jl. Radio Dalam Raya No. 45', cust: 'Ibu Ratna (0812-3310-xxxx)', note: 'Ruko Lantai 1' },
    { addr: 'Perum. Pondok Indah Blok C2', cust: 'Bpk. Gunawan (0811-7721-xxxx)', note: 'Lewat gerbang selatan' },
    { addr: 'Jl. Ciputat Raya No. 18', cust: 'Warung Makan Sederhana (0813-9901-xxxx)', note: 'Bayar Tunai' },
    { addr: 'Apartemen Pakubuwono Tower B', cust: 'Sdr. Andika (0856-4412-xxxx)', note: 'Titip Concierge' },
    { addr: 'Jl. Kebayoran Lama No. 102', cust: 'Klinik Sehat Sentosa (0812-5588-xxxx)', note: 'Minta kwitansi' },
    { addr: 'Komp. Bintaro Jaya Sektor 3', cust: 'Ibu Larasati (0818-2290-xxxx)', note: 'Taruh teras depan' },
  ];

  const variants: { label: string; qty: number; type: ItemType }[] = [
    { label: '3 Galon Aqua', qty: 3, type: 'aqua' },
    { label: '2 Galon Le Minerale', qty: 2, type: 'le_minerale' },
    { label: '4 Galon Vit', qty: 4, type: 'vit' },
    { label: '5 Galon Campur', qty: 5, type: 'campur' },
  ];

  const extra: DeliveryItem[] = [];
  for (let i = 0; i < 100; i++) {
    const num = 8830 + i;
    const courier = couriers[i % couriers.length];
    const loc = locations[i % locations.length];
    const variant = variants[i % variants.length];
    const statusPool: DeliveryStatus[] = ['diantar', 'diproses', 'selesai', 'selesai'];
    const status = statusPool[i % statusPool.length];
    const hour = String(8 + (i % 10)).padStart(2, '0');
    const minute = String((i * 7) % 60).padStart(2, '0');
    const progress = status === 'selesai' ? 100 : status === 'diantar' ? 35 + (i % 50) : 20;
    const eta = 8 + (i % 20);

    extra.push({
      id: String(9 + i),
      orderNo: `#ORD-${num}`,
      orderNumeric: num,
      time: `${hour}.${minute} WIB`,
      courierName: courier.name,
      courierPhone: courier.phone,
      vehicle: courier.vehicle,
      addressTitle: loc.addr,
      customerInfo: loc.cust,
      note: loc.note,
      itemCount: variant.label,
      gallonQty: variant.qty,
      itemType: variant.type,
      progressPercent: progress,
      progressText:
        status === 'selesai'
          ? '100% Terkirim'
          : status === 'diantar'
          ? `${progress}% Selesai`
          : 'Sedang Muat',
      etaText: status === 'diantar' ? `${eta} mnt lagi` : '',
      etaMinutes: status === 'selesai' ? 999 : eta,
      distanceText:
        status === 'selesai'
          ? 'Tiba di lokasi tujuan'
          : status === 'diantar'
          ? `Jarak: ${(0.5 + (i % 4) * 0.6).toFixed(1)} KM ke titik kirim`
          : 'Persiapan berangkat',
      status,
      depoInfo: i % 2 === 0 ? 'Depo JKT-04' : 'Depo JKT-05',
    });
  }

  return [...baseDeliveries, ...extra];
}

// Helper membuat daftar nomor halaman dengan ellipsis (contoh: 1 ... 4 5 6 ... 11)
function getPaginationRange(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current <= 4) {
    return [1, 2, 3, 4, 5, 'ellipsis', total];
  }
  if (current >= total - 3) {
    return [1, 'ellipsis', total - 4, total - 3, total - 2, total - 1, total];
  }
  return [1, 'ellipsis', current - 1, current, current + 1, 'ellipsis', total];
}

export default function MonitoringPage() {
  const [deliveries, setDeliveries] = useState<DeliveryItem[]>(() => generateExtendedDeliveries());
  const [activeTab, setActiveTab] = useState<'semua' | 'jalan' | 'standby' | 'riwayat'>('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'sla' | 'terbaru' | 'muatan'>('sla');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [refreshing, setRefreshing] = useState(false);

  // Modal Tambah Armada Kurir
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCourierForm, setNewCourierForm] = useState({
    courierName: '',
    vehicle: '',
    courierPhone: '',
    depoInfo: 'Depo JKT-04',
  });

  // Modal Detail & Update Progress Pengantaran
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryItem | null>(null);

  // Toast Feedback
  const [toast, setToast] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Ambil data pengiriman & kurir dari backend (/api/couriers/orders)
  const fetchDeliveriesFromBackend = async (showNotif = false) => {
    setRefreshing(true);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const res = await fetch(`${API_URL}/couriers/orders`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (res.ok) {
        const json = await res.json();
        const rows = Array.isArray(json) ? json : json.data || [];

        if (rows.length > 0) {
          const mappedFromDb: DeliveryItem[] = rows.map((row: any, idx: number) => {
            const rawStatus = String(row.status || 'diproses').toLowerCase();
            const mappedStatus: DeliveryStatus =
              rawStatus === 'selesai'
                ? 'selesai'
                : rawStatus === 'dikirim'
                ? 'diantar'
                : 'diproses';

            const progress =
              mappedStatus === 'selesai' ? 100 : mappedStatus === 'diantar' ? 60 : 20;

            const createdDate = row.createdAt ? new Date(row.createdAt) : new Date();
            const timeStr =
              createdDate.toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
              }) + ' WIB';

            return {
              id: String(row.id),
              orderNo: `#ORD-${row.id}`,
              orderNumeric: Number(row.id) || 9000 + idx,
              time: timeStr,
              courierName: row.courierName || 'Belum Ditugaskan',
              courierPhone: row.courierPhone || '0812-0000-xxxx',
              vehicle: row.vehicle || 'Armada Motor Depo',
              addressTitle: row.address || row.shippingAddress || 'Alamat Pelanggan GalonKu',
              customerInfo: row.customerName || `Pelanggan #${row.userId || row.id}`,
              note: row.note || `Total: Rp ${Number(row.totalPrice || 0).toLocaleString('id-ID')}`,
              itemCount: `${row.totalItems || 2} Galon`,
              gallonQty: Number(row.totalItems || 2),
              itemType: 'aqua',
              progressPercent: progress,
              progressText:
                mappedStatus === 'selesai'
                  ? '100% Terkirim'
                  : mappedStatus === 'diantar'
                  ? `${progress}% Selesai`
                  : 'Sedang Muat',
              etaText: mappedStatus === 'diantar' ? '10 mnt lagi' : '',
              etaMinutes: mappedStatus === 'selesai' ? 999 : mappedStatus === 'diantar' ? 10 : 25,
              distanceText:
                mappedStatus === 'selesai'
                  ? 'Pesanan selesai diterima pelanggan'
                  : mappedStatus === 'diantar'
                  ? 'Kurir dalam perjalanan ke tujuan'
                  : 'Persiapan berangkat',
              status: mappedStatus,
              depoInfo: 'Depo JKT-04',
            };
          });

          setDeliveries([...mappedFromDb, ...generateExtendedDeliveries()]);
        }

        if (showNotif) {
          showToast('Data pengantaran berhasil disinkronkan dengan server');
        }
      } else if (showNotif) {
        showToast('Data antrean pengantaran diperbarui');
      }
    } catch {
      if (showNotif) {
        showToast('Data antrean pengantaran diperbarui');
      }
    } finally {
      setTimeout(() => setRefreshing(false), 400);
    }
  };

  useEffect(() => {
    fetchDeliveriesFromBackend(false);
  }, []);

  const handleRefreshData = () => {
    fetchDeliveriesFromBackend(true);
  };

  // Hitung Statistik Tab & KPI Secara Dinamis
  const stats = useMemo(() => {
    const activeOrders = deliveries.filter((d) => d.status !== 'selesai');
    const onTheWay = deliveries.filter((d) => d.status === 'diantar');
    const standby = deliveries.filter((d) => d.status === 'diproses');
    const history = deliveries.filter((d) => d.status === 'selesai');

    const uniqueCouriers = new Set(deliveries.map((d) => d.courierName)).size;
    const activeCouriers = new Set(onTheWay.map((d) => d.courierName)).size;
    const standbyCouriers = Math.max(0, uniqueCouriers - activeCouriers);
    const gallonsInTransit = onTheWay.reduce((sum, item) => sum + item.gallonQty, 0);

    return {
      totalActiveCount: activeOrders.length,
      onTheWayCount: onTheWay.length,
      standbyCount: standby.length,
      historyCount: history.length,
      uniqueCouriers,
      activeCouriers,
      standbyCouriers,
      gallonsInTransit,
    };
  }, [deliveries]);

  // 1. Filter Berdasarkan Tab & Pencarian
  const filteredData = useMemo(() => {
    return deliveries.filter((item) => {
      let matchTab = true;
      if (activeTab === 'semua') {
        matchTab = item.status !== 'selesai';
      } else if (activeTab === 'jalan') {
        matchTab = item.status === 'diantar';
      } else if (activeTab === 'standby') {
        matchTab = item.status === 'diproses';
      } else if (activeTab === 'riwayat') {
        matchTab = item.status === 'selesai';
      }

      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.orderNo.toLowerCase().includes(q) ||
        item.courierName.toLowerCase().includes(q) ||
        item.vehicle.toLowerCase().includes(q) ||
        item.addressTitle.toLowerCase().includes(q) ||
        item.customerInfo.toLowerCase().includes(q);

      return matchTab && matchSearch;
    });
  }, [deliveries, activeTab, searchQuery]);

  // 2. Urutkan Data Sesuai Dropdown
  const sortedData = useMemo(() => {
    const copy = [...filteredData];
    if (sortBy === 'sla') {
      copy.sort((a, b) => a.etaMinutes - b.etaMinutes);
    } else if (sortBy === 'terbaru') {
      copy.sort((a, b) => b.orderNumeric - a.orderNumeric);
    } else if (sortBy === 'muatan') {
      copy.sort((a, b) => b.gallonQty - a.gallonQty);
    }
    return copy;
  }, [filteredData, sortBy]);

  // 3. Hitung Pagination
  const totalItems = sortedData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedData = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, safeCurrentPage, itemsPerPage]);

  const startItemNumber = totalItems === 0 ? 0 : (safeCurrentPage - 1) * itemsPerPage + 1;
  const endItemNumber = Math.min(safeCurrentPage * itemsPerPage, totalItems);
  const pageNumbers = useMemo(
    () => getPaginationRange(safeCurrentPage, totalPages),
    [safeCurrentPage, totalPages]
  );

  // Reset halaman ke 1 saat filter/search/sort/perPage berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery, sortBy, itemsPerPage]);

  // Ubah Status Pengantaran (Diproses -> Diantar -> Selesai) & Sinkron ke Backend
  const handleUpdateDelivery = async (
    id: string,
    newStatus: DeliveryStatus,
    customProgress?: number
  ) => {
    setDeliveries((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const progress =
          customProgress !== undefined
            ? customProgress
            : newStatus === 'selesai'
            ? 100
            : newStatus === 'diantar'
            ? Math.max(40, item.progressPercent)
            : 20;

        const updated: DeliveryItem = {
          ...item,
          status: newStatus,
          progressPercent: progress,
          progressText:
            newStatus === 'selesai'
              ? '100% Terkirim'
              : newStatus === 'diantar'
              ? `${progress}% Selesai`
              : 'Sedang Muat',
          etaText: newStatus === 'diantar' ? item.etaText || '10 mnt lagi' : '',
          etaMinutes: newStatus === 'selesai' ? 999 : newStatus === 'diantar' ? 10 : 25,
          distanceText:
            newStatus === 'selesai'
              ? 'Pesanan selesai diterima pelanggan'
              : newStatus === 'diantar'
              ? 'Kurir dalam perjalanan ke tujuan'
              : 'Persiapan berangkat',
        };

        if (selectedDelivery?.id === id) {
          setSelectedDelivery(updated);
        }
        return updated;
      })
    );

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const backendStatus =
        newStatus === 'diantar' ? 'dikirim' : newStatus === 'selesai' ? 'selesai' : 'diproses';

      await fetch(`${API_URL}/orders/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ status: backendStatus }),
      });
    } catch {
      // Tetap lanjut jika item berasal dari data simulasi lokal
    }

    const statusLabel =
      newStatus === 'diantar' ? 'Diantar' : newStatus === 'selesai' ? 'Selesai' : 'Diproses';
    showToast(`Status pengantaran diperbarui menjadi "${statusLabel}"`);
  };

  // Tambah Armada Kurir Baru
  const handleAddCourierSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourierForm.courierName.trim() || !newCourierForm.vehicle.trim()) return;

    const nextNum =
      deliveries.reduce((max, item) => Math.max(max, item.orderNumeric), 8829) + 1;

    const newItem: DeliveryItem = {
      id: String(Date.now()),
      orderNo: `#ORD-${nextNum}`,
      orderNumeric: nextNum,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      courierName: newCourierForm.courierName.trim(),
      courierPhone: newCourierForm.courierPhone.trim() || '0812-0000-xxxx',
      vehicle: newCourierForm.vehicle.trim(),
      addressTitle: 'Siaga Antrean Depo Kebayoran',
      customerInfo: 'Menunggu Penugasan Order',
      note: 'Armada baru siap muat',
      itemCount: '3 Galon Aqua',
      gallonQty: 3,
      itemType: 'aqua',
      progressPercent: 15,
      progressText: 'Sedang Muat',
      etaText: '',
      etaMinutes: 20,
      distanceText: 'Persiapan berangkat',
      status: 'diproses',
      depoInfo: newCourierForm.depoInfo,
    };

    setDeliveries((prev) => [newItem, ...prev]);
    setNewCourierForm({
      courierName: '',
      vehicle: '',
      courierPhone: '',
      depoInfo: 'Depo JKT-04',
    });
    setIsAddModalOpen(false);
    setActiveTab('semua');
    setCurrentPage(1);
    showToast(`Armada kurir "${newItem.courierName}" berhasil ditambahkan!`);
  };

  return (
    <main className="w-full min-h-screen bg-[#F8FAFC] p-6 pt-4 text-[#131B2E] antialiased">
      {/* Toast Notifikasi */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-xl bg-[#131B2E] px-4 py-3 text-xs font-bold text-white shadow-xl">
          <CheckCircle2 size={16} className="text-[#28A745]" />
          <span>{toast}</span>
        </div>
      )}

      {/* HEADER PAGE */}
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="mb-1 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-wider text-[#0052FF]">
            <Truck size={14} />
            <span>Fleet Logistics &amp; Live Dispatch</span>
          </div>
          <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-[#131B2E]">
            Monitoring Pengantaran
          </h1>
          <p className="mt-0.5 text-xs text-[#6D768A]">
            Pelacakan armada kurir motor, status pengiriman pesanan, dan efisiensi rute depo secara langsung.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="flex cursor-pointer items-center gap-2 rounded-xl bg-[#0052FF] px-4 py-2.5 text-xs font-bold text-white shadow-sm shadow-[#0052FF]/20 transition hover:bg-[#0047DE] active:scale-95"
          >
            <Plus className="h-4 w-4" />
            <span>Tambah Armada Kurir</span>
          </button>
          <button
            type="button"
            onClick={handleRefreshData}
            className="cursor-pointer rounded-xl border border-[#EEF0F5] bg-white p-2.5 text-[#596378] shadow-xs transition hover:bg-[#F4F6FD] active:scale-95"
            title="Refresh Data"
          >
            <RotateCw className={`h-4 w-4 ${refreshing ? 'animate-spin text-[#0052FF]' : ''}`} />
          </button>
        </div>
      </div>

      {/* KPI CARDS (4 CARD SUMMARY DINAMIS) */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 */}
        <div className="flex items-center justify-between rounded-2xl border border-[#EEF0F5] bg-white p-4 shadow-xs">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#8A91A3]">
              Total Armada
            </p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-[#131B2E]">
                {stats.uniqueCouriers}
              </span>
              <span className="text-xs font-semibold text-[#69738A]">Kurir Motor</span>
            </div>
            <span className="mt-2 inline-block rounded-md bg-[#EEF0FF] px-2 py-0.5 text-[10px] font-bold text-[#0052FF]">
              Kapasitas 100% Siaga
            </span>
          </div>
          <div className="rounded-xl bg-[#DDE7FF] p-3 text-[#0052FF]">
            <Users className="h-5 w-5" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex items-center justify-between rounded-2xl border border-[#EEF0F5] bg-white p-4 shadow-xs">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#8A91A3]">
              Sedang Mengantar
            </p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-[#131B2E]">
                {stats.activeCouriers}
              </span>
              <span className="text-xs font-semibold text-[#69738A]">Kurir di Jalan</span>
            </div>
            <span className="mt-2 inline-block rounded-md bg-[#E0F7FA] px-2 py-0.5 text-[10px] font-bold text-[#087D86]">
              {stats.gallonsInTransit} Galon Sedang Dikirim
            </span>
          </div>
          <div className="rounded-xl bg-[#BCECF6] p-3 text-[#087D86]">
            <Zap className="h-5 w-5" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex items-center justify-between rounded-2xl border border-[#EEF0F5] bg-white p-4 shadow-xs">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#8A91A3]">
              Standby Depo
            </p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-[#131B2E]">
                {stats.standbyCouriers}
              </span>
              <span className="text-xs font-semibold text-[#69738A]">Siap Muat Kirim</span>
            </div>
            <span className="mt-2 inline-block rounded-md bg-[#C5F8D0]/60 px-2 py-0.5 text-[10px] font-bold text-[#16752C]">
              Idle &lt; 8 Menit
            </span>
          </div>
          <div className="rounded-xl bg-[#C5F8D0] p-3 text-[#16752C]">
            <Building2 className="h-5 w-5" />
          </div>
        </div>

        {/* Card 4 */}
        <div className="flex items-center justify-between rounded-2xl border border-[#EEF0F5] bg-white p-4 shadow-xs">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#8A91A3]">
              Rata-rata Waktu
            </p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-[#131B2E]">18</span>
              <span className="text-xs font-semibold text-[#69738A]">Menit / Pesanan</span>
            </div>
            <span className="mt-2 inline-block rounded-md bg-purple-50 px-2 py-0.5 text-[10px] font-bold text-purple-600">
              3.2 mnt lebih cepat dr SLA
            </span>
          </div>
          <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
            <Clock className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* FILTER TABS & SEARCH INPUT */}
      <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('semua')}
            className={`cursor-pointer rounded-xl px-4 py-2 text-xs font-bold transition ${
              activeTab === 'semua'
                ? 'bg-[#0052FF] text-white shadow-sm shadow-[#0052FF]/20'
                : 'border border-[#EEF0F5] bg-white text-[#596378] hover:bg-[#F4F6FD]'
            }`}
          >
            Semua Antrean ({stats.totalActiveCount})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('jalan')}
            className={`flex cursor-pointer items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition ${
              activeTab === 'jalan'
                ? 'bg-[#0052FF] text-white shadow-sm shadow-[#0052FF]/20'
                : 'border border-[#EEF0F5] bg-white text-[#596378] hover:bg-[#F4F6FD]'
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                activeTab === 'jalan' ? 'bg-white' : 'bg-[#087D86]'
              }`}
            />
            Sedang di Jalan ({stats.onTheWayCount})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('standby')}
            className={`flex cursor-pointer items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition ${
              activeTab === 'standby'
                ? 'bg-[#0052FF] text-white shadow-sm shadow-[#0052FF]/20'
                : 'border border-[#EEF0F5] bg-white text-[#596378] hover:bg-[#F4F6FD]'
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                activeTab === 'standby' ? 'bg-white' : 'bg-[#D97706]'
              }`}
            />
            Standby Muat ({stats.standbyCount})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('riwayat')}
            className={`cursor-pointer rounded-xl px-4 py-2 text-xs font-bold transition ${
              activeTab === 'riwayat'
                ? 'bg-[#0052FF] text-white shadow-sm shadow-[#0052FF]/20'
                : 'border border-[#EEF0F5] bg-white text-[#596378] hover:bg-[#F4F6FD]'
            }`}
          >
            Riwayat Selesai ({stats.historyCount})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A91A3]" />
          <input
            type="text"
            placeholder="Cari no. resi, nama kurir, plat, tujuan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-[#EEF0F5] bg-white py-2 pl-9 pr-8 text-xs text-[#131B2E] placeholder-[#8A91A3] transition focus:border-[#0052FF] focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8A91A3] hover:text-[#131B2E]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* TABEL DAFTAR PENGANTARAN AKTIF & PAGINATION */}
      <div className="overflow-hidden rounded-2xl border border-[#EEF0F5] bg-white shadow-xs">
        {/* Table Top Bar */}
        <div className="flex flex-col justify-between gap-2 border-b border-[#EEF0F5] p-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#28A745]" />
            <h2 className="text-sm font-extrabold text-[#131B2E]">
              {activeTab === 'riwayat'
                ? 'Riwayat Pengantaran Selesai'
                : 'Daftar Pengantaran Aktif'}
            </h2>
            <span className="rounded-md bg-[#EEF0FF] px-2 py-0.5 text-[10px] font-bold text-[#0052FF]">
              {totalItems} Data Ditemukan
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#69738A]">
            <span>Urutkan:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'sla' | 'terbaru' | 'muatan')}
              className="cursor-pointer rounded-lg border border-[#EEF0F5] bg-[#F8FAFC] px-2.5 py-1.5 text-xs font-bold text-[#131B2E] focus:border-[#0052FF] focus:outline-none"
            >
              <option value="sla">Estimasi Terdekat (SLA)</option>
              <option value="terbaru">Pesanan Terbaru</option>
              <option value="muatan">Muatan Terbanyak</option>
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[#EEF0F5] bg-[#F4F6FD] text-[10px] font-extrabold uppercase tracking-wider text-[#293246]">
                <th className="whitespace-nowrap px-4 py-3.5">No. Pesanan</th>
                <th className="whitespace-nowrap px-4 py-3.5">Kurir &amp; Armada</th>
                <th className="whitespace-nowrap px-4 py-3.5">Tujuan Pengiriman</th>
                <th className="whitespace-nowrap px-4 py-3.5">Muatan</th>
                <th className="whitespace-nowrap px-4 py-3.5">Progress &amp; ETA</th>
                <th className="whitespace-nowrap px-4 py-3.5">Status</th>
                <th className="whitespace-nowrap px-4 py-3.5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF0F5] text-xs">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center font-medium text-[#69738A]">
                    Tidak ada data pengiriman yang sesuai dengan filter atau pencarian.
                  </td>
                </tr>
              ) : (
                paginatedData.map((item) => (
                  <tr key={item.id} className="transition hover:bg-[#F8FAFF]">
                    {/* No. Pesanan */}
                    <td className="whitespace-nowrap px-4 py-4">
                      <p className="font-extrabold text-[#131B2E]">{item.orderNo}</p>
                      <p className="mt-0.5 text-[11px] text-[#69738A]">{item.time}</p>
                    </td>

                    {/* Kurir & Armada */}
                    <td className="whitespace-nowrap px-4 py-4">
                      <p className="font-bold text-[#131B2E]">{item.courierName}</p>
                      <p className="mt-0.5 text-[11px] text-[#69738A]">{item.vehicle}</p>
                    </td>

                    {/* Tujuan Pengiriman */}
                    <td className="px-4 py-4">
                      <p className="font-bold text-[#131B2E]">{item.addressTitle}</p>
                      <p className="mt-0.5 text-[11px] text-[#69738A]">{item.customerInfo}</p>
                      <span className="mt-1 inline-block rounded bg-[#F2F4FA] px-1.5 py-0.5 text-[10px] font-semibold text-[#596378]">
                        {item.note}
                      </span>
                    </td>

                    {/* Muatan */}
                    <td className="whitespace-nowrap px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                          item.itemType === 'aqua'
                            ? 'bg-[#DDE7FF] text-[#0052FF]'
                            : item.itemType === 'le_minerale'
                            ? 'bg-[#E0F7FA] text-[#087D86]'
                            : item.itemType === 'vit'
                            ? 'bg-[#FFE0E0] text-[#D93636]'
                            : 'bg-purple-100 text-purple-700'
                        }`}
                      >
                        <Droplets className="h-3 w-3" />
                        {item.itemCount}
                      </span>
                    </td>

                    {/* Progress & ETA */}
                    <td className="w-56 px-4 py-4">
                      <div className="mb-1 flex items-center justify-between text-[11px] font-bold">
                        <span
                          className={
                            item.status === 'selesai'
                              ? 'text-[#16752C]'
                              : item.status === 'diantar'
                              ? 'text-[#0052FF]'
                              : 'text-[#69738A]'
                          }
                        >
                          {item.progressText}
                        </span>
                        {item.etaText && (
                          <span className="text-[#131B2E]">{item.etaText}</span>
                        )}
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-[#EEF0F5]">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            item.status === 'selesai'
                              ? 'bg-[#28A745]'
                              : item.status === 'diantar'
                              ? 'bg-[#0052FF]'
                              : 'bg-[#F59E0B]'
                          }`}
                          style={{ width: `${item.progressPercent}%` }}
                        />
                      </div>
                      <p className="mt-1 text-[10px] text-[#69738A]">{item.distanceText}</p>
                    </td>

                    {/* Status */}
                    <td className="whitespace-nowrap px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                          item.status === 'diantar'
                            ? 'bg-[#E0F7FA] text-[#087D86]'
                            : item.status === 'selesai'
                            ? 'bg-[#C5F8D0] text-[#16752C]'
                            : 'bg-[#FFF3CD] text-[#B45309]'
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            item.status === 'diantar'
                              ? 'bg-[#087D86]'
                              : item.status === 'selesai'
                              ? 'bg-[#16752C]'
                              : 'bg-[#B45309]'
                          }`}
                        />
                        {item.status === 'diantar'
                          ? 'Diantar'
                          : item.status === 'selesai'
                          ? 'Selesai'
                          : 'Diproses'}
                      </span>
                      <p className="mt-1 text-[10px] font-medium text-[#8A91A3]">
                        {item.depoInfo}
                      </p>
                    </td>

                    {/* Aksi */}
                    <td className="whitespace-nowrap px-4 py-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedDelivery(item)}
                          className="cursor-pointer rounded-lg border border-[#EEF0F5] bg-white px-2.5 py-1.5 text-[11px] font-bold text-[#26334C] transition hover:border-[#0052FF] hover:text-[#0052FF]"
                        >
                          Detail
                        </button>

                        {item.status === 'diproses' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateDelivery(item.id, 'diantar', 40)}
                            className="cursor-pointer rounded-lg bg-[#0052FF] px-2.5 py-1.5 text-[11px] font-bold text-white transition hover:bg-[#0047DE]"
                          >
                            Kirim
                          </button>
                        )}

                        {item.status === 'diantar' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateDelivery(item.id, 'selesai', 100)}
                            className="cursor-pointer rounded-lg bg-[#28A745] px-2.5 py-1.5 text-[11px] font-bold text-white transition hover:bg-[#218838]"
                          >
                            Selesai
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION FOOTER */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-[#EEF0F5] bg-[#FAFBFD] px-4 py-3.5 sm:flex-row">
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#69738A]">
            <span>
              Menampilkan <strong className="text-[#131B2E]">{startItemNumber}</strong> -{' '}
              <strong className="text-[#131B2E]">{endItemNumber}</strong> dari{' '}
              <strong className="text-[#131B2E]">{totalItems}</strong> pesanan
            </span>

            <div className="flex items-center gap-1.5">
              <span>Per halaman:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="cursor-pointer rounded-lg border border-[#EEF0F5] bg-white px-2 py-1 text-xs font-bold text-[#131B2E] focus:border-[#0052FF] focus:outline-none"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={safeCurrentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-[#EEF0F5] bg-white text-[#596378] transition hover:bg-[#F4F6FD] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {pageNumbers.map((page, idx) =>
              page === 'ellipsis' ? (
                <span key={`ellipsis-${idx}`} className="px-2 text-xs text-[#8A91A3]">
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`h-8 min-w-[32px] cursor-pointer rounded-lg px-2 text-xs font-bold transition ${
                    safeCurrentPage === page
                      ? 'bg-[#0052FF] text-white shadow-xs'
                      : 'border border-[#EEF0F5] bg-white text-[#596378] hover:bg-[#F4F6FD]'
                  }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              type="button"
              disabled={safeCurrentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-[#EEF0F5] bg-white text-[#596378] transition hover:bg-[#F4F6FD] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* MODAL TAMBAH ARMADA KURIR */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-[#EEF0F5] bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between border-b border-[#EEF0F5] pb-3">
              <div>
                <h3 className="text-base font-extrabold text-[#131B2E]">
                  Tambah Armada Kurir Baru
                </h3>
                <p className="text-[11px] text-[#69738A]">
                  Daftarkan kurir motor siaga ke antrean dispatch depo
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="rounded-lg p-1.5 text-[#8A91A3] hover:bg-[#F4F6FD] hover:text-[#131B2E]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleAddCourierSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="mb-1 block font-bold text-[#293246]">Nama Lengkap Kurir</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pak Ahmad Fauzi"
                  value={newCourierForm.courierName}
                  onChange={(e) =>
                    setNewCourierForm({ ...newCourierForm, courierName: e.target.value })
                  }
                  className="w-full rounded-xl border border-[#EEF0F5] px-3.5 py-2.5 text-[#131B2E] focus:border-[#0052FF] focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block font-bold text-[#293246]">
                  Jenis Motor &amp; Plat Nomor
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Honda Beat • B 4512 KLM"
                  value={newCourierForm.vehicle}
                  onChange={(e) =>
                    setNewCourierForm({ ...newCourierForm, vehicle: e.target.value })
                  }
                  className="w-full rounded-xl border border-[#EEF0F5] px-3.5 py-2.5 text-[#131B2E] focus:border-[#0052FF] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block font-bold text-[#293246]">No. HP / WhatsApp</label>
                  <input
                    type="text"
                    placeholder="0812-xxxx-xxxx"
                    value={newCourierForm.courierPhone}
                    onChange={(e) =>
                      setNewCourierForm({ ...newCourierForm, courierPhone: e.target.value })
                    }
                    className="w-full rounded-xl border border-[#EEF0F5] px-3.5 py-2.5 text-[#131B2E] focus:border-[#0052FF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-bold text-[#293246]">Penempatan Depo</label>
                  <select
                    value={newCourierForm.depoInfo}
                    onChange={(e) =>
                      setNewCourierForm({ ...newCourierForm, depoInfo: e.target.value })
                    }
                    className="w-full rounded-xl border border-[#EEF0F5] bg-white px-3 py-2.5 font-bold text-[#131B2E] focus:border-[#0052FF] focus:outline-none"
                  >
                    <option value="Depo JKT-04">Depo JKT-04</option>
                    <option value="Depo JKT-05">Depo JKT-05</option>
                    <option value="Depo JKT-06">Depo JKT-06</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-xl border border-[#EEF0F5] px-4 py-2.5 font-bold text-[#596378] hover:bg-[#F4F6FD]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#0052FF] px-4 py-2.5 font-bold text-white shadow-sm hover:bg-[#0047DE]"
                >
                  Simpan Armada
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DETAIL PENGANTARAN */}
      {selectedDelivery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl border border-[#EEF0F5] bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between border-b border-[#EEF0F5] pb-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0052FF]">
                  Detail Pengiriman • {selectedDelivery.depoInfo}
                </span>
                <h3 className="text-lg font-extrabold text-[#131B2E]">
                  {selectedDelivery.orderNo} — {selectedDelivery.itemCount}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDelivery(null)}
                className="rounded-lg p-1.5 text-[#8A91A3] hover:bg-[#F4F6FD] hover:text-[#131B2E]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="rounded-xl bg-[#F8FAFC] p-3.5">
                <p className="text-[10px] font-extrabold uppercase text-[#8A91A3]">
                  Kurir Bertugas
                </p>
                <div className="mt-1 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-extrabold text-[#131B2E]">
                      {selectedDelivery.courierName}
                    </p>
                    <p className="text-[#69738A]">{selectedDelivery.vehicle}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1.5 font-bold text-[#0052FF] shadow-2xs">
                    <Phone className="h-3.5 w-3.5" />
                    {selectedDelivery.courierPhone}
                  </span>
                </div>
              </div>

              <div className="rounded-xl bg-[#F8FAFC] p-3.5">
                <p className="text-[10px] font-extrabold uppercase text-[#8A91A3]">
                  Alamat &amp; Penerima
                </p>
                <div className="mt-1 flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D93636]" />
                  <div>
                    <p className="font-bold text-[#131B2E]">{selectedDelivery.addressTitle}</p>
                    <p className="text-[#69738A]">{selectedDelivery.customerInfo}</p>
                    <p className="mt-1 text-[11px] font-semibold text-[#596378]">
                      Catatan: {selectedDelivery.note}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <p className="mb-2 text-[10px] font-extrabold uppercase text-[#8A91A3]">
                  Ubah Status Pengantaran
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleUpdateDelivery(selectedDelivery.id, 'diproses', 20)}
                    className={`cursor-pointer rounded-xl py-2.5 font-bold transition ${
                      selectedDelivery.status === 'diproses'
                        ? 'bg-[#F59E0B] text-white'
                        : 'border border-[#EEF0F5] bg-white text-[#596378] hover:bg-[#F4F6FD]'
                    }`}
                  >
                    Diproses
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUpdateDelivery(selectedDelivery.id, 'diantar', 65)}
                    className={`cursor-pointer rounded-xl py-2.5 font-bold transition ${
                      selectedDelivery.status === 'diantar'
                        ? 'bg-[#0052FF] text-white'
                        : 'border border-[#EEF0F5] bg-white text-[#596378] hover:bg-[#F4F6FD]'
                    }`}
                  >
                    Diantar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUpdateDelivery(selectedDelivery.id, 'selesai', 100)}
                    className={`cursor-pointer rounded-xl py-2.5 font-bold transition ${
                      selectedDelivery.status === 'selesai'
                        ? 'bg-[#28A745] text-white'
                        : 'border border-[#EEF0F5] bg-white text-[#596378] hover:bg-[#F4F6FD]'
                    }`}
                  >
                    Selesai
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}