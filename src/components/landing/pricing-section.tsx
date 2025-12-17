import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const plans = [
    {
        name: 'Bulanan',
        price: 'Rp 99rb',
        period: '/bulan',
        features: [
            'Riset Kata Kunci Unlimited',
            'Pelacak 5 Kompetitor',
            'Support Email Standard',
        ],
        recommended: false,
        badge: null,
    },
    {
        name: 'Tahunan',
        price: 'Rp 899rb',
        period: '/tahun',
        features: [
            'Semua Fitur Bulanan',
            'Pelacak 20 Kompetitor',
            'Prioritas Support WhatsApp',
            'Akses Beta Fitur Baru',
        ],
        recommended: true,
        badge: 'RECOMMENDED',
        savings: 'Hemat Rp 289rb per tahun',
    },
    {
        name: '2 Tahun',
        price: 'Rp 1.4jt',
        period: '/2 tahun',
        features: [
            'Semua Fitur Tahunan',
            'Pelacak 50 Kompetitor',
            '1x Sesi Konsultasi Bisnis',
            'Grup Komunitas Eksklusif',
        ],
        recommended: false,
        badge: 'SUPER HEMAT',
    },
];

export function PricingSection() {
    return (
        <section id="pricing" className="py-20 bg-white dark:bg-[#2d1b1b]">
            <div className="container mx-auto px-4 sm:px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
                        Pilih Paket yang Sesuai
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        Investasi kecil untuk keuntungan maksimal.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
                    {plans.map((plan) => (
                        <PricingCard key={plan.name} {...plan} />
                    ))}
                </div>
            </div>
        </section>
    );
}

interface PricingCardProps {
    name: string;
    price: string;
    period: string;
    features: string[];
    recommended: boolean;
    badge?: string | null;
    savings?: string;
}

function PricingCard({
    name,
    price,
    period,
    features,
    recommended,
    badge,
    savings,
}: PricingCardProps) {
    return (
        <div
            className={`rounded-2xl p-8 bg-white dark:bg-[#231a0f] transition-all relative ${recommended
                    ? 'border-2 border-primary shadow-2xl transform md:-translate-y-4'
                    : 'border border-slate-200 dark:border-slate-700 hover:shadow-xl'
                }`}
        >
            {/* Badge */}
            {badge && recommended && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold tracking-wide">
                    {badge}
                </div>
            )}

            {/* Plan Name */}
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                {name}
            </h3>

            {/* Price */}
            <div className="flex items-baseline mb-6">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                    {price}
                </span>
                <span className="text-slate-500 dark:text-slate-400 ml-2">{period}</span>
            </div>

            {/* Savings badge */}
            {savings && (
                <p className="text-green-600 text-sm font-semibold mb-6 bg-green-50 dark:bg-green-900/20 py-1 px-3 rounded-lg w-fit">
                    {savings}
                </p>
            )}

            {/* Non-recommended badge */}
            {badge && !recommended && (
                <p className="text-primary text-sm font-semibold mb-6 bg-orange-50 dark:bg-orange-900/20 py-1 px-3 rounded-lg w-fit">
                    {badge}
                </p>
            )}

            {/* CTA Button */}
            <Button
                variant={recommended ? 'primary' : 'secondary'}
                className={`w-full mb-8 ${recommended ? 'shadow-lg shadow-primary/25' : ''}`}
            >
                Pilih Paket
            </Button>

            {/* Features List */}
            <ul className="space-y-4">
                {features.map((feature) => (
                    <li
                        key={feature}
                        className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300"
                    >
                        <Icon name="check" className="text-primary text-xl" />
                        {feature}
                    </li>
                ))}
            </ul>
        </div>
    );
}
