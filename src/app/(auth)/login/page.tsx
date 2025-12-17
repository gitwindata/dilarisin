'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Icon } from '@/components/ui/icon';
import { AuthInput } from '@/components/auth';
import { Button } from '@/components/ui/button';

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });

    useEffect(() => {
        if (searchParams.get('registered') === 'true') {
            setSuccess('Registrasi berhasil! Silakan login dengan akun Anda.');
        }
    }, [searchParams]);

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
        setSuccess('');
        setIsLoading(true);

        try {
            const result = await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                setError('Email atau password salah');
            } else {
                router.push('/dashboard');
                router.refresh();
            }
        } catch {
            setError('Terjadi kesalahan. Silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-[500px] bg-white dark:bg-[#1e1e1e] rounded-[2rem] shadow-xl border border-gray-100 dark:border-gray-800 p-8 sm:p-10">
            {/* Toggle Tabs */}
            <div className="flex bg-gray-100 dark:bg-[#2c2c2c] p-1 rounded-full mb-8">
                <Link
                    href="/register"
                    className="flex-1 py-2.5 text-sm font-medium text-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-all"
                >
                    Buat Akun Baru
                </Link>
                <div className="flex-1 py-2.5 text-sm font-semibold text-center rounded-full bg-white dark:bg-[#3d3d3d] text-primary shadow-sm">
                    Masuk
                </div>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#231a0f] dark:text-white mb-2">
                    Selamat Datang Kembali
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Masuk ke akun Dilarisin Anda
                </p>
            </div>

            {/* Google Auth Button */}
            <button
                type="button"
                onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
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
                    Masuk dengan Google
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

            {/* Success Message */}
            {success && (
                <div className="mb-4 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm flex items-center gap-2">
                    <Icon name="check_circle" className="text-lg" />
                    {success}
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
                    <Icon name="error" className="text-lg" />
                    {error}
                </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    icon="lock"
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between pt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleChange}
                            className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary/20"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Ingat saya</span>
                    </label>
                    <Link
                        href="/forgot-password"
                        className="text-sm text-primary hover:underline font-medium"
                    >
                        Lupa password?
                    </Link>
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
                            Masuk
                            <Icon name="arrow_forward" className="text-lg" />
                        </>
                    )}
                </Button>
            </form>

            {/* Footer Link */}
            <div className="mt-8 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Belum punya akun?{' '}
                    <Link href="/register" className="text-primary font-bold hover:underline">
                        Daftar gratis
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="w-full max-w-[500px] h-[600px] bg-white dark:bg-[#1e1e1e] rounded-[2rem] animate-pulse" />
        }>
            <LoginForm />
        </Suspense>
    );
}
