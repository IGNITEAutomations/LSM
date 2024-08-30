"use client"

import {useClasses} from "@/hooks/ClassesProvider";
import ComboBox from "@/app/(logged)/(teacher)/_components/ComboBox";
import {useCallback, useMemo} from "react";
import {Table, TableSkeleton, TBody, TCell, THead, TRow} from "@/app/(logged)/(teacher)/_components/Table";
import queue, {QueueItem, QueueTypes} from "@/lib/Queue/queue";
import {useMentions} from "@/hooks/SkillsProvider/MentionsProvider";
import Navigation from "@/app/(logged)/_components/nav";
import {SkillsDataRow} from "@/hooks/SkillsProvider/CommonProvider";
import {Option} from "@/utils/types/types";

const NUM_COLS = 3

export default function MentionsSkillsPage({searchParams}: { searchParams: { id: string } }) {
    const classes = useClasses();
    const skills = useMentions();
    const {id: classId} = searchParams;

    const handleChange = useCallback((row: number, col: number, id: string, value: string) => {
        skills.setSkillValue(row, col, value)
        const queueItem: QueueItem = {
            type: QueueTypes.MENTIONS,
            data: {
                studentId: skills.skillsMatrix[row].student.id,
                evaluationId: id,
                value: value
            }
        }
        queue.add(queueItem)
    }, [skills]);

    const headers = useMemo(() => [...Array(NUM_COLS)].map((_, i) => `Mention ${i + 1}`), []);

    return (
        <main className="flex flex-col max-h-[650px]">
            <Navigation classId={classId}/>
            <h1>Mentions</h1>
            <h2>{classes.getClassName(classId)}</h2>
            <section className="mt-8 flex-1 overflow-y-auto">
                {!skills.loaded ? (
                    <TableSkeleton headerName={"Challenge"} nCols={4} nRows={3}/>) : skills.skillsMatrix.length === 0 ? (
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

type SkillsTableProps = {
    headers: string[],
    matrix: SkillsDataRow[],
    options: Option[],
    onChange: (row: number, col: number, id: string, value: string) => void
}
export function SkillsTable({headers, matrix, options, onChange}: SkillsTableProps) {
    return (
        <Table>
            <THead headers={headers}/>
            <TBody>
                {matrix.map((row, rowIndex) => (
                    <TRow key={rowIndex}>
                        <TCell>
                            <p className={"w-full pl-2 text-left"}>{row.student.displayName}</p>
                        </TCell>
                        {row.skills.map((skill, colIndex) => (<TCell key={colIndex}>
                            <ComboBox options={options} defaultValue={skill.id} onChange={(id, value) => onChange(rowIndex, colIndex, id, value)}/>
                        </TCell>))}
                    </TRow>))}
            </TBody>
        </Table>
    )
}