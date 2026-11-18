'use client';

import React, { useState } from 'react';
import { 
  Plus, 
  RotateCw, 
  Search, 
  Users, 
  Zap, 
  Building2, 
  Clock, 
  Phone, 
  Navigation, 
  CheckCircle2,
  Map
} from 'lucide-react';

// Data Mock Kurir
const initialCouriers = [
  {
    id: '1',
    name: 'Pak Budi Santoso',
    initials: 'BS',
    avatarBg: 'bg-blue-100 text-blue-700',
    motor: 'Honda Beat',
    plat: 'B 4120 SZX',
    status: 'jalan', // 'jalan' | 'standby'
    statusBadge: 'Di Jalan',
    statusBadgeStyle: 'text-emerald-600 bg-emerald-50',
    orderId: '#ORD-8821',
    eta: 'Tiba ~6 mnt lagi',
    desc: 'Membawa 3 Galon Aqua ke Jl. Mawar No. 12 (Ibu Fitriani)',
    progress: 75,
    progressLabel: '75% Selesai (600m)',
    finishedCount: 7,
    departTime: '10:42 WIB',
    type: 'di_jalan'
  },
  {
    id: '2',
    name: 'Mas Doni Wijaya',
    initials: 'DW',
    avatarBg: 'bg-cyan-100 text-cyan-700',
    motor: 'Honda Vario',
    plat: 'B 6891 PQR',
    status: 'jalan',
    statusBadge: 'Di Jalan',
    statusBadgeStyle: 'text-emerald-600 bg-emerald-50',
    orderId: '#ORD-8822',
    eta: 'Tiba ~12 mnt lagi',
    desc: 'Membawa 2 Galon Le Minerale ke Gandaria Heights Lt. 08',
    progress: 45,
    progressLabel: '45% Selesai (1.8 KM)',
    finishedCount: 5,
    departTime: '10:51 WIB',
    type: 'di_jalan'
  },
  {
    id: '3',
    name: 'Hendra Kurnia',
    initials: 'HK',
    avatarBg: 'bg-indigo-100 text-indigo-700',
    motor: 'Honda Revo',
    plat: 'B 5502 TYA',
    status: 'jalan',
    statusBadge: 'Di Jalan',
    statusBadgeStyle: 'text-emerald-600 bg-emerald-50',
    orderId: '#ORD-8824',
    eta: 'Tiba ~15 mnt lagi',
    desc: 'Membawa 4 Galon Campur ke 1Park Residences Lt. 14',
    progress: 25,
    progressLabel: '25% Selesai (2.7 KM)',
    finishedCount: 6,
    departTime: '11:02 WIB',
    type: 'di_jalan'
  },
  {
    id: '4',
    name: 'Rian Pratama',
    initials: 'RP',
    avatarBg: 'bg-amber-100 text-amber-700',
    motor: 'Honda Scoopy',
    plat: 'B 3912 BKN',
    status: 'jalan',
    statusBadge: 'Muat Barang',
    statusBadgeStyle: 'text-amber-700 bg-amber-50',
    orderId: '#ORD-8825',
    eta: 'Persiapan Jalan',
    desc: 'Sedang muat 3 Galon Aqua (COD Rp 54.000) di Depo JKT-04',
    progress: 90,
    progressLabel: '90% Loading Muat',
    finishedCount: 4,
    departTime: 'Jadwal: 11:15 WIB',
    type: 'muat_barang'
  },
  {
    id: '5',
    name: 'Pak Agus Prasetyo',
    initials: 'AP',
    avatarBg: 'bg-emerald-100 text-emerald-700',
    motor: 'Honda Supra X',
    plat: 'B 4991 TKL',
    status: 'standby',
    statusBadge: 'Standby Depo',
    statusBadgeStyle: 'text-emerald-700 bg-emerald-50',
    location: 'Posisi: Depo Utama JKT',
    idleTime: 'Idle 4 menit',
    desc: 'Armada kosong, siap menerima alokasi antrean pengantaran baru ke radius 4 KM.',
    battery: '⚡ Baterai HP 92%',
    finishedCount: 8,
    type: 'standby'
  },
  {
    id: '6',
    name: 'Raynar Putra M.',
    initials: 'RM',
    avatarBg: 'bg-purple-100 text-purple-700',
    motor: 'Honda Beat',
    plat: 'B 3434 RTA',
    status: 'standby',
    statusBadge: 'Standby Depo',
    statusBadgeStyle: 'text-emerald-700 bg-emerald-50',
    location: 'Posisi: Depo Cabang Mhg-03',
    idleTime: 'Idle 2 menit',
    desc: 'Baru saja menyelesaikan trip order #ORD-8820. Siap menerima jadwal pengantaran kloter siang.',
    battery: '⚡ Baterai HP 88%',
    finishedCount: 5,
    type: 'standby'
  }
];

