"use client";

import {useCallback, useMemo} from "react";
import ChallengesTable from "@/app/(logged)/(teacher)/challenges/table";
import queue, {QueueItem, QueueTypes} from "@/lib/Queue/queue";
import {useClasses} from "@/hooks/ClassesProvider";
import {useChallenges} from "@/hooks/ChallengesProvider";
import Navigation from "@/app/(logged)/_components/nav";
import {TableSkeleton} from "@/app/(logged)/(teacher)/_components/Table";

interface ChallengesPageProps {
    searchParams: { id: string };
}

const ChallengesPage: React.FC<ChallengesPageProps> = ({searchParams}) => {
    const {id: classId} = searchParams;
    const challenges = useChallenges();
    const classes = useClasses();

    const className = useMemo(() => classes.getClassName(classId), [classId, classes]);

    const handleChange = useCallback((row: number, col: number, value: boolean) => {
        challenges.setChallengeValue(row, col, value);

        const queueItem: QueueItem = {
            type: QueueTypes.CHALLENGES,
            data: {
                studentId: challenges.challengesMatrix[row].student.id,
                evaluationId: challenges.challengesMatrix[row].challenges[col].id,
                value: value
            },
        };
        queue.add(queueItem);
    }, [challenges]);

    return (
        <main className="flex flex-col max-h-[650px]">
            <Navigation classId={classId}/>
            <h1>Challenges</h1>
            <h2>{className}</h2>
            <section className="mt-8 flex-1 overflow-y-auto">
                {!challenges.loaded ? (
                    <TableSkeleton headerName={"Challenge"} nCols={4} nRows={3}/>) : challenges.challengesMatrix.length === 0 ? (
                    <p className="text-red-500">
                        No students assigned to this group have been found.
                    </p>) : (<ChallengesTable
                        matrix={challenges.challengesMatrix}
                        headers={challenges.challengesHeader}
                        onChange={handleChange}
                    />)}
            </section>
        </main>);
};

export default ChallengesPage;