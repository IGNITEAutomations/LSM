"use client";

import {useEffect, useMemo, useState, useCallback} from "react";
import {useClasses} from "@/hooks/ClassesProvider";
import ReturnBtn from "@/app/(logged)/(coordinator)/_components/Nav";
import {StudentData} from "@/utils/types/types";
import {NotificationColor, setNotification} from "@/lib/Notification/ClientNotification";
import StudentsTable from "@/app/(logged)/(coordinator)/_components/StudentsTable";
import {TableSkeleton} from "@/app/(logged)/_components/Table";
import {AddStudent} from "@/app/(logged)/(coordinator)/_components/AddStudent";
import {useUser} from "@/hooks/UserProvider";
import {UserRoles} from "@/lib/User/utils/users_roles";
import {useRouter, useSearchParams} from "next/navigation";


export default function StudentsManagerPage() {
  const params = useSearchParams();
    const classId = params.get("id") ?? "";
    const p = parseInt(params.get("p") ?? "0");
    const [students, setStudents] = useState<StudentData[]>([]);
    const [loaded, setLoaded] = useState(false);
    const classes = useClasses();
    const user = useUser();
    const router = useRouter();

    const className = useMemo(() => classes.getClassName(classId), [classId, classes]);

    const fetchStudents = useCallback(async () => {
        try {
            const response = await fetch(`/api/groups/students/get?id=${classId}`);
            if (!response.ok) throw new Error("Connection error");

            const data = await response.json();
            if (!data.success) throw new Error("The request was rejected by the server");

            setStudents(data.data);
            setLoaded(true);
        } catch (error) {
            setNotification("Failed to load student information", NotificationColor.ERROR);
            console.error(error);
        }
    }, [classId]);

    useEffect(() => {
        if (students.length === 0) {
            fetchStudents();
        }
    }, [students.length, fetchStudents]);

    const handleStudentsStatusChange = useCallback((id: number, value: boolean) => {
        setStudents((prevState) => prevState.map((student) => student.id === id ? {
            ...student, activated: value
        } : student));
    }, []);

    useEffect(() => {
        if (user.loaded && user.role === UserRoles.Teacher) {
            router.push("/");
        }
    }, [user, router]);

    if (!loaded || !user.loaded) {
        return (<TableSkeleton headers={["Name", "Email", "Password", "Activated", "Action"]} nRows={3}/>);
    }

    return (<section>
        <ReturnBtn classId={classId} p={p}/>
        <h1>Student Manager</h1>
        <h2>{className}</h2>
        <AddStudent classId={classId}/>
        <section className="mt-8 flex-1 overflow-y-auto">
            <StudentsTable onChangeStatus={handleStudentsStatusChange} students={students}/>
        </section>
    </section>);
}