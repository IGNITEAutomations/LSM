"use client"

import {useClasses} from "@/hooks/ClassesProvider";
import {useSoftSkills} from "@/hooks/SkillsProvider/SoftSkillsProvider";
import {useCallback, useMemo} from "react";
import {TableSkeleton} from "@/app/(logged)/_components/Table";
import queue, {QueueItem, QueueTypes} from "@/lib/Queue/queue";
import Navigation from "@/app/(logged)/_components/nav";
import SkillsTable from "@/app/(logged)/(teacher)/_components/SkillstTable";
import SavedIndicator from "@/app/(logged)/(teacher)/_components/SavedIndicator";
import {useSearchParams} from "next/navigation";

const NUM_COLS = 3

export default function SoftSkillsPage() {
    const classes = useClasses();
    const skills = useSoftSkills();
    const classId = useSearchParams().get("id") ?? ""

    const handleChange = useCallback((row: number, col: number, id: string, value: string) => {
        skills.setSkillValue(row, col, value)
        const queueItem: QueueItem = {
            type: QueueTypes.SKILLS,
            data: {
                studentId: skills.skillsMatrix[row].student.id,
                evaluationId: id,
                value: value
            }
        }
        queue.add(queueItem)
    }, [skills]);

    const headers = useMemo(() => [...Array(NUM_COLS)].map((_, i) => `Soft Skill ${i + 1}`), []);

    return (
        <main className="flex flex-col max-h-[650px]">
            <SavedIndicator/>
            <Navigation classId={classId}/>
            <h1>Soft Skills</h1>
            <h2>{classes.getClassName(classId)}</h2>
            <section className="mt-8 flex-1 overflow-y-auto">
                {!skills.loaded ? (
                    <TableSkeleton headerName={"Challenge"} nCols={4} nRows={3}/>) : skills.skillsMatrix.length === 0 ? (
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
