import { Icon } from '@/components/ui/icon';
import Link from 'next/link';

interface DeviceCardProps {
    activeDevices: number;
    maxDevices: number;
}

export function DeviceCard({ activeDevices, maxDevices }: DeviceCardProps) {
    const usagePercent = (activeDevices / maxDevices) * 100;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-900">Perangkat Aktif</h3>
                    <span className="bg-gray-100 p-1.5 rounded-lg text-gray-500">
                        <Icon name="devices" />
                    </span>
                </div>
                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Terpakai</p>
                        <p className="text-3xl font-bold text-slate-900">
                            {activeDevices}{' '}
                            <span className="text-base font-normal text-gray-400">/ {maxDevices}</span>
                        </p>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                            className="bg-primary h-full rounded-full transition-all"
                            style={{ width: `${usagePercent}%` }}
                        />
                    </div>
                    <p className="text-xs text-gray-500">
                        {activeDevices < maxDevices
                            ? `${maxDevices - activeDevices} slot tersedia`
                            : 'Batas perangkat tercapai'}
                    </p>
                </div>
            </div>
            <Link
                href="/dashboard/devices"
                className="w-full mt-6 border border-gray-200 hover:border-primary hover:text-primary text-slate-900 font-bold py-2.5 px-4 rounded-full text-sm transition-colors flex items-center justify-center gap-2"
            >
                Kelola Perangkat
            </Link>
        </div>
    );
}
