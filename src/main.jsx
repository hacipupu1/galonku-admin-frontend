import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Bell, CalendarDays, ChevronDown, ChevronRight, ClipboardList,
  LayoutDashboard, Package, Truck, WalletCards, Search, Plus,
  Users, Bike, Warehouse, Gauge, List, Map, RefreshCw, UserPlus,
  Phone, MapPin, Navigation, X, Save, CircleDollarSign, FileText,
  Filter, ShoppingCart, AlertTriangle, Route, LogOut, Droplets,
  Pencil, Trash2, RotateCcw, CheckCircle2, Clock3, MoreHorizontal
} from "lucide-react";
import "./styles.css";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "orders", label: "Manajemen Pesanan", icon: ClipboardList },
  { id: "products", label: "Produk & Stok", icon: Package },
  { id: "delivery", label: "Monitoring Pengantaran", icon: Truck },
  { id: "finance", label: "Laporan Keuangan", icon: WalletCards },
];

const initialProducts = [
  {
    id: 1,
    name: "Aqua 19 Liter Refill",
    desc: "Air Mineral Pegunungan Alami",
    sku: "GLN-AQUA-19L",
    type: "Galon Tukar Refill",
    sell: 18000,
    cost: 14200,
    stock: 35,
    empty: 18,
    status: "Tersedia",
    category: "Refill",
    image: "/aqua.png"
  },
  {
    id: 2,
    name: "Le Minerale 15 Liter",
    desc: "Bebas BPA / Sekali Pakai",
    sku: "GLN-LMN-15L",
    type: "Galon Sekali Pakai",
    sell: 17000,
    cost: 13800,
    stock: 25,
    empty: 0,
    status: "Tersedia",
    category: "Sekali Pakai",
    image: "/leminerale.png"
  },
  {
    id: 3,
    name: "Cleo 19 Liter Refill",
    desc: "Air Mineral 0 ppm",
    sku: "GLN-CLE-19L",
    type: "Galon Tukar Refill",
    sell: 16500,
    cost: 13000,
    stock: 15,
    empty: 14,
    status: "Stok Kritis",
    category: "Refill",
    image: "/cleo.png"
  },
  {
    id: 4,
    name: "Vit 19 Liter Refill",
    desc: "Air Mineral Higienis Terjangkau",
    sku: "GLN-VIT-19L",
    type: "Galon Tukar Refill",
    sell: 15000,
    cost: 11500,
    stock: 10,
    empty: 10,
    status: "Stok Kritis",
    category: "Refill",
    image: "/vit.png"
  }
];

const couriers = [
  {
    id: 1,
    name: "Pak Budi Santoso",
    vehicle: "Honda Beat",
    plate: "B 4120 SZX",
    state: "Di Jalan",
    order: "#ORD-8821",
    task: "Membawa 3 Galon Aqua ke Jl. Mawar No. 12, Kebayoran Gambang",
    depart: "10:45",
    eta: "6 menit lagi",
    progress: 75,
    destination: "Jl. Mawar No. 12",
    load: "3 Galon Aqua",
    status: "Diantar",
    address: "Patokan: Sebelah Pos RW 03",
    time: "10:42 WIB"
  },
  {
    id: 2,
    name: "Mas Doni Wijaya",
    vehicle: "Honda Vario",
    plate: "B 6891 PQR",
    state: "Di Jalan",
    order: "#ORD-8822",
    task: "Membawa 2 Galon Le Minerale ke Gandaria Heights",
    depart: "10:55",
    eta: "12 menit lagi",
    progress: 45,
    destination: "Gandaria Heights Lt. 08 #8B",
    load: "2 Galon Le Minerale",
    status: "Diantar",
    address: "Titik di Lobby Resepsionis",
    time: "10:51 WIB"
  },
  {
    id: 3,
    name: "Pak Agus Prasetyo",
    vehicle: "Honda Scoopy",
    plate: "3310 KLM",
    state: "Standby Depo",
    order: "",
    task: "",
    depart: "",
    eta: "",
    progress: 0,
    destination: "",
    load: "",
    status: "Standby",
    address: "",
    time: ""
  },
  {
    id: 4,
    name: "Hendra Kurnia",
    vehicle: "Honda Revo",
    plate: "B 5502 TYA",
    state: "Di Jalan",
    order: "#ORD-8824",
    task: "Membawa 4 Galon (2 Aqua + 2 Club) ke Apartemen Gandaria Lt. 14",
    depart: "11:05",
    eta: "15 menit lagi",
    progress: 25,
    destination: "Apartemen Park Residences Lt. 14",
    load: "4 Galon Campur",
    status: "Diantar",
    address: "Bawa Troli Depo",
    time: "11:02 WIB"
  },
  {
    id: 5,
    name: "Rian Pratama",
    vehicle: "Honda Beat",
    plate: "B 3912 BKN",
    state: "Standby Depo",
    order: "#ORD-8825",
    task: "",
    depart: "11:15",
    eta: "",
    progress: 0,
    destination: "Komp. Lemigas Blok B4",
    load: "3 Galon Aqua",
    status: "Diproses",
    address: "Bayar COD Rp54.000",
    time: "11:15 WIB"
  },
  {
    id: 6,
    name: "Sari Lestari",
    vehicle: "Honda Scoopy",
    plate: "B 4321 KLP",
    state: "Standby Depo",
    order: "",
    task: "",
    depart: "",
    eta: "",
    progress: 0,
    destination: "",
    load: "",
    status: "Standby",
    address: "",
    time: ""
  }
];

