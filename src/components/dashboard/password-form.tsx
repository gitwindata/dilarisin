'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

export function PasswordForm() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPasswords, setShowPasswords] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState('');

    const isValid =
        currentPassword.length > 0 &&
        newPassword.length >= 8 &&
        newPassword === confirmPassword;

    const getPasswordStrength = (password: string) => {
        if (password.length === 0) return { level: 0, label: '', color: '' };
        if (password.length < 6) return { level: 1, label: 'Lemah', color: 'bg-red-500' };
        if (password.length < 8) return { level: 2, label: 'Sedang', color: 'bg-yellow-500' };
        if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
            return { level: 3, label: 'Kuat', color: 'bg-green-500' };
        }
        return { level: 2, label: 'Sedang', color: 'bg-yellow-500' };
    };

    const strength = getPasswordStrength(newPassword);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValid) return;

        setError('');
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));

        // In production, call API to change password
        setIsLoading(false);
        setSaved(true);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-900">Keamanan</h2>
                <p className="text-sm text-slate-500 mt-1">Ubah password akun Anda</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Current Password */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Password Saat Ini
                    </label>
                    <div className="relative">
                        <input
                            type={showPasswords ? 'text' : 'password'}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-slate-900 pr-12"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPasswords(!showPasswords)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                            <Icon name={showPasswords ? 'visibility_off' : 'visibility'} />
                        </button>
                    </div>
                </div>

                {/* New Password */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Password Baru</label>
                    <input
                        type={showPasswords ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-slate-900"
                    />
                    {/* Strength Indicator */}
                    {newPassword.length > 0 && (
                        <div className="mt-2">
                            <div className="flex gap-1 mb-1">
                                {[1, 2, 3].map((level) => (
                                    <div
                                        key={level}
                                        className={`h-1 flex-1 rounded-full transition-colors ${level <= strength.level ? strength.color : 'bg-slate-200'
                                            }`}
                                    />
                                ))}
                            </div>
                            <p className="text-xs text-slate-500">
                                Kekuatan: <span className="font-medium">{strength.label}</span>
                            </p>
                        </div>
                    )}
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Konfirmasi Password Baru
                    </label>
                    <input
                        type={showPasswords ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border transition-all text-slate-900 ${confirmPassword.length > 0 && confirmPassword !== newPassword
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                                : 'border-slate-200 focus:border-primary focus:ring-primary/20'
                            } focus:ring-2`}
                    />
                    {confirmPassword.length > 0 && confirmPassword !== newPassword && (
                        <p className="text-xs text-red-500 mt-1">Password tidak cocok</p>
                    )}
                </div>

                {error && (
                    <div className="bg-red-50 text-red-700 text-sm p-4 rounded-xl border border-red-100">
                        {error}
                    </div>
                )}

                {/* Submit */}
                <Button type="submit" disabled={!isValid || isLoading}>
                    {isLoading ? (
                        <>
                            <Icon name="progress_activity" className="animate-spin" />
                            Menyimpan...
                        </>
                    ) : saved ? (
                        <>
                            <Icon name="check" />
                            Password Diubah!
                        </>
                    ) : (
                        <>
                            <Icon name="lock" />
                            Ubah Password
                        </>
                    )}
                </Button>
            </form>
        </section>
    );
}
