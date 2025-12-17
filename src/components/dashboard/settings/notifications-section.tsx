'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/icon';

interface NotificationSetting {
    id: string;
    title: string;
    description: string;
    defaultEnabled: boolean;
}

const notificationSettings: NotificationSetting[] = [
    {
        id: 'weekly_report',
        title: 'Laporan Mingguan',
        description: 'Terima ringkasan performa toko setiap Senin.',
        defaultEnabled: true,
    },
    {
        id: 'realtime_sales',
        title: 'Notifikasi Penjualan Real-time',
        description: 'Dapatkan email saat ada pesanan baru masuk.',
        defaultEnabled: true,
    },
    {
        id: 'promo_info',
        title: 'Info Promo & Fitur Baru',
        description: 'Berita terbaru tentang platform Dilarisin.',
        defaultEnabled: false,
    },
    {
        id: 'low_stock',
        title: 'Peringatan Stok Menipis',
        description: 'Notifikasi jika stok produk di bawah 10 unit.',
        defaultEnabled: true,
    },
];

export function NotificationsSection() {
    const [settings, setSettings] = useState<Record<string, boolean>>(
        notificationSettings.reduce(
            (acc, s) => ({ ...acc, [s.id]: s.defaultEnabled }),
            {}
        )
    );

    const toggleSetting = (id: string) => {
        setSettings((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <section className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 flex flex-col h-full">
            <div className="border-b border-gray-100 pb-4 mb-6">
                <h2 className="text-slate-900 text-xl font-bold flex items-center gap-2">
                    <Icon name="notifications" className="text-gray-400" />
                    Notifikasi
                </h2>
            </div>

            <div className="flex flex-col gap-6">
                {notificationSettings.map((setting) => (
                    <div key={setting.id} className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="font-bold text-slate-900 text-sm">{setting.title}</span>
                            <span className="text-xs text-gray-500 mt-1">{setting.description}</span>
                        </div>
                        {/* Toggle Switch */}
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings[setting.id]}
                                onChange={() => toggleSetting(setting.id)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                        </label>
                    </div>
                ))}
            </div>
        </section>
    );
}
