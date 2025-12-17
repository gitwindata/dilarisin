'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface ProfileFormProps {
    initialData: {
        name: string;
        email: string;
        phone: string;
    };
    onSave: (data: { name: string; phone: string }) => void;
}

export function ProfileForm({ initialData, onSave }: ProfileFormProps) {
    const [name, setName] = useState(initialData.name);
    const [phone, setPhone] = useState(initialData.phone);
    const [isLoading, setIsLoading] = useState(false);
    const [saved, setSaved] = useState(false);

    const hasChanges = name !== initialData.name || phone !== initialData.phone;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!hasChanges) return;

        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        onSave({ name, phone });
        setIsLoading(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-900">Informasi Profil</h2>
                <p className="text-sm text-slate-500 mt-1">
                    Perbarui informasi profil dan data kontak Anda
                </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Avatar */}
                <div className="flex items-center gap-6">
                    <div className="size-20 rounded-full bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center text-white text-2xl font-bold">
                        {name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <button
                            type="button"
                            className="text-sm font-semibold text-primary hover:text-orange-600 transition-colors"
                        >
                            Ubah Foto
                        </button>
                        <p className="text-xs text-slate-400 mt-1">JPG, PNG. Maks 2MB</p>
                    </div>
                </div>

                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Nama Lengkap</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-slate-900"
                    />
                </div>

                {/* Email (Read-only) */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email
                        <span className="ml-2 text-xs text-slate-400 font-normal">(tidak dapat diubah)</span>
                    </label>
                    <div className="relative">
                        <input
                            type="email"
                            value={initialData.email}
                            disabled
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
                        />
                        <Icon
                            name="lock"
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                    </div>
                </div>

                {/* Phone */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Nomor HP</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="08xxxxxxxxxx"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-slate-900"
                    />
                </div>

                {/* Submit */}
                <div className="flex items-center gap-4 pt-2">
                    <Button type="submit" disabled={!hasChanges || isLoading}>
                        {isLoading ? (
                            <>
                                <Icon name="progress_activity" className="animate-spin" />
                                Menyimpan...
                            </>
                        ) : saved ? (
                            <>
                                <Icon name="check" />
                                Tersimpan!
                            </>
                        ) : (
                            <>
                                <Icon name="save" />
                                Simpan Perubahan
                            </>
                        )}
                    </Button>
                    {hasChanges && !isLoading && (
                        <span className="text-sm text-slate-500">Ada perubahan yang belum disimpan</span>
                    )}
                </div>
            </form>
        </section>
    );
}
