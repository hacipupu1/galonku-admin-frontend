import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GalonKu Admin Portal",
  description: "Portal Manajemen & Operasional Depo Galon",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-[#F7F8FC] text-[#131B2E]">
        {children}
      </body>
    </html>
  );
}