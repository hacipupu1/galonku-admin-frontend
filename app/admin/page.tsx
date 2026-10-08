'use client';

import React, { useState } from 'react';
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
  Edit2,
  AlertTriangle,
  ArrowUpRight,
  RefreshCw,
  X
} from 'lucide-react';

export default function AdminDashboard() {
  // Navigation State (Active Menu)
  const [activeMenu, setActiveMenu] = useState<'produk' | 'monitoring'>('produk');

  // Produk & Stok State
  const [produkTab, setProdukTab] = useState('semua');
  const [searchProduk, setSearchProduk] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Monitoring State
  const [monitoringTab, setMonitoringTab] = useState('semua');
  const [viewMode, setViewMode] = useState<'daftar' | 'peta'>('daftar');
  const [searchKurir, setSearchKurir] = useState('');

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-slate-700">
      {/* SIDEBAR UTAMA */}
      <aside className="w-64 border-r border-slate-200 bg-white flex flex-col justify-between p-4 sticky top-0 h-screen select-none z-20">
        <div>
          <div className="px-2 py-3 mb-6">
            <h1 className="text-xl font-extrabold text-[#0052CC] tracking-tight">GalonKu Admin</h1>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Portal Manajemen & Operasional</p>
          </div>

          <div className="text-[11px] font-bold text-slate-400 px-3 mb-2 tracking-wider uppercase">
            MENU UTAMA
          </div>

          <nav className="space-y-1">
            <button 
              onClick={() => alert('Halaman Dashboard sedang dikembangkan')}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-100 transition"
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </button>
            <button 
              onClick={() => alert('Halaman Pesanan sedang dikembangkan')}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-100 transition"
            >
              <ShoppingBag size={18} />
              <span>Manajemen Pesanan</span>
            </button>

            {/* TAB PRODUK & STOK */}
            <button 
              onClick={() => setActiveMenu('produk')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold rounded-lg transition ${
                activeMenu === 'produk' 
                  ? 'bg-[#0052CC] text-white shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Package size={18} />
              <span>Produk & Stok</span>
            </button>

            {/* TAB MONITORING PENGANTARAN */}
            <button 
              onClick={() => setActiveMenu('monitoring')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold rounded-lg transition ${
                activeMenu === 'monitoring' 
                  ? 'bg-[#0052CC] text-white shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Truck size={18} />
              <span>Monitoring Pengantaran</span>
            </button>

            <button 
              onClick={() => alert('Halaman Laporan Keuangan sedang dikembangkan')}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-100 transition"
            >
              <PieChart size={18} />
              <span>Laporan Keuangan</span>
            </button>
          </nav>
        </div>

        {/* User Profile */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between px-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#0052CC]/10 text-[#0052CC] flex items-center justify-center font-bold text-xs">
              BS
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 leading-tight">Budi Santoso</p>
              <p className="text-[10px] text-slate-400 font-medium">Super Admin</p>
            </div>
          </div>
          <button 
            onClick={() => confirm('Apakah Anda yakin ingin keluar?')} 
            className="text-slate-400 hover:text-red-500 p-1 transition"
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* TOP NAVBAR */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-10">
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Cari pesanan, resi, kurir, produk..." 
              className="w-full pl-9 pr-4 py-1.5 bg-slate-100 text-xs rounded-lg border-none focus:ring-2 focus:ring-[#0052CC] focus:bg-white transition"
            />
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-xs font-medium text-slate-600 rounded-lg hover:bg-slate-200 transition">
              <Calendar size={14} />
              <span>Hari Ini, 24 Mei</span>
            </button>
            <button className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 relative transition">
              <Bell size={16} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0052CC] hover:bg-[#0043A8] text-white text-xs font-semibold rounded-lg shadow-sm transition"
            >
              <Plus size={16} />
              <span>+ Buat Pesanan</span>
            </button>
          </div>
        </header>

        {/* Dynamic Content Switching */}
        <div className="p-6 space-y-6">
          {activeMenu === 'produk' ? (
            /* ======================================================== */
            /* TAMPILAN 1: PRODUK & STOK GALON                          */
            /* ======================================================== */
            <>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#0052CC] uppercase tracking-wider mb-1">
                    <span>LOGISTIK & INVENTARIS DEPO</span>
                    <span>•</span>
                    <span>PRODUK & STOK</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Produk & Stok Galon</h2>
                  <p className="text-xs text-slate-500 mt-0.5 max-w-xl">
                    Monitoring stok fisik air minum galon, inventaris botol kosong, dan penyesuaian harga jual.
                  </p>
                </div>

                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#0052CC] hover:bg-[#0043A8] text-white text-xs font-semibold rounded-lg shadow-sm transition"
                >
                  <Plus size={16} />
                  <span>+ Tambah Produk Baru</span>
                </button>
              </div>

              {/* STATS CARDS PRODUK */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-400">TOTAL READY STOCK</p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-2xl font-extrabold text-slate-900">85</span>
                      <span className="text-xs font-semibold text-slate-600">Galon</span>
                    </div>
                    <p className="text-[11px] text-emerald-600 font-semibold mt-1">Aman 100% untuk 3 hari</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0052CC] flex items-center justify-center">
                    <Package size={20} />
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-400">GALON KOSONG (RETUR)</p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-2xl font-extrabold text-slate-900">42</span>
                      <span className="text-xs font-semibold text-slate-600">Botol Kosong</span>
                    </div>
                    <p className="text-[11px] text-blue-600 font-semibold mt-1">Siap tukar isi ulang pabrik</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                    <RefreshCw size={20} />
                  </div>
                </div>

                <div className="bg-[#FFF5F5] p-4 rounded-xl border border-red-200 shadow-xs flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-red-500">STOK KRITIS (WAJIB RESTOK)</p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-2xl font-extrabold text-red-600">2</span>
                      <span className="text-xs font-semibold text-red-600">Varian</span>
                    </div>
                    <p className="text-[11px] text-red-500 font-semibold mt-1">⚠️ Club & Vit &lt; 15 Unit</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                    <AlertTriangle size={20} />
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-400">TOTAL NILAISTOK DEPO</p>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-2xl font-extrabold text-slate-900">Rp 1.620.000</span>
                    </div>
                    <p className="text-[11px] text-emerald-600 font-semibold mt-1">▲ +12.3% dari Mgg lalu</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <PieChart size={20} />
                  </div>
                </div>
              </div>

              {/* SEARCH & TABS PRODUK */}
              <div className="flex items-center justify-between pt-2">
                <div className="relative w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input 
                    type="text" 
                    value={searchProduk}
                    onChange={(e) => setSearchProduk(e.target.value)}
                    placeholder="Cari merk galon, ukuran, SKU..." 
                    className="w-full pl-8 pr-3 py-1.5 bg-white text-xs rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#0052CC]"
                  />
                </div>

                <div className="flex items-center gap-1.5 bg-slate-200/60 p-1 rounded-lg text-xs font-semibold">
                  {['semua', 'ready', 'kritis', 'habis'].map((tab) => (
                    <button 
                      key={tab}
                      onClick={() => setProdukTab(tab)}
                      className={`px-3 py-1 rounded-md transition capitalize ${
                        produkTab === tab ? 'bg-[#0052CC] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {tab === 'semua' ? 'Semua Produk (4)' : tab === 'ready' ? 'Ready Stok (2)' : tab === 'kritis' ? 'Stok Kritis (2)' : 'Paling Laris (0)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* TABEL INVENTARIS DEPO AKTIF */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Package size={16} className="text-[#0052CC]" />
                    Daftar Inventaris Depo Aktif
                  </h3>
                  <span className="text-xs text-slate-400">Terakhir diupdate: 10 menit yang lalu</span>
                </div>

                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">PRODUK & KATEGORI</th>
                      <th className="py-3 px-4">SKU / TYPE</th>
                      <th className="py-3 px-4">HARGA JUAL</th>
                      <th className="py-3 px-4">HARGA MODAL</th>
                      <th className="py-3 px-4">STOK FISIK SIAP KIRIM</th>
                      <th className="py-3 px-4">BOTOL KOSONG</th>
                      <th className="py-3 px-4 text-center">STATUS</th>
                      <th className="py-3 px-4 text-center">AKSI</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {/* Row Aqua */}
                    <tr className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center font-bold text-[#0052CC]">💧</div>
                        <div>
                          <div className="font-bold text-slate-800">Aqua 19L (Isi Ulang)</div>
                          <div className="text-[10px] text-slate-400">Air Mineral - Pt. Aqua Golden Mississippi</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-500">GLN-AQU-19L</td>
                      <td className="py-3 px-4 font-bold text-slate-900">Rp 20.000 <Edit2 size={12} className="inline text-slate-400 cursor-pointer hover:text-blue-600" /></td>
                      <td className="py-3 px-4 text-slate-500">Rp 14.500</td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-800">35 Galon (70%)</div>
                        <div className="w-24 bg-slate-100 h-1.5 rounded-full mt-1 overflow-hidden">
                          <div className="bg-emerald-500 h-full w-[70%]"></div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-700">15 Botol</td>
                      <td className="py-3 px-4 text-center">
                        <span className="bg-emerald-50 text-emerald-600 font-bold text-[10px] px-2 py-0.5 rounded-full">✓ Tersedia</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button onClick={() => alert('Fitur Edit Produk')} className="px-2.5 py-1 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-md font-semibold text-[11px]">Tindakan ⚙️</button>
                      </td>
                    </tr>

                    {/* Row Le Minerale */}
                    <tr className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <div className="w-10 h-10 bg-cyan-50 rounded-lg flex items-center justify-center font-bold text-cyan-600">💧</div>
                        <div>
                          <div className="font-bold text-slate-800">Le Minerale 15L (Sekali Pakai)</div>
                          <div className="text-[10px] text-slate-400">Galon Sekali Pakai - Mayora</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-500">GLN-LMN-15L</td>
                      <td className="py-3 px-4 font-bold text-slate-900">Rp 22.000 <Edit2 size={12} className="inline text-slate-400 cursor-pointer hover:text-blue-600" /></td>
                      <td className="py-3 px-4 text-slate-500">Rp 16.000</td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-800">30 Galon (60%)</div>
                        <div className="w-24 bg-slate-100 h-1.5 rounded-full mt-1 overflow-hidden">
                          <div className="bg-emerald-500 h-full w-[60%]"></div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-400">-</td>
                      <td className="py-3 px-4 text-center">
                        <span className="bg-emerald-50 text-emerald-600 font-bold text-[10px] px-2 py-0.5 rounded-full">✓ Tersedia</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button onClick={() => alert('Fitur Edit Produk')} className="px-2.5 py-1 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-md font-semibold text-[11px]">Tindakan ⚙️</button>
                      </td>
                    </tr>

                    {/* Row Club */}
                    <tr className="hover:bg-slate-50/80 transition bg-red-50/30">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center font-bold text-red-600">💧</div>
                        <div>
                          <div className="font-bold text-slate-800">Club 19L (Isi Ulang)</div>
                          <div className="text-[10px] text-slate-400">Air Mineral - Indofood Sukses Makmur</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-500">GLN-CLB-19L</td>
                      <td className="py-3 px-4 font-bold text-slate-900">Rp 16.000 <Edit2 size={12} className="inline text-slate-400 cursor-pointer hover:text-blue-600" /></td>
                      <td className="py-3 px-4 text-slate-500">Rp 11.500</td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-red-600">12 Galon (24%)</div>
                        <div className="w-24 bg-slate-100 h-1.5 rounded-full mt-1 overflow-hidden">
                          <div className="bg-red-500 h-full w-[24%]"></div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-700">15 Botol</td>
                      <td className="py-3 px-4 text-center">
                        <span className="bg-red-100 text-red-600 font-bold text-[10px] px-2 py-0.5 rounded-full">⚠️ Stok Kritis</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button onClick={() => alert('Restok Produk')} className="px-2.5 py-1 bg-red-600 text-white hover:bg-red-700 rounded-md font-semibold text-[11px]">Restok 🚨</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            /* ======================================================== */
            /* TAMPILAN 2: MONITORING PENGANTARAN                       */
            /* ======================================================== */
            <>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#0052CC] uppercase tracking-wider mb-1">
                    <Truck size={13} />
                    <span>FLEET LOGISTICS & LIVE DISPATCH</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Monitoring Pengantaran</h2>
                  <p className="text-xs text-slate-500 mt-0.5 max-w-xl">
                    Pelacakan armada kurir motor, status pengiriman pesanan, dan efisiensi rute depo secara langsung.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="bg-slate-200/60 p-0.5 rounded-lg flex text-xs font-semibold">
                    <button 
                      onClick={() => setViewMode('daftar')}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-md transition ${
                        viewMode === 'daftar' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <List size={14} />
                      <span>Daftar</span>
                    </button>
                    <button 
                      onClick={() => setViewMode('peta')}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-md transition ${
                        viewMode === 'peta' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <Map size={14} />
                      <span>Live Peta</span>
                    </button>
                  </div>
                  <button onClick={() => alert('Memperbarui data...')} className="p-2 border border-slate-200 bg-white rounded-lg text-slate-500 hover:bg-slate-50">
                    <RotateCw size={14} />
                  </button>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-[#0052CC] hover:bg-[#0043A8] text-white text-xs font-semibold rounded-lg shadow-sm"
                  >
                    <UserPlus size={14} />
                    <span>+ Tambah Armada Kurir</span>
                  </button>
                </div>
              </div>

              {/* CARDS MONITORING STATS */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-400">Total Armada</p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-2xl font-extrabold text-slate-900">6</span>
                      <span className="text-xs font-semibold text-slate-600">Kurir Motor</span>
                    </div>
                    <p className="text-[11px] text-emerald-600 font-semibold mt-1">▲ Kapasitas 100% Siaga</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0052CC] flex items-center justify-center">
                    <Truck size={20} />
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-400">Sedang Mengantar</p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-2xl font-extrabold text-slate-900">4</span>
                      <span className="text-xs font-semibold text-slate-600">Kurir di Jalan</span>
                    </div>
                    <p className="text-[11px] text-blue-600 font-semibold mt-1">• 11 Galon Sedang Dikirim</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                    <Truck size={20} />
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-400">Standby Depo</p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-2xl font-extrabold text-slate-900">2</span>
                      <span className="text-xs font-semibold text-slate-600">Siap Muat Kirim</span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-semibold mt-1">🕒 Idle &lt; 8 Menit</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 size={20} />
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-400">Rata-rata Waktu</p>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-2xl font-extrabold text-slate-900">18</span>
                      <span className="text-xs font-semibold text-slate-600">Menit / Pesanan</span>
                    </div>
                    <p className="text-[11px] text-blue-600 font-semibold mt-1">📉 3.2 mnt lebih cepat dr SLA</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0052CC] flex items-center justify-center">
                    <Clock size={20} />
                  </div>
                </div>
              </div>

              {/* GRID KURIR & TABEL */}
              <div className="grid grid-cols-12 gap-6 items-start">
                <div className="col-span-5 space-y-4">
                  <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                    <Truck size={16} className="text-[#0052CC]" />
                    Kurir Lapangan (4/6 Bergerak)
                  </h3>

                  {/* Card Kurir Budi */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Pak Budi Santoso</h4>
                        <p className="text-xs text-slate-400">Honda Beat • B 4120 SZX</p>
                      </div>
                      <span className="bg-sky-50 text-sky-600 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></span>
                        Di Jalan
                      </span>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-lg text-xs space-y-1">
                      <div className="flex justify-between font-semibold">
                        <span className="text-slate-500">Tugas Saat Ini</span>
                        <span className="text-[#0052CC]">#ORD-8821</span>
                      </div>
                      <p className="text-slate-700 font-medium">Membawa 3 Galon Aqua ke Jl. Mawar No. 12</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button onClick={() => alert('Menghubungi Pak Budi: 0812-xxxx-xxxx')} className="flex items-center justify-center gap-1 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50">
                        <Phone size={13} /> Hubungi
                      </button>
                      <button onClick={() => setViewMode('peta')} className="flex items-center justify-center gap-1 px-3 py-1.5 bg-blue-50 text-[#0052CC] rounded-lg text-xs font-semibold hover:bg-blue-100">
                        <Eye size={13} /> Pantau Rute
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-span-7 bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
                  <div className="p-4 border-b border-slate-100">
                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <List size={16} className="text-[#0052CC]" />
                      Tabel Pengantaran Aktif
                    </h3>
                  </div>

                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="py-3 px-4">NO. ORDER</th>
                        <th className="py-3 px-4">KURIR</th>
                        <th className="py-3 px-4">MUATAN</th>
                        <th className="py-3 px-4 text-center">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="py-3 px-4 font-bold text-[#0052CC]">#ORD-8821</td>
                        <td className="py-3 px-4 font-semibold">Pak Budi</td>
                        <td className="py-3 px-4">3 Galon Aqua</td>
                        <td className="py-3 px-4 text-center">
                          <span className="bg-sky-50 text-sky-600 font-bold text-[10px] px-2 py-0.5 rounded-full">Diantar</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* POPUP MODAL (DAPAT DIPANGGIL DARI SETIAP TOMBOL) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">Aksi Baru / Buat Pesanan</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>
            
            <p className="text-xs text-slate-500">
              Silakan pilih opsi aksi untuk mengelola produk atau membuat transaksi baru secara manual.
            </p>

            <div className="space-y-2">
              <button onClick={() => { alert('Membuka Form Tambah Produk'); setIsModalOpen(false); }} className="w-full p-3 text-left border border-slate-200 hover:border-[#0052CC] rounded-xl hover:bg-blue-50/50 transition">
                <div className="font-bold text-xs text-slate-800">Tambah Produk / Varian Baru</div>
                <div className="text-[10px] text-slate-400">Masukkan merk galon, stok awal, dan harga jual</div>
              </button>
              <button onClick={() => { alert('Membuka Form Pesanan Manual'); setIsModalOpen(false); }} className="w-full p-3 text-left border border-slate-200 hover:border-[#0052CC] rounded-xl hover:bg-blue-50/50 transition">
                <div className="font-bold text-xs text-slate-800">Input Pesanan Manual</div>
                <div className="text-[10px] text-slate-400">Buat transaksi pelanggan yang memesan via WhatsApp/Telp</div>
              </button>
            </div>

            <button 
              onClick={() => setIsModalOpen(false)} 
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl"
            >
              Batal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}