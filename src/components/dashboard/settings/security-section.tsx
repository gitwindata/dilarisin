'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/icon';

export function SecuritySection() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

    return (
        <section className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 flex flex-col h-full">
            <div className="border-b border-gray-100 pb-4 mb-6">
                <h2 className="text-slate-900 text-xl font-bold flex items-center gap-2">
                    <Icon name="lock" className="text-gray-400" />
                    Keamanan Akun
                </h2>
            </div>

            <div className="flex flex-col gap-5 flex-1">
                {/* Password Fields */}
                <div className="flex flex-col gap-3">
                    <label className="text-sm font-semibold text-slate-900">Ubah Password</label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Password Saat Ini"
                        className="w-full rounded-full border border-gray-200 bg-gray-50 px-5 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Password Baru"
                        className="w-full rounded-full border border-gray-200 bg-gray-50 px-5 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                </div>

                {/* 2FA Toggle */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col max-w-[70%]">
                            <span className="font-bold text-slate-900 text-sm">
                                Two-Factor Authentication (2FA)
                            </span>
                            <span className="text-xs text-gray-500 mt-1 leading-relaxed">
                                Tambahkan keamanan ekstra dengan kode verifikasi SMS.
                            </span>
                        </div>
                        {/* Toggle Switch */}
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={twoFactorEnabled}
                                onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                        </label>
                    </div>
                </div>

                <div className="mt-auto pt-4 flex justify-end">
                    <button className="text-sm font-bold text-slate-900 hover:text-primary transition-colors">
                        Update Password
                    </button>
                </div>
            </div>
        </section>
    );
}
