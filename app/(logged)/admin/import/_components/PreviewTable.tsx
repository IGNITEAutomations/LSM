import {StudentList} from "@/utils/functions/ProcessImportData";
import {Table, TBody, TCell, THead, TRow} from "@/app/(logged)/_components/Table";
import {Input} from "@/components/ui/input";

type StudentTable = StudentList & {
    id: number
}

const tableHeaders = ["Email", "Password", "Name", "Surname", "Role", "Active", "Group Id"];
export default function PreviewTable({data}: {data: StudentTable[]}) {
    console.log("Preview table")
    console.log(data)
    return (
        <Table>
        <THead empty={true} headers={tableHeaders}/>
        <TBody>
            {data?.map((student, i) => (<TRow key={i}>
                <TCell>{student.email}</TCell>
                <TCell>{student.password}</TCell>
                <TCell>{student.name}</TCell>
                <TCell>{student.surname}</TCell>
                <TCell>{student.role}</TCell>
                <TCell>{student.activated.toString()}</TCell>
                <TCell>{student.groupId}</TCell>
            </TRow>))}
        </TBody>
    </Table>
    )
}