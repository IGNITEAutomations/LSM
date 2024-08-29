import {ChallengeDataRow} from "@/hooks/ChallengesProvider";

type ChallengesTableProps = {
    matrix: ChallengeDataRow[],
    headers: string[],
    onChange: (row: number, col: number, value: boolean) => void
}

export default function ChallengesTable({matrix, headers, onChange}: ChallengesTableProps) {

    return (
        <table className={"w-full"}>
            <thead>
            <tr className={"h-10 text-sm text-blue-1001 border-b border-b-gray-200"}>
                <th className={"w-[20%] pl-2 text-left"}>Students</th>
                {headers?.map((header, index) => {
                    return (<th className={"font-semibold"} key={index}>{header}</th>)
                })}
            </tr>
            </thead>
            <tbody>
            {
                matrix?.map((row, i) => {
                    return (
                        <tr key={i} className={"odd:bg-white even:bg-[#F2F8FF] text-sm h-10"}>
                            <td className={"pl-2"}>{row.student.displayName}</td>
                            {
                                row.challenges.map((challenge, j) => {
                                    return (
                                        <td key={challenge.id} className={"text-center"}>
                                            <input type={"checkbox"} className={"h-4 w-4"} defaultChecked={challenge.value as boolean} onChange={(event) => onChange(i, j, event.currentTarget.checked)}/>
                                        </td>
                                    )
                                })
                            }
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}