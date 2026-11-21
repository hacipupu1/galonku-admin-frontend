'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  CalendarDays,
  Bell,
  Plus,
  X,
  Package,
  Truck,
  ChevronDown,
  CheckCircle2,
} from 'lucide-react';

// Tipe data opsional jika ingin disambungkan ke state global / API
export interface PesananBaru {
  id: string;
  pelanggan: string;
  alamat: string;
  produk: string;
  jumlah: number;
  kurir: string;
  total: number;
}

interface HeaderProps {
  onSearchSubmit?: (query: string) => void;
  onDateChange?: (selectedDate: string, label: string) => void;
  onCreateOrder?: (order: PesananBaru) => void;
}

// Data dummy untuk simulasi Live Search & Notifikasi (bisa diganti data API/props)
const MOCK_SEARCH_DATA = [
  { id: 'GLK-1042', tipe: 'Pesanan', judul: '#GLK-1042 - Budi Santoso', detail: '3x Galon Aqua 19L • Diantar' },
  { id: 'GLK-1041', tipe: 'Pesanan', judul: '#GLK-1041 - Warung Bu Siti', detail: '5x Isi Ulang RO • Menunggu Kurir' },
  { id: 'KUR-01', tipe: 'Kurir', judul: 'Rizky Pratama (Kurir Motor)', detail: 'Aktif • 4 pengiriman tersisa' },
  { id: 'KUR-02', tipe: 'Kurir', judul: 'Deni Kurniawan (Kurir Pick-up)', detail: 'Aktif • 2 pengiriman tersisa' },
];

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: 'Pesanan Baru #GLK-1043',
    desc: 'Ibu Rina memesan 2 Galon Le Minerale (COD).',
    time: '2 menit lalu',
    unread: true,
  },
  {
    id: 2,
    title: 'Pengiriman Selesai',
    desc: 'Kurir Rizky telah menyelesaikan pesanan #GLK-1039.',
    time: '18 menit lalu',
    unread: true,
  },
  {
    id: 3,
    title: 'Stok Galon Kosong Menipis',
    desc: 'Sisa stok galon kosong di gudang tinggal 14 unit.',
    time: '1 jam lalu',
    unread: false,
  },
];

const HARGA_PRODUK: Record<string, number> = {
  'Aqua 19L': 21000,
  'Le Minerale 15L': 20000,
  'Isi Ulang RO 19L': 7000,
};

