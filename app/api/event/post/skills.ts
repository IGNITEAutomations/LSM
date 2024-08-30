import {QueueDataItem} from "@/lib/Queue/queue";
import Classes from "@/lib/DB/Classes/classes";
import {NextResponse} from "next/server";

export default async function updateStudentSkills(data: QueueDataItem[]) {
    const response = await Classes.updateStudentsSkills(data)
    if (response)
        return NextResponse.json({success: true, data: "ok"})
    else
        return NextResponse.json({success: false, data: "The data could not be updated"})
}