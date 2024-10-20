import {NextRequest, NextResponse} from 'next/server';
import {UserRoles} from "@/lib/User/utils/users_roles";
import SESSION from "@/lib/Session/Session";

export async function middleware(request: NextRequest) {

    const {headers} = request;

    const sessionCookie = request.cookies.get(SESSION.cookieName)?.value

    const isLogged = await SESSION.get("isLogged", sessionCookie)
    const role = await SESSION.get("role", sessionCookie) as number

    console.log("Is logged:", isLogged, "; Role:", role)

    const {pathname, searchParams} = request.nextUrl;

    if (!isLogged && !pathname.includes('/login')) {
        const groupId = searchParams.get("groupId")
        return NextResponse.redirect(new URL(`/login${groupId ? "?groupId=" + groupId : ""}`, request.url));
    }

    if (isLogged) {

        console.log(pathname === "/")
        console.log()

        if (role !== UserRoles.Admin && pathname == "/") {
            return NextResponse.redirect(new URL('/desktop', request.url));
        }

        if (role === UserRoles.Admin && pathname.includes('/login')) {
            return NextResponse.redirect(new URL('/admin/import', request.url));
        }

        if (role !== UserRoles.Admin && pathname.includes('/login')) {
            return NextResponse.redirect(new URL('/desktop', request.url));
        }

        if (role !== UserRoles.Admin && pathname.includes('/admin')) {
            return NextResponse.redirect(new URL('/desktop', request.url));
        }

        if (role === UserRoles.Admin && pathname.includes('/admin')) {
            return NextResponse.redirect(new URL('/admin/import', request.url));
        }
    }
}

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/', '/admin/:path*', '/login/:path*', '/challenges/:path*', '/desktop/:path*', '/mentions/:path*', '/soft_skills/:path*', '/steam_skills/:path*',]
};
