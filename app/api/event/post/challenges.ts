import {QueueDataItem} from "@/lib/Queue/queue";
import Groups from "@/lib/DB/Groups/groups";
import {NextResponse} from "next/server";

export default async function updateStudentChallenges(data: QueueDataItem[]) {
    const response = await Groups.updateStudentsChallenges(data)
    if (response)
        return NextResponse.json({success: true, data: "ok"})
    else
        return NextResponse.json({success: false, data: "The data could not be updated"})
}