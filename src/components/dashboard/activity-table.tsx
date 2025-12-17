import { Icon } from '@/components/ui/icon';

interface Activity {
    time: string;
    activity: string;
    icon: string;
    user: string;
    status: 'success' | 'failed' | 'pending';
}

interface ActivityTableProps {
    activities: Activity[];
}

export function ActivityTable({ activities }: ActivityTableProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-bold text-lg text-slate-900">Aktivitas Terbaru</h3>
                <button className="text-primary text-sm font-bold hover:underline">Lihat Semua</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50">
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                Waktu
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                Aktivitas
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                Device
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {activities.map((activity, index) => (
                            <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4 text-sm text-gray-500">{activity.time}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                            <Icon name={activity.icon} className="text-lg" />
                                        </div>
                                        <span className="text-sm font-medium text-slate-900">{activity.activity}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">{activity.user}</td>
                                <td className="px-6 py-4 text-right">
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${activity.status === 'success'
                                                ? 'bg-primary/10 text-primary'
                                                : activity.status === 'failed'
                                                    ? 'bg-red-100 text-red-800'
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}
                                    >
                                        {activity.status === 'success'
                                            ? 'Sukses'
                                            : activity.status === 'failed'
                                                ? 'Gagal'
                                                : 'Pending'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
