'use client';

import React from 'react';
import { 
  ShoppingBag, Clock, Truck, Wallet, Search, 
  Calendar, Plus, Download, Printer, Eye, 
  MoreVertical, Send 
} from 'lucide-react';

export default function Home() {
  const stats = [
    { label: 'TOTAL PESANAN HARI INI', value: '48', badge: '+14% dr kemarin', badgeColor: 'text-green-600 bg-green-50', icon: ShoppingBag, iconBg: 'bg-blue-50 text-blue-600' },
    { label: 'PERLU KONFIRMASI', value: '4', badge: 'Respon < 5 mnt', badgeColor: 'text-red-500 bg-red-50', icon: Clock, iconBg: 'bg-red-50 text-red-500' },
    { label: 'SEDANG DIANTAR', value: '5', badge: '4 Armada aktif', badgeColor: 'text-gray-500 bg-gray-50', icon: Truck, iconBg: 'bg-cyan-50 text-cyan-600' },
    { label: 'TOTAL OMZET TERCATAT', value: '864.000', prefix: 'Rp ', badge: '92% Lunas', badgeColor: 'text-green-600 bg-green-50', icon: Wallet, iconBg: 'bg-indigo-50 text-indigo-600' },
  ];

  const tabs = [
    { name: 'Semua', count: 48, active: true },
    { name: 'Menunggu Konfirmasi', count: 4 },
    { name: 'Diproses Depo', count: 6 },
    { name: 'Dalam Pengantaran', count: 5 },
    { name: 'Selesai', count: 31 },
    { name: 'Dibatalkan', count: 2 },
  ];

  const orders = [
    { id: '#ORD-8824', time: 'Hari ini, 10:15 WIB', tag: 'Refill Instant (30m)', tagColor: 'text-red-600 bg-red-50', customer: 'Fia Salsa', phone: '0812-9844-3211', address: 'Kost Sakura No. 4, Lt. 2', qty: '2x', item: 'Aqua 19L Refill', note: 'Tukar Galon Kosong', price: 'Rp 36.000', payStatus: 'QRIS • Lunas', payColor: 'bg-green-100 text-green-700', status: 'Menunggu Konfirmasi', statusColor: 'bg-red-100 text-red-700', action: 'Tugaskan Kurir' },
    { id: '#ORD-8823', time: 'Hari ini, 10:02 WIB', tag: 'Refill Terjadwal', tagColor: 'text-blue-600 bg-blue-50', customer: 'Agus Setiawan', phone: '0857-1120-9943', address: 'Jl. Ciputat Raya No. 18B', qty: '3x', item: 'Le Minerale 19L', note: '1 Galon Baru + 2 Refill', price: 'Rp 89.000', payStatus: 'BCA TF • Lunas', payColor: 'bg-green-100 text-green-700', status: 'Diproses Depo', statusColor: 'bg-blue-100 text-blue-700', kurir: 'Pak Budi K.', kurirDetail: 'Motor 01 (Siap Angkut)' },
    { id: '#ORD-8822', time: 'Hari ini, 09:48 WIB', tag: 'Refill Instant', tagColor: 'text-blue-600 bg-blue-50', customer: 'Dewi Anggraini', phone: '0813-8871-0021', address: 'Paku Terrace Twr S-1208', qty: '1x', item: 'Aqua 19L Refill', note: 'Tukar Galon Kosong', price: 'Rp 18.000', payStatus: 'COD (Tunai)', payColor: 'bg-cyan-100 text-cyan-700', status: 'Diantar Kurir', statusColor: 'bg-cyan-100 text-cyan-700', kurir: 'Rian Irawan', kurirDetail: 'ETA: 8 mnt lagi' },
    { id: '#ORD-8821', time: 'Hari ini, 09:20 WIB', tag: 'Refill Reguler', tagColor: 'text-gray-600 bg-gray-50', customer: 'Warung Kopi Mas Jon', phone: '0878-5544-2201', address: 'Jl. Teuku Nyak Arief No. 51', qty: '5x', item: 'Aqua 19L Refill', note: 'Langganan Bisnis UMKM', price: 'Rp 90.000', payStatus: 'QRIS • Lunas', payColor: 'bg-green-100 text-green-700', status: 'Selesai Diterima', statusColor: 'bg-green-100 text-green-700', kurir: 'Pak Budi K.', kurirDetail: 'Diterima 09:42 WIB' },
    { id: '#ORD-8820', time: 'Hari ini, 08:50 WIB', tag: 'Refill Reguler', tagColor: 'text-gray-600 bg-gray-50', customer: 'Hendro Pratama', phone: '0812-7788-3312', address: 'Komplek Lemigas Blok B4/12', qty: '2x', item: 'Cleo 19L Eco Refill', note: 'Bebas BPA Galon', price: 'Rp 34.000', payStatus: 'GoPay • Lunas', payColor: 'bg-green-100 text-green-700', status: 'Selesai Diterima', statusColor: 'bg-green-100 text-green-700', kurir: 'Deni Setiawan', kurirDetail: 'Diterima 09:18 WIB' },
    { id: '#ORD-8819', time: 'Hari ini, 08:35 WIB', tag: 'Refill Terjadwal', tagColor: 'text-blue-600 bg-blue-50', customer: 'Siti Nurhaliza', phone: '0896-1234-9001', address: 'Jl. Kebayoran Lama No. 44', qty: '1x', item: 'Aqua 19L + Pompa', note: 'Beli Unit Pompa Baru', price: 'Rp 68.000', payStatus: 'Menunggu Verif', payColor: 'bg-indigo-100 text-indigo-700', status: 'Diproses Depo', statusColor: 'bg-blue-100 text-blue-700', action: 'Jadwalkan' },
    { id: '#ORD-8818', time: 'Hari ini, 08:10 WIB', tag: 'Dibatalkan Pelanggan', tagColor: 'text-red-600 bg-red-50', customer: 'Bambang Tri', phone: '0811-9922-3112', address: 'Jl. Praja Raya No. 10', qty: '2x', item: 'Vit 19L Refill', note: 'Alasan: Salah input alamat', price: 'Rp 30.000', payStatus: 'Refund Selesai', payColor: 'bg-red-100 text-red-700', status: 'Dibatalkan', statusColor: 'bg-red-100 text-red-700', kurir: '-' }
  ];

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen text-slate-800">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-blue-600" />
            Manajemen Pesanan
          </h1>
          <p className="text-xs text-slate-500">Kelola, verifikasi, dan pantau status transaksi pemesanan galon pelanggan secara real-time.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Cari pesanan, resi, kurir..." className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 shadow-sm" />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 shadow-sm">
            <Calendar className="w-4 h-4 text-slate-500" /> Hari Ini, 24 Mei
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition shadow-sm">
            <Plus className="w-4 h-4" /> Buat Pesanan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 tracking-wider mb-1">{item.label}</p>
                <div className="flex items-baseline gap-1">
                  {item.prefix && <span className="text-base font-bold text-slate-900">{item.prefix}</span>}
                  <span className="text-2xl font-extrabold text-slate-900">{item.value}</span>
                </div>
                <span className={`mt-2 inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full ${item.badgeColor}`}>{item.badge}</span>
              </div>
              <div className={`p-3 rounded-xl ${item.iconBg}`}><Icon className="w-5 h-5" /></div>
            </div>
          );
        })}
      </div>

      <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700">
              <Download className="w-3.5 h-3.5" /> Ekspor (CSV/Excel)
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold shadow-sm">
              <Plus className="w-3.5 h-3.5" /> Buat Pesanan Manual
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-3 bg-slate-50/50 border-b border-slate-100 overflow-x-auto text-xs font-semibold">
          {tabs.map((tab, idx) => (
            <button key={idx} className={`px-3 py-1.5 rounded-full transition flex items-center gap-1.5 ${tab.active ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200'}`}>
              {tab.name}
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${tab.active ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'}`}>{tab.count}</span>
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                <th className="p-3">NO. ORDER & WAKTU</th>
                <th className="p-3">PELANGGAN & LOKASI</th>
                <th className="p-3">ITEM PESANAN</th>
                <th className="p-3">TAGIHAN & BAYAR</th>
                <th className="p-3">STATUS</th>
                <th className="p-3">KURIR PENGANTAR</th>
                <th className="p-3 text-center">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {orders.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition">
                  <td className="p-3">
                    <p className="font-bold text-blue-600">{row.id}</p>
                    <p className="text-[10px] text-slate-400">{row.time}</p>
                    <span className={`inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-bold ${row.tagColor}`}>• {row.tag}</span>
                  </td>
                  <td className="p-3">
                    <p className="font-bold text-slate-800">{row.customer}</p>
                    <p className="text-[10px] text-slate-500">{row.phone}</p>
                    <p className="text-[10px] text-slate-400 truncate max-w-[150px]">{row.address}</p>
                  </td>
                  <td className="p-3">
                    <p className="font-bold text-slate-800">{row.qty} {row.item}</p>
                    <p className="text-[10px] text-slate-400">{row.note}</p>
                  </td>
                  <td className="p-3">
                    <p className="font-bold text-slate-800">{row.price}</p>
                    <span className={`inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-bold ${row.payColor}`}>✓ {row.payStatus}</span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold inline-block ${row.statusColor}`}>• {row.status}</span>
                  </td>
                  <td className="p-3">
                    {row.action ? (
                      <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-[10px] font-semibold flex items-center gap-1 shadow-sm">
                        <Send className="w-3 h-3" /> {row.action}
                      </button>
                    ) : (
                      <div>
                        <p className="font-bold text-slate-800">{row.kurir}</p>
                        <p className="text-[10px] text-slate-400">{row.kurirDetail}</p>
                      </div>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center gap-1 text-slate-400">
                      <button className="p-1 hover:text-slate-600"><Printer className="w-3.5 h-3.5" /></button>
                      <button className="p-1 hover:text-slate-600"><Eye className="w-3.5 h-3.5" /></button>
                      <button className="p-1 hover:text-slate-600"><MoreVertical className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}