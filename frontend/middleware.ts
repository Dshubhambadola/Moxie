import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    // TODO: Revert to process.env
    const SUPABASE_URL = "https://cpfmrgmmwhpbgjrwhpvs.supabase.co";
    const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwZm1yZ21td2hwYmdqcndocHZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgwMjgwNzgsImV4cCI6MjA4MzYwNDA3OH0.0MPBj01FH1jHlFYwrbI8XzTBz2ZqcU_eOss8D0ztfTs";

    const supabase = createServerClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
                    response = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    const {
        data: { user },
    } = await supabase.auth.getUser()

    const path = request.nextUrl.pathname
    const isProtectedRoute = path.startsWith('/dashboard') || path.startsWith('/practice') || path.startsWith('/session') || path.startsWith('/analytics')

    if (isProtectedRoute && !user) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (path === '/login' && user) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return response
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/practice/:path*',
        '/session/:path*',
        '/login',
    ],
}
