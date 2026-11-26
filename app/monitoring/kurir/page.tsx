'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  Plus,
  Search,
  Users,
  Zap,
  Building2,
  Phone,
  CheckCircle2,
  X,
  MessageSquare,
  Send,
  ChevronLeft,
  ChevronRight,
  PackageCheck,
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const MONITORING_DELIVERIES_KEY = 'galonku_monitoring_deliveries';

type CourierStatus = 'jalan' | 'standby';
type CourierSubType = 'di_jalan' | 'muat_barang' | 'standby';

interface MonitoringOrderOption {
  id: string;
  orderNo: string;
  customerInfo: string;
  addressTitle: string;
  itemCount: string;
  gallonQty: number;
  note: string;
  status: 'diantar' | 'diproses' | 'selesai';
  courierName?: string;
}

interface CourierItem {
  id: string;
  name: string;
  phone: string;
  initials: string;
  avatarBg: string;
  motor: string;
  plat: string;
  status: CourierStatus;
  statusBadge: string;
  statusBadgeStyle: string;
  assignedDeliveryId?: string;
  orderId?: string;
  desc: string;
  gallonCount: number;
  finishedCount: number;
  departTime?: string;
  location?: string;
  idleTime?: string;
  kloter?: string;
  type: CourierSubType;
}

const initialCouriers: CourierItem[] = [
  {
    id: '1',
    name: 'Pak Budi Santoso',
    phone: '0812-4411-9021',
    initials: 'BS',
    avatarBg: 'bg-blue-100 text-blue-700',
    motor: 'Honda Beat',
    plat: 'B 4120 SZX',
    status: 'jalan',
    statusBadge: 'Di Jalan',
    statusBadgeStyle: 'text-emerald-600 bg-emerald-50',
    assignedDeliveryId: '1',
    orderId: '#ORD-8821',
    desc: 'Membawa 3 Galon Aqua ke Jl. Mawar No. 12 (Ibu Fitriani)',
    gallonCount: 3,
    finishedCount: 7,
    departTime: '10:42 WIB',
    kloter: 'Kloter Selatan (Kebayoran)',
    type: 'di_jalan',
  },
  {
    id: '2',
    name: 'Mas Doni Wijaya',
    phone: '0813-7722-8810',
    initials: 'DW',
    avatarBg: 'bg-cyan-100 text-cyan-700',
    motor: 'Honda Vario',
    plat: 'B 6891 PQR',
    status: 'jalan',
    statusBadge: 'Di Jalan',
    statusBadgeStyle: 'text-emerald-600 bg-emerald-50',
    assignedDeliveryId: '2',
    orderId: '#ORD-8822',
    desc: 'Membawa 2 Galon Le Minerale ke Gandaria Heights Lt. 08',
    gallonCount: 2,
    finishedCount: 5,
    departTime: '10:51 WIB',
    kloter: 'Kloter Barat (Gandaria)',
    type: 'di_jalan',
  },
  {
    id: '3',
    name: 'Hendra Kurnia',
    phone: '0857-9012-3341',
    initials: 'HK',
    avatarBg: 'bg-indigo-100 text-indigo-700',
    motor: 'Honda Revo',
    plat: 'B 5502 TYA',
    status: 'jalan',
    statusBadge: 'Di Jalan',
    statusBadgeStyle: 'text-emerald-600 bg-emerald-50',
    assignedDeliveryId: '3',
    orderId: '#ORD-8824',
    desc: 'Membawa 4 Galon Campur ke 1Park Residences Lt. 14',
    gallonCount: 4,
    finishedCount: 6,
    departTime: '11:02 WIB',
    kloter: 'Kloter Barat (Gandaria)',
    type: 'di_jalan',
  },
  {
    id: '4',
    name: 'Rian Pratama',
    phone: '0812-8834-1209',
    initials: 'RP',
    avatarBg: 'bg-amber-100 text-amber-700',
    motor: 'Honda Scoopy',
    plat: 'B 3912 BKN',
    status: 'jalan',
    statusBadge: 'Muat Barang',
    statusBadgeStyle: 'text-amber-700 bg-amber-50',
    assignedDeliveryId: '4',
    orderId: '#ORD-8825',
    desc: 'Sedang muat 3 Galon Aqua (COD Rp 54.000) di Depo JKT-04',
    gallonCount: 3,
    finishedCount: 4,
    departTime: 'Jadwal: 11:15 WIB',
    kloter: 'Kloter Selatan (Kebayoran)',
    type: 'muat_barang',
  },
  {
    id: '5',
    name: 'Pak Agus Prasetyo',
    phone: '0819-3321-7765',
    initials: 'AP',
    avatarBg: 'bg-emerald-100 text-emerald-700',
    motor: 'Honda Supra X',
    plat: 'B 4991 TKL',
    status: 'standby',
    statusBadge: 'Standby Depo',
    statusBadgeStyle: 'text-emerald-700 bg-emerald-50',
    location: 'Posisi: Depo Utama JKT',
    idleTime: 'Siaga Depo',
    desc: 'Armada kosong, siap menerima alokasi antrean pengantaran baru ke radius 4 KM.',
    gallonCount: 0,
    finishedCount: 8,
    kloter: 'Kloter Timur & Depo Siaga',
    type: 'standby',
  },
  {
    id: '6',
    name: 'Raynar Putra M.',
    phone: '0852-6671-4432',
    initials: 'RM',
    avatarBg: 'bg-purple-100 text-purple-700',
    motor: 'Honda Beat',
    plat: 'B 3434 RTA',
    status: 'standby',
    statusBadge: 'Standby Depo',
    statusBadgeStyle: 'text-emerald-700 bg-emerald-50',
    location: 'Posisi: Depo Cabang Mhg-03',
    idleTime: 'Siaga Depo',
    desc: 'Baru saja menyelesaikan trip order #ORD-8820. Siap menerima jadwal pengantaran berikutnya.',
    gallonCount: 0,
    finishedCount: 5,
    kloter: 'Kloter Timur & Depo Siaga',
    type: 'standby',
  },
];

