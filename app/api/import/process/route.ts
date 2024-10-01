import {NextRequest, NextResponse} from "next/server";
import FirebaseServer from "@/lib/Firebase/Server/AuthServer";
import Groups from "@/lib/DB/Groups/groups";

export async function POST(request: NextRequest) {
    try{
        const user = await FirebaseServer.getCurrentUser()
        const importData = (await request.json()) as  string[][]

        if (!user || !user.uid)
            return NextResponse.json({success: false, error: "User not found"});

       if (!importData)
           return NextResponse.json({success: false, error: "Data not found"});

        return NextResponse.json(await Groups.findNewStudents(importData))

    } catch(error) {
        console.error(error)
        return NextResponse.json({success: false, error: error})
    }
}