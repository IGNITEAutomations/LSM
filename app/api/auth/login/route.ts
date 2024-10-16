import {NextRequest, NextResponse} from "next/server";
import FirebaseServer from "@/lib/Firebase/Server/AuthServer";
import User from "@/lib/DB/User/user";

export async function POST(request: NextRequest) {
    try {
        const {idToken} = await request.json() as { idToken: string };
        const user = await  FirebaseServer.user(idToken)

        if (!user || !user.email || !await User.login(user.email, user.uid)) {
            console.error("User not found")
            return NextResponse.json({success: false, error: "User not found"})
        }

        const role = (await User.user(user.email))?.role
        if (!role) {
            throw new Error("User role not found")
        }

        await FirebaseServer.createSessionCookie(idToken, role)

        return NextResponse.json({success: true, data: ""})
    } catch (error) {
        console.error("Error login: " + error)
        return NextResponse.json({success: false, error: "An error occurred while logging in"})
    }
}