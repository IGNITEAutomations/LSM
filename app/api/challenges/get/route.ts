import {NextRequest, NextResponse} from "next/server";
import FirebaseServer from "@/lib/Firebase/Server/AuthServer";
import Classes from "@/lib/DB/Classes/classes";

export async function GET(request: NextRequest) {
    try{
        const user = await FirebaseServer.getCurrentUser()
        const classId = request.nextUrl.searchParams.get("id")
        if (!user)
            throw new Error("User not found")

        if (!classId)
            throw new Error("ClassId is empty")

        return NextResponse.json({success: true, data: await Classes.getChallenges(parseInt(classId), user.uid)})

    } catch(error) {
        console.error(error)
        return NextResponse.json({success: false, error: error})
    }
}