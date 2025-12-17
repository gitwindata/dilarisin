'use client';

import { useState } from 'react';
import {
    ProfileSection,
    SecuritySection,
    NotificationsSection,
    LoginSessionsSection,
} from '@/components/dashboard/settings';

// Mock user data
const mockUser = {
    name: 'Budi Santoso',
    username: '@budisantoso_store',
    email: 'budi.santoso@datatoko.com',
    phone: '+62 812 3456 7890',
    isVerified: true,
};

// Mock sessions data
const initialSessions = [
    {
        id: '1',
        device: 'Chrome pada Windows',
        icon: 'laptop_mac',
        location: 'Jakarta, Indonesia',
        lastActive: 'Sedang Aktif',
        isCurrentDevice: true,
    },
    {
        id: '2',
        device: 'iPhone 13 Pro',
        icon: 'smartphone',
        location: 'Bandung, Indonesia',
        lastActive: '2 jam yang lalu',
        isCurrentDevice: false,
    },
    {
        id: '3',
        device: 'iPad Air',
        icon: 'tablet_mac',
        location: 'Surabaya, Indonesia',
        lastActive: '1 hari yang lalu',
        isCurrentDevice: false,
    },
];

export default function SettingsPage() {
    const [user, setUser] = useState(mockUser);
    const [sessions, setSessions] = useState(initialSessions);

    const handleProfileSave = (data: {
        name: string;
        username: string;
        email: string;
        phone: string;
    }) => {
        setUser((prev) => ({ ...prev, ...data }));
    };

    const handleLogoutSession = (id: string) => {
        setSessions((prev) => prev.filter((s) => s.id !== id));
    };

    const handleLogoutAll = () => {
        setSessions((prev) => prev.filter((s) => s.isCurrentDevice));
    };

    return (
        <div className="flex flex-col gap-8">
            {/* Page Heading */}
            <div className="flex flex-col gap-2">
                <h1 className="text-slate-900 text-3xl md:text-4xl font-extrabold tracking-tight">
                    Pengaturan Akun
                </h1>
                <p className="text-gray-500 text-base md:text-lg">
                    Kelola preferensi akun, notifikasi, dan keamanan toko Anda.
                </p>
            </div>

            {/* Profile Section */}
            <ProfileSection user={user} onSave={handleProfileSave} />

            {/* Security & Notifications - 2 Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <SecuritySection />
                <NotificationsSection />
            </div>

            {/* Login Sessions */}
            <LoginSessionsSection
                sessions={sessions}
                onLogoutSession={handleLogoutSession}
                onLogoutAll={handleLogoutAll}
            />
        </div>
    );
}
