'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { AdminHeader } from '@/components/admin';

interface Payment {
    id: string;
    orderId: string;
    userName: string;
    userEmail: string;
    plan: string;
    amount: number;
    status: 'success' | 'pending' | 'failed' | 'refunded';
    paymentMethod: string;
    createdAt: Date;
}

// Mock payments data
const mockPayments: Payment[] = [
    {
        id: '1',
        orderId: 'ORD-20241215-001',
        userName: 'Budi Santoso',
        userEmail: 'budi.santoso@gmail.com',
        plan: 'Pro Yearly',
        amount: 799000,
        status: 'success',
        paymentMethod: 'BCA Virtual Account',
        createdAt: new Date('2024-12-15T10:30:00'),
    },
    {
        id: '2',
        orderId: 'ORD-20241215-002',
        userName: 'Siti Nurhaliza',
        userEmail: 'siti.nurhaliza@gmail.com',
        plan: 'Pro Monthly',
        amount: 99000,
        status: 'success',
        paymentMethod: 'GoPay',
        createdAt: new Date('2024-12-15T09:15:00'),
    },
    {
        id: '3',
        orderId: 'ORD-20241214-003',
        userName: 'Andi Wijaya',
        userEmail: 'andi.wijaya@yahoo.com',
        plan: 'Pro Biennial',
        amount: 1199000,
        status: 'pending',
        paymentMethod: 'Mandiri Virtual Account',
        createdAt: new Date('2024-12-14T16:45:00'),
    },
    {
        id: '4',
        orderId: 'ORD-20241214-004',
        userName: 'Dewi Kartika',
        userEmail: 'dewi.kartika@outlook.com',
        plan: 'Pro Yearly',
        amount: 799000,
        status: 'success',
        paymentMethod: 'Credit Card',
        createdAt: new Date('2024-12-14T14:20:00'),
    },
    {
        id: '5',
        orderId: 'ORD-20241213-005',
        userName: 'Rudi Hartono',
        userEmail: 'rudi.hartono@gmail.com',
        plan: 'Pro Monthly',
        amount: 99000,
        status: 'failed',
        paymentMethod: 'BNI Virtual Account',
        createdAt: new Date('2024-12-13T11:00:00'),
    },
    {
        id: '6',
        orderId: 'ORD-20241212-006',
        userName: 'Lina Marlina',
        userEmail: 'lina.marlina@gmail.com',
        plan: 'Pro Yearly',
        amount: 799000,
        status: 'refunded',
        paymentMethod: 'Credit Card',
        createdAt: new Date('2024-12-12T08:30:00'),
    },
];

function formatRupiah(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
}

