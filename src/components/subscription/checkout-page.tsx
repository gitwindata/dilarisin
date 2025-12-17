'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { SUBSCRIPTION_PRICES } from '@/db/schema';
import { CheckoutHeader } from './checkout-header';

type BillingCycle = 'monthly' | 'yearly' | 'biennial';

const planDetails: Record<BillingCycle, { label: string; duration: string; durationMonths: number }> = {
    monthly: { label: 'Bulanan', duration: '1 Bulan', durationMonths: 1 },
    yearly: { label: 'Tahunan', duration: '12 Bulan', durationMonths: 12 },
    biennial: { label: '2 Tahun', duration: '24 Bulan', durationMonths: 24 },
};

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
        month: 'long',
        year: 'numeric',
    }).format(date);
}

function CheckoutContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { status } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [promoCode, setPromoCode] = useState('');
    const [promoLoading, setPromoLoading] = useState(false);
    const [promoError, setPromoError] = useState('');
    const [appliedPromo, setAppliedPromo] = useState<{
        code: string;
        discountType: 'percent' | 'fixed';
        discountValue: number;
    } | null>(null);

    const planParam = searchParams.get('plan') as BillingCycle | null;
    const plan = planParam && planDetails[planParam] ? planParam : 'yearly';
    const price = SUBSCRIPTION_PRICES[plan];
    const details = planDetails[plan];

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + details.durationMonths);

    // Calculate discount
    const discountAmount = appliedPromo
        ? appliedPromo.discountType === 'percent'
            ? Math.round((price * appliedPromo.discountValue) / 100)
            : appliedPromo.discountValue
        : 0;
    const finalPrice = price - discountAmount;

    // Mock promo codes for testing
    const mockPromoCodes: Record<string, { discountType: 'percent' | 'fixed'; discountValue: number }> = {
        'HEMAT25': { discountType: 'percent', discountValue: 25 },
        'HEMAT50K': { discountType: 'fixed', discountValue: 50000 },
        'DATATOKO10': { discountType: 'percent', discountValue: 10 },
    };

    const handleApplyPromo = async () => {
        if (!promoCode.trim()) return;

        setPromoLoading(true);
        setPromoError('');

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        const code = promoCode.toUpperCase().trim();
        const promo = mockPromoCodes[code];

        if (promo) {
            setAppliedPromo({ code, ...promo });
            setPromoError('');
        } else {
            setPromoError('Kode promo tidak valid atau sudah kadaluarsa');
            setAppliedPromo(null);
        }

        setPromoLoading(false);
    };

    const handleRemovePromo = () => {
        setAppliedPromo(null);
        setPromoCode('');
        setPromoError('');
    };

    // TODO: Re-enable auth check after testing
    // useEffect(() => {
    //     if (status === 'unauthenticated') {
    //         router.push(`/login?callbackUrl=/checkout?plan=${plan}`);
    //     }
    // }, [status, router, plan]);


    const handlePayment = async () => {
        setIsLoading(true);
        setError('');

        try {
            // Generate a mock order ID for demo
            const orderId = `DT-${Date.now().toString().slice(-6)}`;

            // Redirect to QRIS payment page with amount and order ID
            router.push(`/checkout/payment?amount=${finalPrice}&orderId=${orderId}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
            setIsLoading(false);
        }
    };

    // TODO: Re-enable loading check after testing
    // if (status === 'loading') {
    //     return (
    //         <div className="min-h-screen flex items-center justify-center bg-[#f8f7f5] dark:bg-[#231a0f]">
    //             <div className="animate-spin">
    //                 <Icon name="progress_activity" className="text-4xl text-primary" />
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <div className="min-h-screen flex flex-col bg-[#f8f7f5] dark:bg-[#231a0f]">
            <CheckoutHeader currentStep={2} />

            <main className="flex-1 w-full px-4 py-8 lg:px-10 lg:py-12">
                <div className="max-w-6xl mx-auto">
                    {/* Page Title */}
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
                            Checkout
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            Review pesanan dan lanjutkan pembayaran
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Left Column: Order Summary */}
                        <div className="lg:col-span-5 flex flex-col gap-6">
                            <div className="bg-white dark:bg-[#1e1e1e] rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
                                <div className="flex items-start justify-between mb-6">
                                    <div>
                                        <h3 className="text-xl font-bold dark:text-white">Ringkasan Pesanan</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                            Review detail paket Anda
                                        </p>
                                    </div>
                                    <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                        {details.label}
                                    </div>
                                </div>

                                {/* Plan Card */}
                                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#231a0f] to-[#3d2a1a] p-5 text-white mb-6">
                                    <div className="relative z-10 flex items-center gap-4">
                                        <div className="flex items-center justify-center size-12 rounded-lg bg-white/10 backdrop-blur-sm">
                                            <Icon name="monitoring" className="text-white" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-lg">Dilarisin Pro</p>
                                            <p className="text-white/70 text-sm">Full Access</p>
                                        </div>
                                    </div>
                                    <div className="absolute -right-4 -bottom-4 opacity-10">
                                        <Icon name="analytics" className="text-[100px]" />
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="space-y-4 border-b border-dashed border-gray-200 dark:border-gray-700 pb-6 mb-6">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">Durasi</span>
                                        <span className="font-medium dark:text-gray-200">{details.duration}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">Mulai</span>
                                        <span className="font-medium dark:text-gray-200">{formatDate(startDate)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">Berakhir</span>
                                        <span className="font-medium dark:text-gray-200">{formatDate(endDate)}</span>
                                    </div>
                                </div>

                                {/* Promo Code Input */}
                                <div className="mb-6">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                        Punya Kode Promo?
                                    </label>
                                    {appliedPromo ? (
                                        <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                                            <div className="flex items-center gap-2">
                                                <Icon name="check_circle" className="text-green-600" />
                                                <span className="font-mono font-bold text-green-700 dark:text-green-400">
                                                    {appliedPromo.code}
                                                </span>
                                                <span className="text-sm text-green-600 dark:text-green-400">
                                                    (-{appliedPromo.discountType === 'percent'
                                                        ? `${appliedPromo.discountValue}%`
                                                        : formatRupiah(appliedPromo.discountValue)})
                                                </span>
                                            </div>
                                            <button
                                                onClick={handleRemovePromo}
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <Icon name="close" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={promoCode}
                                                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                                                placeholder="Masukkan kode promo"
                                                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-slate-900 dark:text-white font-mono uppercase focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                            />
                                            <button
                                                onClick={handleApplyPromo}
                                                disabled={promoLoading || !promoCode.trim()}
                                                className="px-4 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-sm hover:bg-slate-800 dark:hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                            >
                                                {promoLoading ? (
                                                    <Icon name="progress_activity" className="animate-spin" />
                                                ) : (
                                                    'Terapkan'
                                                )}
                                            </button>
                                        </div>
                                    )}
                                    {promoError && (
                                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                            <Icon name="error" className="text-base" />
                                            {promoError}
                                        </p>
                                    )}
                                </div>

                                {/* Price Summary */}
                                <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                                        <span className="font-medium dark:text-gray-200">{formatRupiah(price)}</span>
                                    </div>
                                    {appliedPromo && (
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-green-600">Diskon ({appliedPromo.code})</span>
                                            <span className="font-medium text-green-600">-{formatRupiah(discountAmount)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-end pt-3 border-t border-dashed border-gray-200 dark:border-gray-700">
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Pembayaran</p>
                                            <p className="text-3xl font-black text-primary tracking-tight">
                                                {formatRupiah(finalPrice)}
                                            </p>
                                        </div>
                                        {appliedPromo && (
                                            <span className="text-sm text-gray-400 line-through">
                                                {formatRupiah(price)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Testimonial */}
                            <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10">
                                <div className="flex gap-1 text-primary mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <Icon key={i} name="star" className="text-sm" filled />
                                    ))}
                                </div>
                                <p className="text-sm font-medium italic text-gray-700 dark:text-gray-300 mb-4">
                                    &quot;Dilarisin helped me increase my Shopee sales by 40% in just two months. The insights
                                    are incredible.&quot;
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-full bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center text-white font-bold text-sm">
                                        S
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-900 dark:text-white">Sarah M.</p>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-wide">Top Seller</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Payment Method */}
                        <div className="lg:col-span-7 flex flex-col gap-6">
                            <div className="bg-white dark:bg-[#1e1e1e] rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800">
                                <h3 className="text-xl font-bold dark:text-white mb-6">Metode Pembayaran</h3>

                                {/* QRIS Option */}
                                <div className="rounded-xl border-2 border-primary bg-primary/5 p-5">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-12 w-16 items-center justify-center rounded-lg bg-white p-2 shadow-sm">
                                                <span className="text-xs font-bold text-slate-700">QRIS</span>
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 dark:text-white">Bayar dengan QRIS</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Scan & bayar instan, tanpa biaya tambahan
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex size-6 items-center justify-center rounded-full border-2 border-primary bg-primary">
                                            <div className="size-2.5 rounded-full bg-white" />
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center gap-3 border-t border-primary/10 pt-4">
                                        <span className="text-xs font-medium text-gray-500 mr-2">Supported:</span>
                                        <div className="flex gap-2 text-xs text-gray-400">
                                            <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">GoPay</span>
                                            <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">ShopeePay</span>
                                            <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">OVO</span>
                                            <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">Dana</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <div className="mt-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
                                        <Icon name="error" className="text-lg" />
                                        {error}
                                    </div>
                                )}

                                {/* CTA */}
                                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-800">
                                    <Button
                                        onClick={handlePayment}
                                        disabled={isLoading}
                                        size="lg"
                                        className="w-full h-14 text-base shadow-lg shadow-primary/30"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Icon name="progress_activity" className="animate-spin" />
                                                Memproses...
                                            </>
                                        ) : (
                                            <>
                                                Bayar Sekarang
                                                <span className="bg-white/20 text-white text-sm py-1 px-2 rounded-md font-medium ml-2">
                                                    {formatRupiah(finalPrice)}
                                                </span>
                                            </>
                                        )}
                                    </Button>
                                    <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-4 text-xs text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <Icon name="lock" className="text-base" />
                                            <span>
                                                Secured by <strong>Midtrans</strong>
                                            </span>
                                        </div>
                                        <div className="hidden md:block w-1 h-1 bg-gray-300 rounded-full" />
                                        <div className="flex items-center gap-2">
                                            <Icon name="encrypted" className="text-base" />
                                            <span>256-bit SSL Encryption</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export function CheckoutPage() {
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
            <CheckoutContent />
        </Suspense>
    );
}
