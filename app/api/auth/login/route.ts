import {NextRequest, NextResponse} from "next/server";
import FirebaseServer from "@/lib/Firebase/Server/AuthServer";
import User from "@/lib/DB/User/user";
import SESSION from "@/lib/Session/Session";
import {UserRoles} from "@/lib/User/utils/users_roles";

export async function POST(request: NextRequest) {
    try {
        const {idToken} = await request.json() as { idToken: string };
        const user = await  FirebaseServer.getUser(idToken)

        if (!user)
            return NextResponse.json({success: false, error: "User not found"})

        const userLogin = await User.login(user.email!, user.uid!)

        if (!userLogin)
            return NextResponse.json({success: false, error: "User not found"})

        if (!await FirebaseServer.createSessionCookie(idToken))
            throw new Error("Login cookie could not be created")


        await SESSION.set("isLogged", true)
        await SESSION.set("role", userLogin.role)

        return NextResponse.json({success: true, data: ""})
    } catch (error) {
        console.error("Error login: " + error)
        return NextResponse.json({success: false, error: "An error occurred while logging in"})
    }
}