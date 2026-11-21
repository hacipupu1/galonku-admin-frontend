"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
    } else {
      router.replace("/dashboard");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 text-xs font-semibold text-slate-400">
      Memuat portal GalonKu Admin...
    </div>
  );
}