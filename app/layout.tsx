import type { Metadata } from "next";
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
        {children}
      </body>
    </html>
  );
}