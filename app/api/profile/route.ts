import {NextResponse} from "next/server";
import FirebaseServer from "@/lib/Firebase/Server/AuthServer";
import User from "@/lib/DB/User/user";
import {LoggedUserType} from "@/app/api/profile/schema";

export async function GET() {
    try {
        const firebaseUser = await FirebaseServer.getCurrentUser()
        if (!firebaseUser)
            throw new Error("error getting user credentials")

        const userData = await User.user(firebaseUser.uid)
        if (!userData)
            throw new Error("user not found in bd")

        const user: LoggedUserType = {
            displayName: firebaseUser.displayName!,
            avatar: firebaseUser.photoURL!,
            role: userData.role,
            email: firebaseUser.email!,
            token: ""
        }

        return NextResponse.json({success: true, data: JSON.stringify(user)})
    } catch (error) {
        console.error("Error getting user: " + error)
        return NextResponse.json({success: false, error: "An error occurred while logging in"})
    }
}