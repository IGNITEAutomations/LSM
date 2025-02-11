import { Auth, getAuth, UserRecord } from "firebase-admin/auth";
import {cert, getApps, initializeApp, ServiceAccount} from "firebase-admin/app";
import {cookies} from "next/headers";

function FirebaseAuthConfig() {
	if (process.env.NEXT_PUBLIC_ENVIRONMENT === "local") {
		return {
			project_id: process.env.GCLOUD_PROJECT
		}
	}
	return {
		credential: cert({
			project_id: process.env.FIREBASE_PROJECT_ID,
			private_key: process.env.FIREBASE_PRIVATE_KEY,
			client_email: process.env.FIREBASE_CLIENT_EMAIL,
		} as ServiceAccount)
	}
};

class AuthServer {

    private auth: Auth

    constructor() {
        const app = getApps().find((app) => app.name === "firebase-admin-app") ||
		initializeApp(FirebaseAuthConfig(), "firebase-admin-app")
		this.auth = getAuth(app);
    }

    private async getSession(): Promise<string | undefined> {
        try {
            return  cookies().get("__session_lms")?.value;
        } catch (error) {
            console.error("Failed to retrieve session:", error);
            return undefined;
        }
    }

    private async isUserAuthenticated(session: string): Promise<boolean> {
        if (!session) return false

        try {
            return Boolean(await this.auth.verifySessionCookie(session, true));
        } catch (error) {
             console.error("Authentication check failed:", error);
            return false;
        }
    }

    private async revokeAllSessions(session: string): Promise<undefined> {
        const decodedIdToken = await this.auth.verifySessionCookie(session);
        await this.auth.revokeRefreshTokens(decodedIdToken.sub);
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
        if (!(await this.isUserAuthenticated(token!))) {
            console.error("Unauthenticated token:", token)
            return undefined
        }

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
            const sessionCookie = await this.auth.createSessionCookie(idToken, {expiresIn});
            cookies().set("__session_lms", sessionCookie, {
                maxAge: expiresIn,
                httpOnly: true,
                secure: true,
             });
            return true
        } catch (error) {
            console.error("Failed to create session cookie:", error);
            return undefined
        }
    }

    public async signOut(): Promise<undefined> {
        if (!cookies().has("__session_lms"))
            return undefined

        try {
             const session = await this.getSession();
             cookies().delete("__session_lms");
             await this.revokeAllSessions(session!);
        } catch (error) {
            console.error("Failed to sign out:", error);
            return undefined
        }
    }
}

const FirebaseServer = new AuthServer()
export default  FirebaseServer