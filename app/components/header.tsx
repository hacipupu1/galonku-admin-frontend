'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  Search,
  Bell,
  Plus,
  X,
  Package,
  Truck,
  User,
  CheckCircle2,
  History,
  ChevronUp,
  CornerDownLeft,
  RotateCcw,
} from 'lucide-react';

export interface PesananBaru {
  id: string;
  pelanggan: string;
  alamat: string;
  produk: string;
  jumlah: number;
  kurir: string;
  total: number;
  status?: string;
  depo?: string;
}

export type SearchCategory = 'semua' | 'pesanan' | 'pelanggan' | 'kurir';

export interface SearchableItem {
  id: string;
  kategori: Exclude<SearchCategory, 'semua'>;
  judul: string;
  subjudul: string;
  badge: string;
  keywords: string[];
  targetRoute?: string;
}

interface HeaderProps {
  onSearchSubmit?: (query: string, category?: SearchCategory) => void;
  onSelectSearchResult?: (item: SearchableItem) => void;
  onCreateOrder?: (order: PesananBaru) => void;
  /** Route halaman manajemen pesanan */
  ordersRoute?: string;
  /** Route halaman kurir (opsional; jika kosong akan mengarah ke ordersRoute) */
  courierRoute?: string;
  /** Item pencarian tambahan dari luar komponen */
  searchItems?: SearchableItem[];
  /** Jika true, tidak akan pindah halaman saat mencari; langsung filter di halaman aktif */
  stayOnCurrentPage?: boolean;
}

const STORAGE_ORDERS_KEY = 'galonku_orders_v1';

