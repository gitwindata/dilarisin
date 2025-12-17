'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/icon';

interface Device {
    id: string;
    name: string;
    activationCode: string; // stored but masked in display
    lastActive: Date | null;
    isActive: boolean;
}

interface DeviceListProps {
    devices: Device[];
    maxDevices: number;
    onRemoveDevice: (id: string) => void;
}

export function DeviceList({ devices, maxDevices, onRemoveDevice }: DeviceListProps) {
    const [removingId, setRemovingId] = useState<string | null>(null);

    const handleRemove = async (id: string) => {
        setRemovingId(id);
        // In production, call API to remove device
        await new Promise((resolve) => setTimeout(resolve, 500));
        onRemoveDevice(id);
        setRemovingId(null);
    };

    const formatLastActive = (date: Date | null) => {
        if (!date) return 'Belum pernah digunakan';

        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 5) return 'Baru saja';
        if (diffMins < 60) return `${diffMins} menit lalu`;
        if (diffHours < 24) return `${diffHours} jam lalu`;
        return `${diffDays} hari lalu`;
    };

    const maskCode = (code: string) => {
        // Show first 4 and last 4 characters: XXXX-****-****-XXXX
        if (code.length <= 8) return code;
        const first = code.slice(0, 4);
        const last = code.slice(-4);
        return `${first}-****-****-${last}`;
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                    <h3 className="font-bold text-lg text-slate-900">Perangkat Terdaftar</h3>
                    <p className="text-sm text-slate-500 mt-1">
                        {devices.length} dari {maxDevices} slot terpakai
                    </p>
                </div>
                <div
                    className={`px-3 py-1.5 rounded-full text-xs font-bold ${devices.length >= maxDevices
                            ? 'bg-red-100 text-red-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                >
                    {devices.length >= maxDevices ? 'Penuh' : `${maxDevices - devices.length} Slot Tersedia`}
                </div>
            </div>

            {/* Device List */}
            <div className="divide-y divide-slate-100">
                {devices.map((device) => (
                    <div
                        key={device.id}
                        className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors"
                    >
                        <div className="flex items-center gap-4">
                            {/* Device Icon */}
                            <div
                                className={`size-12 rounded-xl flex items-center justify-center ${device.isActive
                                        ? 'bg-green-100 text-green-600'
                                        : 'bg-slate-100 text-slate-400'
                                    }`}
                            >
                                <Icon name="computer" className="text-2xl" />
                            </div>

                            {/* Device Info */}
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-slate-900">{device.name}</span>
                                    {device.isActive && (
                                        <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                                            Aktif
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-slate-500 font-mono mt-0.5">
                                    {maskCode(device.activationCode)}
                                </p>
                                <p className="text-xs text-slate-400 mt-1">
                                    Terakhir aktif: {formatLastActive(device.lastActive)}
                                </p>
                            </div>
                        </div>

                        {/* Remove Button */}
                        <button
                            onClick={() => handleRemove(device.id)}
                            disabled={removingId === device.id}
                            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                        >
                            {removingId === device.id ? (
                                <>
                                    <Icon name="progress_activity" className="animate-spin text-lg" />
                                    Menghapus...
                                </>
                            ) : (
                                <>
                                    <Icon name="delete" className="text-lg" />
                                    Hapus
                                </>
                            )}
                        </button>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {devices.length === 0 && (
                <div className="p-12 text-center">
                    <div className="size-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                        <Icon name="devices" className="text-3xl text-slate-300" />
                    </div>
                    <p className="text-slate-900 font-semibold mb-1">Belum ada perangkat</p>
                    <p className="text-slate-500 text-sm">
                        Klik &quot;Tambah Perangkat&quot; untuk membuat kode aktivasi baru
                    </p>
                </div>
            )}
        </div>
    );
}
