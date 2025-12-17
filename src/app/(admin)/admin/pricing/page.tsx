'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { AdminHeader } from '@/components/admin';

interface PricingPlan {
    id: string;
    name: string;
    duration: number; // months
    durationLabel: string;
    basePrice: number;
    discountPercent: number;
    finalPrice: number;
    pricePerMonth: number;
    features: string[];
    isPopular: boolean;
    isActive: boolean;
}

// Mock data
const initialPlans: PricingPlan[] = [
    {
        id: '1',
        name: 'Dilarisin Pro',
        duration: 1,
        durationLabel: 'Bulanan',
        basePrice: 99000,
        discountPercent: 0,
        finalPrice: 99000,
        pricePerMonth: 99000,
        features: [
            'Riset Kata Kunci Unlimited',
            'Pelacak Kompetitor',
            'Estimasi Penjualan',
            'Export Data CSV',
            'Maksimal 3 Device',
        ],
        isPopular: false,
        isActive: true,
    },
    {
        id: '2',
        name: 'Dilarisin Pro',
        duration: 12,
        durationLabel: 'Tahunan',
        basePrice: 99000 * 12,
        discountPercent: 33,
        finalPrice: 799000,
        pricePerMonth: Math.round(799000 / 12),
        features: [
            'Riset Kata Kunci Unlimited',
            'Pelacak Kompetitor',
            'Estimasi Penjualan',
            'Export Data CSV',
            'Maksimal 3 Device',
            'Support Prioritas',
        ],
        isPopular: true,
        isActive: true,
    },
    {
        id: '3',
        name: 'Dilarisin Pro',
        duration: 24,
        durationLabel: '2 Tahun',
        basePrice: 99000 * 24,
        discountPercent: 50,
        finalPrice: 1199000,
        pricePerMonth: Math.round(1199000 / 24),
        features: [
            'Riset Kata Kunci Unlimited',
            'Pelacak Kompetitor',
            'Estimasi Penjualan',
            'Export Data CSV',
            'Maksimal 3 Device',
            'Support Prioritas',
            'Akses Fitur Beta',
        ],
        isPopular: false,
        isActive: true,
    },
];

function formatRupiah(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
}

export default function PricingPlansPage() {
    const [plans, setPlans] = useState<PricingPlan[]>(initialPlans);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editPrice, setEditPrice] = useState<number>(0);

    const handleToggleActive = (id: string) => {
        setPlans((prev) =>
            prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
        );
    };

    const handleEditPrice = (id: string, currentPrice: number) => {
        setEditingId(id);
        setEditPrice(currentPrice);
    };

    const handleSavePrice = (id: string) => {
        setPlans((prev) =>
            prev.map((p) => {
                if (p.id === id) {
                    const newPricePerMonth = Math.round(editPrice / p.duration);
                    return {
                        ...p,
                        finalPrice: editPrice,
                        pricePerMonth: newPricePerMonth,
                        discountPercent: Math.round((1 - editPrice / p.basePrice) * 100),
                    };
                }
                return p;
            })
        );
        setEditingId(null);
    };

    return (
        <>
            <AdminHeader
                title="Kelola Pricing Plans"
                description="Atur harga dan fitur paket langganan"
            />

            <div className="p-8 space-y-8">
                {/* Info Card */}
                <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                    <div className="flex items-start gap-4">
                        <div className="size-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
                            <Icon name="info" className="text-2xl" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 mb-1">Tentang Pricing Plans</h3>
                            <p className="text-sm text-slate-600">
                                Pricing plans menentukan harga yang terlihat di halaman langganan. Perubahan harga
                                hanya berlaku untuk langganan baru, tidak mempengaruhi langganan yang sudah aktif.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Plans Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all ${plan.isActive ? 'border-slate-100' : 'border-red-200 opacity-60'
                                } ${plan.isPopular ? 'ring-2 ring-primary' : ''}`}
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-slate-100">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-lg font-bold text-slate-900">{plan.durationLabel}</h3>
                                            {plan.isPopular && (
                                                <span className="px-2 py-0.5 bg-primary text-slate-900 text-xs font-bold rounded-full">
                                                    Popular
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-slate-500 mt-1">{plan.duration} bulan</p>
                                    </div>
                                    <button
                                        onClick={() => handleToggleActive(plan.id)}
                                        className={`text-xs font-bold px-3 py-1.5 rounded-full transition-colors ${plan.isActive
                                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                                            }`}
                                    >
                                        {plan.isActive ? 'Aktif' : 'Nonaktif'}
                                    </button>
                                </div>

                                {/* Price */}
                                {editingId === plan.id ? (
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="number"
                                            value={editPrice}
                                            onChange={(e) => setEditPrice(Number(e.target.value))}
                                            className="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary text-lg font-bold"
                                        />
                                        <button
                                            onClick={() => handleSavePrice(plan.id)}
                                            className="p-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200"
                                        >
                                            <Icon name="check" />
                                        </button>
                                        <button
                                            onClick={() => setEditingId(null)}
                                            className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
                                        >
                                            <Icon name="close" />
                                        </button>
                                    </div>
                                ) : (
                                    <div
                                        className="flex items-baseline gap-2 cursor-pointer group"
                                        onClick={() => handleEditPrice(plan.id, plan.finalPrice)}
                                    >
                                        <span className="text-3xl font-extrabold text-slate-900">
                                            {formatRupiah(plan.finalPrice)}
                                        </span>
                                        <Icon
                                            name="edit"
                                            className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                        />
                                    </div>
                                )}

                                <div className="flex items-center gap-3 mt-2 text-sm">
                                    <span className="text-slate-500">
                                        {formatRupiah(plan.pricePerMonth)}/bulan
                                    </span>
                                    {plan.discountPercent > 0 && (
                                        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                                            Hemat {plan.discountPercent}%
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Features */}
                            <div className="p-6">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                                    Fitur Termasuk
                                </h4>
                                <ul className="space-y-2">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                                            <Icon name="check_circle" className="text-green-500 text-lg" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
