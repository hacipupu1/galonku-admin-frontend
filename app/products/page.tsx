"use client";

import Image from "next/image";
import {
  Search,
  Bell,
  Plus,
  Droplets,
  Package,
  AlertTriangle,
  WalletCards,
  Pencil,
  ShoppingCart,
  Truck,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Printer,
  ChevronRight,
  UserRound,
} from "lucide-react";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

type Product = {
  name: string;
  description: string;
  sku: string;
  type: string;
  price: string;
  modal: string;
  stock: number;
  stockPercent: number;
  stockLabel: string;
  bottles: number | null;
  status: "available" | "critical";
  image: string;
};

const products: Product[] = [
  {
    name: "Aqua 19 Liter Refill",
    description: "Air Mineral Pegunungan Alami",
    sku: "GLN-AQU-19L",
    type: "Galon Tukar Refill",
    price: "18.000",
    modal: "14.200",
    stock: 35,
    stockPercent: 70,
    stockLabel: "Aman (70%)",
    bottles: 18,
    status: "available",
    image: "/aqua.png",
  },
  {
    name: "Le Minerale 15 Liter",
    description: "Galon Sekali Pakai Tanpa Tukar",
    sku: "GLN-LMN-15L",
    type: "Bebas BPA / Sekali Pakai",
    price: "17.000",
    modal: "13.800",
    stock: 25,
    stockPercent: 50,
    stockLabel: "Optimal (50%)",
    bottles: null,
    status: "available",
    image: "/leminerale.png",
  },
  {
    name: "Cleo 19 Liter Refill",
    description: "Pure Water Demineral 0 ppm",
    sku: "GLN-CLE-19L",
    type: "Galon Tukar Refill",
    price: "16.500",
    modal: "13.000",
    stock: 15,
    stockPercent: 30,
    stockLabel: "Menipis (30%)",
    bottles: 14,
    status: "critical",
    image: "/cleo.png",
  },
  {
    name: "Vit 19 Liter Refill",
    description: "Air Mineral Higienis Terjangkau",
    sku: "GLN-VIT-19L",
    type: "Galon Tukar Refill",
    price: "15.000",
    modal: "11.500",
    stock: 10,
    stockPercent: 20,
    stockLabel: "Sisa 20%",
    bottles: 10,
    status: "critical",
    image: "/vit.png",
  },
];

function StatusBadge({
  type,
  children,
}: {
  type: "available" | "critical";
  children: React.ReactNode;
}) {
  if (type === "critical") {
    return (
      <span className="status-badge critical">
        <span className="status-dot" />
        {children}
      </span>
    );
  }

  return (
    <span className="status-badge available">
      <span className="status-dot" />
      {children}
    </span>
  );
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-title">GalonKu Admin</div>
        <div className="brand-subtitle">Portal Manajemen & Operasional</div>
      </div>

      <div className="menu-title">MENU UTAMA</div>

      <nav className="menu">
        <a className="menu-item" href="#">
          <Package size={17} />
          <span>Dashboard</span>
        </a>

        <a className="menu-item" href="#">
          <Package size={17} />
          <span>Manajemen Pesanan</span>
        </a>

        <a className="menu-item active" href="/products">
          <Package size={17} />
          <span>Produk & Stok</span>
        </a>

        <a className="menu-item" href="/monitoring">
          <Truck size={17} />
          <span>Monitoring Pengantaran</span>
        </a>

        <a className="menu-item" href="#">
          <WalletCards size={17} />
          <span>Laporan Keuangan</span>
        </a>
      </nav>

      <div className="profile">
        <div className="profile-avatar">
          <UserRound size={17} />
        </div>

        <div>
          <div className="profile-name">Budi Santoso</div>
          <div className="profile-role">Super Admin</div>
        </div>

        <div className="profile-arrow">↪</div>
      </div>
    </aside>
  );
}

function Header() {
  return (
    <header className="topbar">
      <div className="top-search">
        <Search size={16} />
        <span>Cari pesanan, resi, kurir...</span>
      </div>

      <div className="top-actions">
        <button className="date-button">
          <span>▣</span>
          Hari ini, 24 Mei
        </button>

        <button className="icon-button">
          <Bell size={17} />
          <span className="notification-dot" />
        </button>

        <button className="order-button">
          <Plus size={17} />
          Buat Pesanan
        </button>
      </div>
    </header>
  );
}

