import {App, cert, getApps, initializeApp} from "firebase-admin/app";
import {Auth, getAuth, UserRecord} from "firebase-admin/auth";
import {UserSession} from "@/lib/Session/UserSession";
import {UserRoles} from "@/lib/User/utils/users_roles";
import {id} from "postcss-selector-parser";

class AuthServer {

    private auth: Auth;
    private sessionManager = new UserSession();

    constructor() {
        const existingApp = getApps().find(app => app.name === "firebase-admin-app");

        if (!existingApp) {
            initializeApp({
                credential: cert({
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
                }),
            }, "firebase-admin-app");
        }

        this.auth = getAuth(getApps().find(app => app.name === "firebase-admin-app") as App);
    }

    public async user(token: string): Promise<UserRecord | undefined> {
        if (!token) {
            console.error('Token is undefined or empty');
            return;
        }

        try {
            const {uid} = await this.auth.verifyIdToken(token);
            return await this.auth.getUser(uid);
        } catch (error) {
            console.error("Error getting user:", error);
            return undefined
        }
    }

    public async currentUser(token?: string): Promise<UserRecord | undefined> {
        await this.sessionManager.init();

        token = token ?? this.sessionManager.session();
        if (!token) {
            console.error('No token provided for currentUser');
            return;
        }

        if (!(await this.isUserAuthenticated(token))) return;

        try {
            const {uid} = await this.auth.verifySessionCookie(token);
            return await this.auth.getUser(uid);
        } catch (error) {
            console.error('Failed to process current user', error);
        }
    }

    public async createSessionCookie(idToken: string, role: UserRoles) {
        console.log("Creating session cookie")
        console.log("idToken:", idToken != "", "Role:", role)
        await this.sessionManager.init()
        await this.sessionManager.setUser({
            role: role,
            session: await this.auth.createSessionCookie(idToken, {expiresIn: (60 * 60 * 24 * 12 * 1000)})
        })
    }

    public async signOut(): Promise<void> {
        try {
            await this.sessionManager.init();
            await this.revokeAllSessions(this.sessionManager.session());
            this.sessionManager.delete()
        } catch (error) {
            console.error("Failed to sign out:", error);
        }
    }

    private async isUserAuthenticated(session: string): Promise<boolean> {
        if (!session) return false

        try {
            await this.auth.verifySessionCookie(session, true);
            return true;
        } catch (error) {
            console.error("Authentication check failed:", error);
            return false;
        }
    }

    private async revokeAllSessions(session: string): Promise<void> {
        try {
            const {sub} = await this.auth.verifySessionCookie(session);
            await this.auth.revokeRefreshTokens(sub);
        } catch (error) {
            console.error('Failed to revoke all sessions', error);
        }
    }
}


const FirebaseServer = new AuthServer()
export default FirebaseServer