'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/icon';
import { AdminHeader } from '@/components/admin';

interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    plan: string;
    planStatus: 'active' | 'expired' | 'cancelled';
    devicesCount: number;
    maxDevices: number;
    joinedAt: Date;
    subscriptionEnd: Date | null;
}

// Mock users data
const mockUsers: User[] = [
    {
        id: '1',
        name: 'Budi Santoso',
        email: 'budi.santoso@gmail.com',
        phone: '+62 812 3456 7890',
        plan: 'Pro Yearly',
        planStatus: 'active',
        devicesCount: 2,
        maxDevices: 3,
        joinedAt: new Date('2024-01-15'),
        subscriptionEnd: new Date('2025-01-15'),
    },
    {
        id: '2',
        name: 'Siti Nurhaliza',
        email: 'siti.nurhaliza@gmail.com',
        phone: '+62 813 9876 5432',
        plan: 'Pro Monthly',
        planStatus: 'active',
        devicesCount: 1,
        maxDevices: 3,
        joinedAt: new Date('2024-06-20'),
        subscriptionEnd: new Date('2025-01-20'),
    },
    {
        id: '3',
        name: 'Andi Wijaya',
        email: 'andi.wijaya@yahoo.com',
        phone: '+62 857 1234 5678',
        plan: 'Pro Yearly',
        planStatus: 'expired',
        devicesCount: 0,
        maxDevices: 3,
        joinedAt: new Date('2023-03-10'),
        subscriptionEnd: new Date('2024-03-10'),
    },
    {
        id: '4',
        name: 'Dewi Kartika',
        email: 'dewi.kartika@outlook.com',
        phone: '+62 878 8765 4321',
        plan: 'Pro Biennial',
        planStatus: 'active',
        devicesCount: 3,
        maxDevices: 3,
        joinedAt: new Date('2024-02-28'),
        subscriptionEnd: new Date('2026-02-28'),
    },
    {
        id: '5',
        name: 'Rudi Hartono',
        email: 'rudi.hartono@gmail.com',
        phone: '+62 821 5555 6666',
        plan: 'Pro Monthly',
        planStatus: 'cancelled',
        devicesCount: 0,
        maxDevices: 3,
        joinedAt: new Date('2024-09-01'),
        subscriptionEnd: null,
    },
];

