import { Icon } from '@/components/ui/icon';

const testimonials = [
    {
        content:
            'Sejak pakai Dilarisin, saya bisa tau keyword apa yang lagi naik. Omzet naik 300% dalam sebulan karena optimasi judul produk yang tepat.',
        name: 'Budi Santoso',
        role: 'Star Seller • Fashion Pria',
        avatar: '/testimonials/avatar-1.jpg',
    },
    {
        content:
            'Fitur pelacak kompetitornya gila sih. Bisa tau kapan mereka nurunin harga, jadi kita bisa counter strategi mereka dengan cepat. Recommended!',
        name: 'Siti Aminah',
        role: 'Mall Seller • Kosmetik',
        avatar: '/testimonials/avatar-2.jpg',
    },
    {
        content:
            'Awalnya ragu, tapi fitur estimasi penjualannya akurat banget. Bantu banget buat riset produk baru sebelum import barang banyak.',
        name: 'Hendra Wijaya',
        role: 'Star+ Seller • Elektronik',
        avatar: '/testimonials/avatar-3.jpg',
    },
];

export function TestimonialsSection() {
    return (
        <section
            id="testimonials"
            className="py-20 bg-slate-50 dark:bg-[#231a0f] border-t border-slate-200 dark:border-slate-800"
        >
            <div className="container mx-auto px-4 sm:px-6">
                {/* Section Header */}
                <h2 className="text-3xl md:text-4xl font-extrabold text-center text-slate-900 dark:text-white mb-16">
                    Dipercaya Ribuan Seller
                </h2>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <TestimonialCard key={testimonial.name} {...testimonial} />
                    ))}
                </div>
            </div>
        </section>
    );
}

interface TestimonialCardProps {
    content: string;
    name: string;
    role: string;
    avatar: string;
}

function TestimonialCard({ content, name, role }: TestimonialCardProps) {
    return (
        <div className="bg-white dark:bg-[#2d1b1b] p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
            {/* Stars */}
            <div className="flex gap-1 text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="star" filled className="text-xl" />
                ))}
            </div>

            {/* Content */}
            <p className="text-slate-600 dark:text-slate-300 mb-6 italic">
                &quot;{content}&quot;
            </p>

            {/* Author */}
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center text-white font-bold">
                    {name.charAt(0)}
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{name}</h4>
                    <p className="text-xs text-slate-500">{role}</p>
                </div>
            </div>
        </div>
    );
}