// Data awal disesuaikan dengan nomor pesanan & data di tabel halaman
const DEFAULT_SEARCH_ITEMS: SearchableItem[] = [
  {
    id: 'ORD-8910',
    kategori: 'pesanan',
    judul: '#ORD-8910',
    subjudul: 'Warung Makan Sederhana • Jl. Ciputat Raya No. 18 • 3 Galon Aqua',
    badge: 'Diantar',
    keywords: [
      'ord-8910',
      '8910',
      'warung makan sederhana',
      'ciputat raya',
      'hendra kurnia',
      'hendra',
      'honda revo',
      'b 5502 tya',
      '3 galon aqua',
      'depo jkt-04',
    ],
  },
  {
    id: 'ORD-8890',
    kategori: 'pesanan',
    judul: '#ORD-8890',
    subjudul: 'Ibu Ratna • Jl. Radio Dalam Raya No. 45 • 3 Galon Aqua',
    badge: 'Diantar',
    keywords: [
      'ord-8890',
      '8890',
      'ibu ratna',
      'ratna',
      'radio dalam',
      'pak budi santoso',
      'budi santoso',
      '3 galon aqua',
      'depo jkt-04',
    ],
  },
  {
    id: 'ORD-8831',
    kategori: 'pesanan',
    judul: '#ORD-8831',
    subjudul: 'Bpk. Gunawan • Perum. Pondok Indah Blok C2 • 2 Galon Le Minerale',
    badge: 'Diproses',
    keywords: [
      'ord-8831',
      '8831',
      'gunawan',
      'bpk. gunawan',
      'pondok indah',
      'mas doni wijaya',
      'doni wijaya',
      '2 galon le minerale',
      'depo jkt-05',
    ],
  },
  {
    id: 'ORD-8821',
    kategori: 'pesanan',
    judul: '#ORD-8821',
    subjudul: 'Ibu Fitriani • Jl. Mawar No. 12 • 3 Galon Aqua',
    badge: 'Diantar',
    keywords: [
      'ord-8821',
      '8821',
      'ibu fitriani',
      'fitriani',
      'jl. mawar no. 12',
      'mawar',
      'pak budi santoso',
      'budi santoso',
      '3 galon aqua',
      'depo jkt-04',
    ],
  },
  {
    id: 'ORD-8830',
    kategori: 'pesanan',
    judul: '#ORD-8830',
    subjudul: 'Ibu Ratna • Jl. Radio Dalam Raya No. 45 • 3 Galon Aqua',
    badge: 'Diantar',
    keywords: [
      'ord-8830',
      '8830',
      'ibu ratna',
      'ratna',
      'radio dalam',
      'pak budi santoso',
      'budi santoso',
      '3 galon aqua',
      'depo jkt-04',
    ],
  },
  {
    id: 'ORD-8850',
    kategori: 'pesanan',
    judul: '#ORD-8850',
    subjudul: 'Warung Makan Sederhana • Jl. Ciputat Raya No. 18 • 3 Galon Aqua',
    badge: 'Diantar',
    keywords: [
      'ord-8850',
      '8850',
      'warung makan sederhana',
      'ciputat raya',
      'hendra kurnia',
      'hendra',
      '3 galon aqua',
      'depo jkt-04',
    ],
  },
  {
    id: 'ORD-8870',
    kategori: 'pesanan',
    judul: '#ORD-8870',
    subjudul: 'Klinik Sehat Sentosa • Jl. Kebayoran Lama No. 102 • 3 Galon Aqua',
    badge: 'Diantar',
    keywords: [
      'ord-8870',
      '8870',
      'klinik sehat sentosa',
      'kebayoran lama',
      'raynar putra m.',
      'raynar',
      '3 galon aqua',
      'depo jkt-04',
    ],
  },
  {
    id: 'PEL-8910',
    kategori: 'pelanggan',
    judul: 'Warung Makan Sederhana',
    subjudul: 'Jl. Ciputat Raya No. 18 • Bayar Tunai',
    badge: '#ORD-8910',
    keywords: ['warung makan sederhana', 'ciputat raya', 'bayar tunai', 'ord-8910'],
  },
  {
    id: 'PEL-8831',
    kategori: 'pelanggan',
    judul: 'Bpk. Gunawan',
    subjudul: 'Perum. Pondok Indah Blok C2 • Lewat gerbang selatan',
    badge: '#ORD-8831',
    keywords: ['gunawan', 'bpk. gunawan', 'pondok indah', 'gerbang selatan', 'ord-8831'],
  },
  {
    id: 'PEL-8821',
    kategori: 'pelanggan',
    judul: 'Ibu Fitriani',
    subjudul: 'Jl. Mawar No. 12 • Patokan: Sebelah Pos RW 03',
    badge: '#ORD-8821',
    keywords: ['ibu fitriani', 'fitriani', 'mawar', 'pos rw 03', 'ord-8821'],
  },
  {
    id: 'KUR-BUDI',
    kategori: 'kurir',
    judul: 'Pak Budi Santoso',
    subjudul: 'Honda Beat • B 4120 SZX • Depo JKT-04',
    badge: 'Diantar',
    keywords: ['pak budi santoso', 'budi santoso', 'budi', 'honda beat', 'b 4120 szx', 'ord-8821', 'ord-8830', 'ord-8890'],
  },
  {
    id: 'KUR-HENDRA',
    kategori: 'kurir',
    judul: 'Hendra Kurnia',
    subjudul: 'Honda Revo • B 5502 TYA • Depo JKT-04',
    badge: 'Diantar',
    keywords: ['hendra kurnia', 'hendra', 'honda revo', 'b 5502 tya', 'ord-8850', 'ord-8910'],
  },
  {
    id: 'KUR-RAYNAR',
    kategori: 'kurir',
    judul: 'Raynar Putra M.',
    subjudul: 'Honda Beat • B 3434 RTA • Depo JKT-04',
    badge: 'Diantar',
    keywords: ['raynar putra m.', 'raynar', 'honda beat', 'b 3434 rta', 'ord-8870'],
  },
  {
    id: 'KUR-DONI',
    kategori: 'kurir',
    judul: 'Mas Doni Wijaya',
    subjudul: 'Honda Vario • B 6891 PQR • Depo JKT-05',
    badge: 'Diproses',
    keywords: ['mas doni wijaya', 'doni wijaya', 'doni', 'honda vario', 'b 6891 pqr', 'ord-8831'],
  },
];

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: 'Update Pengiriman #ORD-8910',
    desc: 'Hendra Kurnia (65% Selesai) menuju Warung Makan Sederhana.',
    time: '2 menit lalu',
    unread: true,
  },
  {
    id: 2,
    title: 'Pesanan Diproses #ORD-8831',
    desc: 'Mas Doni Wijaya sedang memuat 2 Galon Le Minerale.',
    time: '12 menit lalu',
    unread: true,
  },
  {
    id: 3,
    title: 'Pengiriman #ORD-8890 Berjalan',
    desc: 'Pak Budi Santoso (45% Selesai) ke Jl. Radio Dalam Raya No. 45.',
    time: '25 menit lalu',
    unread: false,
  },
  {
    id: 4,
    title: 'Pesanan Aktif #ORD-8821',
    desc: 'Pak Budi Santoso mengantar 3 Galon Aqua ke Ibu Fitriani.',
    time: '1 jam lalu',
    unread: false,
  },
  {
    id: 5,
    title: 'Laporan Harian Depo JKT-04',
    desc: 'Armada Honda Beat & Honda Revo siap operasi pagi.',
    time: 'Kemarin, 18:00',
    unread: false,
  },
  {
    id: 6,
    title: 'Stok Galon Aqua Depo JKT-04',
    desc: 'Penambahan stok galon isi ulang di Depo JKT-04.',
    time: 'Kemarin, 08:30',
    unread: false,
  },
];

