"use client";

import {useCallback, useMemo} from "react";
import ChallengesTable from "@/app/(logged)/(teacher)/challenges/table";
import queue, {QueueItem, QueueTypes} from "@/lib/Queue/queue";
import {useGroups} from "@/hooks/GroupsProvider";
import {useChallenges} from "@/hooks/ChallengesProvider";
import Navigation from "@/app/(logged)/_components/nav";
import {TableSkeleton} from "@/app/(logged)/_components/Table";
import SavedIndicator from "@/app/(logged)/(teacher)/_components/SavedIndicator";
import {useSearchParams} from "next/navigation";

export default function ChallengesPage() {
    const challenges = useChallenges();
    const groups = useGroups();
    const searchParams = useSearchParams();
    const groupId = searchParams.get("id") ?? "";

    const groupName = useMemo(() => groups.getGroupName(groupId), [groupId, groups]);

    const handleChange = useCallback((row: number, col: number, value: boolean) => {
        challenges.setChallengeValue(row, col, value);

        const queueItem: QueueItem = {
            type: QueueTypes.CHALLENGES, data: {
                studentId: challenges.challengesMatrix[row].student.id,
                evaluationId: challenges.challengesMatrix[row].challenges[col].id,
                value: value,
            },
        };

        queue.add(queueItem);
    }, [challenges]);

    return (<main className="flex flex-col max-h-[650px]">
            <SavedIndicator/>
            <Navigation groupId={groupId}/>
            <h1>Challenges</h1>
            <h2>{groupName}</h2>
            <section className="mt-8 flex-1 overflow-y-auto">
                {!challenges.loaded ? (<TableSkeleton headerName="Challenge" nCols={4}
                                                      nRows={3}/>) : challenges.challengesMatrix.length === 0 ? (
                    <p className="text-red-500">
                        No students have been assigned to this group.
                    </p>) : (<ChallengesTable
                        matrix={challenges.challengesMatrix}
                        headers={challenges.challengesHeader}
                        onChange={handleChange}
                    />)}
            </section>
        </main>);
}