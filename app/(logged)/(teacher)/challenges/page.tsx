"use client"

import ChallengesTable from "@/app/(logged)/(teacher)/challenges/table";
import queue, {QueueItem, QueueTypes} from "@/lib/Queue/queue";
import {useClasses} from "@/hooks/ClassesProvider";
import {useChallenges} from "@/hooks/ChallengesProvider";
import {Suspense} from "react";
import Navigation from "@/app/(logged)/_components/nav";

export default function ChallengesPage({searchParams}: { searchParams: { id: string }}) {
    const classId = searchParams.id
    const challenges = useChallenges()
    const classes = useClasses()

    const handleChange = (row: number, col: number, value:boolean) => {
        challenges.setChallengeValue(row, col, value)

        const queueItem: QueueItem = {
            type: QueueTypes.CHALLENGES,
            data: {
                studentId: challenges.challengesMatrix[row].student.id as number,
                evaluationId: challenges.challengesMatrix[row].challenges[col].id,
                value: value
            }
        }
        queue.add(queueItem)
    }

    return (
        <main className={"flex flex-col max-h-[650px]"}>
            <Navigation classId={classId}/>
            <h1>Challenges</h1>
            <h2>{classes.getClassName(classId)}</h2>
            <section className={"mt-8 flex-1 overflow-y-auto"}>
                 <ChallengesTable matrix={challenges.challengesMatrix} headers={challenges.challengesHeader} onChange={handleChange}/>
            </section>
        </main>
    )
}