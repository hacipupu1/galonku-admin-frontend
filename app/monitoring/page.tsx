"use client";

import { useMemo, useState, useRef } from "react";
import {
  Bell,
  CalendarDays,
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  Menu,
  Package,
  Plus,
  Search,
  Truck,
  UserRound,
  X,
  LogOut,
  Clock,
  Store,
  Compass,
  ListFilter,
  Map,
  Phone,
  RotateCw,
  Users,
} from "lucide-react";

type Courier = {
  id: string;
  name: string;
  vehicle: string;
  plate: string;
  status: "Di Jalan" | "Standby Depo";
  orderId?: string;
  taskDesc?: string;
  depoNote?: string;
  departureTime?: string;
  eta?: string;
};

type Delivery = {
  id: string;
  time: string;
  courierName: string;
  courierPlate: string;
  avatarInitial: string;
  address: string;
  recipient: string;
  note?: string;
  items: string;
  progressPercent: number;
  progressText: string;
  distanceText: string;
  status: "Diantar" | "Diproses";
};

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: false },
  { label: "Manajemen Pesanan", icon: ClipboardList, active: false },
  { label: "Produk & Stok", icon: Package, active: false },
  { label: "Monitoring Pengantaran", icon: Truck, active: true },
  { label: "Laporan Keuangan", icon: CreditCard, active: false },
];

const initialCouriers: Courier[] = [
  {
    id: "c1",
    name: "Pak Budi Santoso",
    vehicle: "Honda Beat",
    plate: "B 4120 SZX",
    status: "Di Jalan",
    orderId: "#ORD-8821",
    taskDesc: "Membawa 3 Galon Aqua ke Jl. Mawar No. 12, Kebayoran Lama",
    departureTime: "10:45",
    eta: "Est. 6 menit lagi",
  },
  {
    id: "c2",
    name: "Mas Doni Wijaya",
    vehicle: "Honda Vario",
    plate: "B 6891 FQR",
    status: "Di Jalan",
    orderId: "#ORD-8822",
    taskDesc: "Membawa 2 Galon Le Minerale ke Gandaria Heights Lt. 08",
    departureTime: "10:55",
    eta: "Est. 12 menit lagi",
  },
  {
    id: "c3",
    name: "Pak Agus Prasetyo",
    vehicle: "Honda Scoopy",
    plate: "B 3310 KLM",
    status: "Standby Depo",
    depoNote:
      "Telah menyelesaikan 7 pengantaran pagi. Siap menerima penugasan kloter berikutnya.",
  },
  {
    id: "c4",
    name: "Hendra Kurnia",
    vehicle: "Honda Revo",
    plate: "B 5502 TYA",
    status: "Di Jalan",
    orderId: "#ORD-8824",
    taskDesc:
      "Membawa 4 Galon (2 Aqua + 2 Cleo) ke Apartemen Gandaria Lt. 14",
    departureTime: "11:05",
    eta: "Est. 15 menit lagi",
  },
];

const initialDeliveries: Delivery[] = [
  {
    id: "#ORD-8821",
    time: "10:42 WIB",
    courierName: "Pak Budi",
    courierPlate: "B 4120 SZX",
    avatarInitial: "P",
    address: "Jl. Mawar No. 12",
    recipient: "Ibu Fitriani (0812-9958-xxx)",
    note: "Patokan: Sebelah Pos RW 03",
    items: "3 Galon Aqua",
    progressPercent: 75,
    progressText: "75% Selesai 6 mnt lagi",
    distanceText: "Jarak: 600m ke titik kirim",
    status: "Diantar",
  },
  {
    id: "#ORD-8822",
    time: "10:51 WIB",
    courierName: "Mas Doni",
    courierPlate: "B 6891 FQR",
    avatarInitial: "M",
    address: "Gandaria Heights Lt. 08 #8B",
    recipient: "Bpk. Ronald (0817-2345-xxx)",
    note: "Titip di Lobby Resepsionis",
    items: "2 Galon Le Minerale",
    progressPercent: 45,
    progressText: "45% Selesai 12 mnt lagi",
    distanceText: "Jarak: 1.8 KM (Lampu Merah Kyai Maja)",
    status: "Diantar",
  },
  {
    id: "#ORD-8824",
    time: "11:02 WIB",
    courierName: "Hendra K.",
    courierPlate: "B 5502 TYA",
    avatarInitial: "H",
    address: "Apartemen 1Park Residences Lt. 14",
    recipient: "Sdr. Kevin Hadi (0852-1100-xxx)",
    note: "Bawa Troli Depo",
    items: "4 Galon Campur",
    progressPercent: 25,
    progressText: "25% Selesai 15 mnt lagi",
    distanceText: "Jarak: 2.7 KM (Baru keluar Depo)",
    status: "Diantar",
  },
  {
    id: "#ORD-8825",
    time: "11:15 WIB",
    courierName: "Rian Pratama",
    courierPlate: "B 3912 BKN",
    avatarInitial: "R",
    address: "Komp. Lemigas Blok B4",
    recipient: "Ibu Maya (0811-9481-xxx)",
    note: "Bayar COD Rp 54.000",
    items: "3 Galon Aqua",
    progressPercent: 10,
    progressText: "Sedang Muat Depo JKT-04",
    distanceText: "Persiapan berangkat",
    status: "Diproses",
  },
];

