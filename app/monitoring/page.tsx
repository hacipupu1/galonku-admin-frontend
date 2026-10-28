"use client";

import React, { useState } from "react";
import {
  Users,
  Truck,
  Home,
  Clock,
  Search,
  Plus,
  RefreshCw,
  Phone,
  Navigation,
  ChevronDown,
  Layers,
  Package,
} from "lucide-react";

// 1. DATA RINGKASAN ARMADA
const stats = [
  {
    title: "Total Armada",
    value: "6",
    unit: "Kurir Motor",
    sub: "Kapasitas 100% Siaga",
    subColor: "text-blue-600 font-semibold",
    icon: Users,
    iconBg: "bg-blue-50 text-blue-600",
  },
  {
    title: "Sedang Mengantar",
    value: "4",
    unit: "Kurir di Jalan",
    sub: "11 Galon Sedang Dikirim",
    subColor: "text-blue-600 font-semibold",
    icon: Truck,
    iconBg: "bg-cyan-50 text-cyan-600",
  },
  {
    title: "Standby Depo",
    value: "2",
    unit: "Siap Muat Kirim",
    sub: "Idle < 8 Menit",
    subColor: "text-emerald-600 font-semibold",
    icon: Home,
    iconBg: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Rata-rata Waktu",
    value: "18",
    unit: "Menit / Pesanan",
    sub: "3.2 mnt lebih cepat dr SLA",
    subColor: "text-blue-600 font-semibold",
    icon: Clock,
    iconBg: "bg-blue-50 text-blue-600",
  },
];

// 2. DATA KURIR LAPANGAN (KOLOM KIRI)
const kurirList = [
  {
    id: 1,
    nama: "Pak Budi Santoso",
    armada: "Honda Beat • B 4120 SZX",
    statusType: "on-the-way",
    tugas: "Membawa 3 Galon Aqua ke Jl. Mawar No. 12, Kebayoran Lama",
    orderId: "#ORD-8821",
    berangkat: "10:45",
    estimasi: "Est. 6 menit lagi",
  },
  {
    id: 2,
    nama: "Mas Doni Wijaya",
    armada: "Honda Vario • B 6891 PQR",
    statusType: "on-the-way",
    tugas: "Membawa 2 Galon Le Minerale ke Gandaria Heights Lt. 08",
    orderId: "#ORD-8822",
    berangkat: "10:35",
    estimasi: "Est. 12 menit lagi",
  },
  {
    id: 3,
    nama: "Pak Agus Prasetyo",
    armada: "Honda Scoopy • B 3310 KLM",
    statusType: "standby",
    statusDepo: "Siap Antar Kloter Baru",
    desc: "Telah menyelesaikan 7 pengantaran pagi. Siap menerima penugasan kloter berikutnya.",
  },
  {
    id: 4,
    nama: "Hendra Kurnia",
    armada: "Honda Revo • B 5502 TYA",
    statusType: "on-the-way",
    tugas: "Membawa 4 Galon (2 Aqua + 2 Cleo) ke Apartemen Gandaria Lt. 14",
    orderId: "#ORD-8824",
    berangkat: "11:05",
    estimasi: "Est. 15 menit lagi",
  },
];

