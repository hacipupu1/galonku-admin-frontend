"use client";

import { useState } from "react";

type StockItem = {
  name: string;
  description: string;
  stock: number;
  status: string;
  image: string;
};

const stockItems: StockItem[] = [
  {
    name: "Aqua 19L",
    description: "Air Mineral Alami",
    stock: 5,
    status: "Status Kritis",
    image: "/aqua.png",
  },
  {
    name: "Le Minerale 15L",
    description: "Galon Sekali Pakai",
    stock: 4,
    status: "Mendekati limit",
    image: "/le-minerale.png",
  },
  {
    name: "Cleo 19L",
    description: "Pure Demineralized",
    stock: 2,
    status: "Sangat Kritis",
    image: "/cleo.png",
  },
  {
    name: "Vit 19L",
    description: "Air Minum Higienis",
    stock: 1,
    status: "Segera Habis!",
    image: "/vit.png",
  },
];

const orders = [
  {
    id: "#ORD-8824",
    time: "Baru saja",
    customer: "Fia Salsa",
    phone: "0812-9844-3211",
    address: "Kost Sakura No. 4, Lt. 2",
    product: "Aqua 19L",
    qty: "2x",
    total: "Rp 36.000",
    payment: "QRIS • Lunas",
    status: "Menunggu Konfirmasi",
    courier: "Tugaskan Kurir",
  },
  {
    id: "#ORD-8823",
    time: "5 mnt lalu",
    customer: "Bpk. Hendra Gunawan",
    phone: "0857-1120-9943",
    address: "Jl. Cendrawasih 3 No. 88",
    product: "Le Minerale 15L",
    qty: "3x",
    total: "Rp 17.000",
    payment: "Transfer BCA",
    status: "Diantar",
    courier: "Mas Doni",
  },
  {
    id: "#ORD-8822",
    time: "12 mnt lalu",
    customer: "Ibu Rina Kartika",
    phone: "0813-8877-4601",
    address: "Apartemen Gardenia Lt. 14",
    product: "Aqua 19L",
    qty: "3x",
    total: "Rp 54.000",
    payment: "COD • Tunai",
    status: "Diantar",
    courier: "Pak Budi",
  },
  {
    id: "#ORD-8821",
    time: "18 mnt lalu",
    customer: "Kedai Kopi Senja",
    phone: "0821-4550-1289",
    address: "Ruko Permata Blok B-3",
    product: "Cleo 19L",
    qty: "2x",
    total: "Rp 58.000",
    payment: "Saldo GalonKu",
    status: "Selesai",
    courier: "Pak Budi",
  },
  {
    id: "#ORD-8820",
    time: "30 mnt lalu",
    customer: "Klinik Gigi Medika",
    phone: "0811-9233-0012",
    address: "Jl. Radio Dalam No. 44",
    product: "Aqua 19L",
    qty: "4x",
    total: "Rp 72.000",
    payment: "QRIS Statis",
    status: "Selesai",
    courier: "Deni",
  },
];

const chartData = [
  { time: "08:00", value: 25 },
  { time: "09:00", value: 52 },
  { time: "10:00", value: 68 },
  { time: "11:00", value: 65 },
  { time: "12:00", value: 82 },
  { time: "13:00", value: 88 },
  { time: "14:00", value: 55 },
  { time: "15:00", value: 92 },
  { time: "16:00", value: 67 },
  { time: "17:00", value: 73 },
  { time: "18:00", value: 45 },
];

