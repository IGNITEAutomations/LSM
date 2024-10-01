import {StudentList} from "@/utils/functions/ProcessImportData";
import {Table, TBody, TCell, THead, TRow} from "@/app/(logged)/_components/Table";
import {Input} from "@/components/ui/input";
import {X} from "lucide-react";
import {TableStudent} from "@/app/(logged)/admin/import/page";
import {ChangeEvent} from "react";


const tableHeaders = ["Email", "Password", "Name", "Surname", "Role", "Group Id", "Active", "Remove"];

type IncompleteTableProps = {
    data: (StudentList & { id: number })[],
    removeStudent: (id: number) => void,
    change: (id: number, key: keyof TableStudent, value: TableStudent[keyof TableStudent]) => void
}

export default function IncompleteTable({data, removeStudent, change}: IncompleteTableProps) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>, id: number, key: keyof TableStudent) => {
        console.log(`ID: ${id}; KEY: ${key}; VALUE: ${e.target.value}`)
        change(id, key, e.target.value)
    }

    console.log("TABLE")
    console.log(data)

    return (<Table>
            <THead empty={true} headers={tableHeaders}/>
            <TBody>
                {data?.map((student) => (
                    <TRow key={student.id + "student"}>
                        <TCell>
                            <Input
                                onChange={(e) => handleChange(e, student.id, "email" )}
                                defaultValue={student.email ?? ""}
                                className={"w-36"}
                            />
                        </TCell>
                        <TCell>{student.password}</TCell>
                        <TCell>{student.name ?? ""}</TCell>
                        <TCell>{student.surname ?? ""}</TCell>
                        <TCell>{student.role}</TCell>
                        <TCell>{student.groupId ?? ""}</TCell>
                        <TCell>
                            <div className={"min-w-16"}>
                                <input
                                    type={"checkbox"}
                                    onChange={(e) => handleChange(e, student.id, "activated")}
                                    defaultChecked={student.activated}
                                    className={"bg-white w-4 h-4"}
                                />
                            </div>
                        </TCell>
                        <TCell>
                            <div className={"flex flex-row gap-2"}>
                                <button
                                    title={"Remove student from the temporary list."}
                                    className={"w-5 h-5 text-red-500"}
                                >
                                    <X className={"w-5 h-5"} onClick={() => removeStudent(student.id)}/>
                                </button>
                            </div>
                        </TCell>
                    </TRow>
                ))}
            </TBody>
        </Table>)
}