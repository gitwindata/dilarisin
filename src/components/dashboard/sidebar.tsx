'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';

const navItems = [
    { href: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { href: '/dashboard/subscription', icon: 'credit_card', label: 'Langganan' },
    { href: '/dashboard/devices', icon: 'devices', label: 'Perangkat' },
    { href: '/dashboard/settings', icon: 'settings', label: 'Pengaturan' },
];

export function DashboardSidebar() {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <aside
            className={cn(
                'bg-[#1A352B] h-full flex flex-col justify-between flex-shrink-0 transition-all duration-300',
                isCollapsed ? 'w-20' : 'w-72'
            )}
        >
            <div>
                {/* Logo */}
                <div className="h-20 flex items-center px-6 border-b border-white/10">
                    <Link href="/dashboard" className="flex items-center gap-3">
                        <div className="size-8 rounded-lg bg-white flex items-center justify-center text-primary">
                            <Icon name="monitoring" className="text-xl" />
                        </div>
                        {!isCollapsed && (
                            <div className="flex flex-col">
                                <span className="text-white text-lg font-bold leading-none tracking-tight">
                                    Dilarisin
                                </span>
                                <span className="text-white/50 text-xs mt-1 font-medium">Seller Insights</span>
                            </div>
                        )}
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-1 p-4">
                    {navItems.map((item) => {
                        const isActive =
                            item.href === '/dashboard'
                                ? pathname === '/dashboard'
                                : pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'flex items-center gap-3 px-4 py-3 rounded-full transition-colors',
                                    isActive
                                        ? 'bg-white/10 text-primary'
                                        : 'text-white/70 hover:bg-white/5 hover:text-primary'
                                )}
                            >
                                <Icon name={item.icon} className={isActive ? 'text-primary' : ''} />
                                {!isCollapsed && (
                                    <span className={cn('text-sm', isActive ? 'font-semibold' : 'font-medium')}>
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
                <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="flex items-center gap-3 px-4 py-3 rounded-full text-white/70 hover:bg-red-500/10 hover:text-red-400 transition-colors w-full"
                >
                    <Icon name="logout" />
                    {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
                </button>

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
