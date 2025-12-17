'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface AddDeviceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (name: string) => void;
    remainingSlots: number;
}

export function AddDeviceModal({ isOpen, onClose, onAdd, remainingSlots }: AddDeviceModalProps) {
    const [deviceName, setDeviceName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!deviceName.trim()) return;

        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call
        onAdd(deviceName.trim());
        setDeviceName('');
        setIsLoading(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-slate-100">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-slate-900">Tambah Perangkat Baru</h2>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                        >
                            <Icon name="close" className="text-slate-400" />
                        </button>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">
                        Buat kode aktivasi untuk perangkat baru Anda
                    </p>
                </div>

                {/* Content */}
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Nama Perangkat
                        </label>
                        <input
                            type="text"
                            value={deviceName}
                            onChange={(e) => setDeviceName(e.target.value)}
                            placeholder="Contoh: Laptop Kantor, PC Rumah"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-slate-900 placeholder-slate-400"
                            autoFocus
                        />
                        <p className="text-xs text-slate-400 mt-2">
                            Beri nama yang mudah diingat untuk mengidentifikasi perangkat ini
                        </p>
                    </div>

                    {/* Info */}
                    <div className="bg-primary/5 rounded-xl p-4 mb-6 border border-primary/10">
                        <div className="flex items-start gap-3">
                            <Icon name="info" className="text-primary text-lg shrink-0 mt-0.5" />
                            <div className="text-sm text-slate-600">
                                <p>
                                    Setelah dibuat, Anda akan mendapat <strong>Kode Aktivasi</strong> yang perlu
                                    dimasukkan di Extension Dilarisin.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Slot info */}
                    <div className="flex items-center gap-2 mb-6 text-sm">
                        <Icon name="check_circle" className="text-green-500" />
                        <span className="text-slate-600">
                            {remainingSlots} slot tersedia dari 3 maksimal
                        </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 px-4 rounded-full border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
                        >
                            Batal
                        </button>
                        <Button
                            type="submit"
                            disabled={!deviceName.trim() || isLoading}
                            className="flex-1"
                        >
                            {isLoading ? (
                                <>
                                    <Icon name="progress_activity" className="animate-spin" />
                                    Membuat...
                                </>
                            ) : (
                                <>
                                    <Icon name="add" />
                                    Buat Perangkat
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
