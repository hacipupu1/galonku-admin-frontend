"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  Package,
  Plus,
  RefreshCw,
  ShoppingCart,
  Truck,
  ArrowUpRight,
  AlertTriangle,
  Boxes,
  Activity,
  WalletCards,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

type Product = {
  id?: number;
  name: string;
  description: string;
  image: string;
  price: string;
  stock: number;
  maxStock: number;
  status: "Kritis" | "Rendah" | "Tersedia";
};

type Order = {
  id: string;
  customer: string;
  product: string;
  time: string;
  price: string;
  priceNumber?: number;
  status: string;
};

const defaultProducts: Product[] = [
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

const defaultOrders: Order[] = [
  {
    id: "#ORD-9021",
    customer: "Fia Salsabila",
    product: "Aqua 19L (3 Galon)",
    time: "10:48",
    price: "Rp 54.000",
    priceNumber: 54000,
    status: "Diantar",
  },
  {
    id: "#ORD-9020",
    customer: "Rian Mahendra",
    product: "Le Minerale 15L (2 Galon)",
    time: "10:35",
    price: "Rp 34.000",
    priceNumber: 34000,
    status: "Diproses",
  },
  {
    id: "#ORD-9019",
    customer: "Kantor Notaris Hendra",
    product: "Cleo 19L (5 Galon)",
    time: "10:12",
    price: "Rp 80.000",
    priceNumber: 80000,
    status: "Selesai",
  },
  {
    id: "#ORD-9018",
    customer: "Siti Nurhaliza",
    product: "Vit 19L (2 Galon)",
    time: "09:55",
    price: "Rp 30.000",
    priceNumber: 30000,
    status: "Selesai",
  },
];

function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount || 0);
}

