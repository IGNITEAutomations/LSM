import {DataElement, KeyValue, MatrixData} from "@/hooks/LastClassProvider";
import {Simulate} from "react-dom/test-utils";
import select = Simulate.select;

type SoftSkillsTableProps = {
    matrix: DataElement[],
    values: KeyValue[]
}

export default function SoftSkillsTable({matrix, values}:SoftSkillsTableProps) {
    const NUM_SKILLS_COLS = 3
    const headers = [...Array(NUM_SKILLS_COLS)].map(i => `Soft Skill ${i+1}`)

    return (
        <table className={"w-full"}>
            <thead>
            <tr className={"h-10 text-sm text-blue-1001 border-b border-b-gray-200"}>
                <th className={"w-[20%] pl-2 text-left"}>Students</th>
                {headers.map((title, index) => {
                    return (<th className={"font-semibold"} key={index}>{title}</th>)
                })}
            </tr>
            </thead>
            <tbody>
            {matrix.map((student, i) => {
                return (<tr key={i} className={"odd:bg-white even:bg-[#F2F8FF] text-sm h-10"}>
                        <td className={"pl-2"}>{student.student.name}</td>
                        {student.data.map((value, j) => {
                            return (<td key={j} className={"text-center"}><select defaultValue={"gola"}/></td>)
                        })}
                    </tr>)
            })}
            </tbody>
        </table>
    )
}