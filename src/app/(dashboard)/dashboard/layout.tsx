// import { redirect } from 'next/navigation';
// import { auth } from '@/lib/auth';
import { DashboardSidebar, DashboardHeader } from '@/components/dashboard';

// TODO: Re-enable auth when database is set up
// const session = await auth();
// if (!session?.user) redirect('/login');

// Mock user for testing UI
const mockUser = {
    name: 'Budi Santoso',
    email: 'budi@example.com',
};

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-screen overflow-hidden flex bg-[#F9FAFB]">
            <DashboardSidebar />
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                <DashboardHeader userName={mockUser.name} />
                <main className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-7xl mx-auto space-y-8">{children}</div>
                </main>
            </div>
        </div>
    );
}

