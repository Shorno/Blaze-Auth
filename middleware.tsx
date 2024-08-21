import {NextRequest, NextResponse} from "next/server";

const protectedRoutes = ['/profile']
const authRoutes = ['/login', '/signup']

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isProtectedRoute = protectedRoutes.includes(path)
    const isAuthRoute = authRoutes.includes(path)

    const token = request.cookies.get('token')?.value
    console.log('token', token)

    if (!token && isProtectedRoute) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    if (token && isAuthRoute) {
        return NextResponse.redirect(new URL("/", request.url))
    }
}

export const config = {
    matcher: [
        "/",
        "/profile",
        "/login",
        "/signup"
    ]
}