const rupiah = (n) => "Rp " + Number(n).toLocaleString("id-ID");

function App() {
  const [page, setPage] = useState("products");
  const [products, setProducts] = useState(initialProducts);

  const [productFilter, setProductFilter] =
    useState("Semua Produk (4)");

  const [productSearch, setProductSearch] =
    useState("");

  const [deliveryFilter, setDeliveryFilter] =
    useState("Semua Armada (6)");

  const [deliverySearch, setDeliverySearch] =
    useState("");

  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState("");

  const notify = (message) => {
    setToast(message);

    window.clearTimeout(window.__galonToast);

    window.__galonToast = window.setTimeout(() => {
      setToast("");
    }, 2200);
  };

  const filteredProducts = useMemo(() => {
    let list = products.filter((p) =>
      `${p.name} ${p.sku} ${p.type}`
        .toLowerCase()
        .includes(productSearch.toLowerCase())
    );

    if (productFilter === "Refill (3)") {
      list = list.filter((p) => p.category === "Refill");
    }

    if (productFilter === "Sekali Pakai (1)") {
      list = list.filter((p) => p.category === "Sekali Pakai");
    }

    if (productFilter === "Perlu Restok (2)") {
      list = list.filter((p) => p.stock <= 15);
    }

    return list;
  }, [products, productFilter, productSearch]);

  const filteredCouriers = useMemo(() => {
    let list = couriers.filter((c) =>
      `${c.name} ${c.plate} ${c.order} ${c.destination}`
        .toLowerCase()
        .includes(deliverySearch.toLowerCase())
    );

    if (deliveryFilter === "Sedang Jalan (4)") {
      list = list.filter((c) => c.state === "Di Jalan");
    }

    if (deliveryFilter === "Standby Depo (2)") {
      list = list.filter((c) => c.state === "Standby Depo");
    }

    return list;
  }, [deliveryFilter, deliverySearch]);

  const totalStock = products.reduce(
    (a, p) => a + p.stock,
    0
  );

  const totalEmpty = products.reduce(
    (a, p) => a + p.empty,
    0
  );

  const inventoryValue = products.reduce(
    (a, p) => a + p.stock * p.cost,
    0
  );

  const addProduct = (data) => {
    const p = {
      id: Date.now(),
      name: data.name,
      desc: data.desc || "Produk galon",
      sku: data.sku || "GLN-NEW",
      type: data.type || "Galon Refill",
      sell: Number(data.sell || 0),
      cost: Number(data.cost || 0),
      stock: Number(data.stock || 0),
      empty: Number(data.empty || 0),
      status:
        Number(data.stock || 0) <= 15
          ? "Stok Kritis"
          : "Tersedia",
      category: data.category || "Refill",
      image: "/aqua.png"
    };

    setProducts((prev) => [...prev, p]);
    setModal(null);
    notify("Produk baru berhasil ditambahkan.");
  };

  const restock = (id) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              stock: p.stock + 10,
              status:
                p.stock + 10 <= 15
                  ? "Stok Kritis"
                  : "Tersedia"
            }
          : p
      )
    );

    notify("Stok berhasil ditambah 10 unit.");
  };

  return (
    <div className="app-shell">
      <Sidebar page={page} setPage={setPage} />

      <main className="main-area">
        <Topbar
          page={page}
          onNotify={() =>
            notify("Tidak ada notifikasi baru.")
          }
          onCreate={() => setModal("order")}
        />

        {page === "products" && (
          <ProductsPage
            products={products}
            filteredProducts={filteredProducts}
            filter={productFilter}
            setFilter={setProductFilter}
            search={productSearch}
            setSearch={setProductSearch}
            totalStock={totalStock}
            totalEmpty={totalEmpty}
            inventoryValue={inventoryValue}
            onAdd={() => setModal("product")}
            onRestock={restock}
            onUpdate={(p) =>
              setModal({
                type: "editProduct",
                product: p
              })
            }
            notify={notify}
          />
        )}

        {page === "delivery" && (
          <DeliveryPage
            filter={deliveryFilter}
            setFilter={setDeliveryFilter}
            search={deliverySearch}
            setSearch={setDeliverySearch}
            couriers={filteredCouriers}
            onAddCourier={() => setModal("courier")}
            notify={notify}
          />
        )}

        {page !== "products" &&
          page !== "delivery" && (
            <ComingSoonPage page={page} />
          )}
      </main>

      {modal === "product" && (
        <ProductModal
          onClose={() => setModal(null)}
          onSave={addProduct}
        />
      )}

      {modal?.type === "editProduct" && (
        <EditProductModal
          product={modal.product}
          onClose={() => setModal(null)}
          onSave={(updated) => {
            setProducts((prev) =>
              prev.map((p) =>
                p.id === updated.id ? updated : p
              )
            );

            setModal(null);
            notify("Produk berhasil diperbarui.");
          }}
        />
      )}

      {modal === "courier" && (
        <CourierModal
          onClose={() => setModal(null)}
          notify={notify}
        />
      )}

      {modal === "order" && (
        <OrderModal
          onClose={() => setModal(null)}
          notify={notify}
        />
      )}

      {toast && (
        <div className="toast">
          <CheckCircle2 size={17} />
          {toast}
        </div>
      )}
    </div>
  );
}

