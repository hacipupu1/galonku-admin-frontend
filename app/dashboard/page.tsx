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
  X,
  UserCheck,
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
  rawId?: number | string;
  customer: string;
  product: string;
  image?: string;
  time: string;
  price: string;
  priceNumber?: number;
  status: string;
  courier?: string;
};

type ChartRange = "Hari Ini" | "Mingguan" | "Bulanan";

const CHART_CONFIG: Record<
  ChartRange,
  {
    subtitle: string;
    peakLabel: string;
    peakValue: string;
    peakSub: string;
    avgDelivery: string;
    completionRate: string;
    path: string;
    areaPath: string;
    points: { x: number; y: number; label: string; count: number }[];
  }
> = {
  "Hari Ini": {
    subtitle: "Fluktuasi lonjakan pesanan jam kerja per 2 jam (08:00 - 18:00)",
    peakLabel: "Jam Puncak (Peak)",
    peakValue: "11:00 - 13:00",
    peakSub: "(15 pesanan)",
    avgDelivery: "22.4 Menit",
    completionRate: "96.8% Sukses",
    path: "M0 185 C70 170 95 135 160 125 C230 115 280 42 360 36 C420 31 455 94 510 76 C590 50 650 70 800 42",
    areaPath:
      "M0 185 C70 170 95 135 160 125 C230 115 280 42 360 36 C420 31 455 94 510 76 C590 50 650 70 800 42 L800 215 L0 215 Z",
    points: [
      { x: 0, y: 185, label: "08:00", count: 4 },
      { x: 160, y: 125, label: "10:00", count: 9 },
      { x: 360, y: 36, label: "12:00", count: 15 },
      { x: 510, y: 76, label: "14:00", count: 11 },
      { x: 650, y: 62, label: "16:00", count: 12 },
      { x: 800, y: 42, label: "18:00", count: 14 },
    ],
  },
  Mingguan: {
    subtitle: "Rekap volume pengantaran galon harian (Senin - Minggu)",
    peakLabel: "Hari Tersibuk",
    peakValue: "Sabtu & Minggu",
    peakSub: "(64 pesanan/hari)",
    avgDelivery: "24.1 Menit",
    completionRate: "97.4% Sukses",
    path: "M0 150 C110 140 150 95 260 105 C370 115 430 60 540 50 C650 40 710 25 800 28",
    areaPath:
      "M0 150 C110 140 150 95 260 105 C370 115 430 60 540 50 C650 40 710 25 800 28 L800 215 L0 215 Z",
    points: [
      { x: 0, y: 150, label: "Sen", count: 38 },
      { x: 160, y: 122, label: "Sel", count: 44 },
      { x: 320, y: 102, label: "Rab", count: 47 },
      { x: 480, y: 65, label: "Kam", count: 53 },
      { x: 640, y: 38, label: "Jum", count: 59 },
      { x: 800, y: 28, label: "Sab", count: 64 },
    ],
  },
  Bulanan: {
    subtitle: "Tren pertumbuhan pesanan refill Depo JKT-04 per minggu",
    peakLabel: "Minggu Tertinggi",
    peakValue: "Minggu ke-4",
    peakSub: "(342 pesanan)",
    avgDelivery: "21.8 Menit",
    completionRate: "98.1% Sukses",
    path: "M0 175 C180 155 240 120 400 95 C560 70 640 45 800 22",
    areaPath:
      "M0 175 C180 155 240 120 400 95 C560 70 640 45 800 22 L800 215 L0 215 Z",
    points: [
      { x: 0, y: 175, label: "Minggu 1", count: 245 },
      { x: 266, y: 122, label: "Minggu 2", count: 289 },
      { x: 533, y: 72, label: "Minggu 3", count: 318 },
      { x: 800, y: 22, label: "Minggu 4", count: 342 },
    ],
  },
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
    courier: "Budi Pratama",
  },
  {
    id: "#ORD-9020",
    customer: "Rian Mahendra",
    product: "Le Minerale 15L (2 Galon)",
    time: "10:35",
    price: "Rp 34.000",
    priceNumber: 34000,
    status: "Diproses",
    courier: "Joko Susilo",
  },
  {
    id: "#ORD-9019",
    customer: "Kantor Notaris Hendra",
    product: "Cleo 19L (5 Galon)",
    time: "10:12",
    price: "Rp 80.000",
    priceNumber: 80000,
    status: "Selesai",
    courier: "Ahmad D.",
  },
  {
    id: "#ORD-9018",
    customer: "Siti Nurhaliza",
    product: "Vit 19L (2 Galon)",
    time: "09:55",
    price: "Rp 30.000",
    priceNumber: 30000,
    status: "Selesai",
    courier: "Budi Pratama",
  },
];

