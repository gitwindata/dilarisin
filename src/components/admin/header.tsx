import { Icon } from '@/components/ui/icon';

interface AdminHeaderProps {
    title: string;
    description?: string;
}

export function AdminHeader({ title, description }: AdminHeaderProps) {
    return (
        <header className="w-full bg-white border-b border-slate-100 px-8 py-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
                    {description && <p className="text-slate-500 text-sm mt-1">{description}</p>}
                </div>
                <div className="flex items-center gap-4">
                    {/* Admin Avatar */}
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-slate-900 flex items-center justify-center text-white">
                            <Icon name="person" />
                        </div>
                        <div className="hidden md:block">
                            <p className="text-sm font-semibold text-slate-900">Admin</p>
                            <p className="text-xs text-slate-500">Super Admin</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
