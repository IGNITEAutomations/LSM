"use client"

import {useGroups} from "@/hooks/GroupsProvider";
import {useCallback, useMemo} from "react";
import {TableSkeleton} from "@/app/(logged)/_components/Table";
import queue, {QueueItem, QueueTypes} from "@/lib/Queue/queue";
import {useSteamSkills} from "@/hooks/SkillsProvider/SteamSkillsProvider";
import Navigation from "@/app/(logged)/_components/nav";
import SkillsTable from "@/app/(logged)/(teacher)/_components/SkillstTable";
import SavedIndicator from "@/app/(logged)/(teacher)/_components/SavedIndicator";
import {useSearchParams} from "next/navigation";

const NUM_COLS = 6

export default function SteamSkillsPage() {
    const groups = useGroups();
    const skills = useSteamSkills();
    const groupId = useSearchParams().get("id") ?? ""

    const handleChange = useCallback((row: number, col: number, id: string, value: string, prevValue?: string) => {
        const reWrite = skills.skillsMatrix[row].skills[col].value
        skills.setSkillValue(row, col, id, value)
        const queueItem: QueueItem = {
            type: QueueTypes.SKILLS,
            data: {
                studentId: skills.skillsMatrix[row].student.id,
                evaluationId: id,
                value: value,
                prevValue:  reWrite != "" ? prevValue : undefined
            }
        }
        queue.add(queueItem)
    }, [skills]);

    const headers = useMemo(() => [...Array(NUM_COLS)].map((_, i) => `STEAM Skill ${i + 1}`), []);

    return (
        <main className="flex flex-col max-h-[650px]">
            <SavedIndicator/>
            <Navigation groupId={groupId}/>
            <h1>STEAM Skills</h1>
            <h2>{groups.getGroupName(groupId)}</h2>
            <section className="mt-8 flex-1 overflow-y-auto">
                {!skills.loaded ? (
                    <TableSkeleton headerName={"Challenge"} nCols={6} nRows={3}/>) : skills.skillsMatrix.length === 0 ? (
                    <p className="text-red-500">
                        No students assigned to this group have been found.
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