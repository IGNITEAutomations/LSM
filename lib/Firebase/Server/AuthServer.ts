import {App, cert, getApps, initializeApp} from "firebase-admin/app";
import {Auth, getAuth, UserRecord} from "firebase-admin/auth";
import SESSION from "@/lib/Session/Session";

class AuthServer {

    private auth: Auth

    constructor() {
        const config = {
            credential: cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY
            })
        };
        const app: App = getApps().find(app => app.name === "firebase-admin-app") || initializeApp(config, "firebase-admin-app");
        this.auth = getAuth(app)
    }

    public async getUser(token: string): Promise<UserRecord | undefined> {
        try {
            const decodedToken = await this.auth.verifyIdToken(token)
            return this.auth.getUser(decodedToken.uid)
        } catch (error) {
            console.error("Error getting user: ")
            return undefined
        }
    }

    public async getCurrentUser(token?: string): Promise<UserRecord | undefined> {
        token = token ?? await this.getSession()
        if (!(await this.isUserAuthenticated(token!))) return undefined

        try {
            const decodedIdToken = await this.auth.verifySessionCookie(token!)
            return this.auth.getUser(decodedIdToken.uid)
        } catch (error) {
            console.error("Failed to process current user:", error);
            return undefined;
        }
    }

    public async createSessionCookie(idToken: string): Promise<true | undefined> {
        try {
            const expiresIn = 60 * 60 * 24 * 12 * 1000; // 12 days
            const value = await this.auth.createSessionCookie(idToken, {expiresIn})
            console.log("Creation the sesssion cookie: ok")
            await SESSION.set("session", value)

            return true
        } catch (error) {
            console.error("Failed to create session cookie:", error);
            return undefined
        }
    }

    public async signOut(): Promise<undefined> {
        try {
            const session = await this.getSession();
            SESSION.clearAll()
            await this.revokeAllSessions(session!);
        } catch (error) {
            console.error("Failed to sign out:", error);
            return undefined
        }
    }

    private async getSession(): Promise<string | undefined> {
        try {
            return SESSION.get("session") //cookies().get("__session")?.value;
        } catch (error) {
            console.error("Failed to retrieve session:", error);
            return undefined;
        }
    }

    private async isUserAuthenticated(session: string): Promise<boolean> {
        if (!session) return false

        try {
            await this.auth.verifySessionCookie(session, true);
            return true
        } catch (error) {
            console.error("Authentication check failed:", error);
            return false;
        }
    }

    private async revokeAllSessions(session: string): Promise<undefined> {
        const decodedIdToken = await this.auth.verifySessionCookie(session);
        await this.auth.revokeRefreshTokens(decodedIdToken.sub);
    }
}

const FirebaseServer = new AuthServer()
export default FirebaseServer