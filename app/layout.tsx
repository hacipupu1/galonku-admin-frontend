import Sidebar from "./components/sidebar";
import "./globals.css"; // atau stylesheet global kamu

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
        <div style={{ display: "flex" }}>
          <Sidebar />
          {/* Memberikan margin-left 220px agar konten tidak tertutup Sidebar yang fixed */}
          <main style={{ marginLeft: "220px", flex: 1, minHeight: "100vh" }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}