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
  RefreshCw,
  AlertTriangle,
  WalletCards,
  Edit3,
  ShoppingCart,
  Droplets,
  CheckCircle2,
  Check,
  Printer,
  ArrowRight,
  FileText,
  Clock,
} from "lucide-react";

type ProductItem = {
  id: string;
  name: string;
  category: "Refill 19L" | "Sekali Pakai";
  description: string;
  image: string;
  sku: string;
  typeDesc: string;
  sellPrice: string;
  costPrice: string;
  stockFilled: number;
  maxStock: number;
  emptyBottles: number;
  status: "Tersedia" | "Rendah" | "Kritis";
};

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: false },
  { label: "Manajemen Pesanan", icon: ClipboardList, active: false },
  { label: "Produk & Stok", icon: Package, active: true },
  { label: "Monitoring Pengantaran", icon: Truck, active: false },
  { label: "Laporan Keuangan", icon: CreditCard, active: false },
];

const initialProducts: ProductItem[] = [
  {
    id: "p1",
    name: "Aqua 19 Liter Refill",
    category: "Refill 19L",
    description: "Air Mineral Pegunungan Alami",
    image: "/products/aqua-19l.png",
    sku: "GLN-AQU-19L",
    typeDesc: "Galon Tukar Refill",
    sellPrice: "Rp 18.000",
    costPrice: "Rp 14.200",
    stockFilled: 35,
    maxStock: 50,
    emptyBottles: 18,
    status: "Tersedia",
  },
  {
    id: "p2",
    name: "Le Minerale 15 Liter",
    category: "Sekali Pakai",
    description: "Galon Sekali Pakai Tanpa Tukar",
    image: "/products/le-minerale-15l.png",
    sku: "GLN-LMN-15L",
    typeDesc: "Bebas BPA / Sekali Pakai",
    sellPrice: "Rp 17.000",
    costPrice: "Rp 13.800",
    stockFilled: 25,
    maxStock: 50,
    emptyBottles: 0,
    status: "Tersedia",
  },
  {
    id: "p3",
    name: "Cleo 19 Liter Refill",
    category: "Refill 19L",
    description: "Pure Water Demineral 0 ppm",
    image: "/products/cleo-19l.png",
    sku: "GLN-CLE-19L",
    typeDesc: "Galon Tukar Refill",
    sellPrice: "Rp 16.500",
    costPrice: "Rp 13.000",
    stockFilled: 15,
    maxStock: 50,
    emptyBottles: 14,
    status: "Kritis",
  },
  {
    id: "p4",
    name: "Vit 19 Liter Refill",
    category: "Refill 19L",
    description: "Air Mineral Higienis Terjangkau",
    image: "/products/vit-19l.png",
    sku: "GLN-VIT-19L",
    typeDesc: "Galon Tukar Refill",
    sellPrice: "Rp 15.000",
    costPrice: "Rp 11.500",
    stockFilled: 10,
    maxStock: 50,
    emptyBottles: 10,
    status: "Kritis",
  },
];

