// import { auth } from '@/lib/auth';
import { Icon } from '@/components/ui/icon';
import {
    SubscriptionCard,
    DeviceCard,
    StatCard,
    ActivityTable,
} from '@/components/dashboard';

// Mock data - in production, fetch from database
const mockActivities = [
    {
        time: '10:42 AM',
        activity: 'Analisis Produk',
        icon: 'analytics',
        user: 'Chrome Windows',
        status: 'success' as const,
    },
    {
        time: '09:15 AM',
        activity: 'Login Extension',
        icon: 'login',
        user: 'Chrome Mac',
        status: 'success' as const,
    },
    {
        time: 'Kemarin',
        activity: 'Riset Keyword',
        icon: 'search',
        user: 'Edge Windows',
        status: 'success' as const,
    },
    {
        time: 'Kemarin',
        activity: 'Pelacak Kompetitor',
        icon: 'visibility',
        user: 'Chrome Windows',
        status: 'success' as const,
    },
];

export default async function DashboardPage() {
    // TODO: Re-enable auth when database is set up
    // const session = await auth();
    // const userName = session?.user?.name?.split(' ')[0] || 'User';
    const userName = 'Budi'; // Mock user for testing

    // Mock subscription data - in production, fetch from database
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);

    const subscription = {
        planName: 'Paket Pro',
        status: 'active' as const,
        endDate,
        daysRemaining: 30,
    };

    const today = new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        <>
            {/* Welcome Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-1">
                        Selamat datang, {userName}! 👋
                    </h2>
                    <p className="text-gray-500 text-sm font-medium">
                        Berikut adalah ringkasan aktivitas tokomu hari ini.
                    </p>
                </div>
                <div className="bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm flex items-center gap-2 text-sm text-gray-600 font-medium">
                    <Icon name="calendar_today" className="text-lg" />
                    <span>{today}</span>
                </div>
            </div>

            {/* Subscription & Device Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <SubscriptionCard {...subscription} />
                <DeviceCard activeDevices={2} maxDevices={3} />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    icon="devices"
                    label="Device Aktif"
                    value="2"
                    iconBg="bg-blue-50"
                    iconColor="text-blue-600"
                />
                <StatCard
                    icon="bolt"
                    label="Analisis Hari Ini"
                    value="156"
                    iconBg="bg-slate-900"
                    iconColor="text-white"
                />
                <StatCard
                    icon="trending_up"
                    label="Produk Dilacak"
                    value="48"
                    iconBg="bg-primary/10"
                    iconColor="text-primary"
                />
            </div>

            {/* Recent Activity */}
            <ActivityTable activities={mockActivities} />
        </>
    );
}
