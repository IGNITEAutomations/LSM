import {NextResponse} from "next/server";
import FirebaseServer from "@/lib/Firebase/Server/AuthServer";
import Groups from "@/lib/DB/Groups/groups";

export async function GET() {
    try {
        const user = await  FirebaseServer.currentUser()
        if (!user)
            throw new Error("User not found")

        return NextResponse.json({success: true, data: {assigned: await Groups.getGroupsByTeacher(user.email!), notAssigned: await Groups.getNotAssignedGroups(user.email!)}})

    } catch (error) {
        console.error(error)
        return NextResponse.json({success: false, error: error})
    }

}