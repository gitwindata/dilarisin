import { cn } from '@/lib/utils';

interface IconProps {
    name: string;
    className?: string;
    filled?: boolean;
}

/**
 * Material Symbols Outlined icon component
 * @param name - Material icon name (e.g., 'monitoring', 'arrow_forward')
 * @param className - Additional CSS classes
 * @param filled - Whether to use filled variant
 */
export function Icon({ name, className, filled = false }: IconProps) {
    return (
        <span
            className={cn(
                'material-symbols-outlined select-none',
                filled && 'font-variation-settings-fill',
                className
            )}
            style={filled ? { fontVariationSettings: "'FILL' 1" } : undefined}
        >
            {name}
        </span>
    );
}