export default function Header({
  onSearchSubmit,
  onDateChange,
  onCreateOrder,
}: HeaderProps) {
  // 1. State Pencarian
  const [search, setSearch] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  // 2. State Tanggal
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [dateLabel, setDateLabel] = useState('Hari ini, 24 Mei');
  const [customDate, setCustomDate] = useState('2026-05-24');

  // 3. State Notifikasi
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // 4. State Modal Buat Pesanan
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [pelanggan, setPelanggan] = useState('');
  const [alamat, setAlamat] = useState('');
  const [produk, setProduk] = useState('Aqua 19L');
  const [jumlah, setJumlah] = useState(1);
  const [kurir, setKurir] = useState('Rizky Pratama');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const headerRef = useRef<HTMLDivElement>(null);

  // Tutup semua dropdown saat klik di luar header
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setShowSearchDropdown(false);
        setShowDateDropdown(false);
        setShowNotifDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filter hasil pencarian instan
  const filteredResults = MOCK_SEARCH_DATA.filter(
    (item) =>
      item.judul.toLowerCase().includes(search.toLowerCase()) ||
      item.detail.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectPresetDate = (label: string, isoDate: string) => {
    setDateLabel(label);
    setCustomDate(isoDate);
    setShowDateDropdown(false);
    onDateChange?.(isoDate, label);
    triggerToast(`Filter tanggal diubah ke: ${label}`);
  };

  const handleCustomDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!val) return;
    setCustomDate(val);
    const formatted = new Date(val).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    setDateLabel(formatted);
    setShowDateDropdown(false);
    onDateChange?.(val, formatted);
    triggerToast(`Filter tanggal diubah ke: ${formatted}`);
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

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

    const orderId = `GLK-${Math.floor(1044 + Math.random() * 900)}`;
    const total = (HARGA_PRODUK[produk] || 20000) * jumlah;

    const newOrder: PesananBaru = {
      id: orderId,
      pelanggan,
      alamat,
      produk,
      jumlah,
      kurir,
      total,
    };

    // Tambahkan juga ke daftar notifikasi secara real-time
    setNotifications((prev) => [
      {
        id: Date.now(),
        title: `Pesanan Dibuat #${orderId}`,
        desc: `${pelanggan} (${jumlah}x ${produk}) • Kurir: ${kurir}`,
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
    triggerToast(`Pesanan #${orderId} berhasil dibuat!`);
  };

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-0 z-40 flex h-[72px] w-full items-center justify-between border-b border-[#EEF0F5] bg-white/95 px-6 backdrop-blur"
      >
        {/* Toast feedback ringan saat aksi berhasil */}
        {toastMessage && (
          <div className="flex items-center gap-2 rounded-xl bg-[#131B2E] px-3.5 py-2 text-xs font-medium text-white shadow-lg">
            <CheckCircle2 size={15} className="text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        <div className="ml-auto flex items-center gap-3">
          {/* 1. INPUT PENCARIAN + LIVE DROPDOWN */}
          <div className="relative w-[280px]">
            <Search
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A91A3]"
            />
            <input
              type="text"
              value={search}
              onFocus={() => setShowSearchDropdown(true)}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowSearchDropdown(true);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && search.trim()) {
                  onSearchSubmit?.(search);
                  setShowSearchDropdown(false);
                  triggerToast(`Mencari "${search}"...`);
                }
              }}
              placeholder="Cari pesanan, resi, kurir..."
              className="h-10 w-full rounded-xl border border-transparent bg-[#F2F4FA] pl-10 pr-8 text-xs text-[#131B2E] outline-none transition placeholder:text-[#8A91A3] focus:border-[#0052FF] focus:bg-white"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8A91A3] hover:text-[#131B2E]"
              >
                <X size={14} />
              </button>
            )}

            {/* Dropdown Hasil Pencarian Instan */}
            {showSearchDropdown && search.trim().length > 0 && (
              <div className="absolute left-0 mt-2 w-[340px] rounded-2xl border border-[#EEF0F5] bg-white p-2 shadow-xl">
                <p className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#8A91A3]">
                  Hasil Pencarian ({filteredResults.length})
                </p>
                {filteredResults.length > 0 ? (
                  <div className="space-y-1">
                    {filteredResults.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setSearch(item.judul);
                          setShowSearchDropdown(false);
                          onSearchSubmit?.(item.id);
                          triggerToast(`Membuka detail ${item.judul}`);
                        }}
                        className="flex w-full items-start gap-3 rounded-xl px-3 py-2 text-left transition hover:bg-[#F2F4FA]"
                      >
                        <div className="mt-0.5 rounded-lg bg-[#0052FF]/10 p-1.5 text-[#0052FF]">
                          {item.tipe === 'Pesanan' ? (
                            <Package size={14} />
                          ) : (
                            <Truck size={14} />
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#131B2E]">{item.judul}</p>
                          <p className="text-[11px] text-[#596378]">{item.detail}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="px-3 py-4 text-center text-xs text-[#8A91A3]">
                    Tidak ada pesanan, resi, atau kurir yang cocok.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* 2. FILTER TANGGAL INTERAKTIF */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowDateDropdown((prev) => !prev);
                setShowNotifDropdown(false);
                setShowSearchDropdown(false);
              }}
              className="flex h-10 items-center gap-2 rounded-xl bg-[#F2F4FA] px-3.5 text-xs font-bold text-[#293246] transition hover:bg-[#E6EAF5]"
            >
              <CalendarDays size={15} className="text-[#0052FF]" />
              <span>{dateLabel}</span>
              <ChevronDown size={14} className="text-[#8A91A3]" />
            </button>

            {showDateDropdown && (
              <div className="absolute right-0 mt-2 w-60 rounded-2xl border border-[#EEF0F5] bg-white p-2 shadow-xl">
                <p className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#8A91A3]">
                  Rentang Operasional
                </p>
                <div className="space-y-1">
                  {[
                    { label: 'Hari ini, 24 Mei', iso: '2026-05-24' },
                    { label: 'Kemarin, 23 Mei', iso: '2026-05-23' },
                    { label: '7 Hari Terakhir', iso: '2026-05-17' },
                    { label: 'Bulan Mei 2026', iso: '2026-05-01' },
                  ].map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => handleSelectPresetDate(opt.label, opt.iso)}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-medium transition ${
                        dateLabel === opt.label
                          ? 'bg-[#0052FF]/10 font-bold text-[#0052FF]'
                          : 'text-[#293246] hover:bg-[#F2F4FA]'
                      }`}
                    >
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-2 border-t border-[#EEF0F5] pt-2">
                  <label className="block px-2 pb-1 text-[11px] font-medium text-[#8A91A3]">
                    Pilih Tanggal Spesifik:
                  </label>
                  <input
                    type="date"
                    value={customDate}
                    onChange={handleCustomDateChange}
                    className="w-full rounded-xl border border-[#EEF0F5] bg-[#F2F4FA] px-3 py-1.5 text-xs text-[#131B2E] outline-none focus:border-[#0052FF]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 3. TOMBOL & POPOVER NOTIFIKASI */}
          <div className="relative">
            <button
              type="button"
              aria-label="Notifikasi"
              onClick={() => {
                setShowNotifDropdown((prev) => !prev);
                setShowDateDropdown(false);
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
              <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-[#EEF0F5] bg-white p-3 shadow-xl">
                <div className="mb-2 flex items-center justify-between px-1">
                  <span className="text-xs font-bold text-[#131B2E]">
                    Notifikasi ({unreadCount} baru)
                  </span>
                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={markAllAsRead}
                      className="text-[11px] font-semibold text-[#0052FF] hover:underline"
                    >
                      Tandai semua dibaca
                    </button>
                  )}
                </div>

                <div className="max-h-64 space-y-1.5 overflow-y-auto">
                  {notifications.map((notif) => (
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
                        <p className="text-xs font-bold text-[#131B2E]">{notif.title}</p>
                        {notif.unread && (
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#0052FF]" />
                        )}
                      </div>
                      <p className="mt-0.5 text-[11px] text-[#596378]">{notif.desc}</p>
                      <p className="mt-1 text-[10px] text-[#8A91A3]">{notif.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 4. TOMBOL BUAT PESANAN */}
          <button
            type="button"
            onClick={() => {
              setShowOrderModal(true);
              setShowDateDropdown(false);
              setShowNotifDropdown(false);
            }}
            className="flex h-10 items-center gap-2 rounded-xl bg-[#0052FF] px-4 text-xs font-bold text-white shadow-sm shadow-[#0052FF]/20 transition hover:bg-[#0047DE] active:scale-[0.98]"
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
                  Input pesanan baru untuk langsung dijadwalkan ke kurir
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
                  Nama Pelanggan
                </label>
                <input
                  type="text"
                  required
                  value={pelanggan}
                  onChange={(e) => setPelanggan(e.target.value)}
                  placeholder="Contoh: Pak Hendra / Toko Maju"
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
                  placeholder="Jl. Merdeka No. 12, Blok B"
                  className="h-10 w-full rounded-xl border border-[#EEF0F5] bg-[#F2F4FA] px-3 text-xs text-[#131B2E] outline-none focus:border-[#0052FF] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="mb-1 block text-xs font-semibold text-[#293246]">
                    Jenis Galon
                  </label>
                  <select
                    value={produk}
                    onChange={(e) => setProduk(e.target.value)}
                    className="h-10 w-full rounded-xl border border-[#EEF0F5] bg-[#F2F4FA] px-3 text-xs text-[#131B2E] outline-none focus:border-[#0052FF] focus:bg-white"
                  >
                    <option value="Aqua 19L">Aqua 19L (Rp 21.000)</option>
                    <option value="Le Minerale 15L">Le Minerale 15L (Rp 20.000)</option>
                    <option value="Isi Ulang RO 19L">Isi Ulang RO 19L (Rp 7.000)</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-[#293246]">
                    Jumlah
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
                  <option value="Rizky Pratama">Rizky Pratama (Motor)</option>
                  <option value="Deni Kurniawan">Deni Kurniawan (Pick-up)</option>
                  <option value="Bagas Saputra">Bagas Saputra (Motor)</option>
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