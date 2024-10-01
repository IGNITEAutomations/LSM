"use client"

import {useGroups} from "@/hooks/GroupsProvider";
import {Table, TBody, TCell, THead, TRow} from "@/app/(logged)/_components/Table";
import DropAction from "@/app/(logged)/(teacher)/desktop/components/DropAction";
import {useUser} from "@/hooks/UserProvider";
import {useCallback} from "react";
import {useRouter} from "next/navigation";
import {UserRoles} from "@/lib/User/utils/users_roles";

const headers = ["Group Id", "School", "Group", "Day", "#students", ""];

export default function DesktopTable() {
    const user = useUser()
    const groups = useGroups();
    const router = useRouter();

    const handleClick = useCallback((groupId: string) => {
        router.push(`/challenges?id=${groupId}`);
    }, [router]);

    if (!groups.loaded) {
        return (
            <Table>
                <THead headers={headers} empty={true}/>
                <TBody>
                    {[...Array(3)].map((_, i) => (
                        <TRow key={i}>
                            {[...Array(headers.length)].map((_, j) => (
                                <TCell key={j}>
                                    <div className={"w-full h-8 flex justify-center items-center"}>
                                        <div className={"w-[80%] h-4 animate-pulse bg-gray-200 rounded-3xl"}/>
                                    </div>
                                </TCell>
                            ))}
                        </TRow>
                    ))}
                </TBody>
            </Table>
        )
    } else {
        return (
        <Table>
            <THead headers={headers} empty={true} />
            <TBody>
                {groups.groups.map((row) => (
                    <TRow key={row.id} enableColor={true} clickEnable={true} onClick={() => handleClick(row.id)}>
                        <TCell>{row.id}</TCell>
                        <TCell>{row.school}</TCell>
                        <TCell>{row.group}</TCell>
                        <TCell>{row.day}</TCell>
                        <TCell>{row.numStudents}</TCell>
                        <TCell>
                            <DropAction groupId={row.id} isCoordinator={user.role === UserRoles.Coordinator}/>
                        </TCell>
                    </TRow>
                ))}
            </TBody>
        </Table>
    );
    }
}