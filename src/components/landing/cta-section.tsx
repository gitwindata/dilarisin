import { Button } from '@/components/ui/button';

export function CTASection() {
    return (
        <section className="py-24 bg-primary text-white relative overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                    <defs>
                        <pattern
                            id="grid"
                            width="40"
                            height="40"
                            patternUnits="userSpaceOnUse"
                        >
                            <path
                                d="M 40 0 L 0 0 0 40"
                                fill="none"
                                stroke="white"
                                strokeWidth="1"
                            />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
                <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
                    Siap Dominasi Pasar Shopee?
                </h2>
                <p className="text-xl text-orange-100 mb-10 max-w-2xl mx-auto">
                    Bergabunglah dengan ribuan seller sukses lainnya. Coba gratis sekarang,
                    tanpa kartu kredit.
                </p>
                <Button
                    variant="secondary"
                    size="lg"
                    className="bg-white text-primary hover:bg-slate-100 shadow-2xl transform hover:scale-105"
                >
                    Mulai Uji Coba Gratis
                </Button>
                <p className="mt-6 text-sm text-orange-200 opacity-80">
                    14 hari trial full fitur • Batalkan kapan saja
                </p>
            </div>
        </section>
    );
}
