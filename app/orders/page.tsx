"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  ClipboardList,
  Package,
  Truck,
  BarChart3,
  Search,
  CalendarDays,
  ChevronDown,
  Plus,
  Download,
  ShoppingCart,
  ClipboardCheck,
  Clock3,
  WalletCards,
  Eye,
  MoreVertical,
  CheckCircle2,
  CircleX,
  Send,
  UserRound,
  LogOut,
  SlidersHorizontal,
  Bell,
  MapPin,
  Phone,
} from "lucide-react";

type Order = {
  id: string;
  date: string;
  customer: string;
  phone: string;
  address: string;
  items: string[];
  qty: string;
  total: string;
  status: string;
  courier: string;
  courierStatus: string;
};

const orders: Order[] = [
  {
    id: "#ORD-8824",
    date: "Hari ini, 10:15 WIB",
    customer: "Fia Sari",
    phone: "0812-6544-321",
    address: "Jl. Kota Sudiro No. 4 RT. 2",
    items: ["2x Aqua 19L Refill", "1x Galon Kosong"],
    qty: "2x",
    total: "Rp 36.000",
    status: "Menunggu Konfirmasi",
    courier: "Tugaskan Kurir",
    courierStatus: "",
  },
  {
    id: "#ORD-8823",
    date: "Hari ini, 10:02 WIB",
    customer: "Agus Setiawan",
    phone: "0857-1120-9943",
    address: "Jl. Ciptaluda Raya No. 18",
    items: ["3x Le Minerale 19L", "1x Galon Baru"],
    qty: "3x",
    total: "Rp 89.000",
    status: "Diproses Depo",
    courier: "Pak Budi K.",
    courierStatus: "Mokai Otak 5",
  },
  {
    id: "#ORD-8822",
    date: "Hari ini, 09:48 WIB",
    customer: "Dewi Anggraini",
    phone: "0813-8871-0021",
    address: "Jl. Paklore Taro RT. 12",
    items: ["1x Aqua 19L Refill", "1x Galon Kosong"],
    qty: "1x",
    total: "Rp 18.000",
    status: "Dalam Pengantaran",
    courier: "Rian Irwan",
    courierStatus: "ETA: 18 Menit lagi",
  },
  {
    id: "#ORD-8821",
    date: "Hari ini, 09:20 WIB",
    customer: "Warung Kopi Mas Jon",
    phone: "0878-5544-2201",
    address: "Jl. Teuku Nyak Arief No. 51",
    items: ["5x Aqua 19L Refill", "Langganan Bisnis UMKM"],
    qty: "5x",
    total: "Rp 90.000",
    status: "Selesai",
    courier: "Pak Budi K.",
    courierStatus: "Diterima 09:42 WIB",
  },
  {
    id: "#ORD-8820",
    date: "Hari ini, 08:50 WIB",
    customer: "Hendra Pratama",
    phone: "0812-7788-3312",
    address: "Jl. Komplek Jaya Bangka Blok 42",
    items: ["2x Cleo 19L Refill", "Bebas BPA Galon"],
    qty: "2x",
    total: "Rp 34.000",
    status: "Selesai",
    courier: "Deni Setiawan",
    courierStatus: "Diterima 09:18 WIB",
  },
  {
    id: "#ORD-8819",
    date: "Hari ini, 08:35 WIB",
    customer: "Siti Nurhaliza",
    phone: "0896-234-9001",
    address: "Jl. Kebayoran Lama No. 44",
    items: ["1x Aqua 19L Refill", "Paket Langganan"],
    qty: "1x",
    total: "Rp 68.000",
    status: "Diproses Depo",
    courier: "Jadwalkan",
    courierStatus: "",
  },
  {
    id: "#ORD-8818",
    date: "Hari ini, 08:10 WIB",
    customer: "Bambang Tri",
    phone: "0811-9222-7710",
    address: "Jl. Prapanca Raya No. 19",
    items: ["2x Vit 19L Refill", "Refill Air"],
    qty: "2x",
    total: "Rp 30.000",
    status: "Dibatalkan",
    courier: "",
    courierStatus: "Refund Dana Selesai",
  },
];

