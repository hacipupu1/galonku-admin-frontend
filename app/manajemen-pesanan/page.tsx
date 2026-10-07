"use client";

import Sidebar from "../components/sidebar";

const orders = [
  {
    id: "#ORD-8824",
    time: "Hari ini, 10:15 WIB",
    type: "Refill Instan (30m)",
    customer: "Fia Salsa",
    phone: "0812-9844-3211",
    address: "Kost Sakura No. 4, Lt. 2",
    item: "2x Aqua 19L Refill",
    detail: "Tukar Galon Kosong",
    price: "Rp 36.000",
    payment: "QRIS • Lunas",
    status: "Menunggu Konfirmasi",
    statusType: "waiting",
    courier: "Tugaskan Kurir",
  },
  {
    id: "#ORD-8823",
    time: "Hari ini, 10:02 WIB",
    type: "Refill Terjadwal",
    customer: "Agus Setiawan",
    phone: "0857-1120-9943",
    address: "Jl. Ciputat Raya No. 18B",
    item: "3x Le Minerale 19L",
    detail: "Galon Baru + 2 Refill",
    price: "Rp 89.000",
    payment: "BCA • Lunas",
    status: "Diproses Depo",
    statusType: "process",
    courier: "Pak Budi K.",
  },
  {
    id: "#ORD-8822",
    time: "Hari ini, 09:48 WIB",
    type: "Refill Instan",
    customer: "Dewi Anggraini",
    phone: "0813-8871-0021",
    address: "Paku Terrace Twr S-1208",
    item: "1x Aqua 19L",
    detail: "Tukar Galon Kosong",
    price: "Rp 18.000",
    payment: "COD • Tunai",
    status: "Diantar Kurir",
    statusType: "delivery",
    courier: "Rian Irawan",
  },
  {
    id: "#ORD-8821",
    time: "Hari ini, 09:20 WIB",
    type: "Refill Reguler",
    customer: "Warung Kopi Mas Jon",
    phone: "0878-5544-2201",
    address: "Jl. Tukuh Nyak Arief No. 51",
    item: "5x Aqua 19L Refill",
    detail: "Langganan Bisnis UMKM",
    price: "Rp 91.000",
    payment: "QRIS • Lunas",
    status: "Selesai Diterima",
    statusType: "success",
    courier: "Pak Budi K.",
  },
  {
    id: "#ORD-8820",
    time: "Hari ini, 08:50 WIB",
    type: "Refill Reguler",
    customer: "Hendro Pratama",
    phone: "0812-7788-3312",
    address: "Apartemen Kemang Blok B4/12",
    item: "2x Cleo 19L Eco Refill",
    detail: "Bebas BPA Galon",
    price: "Rp 34.000",
    payment: "GoPay • Lunas",
    status: "Selesai Diterima",
    statusType: "success",
    courier: "Deni Setiawan",
  },
  {
    id: "#ORD-8819",
    time: "Hari ini, 08:35 WIB",
    type: "Refill (Siang)",
    customer: "Siti Nurhaliza",
    phone: "0896-1234-9001",
    address: "Jl. Kebayoran Lama No. 44",
    item: "1x Aqua 19L + Pompa Elektrik",
    detail: "Beli Unit Pompa Baru",
    price: "Rp 68.000",
    payment: "Menunggu Verif",
    status: "Diproses Depo",
    statusType: "process",
    courier: "Jadwalkan",
  },
  {
    id: "#ORD-8818",
    time: "Hari ini, 08:10 WIB",
    type: "Dibatalkan Pelanggan",
    customer: "Bambang Tri",
    phone: "0811-9222-3112",
    address: "Jl. Pijaya Raya No. 10",
    item: "2x Vit 19L Refill",
    detail: "Alasan: Salah input alamat",
    price: "Rp 30.000",
    payment: "Refund Dana Selesai",
    status: "Dibatalkan",
    statusType: "cancel",
    courier: "-",
  },
];