function Sidebar({ page, setPage }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-name">
          <span>GalonKu</span>Admin
        </div>

        <div className="brand-sub">
          Portal Manajemen & Operasional
        </div>
      </div>

      <div className="side-title">
        MENU UTAMA
      </div>

      <nav className="nav-list">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              className={`nav-item ${
                page === item.id ? "active" : ""
              }`}
              onClick={() => setPage(item.id)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="profile-card">
        <div className="avatar">BS</div>

        <div>
          <strong>Budi Santoso</strong>
          <span>Super Admin</span>
        </div>

        <ChevronRight size={16} />
      </div>
    </aside>
  );
}

function Topbar({ onNotify, onCreate }) {
  return (
    <header className="topbar">
      <div className="top-search">
        <Search size={17} />
        <input
          placeholder="Cari pesanan, resi, kurir..."
        />
      </div>

      <button className="date-btn">
        <CalendarDays size={16} />
        Hari ini, 24 Mei
        <ChevronDown size={15} />
      </button>

      <button
        className="icon-btn"
        onClick={onNotify}
      >
        <Bell size={18} />
        <i />
      </button>

      <button
        className="primary-btn top-create"
        onClick={onCreate}
      >
        <Plus size={17} />
        Buat Pesanan
      </button>
    </header>
  );
}

