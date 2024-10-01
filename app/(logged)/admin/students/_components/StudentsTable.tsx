"use client"

import {StudentData} from "@/utils/types/types";
import {Table, TableSkeleton, TBody, TCell, THead, TRow} from "@/app/(logged)/_components/Table";
import {Plus, X} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useCallback, useEffect, useState} from "react";
import doPost from "@/lib/Fetch/Client/fetch";
import {NotificationColor, setNotification} from "@/lib/Notification/ClientNotification";

const headers = ["Name", "Email", "Password", "Activated", "Action"];

export default function StudentsTable({groupId}: {groupId: string}) {
    const [disable, setDisable] = useState<boolean>(false);
    const [loaded, setLoaded] = useState(false);

    const [students, setStudents] = useState<StudentData[]>([]);

    const handleActivateStatusStudent = useCallback(async (id: number, value: boolean) => {
        setDisable(true);
        const response = await doPost("/api/groups/students/upload/active", {id, value}, false)
        if (response.success) {
            setStudents((prevState) => prevState.map((student) => student.id === id ? {
                ...student, activated: value
            } : student));
        }
        setDisable(false);
    }, []);

    const fetchStudents = useCallback(async () => {
        try {
            const response = await fetch(`/api/groups/students/get?id=${groupId}`);
            if (!response.ok) throw new Error("Connection error");

            const data = await response.json();
            if (!data.success) throw new Error("The request was rejected by the server");

            setStudents(data.data);
            setLoaded(true);
        } catch (error) {
            setNotification("Failed to load student information", NotificationColor.ERROR);
            console.error(error);
        }
    }, [groupId]);

    useEffect(() => {
        if (students.length === 0) {
            fetchStudents();
        }
    }, [students.length, fetchStudents]);



    if (!loaded) {
        return (<TableSkeleton headers={["Name", "Email", "Password", "Activated", "Action"]} nRows={3}/>);
    }

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