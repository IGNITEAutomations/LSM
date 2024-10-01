import {NextRequest, NextResponse} from "next/server";
import FirebaseServer from "@/lib/Firebase/Server/AuthServer";
import Groups from "@/lib/DB/Groups/groups";

export async function POST(request: NextRequest) {
    try {
        const groupId = parseInt((await request.json()).groupId ?? "-1")
        const user = await  FirebaseServer.getCurrentUser()

        if (!user)
            throw new Error("User not found")

        if (groupId === -1)
            throw new Error("Group id not found")

        return NextResponse.json({success: true, data: await Groups.assignGroup(user.email!, groupId)})

    } catch (error) {
        console.error(error)
        return NextResponse.json({success: false, error: error})
    }

}