function ProductsPage({
  products,
  filteredProducts,
  filter,
  setFilter,
  search,
  setSearch,
  totalStock,
  totalEmpty,
  inventoryValue,
  onAdd,
  onRestock,
  onUpdate,
  notify
}) {
  return (
    <section className="page">
      <div className="page-head">
        <div>
          <div className="breadcrumb">
            LOGISTIK & GUDANG DEPO
            <ChevronRight size={13} />
            <b>PRODUK & STOK</b>
          </div>

          <h1>Produk & Stok</h1>

          <p>
            Monitoring ketersediaan pasokan galon,
            inventaris botol kosong, dan penyesuaian
            harga jual.
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={onAdd}
        >
          <Plus size={17} />
          Tambah Produk Baru
        </button>
      </div>

      <div className="stats-grid product-stats">
        <StatCard
          label="TOTAL GALON TERISI"
          value={totalStock}
          suffix="Galon"
          icon={<Droplets size={19} />}
          footer="Aqua: 35 • Le: 25"
          accent="blue"
        />

        <StatCard
          label="STOK GALON KOSONG"
          value={totalEmpty}
          suffix="Galon Kosong"
          icon={<RefreshCw size={19} />}
          footer="Pool siap tukar pabrik"
          accent="blue"
        />

        <StatCard
          label="STOK KRITIS / MENIPIS"
          value={
            products.filter(
              (p) => p.stock <= 15
            ).length
          }
          suffix="Varian"
          icon={<AlertTriangle size={19} />}
          footer="Vit 19L & Cleo 19L"
          accent="red"
        />

        <StatCard
          label="TOTAL NILAI INVENTARIS"
          value={rupiah(inventoryValue)}
          icon={<CircleDollarSign size={19} />}
          footer="Modal keseluruhan"
          accent="blue"
        />
      </div>

      <div className="filter-bar">
        <div className="table-search">
          <Search size={17} />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Cari merek galon, ukuran, SKU..."
          />
        </div>

        <div className="filter-tabs">
          {[
            "Semua Produk (4)",
            "Refill (3)",
            "Sekali Pakai (1)",
            "Perlu Restok (2)"
          ].map((x) => (
            <button
              key={x}
              className={
                filter === x ? "selected" : ""
              }
              onClick={() => setFilter(x)}
            >
              {x}
            </button>
          ))}
        </div>
      </div>

      <div className="inventory-card">
        <div className="card-title-row">
          <div>
            <span className="live-dot" />
            <b>Daftar Inventaris Depo Aktif</b>
            <span className="live-chip">
              Live Sync Terkini
            </span>
          </div>

          <small>
            Update otomatis setiap pesanan kurir
            diselesaikan
          </small>
        </div>

        <div className="inventory-table">
          <div className="thead product-row">
            <span>PRODUK & VARIAN</span>
            <span>SKU / TIPE</span>
            <span>HARGA JUAL</span>
            <span>HARGA MODAL</span>
            <span>STOK TERISI (DEPO)</span>
            <span>BOTOL KOSONG</span>
            <span>STATUS</span>
            <span>AKSI</span>
          </div>

          {filteredProducts.map((p) => (
            <ProductRow
              key={p.id}
              product={p}
              onRestock={onRestock}
              onUpdate={onUpdate}
              notify={notify}
            />
          ))}
        </div>

        <div className="table-foot">
          <span>
            Menampilkan {filteredProducts.length} dari{" "}
            {products.length} varian produk galon depo
          </span>

          <span>
            Estimasi Omzet Hari Ini:{" "}
            <b className="blue-text">
              {rupiah(
                filteredProducts.reduce(
                  (a, p) => a + p.stock * p.sell,
                  0
                )
              )}
            </b>
          </span>
        </div>
      </div>

      <div className="bottom-grid">
        <div className="info-card">
          <div className="section-head">
            <h3>
              <RotateCcw size={17} />
              Riwayat & Jadwal Kirim Restok Pabrik
            </h3>

            <button
              onClick={() =>
                notify(
                  "Membuka daftar purchase order."
                )
              }
            >
              Lihat Semua PO
            </button>
          </div>

          <div className="po-item">
            <div className="po-icon">
              <Warehouse size={17} />
            </div>

            <div>
              <b>Pabrik PT Danone Aqua</b>
              <span>
                Truk Hingga • 50 Galon Aqua • 19L
              </span>
            </div>

            <em>Dalam Pengiriman</em>
          </div>

          <div className="po-item">
            <div className="po-icon">
              <Warehouse size={17} />
            </div>

            <div>
              <b>
                Pabrik Sariguna Primatirta (Cleo)
              </b>
              <span>
                PO Kritis • 50 Galon Cleo
              </span>
            </div>

            <em className="red-em">
              PO-882
            </em>
          </div>
        </div>

        <div className="info-card">
          <div className="section-head">
            <h3>
              <Droplets size={17} />
              Status Galon Kosong
            </h3>

            <span className="live-dot" />
          </div>

          <div className="empty-status">
            <b>
              Total Botol di Depo: {totalEmpty} Botol
            </b>

            <div className="progress-track">
              <div style={{ width: "81%" }} />
            </div>

            <div className="legend">
              <span>
                ● {Math.max(totalEmpty - 8, 0)}
                {" "}Siap Tukar
              </span>

              <span className="danger">
                ● 8 Afkir / Rusak
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductRow({
  product: p,
  onRestock,
  onUpdate
}) {
  const critical = p.stock <= 15;

  return (
    <div className="tbody product-row">
      <div className="product-name">
        <div className="product-img">
          <img
            src={p.image}
            alt={p.name}
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.parentElement.classList.add(
                "fallback-bottle"
              );
            }}
          />
        </div>

        <div>
          <b>{p.name}</b>
          <span>{p.desc}</span>
        </div>
      </div>

      <div>
        <b>{p.sku}</b>
        <span>{p.type}</span>
      </div>

      <div>
        <b>{rupiah(p.sell)}</b>
        <Pencil size={12} />
      </div>

      <div>
        {rupiah(p.cost)}
      </div>

      <div className="stock-cell">
        <b
          className={
            critical ? "red-text" : ""
          }
        >
          {p.stock} Unit
        </b>

        <span>
          {critical
            ? `Sisa ${Math.round(
                (p.stock / 50) * 100
              )}%`
            : p.stock >= 30
            ? "Aman (70%)"
            : "Optimal (50%)"}
        </span>

        <div className="mini-progress">
          <i
            className={
              critical ? "critical" : ""
            }
            style={{
              width: `${Math.min(
                (p.stock / 50) * 100,
                100
              )}%`
            }}
          />
        </div>
      </div>

      <div>
        <span className="empty-pill">
          {p.empty
            ? `${p.empty} Botol`
            : "(Non-Refill)"}
        </span>
      </div>

      <div>
        <span
          className={`status-pill ${
            critical ? "critical" : ""
          }`}
        >
          <i />
          {p.status}
        </span>
      </div>

      <div className="action-cell">
        <button onClick={() => onUpdate(p)}>
          Update
        </button>

        <button
          className="icon-action"
          onClick={() => onRestock(p.id)}
          title="Restok"
        >
          <ShoppingCart size={15} />
        </button>

        {critical && (
          <button
            className="restock-plus"
            onClick={() => onRestock(p.id)}
          >
            +
          </button>
        )}
      </div>
    </div>
  );
}

