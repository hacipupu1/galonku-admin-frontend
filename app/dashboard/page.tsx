"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  Plus,
  ShoppingCart,
  ArrowUpRight,
  AlertTriangle,
  Boxes,
  Activity,
  WalletCards,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
const BASE_HOST = API_URL.replace(/\/api\/?$/, "");
const STORAGE_ORDERS_KEY = "galonku_orders_v1";

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
    stock: 140,
    maxStock: 160,
    status: "Tersedia",
  },
  {
    name: "Le Minerale 15L",
    description: "Galon Sekali Pakai BPA Free",
    image: "/products/le-minerale-15l.png",
    price: "Rp 17.000",
    stock: 80,
    maxStock: 100,
    status: "Tersedia",
  },
  {
    name: "Cleo Pure Water 19L",
    description: "Air Demineral Murni",
    image: "/products/cleo-19l.png",
    price: "Rp 16.000",
    stock: 80,
    maxStock: 100,
    status: "Tersedia",
  },
  {
    name: "Vit 19 Liter",
    description: "Air Mineral Higienis Teruji",
    image: "/products/vit-19l.png",
    price: "Rp 15.000",
    stock: 35,
    maxStock: 50,
    status: "Tersedia",
  },
];

const defaultOrders: Order[] = [
  {
    id: "#ORD-1",
    customer: "Pelanggan #1",
    product: "Pesanan Galon #1 (3 Galon)",
    time: "17:30",
    price: "Rp 54.000",
    priceNumber: 54000,
    status: "Selesai",
    courier: "Budi Pratama",
  },
  {
    id: "#ORD-2",
    customer: "Pelanggan #2",
    product: "Pesanan Galon #2 (3 Galon)",
    time: "17:30",
    price: "Rp 54.000",
    priceNumber: 54000,
    status: "Diproses",
    courier: "Joko Susilo",
  },
  {
    id: "#ORD-3",
    customer: "Pelanggan #3",
    product: "Pesanan Galon #3 (2 Galon)",
    time: "17:30",
    price: "Rp 50.000",
    priceNumber: 50000,
    status: "Diproses",
    courier: "Ahmad D.",
  },
];

