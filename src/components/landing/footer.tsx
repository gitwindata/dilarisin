import Link from 'next/link';
import { Icon } from '@/components/ui/icon';

const footerLinks = {
    product: {
        title: 'Produk',
        links: [
            { label: 'Fitur', href: '#features' },
            { label: 'Harga', href: '#pricing' },
            { label: 'Cara Kerja', href: '#how-it-works' },
            { label: 'Changelog', href: '#' },
        ],
    },
    company: {
        title: 'Perusahaan',
        links: [
            { label: 'Tentang Kami', href: '/about' },
            { label: 'Karir', href: '/careers' },
            { label: 'Blog', href: '/blog' },
            { label: 'Kontak', href: '/contact' },
        ],
    },
    legal: {
        title: 'Legal',
        links: [
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Terms of Service', href: '/terms' },
            { label: 'Disclaimer', href: '/disclaimer' },
        ],
    },
};

const socialLinks = [
    { icon: 'face', href: '#', label: 'Facebook' },
    { icon: 'photo_camera', href: '#', label: 'Instagram' },
    { icon: 'alternate_email', href: '#', label: 'Twitter' },
];

export function Footer() {
    return (
        <footer className="bg-slate-50 dark:bg-[#231a0f] border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
                    {/* Brand Column */}
                    <div className="col-span-2 lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="size-6 bg-primary rounded flex items-center justify-center text-white">
                                <Icon name="monitoring" className="text-sm" />
                            </div>
                            <span className="text-xl font-bold text-slate-900 dark:text-white">
                                Dilarisin
                            </span>
                        </Link>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs mb-6">
                            Tools analitik #1 untuk Shopee Seller di Indonesia. Bantu tingkatkan
                            penjualan dengan data yang akurat.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    className="text-slate-400 hover:text-primary transition-colors"
                                    aria-label={social.label}
                                >
                                    <Icon name={social.icon} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Product Links */}
                    <FooterLinkColumn {...footerLinks.product} />

                    {/* Company Links */}
                    <FooterLinkColumn {...footerLinks.company} />

                    {/* Legal Links */}
                    <FooterLinkColumn {...footerLinks.legal} />
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-200 dark:border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-400 text-sm">
                        © {new Date().getFullYear()} Dilarisin. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        <span>System Operational</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

interface FooterLinkColumnProps {
    title: string;
    links: Array<{ label: string; href: string }>;
}

function FooterLinkColumn({ title, links }: FooterLinkColumnProps) {
    return (
        <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-4">{title}</h4>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                {links.map((link) => (
                    <li key={link.label}>
                        <Link href={link.href} className="hover:text-primary transition-colors">
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
