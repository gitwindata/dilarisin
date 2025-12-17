'use client';

import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';

export interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: string;
    error?: string;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
    ({ className, icon, error, type, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);
        const isPassword = type === 'password';

        return (
            <div className="relative group">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Icon
                            name={icon}
                            className={cn(
                                'text-gray-400 group-focus-within:text-primary transition-colors',
                                error && 'text-red-400'
                            )}
                        />
                    </div>
                )}
                <input
                    ref={ref}
                    type={isPassword && showPassword ? 'text' : type}
                    className={cn(
                        'w-full h-12 bg-gray-50 dark:bg-[#2c2c2c] border-2 border-transparent',
                        'focus:border-primary focus:bg-white dark:focus:bg-[#2c2c2c]',
                        'focus:ring-0 rounded-full text-sm font-medium transition-all outline-none',
                        'placeholder:text-gray-400 dark:text-white',
                        icon ? 'pl-12' : 'pl-4',
                        isPassword ? 'pr-12' : 'pr-4',
                        error && 'border-red-400 focus:border-red-400',
                        className
                    )}
                    {...props}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
                    >
                        <Icon name={showPassword ? 'visibility_off' : 'visibility'} className="text-[20px]" />
                    </button>
                )}
                {error && (
                    <p className="text-xs text-red-500 mt-1 pl-4">{error}</p>
                )}
            </div>
        );
    }
);

AuthInput.displayName = 'AuthInput';
