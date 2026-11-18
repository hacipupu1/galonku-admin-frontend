'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Droplets,
  RefreshCw,
  AlertTriangle,
  WalletCards,
  Search,
  X,
  Clock,
  Truck,
  Package,
  CheckCircle2,
  Printer,
  Plus,
  FileText,
  PhoneCall,
  Boxes,
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface ProductUI {
  id: string | number;
  nama: string;
  deskripsi: string;
  sku: string;
  tipe: string;
  hargaJual: number;
  hargaModal: number;
  stokTerisi: number;
  maxCapacity: number;
  stokStatusText: string;
  stokColorPct: string;
  stokBarClass: string;
  botolKosongCount: number;
  isSekaliPakai: boolean;
  status: 'Tersedia' | 'Stok Kritis';
  typeStatus: 'tersedia' | 'kritis';
  image: string;
}

interface PurchaseOrder {
  id: string;
  supplier: string;
  status: 'Dalam Pengiriman' | 'PO Kritis' | 'Selesai Diterima';
  badgeText: string;
  detail: string;
  eta: string;
  subInfo: string;
  productKeyword: string;
  qtyRestok: number;
  followedUp?: boolean;
}

interface EmptyBottleItem {
  id: string;
  label: string;
  count: number;
}

const INITIAL_POS: PurchaseOrder[] = [
  {
    id: 'PO-883',
    supplier: 'Pabrik PT Danone Aqua Pulogadung',
    status: 'Dalam Pengiriman',
    badgeText: 'Dalam Pengiriman',
    detail: 'Truk Hino B-9142-SDA • Muatan: 50 Galon Aqua 19L • Tukar 50 Galon Kosong',
    eta: 'ETA: Hari ini, 15:30 WIB',
    subInfo: 'Sopir: Pak Winarno (+62 813-8872)',
    productKeyword: 'aqua',
    qtyRestok: 50,
  },
  {
    id: 'PO-882',
    supplier: 'Pabrik Sariguna Primatirta (Cleo)',
    status: 'PO Kritis',
    badgeText: 'PO Kritis #PO-882',
    detail: 'Permintaan Restok: 30 Galon Cleo 19L • Depo butuh percepatan',
    eta: 'Jadwal: Besok, 09:00 WIB',
    subInfo: 'Sales PIC: Pak Hendra',
    productKeyword: 'cleo',
    qtyRestok: 30,
  },
  {
    id: 'PO-881',
    supplier: 'Distributor Mayora Le Minerale',
    status: 'Selesai Diterima',
    badgeText: 'Selesai Diterima',
    detail: 'Masuk: 40 Galon Baru 15L • Diterima Staf Depo: Riko',
    eta: 'Kemarin, 14:10 WIB',
    subInfo: 'Faktur: #INV-LMN-9921',
    productKeyword: 'minerale',
    qtyRestok: 40,
  },
];

const INITIAL_EMPTY_BOTTLES: EmptyBottleItem[] = [
  { id: 'aqua', label: 'Aqua 19L Kosong', count: 18 },
  { id: 'cleo', label: 'Cleo 19L Kosong', count: 14 },
  { id: 'vit', label: 'VIT 19L Kosong', count: 10 },
];

function computeProductFields(
  base: Omit<
    ProductUI,
    'stokStatusText' | 'stokColorPct' | 'stokBarClass' | 'status' | 'typeStatus'
  >
): ProductUI {
  const pct = Math.min(100, Math.round((base.stokTerisi / (base.maxCapacity || 50)) * 100));
  const isKritis = base.stokTerisi <= 15;

  return {
    ...base,
    stokStatusText: isKritis ? `Menipis (${pct}%)` : `Aman (${pct}%)`,
    stokColorPct: `${pct}%`,
    stokBarClass: isKritis
      ? 'bg-[#D93636]'
      : pct >= 70
      ? 'bg-[#28A745]'
      : 'bg-[#087D86]',
    status: isKritis ? 'Stok Kritis' : 'Tersedia',
    typeStatus: isKritis ? 'kritis' : 'tersedia',
  };
}

