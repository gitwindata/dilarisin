import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center gap-2 font-bold rounded-full transition-all',
                    // Variants
                    variant === 'primary' &&
                    'bg-primary hover:bg-[#c46a03] text-white shadow-lg shadow-primary/25 hover:shadow-primary/40',
                    variant === 'secondary' &&
                    'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700',
                    variant === 'outline' &&
                    'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700',
                    variant === 'ghost' &&
                    'text-slate-600 dark:text-slate-300 hover:text-primary',
                    // Sizes
                    size === 'sm' && 'text-sm py-2 px-4',
                    size === 'md' && 'text-sm py-2.5 px-6',
                    size === 'lg' && 'text-base h-14 px-8',
                    className
                )}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

export { Button };
