'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon } from '@/components/ui/icon';
import { AuthInput, PasswordStrength } from '@/components/auth';
import { Button } from '@/components/ui/button';

export default function RegisterPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError('Password tidak cocok');
            return;
        }

        if (formData.password.length < 8) {
            setError('Password minimal 8 karakter');
            return;
        }

        if (!formData.agreeTerms) {
            setError('Anda harus menyetujui syarat & ketentuan');
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone || undefined,
                    password: formData.password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Registrasi gagal');
            }

            // Redirect to login on success
            router.push('/login?registered=true');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-[500px] bg-white dark:bg-[#1e1e1e] rounded-[2rem] shadow-xl border border-gray-100 dark:border-gray-800 p-8 sm:p-10">
            {/* Toggle Tabs */}
            <div className="flex bg-gray-100 dark:bg-[#2c2c2c] p-1 rounded-full mb-8">
                <div className="flex-1 py-2.5 text-sm font-semibold text-center rounded-full bg-white dark:bg-[#3d3d3d] text-primary shadow-sm">
                    Buat Akun Baru
                </div>
                <Link
                    href="/login"
                    className="flex-1 py-2.5 text-sm font-medium text-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-all"
                >
                    Masuk
                </Link>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#231a0f] dark:text-white mb-2">
                    Mulai Perjalanan Anda
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Bergabung dengan ribuan seller Shopee sukses lainnya.
                </p>
            </div>

            {/* Google Auth Button */}
            <button
                type="button"
                className="w-full h-12 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#2c2c2c] flex items-center justify-center gap-3 transition-colors mb-6 bg-white dark:bg-transparent"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                </svg>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Daftar dengan Google
                </span>
            </button>

            {/* Divider */}
            <div className="relative flex py-2 items-center mb-6">
                <div className="flex-grow border-t border-gray-200 dark:border-gray-700" />
                <span className="flex-shrink-0 mx-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
                    atau dengan email
                </span>
                <div className="flex-grow border-t border-gray-200 dark:border-gray-700" />
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
                    <Icon name="error" className="text-lg" />
                    {error}
                </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <AuthInput
                    icon="person"
                    placeholder="Nama Lengkap"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <AuthInput
                    icon="mail"
                    placeholder="Alamat Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <AuthInput
                    icon="call"
                    placeholder="No. Handphone (Opsional)"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                />

                <AuthInput
                    icon="lock"
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <PasswordStrength password={formData.password} />

                <AuthInput
                    icon="lock_reset"
                    placeholder="Konfirmasi Password"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />

                {/* Terms Checkbox */}
                <div className="pt-2 pb-2">
                    <label className="flex gap-3 items-start cursor-pointer">
                        <div className="relative flex items-center mt-0.5">
                            <input
                                type="checkbox"
                                name="agreeTerms"
                                checked={formData.agreeTerms}
                                onChange={handleChange}
                                className="peer h-5 w-5 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2c2c] text-primary focus:ring-primary/20 cursor-pointer"
                            />
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 select-none">
                            Saya setuju dengan{' '}
                            <Link href="/terms" className="text-primary hover:underline font-semibold">
                                Syarat & Ketentuan
                            </Link>{' '}
                            serta Kebijakan Privasi.
                        </p>
                    </label>
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 mt-4"
                    size="lg"
                >
                    {isLoading ? (
                        <>
                            <Icon name="progress_activity" className="animate-spin" />
                            Memproses...
                        </>
                    ) : (
                        <>
                            Daftar Sekarang
                            <Icon name="arrow_forward" className="text-lg" />
                        </>
                    )}
                </Button>
            </form>

            {/* Footer Link */}
            <div className="mt-8 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Sudah punya akun?{' '}
                    <Link href="/login" className="text-primary font-bold hover:underline">
                        Masuk disini
                    </Link>
                </p>
            </div>
        </div>
    );
}