// 3. DATA TABEL PENGANTARAN AKTIF (KOLOM KANAN)
const orderList = [
  {
    id: "#ORD-8821",
    waktu: "10:42 WIB",
    kurir: "Pak Budi",
    plat: "B 4120 SZX",
    alamat: "Jl. Mawar No. 12",
    penerima: "Ibu Fitriani (0812-9988-xxxx)",
    patokan: "Patokan: Sebelah Pos RW 03",
    muatan: "3 Galon Aqua",
    progress: 75,
    estimasi: "6 mnt lagi",
    jarak: "Jarak: 600m ke titik kirim",
    status: "Diantar",
  },
  {
    id: "#ORD-8822",
    waktu: "10:51 WIB",
    kurir: "Mas Doni",
    plat: "B 6891 PQR",
    alamat: "Gandaria Heights Lt. 08 #8B",
    penerima: "Bpk. Ronald (0817-2345-xxxx)",
    patokan: "Titip di Lobby Resepsionis",
    muatan: "2 Galon Le Minerale",
    progress: 45,
    estimasi: "12 mnt lagi",
    jarak: "Jarak: 1.8 KM (Lampu Merah Kyai Maja)",
    status: "Diantar",
  },
  {
    id: "#ORD-8824",
    waktu: "11:02 WIB",
    kurir: "Hendra K.",
    plat: "B 5502 TYA",
    alamat: "Apartemen 1Park Residences Lt. 14",
    penerima: "Sdr. Kevin Hadi (0852-1100-xxxx)",
    patokan: "Bawa Troli Depo",
    muatan: "4 Galon Campur",
    progress: 25,
    estimasi: "15 mnt lagi",
    jarak: "Jarak: 2.7 KM (Baru keluar Depo)",
    status: "Diantar",
  },
  {
    id: "#ORD-8825",
    waktu: "11:15 WIB",
    kurir: "Rian Pratama",
    plat: "B 3912 BKN",
    alamat: "Komp. Rempoa Blok B4",
    penerima: "Ibu Maya (0811-9481-xxxx)",
    patokan: "Bayar COD Rp 54.000",
    muatan: "3 Galon Aqua",
    progressStatus: "Sedang Muat",
    depo: "Depo JKT-04",
    status: "Diproses",
  },
  {
    id: "#ORD-8826",
    waktu: "12:05 WIB",
    kurir: "Raynar Putra M.",
    plat: "B 3434 RTA",
    alamat: "Jl. Indah Megah (Araya)",
    penerima: "Ibu Susi (0817-2345-xxxx)",
    patokan: "Taruh di pos satpam",
    muatan: "5 Galon Aqua",
    progressStatus: "Sedang Muat",
    depo: "Depo Mlg-03",
    status: "Diproses",
  },
  {
    id: "#ORD-8827",
    waktu: "13:17 WIB",
    kurir: "Tono Sani",
    plat: "B 5879 EFN",
    alamat: "Jl. Mawar No. 12",
    penerima: "Ibu Fitriani (0812-9988-xxxx)",
    patokan: "Patokan: Sebelah Pos RW 03",
    muatan: "3 Galon Aqua",
    progressStatus: "Sedang Muat",
    depo: "Depo JKT-05",
    status: "Diproses",
  },
  {
    id: "#ORD-8828",
    waktu: "14:15 WIB",
    kurir: "Iwan Dwi",
    plat: "B 2567 SMF",
    alamat: "Gandaria Heights Lt. 08 #8B",
    penerima: "Bpk. Ronald (0817-2345-xxxx)",
    patokan: "Titip di Lobby Resepsionis",
    muatan: "2 Galon Le Minerale",
    progressStatus: "Sedang Muat",
    depo: "Depo JKT-04",
    status: "Diproses",
  },
  {
    id: "#ORD-8829",
    waktu: "16:00 WIB",
    kurir: "Kevin Hadi",
    plat: "B 5678 OPQ",
    alamat: "Apartemen 1Park Residences Lt. 14",
    penerima: "Sdr. Jonathan C. (0852-1100-xxxx)",
    patokan: "Bawa Troli Depo",
    muatan: "4 Galon Vit",
    progressStatus: "Sedang Muat",
    depo: "Depo JKT-06",
    status: "Diproses",
  },
  {
    id: "#ORD-8830",
    waktu: "17:00 WIB",
    kurir: "Aryo Putra",
    plat: "B 1092 IKN",
    alamat: "Cluster Harmoni Blok D6",
    penerima: "Ibu Sari (0819-4722-xxxx)",
    patokan: "Patokan: Pos Satpam",
    muatan: "4 Galon Cleo",
    progressStatus: "Sedang Muat",
    depo: "Depo JKT-05",
    status: "Diproses",
  },
];

