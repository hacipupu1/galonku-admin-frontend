"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Bell,
  Boxes,
  CalendarDays,
  CheckCircle2,
  Package,
  Plus,
  RefreshCw,
  Search,
  ShoppingCart,
  Truck,
  WalletCards,
} from "lucide-react";

type Product = {
  name: string;
  description: string;
  image: string;
  price: string;
  stock: number;
  maxStock: number;
  status: "Kritis" | "Rendah" | "Tersedia";
};

const products: Product[] = [
  {
    name: "Aqua 19 Liter",
    description: "Air Mineral Pegunungan",
    image: "/products/aqua-19l.png",
    price: "Rp 18.000",
    stock: 4,
    maxStock: 20,
    status: "Kritis",
  },
  {
    name: "Le Minerale 15L",
    description: "Galon Sekali Pakai BPA Free",
    image: "/products/le-minerale-15l.png",
    price: "Rp 17.000",
    stock: 3,
    maxStock: 20,
    status: "Rendah",
  },
  {
    name: "Cleo Pure Water 19L",
    description: "Air Demineral Murni",
    image: "/products/cleo-19l.png",
    price: "Rp 16.000",
    stock: 3,
    maxStock: 15,
    status: "Tersedia",
  },
  {
    name: "Vit 19 Liter",
    description: "Air Mineral Higienis Teruji",
    image: "/products/vit-19l.png",
    price: "Rp 15.000",
    stock: 2,
    maxStock: 15,
    status: "Kritis",
  },
];

const orders = [
  {
    id: "#ORD-9021",
    customer: "Fia Salsabila",
    product: "Aqua 19L (3 Galon)",
    time: "10:48",
    price: "Rp 54.000",
    status: "Diantar",
  },
  {
    id: "#ORD-9020",
    customer: "Rian Mahendra",
    product: "Le Minerale 15L (2 Galon)",
    time: "10:35",
    price: "Rp 34.000",
    status: "Diproses",
  },
  {
    id: "#ORD-9019",
    customer: "Kantor Notaris Hendra",
    product: "Cleo 19L (5 Galon)",
    time: "10:12",
    price: "Rp 80.000",
    status: "Selesai",
  },
  {
    id: "#ORD-9018",
    customer: "Siti Nurhaliza",
    product: "Vit 19L (2 Galon)",
    time: "09:55",
    price: "Rp 30.000",
    status: "Selesai",
  },
];

function formatToday() {
  return "Hari ini, 24 Mei";
}

