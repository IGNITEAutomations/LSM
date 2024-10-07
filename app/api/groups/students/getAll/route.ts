import {NextRequest, NextResponse} from "next/server";
import FirebaseServer from "@/lib/Firebase/Server/AuthServer";
import Groups from "@/lib/DB/Groups/groups";

export async function GET(request: NextRequest) {
    try{
        const user = await FirebaseServer.getCurrentUser()
        if (!user)
            throw new Error("User not found")

        return NextResponse.json({success: true, data: await Groups.getAllStudents(true)})

    } catch(error) {
        console.error(error)
        return NextResponse.json({success: false, error: error})
    }
}