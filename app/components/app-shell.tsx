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

  // Sembunyikan sidebar jika rute diawali dengan /login
  const isLoginPage = pathname ? pathname.startsWith('/login') : false;

  if (isLoginPage) {
    return <div className="min-h-screen w-full bg-[#f8fafc]">{children}</div>;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 pl-[248px]">
        {children}
      </main>
    </div>
  );
}