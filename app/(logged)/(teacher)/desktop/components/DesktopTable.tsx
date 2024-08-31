"use client"

import {useClasses} from "@/hooks/ClassesProvider";
import {Table, TBody, TCell, THead, TRow} from "@/app/(logged)/_components/Table";
import DropAction from "@/app/(logged)/(teacher)/desktop/components/DropAction";
import {useUser} from "@/hooks/UserProvider";
import {useCallback} from "react";
import {useRouter} from "next/navigation";
import {UserRoles} from "@/lib/User/utils/users_roles";

const headers = ["Class Id", "School", "Group", "Day", "#Students"];

export default function DesktopTable() {
    const user = useUser()
    const classes = useClasses();
    const router = useRouter();

    const handleClick = useCallback((classId: string) => {
        router.push(`/challenges?id=${classId}`);
    }, [router]);

    return (
        <Table>
            <THead headers={headers} empty={true} />
            <TBody>
                {classes.groups.map((row) => (
                    <TRow key={row.id} enableColor={true} clickEnable={true} onClick={() => handleClick(row.id)}>
                        <TCell>{row.id}</TCell>
                        <TCell>{row.school}</TCell>
                        <TCell>{row.group}</TCell>
                        <TCell>{row.day}</TCell>
                        <TCell>{row.numStudents}</TCell>
                        <TCell>
                            <DropAction classId={row.id} isCoordinator={user.role === UserRoles.Coordinator}/>
                        </TCell>
                    </TRow>
                ))}
            </TBody>
        </Table>
    );
}