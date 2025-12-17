import { AdminSidebar } from '@/components/admin';

// TODO: Add auth check for admin role
// const session = await auth();
// if (session?.user?.role !== 'admin') redirect('/dashboard');

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen overflow-hidden flex bg-[#F9FAFB]">
            <AdminSidebar />
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                <main className="flex-1 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
}
