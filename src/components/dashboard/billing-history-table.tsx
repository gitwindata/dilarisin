import { Icon } from '@/components/ui/icon';

interface Invoice {
    id: string;
    date: Date;
    planName: string;
    amount: number;
    status: 'paid' | 'pending' | 'archived';
}

interface BillingHistoryTableProps {
    invoices: Invoice[];
    totalCount: number;
}

function formatRupiah(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

export function BillingHistoryTable({ invoices, totalCount }: BillingHistoryTableProps) {
    const statusConfig = {
        paid: { label: 'Lunas', className: 'bg-green-100 text-green-800' },
        pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-800' },
        archived: { label: 'Arsip', className: 'bg-slate-100 text-slate-800' },
    };

    return (
        <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Riwayat Tagihan</h3>
                <button className="text-sm font-bold text-primary hover:text-orange-600 flex items-center gap-1">
                    <Icon name="download" className="text-lg" />
                    Unduh Semua
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/50">
                                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-400">
                                    Tanggal
                                </th>
                                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-400">
                                    ID Invoice
                                </th>
                                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-400">
                                    Paket
                                </th>
                                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-400 text-right">
                                    Jumlah
                                </th>
                                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-400 text-center">
                                    Status
                                </th>
                                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-400 text-center">
                                    Unduh
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {invoices.map((invoice) => (
                                <tr
                                    key={invoice.id}
                                    className="group hover:bg-slate-50 transition-colors"
                                >
                                    <td className="py-4 px-6 text-sm font-medium text-slate-700">
                                        {invoice.date.toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                        })}
                                    </td>
                                    <td className="py-4 px-6 text-sm text-slate-500 font-mono">{invoice.id}</td>
                                    <td className="py-4 px-6 text-sm text-slate-700">{invoice.planName}</td>
                                    <td className="py-4 px-6 text-sm font-bold text-slate-900 text-right">
                                        {formatRupiah(invoice.amount)}
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[invoice.status].className}`}
                                        >
                                            {statusConfig[invoice.status].label}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <button className="text-slate-400 hover:text-primary transition-colors p-1 rounded-full hover:bg-slate-100">
                                            <Icon name="description" className="text-lg" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                        Menampilkan {invoices.length} dari {totalCount} tagihan
                    </span>
                    <div className="flex gap-2">
                        <button className="p-1 rounded-full text-slate-400 hover:text-slate-900 disabled:opacity-50">
                            <Icon name="chevron_left" className="text-lg" />
                        </button>
                        <button className="p-1 rounded-full text-slate-400 hover:text-slate-900">
                            <Icon name="chevron_right" className="text-lg" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