const fallbackMonitoringOrders: MonitoringOrderOption[] = [
  {
    id: '5',
    orderNo: '#ORD-8826',
    customerInfo: 'Ibu Susi (0811-9481-xxxx)',
    addressTitle: 'Jl. Indah Megah (Araya)',
    itemCount: '5 Galon Aqua',
    gallonQty: 5,
    note: 'Taruh di pos satpam',
    status: 'diproses',
  },
  {
    id: '6',
    orderNo: '#ORD-8827',
    customerInfo: 'Ibu Fitriani (0812-9988-xxxx)',
    addressTitle: 'Jl. Mawar No. 12',
    itemCount: '3 Galon Aqua',
    gallonQty: 3,
    note: 'Patokan: Sebelah Pos RW 03',
    status: 'diproses',
  },
  {
    id: '7',
    orderNo: '#ORD-8828',
    customerInfo: 'Bpk. Ronald (0817-2345-xxxx)',
    addressTitle: 'Gandaria Heights Lt. 08 #8B',
    itemCount: '2 Galon Le Minerale',
    gallonQty: 2,
    note: 'Titip di Lobby Resepsionis',
    status: 'diproses',
  },
  {
    id: '8',
    orderNo: '#ORD-8829',
    customerInfo: 'Sdr. Jonathan C. (0852-1100-xxxx)',
    addressTitle: 'Apartemen 1Park Residences Lt. 14',
    itemCount: '4 Galon Vit',
    gallonQty: 4,
    note: 'Bawa Troli Depo',
    status: 'diproses',
  },
];

