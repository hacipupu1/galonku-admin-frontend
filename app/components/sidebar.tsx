"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Dashboard", href: "/", icon: "▦" },
  { name: "Manajemen Pesanan", href: "/manajemen-pesanan", icon: "▣" },
  { name: "Produk & Stok", href: "/produk-stok", icon: "▤" },
  { name: "Monitoring Pengantaran", href: "/orders", icon: "▱" },
  { name: "Laporan Keuangan", href: "/laporan-keuangan", icon: "▥" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      {/* BRAND */}
      <div className="sidebar-brand">
        <div className="brand-title">GalonKu Admin</div>
        <div className="brand-subtitle">Portal Manajemen & Operasional</div>
      </div>

      {/* MENU */}
      <div className="sidebar-menu">
        <div className="menu-title">MENU UTAMA</div>

        <nav className="menu-list">
          {menuItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-link ${isActive ? "sidebar-link-active" : ""}`}
              >
                <span className="sidebar-icon">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* USER */}
      <div className="sidebar-user">
        <div className="user-avatar">B</div>
        <div className="user-info">
          <div className="user-name">Budi Santoso</div>
          <div className="user-role">Super Admin</div>
        </div>
        <div className="logout-icon">↪</div>
      </div>

      <style jsx>{`
        .sidebar {
          position: fixed;
          left: 0;
          top: 0;
          width: 220px;
          height: 100vh;
          background: #ffffff;
          border-right: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          z-index: 9999;
        }

        .sidebar-brand {
          padding: 20px 20px 18px;
          border-bottom: 1px solid #f1f3f7;
        }

        .brand-title {
          color: #0052ff;
          font-size: 18px;
          font-weight: 800;
          line-height: 1.2;
        }

        .brand-subtitle {
          margin-top: 4px;
          color: #7b8494;
          font-size: 9px;
        }

        .sidebar-menu {
          flex: 1;
          padding: 22px 10px;
        }

        .menu-title {
          padding: 0 10px 10px;
          color: #737b89;
          font-size: 9px;
          font-weight: 700;
        }

        .menu-list {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        :global(.sidebar-link) {
          height: 38px;
          padding: 0 12px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 10px;
          color: #4b5563 !important;
          text-decoration: none !important;
          font-size: 11px;
          font-weight: 500;
          transition: 0.2s ease;
          cursor: pointer;
        }

        :global(.sidebar-link:hover) {
          background: #eef4ff;
          color: #0052ff !important;
        }

        :global(.sidebar-link-active) {
          background: #0052ff !important;
          color: #ffffff !important;
          font-weight: 600;
        }

        .sidebar-icon {
          width: 18px;
          text-align: center;
          font-size: 13px;
        }

        .sidebar-user {
          margin: 0 10px 12px;
          padding: 10px;
          border-radius: 10px;
          background: #f3f6fc;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .user-avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #111827;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          flex-shrink: 0;
        }

        .user-info {
          flex: 1;
          min-width: 0;
        }

        .user-name {
          color: #1f2937;
          font-size: 10px;
          font-weight: 700;
        }

        .user-role {
          margin-top: 2px;
          color: #6b7280;
          font-size: 8px;
        }

        .logout-icon {
          color: #667085;
          font-size: 15px;
        }
      `}</style>
    </aside>
  );
}