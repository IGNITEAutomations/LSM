import {NextRequest, NextResponse} from "next/server";
import Classes from "@/lib/DB/Classes/classes";
import FirebaseServer from "@/lib/Firebase/Server/AuthServer";

export async function POST(request: NextRequest) {
    try {
        const user = await FirebaseServer.getCurrentUser()
        if (!user || !user.uid)
            return NextResponse.json({success: false, error: "User not found"});

        const importData = (await request.json()) as {delete: boolean, data: string[][]}
        if (importData.delete) {
            await Classes.deleteData()
            return NextResponse.json(await Classes.importData(importData.data));
        } else
            return NextResponse.json(await Classes.reloadImportData(importData.data));

    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({success: false, error: (error as Error).message});
    }
}