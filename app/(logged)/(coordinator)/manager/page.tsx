"use client";

import {useEffect, useMemo} from "react";
import {useGroups} from "@/hooks/GroupsProvider";
import ReturnBtn from "@/app/(logged)/(coordinator)/_components/Nav";
import StudentsTable from "@/app/(logged)/(coordinator)/_components/StudentsTable";
import {AddStudent} from "@/app/(logged)/(coordinator)/_components/AddStudent";
import {useUser} from "@/hooks/UserProvider";
import {UserRoles} from "@/lib/User/utils/users_roles";
import {useRouter, useSearchParams} from "next/navigation";

export default function StudentsManagerPage() {
  const params = useSearchParams();
    const groupId = params.get("id") ?? "";
    const p = parseInt(params.get("p") ?? "0");

    const groups = useGroups();
    const user = useUser();
    const router = useRouter();

    const className = useMemo(() => groups.getGroupName(groupId), [groupId, groups]);

    useEffect(() => {
        if (user.loaded && user.role === UserRoles.Teacher) {
            router.push("/");
        }
    }, [user, router]);

    return (<section>
        <ReturnBtn groupId={groupId} p={p}/>
        <h1>Student Manager</h1>
        <h2>{className}</h2>
        <AddStudent groupId={groupId}/>
        <section className="mt-8 flex-1 overflow-y-auto">
            <StudentsTable groupId={groupId}/>
        </section>
    </section>);
}