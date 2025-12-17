'use client';

import { Icon } from '@/components/ui/icon';

interface DashboardHeaderProps {
    userName?: string;
}

export function DashboardHeader({ userName = 'User' }: DashboardHeaderProps) {
    return (
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 flex-shrink-0 z-20">
            {/* Search Bar */}
            <div className="flex-1 max-w-lg">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Icon
                            name="search"
                            className="text-gray-400 group-focus-within:text-primary transition-colors"
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Cari data toko, transaksi, atau produk..."
                        className="block w-full pl-11 pr-4 py-2.5 bg-gray-50 border-transparent text-gray-900 placeholder-gray-400 text-sm rounded-full focus:ring-2 focus:ring-primary/20 focus:bg-white focus:border-primary/30 transition-all shadow-sm"
                    />
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-6 ml-6">
                {/* Notifications */}
                <button className="relative p-2 text-gray-500 hover:bg-gray-50 rounded-full transition-colors">
                    <Icon name="notifications" />
                    <span className="absolute top-2 right-2 size-2.5 bg-primary rounded-full border-2 border-white" />
                </button>

                {/* User Menu */}
                <div className="flex items-center gap-3 pl-6 border-l border-gray-100 cursor-pointer">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-bold text-slate-900">{userName}</p>
                        <p className="text-xs text-gray-500">Seller</p>
                    </div>
                    <div className="size-10 rounded-full bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center text-white font-bold ring-2 ring-white shadow-sm">
                        {userName.charAt(0).toUpperCase()}
                    </div>
                    <Icon name="expand_more" className="text-gray-400" />
                </div>
            </div>
        </header>
    );
}
