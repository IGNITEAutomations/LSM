import {FC} from "react";
import {SkillsDataRow} from "@/hooks/SkillsProvider/CommonProvider";
import {Option} from "@/utils/types/types";
import {Table, TBody, TCell, THead, TRow} from "@/app/(logged)/_components/Table";
import ComboBox from "@/app/(logged)/(teacher)/_components/ComboBox";

type SkillsTableProps = {
    headers: string[];
    matrix: SkillsDataRow[];
    options: Option[];
    onChange: (row: number, col: number, id: string, value: string, prevValue: string) => void;
};

export default function SkillsTable({headers, matrix, options, onChange}: SkillsTableProps) {
    return (<Table>
            <THead headers={headers}/>
            <TBody>
                {matrix.map((row, rowIndex) => (
                    <TRow key={rowIndex}>
                        <TCell>
                            <p className="w-full pl-2 text-left">{row.student.displayName}</p>
                        </TCell>
                        {row.skills.map((skill, colIndex) => (
                            <TCell key={colIndex}>
                                <ComboBox
                                    options={options}
                                    defaultValue={skill.id}
                                    onChange={(id, value, prevValue) => onChange(rowIndex, colIndex, id, value, prevValue)}
                                />
                            </TCell>))
                        }
                        {
                            (row.skills.length < 3) ? (
                                [...Array(3 - row.skills.length)].map((_,i) => (
                                    <TCell key={"cell" + i}>
                                        <div className={"w-[250px]"}/>
                                    </TCell>
                                ))
                            ): null
                        }
                    </TRow>))}
            </TBody>
        </Table>);
}