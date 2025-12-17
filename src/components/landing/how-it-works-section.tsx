import { Icon } from '@/components/ui/icon';

const steps = [
    {
        icon: 'extension',
        title: '1. Instal Ekstensi',
        description: 'Tambahkan Dilarisin ke browser Chrome atau Edge Anda dalam satu klik.',
    },
    {
        icon: 'shopping_cart',
        title: '2. Buka Shopee',
        description: 'Kunjungi halaman produk atau pencarian Shopee. Dilarisin akan aktif otomatis.',
    },
    {
        icon: 'insights',
        title: '3. Dapatkan Insight',
        description: 'Lihat data penjualan, keyword, dan kompetitor langsung di layar Anda.',
    },
];

export function HowItWorksSection() {
    return (
        <section
            id="how-it-works"
            className="py-20 bg-slate-50 dark:bg-[#231a0f] relative border-y border-slate-200 dark:border-slate-800"
        >
            <div className="container mx-auto px-4 sm:px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
                        Cara Kerja Dilarisin
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        Hanya butuh 3 langkah mudah untuk mulai mendapatkan insight.
                    </p>
                </div>

                {/* Steps */}
                <div className="relative max-w-5xl mx-auto">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-200 dark:bg-slate-700 -translate-y-1/2 z-0" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                        {steps.map((step) => (
                            <StepCard key={step.title} {...step} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

interface StepCardProps {
    icon: string;
    title: string;
    description: string;
}

function StepCard({ icon, title, description }: StepCardProps) {
    return (
        <div className="flex flex-col items-center text-center">
            {/* Icon Circle */}
            <div className="w-20 h-20 rounded-full bg-white dark:bg-slate-800 border-4 border-primary text-primary flex items-center justify-center shadow-lg mb-6">
                <Icon name={icon} className="text-4xl" />
            </div>

            {/* Content Card */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 w-full">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">{description}</p>
            </div>
        </div>
    );
}
