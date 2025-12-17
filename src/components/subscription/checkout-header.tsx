import Link from 'next/link';
import { Icon } from '@/components/ui/icon';

interface CheckoutHeaderProps {
    currentStep: 1 | 2 | 3;
    showBackLink?: boolean;
}

const steps = [
    { number: 1, label: 'Plans' },
    { number: 2, label: 'Checkout' },
    { number: 3, label: 'Confirmation' },
];

export function CheckoutHeader({ currentStep, showBackLink = true }: CheckoutHeaderProps) {
    return (
        <header className="flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#231a0f] px-6 lg:px-10 py-4 sticky top-0 z-50">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
                <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                    <Icon name="monitoring" className="text-xl" />
                </div>
                <span className="text-xl font-bold text-slate-900 dark:text-white">Dilarisin</span>
            </Link>

            {/* Steps Indicator (Desktop) */}
            <div className="hidden md:flex items-center gap-2">
                {steps.map((step, index) => (
                    <div key={step.number} className="flex items-center">
                        <div
                            className={`flex items-center gap-2 text-sm ${currentStep === step.number
                                ? 'font-bold text-primary'
                                : currentStep > step.number
                                    ? 'font-medium text-green-600'
                                    : 'font-medium text-gray-400'
                                }`}
                        >
                            <span
                                className={`flex items-center justify-center size-6 rounded-full ${currentStep === step.number
                                    ? 'bg-primary text-white'
                                    : currentStep > step.number
                                        ? 'bg-green-100 text-green-600 border border-green-200'
                                        : 'border border-gray-300 text-gray-400'
                                    }`}
                            >
                                {currentStep > step.number ? (
                                    <Icon name="check" className="text-sm" />
                                ) : (
                                    step.number
                                )}
                            </span>
                            <span>{step.label}</span>
                        </div>
                        {index < steps.length - 1 && (
                            <Icon name="chevron_right" className="text-gray-400 text-sm mx-2" />
                        )}
                    </div>
                ))}
            </div>

            {/* Back Link */}
            {showBackLink && (
                <Link
                    href="/dashboard"
                    className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary transition-colors"
                >
                    <Icon name="arrow_back" />
                    <span className="hidden sm:inline">Kembali ke Dashboard</span>
                </Link>
            )}
        </header>
    );
}