function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount || 0);
}

// Helper mencocokkan nama produk di pesanan dengan foto produk backend/lokal
function resolveGalonImage(productText: string, productList: Product[]): string {
  const lower = productText.toLowerCase();

  const matched = productList.find((p) => {
    const brandKeyword = p.name.toLowerCase().split(" ")[0];
    return (
      lower.includes(p.name.toLowerCase()) ||
      (brandKeyword.length >= 3 && lower.includes(brandKeyword))
    );
  });

  if (matched?.image) return matched.image;
  if (lower.includes("minerale")) return "/products/le-minerale-15l.png";
  if (lower.includes("cleo")) return "/products/cleo-19l.png";
  if (lower.includes("vit")) return "/products/vit-19l.png";
  return "/products/aqua-19l.png";
}

export default function DashboardPage() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [orders, setOrders] = useState<Order[]>(defaultOrders);
  const [hasDbOrders, setHasDbOrders] = useState(false);

  // State Interaktif Baru
  const [chartRange, setChartRange] = useState<ChartRange>("Hari Ini");
  const [hoveredPoint, setHoveredPoint] = useState<{
    label: string;
    count: number;
  } | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [standbyCalled, setStandbyCalled] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [failedOrderImages, setFailedOrderImages] = useState<Record<string, boolean>>({});

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

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
      let latestProductList = products;

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
          latestProductList = mappedProducts;
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

            const productName = o.product_name || o.productName || "Aqua 19L (2 Galon)";
            const rawOrderImg = o.product_image || o.image_url || o.image || "";
            const resolvedImage = rawOrderImg
              ? rawOrderImg.startsWith("http") || rawOrderImg.startsWith("/")
                ? rawOrderImg
                : `http://localhost:5000/uploads/${rawOrderImg}`
              : resolveGalonImage(productName, latestProductList);

            return {
              id: o.order_code || `#ORD-${o.id}`,
              rawId: o.id,
              customer: o.customer_name || o.customerName || "Pelanggan GalonKu",
              product: productName,
              image: resolvedImage,
              time: timeStr,
              price: formatRupiah(priceNum),
              priceNumber: priceNum,
              status: displayStatus,
              courier: o.courier_name || o.courier || "Budi Pratama",
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

  // Interaksi 1: Ubah status pesanan langsung (Diproses -> Diantar -> Selesai)
  const handleCycleOrderStatus = async (order: Order, nextStatus?: string) => {
    const flow = ["Diproses", "Diantar", "Selesai"];
    const currentIndex = flow.indexOf(order.status);
    const updatedStatus = nextStatus || flow[(currentIndex + 1) % flow.length];

    setOrders((prev) =>
      prev.map((item) => (item.id === order.id ? { ...item, status: updatedStatus } : item))
    );
    if (selectedOrder?.id === order.id) {
      setSelectedOrder({ ...order, status: updatedStatus });
    }
    showToast(`Status ${order.id} diubah menjadi "${updatedStatus}"`);

    // Sinkronkan ke backend jika terhubung
    if (order.rawId) {
      const token = localStorage.getItem("token");
      try {
        await fetch(`${API_URL}/orders/${order.rawId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ status: updatedStatus }),
        });
      } catch {
        // Tetap simpan perubahan lokal jika offline
      }
    }
  };

  // Interaksi 2: Quick Restok (+5 Galon) langsung dari kartu produk
  const handleQuickRestock = async (product: Product, addQty = 5) => {
    const newStock = product.stock + addQty;
    const newStatus: "Kritis" | "Rendah" | "Tersedia" =
      newStock <= 2 ? "Kritis" : newStock <= 4 ? "Rendah" : "Tersedia";

    setProducts((prev) =>
      prev.map((p) =>
        (p.id && p.id === product.id) || p.name === product.name
          ? { ...p, stock: newStock, status: newStatus }
          : p
      )
    );
    showToast(`+${addQty} stok ditambahkan ke ${product.name} (Total: ${newStock})`);

    if (product.id) {
      const token = localStorage.getItem("token");
      try {
        await fetch(`${API_URL}/products/${product.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ stock: newStock }),
        });
      } catch {
        // Tetap simpan state UI jika API patch belum tersedia
      }
    }
  };

  const summary = useMemo(() => {
    const totalStock = products.reduce((acc, item) => acc + item.stock, 0);
    const isLowStock = totalStock < 20;
    const totalOrders = hasDbOrders ? orders.length : 48;
    const totalRevenue = hasDbOrders
      ? formatRupiah(orders.reduce((acc, item) => acc + (item.priceNumber || 0), 0))
      : "Rp 864.000";

    return { totalStock, isLowStock, totalOrders, totalRevenue };
  }, [products, orders, hasDbOrders]);

  const activeChart = CHART_CONFIG[chartRange];

  return (
    <div className="space-y-4">
      {/* Notifikasi Toast Interaktif */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-xl bg-[#131B2E] px-4 py-3 text-xs font-bold text-white shadow-xl">
          <CheckCircle2 size={16} className="text-[#28A745]" />
          <span>{toast}</span>
        </div>
      )}

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
              type="button"
              onClick={() => {
                fetchDashboardData();
                showToast("Data dashboard berhasil diperbarui");
              }}
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
            <Link href="/orders" className="font-bold text-[#087D86] hover:underline">
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
            <Link href="/reports" className="font-bold text-[#087D86] hover:underline">
              Laporan →
            </Link>
          </div>
        </div>

        {/* Status Stock Galon (Dinamis sesuai totalStock) */}
        <div className="overflow-hidden rounded-2xl border border-[#EEF0F5] bg-white">
          <div className="flex items-start justify-between p-5">
            <div>
              <p className="text-xs font-medium text-[#596378]">Status Stock Galon</p>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span
                  className={`text-2xl font-extrabold ${
                    summary.isLowStock ? "text-[#D93636]" : "text-[#16752C]"
                  }`}
                >
                  {summary.totalStock}
                </span>
                <span className="text-[10px] text-[#6C7588]">galon terisi</span>
              </div>
            </div>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                summary.isLowStock
                  ? "bg-[#FFE0E0] text-[#D93636]"
                  : "bg-[#C5F8D0] text-[#16752C]"
              }`}
            >
              {summary.isLowStock ? <AlertTriangle size={18} /> : <CheckCircle2 size={18} />}
            </div>
          </div>
          <div
            className={`flex items-center justify-between px-5 py-2 text-[10px] ${
              summary.isLowStock ? "bg-[#FFF0F0]" : "bg-[#F1FBF4]"
            }`}
          >
            <span
              className={`flex items-center gap-1 font-semibold ${
                summary.isLowStock ? "text-[#D93636]" : "text-[#16752C]"
              }`}
            >
              <Boxes size={12} />
              {summary.isLowStock ? "Perlu Restok Segera" : "Stok Depo Aman"}{" "}
              <span className="font-normal text-[#687289]">
                ({summary.isLowStock ? "< 20 unit" : "siap kirim"})
              </span>
            </span>
            <Link
              href="/products"
              className={`font-bold hover:underline ${
                summary.isLowStock ? "text-[#D93636]" : "text-[#16752C]"
              }`}
            >
              {summary.isLowStock ? "Restok →" : "Kelola →"}
            </Link>
          </div>
        </div>
      </section>

      {/* 3. GRAFIK & PESANAN TERBARU */}
      <section className="grid gap-4 xl:grid-cols-[1.55fr_0.85fr]">
        {/* Grafik Interaktif */}
        <div className="rounded-2xl border border-[#EEF0F5] bg-white p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-[#131B2E]">Grafik Pesanan</h2>
                <span className="rounded bg-[#EEF0FF] px-2 py-0.5 text-[9px] font-bold text-[#0052FF]">
                  Realtime
                </span>
              </div>
              <p className="mt-0.5 text-[10px] text-[#6C7588]">{activeChart.subtitle}</p>
            </div>
            <div className="flex rounded-xl bg-[#F0F1FF] p-1">
              {(["Hari Ini", "Mingguan", "Bulanan"] as ChartRange[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setChartRange(item);
                    setHoveredPoint(null);
                  }}
                  className={`rounded-lg px-2.5 py-1 text-[9px] font-bold transition ${
                    chartRange === item
                      ? "bg-white text-[#0052FF] shadow-sm"
                      : "text-[#626C80] hover:text-[#131B2E]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-[#F1F1FF] p-3 text-center">
            <div>
              <p className="text-[9px] text-[#687289]">{activeChart.peakLabel}</p>
              <p className="text-xs font-extrabold text-[#131B2E]">{activeChart.peakValue}</p>
              <p className="text-[9px] text-[#687289]">{activeChart.peakSub}</p>
            </div>
            <div>
              <p className="text-[9px] text-[#687289]">Rata-rata Pengiriman</p>
              <p className="text-xs font-extrabold text-[#087D86]">{activeChart.avgDelivery}</p>
            </div>
            <div>
              <p className="text-[9px] text-[#687289]">Tingkat Penyelesaian</p>
              <p className="text-xs font-extrabold text-[#16752C]">
                {activeChart.completionRate}
              </p>
            </div>
          </div>

          <div className="relative mt-4 h-[220px] w-full">
            {hoveredPoint && (
              <div className="absolute right-3 top-2 z-10 rounded-lg bg-[#131B2E] px-2.5 py-1 text-[10px] font-bold text-white shadow">
                {hoveredPoint.label}: {hoveredPoint.count} pesanan
              </div>
            )}
            <svg viewBox="0 0 800 240" className="h-full w-full overflow-visible">
              <defs>
                <linearGradient id="chartArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0052FF" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#0052FF" stopOpacity="0.03" />
                </linearGradient>
              </defs>
              <path d={activeChart.areaPath} fill="url(#chartArea)" />
              <path
                d={activeChart.path}
                fill="none"
                stroke="#0052FF"
                strokeWidth="4"
                strokeLinecap="round"
              />
              {activeChart.points.map((pt) => (
                <g key={pt.label}>
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={6}
                    fill="#FFFFFF"
                    stroke="#0052FF"
                    strokeWidth={3}
                    className="cursor-pointer transition-transform hover:scale-125"
                    onMouseEnter={() => setHoveredPoint({ label: pt.label, count: pt.count })}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                  <text
                    x={pt.x}
                    y={232}
                    textAnchor="middle"
                    className="fill-[#687289] text-[11px] font-medium"
                  >
                    {pt.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Pesanan Terbaru dengan Foto Galon & Klik Status */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#EEF0F5] bg-white p-5">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-[#131B2E]">Pesanan Terbaru</h2>
                <span className="rounded bg-[#DDF0FF] px-2 py-0.5 text-[9px] font-bold text-[#0052FF]">
                  Live Feed
                </span>
              </div>
              <Link href="/orders" className="text-[10px] font-bold text-[#0052FF] hover:underline">
                Lihat Semua →
              </Link>
            </div>
            <p className="mt-0.5 text-[10px] text-[#6C7588]">
              Klik badge status untuk ubah cepat atau klik item untuk detail
            </p>

            <div className="mt-3 space-y-2">
              {orders.slice(0, 4).map((ord) => {
                const galonImgSrc = ord.image || resolveGalonImage(ord.product, products);
                const imgBroken = failedOrderImages[ord.id];

                return (
                  <div
                    key={ord.id}
                    onClick={() => setSelectedOrder(ord)}
                    className="flex cursor-pointer items-center justify-between rounded-xl border border-transparent bg-[#F4F6FD] p-2.5 transition hover:border-[#0052FF]/30 hover:bg-[#EDF1FC]"
                  >
                    <div className="flex items-center gap-2.5">
                      {/* Foto Galon Sesuai Produk yang Dipesan */}
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#E4E8F5] bg-white p-1">
                        {!imgBroken ? (
                          <img
                            src={galonImgSrc}
                            alt={ord.product}
                            className="h-full w-full object-contain"
                            onError={() =>
                              setFailedOrderImages((prev) => ({ ...prev, [ord.id]: true }))
                            }
                          />
                        ) : (
                          <Package size={16} className="text-[#0052FF]" />
                        )}
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
                      <button
                        type="button"
                        title="Klik untuk ganti status pesanan"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCycleOrderStatus(ord);
                        }}
                        className={`rounded-full px-2 py-0.5 text-[9px] font-bold transition hover:opacity-80 ${
                          ord.status === "Diantar"
                            ? "bg-[#C9F4F7] text-[#087D86]"
                            : ord.status === "Diproses"
                            ? "bg-[#DCE7FF] text-[#164FC1]"
                            : "bg-[#BDF6C9] text-[#16752C]"
                        }`}
                      >
                        ● {ord.status}
                      </button>
                      <p className="mt-1 text-xs font-bold text-[#131B2E]">{ord.price}</p>
                    </div>
                  </div>
                );
              })}
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
              className="rounded-2xl border border-[#E9ECF8] bg-[#F4F5FF] p-3 transition hover:border-[#0052FF]/30"
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
                <button
                  type="button"
                  onClick={() => handleQuickRestock(p, 5)}
                  className="rounded-lg bg-[#DCE6FF] px-2.5 py-1 font-bold text-[#0052FF] transition hover:bg-[#0052FF] hover:text-white"
                >
                  + Restok (+5)
                </button>
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
                  {standbyCalled ? "5 Kurir Beroperasi" : "4 Kurir Beroperasi"}
                </span>
              </div>
              <p className="text-[10px] text-[#69738A]">
                Budi Pratama (8 galon), Joko Susilo (6 galon), Ahmad D. (4 galon),{" "}
                {standbyCalled ? "Indra (Aktif Mengantar)" : "Indra (Standby di Depo)"}
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
            <button
              type="button"
              disabled={standbyCalled}
              onClick={() => {
                setStandbyCalled(true);
                showToast("Kurir Indra berhasil dipanggil untuk pengantaran!");
              }}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold text-white transition ${
                standbyCalled
                  ? "cursor-default bg-[#16752C]"
                  : "bg-[#0052FF] hover:bg-[#0047DE]"
              }`}
            >
              {standbyCalled && <UserCheck size={14} />}
              {standbyCalled ? "Semua Kurir Aktif" : "Panggil Kurir Standby"}
            </button>
          </div>
        </div>
      </section>

      {/* MODAL DETAIL & UPDATE PESANAN */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#EEF0F5] pb-3">
              <div>
                <h3 className="text-base font-extrabold text-[#131B2E]">
                  Detail Pesanan {selectedOrder.id}
                </h3>
                <p className="text-[11px] text-[#69738A]">Masuk pukul {selectedOrder.time}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="rounded-lg p-1.5 text-[#69738A] hover:bg-[#F2F4FA]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4 flex items-center gap-3 rounded-xl bg-[#F4F6FD] p-3">
              <img
                src={selectedOrder.image || resolveGalonImage(selectedOrder.product, products)}
                alt={selectedOrder.product}
                className="h-14 w-14 rounded-lg bg-white object-contain p-1"
              />
              <div>
                <p className="text-xs font-bold text-[#131B2E]">{selectedOrder.customer}</p>
                <p className="text-xs font-semibold text-[#087D86]">{selectedOrder.product}</p>
                <p className="mt-0.5 text-xs font-extrabold text-[#131B2E]">
                  {selectedOrder.price}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <p className="mb-2 text-xs font-bold text-[#293246]">Update Status Pengiriman:</p>
              <div className="grid grid-cols-3 gap-2">
                {["Diproses", "Diantar", "Selesai"].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => handleCycleOrderStatus(selectedOrder, st)}
                    className={`rounded-xl py-2 text-xs font-bold transition ${
                      selectedOrder.status === st
                        ? "bg-[#0052FF] text-white shadow-sm"
                        : "bg-[#F2F4FA] text-[#596378] hover:bg-[#E5E9F5]"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="rounded-xl bg-[#131B2E] px-4 py-2 text-xs font-bold text-white"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}