function SummaryCard({
  title,
  value,
  suffix,
  icon,
  color,
  children,
}: {
  title: string;
  value: string;
  suffix?: string;
  icon: React.ReactNode;
  color: "blue" | "cyan" | "red" | "green";
  children: React.ReactNode;
}) {
  return (
    <div className="summary-card">
      <div className="summary-top">
        <div>
          <div className="summary-title">{title}</div>

          <div className="summary-value">
            {value}
            {suffix && <span>{suffix}</span>}
          </div>
        </div>

        <div className={`summary-icon ${color}`}>{icon}</div>
      </div>

      <div className="summary-bottom">{children}</div>
    </div>
  );
}

function ProductRow({ product }: { product: Product }) {
  return (
    <div className="product-row">
      <div className="product-info">
        <div className="product-image">
          <Image
            src={product.image}
            alt={product.name}
            width={58}
            height={70}
          />
        </div>

        <div className="product-name-area">
          <div className="product-name">{product.name}</div>
          <div className="product-description">
            {product.description}
          </div>
        </div>
      </div>

      <div className="sku-area">
        <strong>{product.sku}</strong>
        <span>{product.type}</span>
      </div>

      <div className="price-area">
        <div className="price">
          <span>Rp</span> {product.price}
          <Pencil size={13} />
        </div>
      </div>

      <div className="modal-area">
        <span>Rp</span>
        <strong>{product.modal}</strong>
      </div>

      <div className="stock-area">
        <div className="stock-number">
          {product.stock} Unit
        </div>

        <div className="stock-progress">
          <div
            className={`stock-fill ${
              product.status === "critical" ? "red" : "blue"
            }`}
            style={{
              width: `${product.stockPercent}%`,
            }}
          />
        </div>

        <div
          className={`stock-label ${
            product.status === "critical" ? "danger" : "safe"
          }`}
        >
          {product.stockLabel}
        </div>
      </div>

      <div className="bottle-area">
        {product.bottles !== null ? (
          <>
            <div className="bottle-number">{product.bottles}</div>
            <div className="bottle-text">Botol</div>
          </>
        ) : (
          <div className="non-refill">(-Non-<br />Refill)</div>
        )}
      </div>

      <div className="status-area">
        <StatusBadge type={product.status}>
          {product.status === "available"
            ? "Tersedia"
            : "Stok Kritis"}
        </StatusBadge>
      </div>

      <div className="action-area">
        <button className="update-button">Update</button>

        {product.status === "available" ? (
          <ShoppingCart
            size={17}
            className="cart-icon"
          />
        ) : (
          <span className="critical-action">×</span>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div className={`${jakarta.variable} page`}>
      <Sidebar />

      <main className="main">
        <Header />

        <section className="content">
          <div className="breadcrumb">
            LOGISTIK & GUDANG DEPO&nbsp; / &nbsp;
            <span>PRODUK & STOK</span>
          </div>

          <div className="page-heading">
            <div>
              <h1>Produk & Stok Galon</h1>

              <p>
                Monitoring ketersediaan pasokan galon, inventaris
                botol kosong, dan penyesuaian harga jual.
              </p>
            </div>

            <button className="add-product">
              <Plus size={17} />
              Tambah Produk Baru
            </button>
          </div>

          <div className="summary-grid">
            <SummaryCard
              title="TOTAL GALON TERISI"
              value="85"
              suffix="Galon"
              icon={<Droplets size={22} />}
              color="blue"
            >
              <span> Aqua: 35 • Le Min: 25</span>
              <strong>Cleo: 15 • Vit: 10</strong>
            </SummaryCard>

            <SummaryCard
              title="STOK GALON KOSONG"
              value="42"
              suffix="Galon Kosong"
              icon={<RefreshCw size={21} />}
              color="cyan"
            >
              <span>Pool siap tukar pabrik</span>
              <strong>Tersortir Baik</strong>
            </SummaryCard>

            <SummaryCard
              title="STOK KRITIS / MENIPIS"
              value="2"
              suffix="Varian"
              icon={<AlertTriangle size={21} />}
              color="red"
            >
              <span className="red-text">
                Vit 19L & Cleo 19L
              </span>
              <strong className="red-text">Perlu PO</strong>
            </SummaryCard>

            <SummaryCard
              title="TOTAL NILAI INVENTARIS"
              value="Rp 1.620.000"
              icon={<WalletCards size={21} />}
              color="green"
            >
              <span>Modal: Rp 1.258.000</span>
              <strong>+22.3% Margin</strong>
            </SummaryCard>
          </div>

          <div className="filter-box">
            <div className="filter-search">
              <Search size={16} />
              <span>Cari merek galon, ukuran, SKU...</span>
            </div>

            <div className="filters">
              <span className="filter-label">
                Filter Kategori:
              </span>

              <button className="filter active">
                Semua Produk (4)
              </button>

              <button className="filter">Refill 19L (3)</button>

              <button className="filter">Sekali Pakai (1)</button>

              <button className="filter">Perlu Restok (2)</button>
            </div>
          </div>

          <section className="inventory-card">
            <div className="inventory-header">
              <div className="inventory-title">
                <span className="green-dot" />
                <strong>Daftar Inventaris Depo Aktif</strong>
                <span className="live-badge">
                  Live Sync Terkini
                </span>
              </div>

              <span className="inventory-note">
                Update otomatis setiap pesanan kurir diselesaikan
              </span>
            </div>

            <div className="table-header">
              <div>PRODUK & VARIAN</div>
              <div>SKU / TIPE</div>
              <div>HARGA JUAL</div>
              <div>HARGA MODAL</div>
              <div>STOK TERISI (DEPO)</div>
              <div>BOTOL KOSONG</div>
              <div>STATUS</div>
              <div>AKSI</div>
            </div>

            <div className="product-list">
              {products.map((product) => (
                <ProductRow
                  key={product.sku}
                  product={product}
                />
              ))}
            </div>

            <div className="inventory-footer">
              <span>
                Menampilkan <strong>4</strong> dari 4 varian
                produk galon depo
              </span>

              <span>
                Estimasi Omzet Hari Ini:
                <strong className="revenue">
                  Rp 1.442.500
                </strong>
              </span>
            </div>
          </section>

          <div className="bottom-grid">
            <section className="restock-card">
              <div className="section-heading">
                <div>
                  <RefreshCw size={18} />
                  <strong>Riwayat & Jadwal Kirim Restok Pabrik</strong>
                </div>

                <button>Lihat Semua PO</button>
              </div>

              <div className="restock-list">
                <div className="restock-item">
                  <div className="restock-icon blue-bg">
                    <Truck size={20} />
                  </div>

                  <div className="restock-info">
                    <strong>
                      Pabrik PT Danone Aqua Pulogadung
                    </strong>

                    <span>
                      Truk Hino B-9142-SDA • Muatan:
                      50 Galon Aqua 19L • Tukar 50 Galon Kosong
                    </span>
                  </div>

                  <div className="restock-status">
                    <span className="tag cyan-tag">
                      Dalam Pengiriman
                    </span>
                    <small>ETA: Hari ini, 15:30 WIB</small>
                  </div>
                </div>

                <div className="restock-item">
                  <div className="restock-icon red-bg">
                    <Package size={20} />
                  </div>

                  <div className="restock-info">
                    <strong>
                      Pabrik Sariguna Primatirta (Cleo)
                    </strong>

                    <span>
                      Permintaan Restok: 30 Galon Cleo 19L
                      • Depo butuh percepatan
                    </span>
                  </div>

                  <div className="restock-status">
                    <span className="tag red-tag">
                      PO Kritis #PO-882
                    </span>
                    <small>Jadwal: Besok, 09:00 WIB</small>
                  </div>
                </div>

                <div className="restock-item">
                  <div className="restock-icon green-bg">
                    <CheckCircle2 size={20} />
                  </div>

                  <div className="restock-info">
                    <strong>
                      Distributor Mayora Le Minerale
                    </strong>

                    <span>
                      Masuk: 40 Galon Baru 15L • Diterima
                      Staff Depo: Riko
                    </span>
                  </div>

                  <div className="restock-status">
                    <span className="tag green-tag">
                      Selesai Bongkar
                    </span>
                    <small>Kemarin, 14:10 WIB</small>
                  </div>
                </div>
              </div>

              <div className="supplier-footer">
                <span>
                  Supplier resmi Danone, Mayora, Tirta
                  Sariguna terverifikasi.
                </span>

                <button>
                  Buat Surat Jalan Restok
                  <ChevronRight size={15} />
                </button>
              </div>
            </section>

            <section className="empty-bottle-card">
              <div className="section-heading">
                <div>
                  <Droplets size={18} />
                  <strong>Status Galon Kosong</strong>
                </div>

                <span className="small-blue-dot" />
              </div>

              <div className="total-bottles">
                <div>
                  <span>Total Botol di Depo:</span>
                  <strong>42 Botol</strong>
                </div>

                <div className="bottle-progress">
                  <span />
                  <span />
                </div>

                <div className="bottle-legend">
                  <span>
                    <i className="green-dot-small" />
                    34 Siap Tukar
                  </span>

                  <span>
                    <i className="red-dot-small" />
                    8 Afkir / Rusak
                  </span>
                </div>
              </div>

              <div className="empty-row">
                <span>Aqua 19L Kosong</span>
                <strong>18 Galon</strong>
              </div>

              <div className="empty-row">
                <span>Cleo 19L Kosong</span>
                <strong>14 Galon</strong>
              </div>

              <div className="empty-row">
                <span>Vit 19L Kosong</span>
                <strong>10 Galon</strong>
              </div>

              <div className="claim-row">
                <span>Klaim Garansi Retur Bocor</span>
                <strong>3 Galon Diajukan</strong>
              </div>

              <button className="print-button">
                <Printer size={16} />
                Cetak Manifest Galon Tukar
              </button>
            </section>
          </div>
        </section>
      </main>

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          padding: 0;
          min-height: 100%;
          font-family: var(--font-jakarta), "Plus Jakarta Sans",
            Arial, sans-serif;
          background: #faf8ff;
          color: #131b2e;
        }

        body {
          font-size: 13px;
        }

        button,
        input {
          font-family: inherit;
        }

        button {
          cursor: pointer;
        }

        .page {
          min-height: 100vh;
          display: flex;
          background: #faf8ff;
          color: #131b2e;
        }

        /* SIDEBAR */

        .sidebar {
          width: 242px;
          min-height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          background: #ffffff;
          border-right: 1px solid #e2e7ff;
          display: flex;
          flex-direction: column;
          z-index: 20;
        }

        .brand {
          padding: 27px 25px 23px;
          border-bottom: 1px solid #f0f1f8;
        }

        .brand-title {
          color: #003d9b;
          font-size: 19px;
          font-weight: 800;
          letter-spacing: -0.5px;
        }

        .brand-subtitle {
          margin-top: 3px;
          color: #737685;
          font-size: 10px;
          font-weight: 500;
        }

        .menu-title {
          padding: 25px 27px 12px;
          font-size: 10px;
          font-weight: 700;
          color: #737685;
          letter-spacing: 0.4px;
        }

        .menu {
          padding: 0 13px;
        }

        .menu-item {
          height: 42px;
          padding: 0 14px;
          margin-bottom: 4px;
          border-radius: 10px;
          color: #434654;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 12px;
          font-weight: 600;
          transition: 0.15s ease;
        }

        .menu-item:hover {
          background: #f2f3ff;
          color: #003d9b;
        }

        .menu-item.active {
          background: #0052cc;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(0, 82, 204, 0.14);
        }

        .profile {
          margin-top: auto;
          margin: 0 13px 17px;
          padding: 12px;
          background: #f2f3ff;
          border-radius: 11px;
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .profile-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #003d9b;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .profile-name {
          font-size: 11px;
          font-weight: 800;
        }

        .profile-role {
          color: #737685;
          font-size: 9px;
          margin-top: 2px;
        }

        .profile-arrow {
          margin-left: auto;
          color: #434654;
          font-size: 17px;
        }

        /* MAIN */

        .main {
          margin-left: 242px;
          width: calc(100% - 242px);
          min-height: 100vh;
        }

        .topbar {
          height: 60px;
          padding: 0 26px;
          background: rgba(255, 255, 255, 0.96);
          border-bottom: 1px solid #e2e7ff;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 12px;
        }

        .top-search {
          width: 230px;
          height: 34px;
          padding: 0 12px;
          border-radius: 18px;
          background: #f2f3ff;
          color: #737685;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
        }

        .top-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .date-button,
        .icon-button {
          border: 0;
          background: #f2f3ff;
          color: #434654;
          height: 34px;
          border-radius: 17px;
          padding: 0 13px;
          font-size: 10px;
          font-weight: 700;
        }

        .date-button {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .icon-button {
          width: 34px;
          padding: 0;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .notification-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          background: #ba1a1a;
          border-radius: 50%;
          top: 7px;
          right: 7px;
        }

        .order-button,
        .add-product {
          border: 0;
          color: white;
          background: #0052cc;
          font-weight: 800;
          border-radius: 9px;
          height: 36px;
          padding: 0 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 11px;
        }

        /* CONTENT */

        .content {
          padding: 20px 25px 30px;
          max-width: 1600px;
          margin: 0 auto;
        }

        .breadcrumb {
          color: #434654;
          font-size: 9px;
          font-weight: 700;
          margin-bottom: 5px;
        }

        .breadcrumb span {
          color: #003d9b;
        }

        .page-heading {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 18px;
        }

        .page-heading h1 {
          margin: 0;
          font-size: 23px;
          line-height: 1.2;
          color: #131b2e;
          letter-spacing: -0.7px;
        }

        .page-heading p {
          margin: 6px 0 0;
          max-width: 390px;
          color: #737685;
          font-size: 11px;
          line-height: 1.45;
        }

        .add-product {
          margin-top: 2px;
          height: 36px;
        }

        /* SUMMARY */

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          margin-bottom: 13px;
        }

        .summary-card {
          background: #ffffff;
          border: 1px solid #edf0fa;
          border-radius: 12px;
          min-height: 110px;
          overflow: hidden;
        }

        .summary-top {
          padding: 12px 13px 9px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .summary-title {
          color: #737685;
          font-size: 9px;
          font-weight: 700;
        }

        .summary-value {
          margin-top: 4px;
          color: #131b2e;
          font-size: 22px;
          line-height: 1;
          font-weight: 800;
        }

        .summary-value span {
          font-size: 9px;
          margin-left: 4px;
          color: #737685;
          font-weight: 500;
        }

        .summary-icon {
          width: 39px;
          height: 39px;
          border-radius: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .summary-icon.blue {
          background: #e2e7ff;
          color: #0040a2;
        }

        .summary-icon.cyan {
          background: #b3ebff;
          color: #00677d;
        }

        .summary-icon.red {
          background: #ffe1e1;
          color: #ba1a1a;
        }

        .summary-icon.green {
          background: #e7f8ec;
          color: #004f1f;
        }

        .summary-bottom {
          border-top: 1px solid #edf0fa;
          min-height: 34px;
          padding: 8px 13px;
          display: flex;
          justify-content: space-between;
          gap: 7px;
          color: #737685;
          font-size: 8px;
        }

        .summary-bottom strong {
          color: #004f1f;
          white-space: nowrap;
        }

        .summary-bottom .red-text {
          color: #ba1a1a;
        }

        /* FILTER */

        .filter-box {
          height: 54px;
          padding: 8px 11px;
          border-radius: 12px;
          background: #ffffff;
          border: 1px solid #edf0fa;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .filter-search {
          width: 300px;
          height: 33px;
          border-radius: 9px;
          background: #f2f3ff;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 0 11px;
          color: #737685;
          font-size: 9px;
        }

        .filters {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .filter-label {
          color: #434654;
          font-size: 8px;
          font-weight: 700;
        }

        .filter {
          height: 29px;
          padding: 0 10px;
          border: 0;
          border-radius: 15px;
          background: #f2f3ff;
          color: #434654;
          font-size: 8px;
          font-weight: 700;
        }

        .filter.active {
          background: #0052cc;
          color: #ffffff;
        }

        /* INVENTORY */

        .inventory-card {
          margin-top: 11px;
          background: #ffffff;
          border-radius: 12px;
          border: 1px solid #edf0fa;
          overflow: hidden;
        }

        .inventory-header {
          height: 48px;
          padding: 0 13px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .inventory-title {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 13px;
        }

        .green-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #008a43;
          display: inline-block;
        }

        .live-badge {
          padding: 4px 7px;
          border-radius: 6px;
          background: #f2f3ff;
          color: #737685;
          font-size: 7px;
          font-weight: 700;
        }

        .inventory-note {
          color: #737685;
          font-size: 8px;
        }

        .table-header,
        .product-row {
          display: grid;
          grid-template-columns:
            2.2fr
            1.15fr
            0.8fr
            0.8fr
            1.15fr
            0.8fr
            0.8fr
            0.65fr;
          column-gap: 12px;
          align-items: center;
        }

        .table-header {
          min-height: 42px;
          padding: 0 13px;
          background: #e2e7ff;
          color: #434654;
          font-size: 7px;
          line-height: 1.2;
          font-weight: 800;
        }

        .product-row {
          min-height: 88px;
          padding: 7px 13px;
          border-bottom: 1px solid #edf0fa;
        }

        .product-info {
          display: flex;
          align-items: center;
          gap: 9px;
          min-width: 0;
        }

        .product-image {
          width: 53px;
          height: 65px;
          border-radius: 8px;
          background: #f7f8fc;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
        }

        .product-image img {
          object-fit: contain;
        }

        .product-name-area {
          min-width: 0;
        }

        .product-name {
          font-size: 10px;
          font-weight: 800;
          line-height: 1.25;
          color: #131b2e;
        }

        .product-description {
          margin-top: 3px;
          font-size: 8px;
          color: #737685;
          line-height: 1.25;
        }

        .sku-area {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .sku-area strong {
          color: #001f27;
          font-size: 8px;
        }

        .sku-area span {
          color: #737685;
          font-size: 7px;
          line-height: 1.2;
        }

        .price-area .price {
          display: flex;
          align-items: center;
          gap: 3px;
          font-size: 10px;
          font-weight: 800;
          color: #131b2e;
        }

        .price span,
        .modal-area span {
          font-size: 8px;
        }

        .modal-area {
          color: #737685;
          font-size: 9px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .modal-area strong {
          font-size: 8px;
          font-weight: 500;
        }

        .stock-area {
          min-width: 80px;
        }

        .stock-number {
          font-size: 8px;
          font-weight: 800;
          margin-bottom: 5px;
          color: #004f1f;
        }

        .stock-area:has(.red) .stock-number {
          color: #ba1a1a;
        }

        .stock-progress {
          height: 6px;
          background: #e2e7ff;
          border-radius: 5px;
          overflow: hidden;
        }

        .stock-fill {
          height: 100%;
          border-radius: 5px;
          background: #00677d;
        }

        .stock-fill.red {
          background: #ba1a1a;
        }

        .stock-fill.blue {
          background: #00677d;
        }

        .stock-label {
          margin-top: 4px;
          font-size: 7px;
          font-weight: 700;
          text-align: right;
        }

        .stock-label.safe {
          color: #004f1f;
        }

        .stock-label.danger {
          color: #ba1a1a;
        }

        .bottle-area {
          text-align: center;
        }

        .bottle-number {
          display: inline-flex;
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background: #f2f3ff;
          align-items: center;
          justify-content: center;
          color: #131b2e;
          font-size: 11px;
          font-weight: 800;
        }

        .bottle-text {
          font-size: 7px;
          margin-top: -9px;
          color: #434654;
        }

        .non-refill {
          color: #737685;
          font-size: 8px;
          font-style: italic;
          line-height: 1.35;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          width: fit-content;
          padding: 5px 8px;
          border-radius: 20px;
          font-size: 7px;
          font-weight: 800;
        }

        .status-badge.available {
          color: #004f1f;
          background: #7ffc97;
        }

        .status-badge.critical {
          color: #ba1a1a;
          background: #ffe0e0;
        }

        .status-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: currentColor;
        }

        .action-area {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .update-button {
          border: 0;
          background: #e2e7ff;
          color: #131b2e;
          border-radius: 6px;
          height: 25px;
          padding: 0 8px;
          font-size: 7px;
          font-weight: 800;
        }

        .cart-icon {
          color: #0052cc;
        }

        .critical-action {
          width: 22px;
          height: 22px;
          border-radius: 6px;
          background: #ffe0e0;
          color: #ba1a1a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 17px;
          font-weight: 700;
        }

        .inventory-footer {
          min-height: 37px;
          padding: 0 13px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #737685;
          font-size: 8px;
        }

        .revenue {
          margin-left: 6px;
          color: #0052cc;
          font-size: 12px;
        }

        /* BOTTOM */

        .bottom-grid {
          display: grid;
          grid-template-columns: 1.65fr 1fr;
          gap: 11px;
          margin-top: 11px;
        }

        .restock-card,
        .empty-bottle-card {
          background: #ffffff;
          border: 1px solid #edf0fa;
          border-radius: 12px;
          overflow: hidden;
        }

        .section-heading {
          height: 46px;
          padding: 0 13px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .section-heading > div {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .section-heading svg {
          color: #0052cc;
        }

        .section-heading strong {
          font-size: 13px;
        }

        .section-heading button {
          border: 0;
          background: transparent;
          color: #0052cc;
          font-size: 8px;
          font-weight: 800;
        }

        .restock-list {
          padding: 0 10px;
        }

        .restock-item {
          min-height: 63px;
          margin-bottom: 6px;
          border-radius: 10px;
          background: #f2f3ff;
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 8px;
        }

        .restock-icon {
          width: 31px;
          height: 31px;
          flex-shrink: 0;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .blue-bg {
          color: #0052cc;
          background: #b3ebff;
        }

        .red-bg {
          color: #ba1a1a;
          background: #ffd8d8;
        }

        .green-bg {
          color: #004f1f;
          background: #7ffc97;
        }

        .restock-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .restock-info strong {
          font-size: 9px;
        }

        .restock-info span {
          color: #737685;
          font-size: 7px;
          line-height: 1.3;
        }

        .restock-status {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 5px;
        }

        .restock-status small {
          font-size: 7px;
          color: #434654;
        }

        .tag {
          padding: 5px 8px;
          border-radius: 12px;
          font-size: 7px;
          font-weight: 800;
        }

        .cyan-tag {
          color: #00677d;
          background: #b3ebff;
        }

        .red-tag {
          color: #ba1a1a;
          background: #ffd8d8;
        }

        .green-tag {
          color: #004f1f;
          background: #7ffc97;
        }

        .supplier-footer {
          padding: 8px 13px 12px;
          border-top: 1px solid #edf0fa;
          display: flex;
          justify-content: space-between;
          color: #737685;
          font-size: 7px;
        }

        .supplier-footer button {
          border: 0;
          background: transparent;
          color: #0052cc;
          display: flex;
          align-items: center;
          gap: 2px;
          font-size: 7px;
          font-weight: 800;
        }

        /* EMPTY BOTTLES */

        .empty-bottle-card {
          padding-bottom: 10px;
        }

        .small-blue-dot {
          width: 7px;
          height: 7px;
          background: #00677d;
          border-radius: 50%;
        }

        .total-bottles {
          padding: 8px 13px;
          margin: 0 10px 5px;
          background: #f2f3ff;
          border-radius: 9px;
        }

        .total-bottles > div:first-child {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .total-bottles span {
          font-size: 8px;
          color: #434654;
        }

        .total-bottles strong {
          font-size: 12px;
        }

        .bottle-progress {
          display: flex;
          height: 7px;
          margin-top: 8px;
          border-radius: 6px;
          overflow: hidden;
          background: #e2e7ff;
        }

        .bottle-progress span:first-child {
          width: 81%;
          background: #004f1f;
        }

        .bottle-progress span:last-child {
          width: 19%;
          background: #ba1a1a;
        }

        .bottle-legend {
          margin-top: 5px;
          display: flex;
          justify-content: space-between;
        }

        .bottle-legend span {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 7px;
        }

        .green-dot-small,
        .red-dot-small {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          display: inline-block;
        }

        .green-dot-small {
          background: #004f1f;
        }

        .red-dot-small {
          background: #ba1a1a;
        }

        .empty-row {
          padding: 7px 13px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #f0f1f8;
          font-size: 8px;
        }

        .empty-row strong {
          font-size: 8px;
        }

        .claim-row {
          padding: 8px 13px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #ba1a1a;
          font-size: 8px;
        }

        .claim-row strong {
          background: #ffd8d8;
          padding: 4px 7px;
          border-radius: 5px;
          font-size: 7px;
        }

        .print-button {
          margin: 4px 13px 0;
          width: calc(100% - 26px);
          height: 29px;
          border: 0;
          border-radius: 15px;
          background: #e2e7ff;
          color: #131b2e;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 8px;
          font-weight: 800;
        }

        /* RESPONSIVE */

        @media (max-width: 1200px) {
          .sidebar {
            width: 205px;
          }

          .main {
            margin-left: 205px;
            width: calc(100% - 205px);
          }

          .content {
            padding: 18px;
          }

          .summary-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .filter-box {
            height: auto;
            padding: 10px;
            flex-direction: column;
            align-items: stretch;
          }

          .filter-search {
            width: 100%;
          }

          .filters {
            flex-wrap: wrap;
          }
        }

        @media (max-width: 850px) {
          .sidebar {
            position: relative;
            width: 180px;
          }

          .main {
            margin-left: 0;
            width: calc(100% - 180px);
          }

          .table-header,
          .product-row {
            min-width: 950px;
          }

          .inventory-card {
            overflow-x: auto;
          }

          .bottom-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}