import ISession from "@/lib/Session/interficies/ISession";
import IToken from "@/lib/Session/interficies/IToken";
import ICookie from "@/lib/Session/interficies/ICookie";
import Token from "@/lib/Session/Token";
import COOKIE from "@/lib/Session/Cookie";

type UserSessionPayload = {
    [clave: string]: any;
}

class Session implements ISession {
    private readonly tokenHandler: IToken;
    private readonly cookieHandler: ICookie;
    private readonly _expireTime: number;
    private readonly _cookieName: string;

    private data: UserSessionPayload = {}

    constructor(tokenManager: IToken, cookieHandler: ICookie, options?: { expireTime?: number, cookieName?: string }) {
        this.tokenHandler = tokenManager;
        this.cookieHandler = cookieHandler;
        this._cookieName = options?.cookieName || "__session_prueba";
        this._expireTime = options?.expireTime || 12 * 86400;
    }

    public get cookieName(): string {
        return this._cookieName
    }

    public get expireTime(): number {
        return this._expireTime
    }

    public async get(key: string, session?: string): Promise<string> {
        await this.init(session)
        return this.data[key] ?? ""
    }

    public async set(key: string, value: any): Promise<void> {
        await this.init()
        if (key) {
            this.data[key] = value;
            await this.updateCookie();
        }
    }

    public async clear(key: string): Promise<void> {
        await this.init()
        if (key in this.data) {
            delete this.data[key]
            await this.updateCookie();
        }
    }

    public clearAll(): void {
        this.data = {}
        this.cookieHandler.clear(this._cookieName)
    }

    private async init(session?: string): Promise<void> {
        this.data = {}

        session = session ?? this.cookieHandler.get(this.cookieName) ?? undefined;
        if (session) {
            await this.loadSessionData(session)
        }
    }

    private async loadSessionData(session: string): Promise<void> {
        const cookieData = await this.decodeCookieSession(session);
        if (cookieData) {
            this.data = cookieData
        }
    }

    private async updateCookie(): Promise<void> {
        try {
            const token: string = await this.tokenHandler.encrypt(this.data);

            this.cookieHandler.save(this._cookieName, token, this._expireTime);
        } catch (error) {
            console.error(error)
            throw new Error(`Error the session cookie could not be updated`);
        }
    }

    private async decodeCookieSession(session: string): Promise<UserSessionPayload | void> {
        try {
            return await this.tokenHandler.decode(session);
        } catch (error) {
            console.error(error)
            //throw new Error(`Error the session token is invalid`)
        }
    }
}

const SESSION = new Session(new Token(process.env.JWT_SECRET_KEY!), COOKIE)
export default SESSION
