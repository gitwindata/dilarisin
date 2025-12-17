'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
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

function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short',
    }).format(date);
}

function SuccessContent() {
    const searchParams = useSearchParams();
    const amount = Number(searchParams.get('amount')) || 299000;
    const orderId = searchParams.get('orderId') || 'DT-2023-8842';
    const [isVisible, setIsVisible] = useState(false);

    // Fade in animation on mount
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 50);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-[#f8f7f5] dark:bg-[#231a0f] font-display overflow-hidden relative">
            {/* Confetti Animation */}
            <style jsx>{`
                @keyframes makeItRain {
                    from { opacity: 1; top: -10%; transform: rotate(0deg); }
                    to { opacity: 0; top: 100%; transform: rotate(960deg); }
                }
                .confetti-piece {
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    top: -10%;
                    opacity: 0;
                    z-index: 0;
                }
                .confetti-piece:nth-child(1) { left: 7%; background: #d57b04; transform: rotate(-40deg); animation: makeItRain 1000ms infinite ease-out; animation-delay: 1s; animation-duration: 1.1s; }
                .confetti-piece:nth-child(2) { left: 14%; background: #231a0f; transform: rotate(4deg); animation: makeItRain 1000ms infinite ease-out; animation-delay: 1s; animation-duration: 2.4s; }
                .confetti-piece:nth-child(3) { left: 23%; background: #d57b04; transform: rotate(-51deg); animation: makeItRain 1000ms infinite ease-out; animation-delay: 6s; animation-duration: 1.2s; }
                .confetti-piece:nth-child(4) { left: 33%; background: #231a0f; transform: rotate(61deg); animation: makeItRain 1000ms infinite ease-out; animation-delay: 0s; animation-duration: 1.4s; }
                .confetti-piece:nth-child(5) { left: 40%; background: #d57b04; transform: rotate(-52deg); animation: makeItRain 1000ms infinite ease-out; animation-delay: 4s; animation-duration: 1.6s; }
                .confetti-piece:nth-child(6) { left: 50%; background: #231a0f; transform: rotate(38deg); animation: makeItRain 1000ms infinite ease-out; animation-delay: 2s; animation-duration: 1.8s; }
                .confetti-piece:nth-child(7) { left: 60%; background: #d57b04; transform: rotate(11deg); animation: makeItRain 1000ms infinite ease-out; animation-delay: 1.5s; animation-duration: 2s; }
                .confetti-piece:nth-child(8) { left: 70%; background: #231a0f; transform: rotate(49deg); animation: makeItRain 1000ms infinite ease-out; animation-delay: 0.5s; animation-duration: 2.2s; }
                .confetti-piece:nth-child(9) { left: 80%; background: #d57b04; transform: rotate(-72deg); animation: makeItRain 1000ms infinite ease-out; animation-delay: 3s; animation-duration: 1.5s; }
                .confetti-piece:nth-child(10) { left: 90%; background: #231a0f; transform: rotate(10deg); animation: makeItRain 1000ms infinite ease-out; animation-delay: 2.5s; animation-duration: 1.7s; }
                
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0px); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }

                @keyframes scaleIn {
                    from { transform: scale(0); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-scale-in {
                    animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                }
            `}</style>

            {/* Confetti Container */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="confetti-piece" />
                <div className="confetti-piece" />
                <div className="confetti-piece" />
                <div className="confetti-piece" />
                <div className="confetti-piece" />
                <div className="confetti-piece" />
                <div className="confetti-piece" />
                <div className="confetti-piece" />
                <div className="confetti-piece" />
                <div className="confetti-piece" />
            </div>

            {/* Header with Progress */}
            <CheckoutHeader currentStep={3} showBackLink={false} />

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
                <div className={`w-full max-w-lg transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                    }`}>
                    {/* Success Icon & Heading */}
                    <div className="text-center mb-8">
                        <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/20 mb-6 transition-all duration-500 delay-200 ${isVisible ? 'animate-scale-in' : 'opacity-0 scale-0'
                            }`}>
                            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(213,123,4,0.4)]">
                                <Icon name="check" className="text-white text-4xl font-bold" />
                            </div>
                        </div>
                        <h1 className={`text-slate-900 dark:text-white text-4xl font-extrabold leading-tight tracking-tight mb-3 transition-all duration-500 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}>
                            Pembayaran Berhasil!
                        </h1>
                        <p className={`text-slate-500 dark:text-slate-400 text-lg font-medium leading-normal max-w-sm mx-auto transition-all duration-500 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}>
                            Terima kasih, langganan Anda sudah aktif. Anda sekarang memiliki akses penuh ke DataToko.
                        </p>
                    </div>

                    {/* Receipt Card */}
                    <div className={`bg-white dark:bg-[#2d1b1b] rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-500 delay-500 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                        }`}>
                        {/* Card Header Decoration */}
                        <div className="h-2 w-full bg-primary" />
                        <div className="p-8">
                            <div className="flex flex-col gap-5">
                                {/* Receipt Item 1 */}
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">ID Pesanan</span>
                                    <span className="text-slate-900 dark:text-white text-sm font-bold font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                                        #{orderId}
                                    </span>
                                </div>
                                {/* Receipt Item 2 */}
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Tanggal</span>
                                    <span className="text-slate-900 dark:text-white text-sm font-semibold text-right">
                                        {formatDate(new Date())}
                                    </span>
                                </div>
                                {/* Receipt Item 3 */}
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Metode</span>
                                    <div className="flex items-center gap-2">
                                        <Icon name="qr_code_2" className="text-slate-400 text-sm" />
                                        <span className="text-slate-900 dark:text-white text-sm font-semibold text-right">QRIS</span>
                                    </div>
                                </div>
                                {/* Divider */}
                                <div className="my-2 border-t-2 border-dashed border-slate-100 dark:border-slate-700 relative">
                                    {/* Cutout Circles decoration */}
                                    <div className="absolute -left-10 -top-3 w-6 h-6 rounded-full bg-[#f8f7f5] dark:bg-[#231a0f]" />
                                    <div className="absolute -right-10 -top-3 w-6 h-6 rounded-full bg-[#f8f7f5] dark:bg-[#231a0f]" />
                                </div>
                                {/* Total */}
                                <div className="flex justify-between items-end pt-1">
                                    <span className="text-slate-500 dark:text-slate-400 text-base font-medium pb-1">Total Dibayar</span>
                                    <span className="text-slate-900 dark:text-white text-3xl font-extrabold tracking-tight">
                                        {formatRupiah(amount)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className={`flex flex-col sm:flex-row gap-4 mt-8 w-full transition-all duration-500 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}>
                        <button className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-full border-2 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group text-slate-900 dark:text-white font-bold hover:-translate-y-0.5 active:translate-y-0">
                            <Icon name="download" className="group-hover:-translate-y-0.5 transition-transform" />
                            Download Receipt
                        </button>
                        <Link
                            href="/dashboard"
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-primary hover:bg-[#c46a03] text-white font-bold shadow-[0_4px_14px_rgba(213,123,4,0.4)] hover:shadow-[0_6px_20px_rgba(213,123,4,0.6)] hover:-translate-y-0.5 active:translate-y-0 transition-all"
                        >
                            Ke Dashboard
                            <Icon name="arrow_forward" />
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function PaymentSuccessPage() {
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
            <SuccessContent />
        </Suspense>
    );
}