function DeliveryPage({
  filter,
  setFilter,
  search,
  setSearch,
  couriers,
  onAddCourier,
  notify
}) {
  const active = couriers.filter(
    (c) => c.state === "Di Jalan"
  ).length;

  return (
    <section className="page">
      <div className="page-head delivery-head">
        <div>
          <div className="breadcrumb">
            FLEET LOGISTICS & LIVE DISPATCH
          </div>

          <h1>
            Monitoring Pengantaran
          </h1>

          <p>
            Pelacakan armada kurir motor, status
            pengiriman pesanan, dan efisiensi rute
            depo secara langsung.
          </p>
        </div>

        <div className="head-actions">
          <div className="segmented">
            <button
              className="selected"
              onClick={() =>
                notify("Mode daftar aktif.")
              }
            >
              <List size={15} />
              Daftar
            </button>

            <button
              onClick={() =>
                notify("Live Peta dibuka.")
              }
            >
              <Map size={15} />
              Live Peta
            </button>

            <button
              onClick={() =>
                notify("Data diperbarui.")
              }
            >
              <RefreshCw size={15} />
            </button>
          </div>

          <button
            className="primary-btn"
            onClick={onAddCourier}
          >
            <UserPlus size={17} />
            Tambah Armada Kurir
          </button>
        </div>
      </div>

      <div className="stats-grid delivery-stats">
        <StatCard
          label="Total Armada"
          value="6"
          suffix="Kurir Motor"
          icon={<Users size={19} />}
          footer="Kapasitas 100% Siaga"
          accent="blue"
        />

        <StatCard
          label="Sedang Mengantar"
          value={active}
          suffix="Kurir di Jalan"
          icon={<Bike size={19} />}
          footer="11 Galon Sedang Dikirim"
          accent="cyan"
        />

        <StatCard
          label="Standby Depo"
          value="2"
          suffix="Siap Muat Kirim"
          icon={<Warehouse size={19} />}
          footer="Idle < 8 Menit"
          accent="green"
        />

        <StatCard
          label="Rata-rata Waktu"
          value="18"
          suffix="Menit / Pesanan"
          icon={<Gauge size={19} />}
          footer="3.2 menit lebih cepat dr SLA"
          accent="blue"
        />
      </div>

      <div className="filter-bar delivery-filter">
        <div className="filter-tabs">
          {[
            "Semua Armada (6)",
            "Sedang Jalan (4)",
            "Standby Depo (2)",
            "Riwayat Hari Ini"
          ].map((x) => (
            <button
              key={x}
              className={
                filter === x ? "selected" : ""
              }
              onClick={() => setFilter(x)}
            >
              {x}
            </button>
          ))}
        </div>

        <div className="table-search">
          <Search size={17} />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Cari kurir, plat, order..."
          />
        </div>
      </div>

      <div className="delivery-layout">
        <div className="courier-column">
          <div className="section-title">
            <h3>Kurir Lapangan</h3>
            <span>
              {active} / 6 Bergerak
            </span>
          </div>

          {couriers
            .slice(0, 4)
            .map((c) => (
              <CourierCard
                key={c.id}
                courier={c}
                notify={notify}
              />
            ))}
        </div>

        <div className="delivery-table-card">
          <div className="table-card-head">
            <div>
              <h3>
                <Route size={18} />
                Tabel Pengantaran Aktif
              </h3>

              <p>
                Pesanan yang sedang dalam proses
                pengiriman oleh kurir depo
              </p>
            </div>

            <button>
              Diurutkan:{" "}
              <b>Estimasi SLA Terdekat</b>
            </button>
          </div>

          <div className="delivery-table">
            <div className="thead delivery-row">
              <span>NO. ORDER</span>
              <span>KURIR & ARMADA</span>
              <span>ALAMAT TUJUAN</span>
              <span>MUATAN</span>
              <span>PROGRESS / ESTIMASI</span>
              <span>STATUS</span>
            </div>

            {couriers
              .filter((c) => c.order)
              .map((c) => (
                <div
                  className="tbody delivery-row"
                  key={c.id}
                >
                  <div>
                    <b className="blue-text">
                      {c.order}
                    </b>
                    <span>{c.time}</span>
                  </div>

                  <div>
                    <b>{c.name}</b>
                    <span>{c.plate}</span>
                  </div>

                  <div>
                    <b>{c.destination}</b>
                    <span>{c.address}</span>
                  </div>

                  <div>
                    <span className="load-pill">
                      ◈ {c.load}
                    </span>
                  </div>

                  <div>
                    <b>
                      {c.progress
                        ? `${c.progress}%`
                        : "Sedang Muat"}
                    </b>

                    <span>
                      {c.eta ||
                        "Persiapan berangkat"}
                    </span>

                    {c.progress > 0 && (
                      <div className="mini-progress">
                        <i
                          style={{
                            width: `${c.progress}%`
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <span
                      className={`delivery-status ${
                        c.status === "Diantar"
                          ? "onway"
                          : ""
                      }`}
                    >
                      ● {c.status}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CourierCard({
  courier: c,
  notify
}) {
  const standby =
    c.state === "Standby Depo";

  return (
    <div className="courier-card">
      <div className="courier-top">
        <div>
          <h3>{c.name}</h3>

          <span>
            <span
              className={`state-dot ${
                standby ? "green" : "cyan"
              }`}
            />
            {c.vehicle} • {c.plate}
          </span>
        </div>

        <em
          className={
            standby ? "standby" : ""
          }
        >
          ● {c.state}
        </em>
      </div>

      {standby ? (
        <>
          <div className="standby-box">
            <span>Status Depo</span>
            <b>Siap Antar Kloter Baru</b>

            <p>
              Telah menyelesaikan 7 pengantaran
              pagi. Siap menerima penugasan
              kloter berikutnya.
            </p>
          </div>

          <button
            className="wide-btn"
            onClick={() =>
              notify(
                `Pesanan antre ditugaskan ke ${c.name}.`
              )
            }
          >
            ▣ Tugaskan Pesanan Antre
          </button>
        </>
      ) : (
        <>
          <div className="task-box">
            <div>
              <span>Tugas Saat Ini</span>
              <b>{c.order}</b>
            </div>

            <p>{c.task}</p>

            <div className="task-progress">
              <i
                style={{
                  width: `${c.progress}%`
                }}
              />
            </div>

            <small>
              Berangkat {c.depart}
              <b>Est. {c.eta}</b>
            </small>
          </div>

          <div className="courier-actions">
            <button
              onClick={() =>
                notify(
                  `Menghubungi ${c.name}...`
                )
              }
            >
              <Phone size={14} />
              Hubungi
            </button>

            <button
              onClick={() =>
                notify(
                  `Rute ${c.name} dibuka.`
                )
              }
            >
              <MapPin size={14} />
              Pantau Rute
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  suffix,
  icon,
  footer,
  accent
}) {
  return (
    <div className="stat-card">
      <div>
        <span className="stat-label">
          {label}
        </span>

        <div className="stat-value">
          {value} <small>{suffix}</small>
        </div>

        <b
          className={`stat-footer ${accent}`}
        >
          ● {footer}
        </b>
      </div>

      <div
        className={`stat-icon ${accent}`}
      >
        {icon}
      </div>
    </div>
  );
}

function ProductModal({
  onClose,
  onSave
}) {
  const [form, setForm] = useState({
    name: "",
    desc: "",
    sku: "",
    type: "Galon Tukar Refill",
    sell: "",
    cost: "",
    stock: "",
    empty: "",
    category: "Refill"
  });

  const change = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  return (
    <Modal
      title="Tambah Produk Baru"
      onClose={onClose}
      onSave={() => onSave(form)}
      saveText="Simpan Produk"
    >
      <div className="form-grid">
        {[
          ["name", "Nama Produk"],
          ["sku", "SKU"],
          ["sell", "Harga Jual"],
          ["cost", "Harga Modal"],
          ["stock", "Stok Terisi"],
          ["empty", "Botol Kosong"]
        ].map(([name, label]) => (
          <label key={name}>
            {label}

            <input
              name={name}
              value={form[name]}
              onChange={change}
              placeholder={label}
            />
          </label>
        ))}

        <label>
          Jenis Produk

          <select
            name="type"
            value={form.type}
            onChange={change}
          >
            <option>
              Galon Tukar Refill
            </option>
            <option>
              Galon Sekali Pakai
            </option>
          </select>
        </label>

        <label>
          Kategori

          <select
            name="category"
            value={form.category}
            onChange={change}
          >
            <option>Refill</option>
            <option>
              Sekali Pakai
            </option>
          </select>
        </label>

        <label className="full">
          Deskripsi

          <input
            name="desc"
            value={form.desc}
            onChange={change}
            placeholder="Deskripsi singkat produk"
          />
        </label>
      </div>
    </Modal>
  );
}

function EditProductModal({
  product,
  onClose,
  onSave
}) {
  const [form, setForm] =
    useState(product);

  const change = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  return (
    <Modal
      title="Update Produk"
      onClose={onClose}
      onSave={() =>
        onSave({
          ...form,
          sell: Number(form.sell),
          cost: Number(form.cost),
          stock: Number(form.stock),
          empty: Number(form.empty),
          status:
            Number(form.stock) <= 15
              ? "Stok Kritis"
              : "Tersedia"
        })
      }
      saveText="Simpan Perubahan"
    >
      <div className="form-grid">
        {[
          "name",
          "sku",
          "sell",
          "cost",
          "stock",
          "empty"
        ].map((n) => (
          <label key={n}>
            {n.toUpperCase()}

            <input
              name={n}
              value={form[n]}
              onChange={change}
            />
          </label>
        ))}
      </div>
    </Modal>
  );
}

function CourierModal({
  onClose,
  notify
}) {
  const [name, setName] =
    useState("");

  const [plate, setPlate] =
    useState("");

  const [vehicle, setVehicle] =
    useState("Honda Beat");

  return (
    <Modal
      title="Tambah Armada Kurir"
      onClose={onClose}
      onSave={() => {
        onClose();

        notify(
          `${name || "Kurir baru"} berhasil ditambahkan.`
        );
      }}
      saveText="Tambah Kurir"
    >
      <div className="form-grid">
        <label>
          Nama Kurir

          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Nama lengkap"
          />
        </label>

        <label>
          Plat Nomor

          <input
            value={plate}
            onChange={(e) =>
              setPlate(e.target.value)
            }
            placeholder="B 1234 ABC"
          />
        </label>

        <label>
          Kendaraan

          <select
            value={vehicle}
            onChange={(e) =>
              setVehicle(e.target.value)
            }
          >
            <option>Honda Beat</option>
            <option>Honda Vario</option>
            <option>Honda Scoopy</option>
            <option>Honda Revo</option>
          </select>
        </label>
      </div>
    </Modal>
  );
}

function OrderModal({
  onClose,
  notify
}) {
  const [customer, setCustomer] =
    useState("");

  const [address, setAddress] =
    useState("");

  return (
    <Modal
      title="Buat Pesanan"
      onClose={onClose}
      onSave={() => {
        onClose();

        notify(
          `Pesanan untuk ${
            customer || "pelanggan"
          } berhasil dibuat.`
        );
      }}
      saveText="Buat Pesanan"
    >
      <div className="form-grid">
        <label>
          Nama Pelanggan

          <input
            value={customer}
            onChange={(e) =>
              setCustomer(e.target.value)
            }
            placeholder="Nama pelanggan"
          />
        </label>

        <label>
          Jumlah Galon

          <input
            type="number"
            min="1"
            defaultValue="1"
          />
        </label>

        <label className="full">
          Alamat Tujuan

          <textarea
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
            placeholder="Alamat lengkap"
          />
        </label>
      </div>
    </Modal>
  );
}

function Modal({
  title,
  children,
  onClose,
  onSave,
  saveText
}) {
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="modal">
        <div className="modal-head">
          <h2>{title}</h2>

          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {children}
        </div>

        <div className="modal-foot">
          <button
            className="secondary-btn"
            onClick={onClose}
          >
            Batal
          </button>

          <button
            className="primary-btn"
            onClick={onSave}
          >
            <Save size={16} />
            {saveText}
          </button>
        </div>
      </div>
    </div>
  );
}

function ComingSoonPage({
  page
}) {
  const item = navItems.find(
    (n) => n.id === page
  );

  const Icon =
    item?.icon || FileText;

  return (
    <section className="empty-page">
      <div className="empty-icon">
        <Icon size={34} />
      </div>

      <h1>{item?.label}</h1>

      <p>
        Halaman ini sudah terhubung ke
        sidebar. Modul detailnya bisa
        ditambahkan berikutnya tanpa
        mengubah Produk & Stok dan
        Monitoring Pengantaran.
      </p>
    </section>
  );
}

createRoot(
  document.getElementById("root")
).render(<App />);