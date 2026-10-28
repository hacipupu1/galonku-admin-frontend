'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './sidebar';
import Header from './header';

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname ? pathname.startsWith('/login') : false;

  if (isLoginPage) {
    return <div className="min-h-screen w-full bg-[#f8fafc]">{children}</div>;
  }

  return (
    <div className="flex min-h-screen w-full bg-[#F7F8FC]">
      <Sidebar />
      <div className="flex flex-1 flex-col pl-[248px] w-full min-h-screen">
        <Header />
        <div className="flex-1 p-6 w-full max-w-[1500px] mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}