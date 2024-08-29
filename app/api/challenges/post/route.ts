import {NextRequest, NextResponse} from "next/server";
import Classes from "@/lib/DB/Classes/classes";

export async function POST(request: NextRequest) {
    const data = await request.json()
    const response = await Classes.updateStudentsChallenges(data)
    if (response)
        return NextResponse.json({success: true, data: "ok"})
    else
        return NextResponse.json({success: false, data: "The data could not be updated"})


}