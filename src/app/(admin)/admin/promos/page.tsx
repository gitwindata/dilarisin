'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { AdminHeader } from '@/components/admin';

interface PromoCode {
    id: string;
    code: string;
    discountType: 'percent' | 'fixed';
    discountValue: number;
    validFrom: Date;
    validUntil: Date;
    maxUses: number;
    currentUses: number;
    isActive: boolean;
}

// Mock data
const initialPromos: PromoCode[] = [
    {
        id: '1',
        code: 'TAHUNBARU25',
        discountType: 'percent',
        discountValue: 25,
        validFrom: new Date('2024-01-01'),
        validUntil: new Date('2024-01-31'),
        maxUses: 100,
        currentUses: 45,
        isActive: true,
    },
    {
        id: '2',
        code: 'HEMAT50K',
        discountType: 'fixed',
        discountValue: 50000,
        validFrom: new Date('2024-12-01'),
        validUntil: new Date('2024-12-31'),
        maxUses: 50,
        currentUses: 12,
        isActive: true,
    },
    {
        id: '3',
        code: 'DATATOKO10',
        discountType: 'percent',
        discountValue: 10,
        validFrom: new Date('2024-06-01'),
        validUntil: new Date('2024-06-30'),
        maxUses: 200,
        currentUses: 200,
        isActive: false,
    },
];

function formatRupiah(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
}

function formatDate(date: Date): string {
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function PromoCodesPage() {
    const [promos, setPromos] = useState<PromoCode[]>(initialPromos);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newPromo, setNewPromo] = useState({
        code: '',
        discountType: 'percent' as 'percent' | 'fixed',
        discountValue: 0,
        maxUses: 100,
    });

    const handleToggleActive = (id: string) => {
        setPromos((prev) => prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p)));
    };

    const handleDelete = (id: string) => {
        setPromos((prev) => prev.filter((p) => p.id !== id));
    };

    const handleAddPromo = () => {
        const promo: PromoCode = {
            id: Date.now().toString(),
            code: newPromo.code.toUpperCase(),
            discountType: newPromo.discountType,
            discountValue: newPromo.discountValue,
            validFrom: new Date(),
            validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
            maxUses: newPromo.maxUses,
            currentUses: 0,
            isActive: true,
        };
        setPromos((prev) => [promo, ...prev]);
        setShowAddModal(false);
        setNewPromo({ code: '', discountType: 'percent', discountValue: 0, maxUses: 100 });
    };

    return (
        <>
            <AdminHeader title="Kelola Promo Codes" description="Buat dan atur kode promo untuk diskon" />

            <div className="p-8 space-y-8">
                {/* Header with Add Button */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-500">
                            Total: <strong>{promos.length}</strong> kode promo
                        </span>
                        <span className="text-sm text-slate-500">
                            Aktif: <strong>{promos.filter((p) => p.isActive).length}</strong>
                        </span>
                    </div>
                    <Button onClick={() => setShowAddModal(true)}>
                        <Icon name="add" />
                        Buat Promo Baru
                    </Button>
                </div>

                {/* Promo Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {promos.map((promo) => (
                        <div
                            key={promo.id}
                            className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all ${promo.isActive ? 'border-slate-100' : 'border-red-200 opacity-60'
                                }`}
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-slate-100 bg-slate-50">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-xl font-bold font-mono text-slate-900">{promo.code}</h3>
                                        <p className="text-2xl font-extrabold text-primary mt-2">
                                            {promo.discountType === 'percent'
                                                ? `${promo.discountValue}%`
                                                : formatRupiah(promo.discountValue)}
                                            <span className="text-sm font-normal text-slate-500 ml-2">OFF</span>
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleToggleActive(promo.id)}
                                        className={`text-xs font-bold px-3 py-1.5 rounded-full transition-colors ${promo.isActive
                                                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                : 'bg-red-100 text-red-700 hover:bg-red-200'
                                            }`}
                                    >
                                        {promo.isActive ? 'Aktif' : 'Nonaktif'}
                                    </button>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="p-6 space-y-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-500">Periode</span>
                                    <span className="text-slate-900 font-medium">
                                        {formatDate(promo.validFrom)} - {formatDate(promo.validUntil)}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-500">Penggunaan</span>
                                    <span className="text-slate-900 font-medium">
                                        {promo.currentUses} / {promo.maxUses}
                                    </span>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all ${promo.currentUses >= promo.maxUses ? 'bg-red-500' : 'bg-primary'
                                            }`}
                                        style={{ width: `${Math.min((promo.currentUses / promo.maxUses) * 100, 100)}%` }}
                                    />
                                </div>

                                {promo.currentUses >= promo.maxUses && (
                                    <p className="text-xs text-red-500 font-medium">Kuota habis</p>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-2">
                                <button
                                    onClick={() => handleDelete(promo.id)}
                                    className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                >
                                    <Icon name="delete" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add Promo Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
                        <div className="p-6 border-b border-slate-100">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-slate-900">Buat Promo Baru</h2>
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="p-2 rounded-full hover:bg-slate-100"
                                >
                                    <Icon name="close" className="text-slate-400" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Code */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Kode Promo</label>
                                <input
                                    type="text"
                                    value={newPromo.code}
                                    onChange={(e) => setNewPromo({ ...newPromo, code: e.target.value.toUpperCase() })}
                                    placeholder="Contoh: HEMAT50"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary font-mono uppercase"
                                />
                            </div>

                            {/* Discount Type */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Jenis Diskon</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            checked={newPromo.discountType === 'percent'}
                                            onChange={() => setNewPromo({ ...newPromo, discountType: 'percent' })}
                                            className="text-primary focus:ring-primary"
                                        />
                                        <span className="text-sm">Persentase (%)</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            checked={newPromo.discountType === 'fixed'}
                                            onChange={() => setNewPromo({ ...newPromo, discountType: 'fixed' })}
                                            className="text-primary focus:ring-primary"
                                        />
                                        <span className="text-sm">Nominal (Rp)</span>
                                    </label>
                                </div>
                            </div>

                            {/* Discount Value */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    {newPromo.discountType === 'percent' ? 'Persentase Diskon' : 'Nominal Diskon (Rp)'}
                                </label>
                                <input
                                    type="number"
                                    value={newPromo.discountValue}
                                    onChange={(e) => setNewPromo({ ...newPromo, discountValue: Number(e.target.value) })}
                                    placeholder={newPromo.discountType === 'percent' ? '25' : '50000'}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary"
                                />
                            </div>

                            {/* Max Uses */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Maksimal Penggunaan
                                </label>
                                <input
                                    type="number"
                                    value={newPromo.maxUses}
                                    onChange={(e) => setNewPromo({ ...newPromo, maxUses: Number(e.target.value) })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary"
                                />
                            </div>
                        </div>

                        <div className="p-6 border-t border-slate-100 flex gap-3">
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="flex-1 py-3 px-4 rounded-full border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50"
                            >
                                Batal
                            </button>
                            <Button
                                onClick={handleAddPromo}
                                disabled={!newPromo.code || newPromo.discountValue <= 0}
                                className="flex-1"
                            >
                                Buat Promo
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
