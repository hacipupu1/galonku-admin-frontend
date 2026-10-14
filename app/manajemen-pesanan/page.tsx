
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  CalendarDays,
  Bell,
  Download,
  ShoppingCart,
  ClipboardList,
  Truck,
  Wallet,
  Eye,
  MoreVertical,
  CheckCircle2,
  Clock3,
  Package,
  MapPin,
  Phone,
  X,
  UserRound,
  ChevronLeft,
  ChevronRight,
  Filter,
  Printer,
  Check,
  UserPlus,
  Droplets,
  FileSpreadsheet,
} from "lucide-react";
import "./manajemen-pesanan.css";

type OrderStatus =
  | "Menunggu Konfirmasi"
  | "Diproses Depo"
  | "Dalam Pengantaran"
  | "Selesai"
  | "Dibatalkan";

type PaymentStatus = "Lunas" | "Menunggu Verifikasi" | "Belum Bayar";

type Order = {
  id: string;
  time: string;
  customer: string;
  phone: string;
  address: string;
  qty: number;
  item: string;
  note: string;
  price: number;
  payment: string;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  courier: string;
  deliveryType: string;
};

const initialOrders: Order[] = [
  {
    id: "ORD-8824",
    time: "10:15 WIB",
    customer: "Fia Salsa",
    phone: "0812-9844-3211",
    address: "Kost Sakura No. 4, Lt. 2",
    qty: 2,
    item: "Aqua 19L Refill",
    note: "Tukar Galon Kosong",
    price: 36000,
    payment: "QRIS",
    paymentStatus: "Lunas",
    status: "Menunggu Konfirmasi",
    courier: "-",
    deliveryType: "Refill Instan (30m)",
  },
  {
    id: "ORD-8823",
    time: "10:02 WIB",
    customer: "Agus Setiawan",
    phone: "0857-1120-9943",
    address: "Jl. Ciputat Raya No. 18B",
    qty: 3,
    item: "Le Minerale 19L",
    note: "1 Galon Baru + 2 Refill",
    price: 89000,
    payment: "BCA Transfer",
    paymentStatus: "Lunas",
    status: "Diproses Depo",
    courier: "Pak Budi K.",
    deliveryType: "Refill Terjadwal",
  },
  {
    id: "ORD-8822",
    time: "09:48 WIB",
    customer: "Dewi Anggraini",
    phone: "0813-8871-0021",
    address: "Paku Terrace Tower S-1208",
    qty: 1,
    item: "Aqua 19L Refill",
    note: "Tukar Galon Kosong",
    price: 18000,
    payment: "COD (Tunai)",
    paymentStatus: "Belum Bayar",
    status: "Dalam Pengantaran",
    courier: "Rian Irawan",
    deliveryType: "Refill Instan",
  },
  {
    id: "ORD-8821",
    time: "09:20 WIB",
    customer: "Warung Kopi Mas Jon",
    phone: "0878-5544-2201",
    address: "Jl. Teuku Nyak Arief No. 51",
    qty: 5,
    item: "Aqua 19L Refill",
    note: "Langganan Bisnis UMKM",
    price: 90000,
    payment: "QRIS",
    paymentStatus: "Lunas",
    status: "Selesai",
    courier: "Pak Budi K.",
    deliveryType: "Refill Reguler",
  },
  {
    id: "ORD-8820",
    time: "08:50 WIB",
    customer: "Hendro Pratama",
    phone: "0812-7788-3312",
    address: "Komplek Lemigas Blok B4/12",
    qty: 2,
    item: "Cleo 19L Eco Refill",
    note: "Bebas BPA Galon",
    price: 34000,
    payment: "GoPay",
    paymentStatus: "Lunas",
    status: "Selesai",
    courier: "Deni Setiawan",
    deliveryType: "Refill Reguler",
  },
  {
    id: "ORD-8819",
    time: "08:35 WIB",
    customer: "Siti Nurhaliza",
    phone: "0896-1234-9001",
    address: "Jl. Kebayoran Lama No. 44",
    qty: 1,
    item: "Aqua 19L + Pompa Elektrik",
    note: "Beli Unit Pompa Baru",
    price: 68000,
    payment: "Transfer Bank",
    paymentStatus: "Menunggu Verifikasi",
    status: "Diproses Depo",
    courier: "Belum ditugaskan",
    deliveryType: "Refill Terjadwal",
  },
  {
    id: "ORD-8818",
    time: "08:10 WIB",
    customer: "Bambang Tri",
    phone: "0811-9922-3112",
    address: "Jl. Praja Raya No. 10",
    qty: 2,
    item: "Vit 19L Refill",
    note: "Alasan: Salah input alamat",
    price: 30000,
    payment: "Refund",
    paymentStatus: "Lunas",
    status: "Dibatalkan",
    courier: "-",
    deliveryType: "Refill Reguler",
  },
];

const BLUE = "#0755d9";
const BORDER = "#e9eaf4";
const MUTED = "#697185";
const PAGE_BG = "#f8f7ff";

const money = (amount: number) =>
  "Rp " + amount.toLocaleString("id-ID");

const buttonStyle = (
  background = "#ffffff",
  color = "#253047",
  border = BORDER
): React.CSSProperties => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 7,
  minHeight: 38,
  padding: "8px 12px",
  borderRadius: 10,
  border: `1px solid ${border}`,
  background,
  color,
  fontSize: 12,
  fontWeight: 650,
  cursor: "pointer",
  whiteSpace: "nowrap",
});

