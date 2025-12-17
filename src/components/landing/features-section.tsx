import { Icon } from '@/components/ui/icon';

const features = [
    {
        icon: 'search',
        title: 'Riset Kata Kunci',
        description: 'Temukan kata kunci dengan volume pencarian tinggi dan kompetisi rendah untuk judul produk Anda.',
        color: 'blue',
    },
    {
        icon: 'policy',
        title: 'Pelacak Kompetitor',
        description: 'Intip strategi harga, perubahan stok, dan promosi yang dilakukan pesaing Anda secara real-time.',
        color: 'red',
    },
    {
        icon: 'bar_chart',
        title: 'Estimasi Penjualan',
        description: 'Prediksi volume penjualan produk apapun untuk validasi ide produk baru sebelum stok barang.',
        color: 'green',
    },
    {
        icon: 'calculate',
        title: 'Kalkulator Profit',
        description: 'Hitung margin keuntungan bersih setelah potongan biaya admin Shopee dan biaya iklan.',
        color: 'purple',
    },
    {
        icon: 'trending_up',
        title: 'Analisis Tren',
        description: 'Lihat tren pasar yang sedang naik daun sebelum kompetitor lain menyadarinya.',
        color: 'orange',
    },
    {
        icon: 'download',
        title: 'Ekspor Data CSV',
        description: 'Unduh semua data ke format Excel atau CSV untuk analisis lebih lanjut dengan tim Anda.',
        color: 'teal',
    },
];

const colorClasses: Record<string, { bg: string; text: string; darkBg: string; darkText: string }> = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600', darkBg: 'dark:bg-blue-900/30', darkText: 'dark:text-blue-400' },
    red: { bg: 'bg-red-100', text: 'text-red-600', darkBg: 'dark:bg-red-900/30', darkText: 'dark:text-red-400' },
    green: { bg: 'bg-green-100', text: 'text-green-600', darkBg: 'dark:bg-green-900/30', darkText: 'dark:text-green-400' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600', darkBg: 'dark:bg-purple-900/30', darkText: 'dark:text-purple-400' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-600', darkBg: 'dark:bg-orange-900/30', darkText: 'dark:text-orange-400' },
    teal: { bg: 'bg-teal-100', text: 'text-teal-600', darkBg: 'dark:bg-teal-900/30', darkText: 'dark:text-teal-400' },
};

export function FeaturesSection() {
    return (
        <section id="features" className="py-20 bg-white dark:bg-[#2d1b1b]">
            <div className="container mx-auto px-4 sm:px-6">
                {/* Section Header */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
                        Fitur Unggulan
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        Semua alat yang Anda butuhkan untuk mendominasi pasar Shopee ada di sini,
                        dirancang untuk pertumbuhan eksponensial.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature) => (
                        <FeatureCard key={feature.title} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
}

interface FeatureCardProps {
    icon: string;
    title: string;
    description: string;
    color: string;
}

function FeatureCard({ icon, title, description, color }: FeatureCardProps) {
    const colors = colorClasses[color] || colorClasses.blue;

    return (
        <div className="group p-8 rounded-2xl bg-[#f8f7f5] dark:bg-[#231a0f] border border-slate-100 dark:border-slate-800 hover:border-primary/30 dark:hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5">
            <div
                className={`w-14 h-14 rounded-full ${colors.bg} ${colors.darkBg} ${colors.text} ${colors.darkText} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
            >
                <Icon name={icon} className="text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {title}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {description}
            </p>
        </div>
    );
}
