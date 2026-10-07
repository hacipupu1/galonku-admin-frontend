<<<<<<< HEAD
import Sidebar from "./components/sidebar";
import "./globals.css";

export const metadata = {
  title: "GalonKu Admin",
  description: "Portal Manajemen & Operasional",
=======
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GalonKu Admin",
 feature/fira
  description: "Portal Manajemen dan Operasional GalonKu",

  description: "Portal Manajemen & Operasional GalonKu",
 main
>>>>>>> cbbca8ab3dde6531fbebabc74c613ba0cefe6cb8
};

export default function RootLayout({
  children,
<<<<<<< HEAD
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
=======
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={jakarta.variable}>{children}</body>
>>>>>>> cbbca8ab3dde6531fbebabc74c613ba0cefe6cb8
    </html>
  );
}