import {NextRequest, NextResponse} from 'next/server';
import {UserSession} from "@/lib/Session/UserSession";
import CookieManager from "@/lib/Cookies/CookieManager";
import {UserRoles} from "@/lib/User/utils/users_roles";

export async function middleware(request: NextRequest) {
    const userSession = new UserSession()
    await userSession.init(CookieManager.get(UserSession.cookieName()) ?? undefined)
    const isLogged = userSession.isLogged()
    const role = userSession.getRole()

    console.log("isLogged:", isLogged, "Role:", role)

    const {pathname, searchParams} = request.nextUrl;

    if (!isLogged && !pathname.includes('/login')) {
        const groupId = searchParams.get("groupId")
        return NextResponse.redirect(new URL(`/login${groupId ? "?groupId=" + groupId : ""}`, request.url));
    }

    if (isLogged) {
        console.log("path:", pathname)
        if (pathname.includes('/login')) {
            return NextResponse.redirect(new URL('/desktop', request.url));
        }

        if (role != UserRoles.Teacher && pathname == "/") {
            return NextResponse.redirect(new URL('/desktop', request.url));
        }

        if (role != UserRoles.Admin && pathname.includes('/admin')) {
            return NextResponse.redirect(new URL('/desktop', request.url));
        }

        if (role === UserRoles.Admin && pathname === '/admin') {
            return NextResponse.redirect(new URL('/admin/import', request.url));
        }

        if (role === UserRoles.Admin && pathname == "/") {
            return NextResponse.redirect(new URL('/admin/import', request.url));
        }
    }
}

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/', '/login/:path*', '/challenges/:path*', '/desktop/:path*', '/mentions/:path*', '/soft_skills/:path*', '/steam_skills/:path*',]
};
