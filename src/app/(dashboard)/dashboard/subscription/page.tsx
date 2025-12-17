import { CurrentPlanCard, BillingHistoryTable } from '@/components/dashboard';

// Mock data - in production, fetch from database
const mockPlan = {
    planName: 'Dilarisin Pro',
    status: 'active' as const,
    price: 799000,
    billingCycle: 'yearly' as const,
    renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    features: [
        'Riset Kata Kunci Unlimited',
        'Pelacak Kompetitor',
        'Estimasi Penjualan',
        'Export Data CSV',
        'Maksimal 3 Device',
        'Support Prioritas',
    ],
};

const mockInvoices = [
    {
        id: 'INV-2024-0012',
        date: new Date('2024-12-01'),
        planName: 'Dilarisin Pro',
        amount: 799000,
        status: 'paid' as const,
    },
    {
        id: 'INV-2024-0008',
        date: new Date('2024-11-01'),
        planName: 'Dilarisin Pro',
        amount: 799000,
        status: 'paid' as const,
    },
    {
        id: 'INV-2024-0004',
        date: new Date('2024-10-01'),
        planName: 'Basic Plan',
        amount: 99000,
        status: 'archived' as const,
    },
];

export default function SubscriptionManagementPage() {
    return (
        <div className="flex flex-col gap-10">
            {/* Page Heading */}
            <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                        Langganan Saya
                    </h1>
                    <p className="text-slate-500 max-w-xl">
                        Kelola status paket aktif, metode pembayaran, dan riwayat tagihan toko Anda di satu
                        tempat.
                    </p>
                </div>
            </section>

            {/* Current Plan Card */}
            <CurrentPlanCard {...mockPlan} />

            {/* Billing History */}
            <BillingHistoryTable invoices={mockInvoices} totalCount={12} />
        </div>
    );
}