export default function ManajemenPesananPage() {
  return (
    <div className="page">
      <Sidebar />

      <main className="main-content">
        {/* TOP BAR */}
        <header className="topbar">
          <div className="search">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Cari pesanan, resi, kurir..."
            />
          </div>

          <div className="date">▣ Hari Ini, 24 Mei</div>

          <div className="notification">●</div>

          <button className="top-button">+ Buat Pesanan</button>
        </header>

        {/* CONTENT */}
        <section className="content">
          <div className="title-row">
            <div>
              <div className="title-with-icon">
                <span className="title-icon">▣</span>
                <h1>Manajemen Pesanan</h1>
              </div>

              <p>
                Kelola, verifikasi, dan pantau status transaksi pemesanan
                galon pelanggan secara real-time.
              </p>
            </div>

            <div className="title-actions">
              <button className="export-button">
                ↓
                <span>
                  Ekspor
                  <br />
                  (CSV/Excel)
                </span>
              </button>

              <button className="manual-button">
                +
                <span>
                  Buat Pesanan
                  <br />
                  Manual
                </span>
              </button>
            </div>
          </div>

          {/* STATISTICS */}
          <div className="stats">
            <div className="stat-card">
              <span className="stat-label">TOTAL PESANAN HARI INI</span>
              <strong>48</strong>
              <small>↗ +14% dr kemarin</small>
              <div className="stat-icon blue">🛒</div>
            </div>

            <div className="stat-card">
              <span className="stat-label">PERLU KONFIRMASI</span>
              <strong>4</strong>
              <small className="red-text">◉ Respon &lt; 5mnt</small>
              <div className="stat-icon red">▣</div>
            </div>

            <div className="stat-card">
              <span className="stat-label">SEDANG DIANTAR</span>
              <strong>5</strong>
              <small>♧ 4 Armada aktif</small>
              <div className="stat-icon cyan">▱</div>
            </div>

            <div className="stat-card">
              <span className="stat-label">TOTAL OMZET TERCATAT</span>
              <strong>Rp 864.000</strong>
              <small>✓ 92% Lunas</small>
              <div className="stat-icon blue">▣</div>
            </div>
          </div>

          {/* TABS */}
          <div className="tabs-card">
            <button className="tab active">
              Semua <span>48</span>
            </button>

            <button className="tab">
              Menunggu Konfirmasi <span>4</span>
            </button>

            <button className="tab">
              Diproses Depo <span>6</span>
            </button>

            <button className="tab">
              Dalam Pengantaran <span>5</span>
            </button>

            <button className="tab">
              Selesai <span>31</span>
            </button>

            <button className="tab">
              Dibatalkan <span>2</span>
            </button>
          </div>

          {/* FILTER */}
          <div className="filter-card">
            <div className="filter-search">
              ⌕
              <input
                type="text"
                placeholder="Cari berdasarkan No. Order (#ORD-...), nama..."
              />
            </div>

            <button>▣ Hari Ini (24 Mei)⌄</button>
            <button>♢ Semua Galon⌄</button>
            <button>▣ Pembayaran⌄</button>
            <button>↯</button>
          </div>

          {/* TABLE */}
          <div className="table-card">
            <div className="table-head">
              <div>NO. ORDER & WAKTU</div>
              <div>PELANGGAN & LOKASI</div>
              <div>ITEM PESANAN</div>
              <div>TAGIHAN & BAYAR</div>
              <div>STATUS</div>
              <div>KURIR PENGANTAR</div>
              <div>AKSI</div>
            </div>

            {orders.map((order) => (
              <div className="order-row" key={order.id}>
                <div>
                  <strong className="order-id">{order.id}</strong>
                  <small>{order.time}</small>
                  <span
                    className={`order-type ${
                      order.statusType === "cancel"
                        ? "cancel-text"
                        : ""
                    }`}
                  >
                    {order.type}
                  </span>
                </div>

                <div>
                  <strong>{order.customer}</strong>
                  <small>{order.phone}</small>
                  <small>⌖ {order.address}</small>
                </div>

                <div className="item-cell">
                  <span className="bottle">♧</span>
                  <div>
                    <strong>{order.item}</strong>
                    <small>{order.detail}</small>
                  </div>
                </div>

                <div>
                  <strong>{order.price}</strong>
                  <span className={`payment ${order.statusType}`}>
                    {order.payment}
                  </span>
                </div>

                <div>
                  <span className={`status ${order.statusType}`}>
                    ● {order.status}
                  </span>
                </div>

                <div>
                  <strong>{order.courier}</strong>
                  {order.courier !== "-" && (
                    <small>
                      {order.statusType === "delivery"
                        ? "ETA: 8 mnt lagi"
                        : "Siap Angkut"}
                    </small>
                  )}
                </div>

                <div className="actions">
                  <button>◉</button>
                  <button>◉</button>
                  <button>⋮</button>
                </div>
              </div>
            ))}

            <div className="pagination">
              <span>Menampilkan 1–7 dari 48 pesanan</span>

              <div>
                <button>‹</button>
                <button className="page-active">1</button>
                <button>2</button>
                <button>3</button>
                <button>...</button>
                <button>5</button>
                <button>›</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .page {
          min-height: 100vh;
          background: #f7f8fc;
          color: #182230;
        }

        .main-content {
          margin-left: 220px;
          min-height: 100vh;
        }

        .topbar {
          height: 62px;
          background: #ffffff;
          border-bottom: 1px solid #e8ebf1;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 12px;
          padding: 0 20px;
        }

        .search {
          width: 245px;
          height: 32px;
          border-radius: 18px;
          background: #f3f4fb;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 0 12px;
          color: #9aa1ad;
          font-size: 12px;
        }

        .search input {
          width: 100%;
          border: none;
          outline: none;
          background: transparent;
          font-size: 10px;
        }

        .date {
          height: 32px;
          padding: 0 13px;
          display: flex;
          align-items: center;
          border-radius: 8px;
          background: #f3f4fb;
          font-size: 10px;
          color: #343b48;
        }

        .notification {
          color: #d51f35;
          font-size: 12px;
        }

        .top-button,
        .manual-button {
          border: none;
          background: #0052ff;
          color: #ffffff;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 700;
        }

        .top-button {
          height: 34px;
          padding: 0 17px;
          font-size: 10px;
        }

        .content {
          padding: 22px;
        }

        .title-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 18px;
        }

        .title-with-icon {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .title-icon {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: #eaf2ff;
          color: #0052ff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        h1 {
          margin: 0;
          font-size: 21px;
          font-weight: 800;
        }

        .title-row p {
          margin: 5px 0 0 38px;
          color: #7c8492;
          font-size: 10px;
        }

        .title-actions {
          display: flex;
          gap: 8px;
        }

        .export-button,
        .manual-button {
          min-width: 120px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .export-button {
          border: 1px solid #e2e6ee;
          border-radius: 8px;
          background: white;
          color: #3d4654;
          font-size: 10px;
          font-weight: 600;
        }

        .manual-button {
          font-size: 10px;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 16px;
        }

        .stat-card {
          min-height: 90px;
          padding: 14px;
          border: 1px solid #edf0f5;
          border-radius: 10px;
          background: white;
          position: relative;
        }

        .stat-label {
          display: block;
          font-size: 8px;
          color: #737b87;
          font-weight: 700;
          margin-bottom: 7px;
        }

        .stat-card strong {
          display: block;
          font-size: 21px;
          color: #17202c;
        }

        .stat-card small {
          display: block;
          margin-top: 5px;
          color: #26a35a;
          font-size: 8px;
        }

        .red-text {
          color: #dc3545 !important;
        }

        .stat-icon {
          position: absolute;
          right: 13px;
          top: 13px;
          width: 34px;
          height: 34px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-icon.blue {
          background: #eaf2ff;
        }

        .stat-icon.red {
          background: #ffebed;
        }

        .stat-icon.cyan {
          background: #e1f9fc;
        }

        .tabs-card {
          background: white;
          border: 1px solid #edf0f5;
          border-radius: 10px 10px 0 0;
          padding: 8px;
          display: flex;
          gap: 5px;
        }

        .tab {
          border: none;
          background: transparent;
          padding: 9px 13px;
          border-radius: 7px;
          font-size: 9px;
          cursor: pointer;
          color: #4b5563;
        }

        .tab span {
          margin-left: 4px;
          padding: 2px 5px;
          border-radius: 10px;
          background: #edf0f5;
        }

        .tab.active {
          background: #0052ff;
          color: white;
        }

        .tab.active span {
          background: rgba(255, 255, 255, 0.2);
          color: white;
        }

        .filter-card {
          background: white;
          border-left: 1px solid #edf0f5;
          border-right: 1px solid #edf0f5;
          padding: 9px;
          display: flex;
          gap: 7px;
        }

        .filter-search {
          flex: 1;
          height: 34px;
          border: 1px solid #e7eaf0;
          border-radius: 7px;
          display: flex;
          align-items: center;
          padding: 0 10px;
          gap: 7px;
          color: #9aa1ad;
        }

        .filter-search input {
          width: 100%;
          border: none;
          outline: none;
          font-size: 9px;
        }

        .filter-card button {
          border: 1px solid #e7eaf0;
          background: white;
          border-radius: 7px;
          padding: 0 12px;
          font-size: 9px;
          color: #4b5563;
        }

        .table-card {
          background: white;
          border: 1px solid #edf0f5;
          border-radius: 0 0 10px 10px;
          overflow: hidden;
        }

        .table-head,
        .order-row {
          display: grid;
          grid-template-columns:
            0.9fr
            1.45fr
            1.45fr
            1.1fr
            1.15fr
            1.3fr
            0.65fr;
        }

        .table-head {
          padding: 12px;
          background: #f4f5fc;
          color: #667085;
          font-size: 8px;
          font-weight: 800;
        }

        .order-row {
          min-height: 102px;
          padding: 12px;
          border-top: 1px solid #edf0f5;
          align-items: center;
          font-size: 9px;
        }

        .order-row > div {
          padding-right: 10px;
        }

        .order-row strong {
          display: block;
          color: #1d2735;
          font-size: 9px;
        }

        .order-row small {
          display: block;
          margin-top: 4px;
          color: #7c8492;
          font-size: 8px;
        }

        .order-id {
          color: #0052ff !important;
          font-size: 10px !important;
        }

        .order-type {
          display: block;
          margin-top: 6px;
          color: #db3143;
          font-size: 8px;
          font-weight: 600;
        }

        .cancel-text {
          color: #d63031 !important;
        }

        .item-cell {
          display: flex;
          gap: 7px;
          align-items: center;
        }

        .bottle {
          width: 28px;
          height: 28px;
          border-radius: 7px;
          background: #eef2ff;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #4169e1;
        }

        .payment {
          display: inline-block;
          margin-top: 5px;
          padding: 4px 6px;
          border-radius: 5px;
          background: #d5f7df;
          color: #087d34;
          font-size: 7px;
          font-weight: 700;
        }

        .payment.process {
          background: #e4e7ff;
          color: #4c52a5;
        }

        .payment.delivery {
          background: #d9f6fb;
          color: #16788b;
        }

        .payment.cancel {
          background: #ffe1df;
          color: #d63131;
        }

        .status {
          display: inline-block;
          padding: 6px 8px;
          border-radius: 12px;
          font-size: 7px;
          font-weight: 700;
        }

        .status.waiting {
          color: #c72f3c;
          background: #ffe6e8;
        }

        .status.process {
          color: #5553a6;
          background: #e5e6ff;
        }

        .status.delivery {
          color: #168096;
          background: #d9f7fb;
        }

        .status.success {
          color: #13883e;
          background: #d9f8e2;
        }

        .status.cancel {
          color: #d33a37;
          background: #ffe1df;
        }

        .actions {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .actions button {
          border: none;
          background: transparent;
          cursor: pointer;
          color: #687385;
        }

        .pagination {
          min-height: 46px;
          padding: 0 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #727b88;
          font-size: 8px;
        }

        .pagination div {
          display: flex;
          gap: 4px;
        }

        .pagination button {
          width: 26px;
          height: 25px;
          border: none;
          border-radius: 5px;
          background: transparent;
          cursor: pointer;
          font-size: 8px;
        }

        .pagination .page-active {
          background: #0052ff;
          color: white;
        }

        @media (max-width: 1000px) {
          .stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .main-content {
            margin-left: 200px;
          }

          .table-card {
            overflow-x: auto;
          }

          .table-head,
          .order-row {
            min-width: 1100px;
          }
        }
      `}</style>
    </div>
  );
}