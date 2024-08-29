"use client"

import Navigation from "@/app/(logged)/_components/nav";
import {useClasses} from "@/hooks/ClassesProvider";
import {useSoftSkills} from "@/hooks/SkillsProvider/SoftSkillsProvider";
import ComboBox from "@/app/(logged)/(teacher)/_components/ComboBox";
import {useCallback, useMemo} from "react";
import {Table, TBody, TCell, THead, TRow} from "@/app/(logged)/(teacher)/_components/Table";
import queue, {QueueItem, QueueTypes} from "@/lib/Queue/queue";

const NUM_COLS = 3

export default function SoftSkillsPage({searchParams}: { searchParams: { id: string } }) {
    const classes = useClasses();
    const skills = useSoftSkills();
    const {id: classId} = searchParams;

    const handleChange = useCallback((row: number, col: number, value: string) => {
        skills.setSkillValue(row, col, value)
        const queueItem: QueueItem = {
            type: QueueTypes.SKILLS,
            data: {
                studentId: 1,//skills.skillsMatrix[row].student.id as number ?? 1,
                evaluationId: skills.skillsMatrix[row].skills[col].id as string,
                value: value
            }
        }
        queue.add(queueItem)
    }, []);

    const headers = useMemo(() => [...Array(NUM_COLS)].map((_, i) => `Soft Skill ${i + 1}`), []);

    return (
        <main className="flex flex-col max-h-[650px]">
            <Navigation classId={classId}/>
            <h1>Soft Skills</h1>
            <h2>{classes.getClassName(classId)}</h2>
            <section className="mt-8 flex-1 overflow-y-auto">
                <Table>
                    <THead headers={headers} numCols={3}/>
                    <TBody>
                        {skills.skillsMatrix.map((row, rowIndex) => (
                            <TRow key={rowIndex}>
                                <TCell>
                                    <p className={"w-full pl-2 text-left"}>{row.student.displayName}</p>
                                </TCell>
                                {row.skills.map((_, colIndex) => (<TCell key={colIndex}>
                                        <ComboBox options={skills.skillsOptions} onChange={(value) => handleChange(rowIndex, colIndex, value)}/>
                                    </TCell>))}
                            </TRow>))}
                    </TBody>
                </Table>
            </section>
        </main>
    );
}