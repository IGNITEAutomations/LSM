import {ChallengeDataRow} from "@/hooks/ChallengesProvider";
import {Table, TBody, TCell, THead, TRow} from "@/app/(logged)/_components/Table";

type ChallengesTableProps = {
    matrix: ChallengeDataRow[],
    headers: string[],
    onChange: (row: number, col: number, value: boolean) => void
}

export default function ChallengesTable({matrix, headers, onChange}: ChallengesTableProps) {

    return (
        <Table>
            <THead headers={headers}/>
            <TBody>
                {
                    matrix?.map(((row, i) => (
                        <TRow key={i}>
                            <TCell><p className={"w-full text-left pl-2"}>{row.student.displayName}</p></TCell>
                            {row.challenges.map(((challenge, j) => (
                                <TCell key={j}>
                                    <input type={"checkbox"} className={"h-4 w-4"}
                                           defaultChecked={challenge.value as boolean}
                                           onChange={(event) => onChange(i, j, event.currentTarget.checked)}/>
                                </TCell>
                            )))}
                        </TRow>
                    )))

                }
            </TBody>
        </Table>
    )
}