'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Icon } from '@/components/ui/icon';
import { CheckoutHeader } from '@/components/subscription/checkout-header';
import Link from 'next/link';

function formatRupiah(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

function PaymentContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
    const [isExpired, setIsExpired] = useState(false);
    const [isChecking, setIsChecking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const amount = Number(searchParams.get('amount')) || 499000;
    const orderId = searchParams.get('orderId') || 'DT-88291';

    // Fade in animation on mount
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 50);
        return () => clearTimeout(timer);
    }, []);

    // Countdown timer
    useEffect(() => {
        if (timeLeft <= 0) {
            setIsExpired(true);
            router.push(`/checkout/payment/failed?orderId=${orderId}&reason=expired`);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, router, orderId]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handlePaymentConfirm = async () => {
        setIsChecking(true);
        // Simulate payment check
        await new Promise(resolve => setTimeout(resolve, 2000));
        // For demo, redirect to success
        router.push(`/checkout/payment/success?orderId=${orderId}&amount=${amount}`);
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#f8f7f5] dark:bg-[#231a0f] font-display text-slate-900 dark:text-white transition-colors duration-300">
            {/* Header with Progress */}
            <CheckoutHeader currentStep={3} />

            {/* Main Payment Content */}
            <main className="flex-grow flex items-center justify-center p-4 md:p-8">
                {/* Payment Card with animation */}
                <div
                    className={`w-full max-w-[480px] bg-white dark:bg-[#2d1b1b] rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden relative transition-all duration-500 ease-out ${isVisible
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-8'
                        }`}
                >
                    {/* Progress Indicator */}
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800">
                        <div className="w-3/4 h-full bg-primary rounded-r-full transition-all duration-1000" />
                    </div>

                    <div className="p-6 md:p-8 flex flex-col items-center">
                        {/* Header */}
                        <div className={`text-center mb-6 transition-all duration-500 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}>
                            <h1 className="text-2xl font-bold mb-2">Scan QR untuk Membayar</h1>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                                Gunakan aplikasi e-wallet pilihan Anda
                            </p>
                        </div>

                        {/* Timer Badge */}
                        <div className={`mb-8 ${!isExpired && 'animate-pulse'} transition-all duration-500 delay-150 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                            }`}>
                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${isExpired
                                    ? 'bg-red-100 border-red-200 text-red-600'
                                    : timeLeft < 60
                                        ? 'bg-red-100 border-red-200 text-red-600'
                                        : 'bg-primary/10 border-primary/20 text-primary'
                                }`}>
                                <Icon name="timer" className="text-[20px]" />
                                <span className="font-bold text-sm tracking-wide">
                                    {isExpired ? 'Waktu habis!' : `Selesaikan dalam ${formatTime(timeLeft)}`}
                                </span>
                            </div>
                        </div>

                        {/* QR Code Section */}
                        <div className={`relative group transition-all duration-500 delay-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                            }`}>
                            <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-slate-200 shadow-sm relative z-10">
                                {/* Simulated QR Code */}
                                <div className="size-52 bg-[#f8f7f5] rounded-xl flex items-center justify-center relative overflow-hidden">
                                    {/* QR Pattern (simplified representation) */}
                                    <div className="absolute inset-4 grid grid-cols-7 gap-1">
                                        {[...Array(49)].map((_, i) => (
                                            <div
                                                key={i}
                                                className={`rounded-sm transition-all duration-300 ${(i % 7 < 3 && i < 21) || // Top-left
                                                        (i % 7 >= 4 && i < 21) || // Top-right  
                                                        (i % 7 < 3 && i >= 28) // Bottom-left
                                                        ? 'bg-slate-900'
                                                        : Math.random() > 0.5 ? 'bg-slate-900' : 'bg-transparent'
                                                    }`}
                                                style={{ animationDelay: `${i * 20}ms` }}
                                            />
                                        ))}
                                    </div>
                                    {/* Corner squares */}
                                    <div className="absolute top-2 left-2 size-10 border-4 border-slate-900 rounded-lg">
                                        <div className="absolute inset-2 bg-slate-900 rounded-sm" />
                                    </div>
                                    <div className="absolute top-2 right-2 size-10 border-4 border-slate-900 rounded-lg">
                                        <div className="absolute inset-2 bg-slate-900 rounded-sm" />
                                    </div>
                                    <div className="absolute bottom-2 left-2 size-10 border-4 border-slate-900 rounded-lg">
                                        <div className="absolute inset-2 bg-slate-900 rounded-sm" />
                                    </div>
                                    {/* Center Logo Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="bg-white p-2 rounded-lg shadow-md border border-slate-100">
                                            <Icon name="qr_code_scanner" className="text-primary text-2xl" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Decorative glow behind QR */}
                            <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-0" />
                        </div>

                        {/* Amount & Order ID */}
                        <div className={`mt-8 text-center w-full transition-all duration-500 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                Total Pembayaran
                            </p>
                            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
                                {formatRupiah(amount)}
                            </h2>
                            <div className="inline-flex items-center justify-center gap-2 py-1.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 max-w-fit mx-auto cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group/copy">
                                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                    ID: #{orderId}
                                </span>
                                <Icon name="content_copy" className="text-[14px] text-gray-400 group-hover/copy:text-primary transition-colors" />
                            </div>
                        </div>

                        {/* Supported Apps */}
                        <div className={`w-full mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 transition-all duration-500 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}>
                            <p className="text-[10px] uppercase tracking-wider font-bold text-center text-gray-400 mb-4">
                                Didukung oleh QRIS
                            </p>
                            <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-400">
                                <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">GoPay</span>
                                <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">ShopeePay</span>
                                <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">OVO</span>
                                <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Dana</span>
                                <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">BCA</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className={`w-full flex flex-col gap-3 mt-8 transition-all duration-500 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}>
                            <button
                                onClick={handlePaymentConfirm}
                                disabled={isChecking || isExpired}
                                className="w-full group bg-primary hover:bg-[#c46a03] active:bg-[#b35f02] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-full transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                            >
                                {isChecking ? (
                                    <>
                                        <Icon name="progress_activity" className="animate-spin text-[20px]" />
                                        <span>Memeriksa Pembayaran...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Saya Sudah Bayar</span>
                                        <Icon name="arrow_forward" className="text-[20px] group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                            <Link
                                href="/checkout"
                                className="text-center text-sm font-semibold text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 py-2 transition-colors"
                            >
                                Batalkan Transaksi
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            {/* Helper Footer */}
            <div className="w-full p-4 text-center hidden lg:block">
                <p className="text-xs text-gray-400">
                    Butuh bantuan?{' '}
                    <span className="underline cursor-pointer hover:text-primary transition-colors">
                        Hubungi Customer Service
                    </span>
                </p>
            </div>
        </div>
    );
}

export default function PaymentPage() {
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
            <PaymentContent />
        </Suspense>
    );
}