const statusTabs = [
  { name: "Semua", count: "48" },
  { name: "Menunggu Konfirmasi", count: "4" },
  { name: "Diproses Depo", count: "5" },
  { name: "Dalam Pengantaran", count: "6" },
  { name: "Selesai", count: "31" },
  { name: "Dibatalkan", count: "2" },
];

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "Menunggu Konfirmasi":
      "bg-red-50 text-red-500 border border-red-100",
    "Diproses Depo":
      "bg-indigo-50 text-indigo-600 border border-indigo-100",
    "Dalam Pengantaran":
      "bg-cyan-50 text-cyan-600 border border-cyan-100",
    Selesai:
      "bg-green-50 text-[#28A745] border border-green-100",
    Dibatalkan:
      "bg-red-50 text-red-500 border border-red-100",
  };

  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-[8px] font-semibold ${styles[status]}`}
    >
      {status === "Selesai" && (
        <CheckCircle2 size={10} className="mr-1" />
      )}

      {status === "Dibatalkan" && (
        <CircleX size={10} className="mr-1" />
      )}

      {status === "Dalam Pengantaran" && (
        <Truck size={10} className="mr-1" />
      )}

      {status}
    </span>
  );
}

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("Semua");
  const [search, setSearch] = useState("");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase());

    const matchesTab =
      activeTab === "Semua" || order.status === activeTab;

    return matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen bg-[#F7F8FC] text-[#131B2E]">
      <div className="flex min-h-screen">

        {/* =====================================================
            SIDEBAR
        ====================================================== */}

        <aside className="fixed left-0 top-0 z-30 flex h-screen w-[143px] flex-col border-r border-[#E9ECF3] bg-white">

          {/* Logo */}
          <div className="px-4 pb-5 pt-5">
            <div className="text-[11px] font-bold tracking-tight text-[#0052FF]">
              GalonKu Admin
            </div>

            <div className="mt-0.5 text-[7px] text-slate-500">
              Portal Manajemen & Operasional
            </div>
          </div>

          {/* Menu title */}
          <div className="px-4 pb-2 text-[7px] font-semibold uppercase tracking-wide text-slate-400">
            Menu Utama
          </div>

          {/* Navigation */}
          <nav className="space-y-1 px-2">

            <SidebarItem
              icon={<LayoutDashboard size={12} />}
              label="Dashboard"
            />

            <SidebarItem
              active
              icon={<ClipboardList size={12} />}
              label="Manajemen Pesanan"
            />

            <SidebarItem
              icon={<Package size={12} />}
              label="Produk & Stok"
            />

            <SidebarItem
              icon={<Truck size={12} />}
              label="Monitoring Pengantaran"
            />

            <SidebarItem
              icon={<BarChart3 size={12} />}
              label="Laporan Keuangan"
            />

          </nav>

          {/* Admin */}
          <div className="mt-auto border-t border-[#EEF0F5] p-3">

            <div className="flex items-center gap-2">

              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E8F1FF]">
                <UserRound
                  size={12}
                  className="text-[#0052FF]"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[8px] font-semibold">
                  Budi Santoso
                </p>

                <p className="text-[7px] text-slate-400">
                  Super Admin
                </p>
              </div>

              <LogOut
                size={11}
                className="text-slate-400"
              />

            </div>

          </div>
        </aside>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}

        <main className="ml-[143px] min-h-screen flex-1">

          {/* =================================================
              TOP BAR
          ================================================== */}

          <header className="flex h-[43px] items-center justify-between border-b border-[#E9ECF3] bg-white px-5">

            {/* Search */}
            <div className="relative w-[180px]">

              <Search
                size={10}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Cari pesanan, nasi, kurir..."
                className="h-7 w-full rounded-full bg-[#F5F7FB] pl-7 pr-3 text-[8px] outline-none placeholder:text-slate-400 focus:ring-1 focus:ring-[#E8F1FF]"
              />

            </div>

            {/* Right */}
            <div className="flex items-center gap-2">

              <button className="flex h-7 items-center gap-1 rounded-md border border-[#E8EBF2] bg-white px-2 text-[8px] text-[#131B2E]">
                <CalendarDays size={10} />
                Hari Ini, 24 Mei
                <ChevronDown size={9} />
              </button>

              <button className="relative flex h-7 w-7 items-center justify-center rounded-full border border-[#E8EBF2] bg-white">
                <Bell size={11} />
                <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-[#0052FF]" />
              </button>

              <button className="flex h-7 items-center gap-1 rounded-md bg-[#0052FF] px-2.5 text-[8px] font-semibold text-white shadow-sm transition hover:bg-blue-700">
                <Plus size={11} />
                Buat Pesanan
              </button>

            </div>

          </header>

          {/* =================================================
              CONTENT
          ================================================== */}

          <div className="p-3">

            {/* Page heading */}
            <div className="mb-3 flex items-center justify-between">

              <div className="flex items-start gap-2">

                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#E8F1FF] text-[#0052FF]">
                  <ClipboardList size={15} />
                </div>

                <div>
                  <h1 className="text-[16px] font-bold leading-tight">
                    Manajemen Pesanan
                  </h1>

                  <p className="mt-0.5 text-[8px] text-slate-500">
                    Kelola, verifikasi, dan pantau status transaksi pesanan
                    pelanggan secara real-time.
                  </p>
                </div>

              </div>

              <div className="flex gap-2">

                <button className="flex h-7 items-center gap-1 rounded-md border border-[#E3E7EF] bg-white px-2.5 text-[8px] font-medium">
                  <Download size={10} />
                  Ekspor
                  <span className="text-[7px] text-slate-400">
                    (CSV/Excel)
                  </span>
                </button>

                <button className="flex h-7 items-center gap-1 rounded-md bg-[#0052FF] px-2.5 text-[8px] font-semibold text-white">
                  <Plus size={10} />
                  Buat Pesanan
                  <br />
                  Manual
                </button>

              </div>

            </div>

            {/* =================================================
                STAT CARDS
            ================================================== */}

            <div className="grid grid-cols-4 gap-2">

              <StatCard
                title="TOTAL PESANAN HARI INI"
                value="48"
                description="+14% dari kemarin"
                icon={<ShoppingCart size={13} />}
                iconBg="bg-[#E8F1FF]"
                iconColor="text-[#0052FF]"
              />

              <StatCard
                title="PERLU KONFIRMASI"
                value="4"
                description="Respon <5 mnt"
                icon={<ClipboardCheck size={13} />}
                iconBg="bg-red-50"
                iconColor="text-red-500"
              />

              <StatCard
                title="SEDANG DIANTAR"
                value="5"
                description="Ada 4 alamat aktif"
                icon={<Truck size={13} />}
                iconBg="bg-cyan-50"
                iconColor="text-cyan-600"
              />

              <StatCard
                title="TOTAL OMZET TERCATAT"
                value="Rp 864.000"
                description="92% Lancar"
                icon={<WalletCards size={13} />}
                iconBg="bg-[#E8F1FF]"
                iconColor="text-[#0052FF]"
              />

            </div>

            {/* =================================================
                STATUS TABS
            ================================================== */}

            <div className="mt-2 rounded-md border border-[#E8EBF1] bg-white p-1">

              <div className="flex items-center gap-1">

                {statusTabs.map((tab) => (
                  <button
                    key={tab.name}
                    onClick={() => setActiveTab(tab.name)}
                    className={`rounded-md px-3 py-1.5 text-[8px] font-semibold transition ${
                      activeTab === tab.name
                        ? "bg-[#0052FF] text-white"
                        : "text-slate-600 hover:bg-[#E8F1FF] hover:text-[#0052FF]"
                    }`}
                  >
                    {tab.name}

                    <span
                      className={`ml-1 rounded-full px-1 ${
                        activeTab === tab.name
                          ? "bg-white/20"
                          : "bg-slate-100"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                ))}

              </div>

            </div>

            {/* =================================================
                FILTER BAR
            ================================================== */}

            <div className="mt-2 flex items-center gap-1.5 rounded-md border border-[#E8EBF1] bg-white p-1.5">

              <div className="relative flex-1">

                <Search
                  size={10}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari berdasarkan No. Order (#ORD-...), nama..."
                  className="h-7 w-full rounded-md bg-[#F8F9FC] pl-7 pr-2 text-[8px] outline-none focus:ring-1 focus:ring-[#E8F1FF]"
                />

              </div>

              <FilterButton icon={<CalendarDays size={9} />}>
                Hari Ini (24 Mei)
              </FilterButton>

              <FilterButton icon={<Package size={9} />}>
                Semua Galon
              </FilterButton>

              <FilterButton icon={<WalletCards size={9} />}>
                Pembayaran
              </FilterButton>

              <button className="flex h-7 w-7 items-center justify-center rounded-md border border-[#E7EAF0] text-slate-500 hover:bg-[#E8F1FF] hover:text-[#0052FF]">
                <SlidersHorizontal size={10} />
              </button>

            </div>

            {/* =================================================
                TABLE
            ================================================== */}

            <div className="mt-2 overflow-hidden rounded-md border border-[#E8EBF1] bg-white">

              <div className="overflow-x-auto">

                <table className="w-full border-collapse">

                  <thead>
                    <tr className="bg-[#F7F8FC]">

                      <TableHead>
                        ORDER & WAKTU
                      </TableHead>

                      <TableHead>
                        PELANGGAN & LOKASI
                      </TableHead>

                      <TableHead>
                        ITEM PESANAN
                      </TableHead>

                      <TableHead>
                        TAGIHAN & BAYAR
                      </TableHead>

                      <TableHead>
                        STATUS
                      </TableHead>

                      <TableHead>
                        KURIR PENGANTAR
                      </TableHead>

                      <TableHead align="center">
                        AKSI
                      </TableHead>

                    </tr>
                  </thead>

                  <tbody>

                    {filteredOrders.map((order) => (

                      <tr
                        key={order.id}
                        className="border-t border-[#EEF0F4] transition hover:bg-[#FAFBFE]"
                      >

                        {/* ORDER */}
                        <td className="w-[90px] px-2.5 py-2 align-top">

                          <div className="text-[8px] font-bold text-[#0052FF]">
                            {order.id}
                          </div>

                          <div className="mt-0.5 text-[7px] text-slate-400">
                            {order.date}
                          </div>

                          {order.status === "Menunggu Konfirmasi" && (
                            <div className="mt-1 inline-block rounded bg-red-50 px-1 py-0.5 text-[6px] font-semibold text-red-500">
                              Baru
                            </div>
                          )}

                        </td>

                        {/* CUSTOMER */}
                        <td className="w-[125px] px-2.5 py-2 align-top">

                          <div className="text-[8px] font-semibold">
                            {order.customer}
                          </div>

                          <div className="mt-0.5 flex items-center gap-1 text-[6.5px] text-slate-400">
                            <Phone size={7} />
                            {order.phone}
                          </div>

                          <div className="mt-0.5 flex items-start gap-1 text-[6.5px] leading-3 text-slate-400">
                            <MapPin size={7} className="mt-0.5 shrink-0" />
                            {order.address}
                          </div>

                        </td>

                        {/* ITEMS */}
                        <td className="w-[135px] px-2.5 py-2 align-top">

                          {order.items.map((item, index) => (
                            <div
                              key={index}
                              className="mb-0.5 flex items-center gap-1 text-[7px]"
                            >
                              <div className="flex h-4 w-4 items-center justify-center rounded bg-[#E8F1FF] text-[#0052FF]">
                                <Package size={8} />
                              </div>

                              <span>
                                {item}
                              </span>
                            </div>
                          ))}

                        </td>

                        {/* BILL */}
                        <td className="w-[85px] px-2.5 py-2 align-top">

                          <div className="text-[8px] font-bold">
                            {order.total}
                          </div>

                          <div
                            className={`mt-1 inline-flex rounded px-1 py-0.5 text-[6px] font-bold ${
                              order.status === "Dibatalkan"
                                ? "bg-red-50 text-red-500"
                                : order.status === "Selesai"
                                ? "bg-green-50 text-[#28A745]"
                                : "bg-[#E8F1FF] text-[#0052FF]"
                            }`}
                          >
                            {order.status === "Selesai"
                              ? "✓ Lunas"
                              : order.status === "Dibatalkan"
                              ? "Refund"
                              : "COD"}
                          </div>

                        </td>

                        {/* STATUS */}
                        <td className="w-[110px] px-2.5 py-2 align-top">

                          <StatusBadge status={order.status} />

                        </td>

                        {/* COURIER */}
                        <td className="w-[105px] px-2.5 py-2 align-top">

                          {order.courier ? (
                            <>
                              <div className="flex items-center gap-1 text-[7px] font-semibold">

                                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#E8F1FF] text-[#0052FF]">
                                  <UserRound size={8} />
                                </div>

                                {order.courier}
                              </div>

                              {order.courierStatus && (
                                <div className="mt-1 text-[6.5px] text-slate-400">
                                  {order.courierStatus}
                                </div>
                              )}
                            </>
                          ) : (
                            <button className="rounded-md bg-[#E8F1FF] px-1.5 py-1 text-[6.5px] font-semibold text-[#0052FF]">
                              Tugaskan Kurir
                            </button>
                          )}

                        </td>

                        {/* ACTION */}
                        <td className="w-[65px] px-2 py-2 align-top">

                          <div className="flex items-center justify-center gap-1">

                            <button
                              title="Lihat detail"
                              className="flex h-5 w-5 items-center justify-center rounded text-slate-500 hover:bg-[#E8F1FF] hover:text-[#0052FF]"
                            >
                              <Eye size={10} />
                            </button>

                            <button
                              title="Tandai selesai"
                              className="flex h-5 w-5 items-center justify-center rounded text-slate-500 hover:bg-green-50 hover:text-[#28A745]"
                            >
                              <CheckCircle2 size={10} />
                            </button>

                            <button
                              title="Lainnya"
                              className="flex h-5 w-5 items-center justify-center rounded text-slate-500 hover:bg-slate-100"
                            >
                              <MoreVertical size={10} />
                            </button>

                          </div>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

              {/* =================================================
                  PAGINATION
              ================================================== */}

              <div className="flex items-center justify-between border-t border-[#EEF0F4] px-3 py-2">

                <p className="text-[7px] text-slate-400">
                  Menampilkan 1–7 dari 48 pesanan
                  <span className="mx-1">•</span>
                  Baris per halaman:
                  <span className="ml-1 rounded border border-[#E5E8EF] px-1.5 py-0.5 text-[#131B2E]">
                    10
                  </span>
                </p>

                <div className="flex items-center gap-1">

                  <button className="flex h-5 w-5 items-center justify-center rounded text-[7px] text-slate-400">
                    ‹
                  </button>

                  <button className="flex h-5 w-5 items-center justify-center rounded bg-[#0052FF] text-[7px] font-semibold text-white">
                    1
                  </button>

                  <button className="flex h-5 w-5 items-center justify-center rounded text-[7px] hover:bg-[#E8F1FF]">
                    2
                  </button>

                  <button className="flex h-5 w-5 items-center justify-center rounded text-[7px] hover:bg-[#E8F1FF]">
                    3
                  </button>

                  <span className="px-1 text-[7px] text-slate-400">
                    ...
                  </span>

                  <button className="flex h-5 w-5 items-center justify-center rounded text-[7px] hover:bg-[#E8F1FF]">
                    5
                  </button>

                  <button className="flex h-5 w-5 items-center justify-center rounded text-[7px] text-slate-500">
                    ›
                  </button>

                </div>

              </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

/* ============================================================
   COMPONENTS
============================================================ */

function SidebarItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[8px] font-medium transition ${
        active
          ? "bg-[#0052FF] text-white shadow-sm"
          : "text-slate-600 hover:bg-[#E8F1FF] hover:text-[#0052FF]"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function StatCard({
  title,
  value,
  description,
  icon,
  iconBg,
  iconColor,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}) {
  return (
    <div className="rounded-md border border-[#E8EBF1] bg-white p-2.5">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-[6.5px] font-semibold uppercase tracking-wide text-slate-400">
            {title}
          </p>

          <p className="mt-1 text-[15px] font-bold leading-none text-[#131B2E]">
            {value}
          </p>

          <p
            className={`mt-1 text-[6.5px] ${
              description.includes("Respon")
                ? "text-red-500"
                : description.includes("Lancar")
                ? "text-[#28A745]"
                : "text-slate-400"
            }`}
          >
            {description}
          </p>

        </div>

        <div
          className={`flex h-6 w-6 items-center justify-center rounded-md ${iconBg} ${iconColor}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}

function FilterButton({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <button className="flex h-7 items-center gap-1 whitespace-nowrap rounded-md border border-[#E7EAF0] bg-white px-2 text-[7px] text-slate-600 hover:border-[#0052FF] hover:text-[#0052FF]">
      {icon}
      {children}
      <ChevronDown size={8} />
    </button>
  );
}

function TableHead({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <th
      className={`px-2.5 py-2 text-[6.5px] font-bold uppercase tracking-wide text-slate-500 ${
        align === "center" ? "text-center" : "text-left"
      }`}
    >
      {children}
    </th>
  );
}