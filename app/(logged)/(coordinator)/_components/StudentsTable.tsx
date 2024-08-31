import {StudentData} from "@/utils/types/types";
import {Table, TBody, TCell, THead, TRow} from "@/app/(logged)/_components/Table";
import {Plus, X} from "lucide-react";
import {Button} from "@/components/ui/button";
import {NotificationColor, setNotification} from "@/lib/Notification/ClientNotification";

type StudentsTableProps = {
    students: StudentData[];
    onChangeStatus: (id: number, value: boolean) => void
}

const headers = ["Name", "Email", "Password", "Activated", "Action"];
export default function StudentsTable({students, onChangeStatus}: StudentsTableProps) {
    const handleActivateStatusStudent = async (id: number, value: boolean) => {
        try {
            fetch("/api/groups/students/post/active", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({id: id, value: value})
            }).then(response => {
                if (!response.ok) throw new Error("connection error")
                response.json().then(data => {
                    if (!data.success) throw new Error("server returned an error: " + data.error)
                    onChangeStatus(id, value)
                })
            })
        } catch (error) {
            console.error(error)
            setNotification("The request could not be sent", NotificationColor.ERROR)
        }
    }

    return (
        <Table>
            <THead empty={true} headers={headers}/>
            <TBody>
                {students.map((student) => (<TRow key={student.id}>
                    <TCell>{student.name}</TCell>
                    <TCell>{student.email}</TCell>
                    <TCell>{student.password}</TCell>
                    <TCell>{student.activated ? "Yes" : "No"}</TCell>
                    <TCell>{student.activated ? <Button className={"bg-transparent h-10 w-10 p-0 hover:bg-transparent"}
                                                        onClick={() => handleActivateStatusStudent(student.id, false)}><X
                            className={"h-4 w-4 text-red-500 hover:text-red-700"}/></Button> :
                        <Button className={"bg-transparent h-10 w-10 p-0 hover:bg-transparent"}
                                onClick={() => handleActivateStatusStudent(student.id, true)}><Plus
                            className={"h-4 w-4 text-green-500 hover:text-green-700"}/></Button>}</TCell>
                </TRow>))}
            </TBody>
    </Table>);
}