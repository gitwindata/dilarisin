'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/icon';

interface DangerZoneProps {
    onDeleteAccount: () => void;
}

export function DangerZone({ onDeleteAccount }: DangerZoneProps) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmText, setConfirmText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (confirmText !== 'HAPUS AKUN') return;

        setIsDeleting(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        onDeleteAccount();
    };

    return (
        <section className="bg-white rounded-2xl border border-red-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-red-100 bg-red-50">
                <h2 className="text-lg font-bold text-red-700">Zona Berbahaya</h2>
                <p className="text-sm text-red-600 mt-1">
                    Tindakan di bawah ini bersifat permanen dan tidak dapat dibatalkan
                </p>
            </div>

            <div className="p-6">
                {!showConfirm ? (
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-slate-900">Hapus Akun</h3>
                            <p className="text-sm text-slate-500 mt-1">
                                Menghapus akun akan menghapus semua data, langganan, dan perangkat terdaftar
                            </p>
                        </div>
                        <button
                            onClick={() => setShowConfirm(true)}
                            className="px-4 py-2 rounded-full border border-red-200 text-red-600 font-semibold hover:bg-red-50 transition-colors"
                        >
                            Hapus Akun
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                            <div className="flex items-start gap-3">
                                <Icon name="warning" className="text-red-500 text-xl shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm text-red-700 font-semibold">
                                        Apakah Anda yakin ingin menghapus akun?
                                    </p>
                                    <ul className="text-sm text-red-600 mt-2 space-y-1 list-disc list-inside">
                                        <li>Semua data akan dihapus permanen</li>
                                        <li>Langganan aktif akan dibatalkan tanpa refund</li>
                                        <li>Semua perangkat akan dinonaktifkan</li>
                                        <li>Anda tidak dapat memulihkan akun</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Ketik <span className="font-mono font-bold">HAPUS AKUN</span> untuk konfirmasi
                            </label>
                            <input
                                type="text"
                                value={confirmText}
                                onChange={(e) => setConfirmText(e.target.value)}
                                placeholder="HAPUS AKUN"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all text-slate-900"
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setShowConfirm(false);
                                    setConfirmText('');
                                }}
                                className="flex-1 py-3 px-4 rounded-full border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={confirmText !== 'HAPUS AKUN' || isDeleting}
                                className="flex-1 py-3 px-4 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isDeleting ? (
                                    <>
                                        <Icon name="progress_activity" className="animate-spin" />
                                        Menghapus...
                                    </>
                                ) : (
                                    <>
                                        <Icon name="delete_forever" />
                                        Hapus Akun Saya
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