const HARGA_PRODUK: Record<string, number> = {
  '3 Galon Aqua': 63000,
  '2 Galon Le Minerale': 40000,
  'Aqua 19L': 21000,
  'Le Minerale 15L': 20000,
  'Isi Ulang RO 19L': 7000,
};

const MAX_VISIBLE_NOTIFICATIONS = 3;

const CATEGORY_TABS: { id: SearchCategory; label: string }[] = [
  { id: 'semua', label: 'Semua' },
  { id: 'pesanan', label: 'No. Pesanan' },
  { id: 'pelanggan', label: 'Pelanggan' },
  { id: 'kurir', label: 'Kurir' },
];

function mapOrderToSearchItems(order: PesananBaru): SearchableItem[] {
  const cleanId = order.id.replace(/^#/, '');
  const muatanLabel = `${order.jumlah}x ${order.produk}`;
  const statusLabel = order.status || 'Menunggu Kurir';
  const depoLabel = order.depo || 'Depo JKT-04';

  const orderItem: SearchableItem = {
    id: cleanId,
    kategori: 'pesanan',
    judul: `#${cleanId}`,
    subjudul: `${order.pelanggan} • ${order.alamat} • ${muatanLabel}`,
    badge: statusLabel,
    keywords: [
      cleanId.toLowerCase(),
      `#${cleanId.toLowerCase()}`,
      order.pelanggan.toLowerCase(),
      order.alamat.toLowerCase(),
      order.produk.toLowerCase(),
      order.kurir.toLowerCase(),
      statusLabel.toLowerCase(),
      depoLabel.toLowerCase(),
    ],
  };

  const customerItem: SearchableItem = {
    id: `PEL-${cleanId}`,
    kategori: 'pelanggan',
    judul: order.pelanggan,
    subjudul: `${order.alamat} • ${muatanLabel}`,
    badge: `#${cleanId}`,
    keywords: [
      order.pelanggan.toLowerCase(),
      order.alamat.toLowerCase(),
      cleanId.toLowerCase(),
      order.kurir.toLowerCase(),
    ],
  };

  return [orderItem, customerItem];
}

// Memfilter baris tabel / kartu di halaman aktif supaya hanya orderan yang cocok saja yang tampil
function applyLiveTableFilter(rawQuery: string, category: SearchCategory) {
  if (typeof document === 'undefined') return;

  const q = rawQuery.trim().toLowerCase();
  const rows = Array.from(document.querySelectorAll('table tbody tr'));

  rows.forEach((tr) => {
    const htmlRow = tr as HTMLElement;
    if (!q) {
      htmlRow.style.display = '';
      htmlRow.removeAttribute('data-galonku-hidden');
      return;
    }

    const rowText = (htmlRow.innerText || htmlRow.textContent || '').toLowerCase();
    const isMatch = rowText.includes(q);

    if (isMatch) {
      htmlRow.style.display = '';
      htmlRow.removeAttribute('data-galonku-hidden');
    } else {
      htmlRow.style.display = 'none';
      htmlRow.setAttribute('data-galonku-hidden', 'true');
    }
  });

  try {
    window.dispatchEvent(
      new CustomEvent('galonku:global-search', {
        detail: { query: rawQuery.trim(), category },
      })
    );
  } catch {
    // Abaikan jika event dispatch gagal
  }
}

export default function Header({
  onSearchSubmit,
  onSelectSearchResult,
  onCreateOrder,
  ordersRoute = '/pesanan',
  courierRoute,
  searchItems = DEFAULT_SEARCH_ITEMS,
  stayOnCurrentPage = true,
}: HeaderProps) {
  const pathname = usePathname() || '';
  const router = useRouter();

  // 1. State Pencarian Global Interaktif
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<SearchCategory>('semua');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  // 2. Pesanan baru yang dibuat user agar otomatis bisa dicari
  const [createdOrders, setCreatedOrders] = useState<PesananBaru[]>([]);

  // 3. State Notifikasi (default 3 terbaru, bisa expand ke notif lama)
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // 4. State Modal Buat Pesanan
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [pelanggan, setPelanggan] = useState('');
  const [alamat, setAlamat] = useState('');
  const [produk, setProduk] = useState('3 Galon Aqua');
  const [jumlah, setJumlah] = useState(1);
  const [kurir, setKurir] = useState('Hendra Kurnia');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ORDERS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setCreatedOrders(parsed);
        }
      }
    } catch {
      // Abaikan jika localStorage tidak tersedia
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setShowSearchDropdown(false);
        setShowNotifDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Bersihkan filter tabel otomatis saat unmount
  useEffect(() => {
    return () => {
      applyLiveTableFilter('', 'semua');
    };
  }, []);

  if (pathname === '/login' || pathname === '/') {
    return null;
  }

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Gabungkan pesanan baru + data bawaan + item yang ada di tabel halaman saat ini
  const allSearchableItems = useMemo(() => {
    const dynamicItems = createdOrders.flatMap(mapOrderToSearchItems);

    const domOrderItems: SearchableItem[] = [];
    if (typeof document !== 'undefined') {
      const rows = Array.from(document.querySelectorAll('table tbody tr'));
      rows.forEach((tr, idx) => {
        const text = ((tr as HTMLElement).innerText || '').trim();
        const ordMatch = text.match(/#?ORD-\d+/i);
        if (ordMatch) {
          const cleanCode = ordMatch[0].replace(/^#/, '').toUpperCase();
          const alreadyExists =
            dynamicItems.some((d) => d.id.toUpperCase() === cleanCode) ||
            searchItems.some((s) => s.id.toUpperCase() === cleanCode);

          if (!alreadyExists) {
            const lines = text
              .split('\n')
              .map((l) => l.trim())
              .filter(Boolean);
            domOrderItems.push({
              id: cleanCode,
              kategori: 'pesanan',
              judul: `#${cleanCode}`,
              subjudul: lines.slice(1, 4).join(' • ') || `Pesanan #${cleanCode}`,
              badge: lines.find((l) =>
                ['Diantar', 'Diproses', 'Selesai', 'Menunggu Kurir'].includes(l)
              ) || 'Aktif',
              keywords: [
                cleanCode.toLowerCase(),
                `#${cleanCode.toLowerCase()}`,
                text.toLowerCase(),
              ],
            });
          }
        } else if (text && idx < 20) {
          // Fallback ringan jika baris bukan ORD-...
        }
      });
    }

    return [...dynamicItems, ...domOrderItems, ...searchItems];
  }, [createdOrders, searchItems, search]);

  // Filter cerdas berdasarkan kategori & kata kunci
  const filteredResults = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allSearchableItems.filter((item) => {
      const matchesCategory =
        activeCategory === 'semua' || item.kategori === activeCategory;
      if (!matchesCategory) return false;
      if (!q) return true;

      return (
        item.id.toLowerCase().includes(q) ||
        item.judul.toLowerCase().includes(q) ||
        item.subjudul.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q) ||
        item.keywords.some((kw) => kw.includes(q))
      );
    });
  }, [search, activeCategory, allSearchableItems]);

  const syncSearchEverywhere = (
    queryText: string,
    category: SearchCategory,
    shouldNavigate = false,
    targetItem?: SearchableItem
  ) => {
    onSearchSubmit?.(queryText, category);
    applyLiveTableFilter(queryText, category);

    if (!stayOnCurrentPage && shouldNavigate && queryText.trim()) {
      const destination =
        targetItem?.targetRoute ||
        (category === 'kurir' && courierRoute ? courierRoute : ordersRoute);

      if (destination && !pathname.startsWith(destination)) {
        router.push(
          `${destination}?q=${encodeURIComponent(queryText.trim())}&type=${category}`
        );
      }
    }
  };

  // Saat user memilih salah satu hasil dari dropdown -> langsung tampilkan orderan itu saja di halaman ini
  const handlePickResult = (item: SearchableItem) => {
    const searchTerm =
      item.kategori === 'kurir' ? item.judul : item.id || item.judul;
    setSearch(searchTerm);
    setShowSearchDropdown(false);
    onSelectSearchResult?.(item);

    syncSearchEverywhere(searchTerm, item.kategori, true, item);
    triggerToast(`Menampilkan hasil untuk: ${item.judul}`);
  };

  // Saat user menekan Enter -> tutup dropdown & tampilkan orderan yang cocok saja di halaman ini
  const executeGlobalSearch = (queryValue: string) => {
    const trimmed = queryValue.trim();
    if (!trimmed) {
      syncSearchEverywhere('', activeCategory, false);
      return;
    }

    setShowSearchDropdown(false);
    syncSearchEverywhere(trimmed, activeCategory, true);
    triggerToast(`Filter aktif: "${trimmed}"`);
  };

  const resetSearchFilter = () => {
    setSearch('');
    setHighlightedIndex(0);
    syncSearchEverywhere('', activeCategory, false);
  };

  const renderCategoryIcon = (kategori: SearchableItem['kategori']) => {
    if (kategori === 'pesanan') return <Package size={14} />;
    if (kategori === 'kurir') return <Truck size={14} />;
    return <User size={14} />;
  };

  const renderCategoryLabel = (kategori: SearchableItem['kategori']) => {
    if (kategori === 'pesanan') return 'No. Pesanan';
    if (kategori === 'kurir') return 'Kurir';
    return 'Pelanggan';
  };

  const unreadCount = notifications.filter((n) => n.unread).length;
  const olderCount = Math.max(
    0,
    notifications.length - MAX_VISIBLE_NOTIFICATIONS
  );
  const visibleNotifications = showAllNotifications
    ? notifications
    : notifications.slice(0, MAX_VISIBLE_NOTIFICATIONS);

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pelanggan.trim() || !alamat.trim()) return;

    const existingNums = createdOrders
      .map((o) => Number(o.id.replace(/\D/g, '')))
      .filter((n) => !Number.isNaN(n) && n >= 8910);
    const nextNumber =
      existingNums.length > 0
        ? Math.max(...existingNums) + 10
        : 8920 + Math.floor(Math.random() * 10) * 10;

    const orderId = `ORD-${nextNumber}`;
    const total = (HARGA_PRODUK[produk] || 20000) * jumlah;

    const newOrder: PesananBaru = {
      id: orderId,
      pelanggan: pelanggan.trim(),
      alamat: alamat.trim(),
      produk,
      jumlah,
      kurir,
      total,
      status: 'Menunggu Kurir',
      depo: 'Depo JKT-04',
    };

    const updatedOrders = [newOrder, ...createdOrders];
    setCreatedOrders(updatedOrders);

    try {
      localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(updatedOrders));
      window.dispatchEvent(
        new CustomEvent('galonku:order-created', { detail: newOrder })
      );
    } catch {
      // Abaikan jika storage/event tidak tersedia
    }

    setNotifications((prev) => [
      {
        id: Date.now(),
        title: `Pesanan Baru #${orderId}`,
        desc: `${newOrder.pelanggan} • ${newOrder.alamat} • Kurir: ${newOrder.kurir}`,
        time: 'Baru saja',
        unread: true,
      },
      ...prev,
    ]);

    onCreateOrder?.(newOrder);
    setShowOrderModal(false);
    setPelanggan('');
    setAlamat('');
    setJumlah(1);
    triggerToast(`Pesanan #${orderId} tersimpan & siap dicari!`);
  };

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-0 z-40 flex h-[72px] w-full items-center justify-between border-b border-[#EEF0F5] bg-white/95 px-4 backdrop-blur sm:px-6"
      >
        {/* Toast feedback ringan saat aksi berhasil */}
        {toastMessage && (
          <div className="flex items-center gap-2 rounded-xl bg-[#131B2E] px-3.5 py-2 text-xs font-medium text-white shadow-lg">
            <CheckCircle2 size={15} className="shrink-0 text-emerald-400" />
            <span className="truncate">{toastMessage}</span>
          </div>
        )}

        <div className="ml-auto flex items-center gap-2.5 sm:gap-3">
          {/* Tombol cepat reset filter saat sedang mencari */}
          {search.trim() && (
            <button
              type="button"
              onClick={resetSearchFilter}
              className="hidden h-9 items-center gap-1.5 rounded-xl border border-[#DCE5FF] bg-[#F2F6FF] px-3 text-[11px] font-bold text-[#0052FF] transition hover:bg-[#E5EEFF] sm:flex"
            >
              <RotateCcw size={13} />
              <span>Tampilkan Semua</span>
            </button>
          )}

          {/* 1. SEARCH INTERAKTIF (#ORD-..., PELANGGAN, KURIR + PESANAN BARU) */}
          <div className="relative w-[210px] sm:w-[310px]">
            <Search
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A91A3]"
            />
            <input
              type="text"
              value={search}
              onFocus={() => {
                setShowSearchDropdown(true);
                setShowNotifDropdown(false);
              }}
              onChange={(e) => {
                const val = e.target.value;
                setSearch(val);
                setHighlightedIndex(0);
                setShowSearchDropdown(true);
                syncSearchEverywhere(val, activeCategory, false);
              }}
              onKeyDown={(e) => {
                if (!showSearchDropdown && search.trim()) {
                  setShowSearchDropdown(true);
                }

                if (e.key === 'ArrowDown' && filteredResults.length > 0) {
                  e.preventDefault();
                  setHighlightedIndex((prev) =>
                    prev + 1 >= filteredResults.length ? 0 : prev + 1
                  );
                } else if (e.key === 'ArrowUp' && filteredResults.length > 0) {
                  e.preventDefault();
                  setHighlightedIndex((prev) =>
                    prev - 1 < 0 ? filteredResults.length - 1 : prev - 1
                  );
                } else if (e.key === 'Enter') {
                  e.preventDefault();
                  if (
                    showSearchDropdown &&
                    filteredResults.length > 0 &&
                    filteredResults[highlightedIndex]
                  ) {
                    handlePickResult(filteredResults[highlightedIndex]);
                  } else {
                    executeGlobalSearch(search);
                  }
                } else if (e.key === 'Escape') {
                  setShowSearchDropdown(false);
                }
              }}
              placeholder="Cari #ORD-8910, pelanggan, kurir..."
              className="h-10 w-full rounded-xl border border-transparent bg-[#F2F4FA] pl-10 pr-8 text-xs text-[#131B2E] outline-none transition placeholder:text-[#8A91A3] focus:border-[#0052FF] focus:bg-white"
            />
            {search && (
              <button
                type="button"
                aria-label="Hapus pencarian"
                onClick={resetSearchFilter}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8A91A3] hover:text-[#131B2E]"
              >
                <X size={14} />
              </button>
            )}

            {/* Dropdown Interaktif dengan Tab Kategori & Hasil Instan */}
            {showSearchDropdown && (
              <div className="absolute right-0 mt-2 w-[320px] rounded-2xl border border-[#EEF0F5] bg-white p-2.5 shadow-xl sm:left-0 sm:right-auto sm:w-[375px]">
                <div className="mb-2 flex items-center gap-1 overflow-x-auto rounded-xl bg-[#F2F4FA] p-1">
                  {CATEGORY_TABS.map((tab) => {
                    const isActive = activeCategory === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => {
                          setActiveCategory(tab.id);
                          setHighlightedIndex(0);
                          if (search.trim()) {
                            syncSearchEverywhere(search.trim(), tab.id, false);
                          }
                        }}
                        className={`shrink-0 rounded-lg px-2.5 py-1 text-[11px] font-semibold transition ${
                          isActive
                            ? 'bg-white text-[#0052FF] shadow-2xs'
                            : 'text-[#596378] hover:text-[#131B2E]'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                <div className="mb-1.5 flex items-center justify-between px-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8A91A3]">
                    {search.trim()
                      ? `Cocok (${filteredResults.length})`
                      : 'Pesanan & Kurir Terbaru'}
                  </span>
                  {search.trim() && (
                    <button
                      type="button"
                      onClick={() => executeGlobalSearch(search)}
                      className="flex items-center gap-1 text-[11px] font-semibold text-[#0052FF] hover:underline"
                    >
                      <span>Tampilkan &ldquo;{search.trim()}&rdquo; saja</span>
                      <CornerDownLeft size={12} />
                    </button>
                  )}
                </div>

                {filteredResults.length > 0 ? (
                  <div className="max-h-64 space-y-1 overflow-y-auto pr-0.5">
                    {filteredResults.slice(0, 6).map((item, idx) => {
                      const isHighlighted = idx === highlightedIndex;
                      return (
                        <button
                          key={`${item.kategori}-${item.id}`}
                          type="button"
                          onMouseEnter={() => setHighlightedIndex(idx)}
                          onClick={() => handlePickResult(item)}
                          className={`flex w-full items-center justify-between gap-2.5 rounded-xl px-2.5 py-2 text-left transition ${
                            isHighlighted ? 'bg-[#F2F4FA]' : 'hover:bg-[#F2F4FA]'
                          }`}
                        >
                          <div className="flex min-w-0 items-start gap-2.5">
                            <div className="mt-0.5 shrink-0 rounded-lg bg-[#0052FF]/10 p-1.5 text-[#0052FF]">
                              {renderCategoryIcon(item.kategori)}
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <p className="truncate text-xs font-bold text-[#131B2E]">
                                  {item.judul}
                                </p>
                                <span className="shrink-0 rounded bg-[#EEF2FF] px-1.5 py-0.5 text-[10px] font-semibold text-[#0052FF]">
                                  {renderCategoryLabel(item.kategori)}
                                </span>
                              </div>
                              <p className="truncate text-[11px] text-[#596378]">
                                {item.subjudul}
                              </p>
                            </div>
                          </div>

                          <span className="shrink-0 rounded-md bg-[#F2F4FA] px-2 py-0.5 text-[10px] font-medium text-[#293246]">
                            {item.badge}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="px-3 py-4 text-center">
                    <p className="text-xs text-[#8A91A3]">
                      Belum ada di daftar cepat untuk &ldquo;{search}&rdquo;.
                    </p>
                    <button
                      type="button"
                      onClick={() => executeGlobalSearch(search)}
                      className="mt-2 rounded-lg bg-[#0052FF]/10 px-3 py-1.5 text-[11px] font-bold text-[#0052FF] hover:bg-[#0052FF]/15"
                    >
                      Filter Halaman Ini Saja
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 2. TOMBOL & POPOVER NOTIFIKASI (3 TERBARU + RIWAYAT LAMA) */}
          <div className="relative">
            <button
              type="button"
              aria-label="Notifikasi"
              onClick={() => {
                setShowNotifDropdown((prev) => {
                  const next = !prev;
                  if (!next) setShowAllNotifications(false);
                  return next;
                });
                setShowSearchDropdown(false);
              }}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#596378] transition hover:bg-[#F3F5FA]"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#D93636]" />
              )}
            </button>

            {showNotifDropdown && (
              <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] max-w-xs rounded-2xl border border-[#EEF0F5] bg-white p-3 shadow-xl sm:w-80">
                <div className="mb-2 flex items-center justify-between px-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#131B2E]">
                      Notifikasi ({unreadCount} baru)
                    </span>
                    <span className="rounded-md bg-[#F2F4FA] px-1.5 py-0.5 text-[10px] font-medium text-[#596378]">
                      {showAllNotifications
                        ? `Semua (${notifications.length})`
                        : `${Math.min(MAX_VISIBLE_NOTIFICATIONS, notifications.length)} terbaru`}
                    </span>
                  </div>
                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={markAllAsRead}
                      className="text-[11px] font-semibold text-[#0052FF] hover:underline"
                    >
                      Tandai dibaca
                    </button>
                  )}
                </div>

                <div
                  className={`space-y-1.5 overflow-y-auto pr-0.5 ${
                    showAllNotifications ? 'max-h-72' : 'max-h-60'
                  }`}
                >
                  {visibleNotifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => markAsRead(notif.id)}
                      className={`cursor-pointer rounded-xl p-2.5 transition ${
                        notif.unread
                          ? 'bg-[#0052FF]/[0.05] hover:bg-[#0052FF]/[0.09]'
                          : 'hover:bg-[#F2F4FA]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs font-bold text-[#131B2E]">
                          {notif.title}
                        </p>
                        {notif.unread && (
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#0052FF]" />
                        )}
                      </div>
                      <p className="mt-0.5 text-[11px] text-[#596378]">{notif.desc}</p>
                      <p className="mt-1 text-[10px] text-[#8A91A3]">{notif.time}</p>
                    </div>
                  ))}
                </div>

                {olderCount > 0 && (
                  <div className="mt-2 border-t border-[#EEF0F5] pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAllNotifications((prev) => !prev)}
                      className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#F2F4FA] py-2 text-[11px] font-bold text-[#293246] transition hover:bg-[#E6EAF5]"
                    >
                      {showAllNotifications ? (
                        <>
                          <ChevronUp size={14} className="text-[#0052FF]" />
                          <span>Sembunyikan Notifikasi Lama</span>
                        </>
                      ) : (
                        <>
                          <History size={14} className="text-[#0052FF]" />
                          <span>Lihat {olderCount} Notifikasi Lama</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 3. TOMBOL BUAT PESANAN */}
          <button
            type="button"
            onClick={() => {
              setShowOrderModal(true);
              setShowNotifDropdown(false);
              setShowSearchDropdown(false);
            }}
            className="flex h-10 shrink-0 items-center gap-2 rounded-xl bg-[#0052FF] px-3.5 text-xs font-bold text-white shadow-sm shadow-[#0052FF]/20 transition hover:bg-[#0047DE] active:scale-[0.98] sm:px-4"
          >
            <Plus size={16} />
            <span>Buat Pesanan</span>
          </button>
        </div>
      </header>

      {/* MODAL FORM BUAT PESANAN */}
      {showOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-[#131B2E]">Buat Pesanan Galon</h2>
                <p className="text-xs text-[#8A91A3]">
                  Pesanan baru otomatis memakai format #ORD-... & bisa dicari
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowOrderModal(false)}
                className="rounded-lg p-1.5 text-[#8A91A3] hover:bg-[#F2F4FA] hover:text-[#131B2E]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-3.5">
              <div>
                <label className="mb-1 block text-xs font-semibold text-[#293246]">
                  Nama Pelanggan / Instansi
                </label>
                <input
                  type="text"
                  required
                  value={pelanggan}
                  onChange={(e) => setPelanggan(e.target.value)}
                  placeholder="Contoh: Ibu Fitriani / Warung Makan Sederhana"
                  className="h-10 w-full rounded-xl border border-[#EEF0F5] bg-[#F2F4FA] px-3 text-xs text-[#131B2E] outline-none focus:border-[#0052FF] focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-[#293246]">
                  Alamat Pengiriman
                </label>
                <input
                  type="text"
                  required
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  placeholder="Contoh: Jl. Mawar No. 12"
                  className="h-10 w-full rounded-xl border border-[#EEF0F5] bg-[#F2F4FA] px-3 text-xs text-[#131B2E] outline-none focus:border-[#0052FF] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="mb-1 block text-xs font-semibold text-[#293246]">
                    Muatan / Jenis Galon
                  </label>
                  <select
                    value={produk}
                    onChange={(e) => setProduk(e.target.value)}
                    className="h-10 w-full rounded-xl border border-[#EEF0F5] bg-[#F2F4FA] px-3 text-xs text-[#131B2E] outline-none focus:border-[#0052FF] focus:bg-white"
                  >
                    <option value="3 Galon Aqua">3 Galon Aqua (Rp 63.000)</option>
                    <option value="2 Galon Le Minerale">2 Galon Le Minerale (Rp 40.000)</option>
                    <option value="Aqua 19L">Aqua 19L (Rp 21.000)</option>
                    <option value="Le Minerale 15L">Le Minerale 15L (Rp 20.000)</option>
                    <option value="Isi Ulang RO 19L">Isi Ulang RO 19L (Rp 7.000)</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-[#293246]">
                    Jumlah Paket
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={jumlah}
                    onChange={(e) => setJumlah(Number(e.target.value))}
                    className="h-10 w-full rounded-xl border border-[#EEF0F5] bg-[#F2F4FA] px-3 text-xs text-[#131B2E] outline-none focus:border-[#0052FF] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-[#293246]">
                  Tugaskan Kurir
                </label>
                <select
                  value={kurir}
                  onChange={(e) => setKurir(e.target.value)}
                  className="h-10 w-full rounded-xl border border-[#EEF0F5] bg-[#F2F4FA] px-3 text-xs text-[#131B2E] outline-none focus:border-[#0052FF] focus:bg-white"
                >
                  <option value="Hendra Kurnia">Hendra Kurnia (Honda Revo • B 5502 TYA)</option>
                  <option value="Pak Budi Santoso">Pak Budi Santoso (Honda Beat • B 4120 SZX)</option>
                  <option value="Raynar Putra M.">Raynar Putra M. (Honda Beat • B 3434 RTA)</option>
                  <option value="Mas Doni Wijaya">Mas Doni Wijaya (Honda Vario • B 6891 PQR)</option>
                </select>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-[#F2F4FA] px-4 py-3">
                <span className="text-xs font-medium text-[#596378]">Estimasi Total</span>
                <span className="text-sm font-bold text-[#0052FF]">
                  Rp {((HARGA_PRODUK[produk] || 20000) * jumlah).toLocaleString('id-ID')}
                </span>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowOrderModal(false)}
                  className="h-10 rounded-xl px-4 text-xs font-bold text-[#596378] hover:bg-[#F2F4FA]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="h-10 rounded-xl bg-[#0052FF] px-5 text-xs font-bold text-white shadow-sm shadow-[#0052FF]/20 hover:bg-[#0047DE]"
                >
                  Simpan Pesanan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}