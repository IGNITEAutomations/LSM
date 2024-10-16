import {cookies} from "next/headers";
import {NextRequest} from "next/server";

export const enum COOKIE_TYPE {
    SERVERLESS_CONTEXT,
    EDGE_CONTEXT
}

export class CCookieManager {
    public save(name: string, token: string, maxAge: number): void {
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
                if (!request) {
                    throw new Error('El objeto request es requerido para el contexto EDGE');
                }
                return this.edge(name, request);
            default:
                return this.serverless(name);
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
        return cookie?.value || null;
    }

    private serverless(name: string): string | null {
        return this.getCookieValue(cookies(), name);
    }

    private edge(name: string, request: NextRequest): string | null {
        return this.getCookieValue(request.cookies, name);
    }
}

const CookieManager = new CCookieManager()
export default CookieManager