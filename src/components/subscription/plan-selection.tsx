'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { SUBSCRIPTION_PRICES } from '@/db/schema';
import { CheckoutHeader } from './checkout-header';

type BillingCycle = 'monthly' | 'yearly' | 'biennial';

const plans: Record<BillingCycle, { price: number; label: string; savings?: string }> = {
    monthly: {
        price: SUBSCRIPTION_PRICES.monthly,
        label: 'Bulanan',
    },
    yearly: {
        price: SUBSCRIPTION_PRICES.yearly,
        label: 'Tahunan',
        savings: 'Hemat 33%',
    },
    biennial: {
        price: SUBSCRIPTION_PRICES.biennial,
        label: '2 Tahun',
        savings: 'Hemat 45%',
    },
};

const features = [
    'Riset Kata Kunci Unlimited',
    'Pelacak Kompetitor',
    'Estimasi Penjualan',
    'Kalkulator Profit',
    'Analisis Tren',
    'Ekspor Data CSV',
    'Maksimal 3 Device',
    'Support Prioritas',
];

function formatRupiah(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

export function PlanSelectionPage() {
    const router = useRouter();
    const [selectedPlan, setSelectedPlan] = useState<BillingCycle>('yearly');
    const [isAnimating, setIsAnimating] = useState(false);
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
    const tabsRef = useRef<HTMLDivElement>(null);
    const buttonRefs = useRef<Map<BillingCycle, HTMLButtonElement>>(new Map());

    // Update indicator position when selected plan changes
    useEffect(() => {
        const updateIndicator = () => {
            const button = buttonRefs.current.get(selectedPlan);
            const container = tabsRef.current;
            if (button && container) {
                const containerRect = container.getBoundingClientRect();
                const buttonRect = button.getBoundingClientRect();
                setIndicatorStyle({
                    left: buttonRect.left - containerRect.left,
                    width: buttonRect.width,
                });
            }
        };

        updateIndicator();
        window.addEventListener('resize', updateIndicator);
        return () => window.removeEventListener('resize', updateIndicator);
    }, [selectedPlan]);

    const handlePlanChange = (cycle: BillingCycle) => {
        if (cycle === selectedPlan) return;
        setIsAnimating(true);
        setSelectedPlan(cycle);
        // Reset animation state after animation completes
        setTimeout(() => setIsAnimating(false), 300);
    };

    const handleContinue = () => {
        router.push(`/checkout?plan=${selectedPlan}`);
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#f8f7f5] dark:bg-[#231a0f]">
            <CheckoutHeader currentStep={1} />

            <main className="flex-1 flex flex-col items-center py-10 px-6 sm:px-12 md:px-20 lg:px-40">
                <div className="w-full max-w-4xl flex flex-col gap-8">
                    {/* Page Heading */}
                    <div className="flex flex-col items-center text-center gap-4 animate-fade-in-up">
                        <h1 className="text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight">
                            Pilih Paket Langganan Anda
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-lg font-normal max-w-2xl">
                            Tingkatkan penjualan Shopee Anda dengan insight data yang lebih dalam.
                        </p>
                    </div>

                    {/* Billing Cycle Toggle with Sliding Indicator */}
                    <div className="flex justify-center w-full">
                        <div
                            ref={tabsRef}
                            className="relative flex p-1 bg-white dark:bg-[#2d1b1b] rounded-full border border-slate-200 dark:border-slate-700 shadow-sm"
                        >
                            {/* Sliding Indicator */}
                            <div
                                className="absolute top-1 h-[calc(100%-8px)] bg-primary rounded-full shadow-md transition-all duration-300 ease-out"
                                style={{
                                    left: `${indicatorStyle.left}px`,
                                    width: `${indicatorStyle.width}px`,
                                }}
                            />

                            {(Object.keys(plans) as BillingCycle[]).map((cycle) => (
                                <button
                                    key={cycle}
                                    ref={(el) => {
                                        if (el) buttonRefs.current.set(cycle, el);
                                    }}
                                    onClick={() => handlePlanChange(cycle)}
                                    className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${selectedPlan === cycle
                                            ? 'text-white'
                                            : 'text-slate-500 hover:text-primary'
                                        }`}
                                >
                                    {plans[cycle].label}
                                    {plans[cycle].savings && (
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase transition-all duration-300 ${selectedPlan === cycle
                                                ? 'bg-white/20 text-white'
                                                : 'bg-green-100 text-green-700'
                                            }`}>
                                            {plans[cycle].savings}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Single Plan Card with Content Animation */}
                    <div className="bg-white dark:bg-[#1e1e1e] rounded-3xl p-8 shadow-xl border-2 border-primary overflow-hidden">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
                            <div>
                                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full mb-3">
                                    <Icon name="verified" className="text-sm" />
                                    PAKET FULL AKSES
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                    Dilarisin Pro
                                </h2>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                                    Akses semua fitur analitik untuk dominasi pasar Shopee
                                </p>
                            </div>
                            {/* Price with animation */}
                            <div className="text-right">
                                <div
                                    key={selectedPlan}
                                    className={`flex items-baseline gap-1 transition-all duration-300 ${isAnimating
                                            ? 'opacity-0 translate-y-2'
                                            : 'opacity-100 translate-y-0'
                                        }`}
                                >
                                    <span className="text-4xl font-black text-slate-900 dark:text-white">
                                        {formatRupiah(plans[selectedPlan].price)}
                                    </span>
                                    <span className="text-slate-500 text-sm">/{plans[selectedPlan].label.toLowerCase()}</span>
                                </div>
                                <div
                                    className={`transition-all duration-300 ${isAnimating
                                            ? 'opacity-0 translate-y-2'
                                            : 'opacity-100 translate-y-0'
                                        }`}
                                >
                                    {selectedPlan !== 'monthly' && (
                                        <p className="text-green-600 text-sm font-medium mt-1">
                                            {plans[selectedPlan].savings}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            {features.map((feature, index) => (
                                <div
                                    key={feature}
                                    className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300"
                                    style={{
                                        animationDelay: `${index * 50}ms`,
                                    }}
                                >
                                    <Icon name="check_circle" className="text-primary text-xl" filled />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <Button
                            onClick={handleContinue}
                            size="lg"
                            className="w-full h-14 text-base shadow-lg shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-transform"
                        >
                            Lanjutkan Pembayaran
                            <Icon name="arrow_forward" className="text-lg" />
                        </Button>
                    </div>

                    {/* Trust Badges */}
                    <div className="flex items-center justify-center gap-6 text-xs text-gray-400">
                        <div className="flex items-center gap-2">
                            <Icon name="lock" className="text-base" />
                            <span>Pembayaran Aman</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Icon name="replay" className="text-base" />
                            <span>7 Hari Garansi Uang Kembali</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Icon name="support_agent" className="text-base" />
                            <span>Support WhatsApp</span>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-6 text-center text-slate-400 text-sm border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e1e1e]">
                <p>© {new Date().getFullYear()} Dilarisin. All rights reserved.</p>
            </footer>
        </div>
    );
}
