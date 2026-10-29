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
  ChevronDown,
  Droplets,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

// Data Mock Pengantaran Aktif
const initialDeliveries = [
  {
    id: '1',
    orderNo: '#ORD-8821',
    time: '10.42 WIB',
    courierName: 'Pak Budi Santoso',
    vehicle: 'Honda Beat • B 4120 SZX',
    addressTitle: 'Jl. Mawar No. 12',
    customerInfo: 'Ibu Fitriani (0812-9988-xxxx)',
    note: 'Patokan: Sebelah Pos RW 03',
    itemCount: '3 Galon Aqua',
    itemType: 'aqua',
    progressPercent: 75,
    progressText: '75% Selesai',
    etaText: '6 mnt lagi',
    distanceText: 'Jarak: 600m ke titik kirim',
    status: 'diantar', // 'diantar' | 'diproses'
    depoInfo: '',
  },
  {
    id: '2',
    orderNo: '#ORD-8822',
    time: '10.51 WIB',
    courierName: 'Mas Doni Wijaya',
    vehicle: 'Honda Vario • B 6891 PQR',
    addressTitle: 'Gandaria Heights Lt. 08 #8B',
    customerInfo: 'Bpk. Ronald (0817-2345-xxxx)',
    note: 'Titip di Lobby Resepsionis',
    itemCount: '2 Galon Le Minerale',
    itemType: 'le_minerale',
    progressPercent: 45,
    progressText: '45% Selesai',
    etaText: '12 mnt lagi',
    distanceText: 'Jarak: 1.8 KM (Lampu Merah Kyai Maja)',
    status: 'diantar',
    depoInfo: '',
  },
  {
    id: '3',
    orderNo: '#ORD-8824',
    time: '11.02 WIB',
    courierName: 'Hendra Kurnia',
    vehicle: 'Honda Revo • B 5502 TYA',
    addressTitle: 'Apartemen 1Park Residences Lt. 14',
    customerInfo: 'Sdr. Kevin Hadi (0852-1100-xxxx)',
    note: 'Bawa Troli Depo',
    itemCount: '4 Galon Campur',
    itemType: 'campur',
    progressPercent: 25,
    progressText: '25% Selesai',
    etaText: '15 mnt lagi',
    distanceText: 'Jarak: 2.7 KM (Baru keluar Depo)',
    status: 'diantar',
    depoInfo: '',
  },
  {
    id: '4',
    orderNo: '#ORD-8825',
    time: '11.15 WIB',
    courierName: 'Rian Pratama',
    vehicle: 'Honda Scoopy • B 3912 BKN',
    addressTitle: 'Komp. Rempoa Blok B4',
    customerInfo: 'Ibu Maya (0811-9481-xxxx)',
    note: 'Bayar COD Rp 54.000',
    itemCount: '3 Galon Aqua',
    itemType: 'aqua',
    progressPercent: 10,
    progressText: 'Sedang Muat',
    etaText: '',
    distanceText: 'Persiapan berangkat',
    status: 'diproses',
    depoInfo: 'Depo JKT-04',
  },
  {
    id: '5',
    orderNo: '#ORD-8826',
    time: '12.05 WIB',
    courierName: 'Raynar Putra M.',
    vehicle: 'Honda Beat • B 3434 RTA',
    addressTitle: 'Jl. Indah Megah (Araya)',
    customerInfo: 'Ibu Susi (0811-9481-xxxx)',
    note: 'Taruh di pos satpam',
    itemCount: '5 Galon Aqua',
    itemType: 'aqua',
    progressPercent: 10,
    progressText: 'Sedang Muat',
    etaText: '',
    distanceText: 'Persiapan berangkat',
    status: 'diproses',
    depoInfo: 'Depo Mhg-03',
  },
  {
    id: '6',
    orderNo: '#ORD-8827',
    time: '13.17 WIB',
    courierName: 'Tono Sani',
    vehicle: 'Yamaha Mio • B 5879 SFN',
    addressTitle: 'Jl. Mawar No. 12',
    customerInfo: 'Ibu Fitriani (0812-9988-xxxx)',
    note: 'Patokan: Sebelah Pos RW 03',
    itemCount: '3 Galon Aqua',
    itemType: 'aqua',
    progressPercent: 10,
    progressText: 'Sedang Muat',
    etaText: '',
    distanceText: 'Persiapan berangkat',
    status: 'diproses',
    depoInfo: 'Depo JKT-05',
  },
  {
    id: '7',
    orderNo: '#ORD-8828',
    time: '14.15 WIB',
    courierName: 'Iwan Dwi',
    vehicle: 'Honda Beat • B 2567 SMF',
    addressTitle: 'Gandaria Heights Lt. 08 #8B',
    customerInfo: 'Bpk. Ronald (0817-2345-xxxx)',
    note: 'Titip di Lobby Resepsionis',
    itemCount: '2 Galon Le Minerale',
    itemType: 'le_minerale',
    progressPercent: 10,
    progressText: 'Sedang Muat',
    etaText: '',
    distanceText: 'Persiapan berangkat',
    status: 'diproses',
    depoInfo: 'Depo JKT-04',
  },
  {
    id: '8',
    orderNo: '#ORD-8829',
    time: '16.00 WIB',
    courierName: 'Kevin Hadi',
    vehicle: 'Honda Vario • B 5678 OPQ',
    addressTitle: 'Apartemen 1Park Residences Lt. 14',
    customerInfo: 'Sdr. Jonathan C. (0852-1100-xxxx)',
    note: 'Bawa Troli Depo',
    itemCount: '4 Galon Vit',
    itemType: 'vit',
    progressPercent: 10,
    progressText: 'Sedang Muat',
    etaText: '',
    distanceText: 'Persiapan berangkat',
    status: 'diproses',
    depoInfo: 'Depo JKT-06',
  },
];

