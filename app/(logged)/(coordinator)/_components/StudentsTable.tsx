import {StudentData} from "@/utils/types/types";
import {Table, TBody, TCell, THead, TRow} from "@/app/(logged)/_components/Table";
import {Plus, X} from "lucide-react";
import {Button} from "@/components/ui/button";
import {NotificationColor, setNotification} from "@/lib/Notification/ClientNotification";
import {useState, useCallback} from "react";

type StudentsTableProps = {
    students: StudentData[]; onChangeStatus: (id: number, value: boolean) => void;
};

const headers = ["Name", "Email", "Password", "Activated", "Action"];

export default function StudentsTable({students, onChangeStatus}: StudentsTableProps) {
    const [disable, setDisable] = useState<boolean>(false);

    const handleActivateStatusStudent = useCallback(async (id: number, value: boolean) => {
        setDisable(true);
        try {
            const response = await fetch("/api/groups/students/post/active", {
                method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({id, value}),
            });

            if (!response.ok) throw new Error("Connection error");

            const data = await response.json();
            if (!data.success) throw new Error(`Server returned an error: ${data.error}`);

            onChangeStatus(id, value);
        } catch (error) {
            console.error(error);
            setNotification("The request could not be sent", NotificationColor.ERROR);
        } finally {
            setDisable(false);
        }
    }, [onChangeStatus]);

    return (<Table>
            <THead empty={true} headers={headers}/>
            <TBody>
                {students.map((student) => (<TRow key={student.id}>
                        <TCell>{student.name}</TCell>
                        <TCell>{student.email}</TCell>
                        <TCell>{student.password}</TCell>
                        <TCell>{student.activated ? "Yes" : "No"}</TCell>
                        <TCell>
                            <Button
                                disabled={disable}
                                className={"bg-transparent h-10 w-10 p-0 hover:bg-transparent"}
                                onClick={() => handleActivateStatusStudent(student.id, !student.activated)}
                            >
                                {student.activated ? (<X className="h-4 w-4 text-red-500 hover:text-red-700"/>) : (
                                    <Plus className="h-4 w-4 text-green-500 hover:text-green-700"/>)}
                            </Button>
                        </TCell>
                    </TRow>))}
            </TBody>
        </Table>);
}