export default function KurirLapanganPage() {
  const [activeTab, setActiveTab] = useState<'semua' | 'jalan' | 'standby' | 'riwayat'>('semua');
  const [searchQuery, setSearchQuery] = useState('');

  // Saring Kurir berdasarkan Tab yang Aktif & Input Pencarian
  const filteredCouriers = initialCouriers.filter((courier) => {
    // 1. Filter Tab
    let matchTab = true;
    if (activeTab === 'jalan') {
      matchTab = courier.status === 'jalan';
    } else if (activeTab === 'standby') {
      matchTab = courier.status === 'standby';
    } else if (activeTab === 'riwayat') {
      matchTab = false; // Jika riwayat diklik, contoh kosong / khusus riwayat
    }

    // 2. Filter Search Input
    const matchSearch =
      courier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      courier.plat.toLowerCase().includes(searchQuery.toLowerCase()) ||
      courier.motor.toLowerCase().includes(searchQuery.toLowerCase());

    return matchTab && matchSearch;
  });

  return (
    <main className="w-full bg-[#F8FAFC] min-h-screen p-6 pt-4 font-sans text-slate-800">
      {/* 1. BREADCRUMB & HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold text-blue-600 uppercase tracking-wider mb-0.5 h-4">
            <span>Fleet Logistics & Live Dispatch</span>
            <span className="text-slate-300">/</span>
            <span>Monitoring</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-500">Kurir Lapangan</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight leading-tight">Kurir Lapangan</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manajemen armada kurir, status operasional kurir di lapangan, penugasan antrean, dan pantauan rute pengantaran.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2 transition active:scale-95">
            <Plus className="w-4 h-4" />
            <span>Tambah Armada Kurir</span>
          </button>
          <button className="p-2.5 border border-slate-200 bg-white rounded-xl hover:bg-slate-50 text-slate-600 transition active:scale-95 shadow-sm">
            <RotateCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. RINGKASAN STATISTIK (KPI CARDS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Kurir</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold text-slate-900">6</span>
              <span className="text-xs font-semibold text-slate-600">Kurir Terdaftar</span>
            </div>
            <span className="inline-block mt-2 text-[10px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
              100% Siaga Operasional
            </span>
          </div>
          <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Sedang Di Jalan</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold text-slate-900">4</span>
              <span className="text-xs font-semibold text-slate-600">Kurir Aktif Antar</span>
            </div>
            <span className="inline-block mt-2 text-[10px] font-medium text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-md">
              • 14 Galon Sedang Dikirim
            </span>
          </div>
          <div className="p-3 bg-cyan-50 rounded-xl text-cyan-600">
            <Zap className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Standby Depo</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold text-slate-900">2</span>
              <span className="text-xs font-semibold text-slate-600">Siap Antar Segera</span>
            </div>
            <span className="inline-block mt-2 text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              Idle &lt; 5 Menit
            </span>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
            <Building2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Performa Rata-rata</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold text-slate-900">98.4%</span>
              <span className="text-xs font-semibold text-slate-600">Tepat Waktu</span>
            </div>
            <span className="inline-block mt-2 text-[10px] font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">
              ⚡ SLA 17.4 Menit / Trip
            </span>
          </div>
          <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. FILTER TABS & SEARCH BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {/* TAB: SEMUA KURIR */}
          <button
            type="button"
            onClick={() => setActiveTab('semua')}
            className={`text-xs font-semibold px-4 py-2 rounded-xl transition whitespace-nowrap cursor-pointer ${
              activeTab === 'semua'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Semua Kurir (8)
          </button>

          {/* TAB: DI JALAN (GANTI DARI SEDANG MENGANTAR) */}
          <button
            type="button"
            onClick={() => setActiveTab('jalan')}
            className={`text-xs font-semibold px-4 py-2 rounded-xl transition whitespace-nowrap cursor-pointer ${
              activeTab === 'jalan'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Di Jalan (4)
          </button>

          {/* TAB: STANDBY / TERSEDIA */}
          <button
            type="button"
            onClick={() => setActiveTab('standby')}
            className={`text-xs font-semibold px-4 py-2 rounded-xl transition whitespace-nowrap cursor-pointer ${
              activeTab === 'standby'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Standby Depo (2)
          </button>

          {/* TAB: RIWAYAT */}
         
        </div>

        {/* INPUT PENCARIAN */}
        <div className="relative min-w-[260px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama kurir, plat motor..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-blue-500 shadow-sm"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* 4. GRID KURIR LAPANGAN (DINAMIS SESUAI TAB DI-KLIK) */}
      {filteredCouriers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {filteredCouriers.map((courier) => (
            <div
              key={courier.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between hover:border-blue-200 transition"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full font-bold text-xs flex items-center justify-center ${courier.avatarBg}`}
                    >
                      {courier.initials}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{courier.name}</h3>
                      <p className="text-[11px] text-slate-400">
                        {courier.motor} • <span className="font-semibold text-slate-600">{courier.plat}</span>
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${courier.statusBadgeStyle}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span> {courier.statusBadge}
                  </span>
                </div>

                {/* BILA KURIR SEDANG DI JALAN / MUAT BARANG */}
                {courier.status === 'jalan' && (
                  <div
                    className={`mt-4 p-3 rounded-xl border ${
                      courier.type === 'muat_barang'
                        ? 'bg-amber-50/50 border-amber-100'
                        : 'bg-slate-50 border-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-slate-500">
                        Order: <strong className="text-blue-600">{courier.orderId}</strong>
                      </span>
                      <span className="text-slate-400">{courier.eta}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800 line-clamp-2">{courier.desc}</p>
                    <div className="mt-3">
                      <div className="flex justify-between text-[10px] font-semibold text-blue-600 mb-1">
                        <span>Progres</span>
                        <span>{courier.progressLabel}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            courier.type === 'muat_barang' ? 'bg-amber-500' : 'bg-blue-600'
                          }`}
                          style={{ width: `${courier.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* BILA KURIR SEDANG STANDBY DEPO */}
                {courier.status === 'standby' && (
                  <div className="mt-4 bg-emerald-50/40 p-3 rounded-xl border border-emerald-100/60">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-slate-600 font-medium">{courier.location}</span>
                      <span className="text-slate-400">{courier.idleTime}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{courier.desc}</p>
                    <div className="mt-3 flex items-center gap-2 text-[10px] font-medium text-emerald-700">
                      <span>{courier.battery}</span>
                      <span>•</span>
                      <span>GPS Aktif</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mt-3 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" /> {courier.finishedCount} Pengantaran Selesai
                  </span>
                  <span>{courier.departTime || 'Tersedia Segera'}</span>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100">
                {courier.status === 'jalan' ? (
                  <>
                    {courier.type === 'muat_barang' ? (
                      <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 rounded-xl transition shadow-sm">
                        Konfirmasi Berangkat
                      </button>
                    ) : (
                      <button className="bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold py-2 rounded-xl transition flex items-center justify-center gap-1.5">
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Pantau Rute / GPS</span>
                      </button>
                    )}
                    <button className="border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold py-2 rounded-xl transition flex items-center justify-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" />
                      <span>Hubungi</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 rounded-xl transition shadow-sm">
                      + Tugaskan Pesanan
                    </button>
                    <button className="border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold py-2 rounded-xl transition">
                      Detail Kurir
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center my-6">
          <p className="text-slate-500 text-sm font-medium">Tidak ada kurir yang ditemukan.</p>
        </div>
      )}

      {/* 5. BOTTOM SECTION (RUTE KONSOLIDASI & LOG AKTIVITAS) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <Map className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-sm">Ringkasan Rute Konsolidasi Depo</h2>
              <p className="text-xs text-slate-400">Pemetaan radius kloter rute antar kurir untuk efisiensi BBM dan waktu SLA</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Kloter Selatan (Kebayoran)</p>
              <p className="text-sm font-extrabold text-slate-900 mt-1">2 Kurir Lapangan</p>
              <p className="text-xs text-slate-500 mt-0.5">6 Galon • Est. 22 Menit</p>
              <span className="inline-block mt-3 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                Rute Bebas Macet
              </span>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Kloter Barat (Gandaria)</p>
              <p className="text-sm font-extrabold text-slate-900 mt-1">2 Kurir Lapangan</p>
              <p className="text-xs text-slate-500 mt-0.5">6 Galon • Est. 18 Menit</p>
              <span className="inline-block mt-3 text-[10px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                Padat Merayap di Kp. Melayu
              </span>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Kloter Timur & Depo Siaga</p>
              <p className="text-sm font-extrabold text-slate-900 mt-1">2 Kurir Siaga</p>
              <p className="text-xs text-slate-500 mt-0.5">Kapasitas Angkut: 10 Galon</p>
              <span className="inline-block mt-3 text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                Ready Kloter Siang
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-900 text-sm">Aktivitas Log Terkini</h2>
              <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Live
              </span>
            </div>

            <div className="space-y-3.5">
              <div className="flex items-start gap-2.5 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                <div>
                  <p className="text-slate-800"><strong className="font-semibold">Pak Budi</strong> mendekati titik kirim (600m)</p>
                  <span className="text-[10px] text-slate-400">1 menit yang lalu</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs">
                <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
                <div>
                  <p className="text-slate-800"><strong className="font-semibold">Mas Doni</strong> menyelesaikan trip #ORD-8820</p>
                  <span className="text-[10px] text-slate-400">4 menit yang lalu</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs">
                <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                <div>
                  <p className="text-slate-800"><strong className="font-semibold">Hendra K.</strong> mulai memuat 3 galon di Depo 04</p>
                  <span className="text-[10px] text-slate-400">6 menit yang lalu</span>
                </div>
              </div>
            </div>
          </div>

          <button className="w-full mt-4 text-center text-xs font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 py-2.5 rounded-xl transition">
            Lihat Seluruh Log Kurir
          </button>
        </div>
      </div>
    </main>
  );
}