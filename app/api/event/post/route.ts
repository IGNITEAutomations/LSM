import {NextRequest, NextResponse} from "next/server";
import {QueueRequest, QueueTypes} from "@/lib/Queue/queue";
import FirebaseServer from "@/lib/Firebase/Server/AuthServer";
import updateStudentChallenges from "@/app/api/event/post/challenges";
import updateStudentSkills from "@/app/api/event/post/skills";

export async function POST(request: NextRequest) {
    try {
        const queueRequest = (await request.json()) as QueueRequest;

        if (!(queueRequest.type in QueueTypes)) {
            throw new Error("operation type not found")
        }

        const user = await FirebaseServer.currentUser();
        if (!user) {
            throw new Error("unauthenticated request")
        }

        switch (queueRequest.type) {
            case QueueTypes.CHALLENGES:
                await updateStudentChallenges(queueRequest.data);
                break;
            case QueueTypes.SKILLS:
                await updateStudentSkills(queueRequest.data)
                break;
            case QueueTypes.MENTIONS:
                await updateStudentSkills(queueRequest.data)
                break;
            case QueueTypes.BEST_OF:
                await updateStudentSkills(queueRequest.data)
                break;
        }

        return NextResponse.json({success: true, data: "ok"});

    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({success: false, error: "Internal Server Error: " + (error as Error).message});
    }
}