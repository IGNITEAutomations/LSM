import {cookies} from "next/headers";
import {NextRequest} from "next/server";
import {UserSession} from "@/lib/Session/UserSession";
import {req} from "agent-base";

export const enum COOKIE_TYPE {
    SERVERLESS_CONTEXT,
    EDGE_CONTEXT
}

export class CCookieManager {
    public save(name: string, token: string, maxAge: number): void {
        console.log("Saving cookie")
        try {
            cookies().set(name, token, {
                maxAge,
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                path: "/",
            });
        } catch (error) {
            throw new Error(`Error al guardar la cookie ${name}: ${(error as Error).message}`)
        }
    }

    public get(name: string, type: COOKIE_TYPE = COOKIE_TYPE.SERVERLESS_CONTEXT, request?: NextRequest): string | null {
        switch (type) {
            case COOKIE_TYPE.SERVERLESS_CONTEXT:
                return this.serverless(name);
            case COOKIE_TYPE.EDGE_CONTEXT:
                console.log("Cookie inside edge condition:", request?.cookies.get(UserSession.cookieName()) != undefined)
                if (!request) {
                    throw new Error('El objeto request es requerido para el contexto EDGE');
                }
                return this.edge(name, request);
            default:
                return this.serverless(name);
        }
    }

    public deleteAllOnServer() {
        try {
                cookies().getAll().map(cookie => {
                    cookies().delete(cookie.name)
                })
            } catch (error) {
                throw new Error("Error deleting cookies")
            }
    }

    public deleteAll(request: NextRequest) {
        try {
            request.cookies.clear()
        } catch (error) {
            throw new Error("It was not possible delete the cookie header")
        }
    }

    public delete(name: string): void {
        try {
            cookies().delete(name);
        } catch (error) {
            throw new Error(`Error al eliminar la cookie ${name}: ${(error as Error).message}`)
        }
    }

    private getCookieValue(source: any, name: string): string | null {
        const cookie = source.get(name);
        console.log("Final cookie value:", cookie?.value)
        return cookie?.value || null;
    }

    private serverless(name: string): string | null {
        return this.getCookieValue(cookies(), name);
    }

    private edge(name: string, request: NextRequest): string | null {
        console.log("Request cookie:", name)
        console.log("Cookie inside edge function:", request?.cookies.get(UserSession.cookieName()) != undefined)
        console.log("Cookie inside edge function2:", request?.cookies.get(name) != undefined)
        return this.getCookieValue(request.cookies, name);
    }
}

const CookieManager = new CCookieManager()
export default CookieManager