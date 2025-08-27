import {NextRequest, NextResponse} from 'next/server';
import {getUserInfoFromCookie} from '@/utils/getUserInfoFromCookie';

// 1. Define protected and public routes
const protectedRoutes = ['/dashboard', '/admin', '/profile'];
const merchantOnlyRoutes = ['/campaign', '/transaction'];
const publicRoutes = ['/login', '/register', '/'];

export async function middleware(req: NextRequest) {
    // 2. Check if the current route is protected or public
    const path = req.nextUrl.pathname;

    // Check if the path starts with any protected route (to handle sub-routes)
    const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
    const isMerchantOnlyRoute = merchantOnlyRoutes.some(route => path.startsWith(route));
    const isPublicRoute = publicRoutes.includes(path);

    // 3. Get user info from cookies
    const user = await getUserInfoFromCookie();
    const role = user?.role;

    // 4. Handle authentication and authorization

    // If user is not logged in and tries to access protected/merchant-only routes → redirect to home
    if (!role && (isProtectedRoute || isMerchantOnlyRoute)) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    // If user is logged in and tries to access public pages (login, register, home) → redirect by role
    if (role && isPublicRoute) {
        const redirectPath = role === 'ROLE_ADMIN' ? '/admin/dashboard' : '/dashboard';
        return NextResponse.redirect(new URL(redirectPath, req.url));
    }

    // --- AUTHORIZATION CHECK ---

    // Merchant-only routes: only merchant can access
    if (isMerchantOnlyRoute) {
        if (role === 'ROLE_ALLOCATOR') {
            return NextResponse.next();
        }
        if (role === 'ROLE_ADMIN') {
            // Admin is NOT allowed here → redirect back to /admin
            return NextResponse.redirect(new URL('/admin/dashboard', req.url));
        }
        // Any other role → redirect to home
        return NextResponse.redirect(new URL('/', req.url));
    }

    // Protected routes: restricted based on role
    if (role && isProtectedRoute) {
        if (role === 'ROLE_ADMIN') {
            // Admin can ONLY access /admin and its sub-routes
            if (path.startsWith('/admin') || path.startsWith('/profile')) {
                return NextResponse.next();
            }
            return NextResponse.redirect(new URL('/admin/dashboard', req.url));
        }

        if (role === 'ROLE_ALLOCATOR') {
            // Merchant can ONLY access /dashboard and its sub-routes
            if (path.startsWith('/dashboard') || path.startsWith('/profile')) {
                return NextResponse.next();
            }
            return NextResponse.redirect(new URL('/', req.url));
        }

        // Other roles (e.g. customer) → redirect to home
        return NextResponse.redirect(new URL('/', req.url));
    }

    // Default: allow
    return NextResponse.next();
}