export default function ProductsPage() {
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("2026-05-24");
  const [activeFilter, setActiveFilter] = useState<
    "Semua" | "Refill 19L" | "Sekali Pakai" | "Perlu Restok"
  >("Semua");

  // State untuk produk & edit harga
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPriceVal, setEditPriceVal] = useState("");

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

  const handleStartEditPrice = (product: ProductItem) => {
    setEditingId(product.id);
    setEditPriceVal(product.sellPrice);
  };

  const handleSavePrice = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, sellPrice: editPriceVal } : p))
    );
    setEditingId(null);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchFilter =
        activeFilter === "Semua" ||
        (activeFilter === "Refill 19L" && p.category === "Refill 19L") ||
        (activeFilter === "Sekali Pakai" && p.category === "Sekali Pakai") ||
        (activeFilter === "Perlu Restok" &&
          (p.status === "Kritis" || p.status === "Rendah"));

      const query = search.toLowerCase().trim();
      const matchSearch =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.sku.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query);

      return matchFilter && matchSearch;
    });
  }, [activeFilter, search, products]);

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

            {/* KALENDER INTERAKTIF */}
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
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.04em] text-[#0052FF]">
                  <Package size={15} />
                  LOGISTIK &amp; GUDANG DEPO / PRODUK &amp; STOK
                </div>
                <h1 className="mt-1 text-[22px] font-extrabold tracking-[-0.035em] text-[#131B2E] md:text-[24px]">
                  Produk &amp; Stok Galon
                </h1>
                <p className="mt-1 text-[11px] text-[#6D768A]">
                  Monitoring ketersediaan pasokan galon, inventaris botol kosong, dan penyesuaian harga jual.
                </p>
              </div>

              <button
                type="button"
                className="flex h-10 items-center gap-2 rounded-xl bg-[#0052FF] px-4 text-[11px] font-bold text-white shadow-[0_4px_12px_rgba(0,82,255,0.18)] transition hover:bg-[#0047DE]"
              >
                <Plus size={15} /> Tambah Produk Baru
              </button>
            </div>
          </section>

          {/* STAT CARDS */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-[#EEF0F5] bg-white p-5 flex items-center justify-between">
              <div>
                <p className="text-[12px] font-medium text-[#596378]">TOTAL GALON TERISI</p>
                <div className="mt-1 flex items-end gap-1.5">
                  <span className="text-[22px] font-extrabold text-[#131B2E]">85</span>
                  <span className="mb-0.5 text-[11px] font-semibold text-[#6C7588]">Galon</span>
                </div>
                <p className="mt-2 text-[10px] font-bold text-[#0052FF]">
                  Aqua: 35 • Le Min: 25 <span className="ml-2 text-[#087D86]">Cleo: 15 • Vit: 10</span>
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EBF2FF] text-[#0052FF]">
                <Droplets size={20} />
              </div>
            </div>

            <div className="rounded-2xl border border-[#EEF0F5] bg-white p-5 flex items-center justify-between">
              <div>
                <p className="text-[12px] font-medium text-[#596378]">STOK GALON KOSONG</p>
                <div className="mt-1 flex items-end gap-1.5">
                  <span className="text-[22px] font-extrabold text-[#131B2E]">42</span>
                  <span className="mb-0.5 text-[11px] font-semibold text-[#6C7588]">Galon Kosong</span>
                </div>
                <p className="mt-2 text-[10px] font-bold text-[#087D86]">
                  Pool siap tukar pabrik <span className="ml-2 font-extrabold text-[#087D86]">Tersortir Baik</span>
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#DCF8F6] text-[#087D86]">
                <RefreshCw size={20} />
              </div>
            </div>

            <div className="rounded-2xl border border-[#EEF0F5] bg-white p-5 flex items-center justify-between">
              <div>
                <p className="text-[12px] font-medium text-[#596378]">STOK KRITIS / MENIPIS</p>
                <div className="mt-1 flex items-end gap-1.5">
                  <span className="text-[22px] font-extrabold text-[#D93636]">2</span>
                  <span className="mb-0.5 text-[11px] font-semibold text-[#6C7588]">Varian</span>
                </div>
                <p className="mt-2 text-[10px] font-bold text-[#D93636]">
                  Vit 19L &amp; Cleo 19L <span className="ml-2 rounded bg-[#FFE0E0] px-1 py-0.5 text-[9px]">Perlu PO</span>
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFE0E0] text-[#D93636]">
                <AlertTriangle size={20} />
              </div>
            </div>

            <div className="rounded-2xl border border-[#EEF0F5] bg-white p-5 flex items-center justify-between">
              <div>
                <p className="text-[12px] font-medium text-[#596378]">TOTAL NILAI INVENTARIS</p>
                <div className="mt-1 flex items-end gap-1.5">
                  <span className="text-[20px] font-extrabold text-[#131B2E]">Rp 1.620.000</span>
                </div>
                <p className="mt-2 text-[10px] font-bold text-[#16752C]">
                  Modal: Rp 1.258.000 <span className="ml-2 text-[#28A745]">+22.3% Margin</span>
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E2F9E5] text-[#16752C]">
                <WalletCards size={20} />
              </div>
            </div>
          </section>

          {/* FILTER & SEARCH BAR */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="relative w-full max-w-[280px]">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A849A]"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari merk galon, ukuran, SKU..."
                className="h-10 w-full rounded-xl border border-[#E1E5F0] bg-white pl-9 pr-3 text-[11px] outline-none focus:border-[#0052FF]"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#687289]">Filter Kategori:</span>
              <div className="flex rounded-xl bg-[#ECEFF8] p-1 text-[11px] font-bold text-[#556075]">
                <button
                  type="button"
                  onClick={() => setActiveFilter("Semua")}
                  className={`rounded-lg px-3 py-1.5 transition ${
                    activeFilter === "Semua"
                      ? "bg-[#0052FF] text-white shadow-sm"
                      : "hover:text-[#131B2E]"
                  }`}
                >
                  Semua Produk ({products.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter("Refill 19L")}
                  className={`rounded-lg px-3 py-1.5 transition ${
                    activeFilter === "Refill 19L"
                      ? "bg-[#0052FF] text-white shadow-sm"
                      : "hover:text-[#131B2E]"
                  }`}
                >
                  Refill 19L (3)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter("Sekali Pakai")}
                  className={`rounded-lg px-3 py-1.5 transition ${
                    activeFilter === "Sekali Pakai"
                      ? "bg-[#0052FF] text-white shadow-sm"
                      : "hover:text-[#131B2E]"
                  }`}
                >
                  Sekali Pakai (1)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter("Perlu Restok")}
                  className={`rounded-lg px-3 py-1.5 transition ${
                    activeFilter === "Perlu Restok"
                      ? "bg-[#0052FF] text-white shadow-sm"
                      : "hover:text-[#131B2E]"
                  }`}
                >
                  Perlu Restok (2)
                </button>
              </div>
            </div>
          </div>

          {/* TABEL DAFTAR INVENTARIS DEPO */}
          <section className="rounded-2xl border border-[#EEF0F5] bg-white p-5 md:p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#28A745]" />
                <h2 className="text-[16px] font-extrabold">
                  Daftar Inventaris Depo Aktif
                </h2>
                <span className="rounded-md bg-[#F0F3FF] px-2 py-0.5 text-[9px] font-bold text-[#0052FF]">
                  Live Sync Terkini
                </span>
              </div>

              <p className="text-[10px] text-[#687289]">
                Update otomatis setiap pesanan kurir diselesaikan
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px]">
                <thead>
                  <tr className="border-b border-[#EEF0F5] text-[10px] font-bold uppercase tracking-wider text-[#737C91]">
                    <th className="pb-3.5 pl-2">Produk &amp; Varian</th>
                    <th className="pb-3.5">SKU / Tipe</th>
                    <th className="pb-3.5">Harga Jual</th>
                    <th className="pb-3.5">Harga Modal</th>
                    <th className="pb-3.5">Stok Terisi (Depo)</th>
                    <th className="pb-3.5 text-center">Botol Kosong</th>
                    <th className="pb-3.5 text-center">Status</th>
                    <th className="pb-3.5 text-right pr-2">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EEF0F5]">
                  {filteredProducts.map((product) => {
                    const percentage = Math.round(
                      (product.stockFilled / product.maxStock) * 100
                    );

                    return (
                      <tr key={product.id} className="hover:bg-[#F9FAFD] transition">
                        {/* PRODUK & VARIAN */}
                        <td className="py-4 pl-2">
                          <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F4F6FD] p-1 border border-[#E9ECF4]">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="h-10 w-10 object-contain"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                            </div>
                            <div>
                              <div className="font-bold text-[#131B2E] text-[12px]">
                                {product.name}
                              </div>
                              <div className="text-[9px] text-[#687289]">
                                {product.description}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* SKU / TIPE */}
                        <td className="py-4 whitespace-nowrap">
                          <div className="font-bold text-[#131B2E] text-[11px]">
                            {product.sku}
                          </div>
                          <div className="text-[9px] text-[#687289]">
                            {product.typeDesc}
                          </div>
                        </td>

                        {/* HARGA JUAL (INTERAKTIF EDIT HARGA) */}
                        <td className="py-4 whitespace-nowrap">
                          {editingId === product.id ? (
                            <div className="flex items-center gap-1">
                              <input
                                type="text"
                                value={editPriceVal}
                                onChange={(e) => setEditPriceVal(e.target.value)}
                                className="w-24 rounded-lg border border-[#0052FF] px-2 py-1 text-[11px] font-bold text-[#131B2E] outline-none"
                                autoFocus
                              />
                              <button
                                type="button"
                                onClick={() => handleSavePrice(product.id)}
                                className="rounded-lg bg-[#0052FF] p-1 text-white hover:bg-[#0047DE]"
                              >
                                <Check size={13} />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 font-extrabold text-[#131B2E] text-[12px]">
                              <span>{product.sellPrice}</span>
                              <button
                                type="button"
                                title="Edit Harga Jual"
                                onClick={() => handleStartEditPrice(product)}
                                className="text-[#0052FF] hover:text-[#0047DE] p-0.5"
                              >
                                <Edit3 size={12} />
                              </button>
                            </div>
                          )}
                        </td>

                        {/* HARGA MODAL */}
                        <td className="py-4 whitespace-nowrap font-medium text-[#687289] text-[11px]">
                          {product.costPrice}
                        </td>

                        {/* STOK TERISI */}
                        <td className="py-4 whitespace-nowrap">
                          <div className="space-y-1 w-[130px]">
                            <div className="flex justify-between text-[10px] font-bold">
                              <span className="text-[#131B2E]">
                                {product.stockFilled} Unit
                              </span>
                              <span
                                className={
                                  product.status === "Tersedia"
                                    ? "text-[#16752C]"
                                    : "text-[#D93636]"
                                }
                              >
                                {product.status === "Tersedia"
                                  ? "Aman (70%)"
                                  : product.status === "Rendah"
                                  ? "Menipis (30%)"
                                  : "Sisa 20%"}
                              </span>
                            </div>
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#E1E5F0]">
                              <div
                                className={`h-full rounded-full transition-all ${
                                  product.status === "Tersedia"
                                    ? "bg-[#087D86]"
                                    : product.status === "Rendah"
                                    ? "bg-[#E58A00]"
                                    : "bg-[#D93636]"
                                }`}
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        </td>

                        {/* BOTOL KOSONG */}
                        <td className="py-4 text-center whitespace-nowrap">
                          {product.emptyBottles > 0 ? (
                            <div>
                              <span className="font-bold text-[#131B2E]">
                                {product.emptyBottles}
                              </span>
                              <div className="text-[9px] text-[#687289]">
                                Botol
                              </div>
                            </div>
                          ) : (
                            <span className="text-[9px] italic text-[#9EA7B8]">
                              - (Non-Refill)
                            </span>
                          )}
                        </td>

                        {/* STATUS */}
                        <td className="py-4 text-center whitespace-nowrap">
                          {product.status === "Tersedia" ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#DCF8F6] px-2.5 py-1 text-[9px] font-bold text-[#087D86]">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#087D86]" />
                              Tersedia
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#FFE0E0] px-2.5 py-1 text-[9px] font-bold text-[#D93636]">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#D93636]" />
                              Stok Kritis
                            </span>
                          )}
                        </td>

                        {/* AKSI */}
                        <td className="py-4 text-right pr-2 whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              className="rounded-lg bg-[#F0F3FF] px-2.5 py-1 text-[10px] font-bold text-[#0052FF] transition hover:bg-[#E2E8FF]"
                            >
                              Update
                            </button>
                            <button
                              type="button"
                              aria-label="Restok"
                              className="rounded-lg bg-[#FFE0E0] p-1.5 text-[#D93636] transition hover:bg-[#FFD1D1]"
                            >
                              <ShoppingCart size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* SUMMARY UNDER TABLE */}
            <div className="flex flex-col sm:flex-row items-center justify-between border-t border-[#EEF0F5] pt-3 text-[11px] text-[#687289]">
              <span>
                Menampilkan <strong>{filteredProducts.length} dari {products.length}</strong> varian produk galon depo
              </span>
              <span>
                Estimasi Omset Hari Ini: <strong className="text-[#0052FF] text-[13px] font-extrabold ml-1">Rp 1.442.500</strong>
              </span>
            </div>
          </section>

          {/* SECTION BOTTOM GRID (RIWAYAT KIRIM + STATUS GALON KOSONG) */}
          <section className="grid gap-4 xl:grid-cols-12">
            {/* LEFT: RIWAYAT & JADWAL KIRIM RESTOK PABRIK (7 COLS) */}
            <div className="xl:col-span-7 rounded-2xl border border-[#EEF0F5] bg-white p-5 md:p-6 space-y-4 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <RefreshCw size={17} className="text-[#0052FF]" />
                    <h2 className="text-[15px] font-extrabold">
                      Riwayat &amp; Jadwal Kirim Restok Pabrik
                    </h2>
                  </div>
                  <button type="button" className="text-[10px] font-bold text-[#0052FF] hover:underline">
                    Lihat Semua PO
                  </button>
                </div>

                <div className="mt-4 space-y-3">
                  {/* ITEM 1 */}
                  <div className="rounded-xl bg-[#F4F6FD] p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[10px]">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EBF2FF] text-[#0052FF]">
                        <Truck size={17} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#131B2E] text-[11px]">
                            Pabrik PT Danone Aqua Pulogadung
                          </span>
                          <span className="rounded-full bg-[#DCF8F6] px-2 py-0.5 text-[8px] font-bold text-[#087D86]">
                            Dalam Pengiriman
                          </span>
                        </div>
                        <p className="text-[#687289] mt-0.5">
                          Truk Hino B-9142-SDA • Muatan: 50 Galon Aqua 19L + Tukar 50 Galon Kosong
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-bold text-[#131B2E]">ETA: Hari ini, 15:30 WIB</div>
                      <div className="text-[9px] text-[#687289]">Supir: Pak Wawan (+62 813-8812)</div>
                    </div>
                  </div>

                  {/* ITEM 2 */}
                  <div className="rounded-xl bg-[#FFF4F4] p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[10px]">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FFE0E0] text-[#D93636]">
                        <Clock size={17} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#131B2E] text-[11px]">
                            Pabrik Sariguna Primatirta (Cleo)
                          </span>
                          <span className="rounded-full bg-[#FFE0E0] px-2 py-0.5 text-[8px] font-bold text-[#D93636]">
                            PO Kritis #PO-882
                          </span>
                        </div>
                        <p className="text-[#687289] mt-0.5">
                          Permintaan Restok: 30 Galon Cleo 19L • Depo butuh percepatan
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-bold text-[#131B2E]">Jadwal: Besok, 09:00 WIB</div>
                      <button type="button" className="text-[9px] font-bold text-[#0052FF] hover:underline">
                        Follow-up Sales
                      </button>
                    </div>
                  </div>

                  {/* ITEM 3 */}
                  <div className="rounded-xl bg-[#F1FBF4] p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[10px]">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E2F9E5] text-[#16752C]">
                        <CheckCircle2 size={17} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#131B2E] text-[11px]">
                            Distributor Mayora Le Minerale
                          </span>
                          <span className="rounded-full bg-[#E2F9E5] px-2 py-0.5 text-[8px] font-bold text-[#16752C]">
                            Selesai Bongkar
                          </span>
                        </div>
                        <p className="text-[#687289] mt-0.5">
                          Masuk: 40 Galon Baru 15L • Diterima Staf Depo: Riko
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-bold text-[#131B2E]">Kemarin, 14:10 WIB</div>
                      <div className="text-[9px] text-[#687289]">Faktur: #INV-LMN-9921</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[#EEF0F5] pt-3 text-[10px] text-[#687289]">
                <span>Supplier resmi Danone, Mayora, Tirta Sariguna terverifikasi.</span>
                <button type="button" className="flex items-center gap-1 font-bold text-[#0052FF] hover:underline">
                  Buat Surat Jalan Restok <ArrowRight size={12} />
                </button>
              </div>
            </div>

            {/* RIGHT: STATUS GALON KOSONG (5 COLS) */}
            <div className="xl:col-span-5 rounded-2xl border border-[#EEF0F5] bg-white p-5 md:p-6 space-y-4 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <RefreshCw size={17} className="text-[#087D86]" />
                    <h2 className="text-[15px] font-extrabold">Status Galon Kosong</h2>
                  </div>
                  <span className="h-2 w-2 rounded-full bg-[#28A745]" />
                </div>

                <div className="mt-3 rounded-xl bg-[#F4F6FD] p-3 text-[11px]">
                  <div className="flex justify-between font-bold text-[#131B2E]">
                    <span>Total Botol di Depo:</span>
                    <span className="text-[13px] font-extrabold">42 Botol</span>
                  </div>

                  {/* PROGRESS BAR BARU */}
                  <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-[#E1E5F0] flex">
                    <div className="h-full bg-[#28A745]" style={{ width: "81%" }} />
                    <div className="h-full bg-[#D93636]" style={{ width: "19%" }} />
                  </div>

                  <div className="mt-2 flex justify-between text-[9px] font-bold">
                    <span className="text-[#16752C]">• 34 Siap Tukar</span>
                    <span className="text-[#D93636]">• 8 Afkir / Rusak</span>
                  </div>
                </div>

                {/* BREAKDOWN LIST */}
                <div className="mt-3 space-y-2 text-[11px]">
                  <div className="flex items-center justify-between border-b border-[#EEF0F5] pb-1.5">
                    <span className="text-[#556075]">Aqua 19L Kosong</span>
                    <span className="font-bold text-[#131B2E]">18 Galon</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-[#EEF0F5] pb-1.5">
                    <span className="text-[#556075]">Cleo 19L Kosong</span>
                    <span className="font-bold text-[#131B2E]">14 Galon</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-[#EEF0F5] pb-1.5">
                    <span className="text-[#556075]">Vit 19L Kosong</span>
                    <span className="font-bold text-[#131B2E]">10 Galon</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between rounded-xl bg-[#FFF0F0] p-2.5 text-[10px]">
                  <span className="font-bold text-[#D93636]">Klaim Garansi Retur Bocor</span>
                  <span className="rounded-md bg-[#FFE0E0] px-2 py-0.5 font-bold text-[#D93636]">
                    3 Galon Diajukan
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#F0F3FF] py-2.5 text-[11px] font-bold text-[#0052FF] transition hover:bg-[#E2E8FF]"
              >
                <Printer size={14} /> Cetak Manifest Galon Tukar
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}