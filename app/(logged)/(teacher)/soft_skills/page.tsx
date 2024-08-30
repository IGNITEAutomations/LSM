"use client"

import {useClasses} from "@/hooks/ClassesProvider";
import {useSoftSkills} from "@/hooks/SkillsProvider/SoftSkillsProvider";
import ComboBox from "@/app/(logged)/(teacher)/_components/ComboBox";
import {Suspense, useCallback, useMemo} from "react";
import {Table, TBody, TCell, THead, TRow} from "@/app/(logged)/(teacher)/_components/Table";
import queue, {QueueItem, QueueTypes} from "@/lib/Queue/queue";
import Navigation from "@/app/(logged)/_components/nav";

const NUM_COLS = 3

export default function SoftSkillsPage({searchParams}: { searchParams: { id: string } }) {
    const classes = useClasses();
    const skills = useSoftSkills();
    const {id: classId} = searchParams;

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
            <Navigation classId={classId}/>
            <h1>Soft Skills</h1>
            <h2>{classes.getClassName(classId)}</h2>
            <section className="mt-8 flex-1 overflow-y-auto">
                <Table>
                    <THead headers={headers}/>
                    <TBody>
                        {!skills.skillsMatrix.length ? <p className={"w-full text-sm text-red-500"}>Empty group</p> :
                            skills.skillsMatrix.map((row, rowIndex) => (
                            <TRow key={rowIndex}>
                                <TCell>
                                    <p className={"w-full pl-2 text-left"}>{row.student.displayName}</p>
                                </TCell>
                                {row.skills.map((skill, colIndex) => (<TCell key={colIndex}>
                                        <ComboBox options={skills.skillsOptions} defaultValue={skill.id} onChange={(id, value) => handleChange(rowIndex, colIndex, id, value)}/>
                                    </TCell>))}
                            </TRow>))}
                    </TBody>
                </Table>
            </section>
        </main>
    );
}