const statusColors: Record<OrderStatus, { bg: string; color: string }> = {
  "Menunggu Konfirmasi": { bg: "#ffe0df", color: "#b42318" },
  "Diproses Depo": { bg: "#e4e8ff", color: "#3448a5" },
  "Dalam Pengantaran": { bg: "#d8f5ff", color: "#006d8f" },
  Selesai: { bg: "#bbf7c9", color: "#166534" },
  Dibatalkan: { bg: "#f3f4f6", color: "#6b7280" },
};

const paymentColors: Record<PaymentStatus, { bg: string; color: string }> = {
  Lunas: { bg: "#bbf7c9", color: "#166534" },
  "Menunggu Verifikasi": { bg: "#e4e8ff", color: "#3448a5" },
  "Belum Bayar": { bg: "#d8f5ff", color: "#006d8f" },
};

const tabs: { label: string; status?: OrderStatus }[] = [
  { label: "Semua" },
  { label: "Menunggu Konfirmasi", status: "Menunggu Konfirmasi" },
  { label: "Diproses Depo", status: "Diproses Depo" },
  { label: "Dalam Pengantaran", status: "Dalam Pengantaran" },
  { label: "Selesai", status: "Selesai" },
  { label: "Dibatalkan", status: "Dibatalkan" },
];