function formatDate(date: Date | null): string {
    if (!date) return '-';
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function UsersPage() {
    const [users] = useState<User[]>(mockUsers);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus === 'all' || user.planStatus === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const statusColors = {
        active: 'bg-green-100 text-green-700',
        expired: 'bg-red-100 text-red-700',
        cancelled: 'bg-gray-100 text-gray-700',
    };

    const statusLabels = {
        active: 'Aktif',
        expired: 'Expired',
        cancelled: 'Dibatalkan',
    };

    return (
        <>
            <AdminHeader title="Kelola Pengguna" description="Lihat dan kelola semua pengguna Dilarisin" />

            <div className="p-8 space-y-6">
                {/* Search & Filters */}
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    <div className="flex flex-1 items-center gap-4 w-full md:w-auto">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Icon
                                name="search"
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari nama atau email..."
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary bg-white"
                            />
                        </div>

                        {/* Filter */}
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary bg-white"
                        >
                            <option value="all">Semua Status</option>
                            <option value="active">Aktif</option>
                            <option value="expired">Expired</option>
                            <option value="cancelled">Dibatalkan</option>
                        </select>
                    </div>

                    <div className="text-sm text-slate-500">
                        Menampilkan <strong>{filteredUsers.length}</strong> dari {users.length} pengguna
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="text-left py-4 px-6 text-xs font-bold uppercase text-slate-400">
                                        Pengguna
                                    </th>
                                    <th className="text-left py-4 px-6 text-xs font-bold uppercase text-slate-400">
                                        Paket
                                    </th>
                                    <th className="text-center py-4 px-6 text-xs font-bold uppercase text-slate-400">
                                        Status
                                    </th>
                                    <th className="text-center py-4 px-6 text-xs font-bold uppercase text-slate-400">
                                        Devices
                                    </th>
                                    <th className="text-left py-4 px-6 text-xs font-bold uppercase text-slate-400">
                                        Bergabung
                                    </th>
                                    <th className="text-left py-4 px-6 text-xs font-bold uppercase text-slate-400">
                                        Berakhir
                                    </th>
                                    <th className="text-center py-4 px-6 text-xs font-bold uppercase text-slate-400">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="size-10 rounded-full bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center text-white font-bold">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-900">{user.name}</p>
                                                    <p className="text-sm text-slate-500">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-slate-900">{user.plan}</td>
                                        <td className="py-4 px-6 text-center">
                                            <span
                                                className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold ${statusColors[user.planStatus]}`}
                                            >
                                                {statusLabels[user.planStatus]}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            <span className="text-sm text-slate-900">
                                                {user.devicesCount}/{user.maxDevices}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-slate-500">{formatDate(user.joinedAt)}</td>
                                        <td className="py-4 px-6 text-sm text-slate-500">
                                            {formatDate(user.subscriptionEnd)}
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            <button
                                                onClick={() => setSelectedUser(user)}
                                                className="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors"
                                            >
                                                <Icon name="visibility" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Empty State */}
                    {filteredUsers.length === 0 && (
                        <div className="p-12 text-center">
                            <Icon name="person_off" className="text-4xl text-slate-300 mb-4" />
                            <p className="text-slate-500">Tidak ada pengguna yang ditemukan</p>
                        </div>
                    )}
                </div>
            </div>

            {/* User Detail Modal */}
            {selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setSelectedUser(null)}
                    />
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
                        {/* Header */}
                        <div className="p-6 border-b border-slate-100 flex items-start justify-between">
                            <div className="flex items-center gap-4">
                                <div className="size-16 rounded-full bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center text-white text-2xl font-bold">
                                    {selectedUser.name.charAt(0)}
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">{selectedUser.name}</h2>
                                    <p className="text-slate-500">{selectedUser.email}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedUser(null)}
                                className="p-2 rounded-full hover:bg-slate-100"
                            >
                                <Icon name="close" className="text-slate-400" />
                            </button>
                        </div>

                        {/* Details */}
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-4 rounded-xl">
                                    <p className="text-xs text-slate-400 uppercase font-bold">Status</p>
                                    <span
                                        className={`inline-flex mt-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${statusColors[selectedUser.planStatus]}`}
                                    >
                                        {statusLabels[selectedUser.planStatus]}
                                    </span>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-xl">
                                    <p className="text-xs text-slate-400 uppercase font-bold">Paket</p>
                                    <p className="text-slate-900 font-semibold mt-1">{selectedUser.plan}</p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-xl">
                                    <p className="text-xs text-slate-400 uppercase font-bold">Telepon</p>
                                    <p className="text-slate-900 font-semibold mt-1">{selectedUser.phone}</p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-xl">
                                    <p className="text-xs text-slate-400 uppercase font-bold">Devices</p>
                                    <p className="text-slate-900 font-semibold mt-1">
                                        {selectedUser.devicesCount}/{selectedUser.maxDevices}
                                    </p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-xl">
                                    <p className="text-xs text-slate-400 uppercase font-bold">Bergabung</p>
                                    <p className="text-slate-900 font-semibold mt-1">
                                        {formatDate(selectedUser.joinedAt)}
                                    </p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-xl">
                                    <p className="text-xs text-slate-400 uppercase font-bold">Berakhir</p>
                                    <p className="text-slate-900 font-semibold mt-1">
                                        {formatDate(selectedUser.subscriptionEnd)}
                                    </p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-4">
                                {selectedUser.planStatus === 'active' && (
                                    <button className="flex-1 py-3 px-4 rounded-full border border-red-200 text-red-600 font-semibold hover:bg-red-50 transition-colors">
                                        Suspend User
                                    </button>
                                )}
                                {selectedUser.planStatus !== 'active' && (
                                    <button className="flex-1 py-3 px-4 rounded-full border border-green-200 text-green-600 font-semibold hover:bg-green-50 transition-colors">
                                        Aktifkan Kembali
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
