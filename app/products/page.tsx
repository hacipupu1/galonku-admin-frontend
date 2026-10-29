'use client';

import React, { useState } from 'react';
import {
  Plus,
  Search,
  Edit3,
  Printer,
  Droplets,
  RefreshCw,
  AlertTriangle,
  Wallet,
  X,
  Truck,
  ArrowRight,
} from 'lucide-react';

// Sub-komponen Thumbnail Gambar Galon dengan Fallback Error Handling
function ProductThumb({ src, alt, fallbackText }: { src: string; alt: string; fallbackText: string }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 p-1 flex items-center justify-center shrink-0 shadow-sm">
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          className="max-h-full max-w-full object-contain"
          onError={() => setHasError(true)}
        />
      ) : (
        <span className="font-bold text-[9px] text-blue-600 uppercase">{fallbackText}</span>
      )}
    </div>
  );
}

export default function ProdukStokPage() {
  // DATA MOCK PRODUK & STOK GALON
  const [products, setProducts] = useState([
    {
      id: '1',
      name: 'Aqua 19 Liter Refill',
      desc: 'Air Mineral Pegunungan Alami',
      sku: 'GLN-AQU-19L',
      type: 'Galon Tukar Refill',
      category: 'refill',
      sellPrice: 18000,
      costPrice: 14200,
      stock: 35,
      maxStock: 50,
      stockPercent: 70,
      stockLabel: 'Aman (70%)',
      emptyBottles: 18,
      status: 'tersedia',
      image: '/aqua.png',
      fallback: 'Aqua',
    },
    {
      id: '2',
      name: 'Le Minerale 15L',
      desc: 'Galon Sekali Pakai Tanpa Tukar',
      sku: 'GLN-LMN-15L',
      type: 'Bebas BPA / Sekali Pakai',
      category: 'sekalipakai',
      sellPrice: 17000,
      costPrice: 13800,
      stock: 25,
      maxStock: 50,
      stockPercent: 50,
      stockLabel: 'Optimal (50%)',
      emptyBottles: 0,
      status: 'tersedia',
      image: '/leminerale.png',
      fallback: 'Le M',
    },
    {
      id: '3',
      name: 'Cleo 19L',
      desc: 'Pure Water Demineral 0 ppm',
      sku: 'GLN-CLE-19L',
      type: 'Galon Tukar Refill',
      category: 'refill',
      sellPrice: 16500,
      costPrice: 13000,
      stock: 15,
      maxStock: 50,
      stockPercent: 30,
      stockLabel: 'Menipis (30%)',
      emptyBottles: 14,
      status: 'kritis',
      image: '/cleo.png',
      fallback: 'Cleo',
    },
    {
      id: '4',
      name: 'Vit 19L',
      desc: 'Air Mineral Higienis Terjangkau',
      sku: 'GLN-VIT-19L',
      type: 'Galon Tukar Refill',
      category: 'refill',
      sellPrice: 15000,
      costPrice: 11500,
      stock: 10,
      maxStock: 50,
      stockPercent: 20,
      stockLabel: 'Sisa 20%',
      emptyBottles: 10,
      status: 'kritis',
      image: '/vit.png',
      fallback: 'Vit',
    },
  ]);

  // STATE INTERAKTIF
  const [activeCategory, setActiveCategory] = useState<'semua' | 'refill' | 'sekalipakai' | 'restok'>('semua');
  const [searchQuery, setSearchQuery] = useState('');
  
  // MODAL STATES
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isSuratJalanOpen, setIsSuratJalanOpen] = useState(false);
  const [isManifestOpen, setIsManifestOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // HANDLER UPDATE STOK & HARGA
  const [editStock, setEditStock] = useState<number>(0);
  const [editPrice, setEditPrice] = useState<number>(0);

  const handleOpenUpdate = (product: any) => {
    setSelectedProduct(product);
    setEditStock(product.stock);
    setEditPrice(product.sellPrice);
    setIsUpdateModalOpen(true);
  };

  const handleSaveUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === selectedProduct.id) {
          const newPercent = Math.round((editStock / p.maxStock) * 100);
          const newStatus = editStock <= 15 ? 'kritis' : 'tersedia';
          return {
            ...p,
            stock: editStock,
            sellPrice: editPrice,
            stockPercent: newPercent,
            stockLabel: `${newPercent > 50 ? 'Aman' : newPercent > 25 ? 'Menipis' : 'Sisa'} (${newPercent}%)`,
            status: newStatus,
          };
        }
        return p;
      })
    );
    setIsUpdateModalOpen(false);
    alert(`Data ${selectedProduct.name} berhasil diperbarui!`);
  };

  // FILTERING DATA
  const filteredProducts = products.filter((item) => {
    let matchCategory = true;
    if (activeCategory === 'refill') matchCategory = item.category === 'refill';
    if (activeCategory === 'sekalipakai') matchCategory = item.category === 'sekalipakai';
    if (activeCategory === 'restok') matchCategory = item.status === 'kritis';

    const matchSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <main className="w-full bg-[#F8FAFC] min-h-screen p-6 pt-4 font-sans text-slate-800">
      
      {/* 1. HEADER HALAMAN (TERKUNCI SAMA DENGAN HALAMAN LAIN) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="text-[11px] font-bold text-blue-600 uppercase tracking-wider mb-0.5 h-4 flex items-center gap-1.5">
            <span>LOGISTIK &amp; GUDANG DEPO / PRODUK &amp; STOK</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight leading-tight">
            Produk &amp; Stok Galon
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitoring ketersediaan pasokan galon, inventaris botol kosong, dan penyesuaian harga jual.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2 transition active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Produk Baru</span>
          </button>
        </div>
      </div>

      {/* 2. TOP 4 KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        
        {/* Card 1: Total Galon Terisi */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">TOTAL GALON TERISI</span>
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                <Droplets className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-slate-900">85</span>
              <span className="text-xs font-medium text-slate-500">Galon</span>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Aqua: 35 • Le Min: 25</span>
            <span className="font-semibold text-slate-700">Cleo: 15 • Vit: 10</span>
          </div>
        </div>

        {/* Card 2: Stok Galon Kosong */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">STOK GALON KOSONG</span>
              <div className="p-2.5 bg-teal-50 text-teal-600 rounded-xl">
                <RefreshCw className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-slate-900">42</span>
              <span className="text-xs font-medium text-slate-500">Galon Kosong</span>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Pool siap tukar pabrik</span>
            <span className="text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md font-semibold">Tersortir Baik</span>
          </div>
        </div>

        {/* Card 3: Stok Kritis / Menipis */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">STOK KRITIS / MENIPIS</span>
              <div className="p-2.5 bg-red-50 text-red-600 rounded-xl">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-red-600">2</span>
              <span className="text-xs font-semibold text-slate-600">Varian</span>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-red-600 font-medium">Vit 19L &amp; Cleo 19L</span>
            <span className="text-red-600 bg-red-50 px-2 py-0.5 rounded-md font-semibold">Perlu PO</span>
          </div>
        </div>

        {/* Card 4: Total Nilai Inventaris */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">TOTAL NILAI INVENTARIS</span>
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                <Wallet className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-1">
              <span className="text-2xl font-bold text-slate-900">Rp 1.620.000</span>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Modal: Rp 1.258.000</span>
            <span className="text-emerald-600 font-bold">+22.3% Margin</span>
          </div>
        </div>

      </div>

      {/* 3. BARIS PENCARIAN & FILTER KATEGORI */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        
        {/* Input Cari */}
        <div className="relative min-w-[280px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari merk galon, ukuran, SKU..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-blue-500 shadow-sm"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        {/* Tabs Filter Kategori */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs font-semibold text-slate-500 mr-1 whitespace-nowrap">Filter Kategori:</span>
          
          <button
            type="button"
            onClick={() => setActiveCategory('semua')}
            className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition cursor-pointer whitespace-nowrap ${
              activeCategory === 'semua'
                ? 'bg-[#2563EB] text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Semua Produk ({products.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory('refill')}
            className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition cursor-pointer whitespace-nowrap ${
              activeCategory === 'refill'
                ? 'bg-[#2563EB] text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Refill 19L (3)
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory('sekalipakai')}
            className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition cursor-pointer whitespace-nowrap ${
              activeCategory === 'sekalipakai'
                ? 'bg-[#2563EB] text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Sekali Pakai (1)
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory('restok')}
            className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition cursor-pointer whitespace-nowrap ${
              activeCategory === 'restok'
                ? 'bg-[#2563EB] text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Perlu Restok (2)
          </button>
        </div>

      </div>

      {/* 4. TABEL DAFTAR INVENTARIS DEPO AKTIF (DENGAN REVISI PRESISI) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
        
        {/* Table Sub-Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <h2 className="font-bold text-slate-900 text-sm">Daftar Inventaris Depo Aktif</h2>
            <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
              Live Sync Terkini
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            Update otomatis setiap pesanan kurir diselesaikan
          </span>
        </div>

        {/* Table Data */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-5">PRODUK &amp; VARIAN</th>
                <th className="py-3 px-5 whitespace-nowrap">SKU / TIPE</th>
                <th className="py-3 px-5 whitespace-nowrap">HARGA JUAL</th>
                <th className="py-3 px-5 whitespace-nowrap">HARGA MODAL</th>
                <th className="py-3 px-5 whitespace-nowrap">STOK TERISI (DEPO)</th>
                <th className="py-3 px-5 text-center whitespace-nowrap">BOTOL KOSONG</th>
                <th className="py-3 px-5 text-center whitespace-nowrap">STATUS</th>
                <th className="py-3 px-5 text-center whitespace-nowrap">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition">
                    
                    {/* PRODUK & VARIAN */}
                    <td className="py-4 px-5 align-top">
                      <div className="flex items-center gap-3">
                        <ProductThumb src={item.image} alt={item.name} fallbackText={item.fallback} />
                        <div>
                          <h4 className="font-bold text-slate-900">{item.name}</h4>
                          <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    </td>

                    {/* SKU / TIPE (DIBUAT PREISI TANPA PENGULANGAN TURUN TEKS) */}
                    <td className="py-4 px-5 align-top whitespace-nowrap">
                      <span className="font-bold text-slate-800 block text-[11px]">{item.sku}</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{item.type}</span>
                    </td>

                    {/* HARGA JUAL (SEJAJAR Rp 18.000 DENGAN WHITESPACE-NOWRAP) */}
                    <td className="py-4 px-5 align-top font-bold text-slate-900 whitespace-nowrap">
                      Rp {item.sellPrice.toLocaleString('id-ID')}
                    </td>

                    {/* HARGA MODAL (SEJAJAR Rp 14.200 DENGAN WHITESPACE-NOWRAP) */}
                    <td className="py-4 px-5 align-top text-slate-500 font-medium whitespace-nowrap">
                      Rp {item.costPrice.toLocaleString('id-ID')}
                    </td>

                    {/* STOK TERISI */}
                    <td className="py-4 px-5 align-top whitespace-nowrap">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-slate-900">{item.stock} Unit</span>
                        <span
                          className={`text-[10px] font-semibold ${
                            item.stockPercent <= 30 ? 'text-red-600' : 'text-emerald-600'
                          }`}
                        >
                          {item.stockLabel}
                        </span>
                      </div>
                      <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            item.stockPercent <= 30 ? 'bg-red-500' : item.stockPercent <= 50 ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${item.stockPercent}%` }}
                        ></div>
                      </div>
                    </td>

                    {/* BOTOL KOSONG */}
                    <td className="py-4 px-5 align-top text-center whitespace-nowrap">
                      {item.emptyBottles > 0 ? (
                        <span className="inline-block px-2.5 py-1 bg-slate-100 rounded-lg font-bold text-slate-800 text-[11px]">
                          {item.emptyBottles} Botol
                        </span>
                      ) : (
                        <span className="text-slate-300 italic text-[11px]">-- (Non-Refill)</span>
                      )}
                    </td>

                    {/* STATUS DEPO (DIPERKECIL DENGAN text-[9px] LEBIH RAMPING) */}
                    <td className="py-4 px-5 align-top text-center whitespace-nowrap">
                      {item.status === 'tersedia' ? (
                        <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Tersedia
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[9px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Stok Kritis
                        </span>
                      )}
                    </td>

                    {/* AKSI (CUMA TOMBOL PENSIL BISA DIKLIK TANPA TULISAN UPDATE) */}
                    <td className="py-4 px-5 align-top text-center whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleOpenUpdate(item)}
                        title="Edit Produk &amp; Stok"
                        className="p-2 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 rounded-xl transition cursor-pointer inline-flex items-center justify-center border border-slate-200"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400 font-medium">
                    Tidak ada produk galon yang sesuai dengan pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div>
            Menampilkan <strong className="text-slate-800">{filteredProducts.length}</strong> dari{' '}
            <strong className="text-slate-800">{products.length}</strong> varian produk galon depo
          </div>
          <div className="font-semibold text-slate-700">
            Estimasi Omset Hari Ini: <strong className="text-blue-600 text-sm font-bold">Rp 1.442.500</strong>
          </div>
        </div>

      </div>

      {/* 5. BOTTOM SECTION: 2 COLUMNS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* LEFT COLUMN: RIWAYAT & JADWAL KIRIM RESTOK PABRIK */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-sm">Riwayat &amp; Jadwal Kirim Restok Pabrik</h3>
              </div>
              <button type="button" className="text-xs font-semibold text-blue-600 hover:underline">
                Lihat Semua PO
              </button>
            </div>

            <div className="space-y-3 text-xs">
              
              {/* Item 1: Danone Aqua */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">Pabrik PT Danone Aqua Pulogadung</span>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                      Dalam Pengiriman
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Truk Hino B-9142-SDA • Muatan: 50 Galon Aqua 19L • Tukar 50 Galon Kosong
                  </p>
                </div>
                <div className="text-left sm:text-right shrink-0">
                  <span className="font-bold text-slate-800 block text-[11px]">ETA: Hari ini, 15:30 WIB</span>
                  <span className="text-[10px] text-slate-400 block">Supir: Pak Wawan (+62 813-8812)</span>
                </div>
              </div>

              {/* Item 2: Sariguna Primatirta */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">Pabrik Sariguna Primatirta (Cleo)</span>
                    <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md">
                      PO Kritis #PO-882
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Permintaan Restok: 30 Galon Cleo 19L • Depo butuh percepatan
                  </p>
                </div>
                <div className="text-left sm:text-right shrink-0">
                  <span className="font-bold text-slate-800 block text-[11px]">Jadwal: Besok, 09:00 WIB</span>
                  <button
                    type="button"
                    onClick={() => alert('Menghubungi Sales Cleo...')}
                    className="text-[10px] text-blue-600 font-semibold hover:underline block"
                  >
                    Follow-up Sales
                  </button>
                </div>
              </div>

              {/* Item 3: Mayora Le Minerale */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">Distributor Mayora Le Minerale</span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                      Selesai Bongkar
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Masuk: 40 Galon Baru 15L • Diterima Staff Depo: Riko
                  </p>
                </div>
                <div className="text-left sm:text-right shrink-0">
                  <span className="font-bold text-slate-800 block text-[11px]">Kemarin, 14:10 WIB</span>
                  <span className="text-[10px] text-slate-400 block">Faktur: #INV-LMN-9921</span>
                </div>
              </div>

            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <span className="text-slate-400 text-[11px]">
              Supplier resmi Danone, Mayora, Tirta Sariguna terverifikasi.
            </span>
            <button
              type="button"
              onClick={() => setIsSuratJalanOpen(true)}
              className="text-blue-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Buat Surat Jalan Restok</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: STATUS GALON KOSONG */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-teal-600" />
                <h3 className="font-bold text-slate-900 text-sm">Status Galon Kosong</h3>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>

            <div className="mt-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-500 font-medium">Total Botol di Depo:</span>
                <strong className="text-slate-900 font-bold text-sm">42 Botol</strong>
              </div>

              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex mb-2">
                <div className="h-full bg-emerald-500" style={{ width: '80%' }}></div>
                <div className="h-full bg-red-500" style={{ width: '20%' }}></div>
              </div>

              <div className="flex items-center justify-between text-[10px] font-semibold mb-4">
                <span className="text-emerald-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 34 Siap Tukar
                </span>
                <span className="text-red-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> 8 Afkir / Rusak
                </span>
              </div>

              <div className="space-y-2 border-t border-slate-100 pt-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Aqua 19L Kosong</span>
                  <strong className="text-slate-900 font-bold">18 Galon</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Cleo 19L Kosong</span>
                  <strong className="text-slate-900 font-bold">14 Galon</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Vit 19L Kosong</span>
                  <strong className="text-slate-900 font-bold">10 Galon</strong>
                </div>
              </div>

              <div className="mt-4 p-2.5 bg-red-50/60 rounded-xl border border-red-100 flex items-center justify-between text-xs">
                <div>
                  <h5 className="font-bold text-red-700 text-[11px]">Klaim Garansi Retur Bocor</h5>
                  <p className="text-[10px] text-red-500">Proses penggantian ke pabrik</p>
                </div>
                <span className="text-[10px] font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-md">
                  3 Galon Diajukan
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsManifestOpen(true)}
            className="w-full mt-5 bg-[#EEF2FF] hover:bg-blue-100 text-blue-700 text-xs font-bold py-2.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Manifest Galon Tukar</span>
          </button>
        </div>

      </div>

      {/* MODAL EDIT PRODUK & STOK */}
      {isUpdateModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-slate-900 text-base">
                Edit Produk &amp; Stok {selectedProduct.name}
              </h3>
              <button
                type="button"
                onClick={() => setIsUpdateModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveUpdate} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Stok Terisi saat ini (Unit)</label>
                <input
                  type="number"
                  value={editStock}
                  onChange={(e) => setEditStock(Number(e.target.value))}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500 font-bold"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Harga Jual (Rp)</label>
                <input
                  type="number"
                  value={editPrice}
                  onChange={(e) => setEditPrice(Number(e.target.value))}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500 font-bold"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUpdateModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-sm cursor-pointer"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL TAMBAH PRODUK BARU */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-slate-900 text-base">Tambah Produk Galon Baru</h3>
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
                alert('Produk baru berhasil ditambahkan!');
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Produk &amp; Ukuran</label>
                <input
                  type="text"
                  placeholder="Contoh: Pristine 8+ 19L"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">SKU Produksi</label>
                <input
                  type="text"
                  placeholder="GLN-PRS-19L"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Harga Modal (Rp)</label>
                  <input
                    type="number"
                    placeholder="13000"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Harga Jual (Rp)</label>
                  <input
                    type="number"
                    placeholder="17000"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
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
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-sm cursor-pointer"
                >
                  Tambah Produk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL SURAT JALAN RESTOK */}
      {isSuratJalanOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-slate-900 text-base">Buat Surat Jalan Restok Pabrik</h3>
              <button
                type="button"
                onClick={() => setIsSuratJalanOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsSuratJalanOpen(false);
                alert('Surat jalan restok berhasil dibuat!');
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">Pilih Pabrik / Supplier</label>
                <select className="w-full border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500">
                  <option value="danone">PT Danone Aqua Pulogadung</option>
                  <option value="cleo">PT Sariguna Primatirta (Cleo)</option>
                  <option value="mayora">Distributor Mayora Le Minerale</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Jumlah Botol Kosong Dibawa</label>
                <input
                  type="number"
                  defaultValue={34}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsSuratJalanOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-sm cursor-pointer"
                >
                  Cetak Surat Jalan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL CETAK MANIFEST */}
      {isManifestOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-slate-900 text-base">Manifest Galon Tukar Depo</h3>
              <button
                type="button"
                onClick={() => setIsManifestOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs mb-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Siap Tukar:</span>
                  <strong className="text-emerald-600 font-bold">34 Botol</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Afkir / Bocor:</span>
                  <strong className="text-red-600 font-bold">8 Botol</strong>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-1 mt-1">
                  <span className="font-bold text-slate-800">Total Pool Kosong:</span>
                  <strong className="text-slate-900 font-bold">42 Botol</strong>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => setIsManifestOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsManifestOpen(false);
                  alert('Manifest berhasil dicetak ke printer!');
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}