export default function MonitoringPage() {
  const [activeTab, setActiveTab] = useState<'semua' | 'jalan' | 'standby' | 'riwayat'>('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('sla');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Filter Data Berdasarkan Tab & Input Pencarian
  const filteredData = initialDeliveries.filter((item) => {
    let matchTab = true;
    if (activeTab === 'jalan') {
      matchTab = item.status === 'diantar';
    } else if (activeTab === 'standby') {
      matchTab = item.status === 'diproses';
    } else if (activeTab === 'riwayat') {
      matchTab = false; // Tab riwayat
    }

    const matchSearch =
      item.orderNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.courierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.addressTitle.toLowerCase().includes(searchQuery.toLowerCase());

    return matchTab && matchSearch;
  });

  return (
    <main className="w-full bg-[#F8FAFC] min-h-screen p-6 pt-4 font-sans text-slate-800">
      {/* HEADER PAGE */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold tracking-wider text-blue-600 uppercase mb-1">
            <span>Fleet Logistics & Live Dispatch</span>
          </div>  
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight leading-tight">Monitoring Pengantaran</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Pelacakan armada kurir motor, status pengiriman pesanan, dan efisiensi rute depo secara langsung.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2 transition active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Armada Kurir</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setActiveTab('semua');
            }}
            className="p-2.5 border border-slate-200 bg-white rounded-xl hover:bg-slate-50 text-slate-600 transition active:scale-95 shadow-sm cursor-pointer"
            title="Refresh Data"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI CARDS (4 CARD SUMMARY) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Card 1 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Armada</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold text-slate-900">6</span>
              <span className="text-xs font-semibold text-slate-600">Kurir Motor</span>
            </div>
            <span className="inline-block mt-2 text-[10px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
              Kapasitas 100% Siaga
            </span>
          </div>
          <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Sedang Mengantar</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold text-slate-900">4</span>
              <span className="text-xs font-semibold text-slate-600">Kurir di Jalan</span>
            </div>
            <span className="inline-block mt-2 text-[10px] font-medium text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-md">
              • 11 Galon Sedang Dikirim
            </span>
          </div>
          <div className="p-3 bg-cyan-50 rounded-xl text-cyan-600">
            <Zap className="w-5 h-5" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Standby Depo</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold text-slate-900">2</span>
              <span className="text-xs font-semibold text-slate-600">Siap Muat Kirim</span>
            </div>
            <span className="inline-block mt-2 text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              Idle &lt; 8 Menit
            </span>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
            <Building2 className="w-5 h-5" />
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Rata-rata Waktu</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold text-slate-900">18</span>
              <span className="text-xs font-semibold text-slate-600">Menit / Pesanan</span>
            </div>
            <span className="inline-block mt-2 text-[10px] font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">
              3.2 mnt lebih cepat dr SLA
            </span>
          </div>
          <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* FILTER TABS & SEARCH INPUT */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setActiveTab('semua')}
            className={`text-xs font-semibold px-4 py-2 rounded-xl transition whitespace-nowrap cursor-pointer ${
              activeTab === 'semua'
                ? 'bg-[#2563EB] text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Semua Armada (8)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('jalan')}
            className={`text-xs font-semibold px-4 py-2 rounded-xl transition whitespace-nowrap cursor-pointer ${
              activeTab === 'jalan'
                ? 'bg-[#2563EB] text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Sedang Jalan (3)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('standby')}
            className={`text-xs font-semibold px-4 py-2 rounded-xl transition whitespace-nowrap cursor-pointer ${
              activeTab === 'standby'
                ? 'bg-[#2563EB] text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Standby Depo (5)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('riwayat')}
            className={`text-xs font-semibold px-4 py-2 rounded-xl transition whitespace-nowrap cursor-pointer ${
              activeTab === 'riwayat'
                ? 'bg-[#2563EB] text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Riwayat Hari Ini
          </button>
        </div>

        <div className="relative min-w-[260px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kurir, plat, order..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-blue-500 shadow-sm"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* TABLE SECTION: TABEL PENGANTARAN AKTIF */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
        {/* Table Title & Filter Header */}
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-bold text-slate-900 text-base">Tabel Pengantaran Aktif</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Pesanan yang sedang dalam proses pengiriman oleh kurir depo
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Diurutkan:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="sla">Estimasi SLA Terdekat</option>
              <option value="terbaru">Order Terbaru</option>
              <option value="muatan">Muatan Terbanyak</option>
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-5">NO. ORDER</th>
                <th className="py-3 px-5">KURIR &amp; ARMADA</th>
                <th className="py-3 px-5">ALAMAT TUJUAN</th>
                <th className="py-3 px-5">MUATAN</th>
                <th className="py-3 px-5">PROGRESS / ESTIMASI</th>
                <th className="py-3 px-5 text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition">
                    {/* NO. ORDER */}
                    <td className="py-4 px-5 align-top">
                      <span className="font-bold text-blue-600 block">{item.orderNo}</span>
                      <span className="text-[10px] text-slate-400">{item.time}</span>
                    </td>

                    {/* KURIR & ARMADA */}
                    <td className="py-4 px-5 align-top">
                      <span className="font-bold text-slate-800 block">{item.courierName}</span>
                      <span className="text-[11px] text-slate-400">{item.vehicle}</span>
                    </td>

                    {/* ALAMAT TUJUAN */}
                    <td className="py-4 px-5 align-top max-w-[280px]">
                      <span className="font-bold text-slate-800 block">{item.addressTitle}</span>
                      <span className="text-[11px] text-slate-500 block">{item.customerInfo}</span>
                      {item.note && (
                        <span className="text-[10px] text-amber-600 font-medium block mt-0.5">
                          {item.note}
                        </span>
                      )}
                    </td>

                    {/* MUATAN */}
                    <td className="py-4 px-5 align-top">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                          item.itemType === 'aqua'
                            ? 'bg-blue-50 text-blue-600'
                            : item.itemType === 'le_minerale'
                            ? 'bg-teal-50 text-teal-600'
                            : item.itemType === 'campur'
                            ? 'bg-purple-50 text-purple-600'
                            : 'bg-indigo-50 text-indigo-600'
                        }`}
                      >
                        <Droplets className="w-3.5 h-3.5" />
                        {item.itemCount}
                      </span>
                    </td>

                    {/* PROGRESS / ESTIMASI */}
                    <td className="py-4 px-5 align-top min-w-[200px]">
                      {item.status === 'diantar' ? (
                        <div>
                          <div className="flex justify-between text-[11px] font-bold text-blue-600 mb-1">
                            <span>{item.progressText}</span>
                            <span>{item.etaText}</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-1">
                            <div
                              className="h-full bg-blue-600 rounded-full"
                              style={{ width: `${item.progressPercent}%` }}
                            ></div>
                          </div>
                          <span className="text-[10px] text-slate-400 block">{item.distanceText}</span>
                        </div>
                      ) : (
                        <div>
                          <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                            <span>Sedang Muat</span>
                            <span className="text-slate-400 font-normal">{item.depoInfo}</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-1">
                            <div className="h-full bg-amber-500 rounded-full" style={{ width: '20%' }}></div>
                          </div>
                          <span className="text-[10px] text-slate-400 block">Persiapan berangkat</span>
                        </div>
                      )}
                    </td>

                    {/* STATUS */}
                    <td className="py-4 px-5 align-top text-right">
                      {item.status === 'diantar' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Diantar
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Diproses
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-medium">
                    Tidak ada data pengantaran aktif yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION FOOTER */}
        <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            Menampilkan <strong className="text-slate-800">{filteredData.length}</strong> dari{' '}
            <strong className="text-slate-800">24</strong> antrean pengantaran aktif
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 transition cursor-pointer"
            >
              Sebelumnya
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(1)}
              className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                currentPage === 1
                  ? 'bg-blue-600 text-white'
                  : 'border border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              1
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(2)}
              className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                currentPage === 2
                  ? 'bg-blue-600 text-white'
                  : 'border border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              2
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(3)}
              className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                currentPage === 3
                  ? 'bg-blue-600 text-white'
                  : 'border border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              3
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, 3))}
              className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition cursor-pointer"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>

      {/* MODAL TAMBAH ARMADA KURIR */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-slate-900 text-base">Tambah Armada Kurir Baru</h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsAddModalOpen(false);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Lengkap Kurir</label>
                <input
                  type="text"
                  placeholder="Contoh: Ahmad Rizky"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Jenis &amp; Plat Kendaraan</label>
                <input
                  type="text"
                  placeholder="Contoh: Honda Beat • B 1234 ABC"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Nomor WhatsApp / HP</label>
                <input
                  type="text"
                  placeholder="Contoh: 0812-3456-7890"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition cursor-pointer shadow-sm"
                >
                  Simpan Armada
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}