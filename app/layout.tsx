import Sidebar from "./components/sidebar";
import "./globals.css";

export const metadata = {
  title: "GalonKu Admin",
  description: "Portal Manajemen & Operasional",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body style={{ margin: 0, padding: 0, fontFamily: "sans-serif", backgroundColor: "#f8fafc" }}>
        <div style={{ display: "flex", minHeight: "100vh" }}>
          {/* Sidebar Terpasang Permanen */}
          <Sidebar />

          {/* Area Konten Kanan */}
          <main style={{ marginLeft: "220px", flex: 1, minWidth: 0, position: "relative", zIndex: 1 }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}