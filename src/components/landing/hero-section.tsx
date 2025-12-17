'use client';

import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

export function HeroSection() {
    return (
        <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
                <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/50 text-primary text-sm font-bold animate-fade-in-up">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        Versi 2.0 Kini Tersedia
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-slate-900 dark:text-white">
                        Optimalkan Penjualan Shopee dengan Data{' '}
                        <span className="text-primary relative whitespace-nowrap">
                            Real-Time
                            <svg
                                className="absolute w-full h-3 -bottom-1 left-0 text-primary/20 -z-10"
                                viewBox="0 0 100 10"
                                preserveAspectRatio="none"
                            >
                                <path
                                    d="M0 5 Q 50 10 100 5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                />
                            </svg>
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                        Insight kompetitor, analisis tren, dan riset kata kunci dalam satu klik
                        dengan ekstensi browser nomor 1 untuk Seller.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-4">
                        <Button size="lg" className="shadow-xl shadow-primary/30 hover:shadow-primary/50 transform hover:-translate-y-1">
                            <span>Mulai Gratis Sekarang</span>
                            <Icon name="arrow_forward" className="text-lg" />
                        </Button>
                        <Button variant="outline" size="lg">
                            <Icon name="play_circle" className="text-lg" />
                            <span>Lihat Demo</span>
                        </Button>
                    </div>

                    {/* Browser Mockup */}
                    <BrowserMockup />

                    {/* Trust Logos */}
                    <TrustLogos />
                </div>
            </div>
        </section>
    );
}

function BrowserMockup() {
    return (
        <div className="mt-16 w-full max-w-5xl relative group">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-orange-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />

            {/* Browser window */}
            <div className="relative rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-2xl overflow-hidden">
                {/* Browser header */}
                <div className="h-8 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                    <div className="ml-4 flex-1 bg-white dark:bg-slate-800 h-5 rounded-md text-xs text-slate-400 flex items-center px-2 max-w-sm">
                        shopee.co.id/dashboard
                    </div>
                </div>

                {/* Browser content */}
                <div className="aspect-[16/9] w-full bg-slate-50 dark:bg-slate-900 relative">
                    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
                        <div className="text-slate-400 text-lg">Dashboard Preview</div>
                    </div>

                    {/* Floating stat card - top right */}
                    <div className="absolute top-10 right-10 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 animate-bounce max-w-[200px]">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                                <Icon name="trending_up" />
                            </div>
                            <div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">Penjualan Harian</div>
                                <div className="font-bold text-slate-900 dark:text-white">+125%</div>
                            </div>
                        </div>
                    </div>

                    {/* Floating stat card - bottom left */}
                    <div className="absolute bottom-10 left-10 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 max-w-[240px]">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                <Icon name="visibility" />
                            </div>
                            <div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">Keyword &quot;Sepatu Pria&quot;</div>
                                <div className="font-bold text-slate-900 dark:text-white">Vol: 45.000/bln</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TrustLogos() {
    const logos = [
        { icon: 'storefront', name: 'FashionStore' },
        { icon: 'checkroom', name: 'BajuKeren' },
        { icon: 'devices', name: 'GadgetPro' },
        { icon: 'diamond', name: 'JewelBox' },
        { icon: 'home', name: 'HomeLiving' },
    ];

    return (
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 w-full">
            <p className="text-sm font-medium text-slate-500 mb-6">
                Dipercaya oleh 5,000+ Seller Shopee di Indonesia
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                {logos.map((logo) => (
                    <span
                        key={logo.name}
                        className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1"
                    >
                        <Icon name={logo.icon} />
                        {logo.name}
                    </span>
                ))}
            </div>
        </div>
    );
}
