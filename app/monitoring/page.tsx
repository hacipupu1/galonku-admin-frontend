"use client";

import "./monitoring.css";

type IconProps = {
  size?: number;
};

const DashboardIcon = ({ size = 18 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.8" />
    <rect x="14" y="4" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.8" />
    <rect x="4" y="14" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.8" />
    <rect x="14" y="14" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const ClipboardIcon = ({ size = 18 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="5" y="4" width="14" height="17" rx="2" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M9 4V3.5C9 2.95 9.45 2.5 10 2.5H14C14.55 2.5 15 2.95 15 3.5V4"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M9 10H15M9 14H15M9 18H13"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const BoxIcon = ({ size = 18 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M4 7.5L12 3L20 7.5V17L12 21L4 17V7.5Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M4 7.5L12 12L20 7.5M12 12V21"
      stroke="currentColor"
      strokeWidth="1.8"
    />
  </svg>
);

const TruckIcon = ({ size = 18 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M3 6H14V17H3V6Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M14 10H18L21 13V17H14V10Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <circle cx="7" cy="18" r="2" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="17" cy="18" r="2" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const WalletIcon = ({ size = 18 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M4 6.5C4 5.4 4.9 4.5 6 4.5H19C20.1 4.5 21 5.4 21 6.5V18C21 19.1 20.1 20 19 20H6C4.9 20 4 19.1 4 18V6.5Z"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path d="M4 8H21" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M16 14H19"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const SearchIcon = ({ size = 17 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M16 16L21 21"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const BellIcon = ({ size = 19 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M18 9C18 5.7 15.8 3.5 12 3.5C8.2 3.5 6 5.7 6 9C6 15 4 16 4 17H20C20 16 18 15 18 9Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M10 20C10.5 20.7 11.2 21 12 21C12.8 21 13.5 20.7 14 20"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const PlusIcon = ({ size = 17 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 5V19M5 12H19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const UsersIcon = ({ size = 22 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M3.5 19C3.5 15.9 5.8 14 9 14C12.2 14 14.5 15.9 14.5 19"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <circle cx="17" cy="9" r="2.3" stroke="currentColor" strokeWidth="1.7" />
    <path
      d="M16 14C18.6 14.1 20.5 15.7 20.5 18"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

const BikeIcon = ({ size = 22 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="6" cy="17" r="3" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="18" cy="17" r="3" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M6 17L9 10H13L18 17M9 10L7.5 7H5M13 10L15 7H18"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const StoreIcon = ({ size = 22 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M4 10V20H20V10" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M3 10L5 4H19L21 10"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M4 10C4.8 11.3 6 12 7.5 12C9 12 10.2 11.3 11 10C11.8 11.3 13 12 14.5 12C16 12 17.2 11.3 18 10C18.8 11.3 20 12 21 10"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path d="M9 20V15H15V20" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const ClockIcon = ({ size = 22 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M12 7V12L15.5 14"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const MapIcon = ({ size = 16 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M9 18L3.5 20V6L9 4L15 6L20.5 4V18L15 20L9 18Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M9 4V18M15 6V20"
      stroke="currentColor"
      strokeWidth="1.8"
    />
  </svg>
);

const PhoneIcon = ({ size = 15 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M7 3.5L10 5L8.5 8.5C9.5 10.5 11 12 13 13L16.5 11.5L18 14.5C18.5 15.5 18.1 16.7 17.1 17.3L15.8 18.1C14.9 18.7 13.7 18.7 12.8 18.2C8.4 15.8 5.2 12.6 2.8 8.2C2.3 7.3 2.3 6.1 2.9 5.2L3.7 3.9C4.3 2.9 5.5 2.5 6.5 3L7 3.5Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

const UserPlusIcon = ({ size = 18 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M3.5 19C3.5 15.9 5.8 14 9 14C12.2 14 14.5 15.9 14.5 19"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M18 8V14M15 11H21"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const LogoutIcon = ({ size = 18 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M10 4H5C4.4 4 4 4.4 4 5V19C4 19.6 4.4 20 5 20H10"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M14 8L18 12L14 16M18 12H8"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const RouteIcon = ({ size = 18 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="6" cy="18" r="2" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="18" cy="6" r="2" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M8 18C13 18 10 11 15 8"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const PackageIcon = ({ size = 15 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M4 7L12 3L20 7V17L12 21L4 17V7Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <path
      d="M4 7L12 11L20 7M12 11V21"
      stroke="currentColor"
      strokeWidth="1.7"
    />
  </svg>
);

const MenuIcon = ({ size = 18 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M5 7H19M5 12H19M5 17H19"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

type Driver = {
  name: string;
  vehicle: string;
  plate: string;
  status: "Jalan" | "Standby";
  order?: string;
  task?: string;
  departure?: string;
  estimate?: string;
};

const drivers: Driver[] = [
  {
    name: "Pak Budi Santoso",
    vehicle: "Honda Beat",
    plate: "B 4120 SZX",
    status: "Jalan",
    order: "#ORD-8821",
    task: "Membawa 3 Galon Aqua ke Jl. Mawar No. 12, Kebayoran Gambir",
    departure: "Berangkat 10:45",
    estimate: "Est. 6 menit lagi",
  },
  {
    name: "Mas Doni Wijaya",
    vehicle: "Honda Vario",
    plate: "B 6891 PQR",
    status: "Jalan",
    order: "#ORD-8822",
    task: "Membawa 2 Galon Le Minerale ke Gandaria Heights",
    departure: "Berangkat 10:55",
    estimate: "Est. 12 menit lagi",
  },
  {
    name: "Pak Agus Prasetyo",
    vehicle: "Honda Scoopy",
    plate: "B 3310 KLM",
    status: "Standby",
  },
  {
    name: "Hendra Kurnia",
    vehicle: "Honda Revo",
    plate: "B 5502 TYA",
    status: "Jalan",
    order: "#ORD-8824",
    task: "Membawa 4 Galon (2 Aqua + 2 Club) ke Apartemen Gandaria Lt. 14",
    departure: "Berangkat 11:05",
    estimate: "Est. 15 menit lagi",
  },
];

const orders = [
  {
    id: "#ORD-8821",
    time: "10:42 WIB",
    driver: "Pak Budi",
    plate: "B 4120 SZX",
    address: "Jl. Mawar No. 12",
    phone: "Feli Utriani (0812–9988–xxx)",
    note: "Patokan: Sebelah Pos RW 03",
    amount: "3 Galon Aqua",
    progress: 75,
    estimate: "6 mnt lagi",
    distance: "Jarak: 600m ke titik kirim",
    status: "Diantar",
  },
  {
    id: "#ORD-8822",
    time: "10:51 WIB",
    driver: "Mas Doni",
    plate: "B 6891 PQR",
    address: "Gandaria Heights Lt. 08 #8B",
    phone: "Bpk. Ronald (0817–2345–xxxx)",
    note: "Titip di Lobby Resepsionis",
    amount: "2 Galon Le Minerale",
    progress: 45,
    estimate: "12 mnt lagi",
    distance: "Jarak: 1,8 KM (Lampu Merah Kyi Maja)",
    status: "Diantar",
  },
  {
    id: "#ORD-8824",
    time: "11:02 WIB",
    driver: "Hendra K.",
    plate: "B 5502 TYA",
    address: "Apartemen Ipan Residences Lt. 14",
    phone: "Sdr. Kevin Hadi (0852–1100–xxxx)",
    note: "Bawa Troli Depo",
    amount: "4 Galon Campur",
    progress: 25,
    estimate: "15 mnt lagi",
    distance: "Jarak: 2,7 KM (Baru keluar Depo)",
    status: "Diantar",
  },
  {
    id: "#ORD-8825",
    time: "11:15 WIB",
    driver: "Rian Pratama",
    plate: "B 3912 BKN",
    address: "Komp. Lemigas Blok B4",
    phone: "Ibu Maya (0811–9441–xxxx)",
    note: "Bayar COD Rp 54.000",
    amount: "3 Galon Aqua",
    progress: 0,
    estimate: "Depo JKT-04",
    distance: "Persiapan berangkat",
    status: "Diproses",
  },
];

export default function MonitoringPage() {
  return (
    <main className="monitoring-page">

      {/* ================= SIDEBAR ================= */}
      <aside className="sidebar">

        <div className="brand">
          <div className="brand-title">
            GalonKu<span>Admin</span>
          </div>

          <div className="brand-subtitle">
            Portal Manajemen &amp; Operasional
          </div>
        </div>

        <div className="menu-heading">
          MENU UTAMA
        </div>

        <nav className="navigation">

          <button className="nav-item">
            <DashboardIcon />
            <span>Dashboard</span>
          </button>

          <button className="nav-item">
            <ClipboardIcon />
            <span>Manajemen Pesanan</span>
          </button>

          <button className="nav-item">
            <BoxIcon />
            <span>Produk &amp; Stok</span>
          </button>

          <button className="nav-item active">
            <TruckIcon />
            <span>Monitoring Pengantaran</span>
          </button>

          <button className="nav-item">
            <WalletIcon />
            <span>Laporan Keuangan</span>
          </button>

        </nav>

        <div className="admin-profile">

          <div className="profile-avatar">
            BS
            <span />
          </div>

          <div className="profile-text">
            <strong>Budi Santoso</strong>
            <small>Super Admin</small>
          </div>

          <button className="logout-button">
            <LogoutIcon />
          </button>

        </div>

      </aside>

      {/* ================= CONTENT ================= */}
      <section className="content-area">

        {/* HEADER */}
        <header className="topbar">

          <div className="topbar-space" />

          <div className="global-search">
            <SearchIcon size={16} />
            <input
              type="text"
              placeholder="Cari pesanan, resi, kurir..."
            />
          </div>

          <button className="date-button">
            <span className="calendar-symbol">▣</span>
            Hari ini, 24 Mei
          </button>

          <button className="notification">
            <BellIcon />
            <i />
          </button>

          <button className="create-order">
            <PlusIcon />
            Buat Pesanan
          </button>

        </header>

        {/* PAGE INTRO */}
        <section className="page-intro">

          <div className="intro-left">

            <div className="eyebrow">
              <TruckIcon size={14} />
              FLEET LOGISTICS &amp; LIVE DISPATCH
            </div>

            <h1>
              Monitoring Pengantaran
            </h1>

            <p>
              Pelacakan armada kurir motor, status pengiriman
              pesanan, dan efisiensi rute depo secara langsung.
            </p>

          </div>

          <div className="intro-actions">

            <div className="view-controls">

              <button className="view-control active">
                <ClipboardIcon size={14} />
                Daftar
              </button>

              <button className="view-control">
                <MapIcon size={14} />
                Live Peta
              </button>

              <button className="refresh">
                ↻
              </button>

            </div>

            <button className="add-driver">
              <UserPlusIcon />
              Tambah Armada Kurir
            </button>

          </div>

        </section>

        {/* ================= STATISTICS ================= */}
        <section className="statistics">

          <div className="stat-card">

            <div className="stat-content">
              <span className="stat-label">
                Total Armada
              </span>

              <div className="stat-number">
                6
                <small>Kurir Motor</small>
              </div>

              <div className="stat-description blue">
                <span>✣</span>
                Kapasitas 100% Siaga
              </div>
            </div>

            <div className="stat-icon blue">
              <UsersIcon />
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-content">
              <span className="stat-label">
                Sedang Mengantar
              </span>

              <div className="stat-number">
                4
                <small>Kurir di Jalan</small>
              </div>

              <div className="stat-description cyan">
                <span>●</span>
                11 Galon Sedang Dikirim
              </div>
            </div>

            <div className="stat-icon cyan">
              <BikeIcon />
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-content">
              <span className="stat-label">
                Standby Depo
              </span>

              <div className="stat-number">
                2
                <small>Siap Muat Kirim</small>
              </div>

              <div className="stat-description green">
                <span>◷</span>
                Idle &lt; 8 Menit
              </div>
            </div>

            <div className="stat-icon green">
              <StoreIcon />
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-content">
              <span className="stat-label">
                Rata-rata Waktu
              </span>

              <div className="stat-number">
                18
                <small>Menit / Pesanan</small>
              </div>

              <div className="stat-description blue">
                <span>↗</span>
                3.2 mnt lebih cepat dr SLA
              </div>
            </div>

            <div className="stat-icon purple">
              <ClockIcon />
            </div>

          </div>

        </section>

        {/* ================= FILTER ================= */}
        <section className="filter-bar">

          <div className="tabs">

            <button className="tab active">
              Semua Armada (6)
            </button>

            <button className="tab">
              Sedang Jalan (4)
            </button>

            <button className="tab">
              Standby Depo (2)
            </button>

            <button className="tab">
              Riwayat Hari Ini
            </button>

          </div>

          <div className="driver-search">
            <SearchIcon size={15} />

            <input
              type="text"
              placeholder="Cari kurir, plat, order..."
            />
          </div>

        </section>

        {/* ================= LOWER CONTENT ================= */}
        <section className="dashboard-grid">

          {/* KURIR */}
          <div className="driver-column">

            <div className="column-heading">

              <div className="column-title">
                <ClipboardIcon size={17} />
                Kurir Lapangan
              </div>

              <span className="moving-badge">
                4 / 6 Bergerak
              </span>

            </div>

            <div className="driver-list">

              {drivers.map((driver) => (
                <div
                  className="driver-card"
                  key={driver.name}
                >

                  <div className="driver-header">

                    <div>
                      <h3>{driver.name}</h3>

                      <div className="vehicle">
                        <span className="vehicle-dot" />
                        {driver.vehicle} • {driver.plate}
                      </div>
                    </div>

                    <span
                      className={
                        driver.status === "Jalan"
                          ? "driver-status jalan"
                          : "driver-status standby"
                      }
                    >
                      <span>●</span>

                      {driver.status === "Jalan"
                        ? "Di Jalan"
                        : "Standby Depo"}
                    </span>

                  </div>

                  {driver.status === "Jalan" ? (
                    <>
                      <div className="task-card">

                        <div className="task-top">
                          <span>Tugas Saat Ini</span>
                          <strong>{driver.order}</strong>
                        </div>

                        <p>
                          {driver.task}
                        </p>

                        <div className="task-progress">
                          <div />
                        </div>

                        <div className="task-time">
                          <span>{driver.departure}</span>
                          <strong>{driver.estimate}</strong>
                        </div>

                      </div>

                      <div className="driver-buttons">

                        <button className="contact">
                          <PhoneIcon />
                          Hubungi
                        </button>

                        <button className="track">
                          <MapIcon />
                          Pantau Rute
                        </button>

                      </div>
                    </>
                  ) : (
                    <>
                      <div className="standby-card">

                        <span>
                          Status Depo
                        </span>

                        <strong>
                          Siap Antar Kloter Baru
                        </strong>

                        <p>
                          Telah menyelesaikan 7 pengantaran pagi.
                          Siap menerima penugasan kloter berikutnya.
                        </p>

                      </div>

                      <button className="assign">
                        <ClipboardIcon size={14} />
                        Tugaskan Pesanan Antre
                      </button>
                    </>
                  )}

                </div>
              ))}

            </div>

          </div>

          {/* TABLE */}
          <div className="delivery-panel">

            <div className="panel-heading">

              <div>
                <h2>
                  <RouteIcon />
                  Tabel Pengantaran Aktif
                </h2>

                <p>
                  Pesanan yang sedang dalam proses pengiriman
                  oleh kurir depo
                </p>
              </div>

              <button className="sort">
                Diurutkan:
                <strong>
                  Estimasi SLA Terdekat
                </strong>
              </button>

            </div>

            <div className="table-container">

              <table>

                <thead>
                  <tr>
                    <th>NO.<br />ORDER</th>
                    <th>KURIR &amp;<br />ARMADA</th>
                    <th>ALAMAT TUJUAN</th>
                    <th>MUATAN</th>
                    <th>PROGRESS /<br />ESTIMASI</th>
                    <th>STATUS</th>
                  </tr>
                </thead>

                <tbody>

                  {orders.map((order) => (
                    <tr key={order.id}>

                      <td>
                        <div className="order-id">
                          {order.id}
                        </div>

                        <div className="order-time">
                          {order.time}
                        </div>
                      </td>

                      <td>

                        <div className="courier-cell">

                          <div className="mini-avatar">
                            {order.driver.charAt(0)}
                          </div>

                          <div>
                            <strong>
                              {order.driver}
                            </strong>

                            <span>
                              {order.plate}
                            </span>
                          </div>

                        </div>

                      </td>

                      <td>

                        <div className="address">

                          <strong>
                            {order.address}
                          </strong>

                          <span>
                            {order.phone}
                          </span>

                          <small>
                            {order.note}
                          </small>

                        </div>

                      </td>

                      <td>

                        <span className="package">
                          <PackageIcon />
                          {order.amount}
                        </span>

                      </td>

                      <td>

                        {order.progress > 0 ? (
                          <div className="progress-cell">

                            <div className="progress-info">

                              <strong>
                                {order.progress}% Selesai
                              </strong>

                              <span>
                                {order.estimate}
                              </span>

                            </div>

                            <div className="progress-track">
                              <div
                                style={{
                                  width: `${order.progress}%`,
                                }}
                              />
                            </div>

                            <small>
                              {order.distance}
                            </small>

                          </div>
                        ) : (
                          <div className="loading-cell">

                            <strong>
                              Sedang Muat
                            </strong>

                            <div className="loading-track">
                              <div />
                            </div>

                            <small>
                              {order.distance}
                            </small>

                          </div>
                        )}

                      </td>

                      <td>

                        <span
                          className={
                            order.status === "Diantar"
                              ? "status delivered"
                              : "status processing"
                          }
                        >
                          ● {order.status}
                        </span>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </section>

      </section>

    </main>
  );
}