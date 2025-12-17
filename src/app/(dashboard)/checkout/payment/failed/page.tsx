'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Icon } from '@/components/ui/icon';
import { CheckoutHeader } from '@/components/subscription/checkout-header';
import Link from 'next/link';

function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
}

function FailedContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId') || 'DT-99281';
    const reason = searchParams.get('reason') || 'expired';
    const [isVisible, setIsVisible] = useState(false);

    // Fade in animation on mount
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 50);
        return () => clearTimeout(timer);
    }, []);

    const errorMessages: Record<string, { title: string; description: string }> = {
        expired: {
            title: 'QR Code Kadaluarsa',
            description: 'Maaf, transaksi Anda tidak dapat diproses karena QR Code sudah kadaluarsa. Silakan ulangi proses pembayaran.',
        },
        failed: {
            title: 'Pembayaran Gagal',
            description: 'Maaf, transaksi Anda tidak dapat diproses. Silakan periksa saldo e-wallet Anda dan coba lagi.',
        },
        cancelled: {
            title: 'Transaksi Dibatalkan',
            description: 'Transaksi Anda telah dibatalkan. Silakan ulangi proses pembayaran jika Anda ingin melanjutkan.',
        },
    };

    const errorInfo = errorMessages[reason] || errorMessages.failed;

    const handleRetry = () => {
        router.push('/checkout');
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#f8f7f5] dark:bg-[#231a0f] font-display antialiased">
            {/* Custom animation styles */}
            <style jsx>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }
                .animate-shake {
                    animation: shake 0.6s ease-in-out;
                }
            `}</style>

            {/* Header with Progress */}
            <CheckoutHeader currentStep={3} />

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
                <div className={`w-full max-w-[480px] flex flex-col items-center transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                    }`}>
                    {/* Status Card */}
                    <div className={`w-full bg-white dark:bg-[#2d1b1b] rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden p-8 sm:p-10 flex flex-col items-center text-center transition-all duration-500 delay-100 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                        }`}>
                        {/* Icon */}
                        <div className={`mb-6 relative group transition-all duration-500 delay-200 ${isVisible ? 'opacity-100 scale-100 animate-shake' : 'opacity-0 scale-50'
                            }`}>
                            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                            <div className="relative h-24 w-24 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center border-4 border-white dark:border-[#2d1b1b] shadow-sm">
                                <Icon name="close" className="text-5xl text-red-500 scale-110" />
                            </div>
                        </div>

                        {/* Headline */}
                        <h1 className={`text-slate-900 dark:text-white tracking-tight text-[28px] sm:text-[32px] font-bold leading-tight mb-3 transition-all duration-500 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}>
                            Pembayaran Gagal
                        </h1>

                        {/* Body Text */}
                        <p className={`text-gray-500 dark:text-gray-400 text-base font-normal leading-relaxed mb-8 px-2 transition-all duration-500 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}>
                            {errorInfo.description}
                        </p>

                        {/* Transaction Details */}
                        <div className={`w-full bg-[#f8f7f5] dark:bg-[#231a0f]/50 rounded-2xl p-5 mb-8 border border-slate-100 dark:border-slate-800 transition-all duration-500 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}>
                            <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700/50">
                                <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">ID Transaksi</span>
                                <span className="text-slate-900 dark:text-white text-sm font-bold font-mono tracking-wide">
                                    #{orderId}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700/50">
                                <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">Metode</span>
                                <div className="flex items-center gap-1.5">
                                    <Icon name="qr_code_scanner" className="text-gray-400 text-[16px]" />
                                    <span className="text-slate-900 dark:text-white text-sm font-semibold">QRIS</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center py-2 pt-3">
                                <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">Waktu</span>
                                <span className="text-slate-900 dark:text-white text-sm font-medium">
                                    {formatDate(new Date())}
                                </span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className={`w-full flex flex-col gap-4 transition-all duration-500 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}>
                            <button
                                onClick={handleRetry}
                                className="w-full bg-primary hover:bg-[#c46a03] text-white font-bold text-base py-3.5 px-6 rounded-full shadow-lg shadow-primary/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 hover:shadow-primary/40"
                            >
                                Coba Lagi
                            </button>
                            <Link
                                href="#"
                                className="inline-flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 font-semibold text-sm hover:text-primary dark:hover:text-primary transition-colors py-2"
                            >
                                <Icon name="support_agent" className="text-[18px]" />
                                Hubungi Support
                            </Link>
                        </div>
                    </div>

                    {/* Footer Links */}
                    <div className={`mt-8 flex gap-6 text-sm text-gray-400 dark:text-gray-500 transition-all duration-500 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}>
                        <Link href="#" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                            Syarat & Ketentuan
                        </Link>
                        <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700 self-center" />
                        <Link href="#" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                            Kebijakan Privasi
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function PaymentFailedPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center bg-[#f8f7f5] dark:bg-[#231a0f]">
                    <div className="animate-spin">
                        <Icon name="progress_activity" className="text-4xl text-primary" />
                    </div>
                </div>
            }
        >
            <FailedContent />
        </Suspense>
    );
}
