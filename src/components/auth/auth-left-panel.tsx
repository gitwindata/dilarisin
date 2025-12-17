import Link from 'next/link';
import { Icon } from '@/components/ui/icon';

const features = [
    'Analisis Kompetitor Real-time',
    'Optimasi Kata Kunci Produk',
    'Laporan Penjualan Harian',
];

export function AuthLeftPanel() {
    return (
        <div className="hidden lg:flex w-5/12 relative flex-col justify-between overflow-hidden bg-[#231a0f]">
            {/* Background Gradient & Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#3d2a1a] via-[#231a0f] to-primary/20 z-0" />
            <div
                className="absolute inset-0 opacity-5 z-0"
                style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}
            />

            {/* Header: Logo */}
            <div className="relative z-10 px-12 pt-12">
                <Link href="/" className="flex items-center gap-2 text-white">
                    <Icon name="analytics" className="text-4xl text-primary" />
                    <span className="text-2xl font-bold tracking-tight">Dilarisin</span>
                </Link>
            </div>

            {/* Center: Illustration */}
            <div className="relative z-10 flex-1 flex items-center justify-center px-12 py-8">
                <div className="w-full aspect-[4/3] rounded-[2rem] bg-gradient-to-br from-[#3d2a1a] to-[#231a0f] border border-primary/20 flex items-center justify-center">
                    <div className="text-center">
                        <Icon name="monitoring" className="text-8xl text-primary/60" />
                        <p className="text-white/40 mt-4 text-sm">Dilarisin Analytics</p>
                    </div>
                </div>
            </div>

            {/* Footer: Text Content */}
            <div className="relative z-10 px-12 pb-12">
                <h1 className="text-white text-4xl font-bold leading-tight mb-6 tracking-tight">
                    Unlock Shopee <br />
                    <span className="text-primary">Insights</span>
                </h1>
                <div className="space-y-4">
                    {features.map((feature) => (
                        <div key={feature} className="flex items-center gap-4">
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                                <Icon name="check" className="text-sm font-bold" />
                            </div>
                            <p className="text-gray-300 font-medium">{feature}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