export default function DashboardPage() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [orders, setOrders] = useState<Order[]>(defaultOrders);
  const [hasDbOrders, setHasDbOrders] = useState(false);

  const fetchDashboardData = async () => {
    setRefreshing(true);
    const token = localStorage.getItem("token");
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    try {
      const [prodRes, ordRes] = await Promise.allSettled([
        fetch(`${API_URL}/products`, { headers }),
        fetch(`${API_URL}/orders`, { headers }),
      ]);

      let connected = false;

      if (prodRes.status === "fulfilled" && prodRes.value.ok) {
        connected = true;
        const prodJson = await prodRes.value.json();
        const rawProducts = Array.isArray(prodJson) ? prodJson : prodJson.data || [];

        if (rawProducts.length > 0) {
          const mappedProducts: Product[] = rawProducts.map((p: any) => {
            const stock = Number(p.stock ?? 0);
            const priceNum = Number(p.price ?? 0);
            const maxStock = Number(p.maxStock ?? p.max_stock ?? 20);
            const rawImg = p.imageUrl || p.image_url || p.image || "";
            const fullImage = rawImg
              ? rawImg.startsWith("http") || rawImg.startsWith("/")
                ? rawImg
                : `http://localhost:5000/uploads/${rawImg}`
              : "/products/aqua-19l.png";

            let status: "Kritis" | "Rendah" | "Tersedia" = "Tersedia";
            if (stock <= 2) status = "Kritis";
            else if (stock <= 4) status = "Rendah";

            return {
              id: p.id,
              name: p.name,
              description: p.description || "Air Mineral Pegunungan",
              image: fullImage,
              price: formatRupiah(priceNum),
              stock,
              maxStock,
              status,
            };
          });
          setProducts(mappedProducts);
        }
      }

      if (ordRes.status === "fulfilled" && ordRes.value.ok) {
        connected = true;
        const ordJson = await ordRes.value.json();
        const rawOrders = Array.isArray(ordJson) ? ordJson : ordJson.data || [];

        if (rawOrders.length > 0) {
          const mappedOrders: Order[] = rawOrders.map((o: any) => {
            const priceNum = Number(o.total_price ?? o.totalAmount ?? o.total ?? o.price ?? 0);
            const createdDate = o.created_at || o.createdAt;
            const timeStr = createdDate
              ? new Date(createdDate).toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "10:00";

            const rawStatus = String(o.status || "Diproses").toLowerCase();
            let displayStatus = o.status || "Diproses";
            if (rawStatus === "pending" || rawStatus === "processing") displayStatus = "Diproses";
            else if (rawStatus === "delivering" || rawStatus === "shipping") displayStatus = "Diantar";
            else if (rawStatus === "completed" || rawStatus === "done" || rawStatus === "delivered")
              displayStatus = "Selesai";

            return {
              id: o.order_code || `#ORD-${o.id}`,
              customer: o.customer_name || o.customerName || "Pelanggan GalonKu",
              product: o.product_name || "Aqua 19L (2 Galon)",
              time: timeStr,
              price: formatRupiah(priceNum),
              priceNumber: priceNum,
              status: displayStatus,
            };
          });
          setOrders(mappedOrders);
          setHasDbOrders(true);
        }
      }

      setIsConnected(connected);
    } catch {
      setIsConnected(false);
    } finally {
      setTimeout(() => setRefreshing(false), 500);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    fetchDashboardData();
  }, [router]);

  const summary = useMemo(() => {
    const totalStock = products.reduce((acc, item) => acc + item.stock, 0);
    const totalOrders = hasDbOrders ? orders.length : 48;
    const totalRevenue = hasDbOrders
      ? formatRupiah(orders.reduce((acc, item) => acc + (item.priceNumber || 0), 0))
      : "Rp 864.000";

    return { totalStock, totalOrders, totalRevenue };
  }, [products, orders, hasDbOrders]);

  return (
    <div className="space-y-4">
      {/* 1. BANNER OPERASIONAL */}
      <section className="rounded-2xl border border-[#EEF0F5] bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-wider text-[#087D86]">
              <Activity size={15} />
              Monitoring Operasional Realtime
            </div>
            <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-[#131B2E]">
              Ringkasan Operasional Hari Ini
            </h1>
            <p className="mt-0.5 text-xs text-[#6D768A]">
              Update terkini aktivitas refill dan inventaris Depo Kebayoran Lama (JKT-04)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchDashboardData}
              className="flex h-10 items-center gap-2 rounded-xl bg-[#F0F3FF] px-3.5 text-xs font-bold text-[#26334C] transition hover:bg-[#E6EBFF]"
            >
              <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
              Refresh Data
            </button>
            <div
              className={`flex h-10 items-center gap-2 rounded-xl px-3.5 text-xs font-bold ${
                isConnected
                  ? "bg-[#C5F8D0] text-[#16752C]"
                  : "bg-[#FFE0E0] text-[#D93636]"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  isConnected ? "bg-[#28A745]" : "bg-[#D93636]"
                }`}
              />
              {isConnected ? "Sinkron: Aktif" : "Sinkron: Terputus"}
            </div>
          </div>
        </div>
      </section>

      {/* 2. RINGKASAN STATISTIK */}
      <section className="grid gap-4 md:grid-cols-3">
        {/* Total Pesanan */}
        <div className="overflow-hidden rounded-2xl border border-[#EEF0F5] bg-white">
          <div className="flex items-start justify-between p-5">
            <div>
              <p className="text-xs font-medium text-[#596378]">Total Pesanan</p>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-2xl font-extrabold text-[#0052FF]">
                  {summary.totalOrders}
                </span>
                <span className="text-[10px] text-[#6C7588]">transaksi</span>
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#DDE7FF] text-[#0052FF]">
              <ShoppingCart size={18} />
            </div>
          </div>
          <div className="flex items-center justify-between bg-[#F2F1FF] px-5 py-2 text-[10px]">
            <span className="flex items-center gap-1 font-semibold text-[#257143]">
              <ArrowUpRight size={12} /> +12%{" "}
              <span className="font-normal text-[#687289]">vs kemarin (42 pesanan)</span>
            </span>
            <Link href="/orders" className="font-bold text-[#087D86]">
              Detail →
            </Link>
          </div>
        </div>

        {/* Pendapatan Bersih */}
        <div className="overflow-hidden rounded-2xl border border-[#EEF0F5] bg-white">
          <div className="flex items-start justify-between p-5">
            <div>
              <p className="text-xs font-medium text-[#596378]">Pendapatan Bersih</p>
              <div className="mt-1">
                <span className="text-2xl font-extrabold text-[#131B2E]">
                  {summary.totalRevenue}
                </span>
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#BCECF6] text-[#087D86]">
              <WalletCards size={18} />
            </div>
          </div>
          <div className="flex items-center justify-between bg-[#F1FBF4] px-5 py-2 text-[10px]">
            <span className="flex items-center gap-1 font-semibold text-[#257143]">
              <CheckCircle2 size={12} /> +8.5%{" "}
              <span className="font-normal text-[#687289]">melampaui target harian</span>
            </span>
            <Link href="/reports" className="font-bold text-[#087D86]">
              Laporan →
            </Link>
          </div>
        </div>

        {/* Status Stock Galon */}
        <div className="overflow-hidden rounded-2xl border border-[#EEF0F5] bg-white">
          <div className="flex items-start justify-between p-5">
            <div>
              <p className="text-xs font-medium text-[#596378]">Status Stock Galon</p>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-2xl font-extrabold text-[#D93636]">
                  {summary.totalStock}
                </span>
                <span className="text-[10px] text-[#6C7588]">galon terisi</span>
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFE0E0] text-[#D93636]">
              <AlertTriangle size={18} />
            </div>
          </div>
          <div className="flex items-center justify-between bg-[#FFF0F0] px-5 py-2 text-[10px]">
            <span className="flex items-center gap-1 font-semibold text-[#D93636]">
              <Boxes size={12} /> Perlu Restok Segera{" "}
              <span className="font-normal text-[#687289]">(&lt; 20 unit)</span>
            </span>
            <Link href="/products" className="font-bold text-[#D93636]">
              Restok →
            </Link>
          </div>
        </div>
      </section>

      {/* 3. GRAFIK & PESANAN TERBARU */}
      <section className="grid gap-4 xl:grid-cols-[1.55fr_0.85fr]">
        {/* Grafik */}
        <div className="rounded-2xl border border-[#EEF0F5] bg-white p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-[#131B2E]">Grafik Pesanan</h2>
                <span className="rounded bg-[#EEF0FF] px-2 py-0.5 text-[9px] font-bold text-[#0052FF]">
                  Realtime
                </span>
              </div>
              <p className="mt-0.5 text-[10px] text-[#6C7588]">
                Fluktuasi lonjakan pesanan jam kerja per 2 jam (08:00 - 18:00)
              </p>
            </div>
            <div className="flex rounded-xl bg-[#F0F1FF] p-1">
              {["Hari Ini", "Mingguan", "Bulanan"].map((item, idx) => (
                <button
                  key={item}
                  className={`rounded-lg px-2.5 py-1 text-[9px] font-bold ${
                    idx === 0 ? "bg-white text-[#0052FF] shadow-sm" : "text-[#626C80]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-[#F1F1FF] p-3 text-center">
            <div>
              <p className="text-[9px] text-[#687289]">Jam Puncak (Peak)</p>
              <p className="text-xs font-extrabold text-[#131B2E]">11:00 - 13:00</p>
              <p className="text-[9px] text-[#687289]">(15 pesanan)</p>
            </div>
            <div>
              <p className="text-[9px] text-[#687289]">Rata-rata Pengiriman</p>
              <p className="text-xs font-extrabold text-[#087D86]">22.4 Menit</p>
            </div>
            <div>
              <p className="text-[9px] text-[#687289]">Tingkat Penyelesaian</p>
              <p className="text-xs font-extrabold text-[#16752C]">96.8% Sukses</p>
            </div>
          </div>

          <div className="relative mt-4 h-[220px] w-full">
            <svg viewBox="0 0 800 240" className="h-full w-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0052FF" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#0052FF" stopOpacity="0.03" />
                </linearGradient>
              </defs>
              <path
                d="M0 185 C70 170 95 135 160 125 C230 115 280 42 360 36 C420 31 455 94 510 76 C590 50 650 70 800 42 L800 215 L0 215 Z"
                fill="url(#chartArea)"
              />
              <path
                d="M0 185 C70 170 95 135 160 125 C230 115 280 42 360 36 C420 31 455 94 510 76 C590 50 650 70 800 42"
                fill="none"
                stroke="#0052FF"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Pesanan Terbaru */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#EEF0F5] bg-white p-5">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-[#131B2E]">Pesanan Terbaru</h2>
                <span className="rounded bg-[#DDF0FF] px-2 py-0.5 text-[9px] font-bold text-[#0052FF]">
                  Live Feed
                </span>
              </div>
              <Link href="/orders" className="text-[10px] font-bold text-[#0052FF]">
                Lihat Semua →
              </Link>
            </div>
            <p className="mt-0.5 text-[10px] text-[#6C7588]">
              5 antrean pesanan terakhir masuk dari aplikasi konsumen
            </p>

            <div className="mt-3 space-y-2">
              {orders.slice(0, 4).map((ord) => (
                <div
                  key={ord.id}
                  className="flex items-center justify-between rounded-xl bg-[#F4F6FD] p-2.5"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#0052FF]">
                      <Package size={16} />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#131B2E]">
                        <span>{ord.id}</span>
                        <span className="text-[9px] font-normal text-[#7A8498]">{ord.time}</span>
                      </div>
                      <p className="text-[10px] text-[#69738A]">{ord.customer}</p>
                      <p className="text-[10px] font-semibold text-[#087D86]">{ord.product}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                        ord.status === "Diantar"
                          ? "bg-[#C9F4F7] text-[#087D86]"
                          : ord.status === "Diproses"
                          ? "bg-[#DCE7FF] text-[#164FC1]"
                          : "bg-[#BDF6C9] text-[#16752C]"
                      }`}
                    >
                      ● {ord.status}
                    </span>
                    <p className="mt-1 text-xs font-bold text-[#131B2E]">{ord.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between rounded-xl bg-[#EEF1FF] p-3 text-[#131B2E]">
            <span className="text-[10px] font-semibold">
              Masuk antrean baru? Segera tugaskan kurir
            </span>
            <Link
              href="/orders"
              className="rounded-lg bg-[#0052FF] px-3 py-1.5 text-[10px] font-bold text-white hover:bg-[#0047DE]"
            >
              Dispatch Kurir
            </Link>
          </div>
        </div>
      </section>

      {/* 4. STOK GALON FISIK DI DEPO */}
      <section className="rounded-2xl border border-[#EEF0F5] bg-white p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Boxes size={18} className="text-[#0052FF]" />
              <h2 className="text-base font-extrabold text-[#131B2E]">
                Status Stok Galon Fisik di Depo
              </h2>
            </div>
            <p className="mt-0.5 text-[10px] text-[#69738A]">
              Ketersediaan galon isi siap dikirim berdasarkan inventaris rak fisik Depo JKT-04
            </p>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-1.5 rounded-xl bg-[#0052FF] px-4 py-2 text-xs font-bold text-white hover:bg-[#0047DE]"
          >
            <Plus size={15} /> Pesan Restok Pabrik
          </Link>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((p) => (
            <div
              key={p.id || p.name}
              className="rounded-2xl border border-[#E9ECF8] bg-[#F4F5FF] p-3"
            >
              <div className="mb-2 flex items-center justify-between text-[10px] font-bold">
                <span
                  className={`rounded-full px-2 py-0.5 ${
                    p.status === "Tersedia"
                      ? "bg-[#CFF7F6] text-[#087D86]"
                      : "bg-[#FFE0E0] text-[#D93636]"
                  }`}
                >
                  ● {p.status}: {p.stock} Sisa
                </span>
              </div>
              <div className="flex h-28 items-center justify-center rounded-xl bg-white p-2">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-24 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
              <div className="mt-2 text-center">
                <h3 className="text-sm font-bold text-[#131B2E]">{p.name}</h3>
                <p className="text-[10px] text-[#69738A]">{p.description}</p>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-[10px] text-[#69738A]">Harga Refill</span>
                <span className="font-bold text-[#131B2E]">{p.price}</span>
              </div>
              <div className="mt-2 flex items-center justify-between gap-2 border-t border-[#E0E4F0] pt-2 text-[10px]">
                <span className="font-bold text-[#087D86]">
                  Tersedia: {p.stock}/{p.maxStock} Rak
                </span>
                <Link
                  href="/products"
                  className="rounded-lg bg-[#DCE6FF] px-2.5 py-1 font-bold text-[#0052FF] hover:bg-[#CEDCFF]"
                >
                  + Restok
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. ARMADA PENGANTARAN AKTIF */}
      <section className="rounded-2xl border border-[#EEF0F5] bg-white p-3">
        <div className="flex flex-col gap-3 rounded-xl bg-[#EEF1FF] p-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#0052FF]">
              <Truck size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-bold text-[#131B2E]">Armada Pengantaran Aktif</h3>
                <span className="rounded-md bg-[#C5F8D0] px-2 py-0.5 text-[9px] font-bold text-[#16752C]">
                  4 Kurir Beroperasi
                </span>
              </div>
              <p className="text-[10px] text-[#69738A]">
                Budi Pratama (8 galon), Joko Susilo (6 galon), Ahmad D. (4 galon), Indra (Standby di
                Depo)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/monitoring"
              className="rounded-xl bg-white px-3 py-2 text-xs font-bold text-[#293246] hover:bg-slate-50"
            >
              Live Map GPS
            </Link>
            <button className="rounded-xl bg-[#0052FF] px-3 py-2 text-xs font-bold text-white hover:bg-[#0047DE]">
              Panggil Kurir Standby
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}