export default function LaporanKeuanganPage() {
  const [period, setPeriod] = useState("Hari Ini");

  return (
    <div className="app-shell">

      {/* ================= SIDEBAR ================= */}
      <aside className="sidebar">

        <div className="brand">
          <div className="brand-title">GalonKu Admin</div>

          <div className="brand-subtitle">
            Portal Manajemen & Operasional
          </div>
        </div>

        <div className="menu-title">MENU UTAMA</div>

        <nav className="navigation">

          <a href="/" className="nav-item">
            <span className="nav-icon">⊞</span>
            <span>Dashboard</span>
          </a>

          <a href="/manajemen-pesanan" className="nav-item">
            <span className="nav-icon">▣</span>
            <span>Manajemen Pesanan</span>
          </a>

          <a href="#" className="nav-item">
            <span className="nav-icon">▤</span>
            <span>Produk & Stok</span>
          </a>

          <a href="#" className="nav-item">
            <span className="nav-icon">▱</span>
            <span>Monitoring Pengantaran</span>
          </a>

          <a
            href="/laporan-keuangan"
            className="nav-item active"
          >
            <span className="nav-icon">▥</span>
            <span>Laporan Keuangan</span>
          </a>

        </nav>

        <div className="sidebar-user">

          <div className="user-avatar">
            N
          </div>

          <div className="user-info">
            <strong>Budi Santoso</strong>
            <span>Super Admin</span>
          </div>

          <div className="logout-icon">
            ↪
          </div>

        </div>

      </aside>

      {/* ================= MAIN ================= */}
      <main className="main-content">

        {/* ================= TOP BAR ================= */}
        <header className="topbar">

          <div></div>

          <div className="topbar-right">

            <div className="search-box">
              <span>⌕</span>

              <input
                placeholder="Cari pesanan, resi, kurir..."
              />
            </div>

            <div className="date-box">
              ▣ &nbsp; Hari ini, 24 Mei
            </div>

            <div className="notification">
              ●
            </div>

            <button className="top-order-button">
              + Buat Pesanan
            </button>

          </div>

        </header>

        {/* ================= CONTENT ================= */}
        <section className="content">

          {/* ================= PAGE HEADER ================= */}
          <div className="page-header">

            <div>

              <div className="location">
                <span>Depo Kebayoran Lama</span>
                <small>· ID: DPO-JKT-04</small>
              </div>

              <h1>
                Ringkasan Operasional Hari Ini
              </h1>

              <p>
                Pantau status pesanan, armada kurir, dan kelancaran order
                real-time.
              </p>

            </div>

            <div className="header-actions">

              <button className="filter-button">
                ☷ &nbsp; Filter Tampilan
              </button>

              <button className="refresh-button">
                ↻ &nbsp; Refresh Data
              </button>

            </div>

          </div>

          {/* ================= STAT CARDS ================= */}
          <div className="stats-grid">

            <div className="stat-card">

              <div>

                <div className="stat-label">
                  TOTAL PESANAN HARI INI
                </div>

                <div className="stat-value">
                  48
                </div>

                <div className="stat-footer green">
                  ↗ +14% vs kemarin (42 pesanan)
                </div>

              </div>

              <div className="stat-icon blue">
                ▣
              </div>

            </div>

            <div className="stat-card">

              <div>

                <div className="stat-label">
                  TOTAL PENDAPATAN
                </div>

                <div className="stat-value">
                  Rp 864.000
                </div>

                <div className="stat-footer green">
                  ↗ +8.5% melebihi target harian
                </div>

              </div>

              <div className="stat-icon green">
                ▣
              </div>

            </div>

            <div className="stat-card">

              <div>

                <div className="stat-label">
                  SISA STOK GALON
                </div>

                <div className="stat-value red">
                  12

                  <span className="small-value">
                    Galon Tersisa
                  </span>
                </div>

                <div className="stat-footer red">
                  ⚠ Perlu Restok Segera
                </div>

              </div>

              <div className="stat-icon red">
                ◉
              </div>

            </div>

            <div className="stat-card">

              <div>

                <div className="stat-label">
                  KURIR BERTUGAS
                </div>

                <div className="stat-value">
                  5 / 6
                </div>

                <div className="stat-footer blue-text">
                  ◉ 18 mnt Rata-rata waktu sampai
                </div>

              </div>

              <div className="stat-icon cyan">
                ♧
              </div>

            </div>

          </div>

          {/* ================= TWO COLUMN AREA ================= */}
          <div className="dashboard-grid">

            {/* ================= CHART ================= */}
            <section className="chart-card">

              <div className="card-header">

                <div>

                  <h2>
                    Grafik Tren Pesanan & Pendapatan
                  </h2>

                  <p>
                    Distribusi muatan pengantaran galon jam sibuk
                    (08:00 - 18:00 WIB)
                  </p>

                </div>

                <div className="chart-header-right">

                  <div className="live-badge">
                    <span></span>
                    Live
                    <br />
                    Sync
                  </div>

                  <div className="period-switch">

                    <button
                      className={
                        period === "Hari Ini"
                          ? "period active"
                          : "period"
                      }
                      onClick={() =>
                        setPeriod("Hari Ini")
                      }
                    >
                      Hari
                      <br />
                      Ini
                    </button>

                    <button
                      className={
                        period === "7 Hari"
                          ? "period active"
                          : "period"
                      }
                      onClick={() =>
                        setPeriod("7 Hari")
                      }
                    >
                      7
                      <br />
                      Hari
                    </button>

                    <button
                      className={
                        period === "30 Hari"
                          ? "period active"
                          : "period"
                      }
                      onClick={() =>
                        setPeriod("30 Hari")
                      }
                    >
                      30
                      <br />
                      Hari
                    </button>

                  </div>

                </div>

              </div>

              {/* GRAPH */}
              <div className="graph-area">

                <svg
                  viewBox="0 0 900 330"
                  className="graph-svg"
                  preserveAspectRatio="none"
                >

                  <defs>

                    <linearGradient
                      id="areaGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >

                      <stop
                        offset="0%"
                        stopColor="#3b82f6"
                        stopOpacity="0.30"
                      />

                      <stop
                        offset="100%"
                        stopColor="#3b82f6"
                        stopOpacity="0.03"
                      />

                    </linearGradient>

                    <linearGradient
                      id="lineGradient"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >

                      <stop
                        offset="0%"
                        stopColor="#1464d2"
                      />

                      <stop
                        offset="70%"
                        stopColor="#1674d8"
                      />

                      <stop
                        offset="100%"
                        stopColor="#42c9df"
                      />

                    </linearGradient>

                  </defs>

                  {/* AREA */}
                  <path
                    d="
                      M 20 270
                      C 90 225, 130 165, 210 145
                      C 270 128, 300 160, 355 145
                      C 410 130, 445 90, 490 100
                      C 540 110, 565 210, 615 190
                      C 670 168, 680 65, 740 35
                      C 790 10, 820 90, 875 120
                      L 875 270
                      L 20 270
                      Z
                    "
                    fill="url(#areaGradient)"
                  />

                  {/* LINE */}
                  <path
                    d="
                      M 20 270
                      C 90 225, 130 165, 210 145
                      C 270 128, 300 160, 355 145
                      C 410 130, 445 90, 490 100
                      C 540 110, 565 210, 615 190
                      C 670 168, 680 65, 740 35
                      C 790 10, 820 90, 875 120
                    "
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />

                  {/* VERTICAL BARS */}

                  <rect
                    x="90"
                    y="230"
                    width="14"
                    height="40"
                    rx="7"
                    fill="#d8e1f8"
                  />

                  <rect
                    x="190"
                    y="160"
                    width="14"
                    height="110"
                    rx="7"
                    fill="#d8e1f8"
                  />

                  <rect
                    x="290"
                    y="145"
                    width="14"
                    height="125"
                    rx="7"
                    fill="#d8e1f8"
                  />

                  <rect
                    x="390"
                    y="125"
                    width="14"
                    height="145"
                    rx="7"
                    fill="#0c60c9"
                  />

                  <rect
                    x="490"
                    y="105"
                    width="14"
                    height="165"
                    rx="7"
                    fill="#0c60c9"
                  />

                  <rect
                    x="590"
                    y="200"
                    width="14"
                    height="70"
                    rx="7"
                    fill="#d8e1f8"
                  />

                  <rect
                    x="690"
                    y="70"
                    width="14"
                    height="200"
                    rx="7"
                    fill="#48c8e3"
                  />

                  <rect
                    x="790"
                    y="145"
                    width="14"
                    height="125"
                    rx="7"
                    fill="#d8e1f8"
                  />

                </svg>

                {/* TOOLTIP */}
                <div className="graph-tooltip">

                  <strong>
                    <span>●</span> 13:00 • Puncak Pesanan
                  </strong>

                  <div>
                    9 Galon / jam • Rp 162.000
                  </div>

                </div>

                {/* TIME */}
                <div className="time-labels">

                  {chartData.map((item) => (
                    <span
                      key={item.time}
                      className={
                        item.time === "13:00"
                          ? "selected-time"
                          : ""
                      }
                    >
                      {item.time}
                    </span>
                  ))}

                </div>

              </div>

              {/* CHART SUMMARY */}
              <div className="chart-summary">

                <div className="summary-box">

                  <span className="summary-line navy"></span>

                  <div>

                    <small>
                      Aqua 19L Dominan
                    </small>

                    <strong>
                      58.3% Total Order
                    </strong>

                  </div>

                </div>

                <div className="summary-box">

                  <span className="summary-line cyan-line"></span>

                  <div>

                    <small>
                      Rute Pengiriman Cepat
                    </small>

                    <strong>
                      Radius 2.4 KM
                    </strong>

                  </div>

                </div>

                <div className="summary-box">

                  <span className="summary-line green-line"></span>

                  <div>

                    <small>
                      Pembayaran Non-Tunai
                    </small>

                    <strong>
                      82% Via QRIS & Transfer
                    </strong>

                  </div>

                </div>

              </div>

            </section>

            {/* ================= STOCK ================= */}
            <section className="stock-card">

              <div className="stock-header">

                <div className="stock-title-area">

                  <div className="stock-danger-icon">
                    ◉
                  </div>

                  <div>

                    <h2>
                      Stok Galon
                      <br />
                      Menipis
                    </h2>

                    <p>
                      Depo Pusat Kebayoran
                    </p>

                  </div>

                </div>

                <div className="variant-badge">
                  <strong>4</strong>
                  <span>Varian</span>
                </div>

              </div>

              <div className="stock-list">

                {stockItems.map((item) => (
                  <div
                    className="stock-item"
                    key={item.name}
                  >

                    <div className="bottle-image-wrapper">

                      <img
                        src={item.image}
                        alt={item.name}
                        className="bottle-image"
                      />

                    </div>

                    <div className="bottle-info">

                      <strong>
                        {item.name}
                      </strong>

                      <span>
                        {item.description}
                      </span>

                    </div>

                    <div className="stock-status">

                      <div className="stock-number">
                        Sisa {item.stock}
                        <br />
                        galon
                      </div>

                      <span>
                        {item.status}
                      </span>

                    </div>

                  </div>
                ))}

              </div>

              <button className="restock-button">
                🚚 + Order Restok Galon ke Pabrik
              </button>

            </section>

          </div>

          {/* ================= CATEGORY ================= */}
          <section className="category-card">

            <div className="category-header">

              <div>

                <h2>
                  Ringkasan Kategori Galon Terjual Hari Ini
                </h2>

                <p>
                  Total akumulasi 48 galon terjual dari 4 varian utama
                </p>

              </div>

              <strong>
                100% Tercatat
              </strong>

            </div>

            <div className="category-progress">

              <span className="progress-aqua"></span>
              <span className="progress-leminerale"></span>
              <span className="progress-cleo"></span>
              <span className="progress-vit"></span>

            </div>

            <div className="category-grid">

              <div className="category-item">

                <strong>
                  🔵 Aqua 19L
                </strong>

                <span>
                  28 galon
                </span>

                <small>
                  Rp 504.000
                </small>

                <small>
                  (58%)
                </small>

              </div>

              <div className="category-item">

                <strong>
                  🔵 Le Minerale 15L
                </strong>

                <span>
                  12 galon
                </span>

                <small>
                  Rp 204.000
                </small>

                <small>
                  (25%)
                </small>

              </div>

              <div className="category-item">

                <strong>
                  🔵 Cleo 19L
                </strong>

                <span>
                  5 galon
                </span>

                <small>
                  Rp 90.000
                </small>

                <small>
                  (10%)
                </small>

              </div>

              <div className="category-item">

                <strong>
                  🔵 Vit 19L
                </strong>

                <span>
                  3 galon
                </span>

                <small>
                  Rp 66.000
                </small>

                <small>
                  (7%)
                </small>

              </div>

            </div>

          </section>

          {/* ================= ORDERS ================= */}
          <section className="orders-card">

            <div className="orders-header">

              <div>

                <h2>
                  Pesanan Terbaru Masuk (Live Orders)
                </h2>

                <p>
                  Daftar transaksi pesanan galon yang perlu diproses
                  dan ditugaskan ke kurir
                </p>

              </div>

              <div className="orders-actions">

                <button className="small-filter active">
                  Semua
                </button>

                <button className="small-filter">
                  Perlu Ditugaskan
                </button>

                <button className="small-filter">
                  Diantar
                </button>

                <button className="export-button">
                  ↓ &nbsp; Ekspor CSV
                </button>

              </div>

            </div>

            <div className="table-wrapper">

              <table>

                <thead>

                  <tr>

                    <th>
                      NO. ORDER
                      <br />
                      & WAKTU
                    </th>

                    <th>
                      PELANGGAN
                    </th>

                    <th>
                      PRODUK GALON
                    </th>

                    <th>
                      TOTAL BAYAR
                    </th>

                    <th>
                      METODE BAYAR
                    </th>

                    <th>
                      STATUS PENGANTARAN
                    </th>

                    <th>
                      AKSI CEPAT
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {orders.map((order) => (
                    <tr key={order.id}>

                      <td>

                        <strong className="order-id">
                          {order.id}
                        </strong>

                        <span className="table-muted">
                          {order.time}
                        </span>

                      </td>

                      <td>

                        <strong>
                          {order.customer}
                        </strong>

                        <span className="table-muted">
                          {order.phone}
                        </span>

                        <span className="table-muted">
                          {order.address}
                        </span>

                      </td>

                      <td>

                        <strong>
                          {order.qty} {order.product}
                        </strong>

                        <span className="table-muted">
                          Galon Air Minum
                        </span>

                      </td>

                      <td>

                        <strong>
                          {order.total}
                        </strong>

                        <span className="table-muted">
                          Gratis Ongkir
                        </span>

                      </td>

                      <td>

                        <span className="payment-pill">
                          {order.payment}
                        </span>

                      </td>

                      <td>

                        <span
                          className={
                            order.status === "Selesai"
                              ? "status-pill success"
                              : order.status === "Diantar"
                              ? "status-pill delivered"
                              : "status-pill process"
                          }
                        >
                          ● {order.status}
                        </span>

                      </td>

                      <td>

                        <button className="detail-button">
                          Detail
                        </button>

                        <button className="more-button">
                          ⋮
                        </button>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

            <div className="pagination">

              <span>
                Menampilkan 5 dari 48 pesanan hari ini
              </span>

              <div>

                <button>
                  ‹
                </button>

                <button className="page-active">
                  1
                </button>

                <button>
                  2
                </button>

                <button>
                  3
                </button>

                <button>
                  ...
                </button>

                <button>
                  Selanjutnya
                </button>

              </div>

            </div>

          </section>

        </section>

      </main>

      {/* ================= STYLE ================= */}
      <style jsx>{`

        * {
          box-sizing: border-box;
        }

        .app-shell {
          min-height: 100vh;
          display: flex;
          background: #f7f8fc;
          color: #172033;
          font-family: Arial, Helvetica, sans-serif;
        }

        /* SIDEBAR */

        .sidebar {
          width: 220px;
          min-height: 100vh;
          background: #ffffff;
          border-right: 1px solid #e7eaf1;
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          z-index: 20;
        }

        .brand {
          padding: 20px 20px 25px;
          border-bottom: 1px solid #f0f1f5;
        }

        .brand-title {
          color: #075dc8;
          font-size: 18px;
          font-weight: 800;
          letter-spacing: -0.5px;
        }

        .brand-subtitle {
          margin-top: 4px;
          color: #8a93a3;
          font-size: 9px;
        }

        .menu-title {
          margin: 26px 20px 10px;
          color: #89919f;
          font-size: 9px;
          font-weight: 700;
        }

        .navigation {
          padding: 0 10px;
        }

        .nav-item {
          height: 40px;
          margin-bottom: 4px;
          padding: 0 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          border-radius: 8px;
          text-decoration: none;
          color: #3f4653;
          font-size: 12px;
          font-weight: 500;
          transition: 0.2s ease;
        }

        .nav-item:hover {
          background: #edf4ff;
          color: #075dc8;
        }

        .nav-item.active {
          background: #0864cf;
          color: #ffffff;
          box-shadow: 0 5px 12px rgba(8, 100, 207, 0.18);
        }

        .nav-icon {
          width: 18px;
          text-align: center;
          font-size: 14px;
        }

        .sidebar-user {
          margin-top: auto;
          margin: auto 10px 12px;
          padding: 9px 10px;
          border-radius: 10px;
          background: #f1f5ff;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .user-avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #172033;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 700;
        }

        .user-info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .user-info strong {
          font-size: 10px;
        }

        .user-info span {
          font-size: 8px;
          color: #768096;
        }

        .logout-icon {
          font-size: 16px;
          color: #657083;
        }

        /* MAIN */

        .main-content {
          margin-left: 220px;
          width: calc(100% - 220px);
          min-height: 100vh;
        }

        .topbar {
          height: 58px;
          background: #ffffff;
          border-bottom: 1px solid #e8ebf1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 22px;
        }

        .topbar-right {
          width: 100%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 12px;
        }

        .search-box {
          width: 270px;
          height: 34px;
          background: #f4f5fb;
          border-radius: 18px;
          display: flex;
          align-items: center;
          padding: 0 12px;
          color: #8992a4;
        }

        .search-box input {
          width: 100%;
          border: none;
          outline: none;
          background: transparent;
          margin-left: 6px;
          font-size: 10px;
        }

        .date-box {
          padding: 9px 12px;
          background: #f5f6fb;
          border-radius: 8px;
          font-size: 10px;
          color: #4b5362;
        }

        .notification {
          color: #df3c3c;
          font-size: 9px;
        }

        .top-order-button {
          border: none;
          background: #0864cf;
          color: white;
          padding: 10px 17px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 600;
        }

        /* CONTENT */

        .content {
          padding: 22px 25px 40px;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 18px;
        }

        .location {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 5px;
        }

        .location span {
          background: #eef4ff;
          color: #2369bd;
          padding: 5px 9px;
          border-radius: 7px;
          font-size: 9px;
          font-weight: 600;
        }

        .location small {
          color: #8b94a4;
          font-size: 9px;
        }

        h1 {
          margin: 0;
          font-size: 21px;
          line-height: 1.2;
          letter-spacing: -0.5px;
        }

        .page-header p {
          margin: 5px 0 0;
          color: #7c8595;
          font-size: 9px;
        }

        .header-actions {
          display: flex;
          gap: 8px;
        }

        .filter-button,
        .refresh-button {
          height: 35px;
          padding: 0 13px;
          border-radius: 8px;
          font-size: 10px;
          font-weight: 600;
          border: 1px solid #e2e6ee;
          background: white;
        }

        .refresh-button {
          color: white;
          background: #0864cf;
          border-color: #0864cf;
        }

        /* STAT */

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 16px;
        }

        .stat-card {
          min-height: 92px;
          background: #ffffff;
          border: 1px solid #edf0f5;
          border-radius: 12px;
          padding: 15px;
          display: flex;
          justify-content: space-between;
          box-shadow: 0 2px 10px rgba(25, 40, 70, 0.02);
        }

        .stat-label {
          font-size: 8px;
          color: #8b94a4;
          font-weight: 700;
          margin-bottom: 6px;
        }

        .stat-value {
          font-size: 21px;
          font-weight: 800;
          color: #172033;
        }

        .stat-value.red {
          color: #d74747;
        }

        .small-value {
          font-size: 9px;
          color: #d74747;
          font-weight: 500;
          margin-left: 5px;
        }

        .stat-footer {
          margin-top: 6px;
          font-size: 8px;
        }

        .stat-footer.green {
          color: #22a85a;
        }

        .stat-footer.red {
          color: #d74747;
        }

        .blue-text {
          color: #2378cf;
        }

        .stat-icon {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
        }

        .stat-icon.blue {
          color: #2875cf;
          background: #eaf2ff;
        }

        .stat-icon.green {
          color: #25a65b;
          background: #ddf7e7;
        }

        .stat-icon.red {
          color: #d94c4c;
          background: #ffe9e9;
        }

        .stat-icon.cyan {
          color: #31a8c7;
          background: #e1f7fc;
        }

        /* GRID */

        .dashboard-grid {
          display: grid;
          grid-template-columns: minmax(0, 2fr) minmax(320px, 0.9fr);
          gap: 15px;
          align-items: stretch;
        }

        .chart-card,
        .stock-card,
        .category-card,
        .orders-card {
          background: white;
          border: 1px solid #edf0f5;
          border-radius: 13px;
          box-shadow: 0 2px 12px rgba(25, 40, 70, 0.025);
        }

        .chart-card {
          padding: 18px;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .card-header h2,
        .stock-card h2,
        .category-card h2,
        .orders-card h2 {
          margin: 0;
          font-size: 15px;
          line-height: 1.2;
        }

        .card-header p,
        .stock-header p,
        .category-header p,
        .orders-header p {
          margin: 5px 0 0;
          color: #8b94a4;
          font-size: 8px;
        }

        .chart-header-right {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .live-badge {
          background: #e3eaff;
          color: #225ab3;
          border-radius: 18px;
          padding: 6px 10px;
          font-size: 8px;
          line-height: 1;
          text-align: center;
          font-weight: 700;
        }

        .live-badge span {
          width: 5px;
          height: 5px;
          display: inline-block;
          background: #22bf64;
          border-radius: 50%;
          margin-right: 4px;
        }

        .period-switch {
          display: flex;
          height: 48px;
          background: #edf0ff;
          padding: 3px;
          border-radius: 12px;
        }

        .period {
          min-width: 50px;
          border: none;
          background: transparent;
          border-radius: 9px;
          font-size: 9px;
          color: #414a5c;
        }

        .period.active {
          background: white;
          color: #0d4e9c;
          font-weight: 700;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
        }

        /* GRAPH */

        .graph-area {
          height: 310px;
          margin-top: 15px;
          background: #fbfbfe;
          border-radius: 10px;
          position: relative;
          overflow: hidden;
        }

        .graph-svg {
          width: 100%;
          height: 270px;
          display: block;
          margin-top: 22px;
        }

        .graph-tooltip {
          position: absolute;
          left: 53%;
          top: 25px;
          transform: translateX(-50%);
          background: #263348;
          color: white;
          border-radius: 10px;
          padding: 9px 15px;
          min-width: 170px;
          box-shadow: 0 5px 16px rgba(24, 35, 55, 0.2);
          font-size: 8px;
        }

        .graph-tooltip strong {
          display: block;
          margin-bottom: 3px;
        }

        .graph-tooltip strong span {
          color: #42c9df;
        }

        .graph-tooltip div {
          color: #d6deec;
        }

        .time-labels {
          position: absolute;
          bottom: 7px;
          left: 14px;
          right: 14px;
          display: flex;
          justify-content: space-between;
          color: #777f90;
          font-size: 8px;
        }

        .selected-time {
          color: #075dc8;
          font-weight: 800;
        }

        .chart-summary {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-top: 13px;
        }

        .summary-box {
          min-height: 70px;
          background: #f2f3fd;
          border-radius: 9px;
          padding: 12px;
          display: flex;
          gap: 9px;
        }

        .summary-line {
          width: 5px;
          min-width: 5px;
          height: 30px;
          border-radius: 5px;
        }

        .summary-line.navy {
          background: #0956b7;
        }

        .summary-line.cyan-line {
          background: #44c7e4;
        }

        .summary-line.green-line {
          background: #50d875;
        }

        .summary-box div {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .summary-box small {
          color: #697285;
          font-size: 8px;
        }

        .summary-box strong {
          font-size: 10px;
        }

        /* STOCK */

        .stock-card {
          padding: 18px;
        }

        .stock-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 15px;
        }

        .stock-title-area {
          display: flex;
          gap: 9px;
        }

        .stock-danger-icon {
          width: 30px;
          height: 30px;
          border-radius: 9px;
          background: #ffe9e9;
          color: #dc4c4c;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stock-header h2 {
          font-size: 16px;
        }

        .variant-badge {
          background: #ffe7e7;
          color: #ce3e3e;
          border-radius: 18px;
          min-width: 50px;
          padding: 7px 8px;
          text-align: center;
        }

        .variant-badge strong {
          display: block;
          font-size: 11px;
        }

        .variant-badge span {
          font-size: 7px;
        }

        .stock-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .stock-item {
          min-height: 73px;
          background: #f8f9fd;
          border-radius: 10px;
          padding: 8px;
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .bottle-image-wrapper {
          width: 55px;
          height: 58px;
          background: #edf1f7;
          border-radius: 7px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
        }

        .bottle-image {
          width: 48px;
          height: 54px;
          object-fit: contain;
          display: block;
        }

        .bottle-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .bottle-info strong {
          font-size: 10px;
        }

        .bottle-info span {
          font-size: 8px;
          color: #727b8d;
        }

        .stock-status {
          width: 65px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
        }

        .stock-number {
          padding: 5px 7px;
          background: #ffdcdc;
          color: #cf3f3f;
          border-radius: 7px;
          font-size: 8px;
          font-weight: 700;
          line-height: 1.05;
        }

        .stock-status > span {
          font-size: 8px;
          color: #bd4040;
        }

        .restock-button {
          width: 100%;
          margin-top: 13px;
          height: 37px;
          border: none;
          border-radius: 8px;
          background: #075fc7;
          color: white;
          font-size: 10px;
          font-weight: 600;
        }

        /* CATEGORY */

        .category-card {
          margin-top: 15px;
          padding: 17px;
        }

        .category-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .category-header strong {
          color: #1d61ae;
          font-size: 9px;
        }

        .category-progress {
          height: 7px;
          margin-top: 12px;
          background: #e9ecf5;
          border-radius: 8px;
          overflow: hidden;
          display: flex;
        }

        .category-progress span {
          height: 100%;
        }

        .progress-aqua {
          width: 58%;
          background: #075dc8;
        }

        .progress-leminerale {
          width: 25%;
          background: #44c8e5;
        }

        .progress-cleo {
          width: 10%;
          background: #146f7e;
        }

        .progress-vit {
          width: 7%;
          background: #c73737;
        }

        .category-grid {
          margin-top: 12px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }

        .category-item {
          background: #f2f3fd;
          border-radius: 8px;
          padding: 11px;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .category-item strong {
          font-size: 9px;
        }

        .category-item span {
          font-size: 10px;
          font-weight: 700;
        }

        .category-item small {
          color: #7d8596;
          font-size: 8px;
        }

        /* ORDERS */

        .orders-card {
          margin-top: 15px;
          padding: 18px;
        }

        .orders-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 15px;
        }

        .orders-actions {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .small-filter,
        .export-button {
          border: 1px solid #e5e8ef;
          background: white;
          height: 30px;
          border-radius: 7px;
          padding: 0 9px;
          font-size: 8px;
        }

        .small-filter.active {
          background: #eef4ff;
          color: #075dc8;
          font-weight: 700;
        }

        .export-button {
          margin-left: 5px;
        }

        .table-wrapper {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        thead {
          background: #f1f3fc;
        }

        th {
          padding: 10px 8px;
          text-align: left;
          font-size: 7px;
          color: #626b7c;
          font-weight: 700;
        }

        td {
          padding: 13px 8px;
          border-bottom: 1px solid #edf0f5;
          vertical-align: middle;
          font-size: 8px;
        }

        td strong {
          display: block;
          font-size: 9px;
        }

        .order-id {
          color: #075dc8;
        }

        .table-muted {
          display: block;
          color: #8a92a1;
          font-size: 7px;
          margin-top: 3px;
        }

        .payment-pill {
          background: #e7ebfb;
          color: #3e4e76;
          padding: 5px 7px;
          border-radius: 6px;
          font-size: 7px;
        }

        .status-pill {
          padding: 6px 8px;
          border-radius: 15px;
          display: inline-block;
          font-size: 7px;
          font-weight: 600;
        }

        .status-pill.process {
          color: #c44b4b;
          background: #ffe8e8;
        }

        .status-pill.delivered {
          color: #1975a0;
          background: #dff5fc;
        }

        .status-pill.success {
          color: #21844c;
          background: #dff8e7;
        }

        .detail-button {
          border: none;
          background: #edf1fc;
          color: #3155a1;
          border-radius: 6px;
          padding: 6px 8px;
          font-size: 7px;
        }

        .more-button {
          border: none;
          background: transparent;
          font-size: 15px;
          margin-left: 4px;
        }

        .pagination {
          margin-top: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #81899a;
          font-size: 8px;
        }

        .pagination div {
          display: flex;
          gap: 3px;
        }

        .pagination button {
          min-width: 26px;
          height: 25px;
          border: none;
          background: #f3f4f9;
          border-radius: 6px;
          font-size: 8px;
        }

        .pagination .page-active {
          background: #075dc8;
          color: white;
        }

        @media (max-width: 1100px) {

          .sidebar {
            width: 190px;
          }

          .main-content {
            margin-left: 190px;
            width: calc(100% - 190px);
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .dashboard-grid {
            grid-template-columns: 1fr;
          }

        }

        @media (max-width: 750px) {

          .sidebar {
            position: relative;
            width: 100%;
            min-height: auto;
          }

          .main-content {
            margin-left: 0;
            width: 100%;
          }

          .app-shell {
            display: block;
          }

          .navigation {
            display: flex;
            overflow-x: auto;
          }

          .nav-item {
            white-space: nowrap;
          }

          .sidebar-user {
            display: none;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .page-header,
          .orders-header {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          }

          .chart-summary,
          .category-grid {
            grid-template-columns: 1fr;
          }

          .topbar {
            display: none;
          }

        }

      `}</style>

    </div>
  );
}