function formatDateTime(date: Date): string {
    return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export default function PaymentsPage() {
    const [payments] = useState<Payment[]>(mockPayments);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');

    const filteredPayments = payments.filter((payment) => {
        const matchesSearch =
            payment.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            payment.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            payment.userEmail.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus === 'all' || payment.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    // Calculate totals
    const totalSuccess = payments
        .filter((p) => p.status === 'success')
        .reduce((sum, p) => sum + p.amount, 0);
    const totalPending = payments.filter((p) => p.status === 'pending').length;
    const totalFailed = payments.filter((p) => p.status === 'failed').length;

    const statusColors = {
        success: 'bg-green-100 text-green-700',
        pending: 'bg-yellow-100 text-yellow-700',
        failed: 'bg-red-100 text-red-700',
        refunded: 'bg-gray-100 text-gray-700',
    };

    const statusLabels = {
        success: 'Sukses',
        pending: 'Pending',
        failed: 'Gagal',
        refunded: 'Refund',
    };

    const handleExport = () => {
        // In production, generate and download CSV
        alert('Export CSV akan diimplementasikan dengan database connection');
    };

    return (
        <>
            <AdminHeader
                title="Riwayat Pembayaran"
                description="Lihat semua transaksi pembayaran pengguna"
            />

            <div className="p-8 space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="size-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
                                <Icon name="payments" className="text-2xl" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Total Pendapatan (Sukses)</p>
                                <p className="text-2xl font-bold text-slate-900">{formatRupiah(totalSuccess)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="size-12 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center">
                                <Icon name="schedule" className="text-2xl" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Transaksi Pending</p>
                                <p className="text-2xl font-bold text-slate-900">{totalPending}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="size-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                                <Icon name="error" className="text-2xl" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Transaksi Gagal</p>
                                <p className="text-2xl font-bold text-slate-900">{totalFailed}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search & Filters */}
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    <div className="flex flex-1 items-center gap-4 w-full md:w-auto">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Icon
                                name="search"
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari order ID, nama, atau email..."
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary bg-white"
                            />
                        </div>

                        {/* Filter */}
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary bg-white"
                        >
                            <option value="all">Semua Status</option>
                            <option value="success">Sukses</option>
                            <option value="pending">Pending</option>
                            <option value="failed">Gagal</option>
                            <option value="refunded">Refund</option>
                        </select>
                    </div>

                    <Button onClick={handleExport} variant="outline">
                        <Icon name="download" />
                        Export CSV
                    </Button>
                </div>

                {/* Payments Table */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="text-left py-4 px-6 text-xs font-bold uppercase text-slate-400">
                                        Order ID
                                    </th>
                                    <th className="text-left py-4 px-6 text-xs font-bold uppercase text-slate-400">
                                        Pengguna
                                    </th>
                                    <th className="text-left py-4 px-6 text-xs font-bold uppercase text-slate-400">
                                        Paket
                                    </th>
                                    <th className="text-right py-4 px-6 text-xs font-bold uppercase text-slate-400">
                                        Jumlah
                                    </th>
                                    <th className="text-center py-4 px-6 text-xs font-bold uppercase text-slate-400">
                                        Status
                                    </th>
                                    <th className="text-left py-4 px-6 text-xs font-bold uppercase text-slate-400">
                                        Metode
                                    </th>
                                    <th className="text-left py-4 px-6 text-xs font-bold uppercase text-slate-400">
                                        Tanggal
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredPayments.map((payment) => (
                                    <tr key={payment.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="py-4 px-6 text-sm font-mono text-slate-600">{payment.orderId}</td>
                                        <td className="py-4 px-6">
                                            <div>
                                                <p className="font-semibold text-slate-900 text-sm">{payment.userName}</p>
                                                <p className="text-xs text-slate-500">{payment.userEmail}</p>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-slate-900">{payment.plan}</td>
                                        <td className="py-4 px-6 text-sm font-bold text-slate-900 text-right">
                                            {formatRupiah(payment.amount)}
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            <span
                                                className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold ${statusColors[payment.status]}`}
                                            >
                                                {statusLabels[payment.status]}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-slate-600">{payment.paymentMethod}</td>
                                        <td className="py-4 px-6 text-sm text-slate-500">
                                            {formatDateTime(payment.createdAt)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Empty State */}
                    {filteredPayments.length === 0 && (
                        <div className="p-12 text-center">
                            <Icon name="receipt_long" className="text-4xl text-slate-300 mb-4" />
                            <p className="text-slate-500">Tidak ada transaksi yang ditemukan</p>
                        </div>
                    )}
                </div>

                {/* Pagination placeholder */}
                <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-500">
                        Menampilkan {filteredPayments.length} dari {payments.length} transaksi
                    </p>
                    <div className="flex items-center gap-2">
                        <button className="px-4 py-2 rounded-lg border border-slate-200 text-slate-400 cursor-not-allowed">
                            <Icon name="chevron_left" />
                        </button>
                        <button className="px-4 py-2 rounded-lg bg-primary text-slate-900 font-bold">1</button>
                        <button className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50">
                            2
                        </button>
                        <button className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50">
                            <Icon name="chevron_right" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
