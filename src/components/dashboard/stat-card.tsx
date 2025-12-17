import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface StatCardProps {
    icon: string;
    label: string;
    value: string | number;
    iconBg?: string;
    iconColor?: string;
}

export function StatCard({
    icon,
    label,
    value,
    iconBg = 'bg-blue-50',
    iconColor = 'text-blue-600',
}: StatCardProps) {
    return (
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div
                className={cn('size-12 rounded-full flex items-center justify-center', iconBg, iconColor)}
            >
                <Icon name={icon} />
            </div>
            <div>
                <p className="text-sm text-gray-500 font-medium">{label}</p>
                <h4 className="text-2xl font-bold text-slate-900">{value}</h4>
            </div>
        </div>
    );
}
