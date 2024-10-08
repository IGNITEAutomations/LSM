import {NextRequest, NextResponse} from "next/server";
import FirebaseServer from "@/lib/Firebase/Server/AuthServer";
import Groups from "@/lib/DB/Groups/groups";
import {SkillsTypes} from "@/utils/types/types";

export async function GET(request: NextRequest) {
    try{
        const user = await FirebaseServer.getCurrentUser()
        const groupId = request.nextUrl.searchParams.get("id")
        const type = parseInt(request.nextUrl.searchParams.get("type") ?? "-1")

        if (!user)
            throw new Error("User not found")

        if (!groupId)
            throw new Error("GroupId is empty")

        if (type === -1 || !(type in SkillsTypes))
            throw new Error("Operation type not found")

        return NextResponse.json({success: true, data: await Groups.getSkills(parseInt(groupId), user.email!, type as SkillsTypes)})

    } catch(error) {
        console.error(error)
        return NextResponse.json({success: false, error: error})
    }
}