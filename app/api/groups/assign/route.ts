import {NextRequest, NextResponse} from "next/server";
import FirebaseServer from "@/lib/Firebase/Server/AuthServer";
import Classes from "@/lib/DB/Classes/classes";

export async function POST(request: NextRequest) {
    try {
        const classId = parseInt((await request.json()).classId ?? "-1")
        const user = await  FirebaseServer.getCurrentUser()

        if (!user)
            throw new Error("User not found")

        if (classId === -1)
            throw new Error("Class id not found")

        return NextResponse.json({success: true, data: await Classes.assignGroup(user.email!, classId)})

    } catch (error) {
        console.error(error)
        return NextResponse.json({success: false, error: error})
    }

}