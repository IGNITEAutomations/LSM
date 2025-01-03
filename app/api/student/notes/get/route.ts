import {NextRequest, NextResponse} from "next/server";
import FirebaseServer from "@/lib/Firebase/Server/AuthServer";
import Groups from "@/lib/DB/Groups/groups";

export async function GET(request: NextRequest) {
    try{
        const user = await FirebaseServer.getCurrentUser()
        const groupId = request.nextUrl.searchParams.get("id")

        if (!user)
            throw new Error("User not found")

        if (!groupId)
            throw new Error("GroupId is empty")


        return NextResponse.json({success: true, data: await Groups.notesFromGroup(parseInt(groupId), 1)})

    } catch(error) {
        console.error((error as Error).message)
        return NextResponse.json({success: false, error: error})
    }
}