import Link from 'next/link';
import { Icon } from '@/components/ui/icon';
import { AuthLeftPanel } from '@/components/auth';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen w-full bg-[#f8f7f5] dark:bg-[#231a0f]">
            {/* Left Side: Decorative Panel */}
            <AuthLeftPanel />

            {/* Right Side: Auth Forms */}
            <div className="flex-1 flex flex-col justify-center items-center p-4 lg:p-8 relative">
                {/* Mobile Logo */}
                <div className="lg:hidden absolute top-6 left-6 flex items-center gap-2 text-[#231a0f] dark:text-white">
                    <Link href="/" className="flex items-center gap-2">
                        <Icon name="analytics" className="text-3xl text-primary" />
                        <span className="text-xl font-bold">Dilarisin</span>
                    </Link>
                </div>

                {children}

                {/* Mobile Footer */}
                <div className="mt-8 text-center lg:hidden">
                    <p className="text-xs text-gray-400">© {new Date().getFullYear()} Dilarisin. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}
