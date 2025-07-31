import { NextRequest, NextResponse } from 'next/server';
import { getUserInfoFromCookie } from '@/utils/getUserInfoFromCookie';

// 1. Define protected and public routes
const protectedRoutes = ['/dashboard', '/admin'];
const merchantOnlyRoutes = ['/voucher', '/campaign', '/wallet'];
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

    // If not logged in and trying to access protected or merchant-only routes
    if (!role && (isProtectedRoute || isMerchantOnlyRoute)) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // If already logged in but trying to access public pages (login, signup, /)
    if (role && isPublicRoute) {
        const redirectPath = role === 'admin' ? '/admin' : '/dashboard';
        return NextResponse.redirect(new URL(redirectPath, req.url));
    }

    // Authorization logic for merchant-only routes
    if (isMerchantOnlyRoute) {
        // Only admin and merchant are allowed
        if (role === 'admin' || role === 'merchant') {
            return NextResponse.next();
        }
        // Other roles → redirect to login
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // Authorization logic for protected routes
    if (role && isProtectedRoute) {
        // Merchant is not allowed to access any /admin routes
        if (role === 'merchant' && path.startsWith('/admin')) {
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }

        // Admin can access all protected routes
        if (role === 'admin') {
            return NextResponse.next();
        }

        // Merchant can only access dashboard and its sub-routes
        if (role === 'merchant' && path.startsWith('/dashboard')) {
            return NextResponse.next();
        }

        // Other roles or invalid role → redirect to login
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}
