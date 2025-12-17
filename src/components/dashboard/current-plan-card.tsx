import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface CurrentPlanCardProps {
    planName: string;
    status: 'active' | 'expired' | 'cancelled';
    price: number;
    billingCycle: 'monthly' | 'yearly' | 'biennial';
    renewalDate: Date;
    features: string[];
}

function formatRupiah(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

const billingLabels = {
    monthly: 'bulan',
    yearly: 'tahun',
    biennial: '2 tahun',
};

export function CurrentPlanCard({
    planName,
    status,
    price,
    billingCycle,
    renewalDate,
    features,
}: CurrentPlanCardProps) {
    const isActive = status === 'active';

    return (
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-8 flex flex-col lg:flex-row gap-10">
                {/* Plan Details & Pricing */}
                <div className="flex-1 flex flex-col justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-2xl font-bold text-slate-900">{planName}</h2>
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${isActive
                                        ? 'bg-green-100 text-green-700 border-green-200'
                                        : status === 'expired'
                                            ? 'bg-red-100 text-red-700 border-red-200'
                                            : 'bg-gray-100 text-gray-700 border-gray-200'
                                    }`}
                            >
                                {isActive ? 'Aktif' : status === 'expired' ? 'Expired' : 'Dibatalkan'}
                            </span>
                        </div>
                        <p className="text-slate-500 text-sm mb-6">
                            Pembaruan otomatis berikutnya pada{' '}
                            <span className="font-semibold text-slate-700">
                                {renewalDate.toLocaleDateString('id-ID', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                })}
                            </span>
                        </p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
                                {formatRupiah(price)}
                            </span>
                            <span className="text-slate-400 font-medium">/ {billingLabels[billingCycle]}</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 mt-2">
                        <Link href="/subscription">
                            <Button size="lg" className="shadow-lg shadow-primary/20">
                                <Icon name="upgrade" className="text-lg" />
                                Upgrade Paket
                            </Button>
                        </Link>
                        <button className="bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold py-3 px-6 rounded-full transition-colors border border-slate-200">
                            Kelola Metode Bayar
                        </button>
                    </div>
                </div>

                {/* Divider (Desktop only) */}
                <div className="hidden lg:block w-px bg-slate-100 my-2" />

                {/* Feature Snapshot */}
                <div className="lg:w-80 flex flex-col justify-center">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                        Fitur Utama Aktif
                    </h3>
                    <ul className="flex flex-col gap-3">
                        {features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <Icon name="check_circle" className="text-primary text-lg" />
                                <span className="text-slate-600 text-sm font-medium">{feature}</span>
                            </li>
                        ))}
                    </ul>
                    <Link
                        href="/subscription"
                        className="mt-6 text-sm font-bold text-primary hover:underline inline-flex items-center gap-1"
                    >
                        Lihat semua fitur
                        <Icon name="arrow_forward" className="text-sm" />
                    </Link>
                </div>
            </div>

            {/* Cancel Link Footer */}
            <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                <p className="text-xs text-slate-400">Pembayaran aman via Midtrans</p>
                <button className="text-xs font-semibold text-slate-400 hover:text-red-500 transition-colors">
                    Batalkan Langganan
                </button>
            </div>
        </section>
    );
}
