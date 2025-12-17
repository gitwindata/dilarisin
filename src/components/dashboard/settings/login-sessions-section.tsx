'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/icon';

interface Session {
    id: string;
    device: string;
    icon: string;
    location: string;
    lastActive: string;
    isCurrentDevice: boolean;
}

interface LoginSessionsSectionProps {
    sessions: Session[];
    onLogoutSession: (id: string) => void;
    onLogoutAll: () => void;
}

export function LoginSessionsSection({
    sessions,
    onLogoutSession,
    onLogoutAll,
}: LoginSessionsSectionProps) {
    const [loggingOutId, setLoggingOutId] = useState<string | null>(null);

    const handleLogout = async (id: string) => {
        setLoggingOutId(id);
        await new Promise((resolve) => setTimeout(resolve, 500));
        onLogoutSession(id);
        setLoggingOutId(null);
    };

    const getIconBgColor = (icon: string) => {
        switch (icon) {
            case 'laptop_mac':
                return 'bg-blue-100 text-blue-600';
            case 'smartphone':
                return 'bg-gray-100 text-gray-600';
            case 'tablet_mac':
                return 'bg-gray-100 text-gray-600';
            default:
                return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <section className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
            <div className="border-b border-gray-100 pb-4 mb-6">
                <h2 className="text-slate-900 text-xl font-bold flex items-center gap-2">
                    <Icon name="devices" className="text-gray-400" />
                    Sesi Login Aktif
                </h2>
            </div>

            <div className="flex flex-col gap-4">
                {sessions.map((session) => (
                    <div
                        key={session.id}
                        className={`flex items-center justify-between p-4 rounded-xl transition-colors ${session.isCurrentDevice
                                ? 'bg-gray-50 border border-gray-100'
                                : 'bg-white border border-gray-100 hover:border-gray-200'
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            <div
                                className={`flex h-10 w-10 items-center justify-center rounded-full ${session.isCurrentDevice ? 'bg-blue-100 text-blue-600' : getIconBgColor(session.icon)
                                    }`}
                            >
                                <Icon name={session.icon} />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-slate-900 text-sm">{session.device}</span>
                                <span className="text-xs text-gray-500">
                                    {session.location} • {session.lastActive}
                                </span>
                            </div>
                        </div>

                        {session.isCurrentDevice ? (
                            <div className="text-xs font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                                Perangkat Ini
                            </div>
                        ) : (
                            <button
                                onClick={() => handleLogout(session.id)}
                                disabled={loggingOutId === session.id}
                                className="text-xs font-bold text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-full transition-colors border border-transparent hover:border-red-100 disabled:opacity-50"
                            >
                                {loggingOutId === session.id ? 'Keluar...' : 'Keluar'}
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* Logout All */}
            <div className="flex justify-center pt-8">
                <button
                    onClick={onLogoutAll}
                    className="text-gray-400 hover:text-red-500 text-sm font-semibold flex items-center gap-2 transition-colors"
                >
                    <Icon name="logout" className="text-lg" />
                    Keluar dari Semua Sesi
                </button>
            </div>
        </section>
    );
}