function getShortBrand(nama: string): string {
  const cleaned = nama.replace(/^galon\s+/i, '').trim();
  if (cleaned.toLowerCase().startsWith('le minerale')) return 'Le Minerale';
  return cleaned.split(' ')[0] || nama;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductUI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'semua' | 'refill' | 'sekalipakai' | 'kritis'>('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [savingId, setSavingId] = useState<string | number | null>(null);

  // Modal Update Produk (Stok, Harga Jual, Harga Modal, Botol Kosong)
  const [selectedProduct, setSelectedProduct] = useState<ProductUI | null>(null);
  const [editForm, setEditForm] = useState({
    stokTerisi: 0,
    hargaJual: 0,
    hargaModal: 0,
    botolKosongCount: 0,
  });

  // State PO & Surat Jalan Restok Pabrik
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(INITIAL_POS);
  const [showAllPO, setShowAllPO] = useState(false);
  const [showNewPOModal, setShowNewPOModal] = useState(false);
  const [newPOForm, setNewPOForm] = useState({
    supplier: 'Pabrik PT Danone Aqua Pulogadung',
    productKeyword: 'aqua',
    qtyRestok: 40,
    tukarKosong: 40,
    eta: 'Besok, 10:00 WIB',
    sopir: 'Pak Winarno (+62 813-8872)',
  });

  // State Status Galon Kosong & Manifest
  const [emptyBottles, setEmptyBottles] = useState<EmptyBottleItem[]>(INITIAL_EMPTY_BOTTLES);
  const [damagedCount, setDamagedCount] = useState<number>(8);
  const [warrantyClaimCount, setWarrantyClaimCount] = useState<number>(3);
  const [showManifestModal, setShowManifestModal] = useState<boolean>(false);

  // Toast Feedback
  const [toast, setToast] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        const res = await fetch(`${API_URL}/products`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        const json = await res.json();
        const rawList = Array.isArray(json) ? json : json.data || [];

        const mappedProducts: ProductUI[] = rawList.map((item: any) => {
          const nama: string = item.name || item.nama || 'Produk Galon';
          const isSekaliPakai =
            nama.toLowerCase().includes('le minerale') ||
            nama.includes('15') ||
            (item.type && item.type.toLowerCase().includes('sekali pakai'));

          const tipe =
            item.type || (isSekaliPakai ? 'Bebas BPA / Sekali Pakai' : 'Galon Tukar Refill');

          const deskripsi =
            item.description ||
            (isSekaliPakai
              ? 'Galon Sekali Pakai Tanpa Tukar'
              : 'Air Mineral Pegunungan Alami');

          const sku =
            item.sku ||
            `GLN-${nama.replace(/[^a-zA-Z0-9]/g, '').substring(0, 4).toUpperCase()}-${item.id}`;

          const hargaJual = Number(item.price ?? item.hargaJual ?? 0);
          const hargaModal = Number(item.costPrice ?? item.hargaModal ?? Math.round(hargaJual * 0.8));
          const stokTerisi = Number(item.stock ?? item.stokTerisi ?? 0);
          const maxCapacity = Number(item.maxStock ?? item.max_stock ?? 50);

          const rawImg = item.imageUrl || item.image_url || item.image || '';
          const fullImage = rawImg
            ? rawImg.startsWith('http') || rawImg.startsWith('/')
              ? rawImg
              : `http://localhost:5000/uploads/${rawImg}`
            : '/products/aqua-19l.png';

          return computeProductFields({
            id: item.id,
            nama,
            deskripsi,
            sku,
            tipe,
            hargaJual,
            hargaModal,
            stokTerisi,
            maxCapacity,
            botolKosongCount: isSekaliPakai ? 0 : Math.max(0, maxCapacity - stokTerisi),
            isSekaliPakai,
            image: fullImage,
          });
        });

        setProducts(mappedProducts);
      } catch (error) {
        console.error('Gagal mengambil data produk:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const syncProductToBackend = async (
    id: string | number,
    payload: { price?: number; costPrice?: number; stock?: number }
  ) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        await fetch(`${API_URL}/products/${id}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(payload),
        });
      }
    } catch {
      // Tetap lanjut update state UI jika endpoint berbeda/offline
    }
  };

  const openUpdateModal = (product: ProductUI) => {
    setSelectedProduct(product);
    setEditForm({
      stokTerisi: product.stokTerisi,
      hargaJual: product.hargaJual,
      hargaModal: product.hargaModal,
      botolKosongCount: product.botolKosongCount,
    });
  };

  const handleSaveModalUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    setSavingId(selectedProduct.id);
    const updatedProduct = computeProductFields({
      ...selectedProduct,
      stokTerisi: Math.max(0, Number(editForm.stokTerisi)),
      hargaJual: Math.max(0, Number(editForm.hargaJual)),
      hargaModal: Math.max(0, Number(editForm.hargaModal)),
      botolKosongCount: selectedProduct.isSekaliPakai
        ? 0
        : Math.max(0, Number(editForm.botolKosongCount)),
    });

    setProducts((prev) =>
      prev.map((p) => (p.id === selectedProduct.id ? updatedProduct : p))
    );

    await syncProductToBackend(selectedProduct.id, {
      stock: updatedProduct.stokTerisi,
      price: updatedProduct.hargaJual,
      costPrice: updatedProduct.hargaModal,
    });

    setSavingId(null);
    setSelectedProduct(null);
    showToast(`Inventaris & harga ${updatedProduct.nama} berhasil disimpan`);
  };

  const handleReceivePO = async (po: PurchaseOrder) => {
    setPurchaseOrders((prev) =>
      prev.map((item) =>
        item.id === po.id
          ? {
              ...item,
              status: 'Selesai Diterima',
              badgeText: 'Selesai Diterima',
              eta: 'Baru saja diterima',
            }
          : item
      )
    );

    const targetProduct = products.find((p) =>
      p.nama.toLowerCase().includes(po.productKeyword.toLowerCase())
    );

    if (targetProduct) {
      const nextStock = targetProduct.stokTerisi + po.qtyRestok;
      setProducts((prev) =>
        prev.map((p) =>
          p.id === targetProduct.id
            ? computeProductFields({ ...p, stokTerisi: nextStock })
            : p
        )
      );
      await syncProductToBackend(targetProduct.id, { stock: nextStock });
      showToast(`PO ${po.id} diterima! +${po.qtyRestok} stok ditambahkan ke ${targetProduct.nama}`);
    } else {
      showToast(`PO ${po.id} ditandai selesai diterima`);
    }
  };

  const handleCreateNewPO = (e: React.FormEvent) => {
    e.preventDefault();
    const labelMap: Record<string, string> = {
      aqua: 'Aqua 19L',
      cleo: 'Cleo 19L',
      vit: 'VIT 19L',
      minerale: 'Le Minerale 15L',
    };
    const prodLabel = labelMap[newPOForm.productKeyword] || 'Galon 19L';
    const newId = `PO-${Math.floor(884 + Math.random() * 100)}`;

    const created: PurchaseOrder = {
      id: newId,
      supplier: newPOForm.supplier,
      status: 'Dalam Pengiriman',
      badgeText: `Surat Jalan #${newId}`,
      detail: `Muatan: ${newPOForm.qtyRestok} Galon ${prodLabel} • Tukar ${newPOForm.tukarKosong} Galon Kosong`,
      eta: `ETA: ${newPOForm.eta}`,
      subInfo: `Sopir: ${newPOForm.sopir}`,
      productKeyword: newPOForm.productKeyword,
      qtyRestok: Number(newPOForm.qtyRestok),
    };

    setPurchaseOrders((prev) => [created, ...prev]);
    setShowNewPOModal(false);
    showToast(`Surat Jalan Restok #${newId} berhasil diterbitkan!`);
  };

  const handlePrintManifest = () => {
    const totalSiapTukar = emptyBottles.reduce((s, b) => s + b.count, 0);
    const totalSemua = totalSiapTukar + damagedCount;
    const tanggalCetak = new Date().toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const printWin = window.open('', '_blank', 'width=820,height=700');
    if (!printWin) {
      window.print();
      return;
    }

    printWin.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Manifest Galon Tukar - GalonKu Admin</title>
        <style>
          body { font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif; color: #131B2E; padding: 32px; }
          .header { display: flex; justify-content: space-between; border-bottom: 2px solid #131B2E; padding-bottom: 16px; margin-bottom: 24px; }
          .brand { font-size: 20px; font-weight: 800; color: #0052FF; }
          .subtitle { font-size: 12px; color: #596378; margin-top: 4px; }
          .meta { text-align: right; font-size: 12px; }
          table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 13px; }
          th, td { border: 1px solid #DCE1EC; padding: 10px 12px; text-align: left; }
          th { background: #F4F6FD; font-weight: 700; text-transform: uppercase; font-size: 11px; }
          .summary { margin-top: 20px; background: #F8FAFC; padding: 14px; border-radius: 8px; font-size: 13px; }
          .signs { display: flex; justify-content: space-between; margin-top: 56px; text-align: center; font-size: 12px; }
          .sign-box { width: 200px; }
          .line { border-top: 1px solid #131B2E; margin-top: 64px; padding-top: 6px; font-weight: 700; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="brand">GALONKU ADMIN — DEPO JKT-04</div>
            <div class="subtitle">Depo Kebayoran Lama • Manifest Serah Terima Galon Kosong Tukar Pabrik</div>
          </div>
          <div class="meta">
            <div><strong>No. Manifest:</strong> MNF-JKT04-${Date.now().toString().slice(-6)}</div>
            <div><strong>Tanggal:</strong> ${tanggalCetak}</div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Varian Botol Kosong</th>
              <th>Kondisi</th>
              <th>Jumlah (Unit)</th>
              <th>Keterangan</th>
            </tr>
          </thead>
          <tbody>
            ${emptyBottles
              .map(
                (item, i) => `
              <tr>
                <td>${i + 1}</td>
                <td><strong>${item.label}</strong></td>
                <td>Layak Tukar / Tersortir Baik</td>
                <td><strong>${item.count} Galon</strong></td>
                <td>Siap muat truk pabrik</td>
              </tr>`
              )
              .join('')}
            <tr>
              <td>${emptyBottles.length + 1}</td>
              <td>Galon Afkir / Retak / Bocor</td>
              <td>Rusak / Klaim Retur (${warrantyClaimCount} diajukan)</td>
              <td><strong>${damagedCount} Galon</strong></td>
              <td>Dipisahkan untuk Berita Acara Retur</td>
            </tr>
          </tbody>
        </table>

        <div class="summary">
          <strong>Total Siap Tukar Pabrik:</strong> ${totalSiapTukar} Galon &nbsp;|&nbsp;
          <strong>Total Afkir/Retur:</strong> ${damagedCount} Galon &nbsp;|&nbsp;
          <strong>Total Keseluruhan Fisik di Depo:</strong> ${totalSemua} Galon
        </div>

        <div class="signs">
          <div class="sign-box">
            <div>Diserahkan Oleh,</div>
            <div class="line">Kepala Gudang Depo JKT-04</div>
          </div>
          <div class="sign-box">
            <div>Diperiksa & Diterima Oleh,</div>
            <div class="line">Sopir / Checker Armada Pabrik</div>
          </div>
        </div>
        <script>
          window.onload = function() { window.print(); };
        </script>
      </body>
      </html>
    `);
    printWin.document.close();
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.deskripsi.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (activeTab === 'refill') return p.tipe.includes('Refill');
    if (activeTab === 'sekalipakai') return p.tipe.includes('Sekali Pakai');
    if (activeTab === 'kritis') return p.typeStatus === 'kritis';
    return true;
  });

  const stats = useMemo(() => {
    const totalGalonTerisi = products.reduce((sum, item) => sum + item.stokTerisi, 0);
    const produkKritis = products.filter((item) => item.typeStatus === 'kritis');
    const totalNilaiInventaris = products.reduce(
      (sum, item) => sum + item.hargaJual * item.stokTerisi,
      0
    );
    const totalModalInventaris = products.reduce(
      (sum, item) => sum + item.hargaModal * item.stokTerisi,
      0
    );
    const marginPct =
      totalModalInventaris > 0
        ? (((totalNilaiInventaris - totalModalInventaris) / totalModalInventaris) * 100).toFixed(1)
        : '0.0';

    const countRefill = products.filter((p) => p.tipe.includes('Refill')).length;
    const countSekaliPakai = products.filter((p) => p.tipe.includes('Sekali Pakai')).length;

    const totalSiapTukar = emptyBottles.reduce((sum, b) => sum + b.count, 0);
    const totalGalonKosong = totalSiapTukar + damagedCount;
    const siapTukarPct =
      totalGalonKosong > 0 ? Math.round((totalSiapTukar / totalGalonKosong) * 100) : 0;

    return {
      totalGalonTerisi,
      produkKritis,
      totalNilaiInventaris,
      totalModalInventaris,
      marginPct,
      countRefill,
      countSekaliPakai,
      totalSiapTukar,
      totalGalonKosong,
      siapTukarPct,
    };
  }, [products, emptyBottles, damagedCount]);

  return (
    <div className="space-y-5 text-[#131B2E] antialiased">
      {/* Toast Notifikasi */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-xl bg-[#131B2E] px-4 py-3 text-xs font-bold text-white shadow-xl">
          <CheckCircle2 size={16} className="text-[#28A745]" />
          <span>{toast}</span>
        </div>
      )}

      {/* ==================== HEADER JUDUL (TANPA KOTAK PUTIH) ==================== */}
      <div className="flex flex-col justify-between gap-4 pt-1 lg:flex-row lg:items-center">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-wider text-[#0052FF]">
            <Boxes size={14} />
            Logistik & Gudang Depo / <span className="text-[#8A91A3]">Produk & Stok</span>
          </div>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-[#131B2E]">
            Produk & Stok Galon
          </h1>
          <p className="mt-0.5 text-xs text-[#6D768A]">
            Monitoring ketersediaan pasokan galon, inventaris botol kosong, dan penyesuaian harga jual.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowManifestModal(true)}
            className="flex h-10 items-center gap-2 rounded-xl border border-[#EEF0F5] bg-white px-3.5 text-xs font-bold text-[#26334C] shadow-sm transition hover:bg-[#F4F6FD]"
          >
            <Printer size={14} className="text-[#0052FF]" />
            Manifest Tukar
          </button>
          <button
            type="button"
            onClick={() => setShowNewPOModal(true)}
            className="flex h-10 items-center gap-2 rounded-xl bg-[#0052FF] px-4 text-xs font-bold text-white shadow-sm shadow-[#0052FF]/20 transition hover:bg-[#0047DE]"
          >
            <Plus size={15} />
            Buat PO Restok
          </button>
        </div>
      </div>

      {/* ==================== 4 STATS CARDS ROW ==================== */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Total Galon Terisi */}
        <div className="flex items-start justify-between rounded-2xl border border-[#EEF0F5] bg-white p-4">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#8A91A3]">
              TOTAL GALON TERISI
            </p>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-2xl font-extrabold text-[#131B2E]">
                {loading ? '...' : stats.totalGalonTerisi}
              </span>
              <span className="text-xs font-medium text-[#69738A]">Galon</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-x-2.5 gap-y-0.5 text-[10px] text-[#69738A]">
              {products.slice(0, 4).map((p) => (
                <span key={p.id}>
                  <span className="font-bold text-[#293246]">{getShortBrand(p.nama)}:</span>{' '}
                  {p.stokTerisi}
                </span>
              ))}
            </div>
          </div>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#DDE7FF] text-[#0052FF]">
            <Droplets size={18} />
          </div>
        </div>

        {/* Card 2: Stok Galon Kosong */}
        <div className="flex items-start justify-between rounded-2xl border border-[#EEF0F5] bg-white p-4">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#8A91A3]">
              STOK GALON KOSONG
            </p>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-2xl font-extrabold text-[#131B2E]">
                {stats.totalGalonKosong}
              </span>
              <span className="text-xs font-medium text-[#69738A]">Galon Kosong</span>
            </div>
            <div className="mt-2.5 flex items-center gap-1.5 text-[10px]">
              <span className="text-[#69738A]">Pool siap tukar pabrik</span>
              <span className="rounded-md bg-[#E6F4FF] px-2 py-0.5 font-bold text-[#0052FF]">
                Tersortir Baik
              </span>
            </div>
          </div>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F2F4FA] text-[#596378]">
            <RefreshCw size={18} />
          </div>
        </div>

        {/* Card 3: Stok Kritis / Menipis */}
        <div className="flex items-start justify-between rounded-2xl border border-[#EEF0F5] bg-white p-4">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#D93636]">
              STOK KRITIS / MENIPIS
            </p>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span
                className={`text-2xl font-extrabold ${
                  stats.produkKritis.length > 0 ? 'text-[#D93636]' : 'text-[#16752C]'
                }`}
              >
                {loading ? '...' : stats.produkKritis.length}
              </span>
              <span className="text-xs font-medium text-[#69738A]">Varian</span>
            </div>
            <div className="mt-2.5 flex items-center gap-1.5 text-[10px]">
              <span
                className={`max-w-[130px] truncate font-bold ${
                  stats.produkKritis.length > 0 ? 'text-[#D93636]' : 'text-[#16752C]'
                }`}
              >
                {stats.produkKritis.length > 0
                  ? stats.produkKritis.map((p) => getShortBrand(p.nama)).join(' & ')
                  : 'Semua Stok Aman'}
              </span>
              {stats.produkKritis.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowNewPOModal(true)}
                  className="rounded-md bg-[#FFE0E0] px-2 py-0.5 font-bold text-[#D93636] hover:bg-[#FFD0D0]"
                >
                  Perlu PO
                </button>
              )}
            </div>
          </div>
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
              stats.produkKritis.length > 0
                ? 'bg-[#FFE0E0] text-[#D93636]'
                : 'bg-[#C5F8D0] text-[#16752C]'
            }`}
          >
            {stats.produkKritis.length > 0 ? (
              <AlertTriangle size={18} />
            ) : (
              <CheckCircle2 size={18} />
            )}
          </div>
        </div>

        {/* Card 4: Total Nilai Inventaris */}
        <div className="flex items-start justify-between rounded-2xl border border-[#EEF0F5] bg-white p-4">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#8A91A3]">
              TOTAL NILAI INVENTARIS
            </p>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="whitespace-nowrap text-xl font-extrabold text-[#131B2E]">
                {loading ? '...' : `Rp ${stats.totalNilaiInventaris.toLocaleString('id-ID')}`}
              </span>
            </div>
            <div className="mt-2.5 flex items-center gap-2 text-[10px]">
              <span className="whitespace-nowrap text-[#69738A]">
                Modal: Rp {stats.totalModalInventaris.toLocaleString('id-ID')}
              </span>
              <span className="font-extrabold text-[#16752C]">+{stats.marginPct}% Margin</span>
            </div>
          </div>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C5F8D0] text-[#16752C]">
            <WalletCards size={18} />
          </div>
        </div>
      </section>

      {/* ==================== FILTER & SEARCH BAR ==================== */}
      <section className="flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:w-80">
          <Search
            size={15}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A91A3]"
          />
          <input
            type="text"
            placeholder="Cari merk galon, ukuran, SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-xl border border-[#EEF0F5] bg-white pl-10 pr-8 text-xs text-[#131B2E] placeholder-[#8A91A3] outline-none transition focus:border-[#0052FF]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8A91A3] hover:text-[#131B2E]"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="mr-1 text-xs font-medium text-[#69738A]">Filter Kategori:</span>
          {[
            { key: 'semua', label: `Semua Produk (${products.length})` },
            { key: 'refill', label: `Refill 19L (${stats.countRefill})` },
            { key: 'sekalipakai', label: `Sekali Pakai (${stats.countSekaliPakai})` },
            { key: 'kritis', label: `Perlu Restok (${stats.produkKritis.length})` },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key as any)}
              className={`whitespace-nowrap rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                activeTab === tab.key
                  ? 'bg-[#0052FF] text-white shadow-sm shadow-[#0052FF]/20'
                  : 'border border-[#EEF0F5] bg-white text-[#596378] hover:bg-[#F4F6FD]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* ==================== TABEL INVENTARIS DEPO AKTIF ==================== */}
      <section className="space-y-4 rounded-2xl border border-[#EEF0F5] bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-2 border-b border-[#EEF0F5] pb-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#28A745]" />
            <h2 className="text-base font-extrabold text-[#131B2E]">
              Daftar Inventaris Depo Aktif
            </h2>
            <span className="rounded-md bg-[#EEF0FF] px-2 py-0.5 text-[10px] font-bold text-[#0052FF]">
              Live Sync Terkini
            </span>
          </div>
          <p className="text-[11px] text-[#69738A]">
            Klik Update pada setiap baris untuk mengatur stok, harga jual, dan modal
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="bg-[#F4F6FD] text-[10px] font-extrabold uppercase tracking-wider text-[#293246]">
                <th className="rounded-l-xl px-3 py-3">PRODUK & VARIAN</th>
                <th className="px-3 py-3">SKU / TIPE</th>
                <th className="whitespace-nowrap px-3 py-3">HARGA JUAL</th>
                <th className="whitespace-nowrap px-3 py-3">HARGA MODAL</th>
                <th className="px-3 py-3">STOK TERISI (DEPO)</th>
                <th className="whitespace-nowrap px-3 py-3">BOTOL KOSONG</th>
                <th className="px-3 py-3">STATUS</th>
                <th className="rounded-r-xl px-3 py-3 text-center">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF0F5]">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-xs text-[#69738A]">
                    Memuat data produk dari database...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-xs text-[#69738A]">
                    Tidak ada varian produk yang cocok dengan pencarian ini.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p.id} className="transition-colors hover:bg-[#F8FAFF]">
                    {/* 1. PRODUK & VARIAN */}
                    <td className="px-3 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#EEF0F5] bg-[#F8FAFC] p-1">
                          <img
                            src={p.image}
                            alt={p.nama}
                            className="max-h-full max-w-full object-contain"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        </div>
                        <div>
                          <p className="text-sm font-extrabold leading-tight text-[#131B2E]">
                            {p.nama}
                          </p>
                          <p className="mt-0.5 text-[11px] text-[#69738A]">{p.deskripsi}</p>
                        </div>
                      </div>
                    </td>

                    {/* 2. SKU / TIPE */}
                    <td className="whitespace-nowrap px-3 py-3.5">
                      <p className="text-xs font-bold text-[#131B2E]">{p.sku}</p>
                      <p className="text-[10px] font-semibold text-[#0052FF]">{p.tipe}</p>
                    </td>

                    {/* 3. HARGA JUAL (SEJAJAR 1 BARIS TANPA PENSIL) */}
                    <td className="whitespace-nowrap px-3 py-3.5 text-sm font-extrabold text-[#131B2E]">
                      Rp {p.hargaJual.toLocaleString('id-ID')}
                    </td>

                    {/* 4. HARGA MODAL (SEJAJAR 1 BARIS) */}
                    <td className="whitespace-nowrap px-3 py-3.5 font-semibold text-[#69738A]">
                      Rp {p.hargaModal.toLocaleString('id-ID')}
                    </td>

                    {/* 5. STOK TERISI (DEPO) */}
                    <td className="px-3 py-3.5">
                      <div className="w-36 space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-extrabold text-[#131B2E]">
                            {p.stokTerisi} Unit
                          </span>
                          <span className="text-[10px] text-[#69738A]">{p.stokStatusText}</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#EEF0F5]">
                          <div
                            className={`${p.stokBarClass} h-full rounded-full transition-all`}
                            style={{ width: p.stokColorPct }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* 6. BOTOL KOSONG */}
                    <td className="whitespace-nowrap px-3 py-3.5 font-bold text-[#293246]">
                      {p.isSekaliPakai ? '- (Non-Refill)' : `${p.botolKosongCount} Botol`}
                    </td>

                    {/* 7. STATUS */}
                    <td className="whitespace-nowrap px-3 py-3.5">
                      {p.status === 'Tersedia' ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#C5F8D0]/60 px-2.5 py-1 text-[10px] font-bold text-[#16752C]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#16752C]" /> Tersedia
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFE0E0] px-2.5 py-1 text-[10px] font-bold text-[#D93636]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#D93636]" /> Stok Kritis
                        </span>
                      )}
                    </td>

                    {/* 8. AKSI (HANYA TOMBOL UPDATE) */}
                    <td className="whitespace-nowrap px-3 py-3.5 text-center">
                      <button
                        type="button"
                        onClick={() => openUpdateModal(p)}
                        disabled={savingId === p.id}
                        className="rounded-lg bg-[#F0F3FF] px-3.5 py-1.5 text-xs font-bold text-[#0052FF] transition hover:bg-[#0052FF] hover:text-white"
                      >
                        {savingId === p.id ? 'Menyimpan...' : 'Update'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="flex flex-col items-center justify-between gap-2 border-t border-[#EEF0F5] pt-3 text-xs text-[#69738A] sm:flex-row">
          <p>
            Menampilkan {filteredProducts.length} dari {products.length} varian produk galon depo
          </p>
          <p className="font-bold text-[#131B2E]">
            Estimasi Nilai Stok Depo:{' '}
            <span className="text-sm font-extrabold text-[#0052FF]">
              Rp {stats.totalNilaiInventaris.toLocaleString('id-ID')}
            </span>
          </p>
        </div>
      </section>

      {/* ==================== BOTTOM 2 COLUMNS ==================== */}
      <section className="grid grid-cols-1 items-start gap-4 lg:grid-cols-12">
        {/* LEFT: RIWAYAT & JADWAL KIRIM RESTOK PABRIK (7/12) */}
        <div className="space-y-4 rounded-2xl border border-[#EEF0F5] bg-white p-5 shadow-sm lg:col-span-7">
          <div className="flex items-center justify-between border-b border-[#EEF0F5] pb-3">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-[#0052FF]" />
              <h3 className="text-sm font-extrabold text-[#131B2E]">
                Riwayat & Jadwal Kirim Restok Pabrik
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setShowAllPO((prev) => !prev)}
              className="text-xs font-bold text-[#0052FF] hover:underline"
            >
              {showAllPO ? 'Tampilkan Ringkas' : `Lihat Semua PO (${purchaseOrders.length})`}
            </button>
          </div>

          <div className="space-y-3">
            {(showAllPO ? purchaseOrders : purchaseOrders.slice(0, 3)).map((po) => (
              <div
                key={po.id}
                className="flex flex-col justify-between gap-3 rounded-xl border border-[#EEF0F5] bg-[#F8FAFF] p-3.5 text-xs sm:flex-row sm:items-center"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                      po.status === 'Dalam Pengiriman'
                        ? 'bg-[#DDE7FF] text-[#0052FF]'
                        : po.status === 'PO Kritis'
                        ? 'bg-[#FFE0E0] text-[#D93636]'
                        : 'bg-[#C5F8D0] text-[#16752C]'
                    }`}
                  >
                    {po.status === 'Dalam Pengiriman' ? (
                      <Truck size={17} />
                    ) : po.status === 'PO Kritis' ? (
                      <Package size={17} />
                    ) : (
                      <CheckCircle2 size={17} />
                    )}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-extrabold text-[#131B2E]">{po.supplier}</h4>
                      <span
                        className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                          po.status === 'Dalam Pengiriman'
                            ? 'bg-[#DDE7FF] text-[#0052FF]'
                            : po.status === 'PO Kritis'
                            ? 'bg-[#FFE0E0] text-[#D93636]'
                            : 'bg-[#C5F8D0] text-[#16752C]'
                        }`}
                      >
                        {po.badgeText}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[11px] text-[#69738A]">{po.detail}</p>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <p className="font-extrabold text-[#131B2E]">{po.eta}</p>
                  {po.status === 'Dalam Pengiriman' && (
                    <button
                      type="button"
                      onClick={() => handleReceivePO(po)}
                      className="mt-1 rounded-lg bg-[#0052FF] px-2.5 py-1 text-[10px] font-bold text-white hover:bg-[#0047DE]"
                    >
                      Konfirmasi Terima (+{po.qtyRestok})
                    </button>
                  )}
                  {po.status === 'PO Kritis' && (
                    <button
                      type="button"
                      onClick={() => {
                        setPurchaseOrders((prev) =>
                          prev.map((item) =>
                            item.id === po.id ? { ...item, followedUp: true } : item
                          )
                        );
                        showToast(`Pengingat pengiriman #${po.id} terkirim ke Sales Cleo`);
                      }}
                      className="mt-1 inline-flex items-center gap-1 text-[10px] font-bold text-[#0052FF] hover:underline"
                    >
                      <PhoneCall size={11} />
                      {po.followedUp ? 'Sudah Di-Follow Up ✓' : 'Follow-up Sales'}
                    </button>
                  )}
                  {po.status === 'Selesai Diterima' && (
                    <p className="mt-0.5 text-[10px] text-[#8A91A3]">{po.subInfo}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-[#EEF0F5] pt-2.5 text-[11px] text-[#69738A]">
            <span>Supplier resmi Danone, Mayora, Tirta Sariguna terverifikasi.</span>
            <button
              type="button"
              onClick={() => setShowNewPOModal(true)}
              className="font-bold text-[#0052FF] hover:underline"
            >
              Buat Surat Jalan Restok →
            </button>
          </div>
        </div>

        {/* RIGHT: STATUS GALON KOSONG INTERAKTIF (5/12) */}
        <div className="space-y-4 rounded-2xl border border-[#EEF0F5] bg-white p-5 shadow-sm lg:col-span-5">
          <div className="flex items-center justify-between border-b border-[#EEF0F5] pb-3">
            <h3 className="text-sm font-extrabold text-[#131B2E]">Status Galon Kosong</h3>
            <span className="h-2 w-2 rounded-full bg-[#28A745]" />
          </div>

          <div className="space-y-3">
            <div>
              <div className="mb-1.5 flex items-baseline justify-between">
                <span className="text-xs font-semibold text-[#69738A]">Total Botol di Depo:</span>
                <span className="text-lg font-extrabold text-[#131B2E]">
                  {stats.totalGalonKosong} Botol
                </span>
              </div>

              {/* Split Progress Bar Dinamis */}
              <div className="flex h-2 w-full overflow-hidden rounded-full bg-[#EEF0F5]">
                <div
                  className="h-full bg-[#28A745] transition-all"
                  style={{ width: `${stats.siapTukarPct}%` }}
                />
                <div
                  className="h-full bg-[#D93636] transition-all"
                  style={{ width: `${100 - stats.siapTukarPct}%` }}
                />
              </div>

              <div className="mt-1.5 flex justify-between text-[10px] font-bold">
                <span className="text-[#16752C]">● {stats.totalSiapTukar} Siap Tukar</span>
                <span className="text-[#D93636]">● {damagedCount} Afkir / Rusak</span>
              </div>
            </div>

            {/* Rincian Per Merek (Bisa di-Adjust +/-) */}
            <div className="space-y-2 rounded-xl bg-[#F4F6FD] p-3 text-xs">
              {emptyBottles.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b border-[#E3E7F2] pb-1.5 last:border-none last:pb-0"
                >
                  <span className="font-semibold text-[#293246]">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setEmptyBottles((prev) =>
                          prev.map((b) =>
                            b.id === item.id ? { ...b, count: Math.max(0, b.count - 1) } : b
                          )
                        )
                      }
                      className="flex h-5 w-5 items-center justify-center rounded bg-white font-bold text-[#596378] shadow-sm hover:bg-[#0052FF] hover:text-white"
                    >
                      -
                    </button>
                    <span className="w-16 text-right font-extrabold text-[#131B2E]">
                      {item.count} Galon
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setEmptyBottles((prev) =>
                          prev.map((b) =>
                            b.id === item.id ? { ...b, count: b.count + 1 } : b
                          )
                        )
                      }
                      className="flex h-5 w-5 items-center justify-center rounded bg-white font-bold text-[#596378] shadow-sm hover:bg-[#0052FF] hover:text-white"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Klaim Garansi Box */}
            <div className="flex items-center justify-between rounded-xl border border-[#FFD6D6] bg-[#FFF2F2] p-3 text-xs">
              <div>
                <p className="font-extrabold text-[#D93636]">Klaim Garansi Retur Bocor</p>
                <p className="text-[10px] text-[#D93636]/80">
                  Klik + untuk catat temuan botol bocor
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="rounded-lg bg-[#FFE0E0] px-2.5 py-1 text-[10px] font-extrabold text-[#D93636]">
                  {warrantyClaimCount} Galon Diajukan
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setWarrantyClaimCount((c) => c + 1);
                    setDamagedCount((d) => d + 1);
                    showToast('1 galon bocor ditambahkan ke klaim retur');
                  }}
                  className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#D93636] font-bold text-white hover:bg-[#B82828]"
                >
                  +
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowManifestModal(true)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0052FF] py-2.5 text-xs font-bold text-white shadow-sm shadow-[#0052FF]/20 transition hover:bg-[#0047DE]"
            >
              <Printer size={15} />
              Cetak Manifest Galon Tukar
            </button>
          </div>
        </div>
      </section>

      {/* ==================== MODAL 1: UPDATE STOK & HARGA PRODUK ==================== */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#EEF0F5] pb-3">
              <div>
                <h3 className="text-base font-extrabold text-[#131B2E]">
                  Update Inventaris & Harga
                </h3>
                <p className="text-[11px] text-[#69738A]">
                  {selectedProduct.nama} ({selectedProduct.sku})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="rounded-lg p-1.5 text-[#69738A] hover:bg-[#F2F4FA]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveModalUpdate} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="mb-1 block font-bold text-[#293246]">
                  Stok Terisi di Depo (Unit)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    value={editForm.stokTerisi}
                    onChange={(e) =>
                      setEditForm({ ...editForm, stokTerisi: Number(e.target.value) })
                    }
                    className="h-10 flex-1 rounded-xl border border-[#EEF0F5] bg-[#F4F6FD] px-3 font-extrabold text-[#131B2E] outline-none focus:border-[#0052FF] focus:bg-white"
                  />
                  {[5, 10, 20].map((add) => (
                    <button
                      key={add}
                      type="button"
                      onClick={() =>
                        setEditForm((prev) => ({ ...prev, stokTerisi: prev.stokTerisi + add }))
                      }
                      className="h-10 rounded-xl bg-[#EEF0FF] px-3 font-bold text-[#0052FF] hover:bg-[#0052FF] hover:text-white"
                    >
                      +{add}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block font-bold text-[#293246]">Harga Jual (Rp)</label>
                  <input
                    type="number"
                    min={0}
                    step={500}
                    value={editForm.hargaJual}
                    onChange={(e) =>
                      setEditForm({ ...editForm, hargaJual: Number(e.target.value) })
                    }
                    className="h-10 w-full rounded-xl border border-[#EEF0F5] bg-[#F4F6FD] px-3 font-extrabold text-[#131B2E] outline-none focus:border-[#0052FF] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-bold text-[#293246]">Harga Modal (Rp)</label>
                  <input
                    type="number"
                    min={0}
                    step={500}
                    value={editForm.hargaModal}
                    onChange={(e) =>
                      setEditForm({ ...editForm, hargaModal: Number(e.target.value) })
                    }
                    className="h-10 w-full rounded-xl border border-[#EEF0F5] bg-[#F4F6FD] px-3 font-bold text-[#596378] outline-none focus:border-[#0052FF] focus:bg-white"
                  />
                </div>
              </div>

              {!selectedProduct.isSekaliPakai && (
                <div>
                  <label className="mb-1 block font-bold text-[#293246]">
                    Botol Kosong Varian Ini (Unit)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={editForm.botolKosongCount}
                    onChange={(e) =>
                      setEditForm({ ...editForm, botolKosongCount: Number(e.target.value) })
                    }
                    className="h-10 w-full rounded-xl border border-[#EEF0F5] bg-[#F4F6FD] px-3 font-bold text-[#131B2E] outline-none focus:border-[#0052FF] focus:bg-white"
                  />
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="h-10 rounded-xl px-4 font-bold text-[#596378] hover:bg-[#F2F4FA]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="h-10 rounded-xl bg-[#0052FF] px-5 font-bold text-white shadow-sm shadow-[#0052FF]/20 hover:bg-[#0047DE]"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL 2: BUAT SURAT JALAN / PO RESTOK PABRIK ==================== */}
      {showNewPOModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          onClick={() => setShowNewPOModal(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#EEF0F5] pb-3">
              <div>
                <h3 className="text-base font-extrabold text-[#131B2E]">
                  Buat Surat Jalan Restok Pabrik
                </h3>
                <p className="text-[11px] text-[#69738A]">
                  Jadwalkan pengiriman galon isi sekaligus penukaran galon kosong
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowNewPOModal(false)}
                className="rounded-lg p-1.5 text-[#69738A] hover:bg-[#F2F4FA]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateNewPO} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="mb-1 block font-bold text-[#293246]">Pabrik / Distributor</label>
                <select
                  value={newPOForm.supplier}
                  onChange={(e) => setNewPOForm({ ...newPOForm, supplier: e.target.value })}
                  className="h-10 w-full rounded-xl border border-[#EEF0F5] bg-[#F4F6FD] px-3 font-semibold text-[#131B2E] outline-none focus:border-[#0052FF]"
                >
                  <option value="Pabrik PT Danone Aqua Pulogadung">
                    Pabrik PT Danone Aqua Pulogadung
                  </option>
                  <option value="Pabrik Sariguna Primatirta (Cleo)">
                    Pabrik Sariguna Primatirta (Cleo)
                  </option>
                  <option value="Distributor Mayora Le Minerale">
                    Distributor Mayora Le Minerale
                  </option>
                  <option value="PT Tirta Investama (VIT)">PT Tirta Investama (VIT)</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <div>
                  <label className="mb-1 block font-bold text-[#293246]">Varian Galon</label>
                  <select
                    value={newPOForm.productKeyword}
                    onChange={(e) =>
                      setNewPOForm({ ...newPOForm, productKeyword: e.target.value })
                    }
                    className="h-10 w-full rounded-xl border border-[#EEF0F5] bg-[#F4F6FD] px-2.5 font-semibold text-[#131B2E] outline-none focus:border-[#0052FF]"
                  >
                    <option value="aqua">Aqua 19L</option>
                    <option value="cleo">Cleo 19L</option>
                    <option value="vit">VIT 19L</option>
                    <option value="minerale">Le Minerale 15L</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block font-bold text-[#293246]">Muatan Isi</label>
                  <input
                    type="number"
                    min={1}
                    value={newPOForm.qtyRestok}
                    onChange={(e) =>
                      setNewPOForm({ ...newPOForm, qtyRestok: Number(e.target.value) })
                    }
                    className="h-10 w-full rounded-xl border border-[#EEF0F5] bg-[#F4F6FD] px-3 font-bold text-[#131B2E] outline-none focus:border-[#0052FF]"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-bold text-[#293246]">Tukar Kosong</label>
                  <input
                    type="number"
                    min={0}
                    value={newPOForm.tukarKosong}
                    onChange={(e) =>
                      setNewPOForm({ ...newPOForm, tukarKosong: Number(e.target.value) })
                    }
                    className="h-10 w-full rounded-xl border border-[#EEF0F5] bg-[#F4F6FD] px-3 font-bold text-[#131B2E] outline-none focus:border-[#0052FF]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block font-bold text-[#293246]">Estimasi Tiba (ETA)</label>
                <input
                  type="text"
                  value={newPOForm.eta}
                  onChange={(e) => setNewPOForm({ ...newPOForm, eta: e.target.value })}
                  className="h-10 w-full rounded-xl border border-[#EEF0F5] bg-[#F4F6FD] px-3 font-semibold text-[#131B2E] outline-none focus:border-[#0052FF]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewPOModal(false)}
                  className="h-10 rounded-xl px-4 font-bold text-[#596378] hover:bg-[#F2F4FA]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="h-10 rounded-xl bg-[#0052FF] px-5 font-bold text-white hover:bg-[#0047DE]"
                >
                  Terbitkan Surat Jalan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL 3: PREVIEW & CETAK MANIFEST GALON TUKAR ==================== */}
      {showManifestModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          onClick={() => setShowManifestModal(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#EEF0F5] pb-3">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-[#0052FF]" />
                <div>
                  <h3 className="text-base font-extrabold text-[#131B2E]">
                    Manifest Serah Terima Galon Tukar
                  </h3>
                  <p className="text-[11px] text-[#69738A]">
                    Depo Kebayoran Lama (JKT-04) • Dokumen Resmi Armada Pabrik
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowManifestModal(false)}
                className="rounded-lg p-1.5 text-[#69738A] hover:bg-[#F2F4FA]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4 overflow-hidden rounded-xl border border-[#EEF0F5]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F4F6FD] text-[10px] font-extrabold uppercase text-[#293246]">
                  <tr>
                    <th className="px-3 py-2.5">Varian Galon Kosong</th>
                    <th className="px-3 py-2.5">Kondisi</th>
                    <th className="px-3 py-2.5 text-right">Jumlah</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EEF0F5]">
                  {emptyBottles.map((b) => (
                    <tr key={b.id}>
                      <td className="px-3 py-2.5 font-bold text-[#131B2E]">{b.label}</td>
                      <td className="px-3 py-2.5 text-[#16752C]">Layak Tukar</td>
                      <td className="px-3 py-2.5 text-right font-extrabold text-[#131B2E]">
                        {b.count} Galon
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-[#FFF8F8]">
                    <td className="px-3 py-2.5 font-bold text-[#D93636]">
                      Galon Afkir / Retur Bocor
                    </td>
                    <td className="px-3 py-2.5 text-[#D93636]">
                      {warrantyClaimCount} Klaim Garansi
                    </td>
                    <td className="px-3 py-2.5 text-right font-extrabold text-[#D93636]">
                      {damagedCount} Galon
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-3 flex items-center justify-between rounded-xl bg-[#F4F6FD] px-4 py-3 text-xs">
              <span className="font-semibold text-[#596378]">Total Siap Tukar Pabrik:</span>
              <span className="text-sm font-extrabold text-[#0052FF]">
                {stats.totalSiapTukar} Galon Layak + {damagedCount} Retur
              </span>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowManifestModal(false)}
                className="h-10 rounded-xl px-4 text-xs font-bold text-[#596378] hover:bg-[#F2F4FA]"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={handlePrintManifest}
                className="flex h-10 items-center gap-2 rounded-xl bg-[#0052FF] px-5 text-xs font-bold text-white shadow-sm shadow-[#0052FF]/20 hover:bg-[#0047DE]"
              >
                <Printer size={15} />
                Cetak / Simpan PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}