export default function ManajemenPesananPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [activeTab, setActiveTab] = useState("Semua");
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("Hari ini");
  const [productFilter, setProductFilter] = useState("Semua Galon");
  const [paymentFilter, setPaymentFilter] = useState("Semua Pembayaran");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState("10");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showAssign, setShowAssign] = useState<Order | null>(null);
  const [courier, setCourier] = useState("Pak Budi K.");
  const [notice, setNotice] = useState("");
  const [newCustomer, setNewCustomer] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newProduct, setNewProduct] = useState("Aqua 19L Refill");
  const [newQty, setNewQty] = useState("1");
  const [newPayment, setNewPayment] = useState("QRIS");

  const counts = useMemo(() => {
    const result: Record<string, number> = { Semua: orders.length };
    tabs.forEach((tab) => {
      if (tab.status) {
        result[tab.label] = orders.filter(
          (order) => order.status === tab.status
        ).length;
      }
    });
    return result;
  }, [orders]);

  const filteredOrders = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return orders.filter((order) => {
      const matchesTab =
        activeTab === "Semua" ||
        order.status === activeTab;

      const matchesSearch =
        !keyword ||
        [
          order.id,
          order.customer,
          order.phone,
          order.address,
          order.item,
          order.courier,
        ].some((value) => value.toLowerCase().includes(keyword));

      const matchesProduct =
        productFilter === "Semua Galon" ||
        order.item.toLowerCase().includes(productFilter.toLowerCase());

      const matchesPayment =
        paymentFilter === "Semua Pembayaran" ||
        order.payment === paymentFilter;

      return (
        matchesTab &&
        matchesSearch &&
        matchesProduct &&
        matchesPayment
      );
    });
  }, [orders, activeTab, search, productFilter, paymentFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredOrders.length / Number(pageSize))
  );

  const visibleOrders = filteredOrders.slice(
    (page - 1) * Number(pageSize),
    page * Number(pageSize)
  );

  const omzet = orders
    .filter((order) => order.status !== "Dibatalkan")
    .reduce((total, order) => total + order.price, 0);

  function updateStatus(id: string, status: OrderStatus) {
    setOrders((current) =>
      current.map((order) =>
        order.id === id ? { ...order, status } : order
      )
    );
    setNotice(`${id} berhasil diperbarui menjadi ${status}.`);
    setSelectedOrder(null);
  }

  function exportCSV() {
    const header = [
      "Nomor Pesanan",
      "Waktu",
      "Pelanggan",
      "Telepon",
      "Alamat",
      "Produk",
      "Jumlah",
      "Total",
      "Pembayaran",
      "Status",
      "Kurir",
    ];

    const rows = filteredOrders.map((order) => [
      order.id,
      order.time,
      order.customer,
      order.phone,
      order.address,
      order.item,
      String(order.qty),
      String(order.price),
      order.payment,
      order.status,
      order.courier,
    ]);

    const csv = [header, ...rows]
      .map((row) =>
        row.map((value) => `"${value.replace(/"/g, '""')}"`).join(",")
      )
      .join("\r\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "laporan-pesanan-galonku.csv";
    link.click();
    URL.revokeObjectURL(url);
    setNotice("Data pesanan berhasil diekspor ke CSV.");
  }

  function createOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const qty = Math.max(1, Number(newQty));
    const pricePerUnit = newProduct.includes("Pompa") ? 68000 : 18000;

    const order: Order = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      time: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }) + " WIB",
      customer: newCustomer.trim(),
      phone: newPhone.trim(),
      address: newAddress.trim(),
      qty,
      item: newProduct,
      note: "Pesanan manual",
      price: qty * pricePerUnit,
      payment: newPayment,
      paymentStatus:
        newPayment === "COD (Tunai)" ? "Belum Bayar" : "Lunas",
      status: "Menunggu Konfirmasi",
      courier: "-",
      deliveryType: "Refill Reguler",
    };

    setOrders((current) => [order, ...current]);
    setActiveTab("Semua");
    setSearch("");
    setPage(1);
    setShowCreate(false);
    setNewCustomer("");
    setNewPhone("");
    setNewAddress("");
    setNewQty("1");
    setNotice(`Pesanan ${order.id} berhasil dibuat.`);
  }

  const cardStyle: React.CSSProperties = {
    background: "#ffffff",
    border: `1px solid ${BORDER}`,
    borderRadius: 14,
    boxShadow: "0 2px 8px rgba(30, 41, 59, .025)",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    minWidth: 0,
    minHeight: 40,
    padding: "9px 12px",
    border: `1px solid ${BORDER}`,
    borderRadius: 9,
    background: "#ffffff",
    color: "#20283b",
    fontSize: 12,
    outlineColor: BLUE,
  };

  const tableGrid =
    "100px minmax(175px,1.35fr) minmax(150px,1.15fr) 125px 145px 155px 95px";

  return (
    <main
      style={{
        minHeight: "100vh",
        width: "100%",
        minWidth: 0,
        padding: "24px",
        background: PAGE_BG,
        color: "#20283b",
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: 13,
      }}
    >
      {/* HEADER HALAMAN */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
          marginBottom: 22,
        }}
      >
        <div style={{ minWidth: 220, flex: "1 1 300px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                display: "grid",
                placeItems: "center",
                width: 32,
                height: 32,
                borderRadius: 10,
                background: "#e8edff",
                color: BLUE,
              }}
            >
              <ClipboardList size={19} />
            </span>
            <h1
              style={{
                margin: 0,
                fontSize: 24,
                fontWeight: 800,
                letterSpacing: "-0.6px",
              }}
            >
              Manajemen Pesanan
            </h1>
          </div>
          <p
            style={{
              margin: "7px 0 0",
              color: MUTED,
              fontSize: 13,
              lineHeight: 1.6,
            }}
          >
            Kelola, verifikasi, dan pantau status transaksi pemesanan
            galon pelanggan secara real-time.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 9,
          }}
        >
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "0 12px",
              minHeight: 38,
              borderRadius: 20,
              background: "#f0f1ff",
              color: MUTED,
            }}
          >
            <Search size={15} />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Cari pesanan, resi, kurir..."
              aria-label="Cari pesanan"
              style={{
                width: 185,
                maxWidth: "42vw",
                border: 0,
                outline: 0,
                background: "transparent",
                fontSize: 12,
                color: "#20283b",
              }}
            />
          </label>

          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "9px 12px",
              borderRadius: 20,
              background: "#f0f1ff",
              fontSize: 11,
              fontWeight: 650,
              whiteSpace: "nowrap",
            }}
          >
            <CalendarDays size={15} color="#087e9b" />
            Hari Ini, 24 Mei
          </span>

          <button
            type="button"
            onClick={() => setShowCreate(true)}
            style={buttonStyle(BLUE, "#ffffff", BLUE)}
          >
            <Plus size={17} />
            Buat Pesanan
          </button>

          <button
            type="button"
            title="Notifikasi"
            onClick={() => setNotice("Tidak ada notifikasi baru.")}
            style={{
              ...buttonStyle("#ffffff", BLUE),
              width: 38,
              padding: 0,
              position: "relative",
            }}
          >
            <Bell size={17} />
            <span
              style={{
                position: "absolute",
                top: 5,
                right: 6,
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#ef4444",
              }}
            />
          </button>
        </div>
      </header>

      {/* KARTU STATISTIK */}
      <section
        aria-label="Ringkasan pesanan"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: 12,
          marginBottom: 16,
        }}
        className="gk-order-stats"
      >
        {[
          {
            title: "TOTAL PESANAN HARI INI",
            value: String(orders.length),
            subtitle: "↗ Data pesanan tercatat",
            color: "#15803d",
            icon: ShoppingCart,
            iconBg: "#eef0ff",
            iconColor: BLUE,
          },
          {
            title: "PERLU KONFIRMASI",
            value: String(counts["Menunggu Konfirmasi"] ?? 0),
            subtitle: "◷ Periksa pesanan masuk",
            color: "#dc2626",
            icon: ClipboardList,
            iconBg: "#ffe9e7",
            iconColor: "#dc2626",
          },
          {
            title: "SEDANG DIANTAR",
            value: String(counts["Dalam Pengantaran"] ?? 0),
            subtitle: "♧ Pantau kurir aktif",
            color: "#087e9b",
            icon: Truck,
            iconBg: "#dff7ff",
            iconColor: "#087e9b",
          },
          {
            title: "TOTAL OMZET TERCATAT",
            value: money(omzet),
            subtitle: "✓ Nilai pesanan aktif",
            color: "#15803d",
            icon: Wallet,
            iconBg: "#e8edff",
            iconColor: BLUE,
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <article
              key={stat.title}
              style={{
                ...cardStyle,
                minWidth: 0,
                minHeight: 106,
                padding: "14px 15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div style={{ minWidth: 0 }}>
                <p
                  style={{
                    margin: 0,
                    color: "#50576b",
                    fontSize: 10,
                    fontWeight: 750,
                    lineHeight: 1.5,
                  }}
                >
                  {stat.title}
                </p>
                <div
                  style={{
                    marginTop: 5,
                    fontSize: stat.title.includes("OMZET") ? 21 : 25,
                    fontWeight: 800,
                    color: stat.title.includes("OMZET") ? BLUE : "#20283b",
                    overflowWrap: "anywhere",
                  }}
                >
                  {stat.value}
                </div>
                <p
                  style={{
                    margin: "5px 0 0",
                    color: stat.color,
                    fontSize: 10,
                  }}
                >
                  {stat.subtitle}
                </p>
              </div>
              <span
                style={{
                  flex: "0 0 38px",
                  display: "grid",
                  placeItems: "center",
                  width: 38,
                  height: 38,
                  borderRadius: 12,
                  background: stat.iconBg,
                  color: stat.iconColor,
                }}
              >
                <Icon size={20} />
              </span>
            </article>
          );
        })}
      </section>

      {/* TAB STATUS */}
      <section
        style={{
          ...cardStyle,
          display: "flex",
          gap: 5,
          alignItems: "center",
          padding: 7,
          marginBottom: 11,
          overflowX: "auto",
        }}
        aria-label="Filter status pesanan"
      >
        {tabs.map((tab) => {
          const active = activeTab === tab.label;
          return (
            <button
              type="button"
              key={tab.label}
              onClick={() => {
                setActiveTab(tab.label);
                setPage(1);
              }}
              aria-pressed={active}
              style={{
                ...buttonStyle(
                  active ? BLUE : "#ffffff",
                  active ? "#ffffff" : "#20283b",
                  active ? BLUE : "#ffffff"
                ),
                minHeight: 36,
                padding: "7px 11px",
                borderRadius: 9,
                flex: "0 0 auto",
              }}
            >
              {tab.label}
              <span
                style={{
                  display: "inline-grid",
                  placeItems: "center",
                  minWidth: 21,
                  height: 19,
                  padding: "0 5px",
                  borderRadius: 12,
                  background: active ? "rgba(255,255,255,.2)" : "#e9eafa",
                  color: active ? "#ffffff" : "#515a73",
                  fontSize: 10,
                  fontWeight: 750,
                }}
              >
                {counts[tab.label] ?? 0}
              </span>
            </button>
          );
        })}
      </section>

      {/* FILTER DAN AKSI */}
      <section
        style={{
          ...cardStyle,
          padding: 10,
          marginBottom: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              flex: "1 1 240px",
              minWidth: 170,
              minHeight: 40,
              padding: "0 12px",
              border: `1px solid ${BORDER}`,
              borderRadius: 10,
              background: "#f5f5ff",
              color: MUTED,
            }}
          >
            <Search size={17} />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Cari berdasarkan No. Order, nama pelanggan..."
              aria-label="Cari nomor order atau nama pelanggan"
              style={{
                minWidth: 0,
                width: "100%",
                border: 0,
                outline: 0,
                background: "transparent",
                fontSize: 12,
              }}
            />
          </label>

          <select
            value={dateFilter}
            onChange={(event) => setDateFilter(event.target.value)}
            aria-label="Filter tanggal"
            style={{ ...inputStyle, width: "auto", background: "#f5f5ff" }}
          >
            <option>Hari ini</option>
            <option>7 hari terakhir</option>
            <option>30 hari terakhir</option>
            <option>Semua tanggal</option>
          </select>

          <select
            value={productFilter}
            onChange={(event) => {
              setProductFilter(event.target.value);
              setPage(1);
            }}
            aria-label="Filter produk"
            style={{ ...inputStyle, width: "auto", background: "#f5f5ff" }}
          >
            <option>Semua Galon</option>
            <option>Aqua</option>
            <option>Le Minerale</option>
            <option>Cleo</option>
            <option>Vit</option>
          </select>

          <select
            value={paymentFilter}
            onChange={(event) => {
              setPaymentFilter(event.target.value);
              setPage(1);
            }}
            aria-label="Filter pembayaran"
            style={{ ...inputStyle, width: "auto", background: "#f5f5ff" }}
          >
            <option>Semua Pembayaran</option>
            <option>QRIS</option>
            <option>BCA Transfer</option>
            <option>COD (Tunai)</option>
            <option>GoPay</option>
            <option>Transfer Bank</option>
            <option>Refund</option>
          </select>

          <button
            type="button"
            title="Reset filter"
            onClick={() => {
              setSearch("");
              setActiveTab("Semua");
              setDateFilter("Hari ini");
              setProductFilter("Semua Galon");
              setPaymentFilter("Semua Pembayaran");
              setPage(1);
            }}
            style={{
              ...buttonStyle("#f0f1ff", "#515a73", "#f0f1ff"),
              width: 40,
              padding: 0,
            }}
          >
            <Filter size={17} />
          </button>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 8,
            marginTop: 10,
            paddingTop: 10,
            borderTop: `1px solid ${BORDER}`,
          }}
        >
          <span style={{ color: MUTED, fontSize: 11, alignSelf: "center" }}>
            {filteredOrders.length} pesanan ditemukan
          </span>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={exportCSV}
              style={buttonStyle("#f0f1ff", "#344054", "#e6e8f5")}
            >
              <Download size={15} />
              Ekspor (CSV/Excel)
            </button>
            <button
              type="button"
              onClick={() => setShowCreate(true)}
              style={buttonStyle(BLUE, "#ffffff", BLUE)}
            >
              <Plus size={16} />
              Buat Pesanan Manual
            </button>
          </div>
        </div>
      </section>

      {/* TABEL PESANAN */}
      <section style={{ ...cardStyle, overflow: "hidden" }}>
        <div style={{ overflowX: "auto", width: "100%" }}>
          <div style={{ minWidth: 1050 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: tableGrid,
                alignItems: "center",
                gap: 10,
                padding: "14px 15px",
                minHeight: 53,
                background: "#f0f2ff",
                color: "#50576b",
                fontSize: 10,
                fontWeight: 800,
                textTransform: "uppercase",
              }}
            >
              <span>No. Order & Waktu</span>
              <span>Pelanggan & Lokasi</span>
              <span>Item Pesanan</span>
              <span>Tagihan & Bayar</span>
              <span>Status</span>
              <span>Kurir Pengantar</span>
              <span style={{ textAlign: "center" }}>Aksi</span>
            </div>

            {visibleOrders.length === 0 ? (
              <div
                style={{
                  padding: 45,
                  textAlign: "center",
                  color: MUTED,
                }}
              >
                <Package size={30} style={{ marginBottom: 8 }} />
                <p style={{ margin: 0, fontWeight: 700 }}>
                  Pesanan tidak ditemukan
                </p>
                <p style={{ fontSize: 12 }}>
                  Coba ubah kata kunci atau filter yang digunakan.
                </p>
              </div>
            ) : (
              visibleOrders.map((order) => {
                const statusColor = statusColors[order.status];
                const paymentColor = paymentColors[order.paymentStatus];

                return (
                  <div
                    key={order.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: tableGrid,
                      alignItems: "center",
                      gap: 10,
                      padding: "13px 15px",
                      minHeight: 92,
                      borderTop: `1px solid ${BORDER}`,
                      fontSize: 11,
                    }}
                  >
                    <div>
                      <strong style={{ color: "#064fc5", fontSize: 12 }}>
                        #{order.id}
                      </strong>
                      <div style={{ marginTop: 5, color: MUTED }}>
                        Hari ini,
                      </div>
                      <div style={{ color: MUTED }}>{order.time}</div>
                      <span
                        style={{
                          display: "inline-block",
                          marginTop: 5,
                          color:
                            order.status === "Dibatalkan"
                              ? "#dc2626"
                              : order.status === "Selesai"
                                ? "#15803d"
                                : "#525fc0",
                          fontSize: 10,
                          fontWeight: 700,
                        }}
                      >
                        {order.deliveryType}
                      </span>
                    </div>

                    <div>
                      <strong style={{ fontSize: 12 }}>
                        {order.customer}
                      </strong>
                      <div
                        style={{
                          marginTop: 4,
                          color: MUTED,
                          fontSize: 10,
                        }}
                      >
                        <Phone
                          size={10}
                          style={{
                            display: "inline",
                            verticalAlign: "middle",
                            marginRight: 4,
                          }}
                        />
                        {order.phone}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 3,
                          marginTop: 5,
                          color: MUTED,
                          lineHeight: 1.4,
                        }}
                      >
                        <MapPin size={12} style={{ flexShrink: 0 }} />
                        {order.address}
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: 8, minWidth: 0 }}>
                      <span
                        style={{
                          flex: "0 0 32px",
                          width: 32,
                          height: 34,
                          display: "grid",
                          placeItems: "center",
                          borderRadius: 9,
                          background: "#edf0ff",
                          color: BLUE,
                        }}
                      >
                        <Droplets size={18} />
                      </span>
                      <div style={{ minWidth: 0 }}>
                        <strong style={{ fontSize: 11 }}>
                          {order.qty}x {order.item}
                        </strong>
                        <p
                          style={{
                            margin: "4px 0 0",
                            color: MUTED,
                            lineHeight: 1.4,
                          }}
                        >
                          {order.note}
                        </p>
                      </div>
                    </div>

                    <div>
                      <strong style={{ fontSize: 13 }}>
                        {money(order.price)}
                      </strong>
                      <div
                        style={{
                          marginTop: 5,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          padding: "4px 6px",
                          borderRadius: 6,
                          background: paymentColor.bg,
                          color: paymentColor.color,
                          fontSize: 9,
                          fontWeight: 750,
                        }}
                      >
                        {order.paymentStatus === "Lunas" ? (
                          <Check size={11} />
                        ) : (
                          <Clock3 size={11} />
                        )}
                        {order.payment}
                        {order.paymentStatus === "Lunas" ? " • Lunas" : ""}
                      </div>
                      {order.paymentStatus !== "Lunas" && (
                        <div
                          style={{
                            marginTop: 4,
                            color: paymentColor.color,
                            fontSize: 9,
                          }}
                        >
                          {order.paymentStatus}
                        </div>
                      )}
                    </div>

                    <div>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                          padding: "7px 9px",
                          borderRadius: 20,
                          background: statusColor.bg,
                          color: statusColor.color,
                          fontSize: 10,
                          lineHeight: 1.25,
                          fontWeight: 750,
                        }}
                      >
                        <span
                          style={{
                            width: 5,
                            height: 5,
                            borderRadius: "50%",
                            background: statusColor.color,
                          }}
                        />
                        {order.status}
                      </span>
                    </div>

                    <div>
                      {order.courier === "-" ||
                      order.courier === "Belum ditugaskan" ? (
                        <button
                          type="button"
                          onClick={() => {
                            setShowAssign(order);
                            setCourier("Pak Budi K.");
                          }}
                          style={{
                            ...buttonStyle("#e0e7ff", "#183a83", "#e0e7ff"),
                            minHeight: 33,
                            padding: "6px 8px",
                            fontSize: 10,
                          }}
                        >
                          <UserPlus size={13} />
                          Tugaskan Kurir
                        </button>
                      ) : (
                        <div>
                          <strong style={{ fontSize: 11 }}>
                            {order.courier}
                          </strong>
                          <p
                            style={{
                              margin: "4px 0 0",
                              color: MUTED,
                              fontSize: 10,
                            }}
                          >
                            {order.status === "Dalam Pengantaran"
                              ? "Dalam perjalanan"
                              : order.status === "Selesai"
                                ? "Pesanan diterima"
                                : "Siap angkut"}
                          </p>
                          {order.status === "Diproses Depo" && (
                            <button
                              type="button"
                              onClick={() =>
                                updateStatus(order.id, "Dalam Pengantaran")
                              }
                              style={{
                                ...buttonStyle("#e0f7ff", "#006d8f", "#e0f7ff"),
                                minHeight: 28,
                                padding: "4px 7px",
                                marginTop: 5,
                                fontSize: 10,
                              }}
                            >
                              Mulai antar
                            </button>
                          )}
                          {order.status === "Dalam Pengantaran" && (
                            <button
                              type="button"
                              onClick={() => updateStatus(order.id, "Selesai")}
                              style={{
                                ...buttonStyle("#dcfce7", "#166534", "#dcfce7"),
                                minHeight: 28,
                                padding: "4px 7px",
                                marginTop: 5,
                                fontSize: 10,
                              }}
                            >
                              Tandai selesai
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      {order.status === "Menunggu Konfirmasi" && (
                        <button
                          type="button"
                          title="Konfirmasi pesanan"
                          onClick={() =>
                            updateStatus(order.id, "Diproses Depo")
                          }
                          style={{
                            ...buttonStyle("#ffffff", BLUE, "#ffffff"),
                            width: 28,
                            minHeight: 30,
                            padding: 0,
                          }}
                        >
                          <CheckCircle2 size={16} />
                        </button>
                      )}
                      <button
                        type="button"
                        title="Lihat detail pesanan"
                        onClick={() => setSelectedOrder(order)}
                        style={{
                          ...buttonStyle("#ffffff", "#515a73", "#ffffff"),
                          width: 28,
                          minHeight: 30,
                          padding: 0,
                        }}
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        type="button"
                        title="Pilihan tindakan"
                        onClick={() => setSelectedOrder(order)}
                        style={{
                          ...buttonStyle("#ffffff", "#515a73", "#ffffff"),
                          width: 25,
                          minHeight: 30,
                          padding: 0,
                        }}
                      >
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* PAGINATION */}
        <footer
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 10,
            padding: "13px 15px",
            borderTop: `1px solid ${BORDER}`,
            background: "#fafaff",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 8,
              color: MUTED,
              fontSize: 11,
            }}
          >
            Menampilkan{" "}
            {filteredOrders.length === 0
              ? 0
              : (page - 1) * Number(pageSize) + 1}
            –
            {Math.min(page * Number(pageSize), filteredOrders.length)} dari{" "}
            {filteredOrders.length} pesanan
            <span>•</span>
            Baris per halaman
            <select
              value={pageSize}
              onChange={(event) => {
                setPageSize(event.target.value);
                setPage(1);
              }}
              aria-label="Jumlah baris per halaman"
              style={{
                ...inputStyle,
                width: 65,
                minHeight: 30,
                padding: "4px 7px",
                background: "#ffffff",
              }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <button
              type="button"
              aria-label="Halaman sebelumnya"
              disabled={page <= 1}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              style={{
                ...buttonStyle("#ffffff", MUTED),
                minHeight: 32,
                width: 32,
                padding: 0,
                opacity: page <= 1 ? 0.4 : 1,
              }}
            >
              <ChevronLeft size={16} />
            </button>
            <span
              style={{
                display: "grid",
                placeItems: "center",
                width: 32,
                height: 32,
                borderRadius: 9,
                background: BLUE,
                color: "#ffffff",
                fontSize: 12,
                fontWeight: 750,
              }}
            >
              {page}
            </span>
            <button
              type="button"
              aria-label="Halaman berikutnya"
              disabled={page >= totalPages}
              onClick={() =>
                setPage((current) => Math.min(totalPages, current + 1))
              }
              style={{
                ...buttonStyle("#ffffff", MUTED),
                minHeight: 32,
                width: 32,
                padding: 0,
                opacity: page >= totalPages ? 0.4 : 1,
              }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </footer>
      </section>

      {/* NOTIFIKASI AKSI */}
      {notice && (
        <div
          role="status"
          style={{
            position: "fixed",
            right: 22,
            bottom: 22,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            gap: 9,
            maxWidth: "calc(100vw - 32px)",
            padding: "13px 16px",
            borderRadius: 12,
            background: "#17233b",
            color: "#ffffff",
            boxShadow: "0 8px 28px rgba(15,23,42,.2)",
            fontSize: 12,
          }}
        >
          <CheckCircle2 size={18} color="#86efac" />
          <span>{notice}</span>
          <button
            type="button"
            aria-label="Tutup notifikasi"
            onClick={() => setNotice("")}
            style={{
              border: 0,
              background: "transparent",
              color: "#ffffff",
              cursor: "pointer",
            }}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* MODAL BUAT PESANAN */}
      {showCreate && (
        <div
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setShowCreate(false);
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            display: "grid",
            placeItems: "center",
            padding: 16,
            background: "rgba(15,23,42,.45)",
            backdropFilter: "blur(3px)",
          }}
        >
          <form
            onSubmit={createOrder}
            style={{
              width: "min(100%, 520px)",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: 24,
              borderRadius: 18,
              background: "#ffffff",
              boxShadow: "0 20px 60px rgba(15,23,42,.22)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <div>
                <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>
                  Buat Pesanan Manual
                </h2>
                <p style={{ margin: "6px 0 0", color: MUTED, fontSize: 12 }}>
                  Masukkan informasi pelanggan dan pesanan.
                </p>
              </div>
              <button
                type="button"
                aria-label="Tutup formulir"
                onClick={() => setShowCreate(false)}
                style={{
                  ...buttonStyle("#f3f4f6", "#344054", "#f3f4f6"),
                  width: 36,
                  padding: 0,
                }}
              >
                <X size={17} />
              </button>
            </div>

            <div style={{ display: "grid", gap: 14 }}>
              <label style={{ display: "grid", gap: 6, fontSize: 12 }}>
                Nama pelanggan
                <input
                  required
                  value={newCustomer}
                  onChange={(event) => setNewCustomer(event.target.value)}
                  placeholder="Contoh: Aulia Rahma"
                  style={inputStyle}
                />
              </label>

              <label style={{ display: "grid", gap: 6, fontSize: 12 }}>
                Nomor telepon
                <input
                  required
                  value={newPhone}
                  onChange={(event) => setNewPhone(event.target.value)}
                  placeholder="08xxxxxxxxxx"
                  inputMode="tel"
                  style={inputStyle}
                />
              </label>

              <label style={{ display: "grid", gap: 6, fontSize: 12 }}>
                Alamat pengantaran
                <textarea
                  required
                  value={newAddress}
                  onChange={(event) => setNewAddress(event.target.value)}
                  placeholder="Nama jalan, nomor rumah, dan patokan"
                  rows={3}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </label>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr) 100px",
                  gap: 12,
                }}
              >
                <label style={{ display: "grid", gap: 6, fontSize: 12 }}>
                  Produk
                  <select
                    value={newProduct}
                    onChange={(event) => setNewProduct(event.target.value)}
                    style={inputStyle}
                  >
                    <option>Aqua 19L Refill</option>
                    <option>Le Minerale 19L</option>
                    <option>Cleo 19L Eco Refill</option>
                    <option>Vit 19L Refill</option>
                    <option>Aqua 19L + Pompa Elektrik</option>
                  </select>
                </label>

                <label style={{ display: "grid", gap: 6, fontSize: 12 }}>
                  Jumlah
                  <input
                    required
                    min="1"
                    max="99"
                    type="number"
                    value={newQty}
                    onChange={(event) => setNewQty(event.target.value)}
                    style={inputStyle}
                  />
                </label>
              </div>

              <label style={{ display: "grid", gap: 6, fontSize: 12 }}>
                Metode pembayaran
                <select
                  value={newPayment}
                  onChange={(event) => setNewPayment(event.target.value)}
                  style={inputStyle}
                >
                  <option>QRIS</option>
                  <option>BCA Transfer</option>
                  <option>COD (Tunai)</option>
                  <option>GoPay</option>
                </select>
              </label>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                flexWrap: "wrap",
                gap: 9,
                marginTop: 22,
                paddingTop: 16,
                borderTop: `1px solid ${BORDER}`,
              }}
            >
              <button
                type="button"
                onClick={() => setShowCreate(false)}
                style={buttonStyle("#ffffff", "#344054")}
              >
                Batal
              </button>
              <button
                type="submit"
                style={buttonStyle(BLUE, "#ffffff", BLUE)}
              >
                <Plus size={16} />
                Simpan Pesanan
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL TUGASKAN KURIR */}
      {showAssign && (
        <div
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setShowAssign(null);
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            display: "grid",
            placeItems: "center",
            padding: 16,
            background: "rgba(15,23,42,.45)",
          }}
        >
          <div
            style={{
              width: "min(100%, 420px)",
              padding: 24,
              borderRadius: 18,
              background: "#ffffff",
              boxShadow: "0 20px 60px rgba(15,23,42,.22)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 18,
              }}
            >
                <h2 style={{ margin: 0, fontSize: 19, fontWeight: 800 }}>
                  Tugaskan Kurir
                </h2>
                <button
                  type="button"
                  onClick={() => setShowAssign(null)}
                  aria-label="Tutup"
                  style={{
                    ...buttonStyle("#f3f4f6", "#344054", "#f3f4f6"),
                    width: 35,
                    padding: 0,
                  }}
                >
                  <X size={17} />
                </button>
            </div>

            <p style={{ color: MUTED, fontSize: 12 }}>
              Pesanan <strong>#{showAssign.id}</strong> untuk{" "}
              <strong>{showAssign.customer}</strong>
            </p>

            <label style={{ display: "grid", gap: 7, fontSize: 12 }}>
              Pilih kurir pengantar
              <select
                value={courier}
                onChange={(event) => setCourier(event.target.value)}
                style={inputStyle}
              >
                <option>Pak Budi K.</option>
                <option>Rian Irawan</option>
                <option>Deni Setiawan</option>
              </select>
            </label>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 8,
                marginTop: 20,
              }}
            >
              <button
                type="button"
                onClick={() => setShowAssign(null)}
                style={buttonStyle("#ffffff", "#344054")}
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  setOrders((current) =>
                    current.map((order) =>
                      order.id === showAssign.id
                        ? {
                            ...order,
                            courier,
                            status: "Diproses Depo",
                          }
                        : order
                    )
                  );
                  setNotice(
                    `Kurir ${courier} ditugaskan ke pesanan ${showAssign.id}.`
                  );
                  setShowAssign(null);
                }}
                style={buttonStyle(BLUE, "#ffffff", BLUE)}
              >
                <UserPlus size={15} />
                Simpan Penugasan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DETAIL PESANAN */}
      {selectedOrder && (
        <div
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedOrder(null);
            }
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            display: "grid",
            placeItems: "center",
            padding: 16,
            background: "rgba(15,23,42,.45)",
          }}
        >
          <div
            style={{
              width: "min(100%, 500px)",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: 24,
              borderRadius: 18,
              background: "#ffffff",
              boxShadow: "0 20px 60px rgba(15,23,42,.22)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div>
                <p
                  style={{
                    margin: 0,
                    color: MUTED,
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  DETAIL PESANAN
                </p>
                <h2 style={{ margin: "5px 0 0", fontSize: 21 }}>
                  #{selectedOrder.id}
                </h2>
              </div>
              <button
                type="button"
                aria-label="Tutup detail"
                onClick={() => setSelectedOrder(null)}
                style={{
                  ...buttonStyle("#f3f4f6", "#344054", "#f3f4f6"),
                  width: 36,
                  padding: 0,
                }}
              >
                <X size={17} />
              </button>
            </div>

            <div
              style={{
                marginTop: 20,
                padding: 15,
                borderRadius: 12,
                background: "#f5f5ff",
              }}
            >
              <p style={{ margin: "0 0 6px", color: MUTED, fontSize: 11 }}>
                Status pesanan
              </p>
              <span
                style={{
                  display: "inline-block",
                  padding: "6px 10px",
                  borderRadius: 20,
                  background: statusColors[selectedOrder.status].bg,
                  color: statusColors[selectedOrder.status].color,
                  fontSize: 11,
                  fontWeight: 750,
                }}
              >
                {selectedOrder.status}
              </span>
            </div>

            <div style={{ display: "grid", gap: 13, marginTop: 18 }}>
              {[
                ["Pelanggan", selectedOrder.customer],
                ["Nomor telepon", selectedOrder.phone],
                ["Alamat", selectedOrder.address],
                ["Produk", `${selectedOrder.qty}x ${selectedOrder.item}`],
                ["Catatan", selectedOrder.note],
                ["Pembayaran", selectedOrder.payment],
                ["Kurir", selectedOrder.courier],
                ["Waktu", selectedOrder.time],
              ].map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "125px minmax(0, 1fr)",
                    gap: 10,
                    fontSize: 12,
                  }}
                >
                  <span style={{ color: MUTED }}>{label}</span>
                  <strong style={{ overflowWrap: "anywhere" }}>
                    {value}
                  </strong>
                </div>
              ))}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: 15,
                  borderTop: `1px solid ${BORDER}`,
                }}
              >
                <strong>Total tagihan</strong>
                <strong style={{ color: BLUE, fontSize: 19 }}>
                  {money(selectedOrder.price)}
                </strong>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                flexWrap: "wrap",
                gap: 8,
                marginTop: 22,
              }}
            >
              {selectedOrder.status === "Menunggu Konfirmasi" && (
                <button
                  type="button"
                  onClick={() =>
                    updateStatus(selectedOrder.id, "Diproses Depo")
                  }
                  style={buttonStyle(BLUE, "#ffffff", BLUE)}
                >
                  <CheckCircle2 size={15} />
                  Konfirmasi Pesanan
                </button>
              )}

              {selectedOrder.status !== "Selesai" &&
                selectedOrder.status !== "Dibatalkan" && (
                  <button
                    type="button"
                    onClick={() =>
                      updateStatus(selectedOrder.id, "Dibatalkan")
                    }
                    style={buttonStyle("#fff1f0", "#b42318", "#ffd8d5")}
                  >
                    Batalkan Pesanan
                  </button>
                )}

              <button
                type="button"
                onClick={() => {
                  const printable = [
                    "GALONKU ADMIN",
                    `Pesanan: ${selectedOrder.id}`,
                    `Pelanggan: ${selectedOrder.customer}`,
                    `Telepon: ${selectedOrder.phone}`,
                    `Alamat: ${selectedOrder.address}`,
                    `Produk: ${selectedOrder.qty}x ${selectedOrder.item}`,
                    `Total: ${money(selectedOrder.price)}`,
                    `Status: ${selectedOrder.status}`,
                  ].join("\n");
                  const printWindow = window.open("", "_blank", "width=600,height=700");
                  if (printWindow) {
                    printWindow.document.write(
                      `<html><head><title>Detail Pesanan</title></head><body><pre style="font:14px Arial;white-space:pre-wrap">${printable.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre><script>window.onload=()=>window.print()<\/script></body></html>`
                    );
                    printWindow.document.close();
                  } else {
                    setNotice("Izinkan pop-up browser untuk mencetak pesanan.");
                  }
                }}
                style={buttonStyle("#ffffff", "#344054")}
              >
                <Printer size={15} />
                Cetak
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
