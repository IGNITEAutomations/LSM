import {NextRequest, NextResponse} from 'next/server';
import {cookies} from 'next/headers';

export async function middleware(request: NextRequest) {

    const {headers} = request;

    const isLogged = cookies().has('__session');

    const {pathname} = request.nextUrl;

    if (!isLogged && !pathname.includes('/login')) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (isLogged) {
        if (pathname.includes('/login') || pathname === '/') {
            return NextResponse.redirect(new URL('/desktop', request.url));
        }
    }
}

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/', '/login/:path*', '/challenges/:path*', '/desktop/:path*', '/mentions/:path*', '/soft_skills/:path*', '/steam_skills/:path*',]
};
