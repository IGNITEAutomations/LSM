import {NextRequest, NextResponse} from "next/server";
import FirebaseServer from "@/lib/Firebase/Server/AuthServer";
import User from "@/lib/DB/User/user";

export async function POST(request: NextRequest) {
    try {
        const {idToken} = await request.json() as { idToken: string };
        const user = await  FirebaseServer.getUser(idToken)

        if (user && !await User.login(user.email!, user.uid!)) {
            console.log("User not found")
            return NextResponse.json({success: false, error: "User not found"})
        }

        if (!await FirebaseServer.createSessionCookie(idToken))
            throw new Error("Login cookie could not be created")

        return NextResponse.json({success: true, data: ""})
    } catch (error) {
        console.error("Error login: " + error)
        return NextResponse.json({success: false, error: "An error occurred while logging in"})
    }
}