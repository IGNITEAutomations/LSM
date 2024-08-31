"use client";

import {useEffect, useMemo, useState} from "react";
import {useClasses} from "@/hooks/ClassesProvider";
import ReturnBtn from "@/app/(logged)/(coordinator)/_components/nav";
import {StudentData} from "@/utils/types/types";
import {NotificationColor, setNotification} from "@/lib/Notification/ClientNotification";
import StudentsTable from "@/app/(logged)/(coordinator)/_components/StudentsTable";
import {TableSkeleton} from "@/app/(logged)/_components/Table";
import {AddStudent} from "@/app/(logged)/(coordinator)/_components/AddStudent";
import {useUser} from "@/hooks/UserProvider";
import {UserRoles} from "@/lib/User/utils/users_roles";
import {useRouter, useSearchParams} from "next/navigation";

type StudentManagerPageProps = {
  searchParams: { id: string; p: number };
};

const StudentsManagerPage: React.FC<StudentManagerPageProps> = ({
  searchParams,
}) => {
  const params = useSearchParams()
  const classId = params.get("id") ?? ""
  const p = params.get("p") ?? ""
  const [students, setStudents] = useState<StudentData[]>([]);
  const [loaded, setLoaded] = useState(false)
  const classes = useClasses();
  const user = useUser()
  const router = useRouter()

  const className = useMemo(() => classes.getClassName(classId), [classId, classes]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`/api/groups/students/get?id=${classId}`);
        if (!response.ok) throw new Error("Connection error");

        const data = await response.json();
        if (!data.success) throw new Error("The request was rejected by the server");

        setStudents(data.data);
        setLoaded(true)
      } catch (error) {
        setNotification("Failed to load student information", NotificationColor.ERROR);
        console.error(error);
      }
    };

    if (students.length === 0) {
      fetchStudents();
    }
  }, [classId, students.length]);

  const handleStudentsStatusChange = (id: number, value: boolean) => {
    if (!students) return
    setStudents(prevState => (prevState.map(student => {
      if (student.id === id) {
        const tempsStudent = {...student}
        tempsStudent.activated = value
        return tempsStudent
      } else return student
    })))
  }

  if (user.loaded && user.role == UserRoles.Teacher ) {
    router.push("/")
  } else {
    return (
      <section>
        <ReturnBtn classId={classId} p={p} />
        <h1>Student Manager</h1>
        <h2>{className}</h2>
        <AddStudent classId={classId}/>
        <section className="mt-8 flex-1 overflow-y-auto">
          {
            (loaded && user.loaded) ? <StudentsTable onChangeStatus={handleStudentsStatusChange} students={students}/> :
                <TableSkeleton headers={["Name", "Email", "Password", "Activated", "Action"]} nRows={3}/>
          }
        </section>
      </section>
  );
  }
};

export default StudentsManagerPage;