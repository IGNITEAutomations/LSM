"use client"

import {useGroups} from "@/hooks/GroupsProvider";
import {useCallback, useMemo} from "react";
import {TableSkeleton} from "@/app/(logged)/_components/Table";
import queue, {QueueItem, QueueTypes} from "@/lib/Queue/queue";
import {useMentions} from "@/hooks/SkillsProvider/MentionsProvider";
import Navigation from "@/app/(logged)/_components/nav";
import SkillsTable from "@/app/(logged)/(teacher)/_components/SkillstTable";
import SavedIndicator from "@/app/(logged)/(teacher)/_components/SavedIndicator";
import {useSearchParams} from "next/navigation";

const NUM_COLS = 2

export default function MentionsSkillsPage() {
    const groups = useGroups();
    const skills = useMentions();
    const groupId = useSearchParams().get("id") ?? ""

    const handleChange = useCallback((row: number, col: number, id: string, value: string, prevValue?: string) => {
        const reWrite = skills.skillsMatrix[row].skills[col].value
        skills.setSkillValue(row, col, id, value)
        const queueItem: QueueItem = {
            type: QueueTypes.MENTIONS,
            data: {
                studentId: skills.skillsMatrix[row].student.id,
                evaluationId: id,
                value: value,
                prevValue:  reWrite != "" ? prevValue : undefined
            }
        }
        queue.add(queueItem)
    }, [skills]);

    const headers = useMemo(() => [...Array(NUM_COLS)].map((_, i) => `Mention ${i + 1}`), []);

    return (
        <main className="flex flex-col max-h-[650px]">
            <SavedIndicator/>
            <Navigation groupId={groupId}/>
            <h1>Mentions</h1>
            <h2>{groups.getGroupName(groupId)}</h2>
            <section className="mt-8 flex-1 overflow-y-auto">
                {!skills.loaded ? (
                    <TableSkeleton headerName={"Challenge"} nCols={2} nRows={3}/>) : skills.skillsMatrix.length === 0 ? (
                    <p className="text-red-500">
                        No students have been assigned to this group.
                    </p>) : (<SkillsTable
                        matrix={skills.skillsMatrix}
                        headers={headers}
                        options={skills.skillsOptions}
                        onChange={handleChange}
                    />)
                }
            </section>
        </main>
    );
}