const avatarColors = [
  'bg-blue-100 text-blue-700',
  'bg-cyan-100 text-cyan-700',
  'bg-indigo-100 text-indigo-700',
  'bg-emerald-100 text-emerald-700',
  'bg-purple-100 text-purple-700',
  'bg-amber-100 text-amber-700',
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function KurirLapanganPage() {
  const [couriers, setCouriers] = useState<CourierItem[]>(initialCouriers);
  const [monitoringQueue, setMonitoringQueue] = useState<MonitoringOrderOption[]>(
    fallbackMonitoringOrders
  );
  const [activeTab, setActiveTab] = useState<'semua' | 'jalan' | 'standby'>('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Modals State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [contactCourier, setContactCourier] = useState<CourierItem | null>(null);
  const [assignCourier, setAssignCourier] = useState<CourierItem | null>(null);
  const [detailCourier, setDetailCourier] = useState<CourierItem | null>(null);

  // Form Tambah Armada Kurir
  const [newCourierForm, setNewCourierForm] = useState({
    name: '',
    phone: '',
    motor: 'Honda Beat',
    plat: '',
    location: 'Posisi: Depo Utama JKT',
    kloter: 'Kloter Timur & Depo Siaga',
  });

  // Form Kirim Pesan ke Kurir
  const [dispatchMessage, setDispatchMessage] = useState('');

  // Pilihan antrean dari Monitoring Pengantaran
  const [selectedMonitoringOrderId, setSelectedMonitoringOrderId] = useState<string>('');

  // Toast Notification
  const [toast, setToast] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  };

  // Ambil daftar antrean pengantaran yang siap kirim (status === 'diproses') dari Monitoring Pengantaran
  const loadMonitoringQueue = () => {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem(MONITORING_DELIVERIES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const readyToShip = parsed.filter((item: any) => item.status === 'diproses');
          setMonitoringQueue(readyToShip);
          return;
        }
      }
    } catch {}
    setMonitoringQueue(fallbackMonitoringOrders);
  };

  useEffect(() => {
    loadMonitoringQueue();
    window.addEventListener('storage', loadMonitoringQueue);
    window.addEventListener('galonku-monitoring-updated', loadMonitoringQueue);
    return () => {
      window.removeEventListener('storage', loadMonitoringQueue);
      window.removeEventListener('galonku-monitoring-updated', loadMonitoringQueue);
    };
  }, []);

  // Sinkronkan penugasan & status selesai kembali ke Monitoring Pengantaran
  const syncOrderBackToMonitoring = (
    deliveryId: string | undefined,
    orderNo: string | undefined,
    newStatus: 'diproses' | 'diantar' | 'selesai',
    courier?: CourierItem
  ) => {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem(MONITORING_DELIVERIES_KEY);
      if (!saved) return;
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return;

      const updatedList = parsed.map((item: any) => {
        const isMatch =
          (deliveryId && String(item.id) === String(deliveryId)) ||
          (orderNo && item.orderNo === orderNo);
        if (!isMatch) return item;
        return {
          ...item,
          status: newStatus,
          courierName: courier ? courier.name : item.courierName,
          courierPhone: courier ? courier.phone : item.courierPhone,
          vehicle: courier ? `${courier.motor} • ${courier.plat}` : item.vehicle,
        };
      });

      localStorage.setItem(MONITORING_DELIVERIES_KEY, JSON.stringify(updatedList));
      window.dispatchEvent(new CustomEvent('galonku-courier-assigned', { detail: updatedList }));
      loadMonitoringQueue();
    } catch {}
  };

  // Sinkronisasi data kurir dengan backend (/api/couriers)
  const fetchCouriersFromBackend = async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const res = await fetch(`${API_URL}/couriers`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (res.ok) {
        const json = await res.json();
        const rows = Array.isArray(json) ? json : json.data || [];

        if (rows.length > 0) {
          const mappedCouriers: CourierItem[] = rows.map((row: any, idx: number) => {
            const rawStatus = String(row.status || 'aktif').toLowerCase();
            const isOnRoad =
              rawStatus === 'mengantar' ||
              rawStatus === 'jalan' ||
              Number(row.activeOrders || 0) > 0;

            return {
              id: `db-${row.id}`,
              name: row.name || `Kurir #${row.id}`,
              phone: row.phone || '0812-0000-1122',
              initials: getInitials(row.name || `K${row.id}`),
              avatarBg: avatarColors[idx % avatarColors.length],
              motor: row.vehicle || row.motor || 'Honda Beat',
              plat: row.plateNumber || row.plat || `B ${4100 + idx} GLN`,
              status: isOnRoad ? 'jalan' : 'standby',
              statusBadge: isOnRoad ? 'Di Jalan' : 'Standby Depo',
              statusBadgeStyle: isOnRoad
                ? 'text-emerald-600 bg-emerald-50'
                : 'text-emerald-700 bg-emerald-50',
              orderId: isOnRoad ? `#ORD-${8820 + Number(row.id)}` : undefined,
              desc: isOnRoad
                ? `Sedang mengantar ${row.activeOrders || 1} pesanan aktif dari Depo JKT-04`
                : 'Armada siaga di Depo Utama, siap menerima penugasan pengantaran.',
              location: !isOnRoad ? 'Posisi: Depo Utama JKT' : undefined,
              idleTime: !isOnRoad ? 'Siaga Depo' : undefined,
              gallonCount: isOnRoad ? Number(row.activeOrders || 1) * 3 : 0,
              finishedCount: Number(row.completedOrders || 5 + idx),
              departTime: isOnRoad ? 'Aktif Hari Ini' : undefined,
              kloter: 'Kloter Selatan (Kebayoran)',
              type: isOnRoad ? 'di_jalan' : 'standby',
            };
          });

          setCouriers([...mappedCouriers, ...initialCouriers]);
        }
      }
    } catch {}
  };

  useEffect(() => {
    fetchCouriersFromBackend();
  }, []);

  const syncCourierStatus = async (courierId: string, status: 'aktif' | 'mengantar' | 'offline') => {
    try {
      const cleanId = courierId.replace(/^db-/, '');
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      await fetch(`${API_URL}/couriers/${cleanId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ status }),
      });
    } catch {}
  };

  // 3 KPI Dinamis & Responsif
  const kpi = useMemo(() => {
    const total = couriers.length;
    const onRoadList = couriers.filter((c) => c.status === 'jalan');
    const standbyList = couriers.filter((c) => c.status === 'standby');
    const totalGallons = onRoadList.reduce((acc, c) => acc + c.gallonCount, 0);

    return {
      total,
      onRoadCount: onRoadList.length,
      standbyCount: standbyList.length,
      totalGallons,
    };
  }, [couriers]);

  // Filter daftar antrean: HANYA yang statusnya 'diproses' (siap kirim) dan belum ditugaskan ke kurir manapun
  const availableQueueOrders = useMemo(() => {
    const activeAssignedIds = new Set(
      couriers
        .filter((c) => c.status === 'jalan' && c.assignedDeliveryId)
        .map((c) => String(c.assignedDeliveryId))
    );
    const activeAssignedOrderNos = new Set(
      couriers
        .filter((c) => c.status === 'jalan' && c.orderId)
        .map((c) => c.orderId)
    );

    return monitoringQueue.filter(
      (o) =>
        o.status === 'diproses' &&
        !activeAssignedIds.has(String(o.id)) &&
        !activeAssignedOrderNos.has(o.orderNo)
    );
  }, [monitoringQueue, couriers]);

  // Filter Kurir
  const filteredCouriers = useMemo(() => {
    return couriers.filter((courier) => {
      let matchTab = true;
      if (activeTab === 'jalan') matchTab = courier.status === 'jalan';
      if (activeTab === 'standby') matchTab = courier.status === 'standby';

      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        courier.name.toLowerCase().includes(q) ||
        courier.plat.toLowerCase().includes(q) ||
        courier.motor.toLowerCase().includes(q) ||
        (courier.orderId && courier.orderId.toLowerCase().includes(q));

      return matchTab && matchSearch;
    });
  }, [couriers, activeTab, searchQuery]);

  // Pagination Grid
  const totalPages = Math.max(1, Math.ceil(filteredCouriers.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedCouriers = useMemo(() => {
    const start = (safePage - 1) * itemsPerPage;
    return filteredCouriers.slice(start, start + itemsPerPage);
  }, [filteredCouriers, safePage]);

  // Aksi 1: Tambah Armada Kurir Baru
  const handleAddCourier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourierForm.name.trim() || !newCourierForm.plat.trim()) return;

    const newCourier: CourierItem = {
      id: String(Date.now()),
      name: newCourierForm.name.trim(),
      phone: newCourierForm.phone.trim() || '0812-0000-1122',
      initials: getInitials(newCourierForm.name),
      avatarBg: avatarColors[couriers.length % avatarColors.length],
      motor: newCourierForm.motor.trim() || 'Honda Beat',
      plat: newCourierForm.plat.trim().toUpperCase(),
      status: 'standby',
      statusBadge: 'Standby Depo',
      statusBadgeStyle: 'text-emerald-700 bg-emerald-50',
      location: newCourierForm.location,
      idleTime: 'Baru Siaga',
      desc: 'Armada baru terdaftar dan siap menerima alokasi pengantaran galon hari ini.',
      gallonCount: 0,
      finishedCount: 0,
      kloter: newCourierForm.kloter,
      type: 'standby',
    };

    setCouriers((prev) => [newCourier, ...prev]);
    setNewCourierForm({
      name: '',
      phone: '',
      motor: 'Honda Beat',
      plat: '',
      location: 'Posisi: Depo Utama JKT',
      kloter: 'Kloter Timur & Depo Siaga',
    });
    setIsAddModalOpen(false);
    setActiveTab('semua');
    setCurrentPage(1);
    showToast(`Armada "${newCourier.name}" berhasil ditambahkan!`);
  };

  // Aksi 2: Buka Modal Tugaskan Pesanan (Hanya menampilkan order yang siap dikirim)
  const handleOpenAssignModal = (courier: CourierItem) => {
    loadMonitoringQueue();
    setAssignCourier(courier);

    const activeAssignedIds = new Set(
      couriers
        .filter((c) => c.status === 'jalan' && c.assignedDeliveryId)
        .map((c) => String(c.assignedDeliveryId))
    );
    const activeAssignedOrderNos = new Set(
      couriers
        .filter((c) => c.status === 'jalan' && c.orderId)
        .map((c) => c.orderId)
    );

    const readyOrders = monitoringQueue.filter(
      (o) =>
        o.status === 'diproses' &&
        !activeAssignedIds.has(String(o.id)) &&
        !activeAssignedOrderNos.has(o.orderNo)
    );

    setSelectedMonitoringOrderId(readyOrders.length > 0 ? String(readyOrders[0].id) : '');
  };

  // Aksi 3: Tugaskan Sekarang -> Masuk status Muat Barang & muncul tombol Konfirmasi Berangkat
  const handleAssignOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignCourier || !selectedMonitoringOrderId) return;

    const selectedOrder = availableQueueOrders.find(
      (o) => String(o.id) === String(selectedMonitoringOrderId)
    );
    if (!selectedOrder) return;

    const nowTime =
      new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';

    const updatedCourier: CourierItem = {
      ...assignCourier,
      status: 'jalan',
      type: 'muat_barang',
      statusBadge: 'Muat Barang',
      statusBadgeStyle: 'text-amber-700 bg-amber-50',
      assignedDeliveryId: selectedOrder.id,
      orderId: selectedOrder.orderNo,
      desc: `Sedang muat ${selectedOrder.itemCount} untuk ${selectedOrder.addressTitle} (${selectedOrder.customerInfo})`,
      gallonCount: selectedOrder.gallonQty,
      departTime: `Jadwal: ${nowTime}`,
    };

    setCouriers((prev) =>
      prev.map((c) => (c.id === assignCourier.id ? updatedCourier : c))
    );

    await syncCourierStatus(assignCourier.id, 'mengantar');
    syncOrderBackToMonitoring(
      selectedOrder.id,
      selectedOrder.orderNo,
      'diproses',
      updatedCourier
    );

    showToast(`Order ${selectedOrder.orderNo} ditugaskan ke ${assignCourier.name}!`);
    setAssignCourier(null);
  };

  // Aksi 4: Konfirmasi Berangkat (Muat Barang -> Di Jalan & tombol berubah jadi Selesai)
  const handleConfirmDepart = async (courier: CourierItem) => {
    const nowTime =
      new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';

    const updatedCourier: CourierItem = {
      ...courier,
      status: 'jalan',
      type: 'di_jalan',
      statusBadge: 'Di Jalan',
      statusBadgeStyle: 'text-emerald-600 bg-emerald-50',
      departTime: nowTime,
      desc: courier.desc.replace('Sedang muat', 'Mengantar'),
    };

    setCouriers((prev) => prev.map((c) => (c.id === courier.id ? updatedCourier : c)));
    await syncCourierStatus(courier.id, 'mengantar');
    syncOrderBackToMonitoring(
      courier.assignedDeliveryId,
      courier.orderId,
      'diantar',
      updatedCourier
    );

    showToast(`${courier.name} dikonfirmasi berangkat mengantar pesanan!`);
  };

  // Aksi 5: Klik Selesai -> Pengantaran Selesai bertambah +1 & kembali menjadi Tugaskan Pesanan
  const handleCompleteDelivery = async (courier: CourierItem) => {
    const doneOrderNo = courier.orderId;
    const doneDeliveryId = courier.assignedDeliveryId;

    const updatedCourier: CourierItem = {
      ...courier,
      status: 'standby',
      type: 'standby',
      statusBadge: 'Standby Depo',
      statusBadgeStyle: 'text-emerald-700 bg-emerald-50',
      location: 'Posisi: Depo Utama JKT',
      idleTime: 'Siaga Depo',
      desc: `Baru saja menyelesaikan pengantaran ${
        doneOrderNo || ''
      }. Siap menerima antrean baru.`,
      gallonCount: 0,
      finishedCount: courier.finishedCount + 1,
      assignedDeliveryId: undefined,
      orderId: undefined,
      departTime: undefined,
    };

    setCouriers((prev) => prev.map((c) => (c.id === courier.id ? updatedCourier : c)));
    await syncCourierStatus(courier.id, 'aktif');
    syncOrderBackToMonitoring(doneDeliveryId, doneOrderNo, 'selesai');

    showToast(`Pengantaran ${doneOrderNo || ''} selesai! ${courier.name} siap ditugaskan kembali.`);
  };

  // Aksi 6: Kirim Instruksi ke Kurir
  const handleSendInstruction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactCourier || !dispatchMessage.trim()) return;
    showToast(`Instruksi terkirim ke perangkat ${contactCourier.name}`);
    setDispatchMessage('');
  };

  const getWhatsappUrl = (courier: CourierItem) => {
    const cleanNum = courier.phone.replace(/[^0-9]/g, '').replace(/^0/, '62');
    const text = encodeURIComponent(
      `Halo ${courier.name}, ini Admin Depo GalonKu. Mohon update status untuk ${
        courier.orderId ? `order ${courier.orderId}` : 'siaga pengantaran'
      }.`
    );
    return `https://wa.me/${cleanNum}?text=${text}`;
  };

  return (
    <main className="w-full bg-[#F8FAFC] min-h-screen p-6 pt-4 font-sans text-slate-800">
      {/* TOAST NOTIFIKASI */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-xs font-bold text-white shadow-xl">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* 1. BREADCRUMB & HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold text-blue-600 uppercase tracking-wider mb-0.5 h-4">
            <span>Fleet Logistics &amp; Live Dispatch</span>
            <span className="text-slate-300">/</span>
            <span>Monitoring</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-500">Kurir Lapangan</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight leading-tight">
            Kurir Lapangan
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manajemen armada kurir, status operasional kurir di lapangan, dan penugasan dari antrean Monitoring Pengantaran.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2 transition active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Armada Kurir</span>
          </button>
        </div>
      </div>

      {/* 2. RINGKASAN STATISTIK (3 KOTAK RESPONSIF & DINAMIS) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Kurir</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold text-slate-900">{kpi.total}</span>
              <span className="text-xs font-semibold text-slate-600">Kurir Terdaftar</span>
            </div>
            <span className="inline-block mt-2 text-[10px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
              100% Siaga Operasional
            </span>
          </div>
          <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Sedang Di Jalan</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold text-slate-900">{kpi.onRoadCount}</span>
              <span className="text-xs font-semibold text-slate-600">Kurir Aktif Antar</span>
            </div>
            <span className="inline-block mt-2 text-[10px] font-medium text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-md">
              {kpi.totalGallons} Galon Sedang Dikirim
            </span>
          </div>
          <div className="p-3 bg-cyan-50 rounded-xl text-cyan-600">
            <Zap className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Standby Depo</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold text-slate-900">{kpi.standbyCount}</span>
              <span className="text-xs font-semibold text-slate-600">Siap Antar Segera</span>
            </div>
            <span className="inline-block mt-2 text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              Siap Ditugaskan
            </span>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
            <Building2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. FILTER TABS & SEARCH BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => {
              setActiveTab('semua');
              setCurrentPage(1);
            }}
            className={`text-xs font-semibold px-4 py-2 rounded-xl transition whitespace-nowrap cursor-pointer ${
              activeTab === 'semua'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Semua Kurir ({kpi.total})
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('jalan');
              setCurrentPage(1);
            }}
            className={`text-xs font-semibold px-4 py-2 rounded-xl transition whitespace-nowrap cursor-pointer ${
              activeTab === 'jalan'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Di Jalan ({kpi.onRoadCount})
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('standby');
              setCurrentPage(1);
            }}
            className={`text-xs font-semibold px-4 py-2 rounded-xl transition whitespace-nowrap cursor-pointer ${
              activeTab === 'standby'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Standby Depo ({kpi.standbyCount})
          </button>
        </div>

        {/* INPUT PENCARIAN */}
        <div className="relative min-w-[260px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Cari nama kurir, plat motor, order..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-8 py-2 text-xs focus:outline-none focus:border-blue-500 shadow-sm"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 4. GRID KURIR LAPANGAN */}
      {paginatedCouriers.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
            {paginatedCouriers.map((courier) => (
              <div
                key={courier.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between hover:border-blue-300 transition"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div
                      onClick={() => setDetailCourier(courier)}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <div
                        className={`w-10 h-10 rounded-full font-bold text-xs flex items-center justify-center ${courier.avatarBg}`}
                      >
                        {courier.initials}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition">
                          {courier.name}
                        </h3>
                        <p className="text-[11px] text-slate-400">
                          {courier.motor} •{' '}
                          <span className="font-semibold text-slate-600">{courier.plat}</span>
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${courier.statusBadgeStyle}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>{' '}
                      {courier.statusBadge}
                    </span>
                  </div>

                  {/* BILA KURIR SEDANG DI JALAN / MUAT BARANG */}
                  {courier.status === 'jalan' && (
                    <div
                      className={`mt-4 p-3 rounded-xl border ${
                        courier.type === 'muat_barang'
                          ? 'bg-amber-50/50 border-amber-100'
                          : 'bg-slate-50 border-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="text-slate-500">
                          Order: <strong className="text-blue-600">{courier.orderId}</strong>
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-800 line-clamp-2">
                        {courier.desc}
                      </p>
                    </div>
                  )}

                  {/* BILA KURIR SEDANG STANDBY DEPO */}
                  {courier.status === 'standby' && (
                    <div className="mt-4 bg-emerald-50/40 p-3 rounded-xl border border-emerald-100/60">
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="text-slate-600 font-medium">{courier.location}</span>
                        <span className="text-slate-400">{courier.idleTime}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{courier.desc}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />{' '}
                      {courier.finishedCount} Pengantaran Selesai
                    </span>
                    <span>{courier.departTime || 'Tersedia Segera'}</span>
                  </div>
                </div>

                {/* ACTION BUTTONS INTERAKTIF */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100">
                  {courier.status === 'jalan' ? (
                    <>
                      {courier.type === 'muat_barang' ? (
                        <button
                          type="button"
                          onClick={() => handleConfirmDepart(courier)}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 rounded-xl transition shadow-sm cursor-pointer"
                        >
                          Konfirmasi Berangkat
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleCompleteDelivery(courier)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2 rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Selesai</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setContactCourier(courier)}
                        className="border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold py-2 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Hubungi</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => handleOpenAssignModal(courier)}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                      >
                        <PackageCheck className="w-3.5 h-3.5" />
                        <span>Tugaskan Pesanan</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setContactCourier(courier)}
                        className="border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold py-2 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Hubungi</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION JIKA KURIR > 9 */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-slate-100 shadow-sm mb-6">
              <span className="text-xs text-slate-500">
                Halaman <strong>{safePage}</strong> dari <strong>{totalPages}</strong> (
                {filteredCouriers.length} Kurir)
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={safePage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  disabled={safePage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 p-10 text-center mb-6 shadow-sm">
          <p className="text-sm font-bold text-slate-700">Tidak ada armada kurir ditemukan</p>
          <p className="text-xs text-slate-400 mt-1">
            Coba ubah filter status atau kata kunci pencarian nama / plat motor.
          </p>
        </div>
      )}

      {/* ==================== MODALS ==================== */}

      {/* MODAL 1: TAMBAH ARMADA KURIR */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-base font-bold text-slate-900">Tambah Armada Kurir Baru</h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleAddCourier} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Kurir</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pak Ahmad Fauzi"
                  value={newCourierForm.name}
                  onChange={(e) => setNewCourierForm({ ...newCourierForm, name: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Jenis Motor</label>
                  <input
                    type="text"
                    required
                    value={newCourierForm.motor}
                    onChange={(e) =>
                      setNewCourierForm({ ...newCourierForm, motor: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Plat Nomor</label>
                  <input
                    type="text"
                    required
                    placeholder="B 4512 KLM"
                    value={newCourierForm.plat}
                    onChange={(e) => setNewCourierForm({ ...newCourierForm, plat: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">No. HP / WhatsApp</label>
                <input
                  type="text"
                  placeholder="0812-xxxx-xxxx"
                  value={newCourierForm.phone}
                  onChange={(e) => setNewCourierForm({ ...newCourierForm, phone: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 font-semibold text-white hover:bg-blue-700 cursor-pointer"
                >
                  Simpan Armada
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: TUGASKAN PESANAN (HANYA YANG SIAP KIRIM / BELUM DIANTAR) */}
      {assignCourier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Tugaskan Pengantaran</h3>
                <p className="text-[11px] text-slate-400">
                  Kurir: <strong>{assignCourier.name}</strong> ({assignCourier.plat}) • Hanya
                  menampilkan order siap kirim
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAssignCourier(null)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleAssignOrder} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-2">
                  Pilih Antrean Order Siap Kirim
                </label>
                {availableQueueOrders.length === 0 ? (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center text-slate-500">
                    Tidak ada antrean baru yang menunggu pengiriman saat ini.
                  </div>
                ) : (
                  <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
                    {availableQueueOrders.map((o) => {
                      const isSelected = String(selectedMonitoringOrderId) === String(o.id);
                      return (
                        <div
                          key={o.id}
                          onClick={() => setSelectedMonitoringOrderId(String(o.id))}
                          className={`cursor-pointer rounded-xl border p-3 transition ${
                            isSelected
                              ? 'border-blue-600 bg-blue-50/70'
                              : 'border-slate-200 bg-white hover:border-blue-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900">
                              {o.orderNo} • {o.itemCount}
                            </span>
                            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                              Siap Kirim
                            </span>
                          </div>
                          <p className="mt-1 font-semibold text-slate-700">{o.addressTitle}</p>
                          <p className="text-[11px] text-slate-500">
                            {o.customerInfo} • {o.note}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setAssignCourier(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={availableQueueOrders.length === 0 || !selectedMonitoringOrderId}
                  className="px-4 py-2 rounded-xl bg-blue-600 font-semibold text-white hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
                >
                  Tugaskan Sekarang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: HUBUNGI KURIR */}
      {contactCourier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Hubungi {contactCourier.name}</h3>
                <p className="text-[11px] text-slate-400">{contactCourier.phone}</p>
              </div>
              <button
                type="button"
                onClick={() => setContactCourier(null)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <a
                href={getWhatsappUrl(contactCourier)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat via WhatsApp</span>
              </a>
              <form onSubmit={handleSendInstruction} className="pt-2 border-t border-slate-100">
                <label className="block font-bold text-slate-700 mb-1">
                  Kirim Instruksi Cepat ke Aplikasi Kurir
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Tulis pesan dispatch..."
                    value={dispatchMessage}
                    onChange={(e) => setDispatchMessage(e.target.value)}
                    className="flex-1 rounded-xl border border-slate-200 px-3 py-2 focus:border-blue-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: DETAIL PROFIL KURIR */}
      {detailCourier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-base font-bold text-slate-900">Profil Armada Kurir</h3>
              <button
                type="button"
                onClick={() => setDetailCourier(null)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2.5 text-xs">
              <p>
                <strong>Nama:</strong> {detailCourier.name}
              </p>
              <p>
                <strong>Armada:</strong> {detailCourier.motor} ({detailCourier.plat})
              </p>
              <p>
                <strong>No. Kontak:</strong> {detailCourier.phone}
              </p>
              <p>
                <strong>Area Kloter:</strong> {detailCourier.kloter || 'Depo Utama'}
              </p>
              <p>
                <strong>Trip Selesai Hari Ini:</strong> {detailCourier.finishedCount} Pesanan
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}