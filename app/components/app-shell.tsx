'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './sidebar';

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login';

  // Jika di halaman login, tampilkan konten saja tanpa Sidebar & Padding
  if (isAuthPage) {
    return <>{children}</>;
  }

  // Untuk halaman admin lainnya, tampilkan bersama Sidebar
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 pl-[248px]">
        {children}
      </main>
    </div>
  );
}