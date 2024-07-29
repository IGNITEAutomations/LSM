import {getAuth, GoogleAuthProvider, signInWithPopup, UserCredential, Auth} from "firebase/auth";
import {firebaseConfig} from "@/lib/Firebase/Client/Config";
import {userDataType} from "@/lib/Firebase/Client/utils/UserDataType";
import {APIResponse} from "@/utils/APIResponse";
import {FirebaseApp, getApps, initializeApp} from "firebase/app";

class AuthClient {

    private auth: Auth;

    constructor() {
        const firebaseApp: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
        this.auth = getAuth(firebaseApp);
    }

    private async getCredentials(): Promise<UserCredential | null> {
        const provider: GoogleAuthProvider = new GoogleAuthProvider();
        try {
            return await signInWithPopup(this.auth, provider);
        } catch (error) {
            console.error("Error getting credentials:", error);
            return null;
        }
    }

    private async getUserID(credentials: UserCredential): Promise<string> {
        try {
            return await credentials.user.getIdToken();
        } catch (error) {
            console.error("Error getting user ID token:", error);
            throw new Error("Failed to get user ID token.");
        }
    }

    private async handleAuthApi(endpoint: string, idToken: string): Promise<APIResponse<string>> {
        try {
            const response: Response = await fetch(endpoint, {
                method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({idToken})
            });

            const resBody: APIResponse<string> = await response.json();
            if (!resBody.success)
                throw new Error(resBody.error || "Log in response error.");

            return resBody;
        } catch (error) {
            console.error("Error handling auth API:", error);
            return {success: false, error: error as string};
        }
    }

    public async getUserData(credentials: UserCredential): Promise<userDataType> {
        const {uid, displayName, email, photoURL} = credentials.user;
        return {
            uid, displayName: displayName || "", mail: email || "", avatar: photoURL || ""
        };
    }

    public async signIn(): Promise<APIResponse<string>> {
        try {
            const credentials: UserCredential | null = await this.getCredentials();
            if (!credentials)
                return {success: false, error: "Failed to log in."};

            const idToken = await this.getUserID(credentials);
            return await this.handleAuthApi("/api/auth/login", idToken);
        } catch (error) {
            console.error("Sign-in error:", error);
            return {success: false, error: `Sign-in error: ${error}`};
        }
    }

    public async signOut(): Promise<APIResponse<string>> {
        try {
            const response = await fetch("/api/auth/logout")
            return response.json()
        } catch (error) {
            console.error("Sign-in error:", error);
            return {success: false, error: `Sign-in error: ${error}`};
        }
    }
}

const FirebaseClient = new AuthClient();
export default FirebaseClient
