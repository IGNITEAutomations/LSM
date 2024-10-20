import ISession from "@/lib/Session/interficies/ISession";
import IToken from "@/lib/Session/interficies/IToken";
import ICookie from "@/lib/Session/interficies/ICookie";
import Token from "@/lib/Session/Token";
import COOKIE from "@/lib/Session/Cookie";

type UserSessionPayload = {
    [clave: string]: string | number | boolean;
}

const DEFAULT_NAME = "__session_test"
const DEFAULT_EXPIRE_TIME = 12 * 86400

export class Session implements ISession {
    private readonly tokenHandler: IToken<UserSessionPayload>;
    private readonly cookieHandler: ICookie;
    private readonly _expireTime: number;
    private readonly _cookieName: string;

    private data: UserSessionPayload = {}

    constructor(tokenManager: IToken<UserSessionPayload>, cookieHandler: ICookie, options?: { expireTime?: number, cookieName?: string }) {
        this.tokenHandler = tokenManager;
        this.cookieHandler = cookieHandler;
        this._cookieName = options?.cookieName || DEFAULT_NAME;
        this._expireTime = options?.expireTime || DEFAULT_EXPIRE_TIME;
    }

    public get cookieName(): string {
        return this._cookieName
    }

    public get expireTime(): number {
        return this._expireTime
    }

    public async get(key: string, session?: string): Promise<string | number | boolean | null> {
        try {
            await this.dataFromCookie(session);
            return this.data[key] ?? null;
        } catch (error) {
            console.error(`Error getting the key "${key}" from session:`, error);
            return null;
        }
    }

    public async set(key: string, value: any): Promise<void> {
        try {
            if (key) {
                await this.dataFromCookie()
                this.data[key] = value;
                await this.updateCookie();
            }
        } catch (error) {
            console.error(`Error setting the key "${key}" in session:`, error);
            throw new Error("Error setting value into session")
        }
    }

    public async clear(key: string): Promise<void> {
        if (!key) return;
        try {
            if (this.data && key in this.data) {
                await this.dataFromCookie()
                delete this.data[key]
                await this.updateCookie();
            }
        } catch (error) {
            console.error(`Error clearing the key "${key}" from session:`, error);
            throw new Error("Error cleaning the session")
        }

    }

    public clearAll(): void {
        this.data = {}
        this.cookieHandler.clear(this._cookieName)
    }

    private async dataFromCookie(session?: string): Promise<void> {
        this.data = {}

        try {
            session = session ?? this.cookieHandler.get(this.cookieName) ?? undefined;
            session ? await this.load(session) : this.data = {}

        } catch (error) {
            console.error("Error getting session from cookie:", error);
            throw new Error("Error getting session from cookie")
        }
    }

    private async load(session: string): Promise<void> {
        try {
            this.data = (await this.decodeCookie(session)) || {};
        } catch (error) {
            console.error("Error loading session data:", error);
            throw new Error("Error loading session data");
        }
    }

    private async updateCookie(): Promise<void> {
        try {
            const token: string = await this.tokenHandler.encrypt(this.data);
            this.cookieHandler.save(this._cookieName, token, this._expireTime);
        } catch (error) {
            console.error("Error updating the session cookie:", error);
            throw new Error(`Error the session cookie could not be updated`);
        }
    }

    private async decodeCookie(session: string): Promise<UserSessionPayload | void> {
        try {
            return await this.tokenHandler.decode(session);
        } catch (error) {
            console.error("Error decoding the session token:", error);
            throw new Error(`Error the session token is invalid`)
        }
    }
}

const SESSION = new Session(new Token(process.env.JWT_SECRET_KEY!), COOKIE)
export default SESSION