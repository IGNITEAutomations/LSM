import SessionToken from "@/lib/Session/SessionToken";
import { UserRoles } from "@/lib/User/utils/users_roles";
import {CCookieManager} from "@/lib/Cookies/CookieManager";

type UserSessionPayload = {
    role: UserRoles | null;
    session: string;
};

export class UserSession {
    private sessionToken: SessionToken<UserSessionPayload>;
    private cookieManager: CCookieManager;
    private role: UserRoles | null = null;
    private _session: string = "";
    private _isLogged: boolean = false;
    private static _cookieName = "__session_copilot";

    constructor(options?: {
        sessionToken?: SessionToken<UserSessionPayload>;
        cookieManager?: CCookieManager;
        cookieName?: string;
    }) {
        this.sessionToken = options?.sessionToken || new SessionToken<UserSessionPayload>();
        this.cookieManager = options?.cookieManager || new CCookieManager();
    }

    static cookieName() {
        return this._cookieName
    }

    public async init(token?: string) {
        if (!this._isLogged) {
            const cookieData = await this.decodeCookieData(token);
            if (cookieData) {
                this.role = cookieData.role;
                this._session = cookieData.session;
                this._isLogged = true;
            }
        }
    }

    public isLogged(): boolean {
        return this._isLogged;
    }

    public async createRoleCookie(role: UserRoles) {
        await this.init();
        await this.setRole(role);
    }

    public getRole(): UserRoles | null {
        return this.role;
    }

    public async setRole(role: UserRoles | null) {
        if (this.role !== role) {
            this.role = role;
            await this.updateCookie();
        }
    }

    public session(): string {
        return this._session;
    }

    public async setSession(session: string) {
        if (this._session !== session) {
            this._session = session;
            await this.updateCookie();
        }
    }

    public async setUser(user: { role: UserRoles; session: string }) {
        if (this._session !== user.session || this.role !== user.role) {
            this._session = user.session;
            this.role = user.role;
            await this.updateCookie();
        }
    }

    public delete() {
        this.cookieManager.delete(UserSession._cookieName);
    }

    private async updateCookie(): Promise<void> {
        if (!this.role || !this.session) {
            this.delete();
            return;
        }
        await this.setCookie();
    }

    private async decodeCookieData(tk?: string): Promise<UserSessionPayload | null> {
        const token = tk ?? this.cookieManager.get(UserSession._cookieName);

        if (!token) {
            return null;
        }

        try {
            return await this.sessionToken.decodeToken(token);
        } catch (error) {
           console.error("Token inválido o expirado:", error);
            this.delete();
            return null;
        }
    }

    private async setCookie(): Promise<void> {
        try {
            const data: UserSessionPayload = {
                role: this.role,
                session: this._session,
            };

            const token: string = await this.sessionToken.generateToken(data);

            const maxAgeInSeconds = this.getMaxAgeInSeconds();

            this.cookieManager.save(UserSession._cookieName, token, maxAgeInSeconds);
        } catch (error) {
            console.error("Error al establecer la cookie:", error);
        }
    }

    private getMaxAgeInSeconds(): number {
        const match = this.sessionToken.expireTime.match(/(\d+)([smhd])/);
        if (match) {
            const value = parseInt(match[1], 10);
            const unit = match[2];
            switch (unit) {
                case 's':
                    return value;
                case 'm':
                    return value * 60;
                case 'h':
                    return value * 3600;
                case 'd':
                    return value * 86400;
            }
        }
        return 12 * 86400;
    }
}