export default function MonitoringPage() {
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("2026-05-24");
  const [activeFilter, setActiveFilter] = useState<
    "Semua" | "Di Jalan" | "Standby Depo" | "Riwayat"
  >("Semua");

  const dateInputRef = useRef<HTMLInputElement>(null);

  const formattedDateText = useMemo(() => {
    if (!selectedDate) return "Hari ini, 24 Mei";
    const d = new Date(selectedDate);
    if (isNaN(d.getTime())) return "Hari ini, 24 Mei";

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ];
    return `Hari ini, ${d.getDate()} ${months[d.getMonth()]}`;
  }, [selectedDate]);

  const handleOpenCalendar = () => {
  const input = dateInputRef.current;
  if (!input) return;

  if (typeof (input as any).showPicker === "function") {
    (input as any).showPicker();
  } else {
    input.click();
  }
};

  const filteredCouriers = useMemo(() => {
    return initialCouriers.filter((c) => {
      const matchFilter =
        activeFilter === "Semua" ||
        (activeFilter === "Di Jalan" && c.status === "Di Jalan") ||
        (activeFilter === "Standby Depo" && c.status === "Standby Depo") ||
        activeFilter === "Riwayat";

      const query = search.toLowerCase().trim();
      const matchSearch =
        !query ||
        c.name.toLowerCase().includes(query) ||
        c.plate.toLowerCase().includes(query) ||
        (c.orderId && c.orderId.toLowerCase().includes(query));

      return matchFilter && matchSearch;
    });
  }, [activeFilter, search]);

  const filteredDeliveries = useMemo(() => {
    return initialDeliveries.filter((d) => {
      const matchFilter =
        activeFilter === "Semua" ||
        (activeFilter === "Di Jalan" && d.status === "Diantar") ||
        (activeFilter === "Standby Depo" && d.status === "Diproses") ||
        activeFilter === "Riwayat";

      const query = search.toLowerCase().trim();
      const matchSearch =
        !query ||
        d.id.toLowerCase().includes(query) ||
        d.courierName.toLowerCase().includes(query) ||
        d.address.toLowerCase().includes(query);

      return matchFilter && matchSearch;
    });
  }, [activeFilter, search]);

  return (
    <div className="min-h-screen bg-[#F7F8FC] text-[#131B2E]">
      {/* MOBILE OVERLAY */}
      {mobileSidebar && (
        <button
          type="button"
          aria-label="Tutup menu"
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          onClick={() => setMobileSidebar(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[248px] flex-col border-r border-[#E9ECF4] bg-white transition-transform duration-300 lg:translate-x-0 ${
          mobileSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[72px] items-center border-b border-[#EEF0F5] px-6">
          <div>
            <div className="text-[18px] font-extrabold tracking-[-0.04em] text-[#0052FF]">
              GalonKu Admin
            </div>
            <div className="mt-0.5 text-[10px] font-medium text-[#6F7890]">
              Portal Manajemen &amp; Operasional
            </div>
          </div>

          <button
            type="button"
            aria-label="Tutup menu"
            className="ml-auto rounded-lg p-2 text-[#6F7890] hover:bg-[#F3F5FA] lg:hidden"
            onClick={() => setMobileSidebar(false)}
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <p className="px-3 text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#737C91]">
            Menu Utama
          </p>

          <nav className="mt-4 space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  type="button"
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[14px] font-semibold transition ${
                    item.active
                      ? "bg-[#0052FF] text-white shadow-[0_8px_18px_rgba(0,82,255,0.18)]"
                      : "text-[#293246] hover:bg-[#F1F4FB]"
                  }`}
                >
                  <Icon size={18} strokeWidth={1.8} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-[#EEF0F5] p-4">
          <div className="flex items-center gap-3 rounded-xl bg-[#F1F3FF] px-3 py-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0052FF] text-white">
              <UserRound size={18} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-bold text-[#131B2E]">
                Budi Santoso
              </p>
              <p className="text-[10px] text-[#687289]">Super Admin</p>
            </div>

            <button
              type="button"
              aria-label="Keluar"
              className="rounded-lg p-1.5 text-[#536079] hover:bg-white"
            >
              <LogOut size={17} />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="lg:pl-[248px]">
        {/* TOP HEADER */}
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-[#ECEEF4] bg-white/95 px-4 backdrop-blur md:px-6">
          <button
            type="button"
            aria-label="Buka menu"
            className="rounded-xl p-2 text-[#374258] hover:bg-[#F3F5FA] lg:hidden"
            onClick={() => setMobileSidebar(true)}
          >
            <Menu size={22} />
          </button>

          <div className="ml-auto flex items-center gap-2 md:gap-3">
            <div className="relative hidden w-[270px] md:block">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A849A]"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari pesanan, resi, kurir..."
                className="h-11 w-full rounded-xl border border-transparent bg-[#F2F1FC] pl-10 pr-4 text-[12px] text-[#131B2E] outline-none transition placeholder:text-[#8A91A3] focus:border-[#0052FF] focus:bg-white"
              />
            </div>

            {/* TOMBOL KALENDER BISA DIKLIK */}
            <button
              type="button"
              onClick={handleOpenCalendar}
              className="hidden h-11 items-center gap-2 rounded-xl bg-[#F2F1FC] px-4 text-[12px] font-bold text-[#293246] transition hover:bg-[#E8EBFA] sm:flex relative cursor-pointer"
            >
              <CalendarDays size={16} className="text-[#0052FF]" />
              <span>{formattedDateText}</span>
              <input
                ref={dateInputRef}
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="sr-only"
              />
            </button>

            <button
              type="button"
              aria-label="Notifikasi"
              className="relative flex h-11 w-11 items-center justify-center rounded-xl hover:bg-[#F3F5FA]"
            >
              <Bell size={20} />
              <span className="absolute right-2.5 top-2 h-2 w-2 rounded-full bg-[#D93636]" />
            </button>

            <button
              type="button"
              className="hidden h-11 items-center gap-2 rounded-xl bg-[#0052FF] px-4 text-[12px] font-bold text-white shadow-[0_6px_14px_rgba(0,82,255,0.16)] transition hover:bg-[#0047DE] sm:flex"
            >
              <Plus size={17} />
              Buat Pesanan
            </button>
          </div>
        </header>

        {/* CONTENT AREA */}
        <main className="mx-auto max-w-[1500px] p-4 md:p-6 space-y-4">
          {/* SECTION HEADER */}
          <section className="rounded-2xl border border-[#EEF0F5] bg-white p-5 shadow-[0_2px_10px_rgba(19,27,46,0.02)] md:p-6">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.04em] text-[#087D86]">
                  <Truck size={15} />
                  Fleet Logistics &amp; Live Dispatch
                </div>
                <h1 className="mt-1 text-[22px] font-extrabold tracking-[-0.035em] text-[#131B2E] md:text-[24px]">
                  Monitoring Pengantaran
                </h1>
                <p className="mt-1 text-[11px] text-[#6D768A]">
                  Pelacakan armada kurir motor, status pengiriman pesanan, dan efisiensi rute depo secara langsung.
                </p>
              </div>

              {/* ACTION BUTTON GROUP */}
              <div className="flex flex-col items-end gap-2 shrink-0">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    className="flex h-9 items-center gap-1.5 rounded-xl bg-[#F0F3FF] px-3 text-[11px] font-bold text-[#0052FF]"
                  >
                    <ListFilter size={14} /> Daftar
                  </button>
                  <button
                    type="button"
                    className="flex h-9 items-center gap-1.5 rounded-xl bg-[#F0F3FF] px-3 text-[11px] font-bold text-[#5A6478] hover:text-[#131B2E]"
                  >

<Map size={14} />
Live Peta
                  </button>
                  <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F0F3FF] text-[#5A6478] hover:text-[#131B2E]"
                  >
                    <RotateCw size={14} />
                  </button>
                </div>

                <button
                  type="button"
                  className="flex h-10 items-center gap-2 rounded-xl bg-[#0052FF] px-4 text-[11px] font-bold text-white shadow-[0_4px_12px_rgba(0,82,255,0.18)] transition hover:bg-[#0047DE]"
                >
                  <Plus size={15} /> Tambah Armada Kurir
                </button>
              </div>
            </div>
          </section>

          {/* STAT CARDS */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-[#EEF0F5] bg-white p-5 flex items-center justify-between">
              <div>
                <p className="text-[12px] font-medium text-[#596378]">Total Armada</p>
                <div className="mt-1 flex items-end gap-1.5">
                  <span className="text-[22px] font-extrabold text-[#131B2E]">6</span>
                  <span className="mb-0.5 text-[11px] font-semibold text-[#6C7588]">Kurir Motor</span>
                </div>
                <p className="mt-2 text-[10px] font-bold text-[#0052FF]">+ Kapasitas 100% Siaga</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EBF2FF] text-[#0052FF]">
                <Users size={20} />
              </div>
            </div>

            <div className="rounded-2xl border border-[#EEF0F5] bg-white p-5 flex items-center justify-between">
              <div>
                <p className="text-[12px] font-medium text-[#596378]">Sedang Mengantar</p>
                <div className="mt-1 flex items-end gap-1.5">
                  <span className="text-[22px] font-extrabold text-[#131B2E]">4</span>
                  <span className="mb-0.5 text-[11px] font-semibold text-[#6C7588]">Kurir di Jalan</span>
                </div>
                <p className="mt-2 text-[10px] font-bold text-[#087D86]">• 11 Galon Sedang Dikirim</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#DCF8F6] text-[#087D86]">
                <Truck size={20} />
              </div>
            </div>

            <div className="rounded-2xl border border-[#EEF0F5] bg-white p-5 flex items-center justify-between">
              <div>
                <p className="text-[12px] font-medium text-[#596378]">Standby Depo</p>
                <div className="mt-1 flex items-end gap-1.5">
                  <span className="text-[22px] font-extrabold text-[#131B2E]">2</span>
                  <span className="mb-0.5 text-[11px] font-semibold text-[#6C7588]">Siap Muat Kirim</span>
                </div>
                <p className="mt-2 text-[10px] font-bold text-[#16752C]">• Idle &lt; 8 Menit</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E2F9E5] text-[#16752C]">
                <Store size={20} />
              </div>
            </div>

            <div className="rounded-2xl border border-[#EEF0F5] bg-white p-5 flex items-center justify-between">
              <div>
                <p className="text-[12px] font-medium text-[#596378]">Rata-rata Waktu</p>
                <div className="mt-1 flex items-end gap-1.5">
                  <span className="text-[22px] font-extrabold text-[#131B2E]">18</span>
                  <span className="mb-0.5 text-[11px] font-semibold text-[#6C7588]">Menit / Pesanan</span>
                </div>
                <p className="mt-2 text-[10px] font-bold text-[#0052FF]">✓ 3.2 mnt lebih cepat dr SLA</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EBF2FF] text-[#0052FF]">
                <Clock size={20} />
              </div>
            </div>
          </section>

          {/* FILTER TAB */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex rounded-xl bg-[#ECEFF8] p-1 text-[11px] font-bold text-[#556075]">
              <button
                type="button"
                onClick={() => setActiveFilter("Semua")}
                className={`rounded-lg px-4 py-2 transition ${
                  activeFilter === "Semua"
                    ? "bg-[#0052FF] text-white shadow-sm"
                    : "hover:text-[#131B2E]"
                }`}
              >
                Semua Armada (6)
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter("Di Jalan")}
                className={`rounded-lg px-4 py-2 transition ${
                  activeFilter === "Di Jalan"
                    ? "bg-[#0052FF] text-white shadow-sm"
                    : "hover:text-[#131B2E]"
                }`}
              >
                Sedang Jalan (4)
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter("Standby Depo")}
                className={`rounded-lg px-4 py-2 transition ${
                  activeFilter === "Standby Depo"
                    ? "bg-[#0052FF] text-white shadow-sm"
                    : "hover:text-[#131B2E]"
                }`}
              >
                Standby Depo (2)
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter("Riwayat")}
                className={`rounded-lg px-4 py-2 transition ${
                  activeFilter === "Riwayat"
                    ? "bg-[#0052FF] text-white shadow-sm"
                    : "hover:text-[#131B2E]"
                }`}
              >
                Riwayat Hari Ini
              </button>
            </div>

            <div className="relative w-full max-w-[260px]">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A849A]"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari kurir, plat, order..."
                className="h-10 w-full rounded-xl border border-[#E1E5F0] bg-white pl-9 pr-3 text-[11px] outline-none focus:border-[#0052FF]"
              />
            </div>
          </div>

          {/* MAIN CONTENT GRID */}
          <section className="grid gap-4 xl:grid-cols-12">
            {/* LEFT: KURIR LAPANGAN */}
            <div className="xl:col-span-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Truck size={18} className="text-[#0052FF]" />
                  <h2 className="text-[16px] font-extrabold">
                    Kurir Lapangan
                  </h2>
                </div>
                <span className="rounded-md bg-[#EBF2FF] px-2 py-0.5 text-[10px] font-bold text-[#0052FF]">
                  {filteredCouriers.length} Terpilih
                </span>
              </div>

              <div className="space-y-3">
                {filteredCouriers.map((courier) => (
                  <div
                    key={courier.id}
                    className="rounded-2xl border border-[#EEF0F5] bg-white p-4 space-y-3 shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-[14px] font-bold">{courier.name}</h3>
                        <p className="text-[10px] font-medium text-[#687289]">
                          {courier.vehicle} • {courier.plate}
                        </p>
                      </div>

                      {courier.status === "Di Jalan" ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#DCF8F6] px-2.5 py-1 text-[9px] font-bold text-[#087D86]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#087D86]" />
                          Di Jalan
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E2F9E5] px-2.5 py-1 text-[9px] font-bold text-[#16752C]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#16752C]" />
                          Standby Depo
                        </span>
                      )}
                    </div>

                    {courier.status === "Di Jalan" ? (
                      <div className="rounded-xl bg-[#F4F6FD] p-3 text-[10px] space-y-1">
                        <div className="flex justify-between font-bold text-[#556075]">
                          <span>Tugas Saat Ini</span>
                          <span className="text-[#0052FF]">{courier.orderId}</span>
                        </div>
                        <p className="text-[#131B2E] font-medium">
                          {courier.taskDesc}
                        </p>
                        <div className="flex justify-between text-[#687289] pt-1">
                          <span>Berangkat {courier.departureTime}</span>
                          <span className="font-bold text-[#131B2E]">
                            {courier.eta}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-xl bg-[#F4F6FD] p-3 text-[10px] space-y-1">
                        <div className="flex justify-between font-bold text-[#16752C]">
                          <span>Status Depo</span>
                          <span>Siap Antar Kloter Baru</span>
                        </div>
                        <p className="text-[#556075]">{courier.depoNote}</p>
                      </div>
                    )}

                    {courier.status === "Di Jalan" ? (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-[#E1E5F0] bg-white py-2 text-[10px] font-bold text-[#333E56] hover:bg-[#F5F7FC]"
                        >
                          <Phone size={13} /> Hubungi
                        </button>
                        <button
                          type="button"
                          className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-[#EBF2FF] py-2 text-[10px] font-bold text-[#0052FF] hover:bg-[#DCE7FF]"
                        >
                          <Compass size={13} /> Pantau Rute
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-[#0052FF] py-2.5 text-[10px] font-bold text-white shadow-sm hover:bg-[#0047DE]"
                      >
                        <Plus size={14} /> Tugaskan Pesanan Antre
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: TABEL PENGANTARAN AKTIF (TETAP RAPI + KANAN DIBERI PADDING) */}
            <div className="xl:col-span-8 rounded-2xl border border-[#EEF0F5] bg-white p-5 md:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Compass size={18} className="text-[#0052FF]" />
                    <h2 className="text-[16px] font-extrabold">
                      Tabel Pengantaran Aktif
                    </h2>
                  </div>
                  <p className="text-[10px] text-[#687289] mt-0.5">
                    Pesanan yang sedang dalam proses pengiriman oleh kurir depo
                  </p>
                </div>

                <span className="text-[10px] font-bold text-[#556075]">
                  Diurutkan:{" "}
                  <span className="text-[#0052FF]">Estimasi SLA Terdekat</span>
                </span>
              </div>

              {/* TABLE CONTAINER */}
              <div className="w-full">
                <table className="w-full text-left text-[11px]">
                  <thead>
                    <tr className="border-b border-[#EEF0F5] text-[10px] font-bold uppercase tracking-wider text-[#737C91]">
                      <th className="pb-3">No. Order</th>
                      <th className="pb-3">Kurir &amp; Armada</th>
                      <th className="pb-3">Alamat Tujuan</th>
                      <th className="pb-3">Muatan</th>
                      <th className="pb-3">Progress / Estimasi</th>
                      <th className="pb-3 text-right pr-4 w-[110px]">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EEF0F5]">
                    {filteredDeliveries.map((delivery) => (
                      <tr key={delivery.id} className="hover:bg-[#F9FAFD]">
                        <td className="py-3.5 font-extrabold text-[#0052FF]">
                          {delivery.id}
                          <div className="text-[9px] font-normal text-[#80899C]">
                            {delivery.time}
                          </div>
                        </td>
                        <td className="py-3.5">
                          <div className="flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EBF2FF] font-bold text-[#0052FF] text-[10px]">
                              {delivery.avatarInitial}
                            </div>
                            <div>
                              <div className="font-bold">
                                {delivery.courierName}
                              </div>
                              <div className="text-[9px] text-[#80899C]">
                                {delivery.courierPlate}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 max-w-[200px]">
                          <div className="font-semibold text-[#131B2E]">
                            {delivery.address}
                          </div>
                          <div className="text-[9px] text-[#80899C]">
                            {delivery.recipient}
                          </div>
                          {delivery.note && (
                            <div className="text-[9px] font-medium text-[#087D86]">
                              {delivery.note}
                            </div>
                          )}
                        </td>
                        <td className="py-3.5">
                          <span className="rounded-md bg-[#F0F3FF] px-2 py-1 font-bold text-[#0052FF] text-[10px] inline-block">
                            {delivery.items}
                          </span>
                        </td>
                        <td className="py-3.5">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <div className="h-1.5 w-16 overflow-hidden rounded-full bg-[#E1E5F0]">
                                <div
                                  className="h-full bg-[#0052FF]"
                                  style={{
                                    width: `${delivery.progressPercent}%`,
                                  }}
                                />
                              </div>
                              <span className="font-bold text-[#087D86]">
                                {delivery.progressText}
                              </span>
                            </div>
                            <div className="text-[9px] text-[#80899C]">
                              {delivery.distanceText}
                            </div>
                          </div>
                        </td>

                        {/* FITUR BADGE STATUS RAPI + PR-4 SUPAYA TIDAK KEPOTONG */}
                        <td className="py-3.5 text-right pr-4">
                          {delivery.status === "Diantar" ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#DCF8F6] px-2.5 py-1 text-[9px] font-bold text-[#087D86] whitespace-nowrap">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#087D86]" />
                              Diantar
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#DCE7FF] px-2.5 py-1 text-[9px] font-bold text-[#164FC1] whitespace-nowrap">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#164FC1]" />
                              Diproses
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}