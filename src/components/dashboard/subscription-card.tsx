import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface SubscriptionCardProps {
    planName: string;
    status: 'active' | 'expired' | 'pending';
    endDate: Date;
    daysRemaining: number;
}

export function SubscriptionCard({
    planName,
    status,
    endDate,
    daysRemaining,
}: SubscriptionCardProps) {
    const isActive = status === 'active';
    const progressPercent = isActive ? Math.min((daysRemaining / 365) * 100, 100) : 0;

    return (
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 relative group">
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1A352B] to-primary" />

            <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Left: Plan Info */}
                <div className="flex-1 space-y-4 w-full">
                    <div className="flex items-center gap-3">
                        <span
                            className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${isActive
                                    ? 'bg-primary/10 text-primary'
                                    : status === 'expired'
                                        ? 'bg-red-100 text-red-700'
                                        : 'bg-gray-100 text-gray-700'
                                }`}
                        >
                            {status === 'active' ? 'Aktif' : status === 'expired' ? 'Expired' : 'Pending'}
                        </span>
                        <h3 className="text-2xl font-bold text-slate-900">{planName}</h3>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-sm text-gray-500">Berlaku sampai</p>
                        <p className="text-base font-semibold text-slate-900 flex items-center gap-2">
                            <Icon name="event" className="text-gray-400 text-lg" />
                            {endDate.toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </p>
                    </div>
                    <div className="pt-2">
                        <Link href="/subscription">
                            <Button size="lg" className="shadow-lg shadow-primary/30">
                                <Icon name="autorenew" className="text-lg" />
                                Perpanjang Sekarang
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Right: Progress Circle */}
                <div className="relative size-32 flex-shrink-0">
                    <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                        <path
                            className="text-gray-100"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                        />
                        <path
                            className="text-primary"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeDasharray={`${progressPercent}, 100`}
                            strokeLinecap="round"
                            strokeWidth="3"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-900">
                        <span className="text-2xl font-bold">{daysRemaining}</span>
                        <span className="text-[10px] uppercase font-bold text-gray-400">Hari Lagi</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
