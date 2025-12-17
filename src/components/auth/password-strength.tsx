'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface PasswordStrengthProps {
    password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
    const strength = useMemo(() => {
        if (!password) return { level: 0, label: '' };

        let score = 0;

        // Length check
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;

        // Character variety
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^a-zA-Z0-9]/.test(password)) score++;

        if (score <= 2) return { level: 1, label: 'Lemah', color: 'bg-red-500' };
        if (score <= 4) return { level: 2, label: 'Sedang', color: 'bg-yellow-500' };
        if (score <= 5) return { level: 3, label: 'Kuat', color: 'bg-green-500' };
        return { level: 4, label: 'Sangat Kuat', color: 'bg-green-600' };
    }, [password]);

    if (!password) return null;

    return (
        <div className="mt-2">
            <div className="flex gap-2 px-2">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className={cn(
                            'h-1 flex-1 rounded-full transition-colors',
                            i <= strength.level ? strength.color : 'bg-gray-200 dark:bg-gray-700'
                        )}
                    />
                ))}
            </div>
            <p className="text-[10px] text-gray-400 px-2 text-right mt-1">
                Kekuatan password: {strength.label}
            </p>
        </div>
    );
}