function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount || 0);
}

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
  const [isConnected, setIsConnected] = useState(false);
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [orders, setOrders] = useState<Order[]>(defaultOrders);
  const [hasDbOrders, setHasDbOrders] = useState(false);
  const [reportRevenue, setReportRevenue] = useState<number | null>(null);

  const [chartRange, setChartRange] = useState<ChartRange>("Hari Ini");
  const [hoveredPoint, setHoveredPoint] = useState<{
    label: string;
    count: number;
  } | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const syncOrdersFromStorage = () => {
    try {
      const rawSaved = localStorage.getItem(STORAGE_ORDERS_KEY);
      if (!rawSaved) return;
      const parsed = JSON.parse(rawSaved);
      if (!Array.isArray(parsed) || parsed.length === 0) return;

      const mappedLocalOrders: Order[] = parsed.map((o: any, idx: number) => {
        const cleanId = String(o.id || `ORD-NEW-${idx + 1}`).replace(/^#/, "");
        const totalNum = Number(o.total || 0);
        return {
          id: `#${cleanId}`,
          customer: o.pelanggan || o.customer || "Pelanggan Baru",
          product: `${o.produk || o.product || "Galon"} (${o.jumlah || 1}x)`,
          time: "Baru saja",
          price: formatRupiah(totalNum),
          priceNumber: totalNum,
          status: o.status || "Menunggu Kurir",
          courier: o.kurir || o.courier || "Budi Pratama",
        };
      });

      setOrders((prev) => {
        const existingIds = new Set(prev.map((item) => item.id.toUpperCase()));
        const uniqueNew = mappedLocalOrders.filter(
          (item) => !existingIds.has(item.id.toUpperCase())
        );
        return uniqueNew.length > 0 ? [...uniqueNew, ...prev] : prev;
      });
    } catch {
      // Abaikan jika JSON/localStorage bermasalah
    }
  };

  const fetchDashboardData = async () => {
    const token = localStorage.getItem("token");
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    try {
      const [prodRes, ordRes, repRes] = await Promise.allSettled([
        fetch(`${API_URL}/products`, { headers }),
        fetch(`${API_URL}/orders/manage/all`, { headers }),
        fetch(`${API_URL}/reports/summary`, { headers }),
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
                : `${BASE_HOST}/uploads/${rawImg}`
              : resolveGalonImage(p.name || "", defaultProducts);

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
            const priceNum = Number(
              o.total_price ?? o.totalAmount ?? o.total ?? o.price ?? 0
            );
            const createdDate = o.created_at || o.createdAt;
            const timeStr = createdDate
              ? new Date(createdDate).toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "10:00";

            const rawStatus = String(o.status || "diproses").toLowerCase();
            let displayStatus = "Diproses";
            if (
              rawStatus === "dikirim" ||
              rawStatus === "diantar" ||
              rawStatus === "delivering"
            ) {
              displayStatus = "Diantar";
            } else if (
              rawStatus === "selesai" ||
              rawStatus === "completed" ||
              rawStatus === "done"
            ) {
              displayStatus = "Selesai";
            } else if (rawStatus === "dibatalkan") {
              displayStatus = "Dibatalkan";
            }

            let productName = o.product_name || o.productName || "";
            if (!productName && Array.isArray(o.items) && o.items.length > 0) {
              productName = o.items
                .map(
                  (it: any) =>
                    `${it.product_name || it.name || "Galon"} (${it.quantity || 1} Galon)`
                )
                .join(", ");
            }
            if (!productName) {
              productName = `Pesanan Galon #${o.id}`;
            }

            const rawOrderImg = o.product_image || o.image_url || o.image || "";
            const resolvedImage = rawOrderImg
              ? rawOrderImg.startsWith("http") || rawOrderImg.startsWith("/")
                ? rawOrderImg
                : `${BASE_HOST}/uploads/${rawOrderImg}`
              : resolveGalonImage(productName, latestProductList);

            return {
              id: o.order_code || `#ORD-${o.id}`,
              rawId: o.id,
              customer:
                o.customer_name ||
                o.user_name ||
                o.customerName ||
                `Pelanggan #${o.user_id || o.id}`,
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

      if (repRes.status === "fulfilled" && repRes.value.ok) {
        connected = true;
        const repJson = await repRes.value.json();
        const summaryData = repJson.data || repJson;
        const rev = Number(
          summaryData?.totalRevenue ??
            summaryData?.netRevenue ??
            summaryData?.pendapatanBersih ??
            summaryData?.total_revenue
        );
        if (!Number.isNaN(rev) && rev > 0) {
          setReportRevenue(rev);
        }
      }

      setIsConnected(connected);
      syncOrdersFromStorage();
    } catch {
      setIsConnected(false);
      syncOrdersFromStorage();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    fetchDashboardData();
    syncOrdersFromStorage();

    const onOrderCreatedEvent = (e: Event) => {
      const customEvent = e as CustomEvent<any>;
      const newOrderData = customEvent.detail;
      if (newOrderData) {
        const cleanId = String(newOrderData.id || `ORD-${Date.now()}`).replace(
          /^#/,
          ""
        );
        const priceNum = Number(newOrderData.total || 0);
        setOrders((prev) => [
          {
            id: `#${cleanId}`,
            customer: newOrderData.pelanggan || "Pelanggan Baru",
            product: `${newOrderData.produk || "Galon"} (${
              newOrderData.jumlah || 1
            }x)`,
            time: "Baru saja",
            price: formatRupiah(priceNum),
            priceNumber: priceNum,
            status: newOrderData.status || "Menunggu Kurir",
            courier: newOrderData.kurir || "Budi Pratama",
          },
          ...prev,
        ]);
      } else {
        syncOrdersFromStorage();
      }
    };

    window.addEventListener("galonku:order-created", onOrderCreatedEvent);
    return () => {
      window.removeEventListener("galonku:order-created", onOrderCreatedEvent);
    };
  }, [router]);

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
        // Fallback UI jika endpoint PATCH /products/:id belum tersedia
      }
    }
  };

  // 3 kotak atas saling nyambung: Total Pesanan -> Pendapatan Bersih -> Status Stock Galon
  const summary = useMemo(() => {
    const totalOrders = orders.length;
    const computedRevenueFromOrders = orders.reduce(
      (acc, item) =>
        acc +
        (typeof item.priceNumber === "number"
          ? item.priceNumber
          : Number(String(item.price || "0").replace(/\D/g, "")) || 0),
      0
    );

    const totalRevenue =
      hasDbOrders && reportRevenue !== null
        ? formatRupiah(reportRevenue)
        : formatRupiah(computedRevenueFromOrders);

    const totalStock = products.reduce((acc, item) => acc + item.stock, 0);
    const isLowStock = totalStock < 20;

    return {
      totalOrders,
      totalRevenue,
      totalStock,
      isLowStock,
    };
  }, [orders, products, hasDbOrders, reportRevenue]);

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
              {isConnected ? "API Connected" : "Sinkron: Terputus"}
            </div>
          </div>
        </div>
      </section>

      {/* 2. RINGKASAN STATISTIK (3 KOTAK SALING NYAMBUNG) */}
      <section className="grid gap-4 md:grid-cols-3">
        {/* Kotak 1: Total Pesanan */}
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
              <ArrowUpRight size={12} /> Nyambung dengan {summary.totalOrders} order aktif
            </span>
            <Link
              href="/manajemenpesanan"
              className="font-bold text-[#087D86] hover:underline"
            >
              Detail →
            </Link>
          </div>
        </div>

        {/* Kotak 2: Pendapatan Bersih */}
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
              <CheckCircle2 size={12} /> Terhitung dari {summary.totalOrders} pesanan
            </span>
            <Link
              href="/laporankeu"
              className="font-bold text-[#087D86] hover:underline"
            >
              Laporan →
            </Link>
          </div>
        </div>

        {/* Kotak 3: Status Stock Galon */}
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
              {summary.isLowStock ? (
                <AlertTriangle size={18} />
              ) : (
                <CheckCircle2 size={18} />
              )}
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
              {summary.isLowStock ? "Perlu Restok Segera" : "Stok Galon Aman"}{" "}
              <span className="font-normal text-[#687289]">
                ({summary.isLowStock ? "< 20 unit" : "siap melayani order"})
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

      {/* 3. GRAFIK PESANAN FULL LEBAR */}
      <section className="w-full">
        <div className="w-full rounded-2xl border border-[#EEF0F5] bg-white p-5">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-[#131B2E]">
                  Grafik Pesanan
                </h2>
                <span className="rounded bg-[#EEF0FF] px-2 py-0.5 text-[9px] font-bold text-[#0052FF]">
                  Realtime
                </span>
              </div>
              <p className="mt-0.5 text-[10px] text-[#6C7588]">
                {activeChart.subtitle}
              </p>
            </div>
            <div className="flex w-fit rounded-xl bg-[#F0F1FF] p-1">
              {(["Hari Ini", "Mingguan", "Bulanan"] as ChartRange[]).map(
                (item) => (
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
                )
              )}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-[#F1F1FF] p-3 text-center">
            <div>
              <p className="text-[9px] text-[#687289]">{activeChart.peakLabel}</p>
              <p className="text-xs font-extrabold text-[#131B2E]">
                {activeChart.peakValue}
              </p>
              <p className="text-[9px] text-[#687289]">{activeChart.peakSub}</p>
            </div>
            <div>
              <p className="text-[9px] text-[#687289]">Rata-rata Pengiriman</p>
              <p className="text-xs font-extrabold text-[#087D86]">
                {activeChart.avgDelivery}
              </p>
            </div>
            <div>
              <p className="text-[9px] text-[#687289]">Tingkat Penyelesaian</p>
              <p className="text-xs font-extrabold text-[#16752C]">
                {activeChart.completionRate}
              </p>
            </div>
          </div>

          <div className="relative mt-4 h-[230px] w-full">
            {hoveredPoint && (
              <div className="absolute right-3 top-2 z-10 rounded-lg bg-[#131B2E] px-2.5 py-1 text-[10px] font-bold text-white shadow">
                {hoveredPoint.label}: {hoveredPoint.count} pesanan
              </div>
            )}
            <svg
              viewBox="0 0 800 240"
              preserveAspectRatio="none"
              className="h-full w-full overflow-visible"
            >
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
                    onMouseEnter={() =>
                      setHoveredPoint({ label: pt.label, count: pt.count })
                    }
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
      </section>

      {/* 4. STOK GALON FISIK DI DEPO */}
      <section className="rounded-2xl border border-[#EEF0F5] bg-white p-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
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
            className="flex w-fit items-center gap-1.5 rounded-xl bg-[#0052FF] px-4 py-2 text-xs font-bold text-white hover:bg-[#0047DE]"
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
    </div>
  );
}