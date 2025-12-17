'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';

const navItems = [
    { href: '/admin', icon: 'dashboard', label: 'Dashboard' },
    { href: '/admin/pricing', icon: 'sell', label: 'Paket Harga' },
    { href: '/admin/promos', icon: 'confirmation_number', label: 'Kode Promo' },
    { href: '/admin/users', icon: 'group', label: 'Pengguna' },
    { href: '/admin/payments', icon: 'payments', label: 'Pembayaran' },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <aside
            className={cn(
                'bg-slate-900 h-full flex flex-col justify-between flex-shrink-0 transition-all duration-300',
                isCollapsed ? 'w-20' : 'w-72'
            )}
        >
            <div>
                {/* Logo */}
                <div className="h-20 flex items-center px-6 border-b border-white/10">
                    <Link href="/admin" className="flex items-center gap-3">
                        <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-slate-900">
                            <Icon name="admin_panel_settings" className="text-xl" />
                        </div>
                        {!isCollapsed && (
                            <div className="flex flex-col">
                                <span className="text-white text-lg font-bold leading-none tracking-tight">
                                    Dilarisin
                                </span>
                                <span className="text-primary text-xs mt-1 font-medium">Admin Panel</span>
                            </div>
                        )}
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-1 p-4">
                    {navItems.map((item) => {
                        const isActive =
                            item.href === '/admin'
                                ? pathname === '/admin'
                                : pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'flex items-center gap-3 px-4 py-3 rounded-xl transition-colors',
                                    isActive
                                        ? 'bg-primary text-slate-900'
                                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                                )}
                            >
                                <Icon name={item.icon} className={isActive ? 'text-slate-900' : ''} />
                                {!isCollapsed && (
                                    <span className={cn('text-sm', isActive ? 'font-bold' : 'font-medium')}>
                                        {item.label}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Bottom Section */}
            <div className="p-4 border-t border-white/10">
                {/* Back to User Dashboard */}
                <Link
                    href="/dashboard"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:bg-white/5 hover:text-white transition-colors w-full"
                >
                    <Icon name="arrow_back" />
                    {!isCollapsed && <span className="text-sm font-medium">Kembali ke Dashboard</span>}
                </Link>

                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="flex items-center justify-center w-full h-8 mt-2 text-white/30 hover:text-white transition-colors"
                >
                    <Icon name={isCollapsed ? 'keyboard_double_arrow_right' : 'keyboard_double_arrow_left'} />
                </button>
            </div>
        </aside>
    );
}
