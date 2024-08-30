import {NextResponse} from "next/server";
import FirebaseServer from "@/lib/Firebase/Server/AuthServer";
import Classes from "@/lib/DB/Classes/classes";

export async function GET() {
    try {
        const user = await  FirebaseServer.getCurrentUser()
        if (!user)
            throw new Error("User not found")

        return NextResponse.json({success: true, data: {assigned: await Classes.getClassesByTeacher(user.email!), notAssigned: await Classes.getNotAssignedGroups(user.email!)}})

    } catch (error) {
        console.error(error)
        return NextResponse.json({success: false, error: error})
    }

}