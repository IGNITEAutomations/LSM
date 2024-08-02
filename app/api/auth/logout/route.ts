import {NextRequest, NextResponse} from "next/server";
import FirebaseServer from "@/lib/Firebase/Server/AuthServer";

export async function GET(request: NextRequest) {
    try {
        await FirebaseServer.signOut()
        return NextResponse.json({success: true, data: ""})
    } catch (error) {
        console.error("Error login: " + error)
        return NextResponse.json({success: false, error: "An error occurred while logging in"})
    }
}