import {NextRequest, NextResponse} from 'next/server';
import {cookies} from 'next/headers';

export async function middleware(request: NextRequest) {

    const {headers} = request;

    const isLogged = cookies().has('__session');

    const {pathname, searchParams} = request.nextUrl;

    if (!isLogged && !pathname.includes('/login')) {
        const groupId = searchParams.get("groupId")
        return NextResponse.redirect(new URL(`/login${groupId ? "?groupId=" + groupId : ""}`, request.url));
    }

    if (isLogged) {
        if (pathname.includes('/login') || pathname === '/') {
            return NextResponse.redirect(new URL('/desktop', request.url));
        }

        if (pathname === '/admin') {
            return NextResponse.redirect(new URL('/admin/import', request.url));
        }
    }
}

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/', '/login/:path*', '/challenges/:path*', '/desktop/:path*', '/mentions/:path*', '/soft_skills/:path*', '/steam_skills/:path*',]
};