function ProductCard({ product }: { product: Product }) {
  const percentage = Math.max(
    5,
    Math.min(100, (product.stock / product.maxStock) * 100)
  );

  const isAvailable = product.status === "Tersedia";

  return (
    <div className="group rounded-2xl border border-[#E9ECF8] bg-[#F0F1FF] p-3 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative">
        <div className="absolute right-0 top-0 z-10">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold ${
              isAvailable
                ? "bg-[#CFF7F6] text-[#087D86]"
                : "bg-[#FFE0E0] text-[#D93636]"
            }`}
          >
            {product.status}: {product.stock} Sisa
          </span>
        </div>

        <div className="flex h-[145px] items-center justify-center rounded-2xl bg-white">
          <img
            src={product.image}
            alt={product.name}
            className="h-[125px] w-[125px] object-contain transition duration-200 group-hover:scale-[1.03]"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        </div>
      </div>

      <div className="mt-3 text-center">
        <h3 className="text-[16px] font-bold tracking-[-0.02em] text-[#131B2E]">
          {product.name}
        </h3>

        <p className="mt-1 text-[11px] leading-4 text-[#69738A]">
          {product.description}
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-[11px] text-[#69738A]">Harga Refill</span>

        <span className="text-[13px] font-bold text-[#131B2E]">
          {product.price}
        </span>
      </div>

      <div className="mt-2 h-[7px] overflow-hidden rounded-full bg-[#DDE2F0]">
        <div
          className={`h-full rounded-full transition-all ${
            isAvailable ? "bg-[#36C7D3]" : "bg-[#E53232]"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <span
          className={`text-[10px] font-bold ${
            isAvailable ? "text-[#087D86]" : "text-[#D93636]"
          }`}
        >
          Tersedia: {product.stock} / {product.maxStock} Rak
        </span>

        <button
          type="button"
          className="shrink-0 rounded-lg bg-[#DCE6FF] px-3 py-1.5 text-[10px] font-bold text-[#0052FF] transition hover:bg-[#CEDCFF]"
        >
          + Restok
        </button>
      </div>
    </div>
  );
}

function OrderStatus({ status }: { status: string }) {
  const styles =
    status === "Diantar"
      ? "bg-[#C9F4F7] text-[#087D86]"
      : status === "Diproses"
      ? "bg-[#DCE7FF] text-[#164FC1]"
      : "bg-[#BDF6C9] text-[#16752C]";

  return (
    <span className={`rounded-full px-2.5 py-1 text-[9px] font-bold ${styles}`}>
      {status}
    </span>
  );
}

export default function DashboardPage() {
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return orders;
    }

    return orders.filter(
      (order) =>
        order.id.toLowerCase().includes(query) ||
        order.customer.toLowerCase().includes(query) ||
        order.product.toLowerCase().includes(query)
    );
  }, [search]);

  const handleRefresh = () => {
    setRefreshing(true);

    window.setTimeout(() => {
      setRefreshing(false);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#F7F8FC] text-[#131B2E]">
      {/* HEADER ATAS */}
      <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-[#ECEEF4] bg-white/95 px-4 backdrop-blur md:px-6">
        <div className="ml-auto flex items-center gap-2 md:gap-3">
          {/* SEARCH */}
          <div className="relative hidden w-[270px] md:block">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A849A]"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari pesanan, resi, kurir..."
              className="h-11 w-full rounded-xl border border-transparent bg-[#F2F1FC] pl-10 pr-4 text-[12px] text-[#131B2E] outline-none transition placeholder:text-[#8A91A3] focus:border-[#0052FF] focus:bg-white"
            />
          </div>

          {/* DATE */}
          <button
            type="button"
            className="hidden h-11 items-center gap-2 rounded-xl bg-[#F2F1FC] px-4 text-[12px] font-bold text-[#293246] sm:flex"
          >
            <CalendarDays size={16} className="text-[#0052FF]" />
            {formatToday()}
          </button>

          {/* NOTIFICATION */}
          <button
            type="button"
            aria-label="Notifikasi"
            className="relative flex h-11 w-11 items-center justify-center rounded-xl hover:bg-[#F3F5FA]"
          >
            <Bell size={20} />
            <span className="absolute right-2.5 top-2 h-2 w-2 rounded-full bg-[#D93636]" />
          </button>

          {/* CREATE */}
          <button
            type="button"
            className="hidden h-11 items-center gap-2 rounded-xl bg-[#0052FF] px-4 text-[12px] font-bold text-white shadow-[0_6px_14px_rgba(0,82,255,0.16)] transition hover:bg-[#0047DE] sm:flex"
          >
            <Plus size={17} />
            Buat Pesanan
          </button>
        </div>
      </header>

      {/* CONTENT UTAMA */}
      <main className="mx-auto max-w-[1500px] p-4 md:p-6 space-y-4">
        {/* PAGE INTRO */}
        <section className="rounded-2xl border border-[#EEF0F5] bg-white p-5 shadow-[0_2px_10px_rgba(19,27,46,0.02)] md:p-6">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.04em] text-[#087D86]">
                <Activity size={15} />
                Monitoring Operasional Realtime
              </div>

              <h1 className="mt-1 text-[22px] font-extrabold tracking-[-0.035em] text-[#131B2E] md:text-[24px]">
                Ringkasan Operasional Hari Ini
              </h1>

              <p className="mt-1 text-[11px] text-[#6D768A]">
                Update terkini aktivitas refill dan inventaris Depo Kebayoran
                Lama (JKT-04)
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="flex h-10 items-center gap-2 rounded-xl bg-[#F0F3FF] px-3 text-[11px] font-bold text-[#26334C]"
              >
                <CalendarDays size={15} className="text-[#0052FF]" />
                Hari ini: 12 Agu 2026
              </button>

              <button
                type="button"
                onClick={handleRefresh}
                className="flex h-10 items-center gap-2 rounded-xl bg-[#F0F3FF] px-3 text-[11px] font-bold text-[#26334C] transition hover:bg-[#E6EBFF]"
              >
                <RefreshCw
                  size={15}
                  className={refreshing ? "animate-spin" : ""}
                />
                Refresh Data
              </button>

              <div className="flex h-10 items-center gap-2 rounded-xl bg-[#C5F8D0] px-3 text-[11px] font-bold text-[#16752C]">
                <span className="h-2 w-2 rounded-full bg-[#28A745]" />
                Sinkron: Aktif
              </div>
            </div>
          </div>
        </section>

        {/* STAT CARDS */}
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {/* TOTAL ORDER */}
          <div className="overflow-hidden rounded-2xl border border-[#EEF0F5] bg-white">
            <div className="flex items-start justify-between p-5">
              <div>
                <p className="text-[12px] font-medium text-[#596378]">
                  Total Pesanan
                </p>

                <div className="mt-1 flex items-end gap-2">
                  <span className="text-[23px] font-extrabold text-[#0052FF]">
                    48
                  </span>

                  <span className="mb-1 text-[10px] text-[#6C7588]">
                    transaksi
                  </span>
                </div>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#DDE7FF] text-[#0052FF]">
                <ShoppingCart size={20} />
              </div>
            </div>

            <div className="flex items-center justify-between bg-[#F2F1FF] px-5 py-2.5">
              <span className="flex items-center gap-1 text-[10px] font-semibold text-[#257143]">
                <ArrowUpRight size={13} />
                +12%
                <span className="font-normal text-[#687289]">
                  vs kemarin (42 pesanan)
                </span>
              </span>

              <button className="text-[10px] font-bold text-[#087D86]">
                Detail →
              </button>
            </div>
          </div>

          {/* REVENUE */}
          <div className="overflow-hidden rounded-2xl border border-[#EEF0F5] bg-white">
            <div className="flex items-start justify-between p-5">
              <div>
                <p className="text-[12px] font-medium text-[#596378]">
                  Pendapatan Bersih
                </p>

                <div className="mt-1">
                  <span className="text-[23px] font-extrabold text-[#131B2E]">
                    Rp 864.000
                  </span>
                </div>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#BCECF6] text-[#087D86]">
                <WalletCards size={20} />
              </div>
            </div>

            <div className="flex items-center justify-between bg-[#F1FBF4] px-5 py-2.5">
              <span className="flex items-center gap-1 text-[10px] font-semibold text-[#257143]">
                <CheckCircle2 size={13} />
                +8.5%
                <span className="font-normal text-[#687289]">
                  melampaui target harian
                </span>
              </span>

              <button className="text-[10px] font-bold text-[#087D86]">
                Laporan →
              </button>
            </div>
          </div>

          {/* STOCK */}
          <div className="overflow-hidden rounded-2xl border border-[#EEF0F5] bg-white">
            <div className="flex items-start justify-between p-5">
              <div>
                <p className="text-[12px] font-medium text-[#596378]">
                  Status Stock Galon
                </p>

                <div className="mt-1 flex items-end gap-2">
                  <span className="text-[23px] font-extrabold text-[#D93636]">
                    12
                  </span>

                  <span className="mb-1 text-[10px] text-[#6C7588]">
                    galon terisi
                  </span>
                </div>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFE0E0] text-[#D93636]">
                <AlertTriangle size={20} />
              </div>
            </div>

            <div className="flex items-center justify-between bg-[#FFF0F0] px-5 py-2.5">
              <span className="flex items-center gap-1 text-[10px] font-semibold text-[#D93636]">
                <Boxes size={13} />
                Perlu Restok Segera
                <span className="font-normal text-[#687289]">
                  (&lt; 20 unit)
                </span>
              </span>

              <button className="text-[10px] font-bold text-[#D93636]">
                Restok →
              </button>
            </div>
          </div>
        </section>

        {/* CHART + RECENT ORDERS */}
        <section className="grid gap-4 xl:grid-cols-[1.55fr_0.85fr]">
          {/* CHART */}
          <div className="rounded-2xl border border-[#EEF0F5] bg-white p-5 md:p-6">
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-[18px] font-extrabold tracking-[-0.03em]">
                    Grafik Pesanan
                  </h2>

                  <span className="rounded-md bg-[#EEF0FF] px-2 py-1 text-[9px] font-bold text-[#0052FF]">
                    Realtime
                  </span>
                </div>

                <p className="mt-1 text-[10px] text-[#6C7588]">
                  Fluktuasi lonjakan pesanan jam kerja per 2 jam (08:00 - 18:00)
                </p>
              </div>

              <div className="flex rounded-xl bg-[#F0F1FF] p-1">
                {["Hari Ini", "Mingguan", "Bulanan"].map((item, index) => (
                  <button
                    key={item}
                    type="button"
                    className={`rounded-lg px-3 py-2 text-[9px] font-bold ${
                      index === 0
                        ? "bg-white text-[#0052FF] shadow-sm"
                        : "text-[#626C80]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-[#F1F1FF] p-3">
              <div>
                <p className="text-[9px] text-[#687289]">Jam Puncak (Peak)</p>
                <p className="mt-1 text-[11px] font-extrabold text-[#131B2E]">
                  11:00 - 13:00
                </p>
                <p className="text-[9px] font-semibold text-[#131B2E]">
                  (15 pesanan)
                </p>
              </div>

              <div>
                <p className="text-[9px] text-[#687289]">
                  Rata-rata Pengiriman
                </p>
                <p className="mt-1 text-[11px] font-extrabold text-[#087D86]">
                  22.4 Menit
                </p>
              </div>

              <div>
                <p className="text-[9px] text-[#687289]">
                  Tingkat Penyelesaian
                </p>
                <p className="mt-1 text-[11px] font-extrabold text-[#16752C]">
                  96.8% Sukses
                </p>
              </div>
            </div>

            <div className="relative mt-5 h-[220px] w-full overflow-hidden">
              <div className="absolute left-0 right-0 top-[30px] border-t border-dashed border-[#DDE1EA]" />
              <div className="absolute left-0 right-0 top-[80px] border-t border-dashed border-[#DDE1EA]" />
              <div className="absolute left-0 right-0 top-[130px] border-t border-dashed border-[#DDE1EA]" />
              <div className="absolute left-0 right-0 top-[180px] border-t border-dashed border-[#DDE1EA]" />

              <svg
                viewBox="0 0 800 200"
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="chartArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0052FF" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#0052FF" stopOpacity="0.03" />
                  </linearGradient>
                </defs>

                <path
                  d="M0 160 C70 145 95 115 160 105 C230 95 280 30 360 25 C420 20 455 80 510 65 C590 40 650 60 800 35 L800 190 L0 190 Z"
                  fill="url(#chartArea)"
                />

                <path
                  d="M0 160 C70 145 95 115 160 105 C230 95 280 30 360 25 C420 20 455 80 510 65 C590 40 650 60 800 35"
                  fill="none"
                  stroke="#0052FF"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>

              <div className="absolute left-0 right-0 bottom-1 flex justify-between px-2 text-[9px] text-[#69738A]">
                <span>08:00</span>
                <span>10:00</span>
                <span>12:00</span>
                <span>14:00</span>
                <span>16:00</span>
                <span>18:00</span>
              </div>
            </div>
          </div>

          {/* RECENT ORDERS */}
          <div className="rounded-2xl border border-[#EEF0F5] bg-white p-5 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-[18px] font-extrabold tracking-[-0.03em]">
                    Pesanan Terbaru
                  </h2>

                  <span className="rounded-md bg-[#DDF0FF] px-2 py-1 text-[9px] font-bold text-[#0052FF]">
                    Live Feed
                  </span>
                </div>

                <p className="mt-1 text-[10px] text-[#6C7588]">
                  5 antrean pesanan terakhir masuk dari aplikasi konsumen
                </p>
              </div>

              <button
                type="button"
                className="hidden text-[10px] font-bold text-[#0052FF] sm:block"
              >
                Lihat Semua →
              </button>
            </div>

            <div className="mt-4 space-y-2">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center gap-2 rounded-xl bg-[#F1F2FF] p-2.5"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#0052FF]">
                    <Package size={17} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1">
                      <span className="text-[11px] font-extrabold text-[#131B2E]">
                        {order.id}
                      </span>

                      <span className="text-[9px] text-[#7A8498]">
                        • {order.time}
                      </span>
                    </div>

                    <p className="truncate text-[9px] text-[#313A4E]">
                      {order.customer}
                    </p>

                    <p className="truncate text-[9px] font-semibold text-[#087D86]">
                      {order.product}
                    </p>
                  </div>

                  <div className="text-right">
                    <OrderStatus status={order.status} />

                    <p className="mt-1 text-[10px] font-extrabold text-[#131B2E]">
                      {order.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STOCK */}
        <section className="rounded-2xl border border-[#EEF0F5] bg-white p-5 md:p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-2">
                <Boxes size={20} className="text-[#0052FF]" />

                <h2 className="text-[18px] font-extrabold tracking-[-0.03em]">
                  Status Stok Galon Fisik di Depo
                </h2>
              </div>

              <p className="mt-1 text-[10px] text-[#69738A]">
                Ketersediaan galon isi siap dikirim berdasarkan inventaris fisik
                Depo JKT-04
              </p>
            </div>

            <button
              type="button"
              className="flex w-fit items-center gap-2 rounded-xl bg-[#0052FF] px-4 py-2.5 text-[10px] font-bold text-white shadow-[0_5px_12px_rgba(0,82,255,0.14)] transition hover:bg-[#0047DE]"
            >
              <Plus size={15} />
              Pesan Restok Pabrik
            </button>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}