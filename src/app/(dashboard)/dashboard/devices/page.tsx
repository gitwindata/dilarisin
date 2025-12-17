'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import {
    DeviceList,
    AddDeviceModal,
    ActivationCodeModal,
} from '@/components/dashboard';
import { MAX_DEVICES_PER_USER } from '@/db/schema/devices';

interface Device {
    id: string;
    name: string;
    activationCode: string;
    lastActive: Date | null;
    isActive: boolean;
}

// Generate random activation code
function generateActivationCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // No confusing chars like 0/O, 1/I
    let code = '';
    for (let i = 0; i < 16; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

// Mock data
const initialDevices: Device[] = [
    {
        id: '1',
        name: 'MacBook Pro',
        activationCode: 'ABCD1234EFGH5678',
        lastActive: new Date(),
        isActive: true,
    },
    {
        id: '2',
        name: 'PC Kantor',
        activationCode: 'WXYZ9876MNOP4321',
        lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
        isActive: true,
    },
];

export default function DevicesPage() {
    const [devices, setDevices] = useState<Device[]>(initialDevices);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newDevice, setNewDevice] = useState<{ name: string; code: string } | null>(null);

    const handleAddDevice = (name: string) => {
        const code = generateActivationCode();
        const device: Device = {
            id: Date.now().toString(),
            name,
            activationCode: code,
            lastActive: null, // Not used yet
            isActive: false,
        };
        setDevices((prev) => [...prev, device]);
        setIsAddModalOpen(false);
        setNewDevice({ name, code });
    };

    const handleRemoveDevice = (id: string) => {
        setDevices((prev) => prev.filter((d) => d.id !== id));
    };

    const remainingSlots = MAX_DEVICES_PER_USER - devices.length;

    return (
        <div className="flex flex-col gap-10">
            {/* Page Heading */}
            <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                        Perangkat Saya
                    </h1>
                    <p className="text-slate-500 max-w-xl">
                        Kelola perangkat yang terhubung dengan akun Dilarisin Anda. Maksimal{' '}
                        {MAX_DEVICES_PER_USER} perangkat aktif per akun.
                    </p>
                </div>
                <Button
                    onClick={() => setIsAddModalOpen(true)}
                    disabled={remainingSlots <= 0}
                    size="lg"
                >
                    <Icon name="add" />
                    Tambah Perangkat
                </Button>
            </section>

            {/* Device Limit Info Card */}
            <section className="bg-gradient-to-r from-primary/10 to-orange-50 rounded-2xl p-6 border border-primary/20">
                <div className="flex items-start gap-4">
                    <div className="size-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
                        <Icon name="info" className="text-2xl" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 mb-1">Cara Menggunakan Kode Aktivasi</h3>
                        <ol className="text-sm text-slate-600 leading-relaxed list-decimal list-inside space-y-1">
                            <li>Klik &quot;Tambah Perangkat&quot; dan beri nama perangkat</li>
                            <li>Salin Kode Aktivasi yang muncul</li>
                            <li>Buka Extension Dilarisin di browser tujuan</li>
                            <li>Masukkan Kode Aktivasi di halaman aktivasi Extension</li>
                        </ol>
                    </div>
                </div>
            </section>

            {/* Device Usage Summary */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="size-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                            <Icon name="devices" className="text-2xl" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Perangkat Terdaftar</p>
                            <p className="text-2xl font-bold text-slate-900">
                                {devices.length}
                                <span className="text-base font-normal text-slate-400">
                                    /{MAX_DEVICES_PER_USER}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="size-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                            <Icon name="check_circle" className="text-2xl" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Perangkat Aktif</p>
                            <p className="text-2xl font-bold text-slate-900">
                                {devices.filter((d) => d.isActive).length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div
                            className={`size-12 rounded-full flex items-center justify-center ${remainingSlots > 0
                                ? 'bg-primary/10 text-primary'
                                : 'bg-red-50 text-red-500'
                                }`}
                        >
                            <Icon name={remainingSlots > 0 ? 'add_circle' : 'block'} className="text-2xl" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Slot Tersedia</p>
                            <p className="text-2xl font-bold text-slate-900">{remainingSlots}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Device List */}
            <DeviceList
                devices={devices}
                maxDevices={MAX_DEVICES_PER_USER}
                onRemoveDevice={handleRemoveDevice}
            />

            {/* FAQ Section */}
            <section className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-4">Pertanyaan Umum</h3>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold text-slate-700 text-sm">
                            Bagaimana jika saya lupa Kode Aktivasi?
                        </h4>
                        <p className="text-sm text-slate-500 mt-1">
                            Hapus perangkat yang lama dan buat perangkat baru untuk mendapatkan kode aktivasi baru.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-700 text-sm">
                            Apa yang terjadi jika saya hapus perangkat?
                        </h4>
                        <p className="text-sm text-slate-500 mt-1">
                            Extension di perangkat tersebut akan otomatis nonaktif dan perlu kode aktivasi baru untuk menggunakannya kembali.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-700 text-sm">
                            Bisakah saya menggunakan kode yang sama di beberapa browser?
                        </h4>
                        <p className="text-sm text-slate-500 mt-1">
                            Tidak, satu kode aktivasi hanya untuk satu browser/perangkat.
                        </p>
                    </div>
                </div>
            </section>

            {/* Modals */}
            <AddDeviceModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAdd={handleAddDevice}
                remainingSlots={remainingSlots}
            />

            {newDevice && (
                <ActivationCodeModal
                    isOpen={!!newDevice}
                    onClose={() => setNewDevice(null)}
                    deviceName={newDevice.name}
                    activationCode={newDevice.code}
                />
            )}
        </div>
    );
}
