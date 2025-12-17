'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface ProfileSectionProps {
    user: {
        name: string;
        username: string;
        email: string;
        phone: string;
        isVerified: boolean;
    };
    onSave: (data: { name: string; username: string; email: string; phone: string }) => void;
}

export function ProfileSection({ user, onSave }: ProfileSectionProps) {
    const [name, setName] = useState(user.name);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        onSave({ name, username, email, phone });
        setIsLoading(false);
    };

    return (
        <section className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-6 mb-6 gap-4">
                <h2 className="text-slate-900 text-xl font-bold">Profil Saya</h2>
                {user.isVerified && (
                    <span className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                        Akun Terverifikasi
                    </span>
                )}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                {/* Photo & Basic Info */}
                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="relative group cursor-pointer">
                        <div className="h-28 w-28 rounded-full bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center text-white text-4xl font-bold border-4 border-white shadow-md">
                            {name.charAt(0).toUpperCase()}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Icon name="photo_camera" className="text-white text-2xl" />
                        </div>
                    </div>
                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left flex-1">
                        <h3 className="text-xl font-bold text-slate-900">{name}</h3>
                        <p className="text-gray-500 mb-4">{email}</p>
                        <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-bold text-slate-900 hover:bg-gray-50 hover:border-gray-300 transition-colors"
                        >
                            <Icon name="upload" className="text-lg" />
                            Ubah Foto
                        </button>
                    </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-slate-900">Nama Lengkap</span>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-full border border-gray-200 bg-gray-50 px-5 py-3 text-slate-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 font-medium transition-all"
                        />
                    </label>
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-slate-900">Username</span>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full rounded-full border border-gray-200 bg-gray-50 px-5 py-3 text-slate-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 font-medium transition-all"
                        />
                    </label>
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-slate-900">Email</span>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-full border border-gray-200 bg-gray-50 px-5 py-3 text-slate-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 font-medium transition-all"
                        />
                    </label>
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-slate-900">No. Telepon</span>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full rounded-full border border-gray-200 bg-gray-50 px-5 py-3 text-slate-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 font-medium transition-all"
                        />
                    </label>
                </div>

                <div className="flex justify-end pt-2">
                    <Button type="submit" disabled={isLoading} size="lg">
                        {isLoading ? (
                            <>
                                <Icon name="progress_activity" className="animate-spin" />
                                Menyimpan...
                            </>
                        ) : (
                            'Simpan Perubahan'
                        )}
                    </Button>
                </div>
            </form>
        </section>
    );
}
