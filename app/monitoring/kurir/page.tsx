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
  Phone,
  Navigation,
  CheckCircle2,
  X,
  MessageSquare,
  Send,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Radio,
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

type CourierStatus = 'jalan' | 'standby';
type CourierSubType = 'di_jalan' | 'muat_barang' | 'standby';

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
  orderId?: string;
  eta?: string;
  desc: string;
  progress?: number;
  progressLabel?: string;
  gallonCount: number;
  finishedCount: number;
  departTime?: string;
  location?: string;
  idleTime?: string;
  battery?: string;
  kloter?: string;
  type: CourierSubType;
}

interface ActivityLog {
  id: string;
  actor: string;
  action: string;
  time: string;
  dotColor: string;
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
    orderId: '#ORD-8821',
    eta: 'Tiba ~6 mnt lagi',
    desc: 'Membawa 3 Galon Aqua ke Jl. Mawar No. 12 (Ibu Fitriani)',
    progress: 75,
    progressLabel: '75% Selesai (600m)',
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
    orderId: '#ORD-8822',
    eta: 'Tiba ~12 mnt lagi',
    desc: 'Membawa 2 Galon Le Minerale ke Gandaria Heights Lt. 08',
    progress: 45,
    progressLabel: '45% Selesai (1.8 KM)',
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
    orderId: '#ORD-8824',
    eta: 'Tiba ~15 mnt lagi',
    desc: 'Membawa 4 Galon Campur ke 1Park Residences Lt. 14',
    progress: 25,
    progressLabel: '25% Selesai (2.7 KM)',
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
    orderId: '#ORD-8825',
    eta: 'Persiapan Jalan',
    desc: 'Sedang muat 3 Galon Aqua (COD Rp 54.000) di Depo JKT-04',
    progress: 90,
    progressLabel: '90% Loading Muat',
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
    idleTime: 'Idle 4 menit',
    desc: 'Armada kosong, siap menerima alokasi antrean pengantaran baru ke radius 4 KM.',
    battery: '⚡ Baterai HP 92%',
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
    idleTime: 'Idle 2 menit',
    desc: 'Baru saja menyelesaikan trip order #ORD-8820. Siap menerima jadwal pengantaran kloter siang.',
    battery: '⚡ Baterai HP 88%',
    gallonCount: 0,
    finishedCount: 5,
    kloter: 'Kloter Timur & Depo Siaga',
    type: 'standby',
  },
];

const initialLogs: ActivityLog[] = [
  {
    id: 'log-1',
    actor: 'Pak Budi',
    action: 'mendekati titik kirim (600m)',
    time: '1 menit yang lalu',
    dotColor: 'bg-emerald-500',
  },
  {
    id: 'log-2',
    actor: 'Mas Doni',
    action: 'menyelesaikan trip #ORD-8820',
    time: '4 menit yang lalu',
    dotColor: 'bg-blue-500',
  },
  {
    id: 'log-3',
    actor: 'Hendra K.',
    action: 'mulai memuat 3 galon di Depo 04',
    time: '6 menit yang lalu',
    dotColor: 'bg-amber-500',
  },
];

