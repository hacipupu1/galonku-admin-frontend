import type { Metadata } from "next";
import Sidebar from "./components/sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "GalonKu Admin",
  description: "Portal Manajemen & Operasional GalonKu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased bg-[#f8fafc] text-slate-800 font-sans">
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 pl-[248px]">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}