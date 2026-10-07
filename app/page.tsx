"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  Calendar,
  Bell,
  LayoutDashboard,
  ShoppingBag,
  Package,
  Truck,
  PieChart,
  LogOut,
  UserPlus,
  Map,
  List,
  RotateCw,
  Phone,
  Eye,
  CheckCircle2,
  Clock,
  X,
} from "lucide-react";

export default function Page() {
  const [activeMenu, setActiveMenu] = useState("monitoring");
  const [viewMode, setViewMode] = useState<"daftar" | "peta">("daftar");
  const [monitoringTab, setMonitoringTab] = useState("semua");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-100/70 text-slate-700 antialiased font-sans">
      {/* SIDEBAR UTAMA */}
      <aside className="w-60 border-r border-slate-200 bg-white flex flex-col justify-between p-4 sticky top-0 h-screen select-none z-20 shrink-0">
        <div>
          <div className="px-2 py-2 mb-6">
            <h1 className="text-lg font-black text-blue-600 tracking-tight">
              GalonKu Admin
            </h1>
            <p className="text-[10px] text-slate-400 font-medium">
              Portal Manajemen & Operasional
            </p>
          </div>

          <div className="text-[10px] font-bold text-slate-400 px-3 mb-2 tracking-wider uppercase">
            MENU UTAMA
          </div>

          <nav className="space-y-1">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
              { id: "pesanan", label: "Manajemen Pesanan", icon: ShoppingBag },
              { id: "produk", label: "Produk & Stok", icon: Package },
              { id: "monitoring", label: "Monitoring Pengantaran", icon: Truck },
              { id: "keuangan", label: "Laporan Keuangan", icon: PieChart },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-xl transition ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[11px]">
              BS
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 leading-tight">
                Budi Santoso
              </p>
              <p className="text-[10px] text-slate-400 font-medium">
                Super Admin
              </p>
            </div>
          </div>
          <button className="text-slate-400 hover:text-red-500 p-1 transition">
            <LogOut size={15} />
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-10 shrink-0">
          <div className="flex-1 max-w-xs relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={14}
            />
            <input
              type="text"
              placeholder="Cari pesanan, resi, kurir..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600 rounded-xl">
              <Calendar size={13} />
              <span>Hari Ini, 24 Mei</span>
            </button>
            <button className="p-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-xl relative">
              <Bell size={14} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition"
            >
              <Plus size={15} />
              <span>+ Buat Pesanan</span>
            </button>
          </div>
        </header>

        <div className="p-6 space-y-5">
          {/* MONITORING PENGANTARAN */}
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-0.5">
              <Truck size={12} />
              <span>FLEET LOGISTICS & LIVE DISPATCH</span>
            </div>
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  Monitoring Pengantaran
                </h2>
                <p className="text-xs text-slate-500 mt-0.5 max-w-xl">
                  Pelacakan armada kurir motor, status pengiriman pesanan, dan efisiensi rute depo secara langsung.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="bg-slate-200/60 p-1 rounded-xl flex text-xs font-bold">
                  <button
                    onClick={() => setViewMode("daftar")}
                    className={`flex items-center gap-1 px-3 py-1 rounded-lg transition ${
                      viewMode === "daftar"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    <List size={13} />
                    <span>Daftar</span>
                  </button>
                  <button
                    onClick={() => setViewMode("peta")}
                    className={`flex items-center gap-1 px-3 py-1 rounded-lg transition ${
                      viewMode === "peta"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    <Map size={13} />
                    <span>Live Peta</span>
                  </button>
                </div>
                <button className="p-2 border border-slate-200 bg-white rounded-xl text-slate-500 hover:bg-slate-50">
                  <RotateCw size={13} />
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition">
                  <UserPlus size={14} />
                  <span>+ Tambah Armada Kurir</span>
                </button>
              </div>
            </div>

            {/* RINGKASAN STATS */}
            <div className="grid grid-cols-4 gap-3 mt-4">
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-medium text-slate-400">Total Armada</p>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-xl font-black text-slate-900">6</span>
                    <span className="text-xs font-semibold text-slate-600">Kurir Motor</span>
                  </div>
                  <p className="text-[10px] text-emerald-600 font-bold mt-0.5">▲ Kapasitas 100% Siaga</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Truck size={18} />
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-medium text-slate-400">Sedang Mengantar</p>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-xl font-black text-slate-900">4</span>
                    <span className="text-xs font-semibold text-slate-600">Kurir di Jalan</span>
                  </div>
                  <p className="text-[10px] text-blue-600 font-bold mt-0.5">• 11 Galon Sedang Dikirim</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                  <Truck size={18} />
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-medium text-slate-400">Standby Depo</p>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-xl font-black text-slate-900">2</span>
                    <span className="text-xs font-semibold text-slate-600">Siap Muat Kirim</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-bold mt-0.5">🕒 Idle &lt; 8 Menit</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 size={18} />
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-medium text-slate-400">Rata-rata Waktu</p>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-xl font-black text-slate-900">18</span>
                    <span className="text-xs font-semibold text-slate-600">Menit / Pesanan</span>
                  </div>
                  <p className="text-[10px] text-blue-600 font-bold mt-0.5">📉 3.2 mnt lebih cepat dr SLA</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Clock size={18} />
                </div>
              </div>
            </div>

            {/* TAB FILTER & CARI */}
            <div className="flex items-center justify-between mt-5 mb-3">
              <div className="flex items-center gap-1.5 bg-slate-200/60 p-1 rounded-xl text-xs font-bold">
                {[
                  { id: "semua", label: "Semua Armada (6)" },
                  { id: "jalan", label: "Sedang Jalan (4)" },
                  { id: "standby", label: "Standby Depo (2)" },
                  { id: "riwayat", label: "Riwayat Hari Ini" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setMonitoringTab(tab.id)}
                    className={`px-3 py-1 rounded-lg transition ${
                      monitoringTab === tab.id
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="relative w-56">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
                <input
                  type="text"
                  placeholder="Cari kurir, plat, order..."
                  className="w-full pl-8 pr-3 py-1 bg-white text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            {/* KONTEN UTAMA DUA KOLOM */}
            <div className="grid grid-cols-12 gap-5 items-start">
              {/* KOLOM KIRI - KURIR LAPANGAN */}
              <div className="col-span-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <Truck size={14} className="text-blue-600" />
                    Kurir Lapangan
                  </h3>
                  <span className="text-[10px] font-bold text-slate-400">4/6 Bergerak</span>
                </div>

                {/* Card Kurir 1 */}
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2.5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">Pak Budi Santoso</h4>
                      <p className="text-[10px] text-slate-400 font-medium">Honda Beat • B 4120 SZX</p>
                    </div>
                    <span className="bg-sky-50 text-sky-600 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-sky-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-ping"></span>
                      Di Jalan
                    </span>
                  </div>

                  <div className="bg-slate-50 p-2 rounded-xl text-xs space-y-0.5 border border-slate-100">
                    <div className="flex justify-between font-bold">
                      <span className="text-slate-400 text-[10px]">Tugas Saat Ini</span>
                      <span className="text-blue-600 font-mono text-[10px]">#ORD-8821</span>
                    </div>
                    <p className="text-slate-800 font-medium text-[11px] leading-tight">
                      Membawa 3 Galon Aqua ke Jl. Mawar No. 12, Kebayoran Lama
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 px-0.5">
                    <span>Berangkat 10:45</span>
                    <span className="font-bold text-slate-600">Est. 6 menit lagi</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-0.5">
                    <button className="flex items-center justify-center gap-1 py-1.5 border border-slate-200 rounded-xl text-[11px] font-bold text-slate-700 hover:bg-slate-50">
                      <Phone size={12} /> Hubungi
                    </button>
                    <button className="flex items-center justify-center gap-1 py-1.5 bg-blue-50 text-blue-600 rounded-xl text-[11px] font-bold hover:bg-blue-100">
                      <Eye size={12} /> Pantau Rute
                    </button>
                  </div>
                </div>

                {/* Card Kurir 2 */}
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2.5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">Mas Doni Wijaya</h4>
                      <p className="text-[10px] text-slate-400 font-medium">Honda Vario • B 6891 PQR</p>
                    </div>
                    <span className="bg-sky-50 text-sky-600 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-sky-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-ping"></span>
                      Di Jalan
                    </span>
                  </div>

                  <div className="bg-slate-50 p-2 rounded-xl text-xs space-y-0.5 border border-slate-100">
                    <div className="flex justify-between font-bold">
                      <span className="text-slate-400 text-[10px]">Tugas Saat Ini</span>
                      <span className="text-blue-600 font-mono text-[10px]">#ORD-8822</span>
                    </div>
                    <p className="text-slate-800 font-medium text-[11px] leading-tight">
                      Membawa 2 Galon Le Minerale ke Gandaria Heights Lt. 08
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 px-0.5">
                    <span>Berangkat 10:55</span>
                    <span className="font-bold text-slate-600">Est. 12 menit lagi</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-0.5">
                    <button className="flex items-center justify-center gap-1 py-1.5 border border-slate-200 rounded-xl text-[11px] font-bold text-slate-700 hover:bg-slate-50">
                      <Phone size={12} /> Hubungi
                    </button>
                    <button className="flex items-center justify-center gap-1 py-1.5 bg-blue-50 text-blue-600 rounded-xl text-[11px] font-bold hover:bg-blue-100">
                      <Eye size={12} /> Pantau Rute
                    </button>
                  </div>
                </div>

                {/* Card Kurir 3 (Standby) */}
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2.5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">Pak Agus Prasetyo</h4>
                      <p className="text-[10px] text-slate-400 font-medium">Honda Scoopy • B 3310 KLM</p>
                    </div>
                    <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-100">
                      Standby Depo
                    </span>
                  </div>

                  <div className="bg-emerald-50/50 p-2 rounded-xl text-xs border border-emerald-100">
                    <p className="text-[9px] font-bold text-emerald-700 uppercase">STATUS DEPO</p>
                    <p className="text-slate-700 font-medium text-[10px] mt-0.5">
                      Telah menyelesaikan 7 pengantaran pagi. Siap menerima penugasan kloter berikutnya.
                    </p>
                  </div>

                  <button className="w-full py-1.5 bg-blue-600 text-white rounded-xl text-[11px] font-bold hover:bg-blue-700 transition">
                    Tugaskan Pesanan Antre
                  </button>
                </div>
              </div>

              {/* KOLOM KANAN - TABEL PENGANTARAN AKTIF */}
              <div className="col-span-8 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="p-3.5 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                      <List size={14} className="text-blue-600" />
                      Tabel Pengantaran Aktif
                    </h3>
                    <p className="text-[10px] text-slate-400">
                      Pesanan yang sedang dalam proses pengiriman oleh kurir depo
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                    Diurutkan: Estimasi SLA Terdekat
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase text-[9px] tracking-wider">
                      <tr>
                        <th className="py-2.5 px-3">NO. ORDER</th>
                        <th className="py-2.5 px-3">KURIR & ARMADA</th>
                        <th className="py-2.5 px-3">ALAMAT TUJUAN</th>
                        <th className="py-2.5 px-3">MUATAN</th>
                        <th className="py-2.5 px-3">PROGRESS / ESTIMASI</th>
                        <th className="py-2.5 px-3 text-center">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-[11px]">
                      {/* Baris 1 */}
                      <tr className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-3">
                          <p className="font-mono font-bold text-blue-600">#ORD-8821</p>
                          <p className="text-[10px] text-slate-400">10:42 WIB</p>
                        </td>
                        <td className="py-3 px-3">
                          <p className="font-bold text-slate-800">Pak Budi</p>
                          <p className="text-[10px] text-slate-400">B 4120 SZX</p>
                        </td>
                        <td className="py-3 px-3 max-w-[160px]">
                          <p className="font-bold text-slate-800 truncate">Jl. Mawar No. 12</p>
                          <p className="text-[10px] text-slate-400 truncate">Ibu Fitriani (0812-9988-xxxx)</p>
                          <p className="text-[9px] text-slate-400 italic">Patokan: Sebelah Pos RW 03</p>
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-bold text-slate-700">💧 3 Galon Aqua</span>
                        </td>
                        <td className="py-3 px-3">
                          <div className="w-28 space-y-1">
                            <div className="flex justify-between text-[10px] font-bold">
                              <span className="text-slate-700">75% Selesai</span>
                              <span className="text-slate-400">6 mnt lagi</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className="w-[75%] h-full bg-blue-600 rounded-full"></div>
                            </div>
                            <p className="text-[9px] text-slate-400">Jarak: 600m ke titik kirim</p>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className="bg-sky-50 text-sky-600 font-bold text-[10px] px-2.5 py-0.5 rounded-full border border-sky-100">
                            • Diantar
                          </span>
                        </td>
                      </tr>

                      {/* Baris 2 */}
                      <tr className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-3">
                          <p className="font-mono font-bold text-blue-600">#ORD-8822</p>
                          <p className="text-[10px] text-slate-400">10:51 WIB</p>
                        </td>
                        <td className="py-3 px-3">
                          <p className="font-bold text-slate-800">Mas Doni</p>
                          <p className="text-[10px] text-slate-400">B 6891 PQR</p>
                        </td>
                        <td className="py-3 px-3 max-w-[160px]">
                          <p className="font-bold text-slate-800 truncate">Gandaria Heights Lt. 08 #8B</p>
                          <p className="text-[10px] text-slate-400 truncate">Bpk. Ronald (0817-2345-xxxx)</p>
                          <p className="text-[9px] text-slate-400 italic">Titip di Lobby Resepsionis</p>
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-bold text-slate-700">💧 2 Galon Le Minerale</span>
                        </td>
                        <td className="py-3 px-3">
                          <div className="w-28 space-y-1">
                            <div className="flex justify-between text-[10px] font-bold">
                              <span className="text-slate-700">45% Selesai</span>
                              <span className="text-slate-400">12 mnt lagi</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className="w-[45%] h-full bg-blue-600 rounded-full"></div>
                            </div>
                            <p className="text-[9px] text-slate-400">Jarak: 1.8 KM (Lampu Merah Kyai Maja)</p>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className="bg-sky-50 text-sky-600 font-bold text-[10px] px-2.5 py-0.5 rounded-full border border-sky-100">
                            • Diantar
                          </span>
                        </td>
                      </tr>

                      {/* Baris 3 */}
                      <tr className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-3">
                          <p className="font-mono font-bold text-blue-600">#ORD-8824</p>
                          <p className="text-[10px] text-slate-400">11:02 WIB</p>
                        </td>
                        <td className="py-3 px-3">
                          <p className="font-bold text-slate-800">Hendra K.</p>
                          <p className="text-[10px] text-slate-400">B 5502 TYA</p>
                        </td>
                        <td className="py-3 px-3 max-w-[160px]">
                          <p className="font-bold text-slate-800 truncate">Apartemen 1Park Residences Lt. 14</p>
                          <p className="text-[10px] text-slate-400 truncate">Sdr. Kevin Hadi (0852-1100-xxxx)</p>
                          <p className="text-[9px] text-slate-400 italic">Bawa Troli Depo</p>
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-bold text-slate-700">💧 4 Galon Campur</span>
                        </td>
                        <td className="py-3 px-3">
                          <div className="w-28 space-y-1">
                            <div className="flex justify-between text-[10px] font-bold">
                              <span className="text-slate-700">25% Selesai</span>
                              <span className="text-slate-400">15 mnt lagi</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className="w-[25%] h-full bg-blue-600 rounded-full"></div>
                            </div>
                            <p className="text-[9px] text-slate-400">Jarak: 2.7 KM (Baru keluar Depo)</p>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className="bg-sky-50 text-sky-600 font-bold text-[10px] px-2.5 py-0.5 rounded-full border border-sky-100">
                            • Diantar
                          </span>
                        </td>
                      </tr>

                      {/* Baris 4 */}
                      <tr className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-3">
                          <p className="font-mono font-bold text-blue-600">#ORD-8825</p>
                          <p className="text-[10px] text-slate-400">11:15 WIB</p>
                        </td>
                        <td className="py-3 px-3">
                          <p className="font-bold text-slate-800">Rian Pratama</p>
                          <p className="text-[10px] text-slate-400">B 3912 BKN</p>
                        </td>
                        <td className="py-3 px-3 max-w-[160px]">
                          <p className="font-bold text-slate-800 truncate">Komp. Lemigas Blok B4</p>
                          <p className="text-[10px] text-slate-400 truncate">Ibu Maya (0811-9481-xxxx)</p>
                          <p className="text-[9px] text-slate-400 italic">Bayar COD Rp 54.000</p>
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-bold text-slate-700">💧 3 Galon Aqua</span>
                        </td>
                        <td className="py-3 px-3">
                          <div className="w-28 space-y-0.5">
                            <p className="font-bold text-slate-700 text-[10px]">Sedang Muat</p>
                            <p className="text-[9px] text-slate-400">Depo JKT-04 • Persiapan berangkat</p>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className="bg-amber-50 text-amber-600 font-bold text-[10px] px-2.5 py-0.5 rounded-full border border-amber-100">
                            • Diproses
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL BUAT PESANAN */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-xl relative space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-extrabold text-slate-900 text-sm">+ Buat Pesanan Baru</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={16} />
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <div>
                <label className="font-bold text-slate-600 block mb-1">Nama Pelanggan</label>
                <input type="text" placeholder="Masukkan nama..." className="w-full px-3 py-1.5 border border-slate-200 rounded-xl" />
              </div>
              <div>
                <label className="font-bold text-slate-600 block mb-1">Alamat Tujuan</label>
                <textarea placeholder="Masukkan alamat lengkap..." className="w-full px-3 py-1.5 border border-slate-200 rounded-xl h-16"></textarea>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={() => setIsModalOpen(false)} className="flex-1 py-2 bg-slate-100 font-bold text-xs rounded-xl">Batal</button>
              <button onClick={() => setIsModalOpen(false)} className="flex-1 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-sm">Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}