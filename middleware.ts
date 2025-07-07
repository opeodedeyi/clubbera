import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('authToken')?.value
    const { pathname } = request.nextUrl

    // Protected routes - require authentication
    const protectedPaths = ['/home', '/profile', '/communities', '/settings']
    const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))

    // Auth routes - redirect if already logged in  
    const authPaths = ['/login', '/signup', '/forgot-password', '/reset-password']
    const isAuthPath = authPaths.some(path => pathname.startsWith(path))

    if (isProtectedPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (isAuthPath && token) {
        return NextResponse.redirect(new URL('/home', request.url))
    }

    // Redirect root to appropriate home page
    if (pathname === '/' && token) {
        return NextResponse.redirect(new URL('/home', request.url))
    }
}

export const config = {
    matcher: [
        '/',
        '/home/:path*',
        '/profile/:path*', 
        // '/communities/:path*',
        '/settings/:path*',
        '/login',
        '/signup',
        '/forgot-password',
        '/reset-password'
    ]
}