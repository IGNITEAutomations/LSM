import ICookie from "@/lib/Session/interficies/ICookie";
import {cookies} from "next/headers";
import {NextRequest} from "next/server";

type TCookie =  {
    [key: string]: {
        value: string,
        expireTime: number
    }
}

export const enum COOKIE_TYPE {
    SERVERLESS,
    EDGE
}
class Cookie implements ICookie {

    public get(name: string, request?: NextRequest): string | null {
        if (this.isRunningOnEdge()) {
            if (request)
                return this.edge(name, request);
            return null
        } else {
            return this.serverless(name);
        }
    }

    public save(key: string, value: string, maxAge: number): void {
        cookies().set(key, value, {
            maxAge,
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/",
        });
    }

    public clear(name: string): void {
        cookies().delete(name)
    }

     private serverless(name: string): string | null {
        const cookie = cookies().get(name);
        return cookie?.value || null;
    }

    private edge(name: string, request: NextRequest): string | null {
        const cookie = cookies().get(name);
        return cookie?.value || null;
    }

    private isRunningOnEdge(): boolean {
        return process.env.NEXT_RUNTIME === 'edge'
    }
}

const COOKIE = new Cookie()
export default COOKIE
