"use client";

import {useEffect, useMemo} from "react";
import {useClasses} from "@/hooks/ClassesProvider";
import ReturnBtn from "@/app/(logged)/(coordinator)/_components/Nav";
import StudentsTable from "@/app/(logged)/(coordinator)/_components/StudentsTable";
import {AddStudent} from "@/app/(logged)/(coordinator)/_components/AddStudent";
import {useUser} from "@/hooks/UserProvider";
import {UserRoles} from "@/lib/User/utils/users_roles";
import {useRouter, useSearchParams} from "next/navigation";

export default function StudentsManagerPage() {
  const params = useSearchParams();
    const classId = params.get("id") ?? "";
    const p = parseInt(params.get("p") ?? "0");

    const classes = useClasses();
    const user = useUser();
    const router = useRouter();

    const className = useMemo(() => classes.getClassName(classId), [classId, classes]);

    useEffect(() => {
        if (user.loaded && user.role === UserRoles.Teacher) {
            router.push("/");
        }
    }, [user, router]);

    return (<section>
        <ReturnBtn classId={classId} p={p}/>
        <h1>Student Manager</h1>
        <h2>{className}</h2>
        <AddStudent classId={classId}/>
        <section className="mt-8 flex-1 overflow-y-auto">
            <StudentsTable classId={classId}/>
        </section>
    </section>);
}