export default function MonitoringPage() {
  const [activeTab, setActiveTab] = useState("semua");

  return (
    <div className="p-6 space-y-6 w-full text-slate-800 bg-[#F8FAFC] min-h-screen">
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#0052FF] uppercase tracking-wider">
            <Truck size={14} />
            <span>FLEET LOGISTICS & LIVE DISPATCH</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
            Monitoring Pengantaran
          </h1>
          <p className="text-sm text-slate-500">
            Pelacakan armada kurir motor, status pengiriman pesanan, dan efisiensi rute depo secara langsung.
          </p>
        </div>

        {/* Action Buttons Right */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
            <button className="px-3 py-1.5 text-xs font-bold text-blue-600 bg-blue-50 rounded-lg flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              Daftar
            </button>
            <button className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 flex items-center gap-1.5">
              Live Peta
            </button>
          </div>

          <button className="px-4 py-2.5 bg-[#0052FF] hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer">
            <Plus size={16} />
            Tambah Armada Kurir
          </button>

          <button className="p-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl shadow-sm transition-all cursor-pointer">
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* 2. STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div
              key={index}
              className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start justify-between"
            >
              <div>
                <span className="text-xs font-medium text-slate-400">
                  {item.title}
                </span>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-2xl font-black text-slate-900">
                    {item.value}
                  </span>
                  <span className="text-xs font-semibold text-slate-600">
                    {item.unit}
                  </span>
                </div>
                <p className={`text-[11px] mt-2 ${item.subColor}`}>
                  {item.sub}
                </p>
              </div>
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${item.iconBg}`}
              >
                <IconComponent size={20} />
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. FILTER TABS & SEARCH BAR */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setActiveTab("semua")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "semua"
                ? "bg-[#0052FF] text-white shadow-md shadow-blue-500/20"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            Semua Armada (6)
          </button>
          <button
            onClick={() => setActiveTab("jalan")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "jalan"
                ? "bg-[#0052FF] text-white shadow-md shadow-blue-500/20"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            Sedang Jalan (4)
          </button>
          <button
            onClick={() => setActiveTab("standby")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "standby"
                ? "bg-[#0052FF] text-white shadow-md shadow-blue-500/20"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            Standby Depo (2)
          </button>
          <button
            onClick={() => setActiveTab("riwayat")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "riwayat"
                ? "bg-[#0052FF] text-white shadow-md shadow-blue-500/20"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            Riwayat Hari I...
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Cari kurir, plat, order..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 shadow-sm"
          />
        </div>
      </div>

      {/* 4. MAIN LAYOUT GRID (KURIR LAPANGAN & TABEL PENGANTARAN) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* KOLOM KIRI: KURIR LAPANGAN (5 COLS) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <Truck size={18} className="text-[#0052FF]" />
              <h2 className="text-base font-bold text-slate-900">
                Kurir Lapangan
              </h2>
            </div>
            <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-[11px] font-bold">
              4 / 6 Bergerak
            </span>
          </div>

          {/* LIST CARD KURIR */}
          <div className="space-y-3">
            {kurirList.map((kurir) => (
              <div
                key={kurir.id}
                className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3"
              >
                {/* Header Card */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {kurir.nama}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {kurir.armada}
                    </p>
                  </div>
                  {kurir.statusType === "on-the-way" ? (
                    <span className="px-2.5 py-1 bg-cyan-50 text-cyan-600 rounded-full text-[11px] font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
                      Di Jalan
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[11px] font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Standby Depo
                    </span>
                  )}
                </div>

                {/* Box Detail Tugas / Status */}
                {kurir.statusType === "on-the-way" ? (
                  <div className="bg-slate-50 p-3 rounded-xl space-y-2 border border-slate-100">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-slate-600">
                        Tugas Saat Ini
                      </span>
                      <span className="font-bold text-blue-600">
                        {kurir.orderId}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-slate-800 leading-snug">
                      {kurir.tugas}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-200/60">
                      <span>Berangkat {kurir.berangkat}</span>
                      <span className="font-semibold text-cyan-600">
                        {kurir.estimasi}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-50 p-3 rounded-xl space-y-1.5 border border-slate-100">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-slate-600">
                        Status Depo
                      </span>
                      <span className="font-bold text-emerald-600">
                        {kurir.statusDepo}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      {kurir.desc}
                    </p>
                  </div>
                )}

                {/* Tombol Aksi Bottom */}
                {kurir.statusType === "on-the-way" ? (
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button className="py-2 px-3 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer">
                      <Phone size={14} />
                      Hubungi
                    </button>
                    <button className="py-2 px-3 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer">
                      <Navigation size={14} />
                      Pantau Rute
                    </button>
                  </div>
                ) : (
                  <button className="w-full py-2.5 bg-[#0052FF] hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-all shadow-sm cursor-pointer">
                    Tugaskan Pesanan Antre
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* KOLOM KANAN: TABEL PENGANTARAN AKTIF (7 COLS) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          {/* Header Tabel */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <Layers size={18} className="text-[#0052FF]" />
                <h2 className="text-base font-bold text-slate-900">
                  Tabel Pengantaran Aktif
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Pesanan yang sedang dalam proses pengiriman oleh kurir depo
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 self-start sm:self-auto">
              <span>Diurutkan:</span>
              <button className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-700 flex items-center gap-1 cursor-pointer">
                Estimasi SLA Terdekat
                <ChevronDown size={14} />
              </button>
            </div>
          </div>

          {/* Kontainer Tabel */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-2">NO. ORDER</th>
                  <th className="py-3 px-2">KURIR & ARMADA</th>
                  <th className="py-3 px-2">ALAMAT TUJUAN</th>
                  <th className="py-3 px-2">MUATAN</th>
                  <th className="py-3 px-2">PROGRESS / ESTIMASI</th>
                  <th className="py-3 px-2 text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {orderList.map((order, i) => (
                  <tr key={i} className="hover:bg-slate-50/80 transition-all">
                    {/* NO. ORDER */}
                    <td className="py-3.5 px-2 align-top">
                      <span className="font-bold text-blue-600 block">
                        {order.id}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {order.waktu}
                      </span>
                    </td>

                    {/* KURIR & ARMADA */}
                    <td className="py-3.5 px-2 align-top whitespace-nowrap">
                      <span className="font-bold text-slate-900 block">
                        {order.kurir}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {order.plat}
                      </span>
                    </td>

                    {/* ALAMAT TUJUAN */}
                    <td className="py-3.5 px-2 align-top max-w-[200px]">
                      <span className="font-bold text-slate-800 block truncate">
                        {order.alamat}
                      </span>
                      <span className="text-[10px] text-slate-400 block truncate">
                        {order.penerima}
                      </span>
                      <span className="text-[10px] font-semibold text-blue-600 block truncate mt-0.5">
                        {order.patokan}
                      </span>
                    </td>

                    {/* MUATAN */}
                    <td className="py-3.5 px-2 align-top whitespace-nowrap">
                      <span className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-lg text-[11px] font-bold inline-flex items-center gap-1">
                        <Package size={12} />
                        {order.muatan}
                      </span>
                    </td>

                    {/* PROGRESS / ESTIMASI */}
                    <td className="py-3.5 px-2 align-top">
                      {order.status === "Diantar" ? (
                        <div className="space-y-1 min-w-[130px]">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-bold text-blue-600">
                              {order.progress}% Selesai
                            </span>
                            <span className="text-[10px] text-slate-500 font-medium">
                              {order.estimasi}
                            </span>
                          </div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-blue-600 h-full rounded-full"
                              style={{ width: `${order.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-[10px] text-slate-400 block truncate">
                            {order.jarak}
                          </span>
                        </div>
                      ) : (
                        <div className="space-y-1 min-w-[130px]">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-semibold text-slate-700">
                              {order.progressStatus}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {order.depo}
                            </span>
                          </div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-purple-500 h-full w-1/3 rounded-full"></div>
                          </div>
                          <span className="text-[10px] text-slate-400 block">
                            Persiapan berangkat
                          </span>
                        </div>
                      )}
                    </td>

                    {/* STATUS BADGE */}
                    <td className="py-3.5 px-2 align-top text-right whitespace-nowrap">
                      {order.status === "Diantar" ? (
                        <span className="px-2.5 py-1 bg-cyan-50 text-cyan-600 rounded-full text-[11px] font-bold inline-flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                          Diantar
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-purple-50 text-purple-600 rounded-full text-[11px] font-bold inline-flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
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

      </div>
    </div>
  );
}