const pendingOrdersPool = [
  {
    orderId: '#ORD-8830',
    customer: 'Ibu Ratna',
    address: 'Jl. Radio Dalam Raya No. 45',
    item: '3 Galon Aqua',
    qty: 3,
    kloter: 'Kloter Selatan (Kebayoran)',
  },
  {
    orderId: '#ORD-8831',
    customer: 'Bpk. Gunawan',
    address: 'Perum. Pondok Indah Blok C2',
    item: '2 Galon Le Minerale',
    qty: 2,
    kloter: 'Kloter Barat (Gandaria)',
  },
  {
    orderId: '#ORD-8832',
    customer: 'Klinik Sehat Sentosa',
    address: 'Jl. Kebayoran Lama No. 102',
    item: '4 Galon Vit',
    qty: 4,
    kloter: 'Kloter Timur & Depo Siaga',
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
  const [logs, setLogs] = useState<ActivityLog[]>(initialLogs);
  const [activeTab, setActiveTab] = useState<'semua' | 'jalan' | 'standby'>('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [refreshing, setRefreshing] = useState(false);

  // Modals State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [contactCourier, setContactCourier] = useState<CourierItem | null>(null);
  const [gpsCourier, setGpsCourier] = useState<CourierItem | null>(null);
  const [assignCourier, setAssignCourier] = useState<CourierItem | null>(null);
  const [detailCourier, setDetailCourier] = useState<CourierItem | null>(null);
  const [isAllLogsOpen, setIsAllLogsOpen] = useState(false);

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

  // Form Tugaskan Pesanan
  const [selectedPresetOrder, setSelectedPresetOrder] = useState(pendingOrdersPool[0].orderId);
  const [customOrderForm, setCustomOrderForm] = useState({
    useCustom: false,
    customer: '',
    address: '',
    item: '3 Galon Aqua',
    qty: 3,
  });

  // Toast Notification
  const [toast, setToast] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  };

  const prependLog = (actor: string, action: string, dotColor = 'bg-blue-500') => {
    setLogs((prev) => [
      {
        id: `log-${Date.now()}-${Math.random()}`,
        actor,
        action,
        time: 'Baru saja',
        dotColor,
      },
      ...prev,
    ]);
  };

  // Sinkronisasi data kurir dengan backend (/api/couriers)
  const fetchCouriersFromBackend = async (showNotif = false) => {
    setRefreshing(true);
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
              eta: isOnRoad ? 'Tiba ~10 mnt lagi' : undefined,
              desc: isOnRoad
                ? `Sedang mengantar ${row.activeOrders || 1} pesanan aktif dari Depo JKT-04`
                : 'Armada siaga di Depo Utama, siap menerima alokasi pengantaran.',
              progress: isOnRoad ? 65 : undefined,
              progressLabel: isOnRoad ? '65% Selesai' : undefined,
              location: !isOnRoad ? 'Posisi: Depo Utama JKT' : undefined,
              idleTime: !isOnRoad ? 'Siaga Aktif' : undefined,
              battery: !isOnRoad ? '⚡ Baterai HP 95%' : undefined,
              gallonCount: isOnRoad ? Number(row.activeOrders || 1) * 3 : 0,
              finishedCount: Number(row.completedOrders || 5 + idx),
              departTime: isOnRoad ? 'Aktif Hari Ini' : undefined,
              kloter: 'Kloter Selatan (Kebayoran)',
              type: isOnRoad ? 'di_jalan' : 'standby',
            };
          });

          setCouriers([...mappedCouriers, ...initialCouriers]);
        }

        if (showNotif) {
          showToast('Posisi GPS & data kurir berhasil disinkronkan dengan server');
        }
      } else if (showNotif) {
        showToast('Posisi GPS & status kurir diperbarui');
      }
    } catch {
      if (showNotif) {
        showToast('Posisi GPS & status kurir diperbarui');
      }
    } finally {
      setTimeout(() => setRefreshing(false), 400);
    }
  };

  useEffect(() => {
    fetchCouriersFromBackend(false);
  }, []);

  // Helper sync status kurir ke backend
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
    } catch {
      // Tetap lanjut jika ID berasal dari data simulasi lokal
    }
  };

  // KPI Dinamis
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

  // Refresh Telemetry & Backend Sync
  const handleRefresh = () => {
    setCouriers((prev) =>
      prev.map((c) => {
        if (c.type === 'di_jalan' && (c.progress ?? 0) < 95) {
          const nextProg = Math.min(95, (c.progress ?? 50) + 5);
          const sisaMenit = Math.max(2, Math.round((100 - nextProg) / 5));
          return {
            ...c,
            progress: nextProg,
            progressLabel: `${nextProg}% Selesai`,
            eta: `Tiba ~${sisaMenit} mnt lagi`,
          };
        }
        return c;
      })
    );
    fetchCouriersFromBackend(true);
  };

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
      battery: '⚡ Baterai HP 100%',
      gallonCount: 0,
      finishedCount: 0,
      kloter: newCourierForm.kloter,
      type: 'standby',
    };

    setCouriers((prev) => [newCourier, ...prev]);
    prependLog(
      newCourier.name,
      `bergabung siaga di ${(newCourier.location ?? 'Depo Utama').replace('Posisi: ', '')}`,
      'bg-emerald-500'
    );
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

  // Aksi 2: Konfirmasi Berangkat (Muat Barang -> Di Jalan)
  const handleConfirmDepart = async (courier: CourierItem) => {
    const nowTime =
      new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
    setCouriers((prev) =>
      prev.map((c) =>
        c.id === courier.id
          ? {
              ...c,
              status: 'jalan',
              type: 'di_jalan',
              statusBadge: 'Di Jalan',
              statusBadgeStyle: 'text-emerald-600 bg-emerald-50',
              eta: 'Tiba ~15 mnt lagi',
              progress: 15,
              progressLabel: '15% Selesai (Baru Berangkat)',
              departTime: nowTime,
              desc: c.desc.replace('Sedang muat', 'Mengantar'),
            }
          : c
      )
    );
    await syncCourierStatus(courier.id, 'mengantar');
    prependLog(courier.name, `berangkat mengantar ${courier.orderId || 'pesanan'}`, 'bg-blue-500');
    showToast(`${courier.name} dikonfirmasi berangkat ke lokasi tujuan!`);
  };

  // Aksi 3: Update Progres GPS / Selesaikan Pengantaran
  const handleUpdateProgress = async (courier: CourierItem, nextProgress: number) => {
    if (nextProgress >= 100) {
      const updatedCourier: CourierItem = {
        ...courier,
        status: 'standby',
        type: 'standby',
        statusBadge: 'Standby Depo',
        statusBadgeStyle: 'text-emerald-700 bg-emerald-50',
        location: 'Posisi: Depo Utama JKT',
        idleTime: 'Idle 0 menit',
        desc: `Baru saja menyelesaikan trip order ${
          courier.orderId || '#ORD-8820'
        }. Siap menerima antrean baru.`,
        battery: '⚡ Baterai HP 90%',
        gallonCount: 0,
        finishedCount: courier.finishedCount + 1,
        orderId: undefined,
        eta: undefined,
        progress: undefined,
        progressLabel: undefined,
      };
      setCouriers((prev) => prev.map((c) => (c.id === courier.id ? updatedCourier : c)));
      setGpsCourier(null);
      await syncCourierStatus(courier.id, 'aktif');
      prependLog(
        courier.name,
        `menyelesaikan pengantaran ${courier.orderId || ''}`,
        'bg-emerald-500'
      );
      showToast(`Pengantaran ${courier.orderId} selesai! ${courier.name} kembali Standby.`);
      return;
    }

    const sisaMenit = Math.max(2, Math.round((100 - nextProgress) / 5));
    const updated: CourierItem = {
      ...courier,
      progress: nextProgress,
      progressLabel: `${nextProgress}% Selesai`,
      eta: `Tiba ~${sisaMenit} mnt lagi`,
    };
    setCouriers((prev) => prev.map((c) => (c.id === courier.id ? updated : c)));
    setGpsCourier(updated);
  };

  // Aksi 4: Tugaskan Pesanan ke Kurir Standby
  const handleAssignOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignCourier) return;

    const preset =
      pendingOrdersPool.find((o) => o.orderId === selectedPresetOrder) || pendingOrdersPool[0];
    const orderCode = customOrderForm.useCustom
      ? `#ORD-${Math.floor(8835 + Math.random() * 60)}`
      : preset.orderId;
    const customerName = customOrderForm.useCustom
      ? customOrderForm.customer || 'Pelanggan Baru'
      : preset.customer;
    const targetAddr = customOrderForm.useCustom
      ? customOrderForm.address || 'Jl. Kebayoran Baru No. 10'
      : preset.address;
    const itemDesc = customOrderForm.useCustom ? customOrderForm.item : preset.item;
    const qty = customOrderForm.useCustom ? customOrderForm.qty : preset.qty;

    setCouriers((prev) =>
      prev.map((c) =>
        c.id === assignCourier.id
          ? {
              ...c,
              status: 'jalan',
              type: 'muat_barang',
              statusBadge: 'Muat Barang',
              statusBadgeStyle: 'text-amber-700 bg-amber-50',
              orderId: orderCode,
              eta: 'Persiapan Jalan',
              desc: `Sedang muat ${itemDesc} untuk ${targetAddr} (${customerName})`,
              progress: 50,
              progressLabel: '50% Loading Muat',
              gallonCount: qty,
              departTime:
                'Jadwal: ' +
                new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) +
                ' WIB',
            }
          : c
      )
    );

    await syncCourierStatus(assignCourier.id, 'mengantar');
    prependLog(assignCourier.name, `ditugaskan memuat ${itemDesc} (${orderCode})`, 'bg-amber-500');
    showToast(`Order ${orderCode} berhasil ditugaskan ke ${assignCourier.name}!`);
    setAssignCourier(null);
    setCustomOrderForm({
      useCustom: false,
      customer: '',
      address: '',
      item: '3 Galon Aqua',
      qty: 3,
    });
  };

  // Aksi 5: Kirim Instruksi ke Kurir
  const handleSendInstruction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactCourier || !dispatchMessage.trim()) return;
    prependLog(
      'Admin Depo',
      `mengirim instruksi ke ${contactCourier.name}: "${dispatchMessage.trim()}"`,
      'bg-blue-500'
    );
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
            Manajemen armada kurir, status operasional kurir di lapangan, penugasan antrean, dan pantauan rute pengantaran.
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
          <button
            type="button"
            onClick={handleRefresh}
            title="Sinkronkan Posisi GPS & Status"
            className="p-2.5 border border-slate-200 bg-white rounded-xl hover:bg-slate-50 text-slate-600 transition active:scale-95 shadow-sm cursor-pointer"
          >
            <RotateCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-blue-600' : ''}`} />
          </button>
        </div>
      </div>

      {/* 2. RINGKASAN STATISTIK (KPI CARDS DINAMIS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
              Idle &lt; 5 Menit
            </span>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
            <Building2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Performa Rata-rata</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold text-slate-900">98.4%</span>
              <span className="text-xs font-semibold text-slate-600">Tepat Waktu</span>
            </div>
            <span className="inline-block mt-2 text-[10px] font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">
              ⚡ SLA 17.4 Menit / Trip
            </span>
          </div>
          <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
            <Clock className="w-5 h-5" />
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
                        <span className="text-slate-400">{courier.eta}</span>
                      </div>
                      <p className="text-xs font-semibold text-slate-800 line-clamp-2">
                        {courier.desc}
                      </p>
                      <div className="mt-3">
                        <div className="flex justify-between text-[10px] font-semibold text-blue-600 mb-1">
                          <span>Progres</span>
                          <span>{courier.progressLabel}</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              courier.type === 'muat_barang' ? 'bg-amber-500' : 'bg-blue-600'
                            }`}
                            style={{ width: `${courier.progress ?? 0}%` }}
                          ></div>
                        </div>
                      </div>
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
                      <div className="mt-3 flex items-center gap-2 text-[10px] font-medium text-emerald-700">
                        <span>{courier.battery}</span>
                        <span>•</span>
                        <span>GPS Aktif</span>
                      </div>
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
                          onClick={() => setGpsCourier(courier)}
                          className="bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold py-2 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          <span>Lacak GPS</span>
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
                        onClick={() => setAssignCourier(courier)}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 rounded-xl transition shadow-sm cursor-pointer"
                      >
                        Tugaskan Pesanan
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
                Halaman <strong>{safePage}</strong> dari <strong>{totalPages}</strong> ({filteredCouriers.length} Kurir)
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

      {/* 5. LOG AKTIVITAS TERKINI */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-blue-600 animate-pulse" />
            <h2 className="text-sm font-bold text-slate-900">Log Aktivitas Kurir Terkini</h2>
          </div>
          <button
            type="button"
            onClick={() => setIsAllLogsOpen(!isAllLogsOpen)}
            className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
          >
            {isAllLogsOpen ? 'Sembunyikan' : `Lihat Semua (${logs.length})`}
          </button>
        </div>

        <div className="space-y-3">
          {(isAllLogsOpen ? logs : logs.slice(0, 4)).map((log) => (
            <div
              key={log.id}
              className="flex items-center justify-between text-xs border-b border-slate-50 pb-2.5 last:border-0 last:pb-0"
            >
              <div className="flex items-center gap-2.5">
                <span className={`w-2 h-2 rounded-full ${log.dotColor}`} />
                <p className="text-slate-600">
                  <strong className="text-slate-900">{log.actor}</strong> {log.action}
                </p>
              </div>
              <span className="text-[11px] text-slate-400">{log.time}</span>
            </div>
          ))}
        </div>
      </div>

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
                    onChange={(e) => setNewCourierForm({ ...newCourierForm, motor: e.target.value })}
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

      {/* MODAL 2: LACAK GPS & UPDATE PROGRES */}
      {gpsCourier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Live GPS: {gpsCourier.name}</h3>
                <p className="text-[11px] text-slate-400">
                  {gpsCourier.motor} • {gpsCourier.plat} • {gpsCourier.orderId}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setGpsCourier(null)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 mb-4 text-xs space-y-2 border border-slate-100">
              <div className="flex items-center gap-2 text-blue-600 font-bold">
                <MapPin className="w-4 h-4" />
                <span>{gpsCourier.eta}</span>
              </div>
              <p className="text-slate-700">{gpsCourier.desc}</p>
              <div className="pt-2">
                <div className="flex justify-between text-[11px] font-bold mb-1">
                  <span>Progres Perjalanan</span>
                  <span>{gpsCourier.progress ?? 50}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all"
                    style={{ width: `${gpsCourier.progress ?? 50}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() =>
                  handleUpdateProgress(gpsCourier, Math.min(95, (gpsCourier.progress ?? 50) + 15))
                }
                className="py-2.5 rounded-xl bg-blue-50 text-blue-600 font-bold hover:bg-blue-100 cursor-pointer"
              >
                +15% Simulasi Maju
              </button>
              <button
                type="button"
                onClick={() => handleUpdateProgress(gpsCourier, 100)}
                className="py-2.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 cursor-pointer"
              >
                Tandai Tiba (100%)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: TUGASKAN PESANAN KE KURIR STANDBY */}
      {assignCourier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Tugaskan Pengantaran</h3>
                <p className="text-[11px] text-slate-400">
                  Kurir: <strong>{assignCourier.name}</strong> ({assignCourier.plat})
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
                <label className="block font-bold text-slate-700 mb-1">Pilih Antrean Order Siap Kirim</label>
                <select
                  value={selectedPresetOrder}
                  onChange={(e) => setSelectedPresetOrder(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 font-semibold focus:border-blue-500 focus:outline-none"
                >
                  {pendingOrdersPool.map((o) => (
                    <option key={o.orderId} value={o.orderId}>
                      {o.orderId} • {o.item} — {o.address}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setAssignCourier(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 font-semibold text-white hover:bg-blue-700 cursor-pointer"
                >
                  Tugaskan Sekarang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: HUBUNGI KURIR */}
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

      {/* MODAL 5: DETAIL PROFIL KURIR */}
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