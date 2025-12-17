import { Icon } from '@/components/ui/icon';
import { AdminHeader } from '@/components/admin';

// Mock stats data
const stats = [
    {
        label: 'Total Pengguna',
        value: '1,234',
        change: '+12%',
        changeType: 'positive' as const,
        icon: 'group',
        iconBg: 'bg-blue-100 text-blue-600',
    },
    {
        label: 'Langganan Aktif',
        value: '892',
        change: '+8%',
        changeType: 'positive' as const,
        icon: 'verified',
        iconBg: 'bg-green-100 text-green-600',
    },
    {
        label: 'Pendapatan Bulan Ini',
        value: 'Rp 45.6 Jt',
        change: '+23%',
        changeType: 'positive' as const,
        icon: 'payments',
        iconBg: 'bg-primary/10 text-primary',
    },
    {
        label: 'Churn Rate',
        value: '2.4%',
        change: '-0.5%',
        changeType: 'positive' as const,
        icon: 'trending_down',
        iconBg: 'bg-red-100 text-red-600',
    },
];

// Mock recent transactions
const recentTransactions = [
    { id: 'TXN-001', user: 'Andi Wijaya', plan: 'Pro Yearly', amount: 799000, status: 'success', date: '15 Des 2024' },
    { id: 'TXN-002', user: 'Siti Nurhaliza', plan: 'Pro Monthly', amount: 99000, status: 'success', date: '15 Des 2024' },
    { id: 'TXN-003', user: 'Budi Santoso', plan: 'Pro Biennial', amount: 1199000, status: 'pending', date: '14 Des 2024' },
    { id: 'TXN-004', user: 'Dewi Kartika', plan: 'Pro Yearly', amount: 799000, status: 'success', date: '14 Des 2024' },
    { id: 'TXN-005', user: 'Rudi Hartono', plan: 'Pro Monthly', amount: 99000, status: 'failed', date: '13 Des 2024' },
];

function formatRupiah(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
}

export default function AdminDashboardPage() {
    return (
        <>
            <AdminHeader
                title="Dashboard Admin"
                description="Overview performa dan statistik Dilarisin"
            />

            <div className="p-8 space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
                        >
                            <div className="flex items-start justify-between">
                                <div
                                    className={`size-12 rounded-xl flex items-center justify-center ${stat.iconBg}`}
                                >
                                    <Icon name={stat.icon} className="text-2xl" />
                                </div>
                                <span
                                    className={`text-xs font-bold px-2 py-1 rounded-full ${stat.changeType === 'positive'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-red-100 text-red-700'
                                        }`}
                                >
                                    {stat.change}
                                </span>
                            </div>
                            <div className="mt-4">
                                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                                <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Transactions */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-slate-900">Transaksi Terbaru</h2>
                        <a href="/admin/payments" className="text-sm font-semibold text-primary hover:underline">
                            Lihat Semua →
                        </a>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="text-left py-3 px-6 text-xs font-bold uppercase text-slate-400">
                                        ID Transaksi
                                    </th>
                                    <th className="text-left py-3 px-6 text-xs font-bold uppercase text-slate-400">
                                        Pengguna
                                    </th>
                                    <th className="text-left py-3 px-6 text-xs font-bold uppercase text-slate-400">
                                        Paket
                                    </th>
                                    <th className="text-right py-3 px-6 text-xs font-bold uppercase text-slate-400">
                                        Jumlah
                                    </th>
                                    <th className="text-center py-3 px-6 text-xs font-bold uppercase text-slate-400">
                                        Status
                                    </th>
                                    <th className="text-left py-3 px-6 text-xs font-bold uppercase text-slate-400">
                                        Tanggal
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {recentTransactions.map((txn) => (
                                    <tr key={txn.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="py-4 px-6 text-sm font-mono text-slate-600">{txn.id}</td>
                                        <td className="py-4 px-6 text-sm font-medium text-slate-900">{txn.user}</td>
                                        <td className="py-4 px-6 text-sm text-slate-600">{txn.plan}</td>
                                        <td className="py-4 px-6 text-sm font-bold text-slate-900 text-right">
                                            {formatRupiah(txn.amount)}
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            <span
                                                className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold ${txn.status === 'success'
                                                    ? 'bg-green-100 text-green-700'
                                                    : txn.status === 'pending'
                                                        ? 'bg-yellow-100 text-yellow-700'
                                                        : 'bg-red-100 text-red-700'
                                                    }`}
                                            >
                                                {txn.status === 'success' ? 'Sukses' : txn.status === 'pending' ? 'Pending' : 'Gagal'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-slate-500">{txn.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
