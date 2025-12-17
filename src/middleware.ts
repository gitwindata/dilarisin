import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

// Routes that should be accessible without authentication
// TODO: Remove /dashboard, /subscription, /checkout from here after testing
const publicRoutes = ['/', '/login', '/register', '/forgot-password', '/dashboard', '/subscription', '/checkout'];
const publicApiRoutes = ['/api/auth', '/api/license', '/api/payment/webhook'];

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const isAdmin = req.auth?.user?.role === 'admin';
    const pathname = nextUrl.pathname;

    // Check if it's a public route (exact match or starts with for dashboard/admin)
    // TODO: Remove dashboard and admin bypass after setting up auth
    const isPublicRoute = publicRoutes.includes(pathname) || pathname === '/' || pathname.startsWith('/dashboard') || pathname.startsWith('/admin');
    const isPublicApiRoute = publicApiRoutes.some(route => pathname.startsWith(route));
    const isAuthPage = pathname === '/login' || pathname === '/register' || pathname === '/forgot-password';
    const isDashboardPage = pathname.startsWith('/dashboard');
    const isAdminPage = pathname.startsWith('/admin');

    // Allow public API routes
    if (isPublicApiRoute) {
        return NextResponse.next();
    }

    // Allow public pages (landing, auth pages for non-logged in users)
    if (isPublicRoute && !isAuthPage) {
        return NextResponse.next();
    }

    // Auth pages: redirect to dashboard if already logged in
    if (isAuthPage) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL('/dashboard', nextUrl));
        }
        return NextResponse.next();
    }

    // Dashboard routes: require authentication
    if (isDashboardPage) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL('/login', nextUrl));
        }
        return NextResponse.next();
    }

    // Admin routes: require admin role
    if (isAdminPage) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL('/login', nextUrl));
        }
        if (!isAdmin) {
            return NextResponse.redirect(new URL('/dashboard', nextUrl));
        }
        return NextResponse.next();
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
