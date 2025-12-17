'use client';

import Link from 'next/link';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-[#231a0f]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                            <Icon name="monitoring" className="text-xl" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Dilarisin
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <NavLink href="#features">Fitur</NavLink>
                        <NavLink href="#how-it-works">Cara Kerja</NavLink>
                        <NavLink href="#pricing">Harga</NavLink>
                        <NavLink href="#testimonials">Testimoni</NavLink>
                        <NavLink href="#faq">FAQ</NavLink>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/login"
                            className="hidden sm:flex text-sm font-medium text-slate-900 dark:text-white hover:text-primary transition-colors"
                        >
                            Masuk
                        </Link>
                        <Button size="md">Mulai Gratis</Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <a
            href={href}
            className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors"
        >
            {children}
        </a>
    );
}
