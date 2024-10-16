import {NextRequest, NextResponse} from "next/server";
import Groups from "@/lib/DB/Groups/groups";
import FirebaseServer from "@/lib/Firebase/Server/AuthServer";
import {StudentList} from "@/utils/functions/ProcessImportData";

export async function POST(request: NextRequest) {
    try {
        const user = await FirebaseServer.currentUser()
        if (!user || !user.uid)
            return NextResponse.json({success: false, error: "User not found"});

        const importData = (await request.json()) as StudentList[]
        return NextResponse.json(await Groups.importData(importData || []));

    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({success: false, error: (error as Error).message});
    }
}