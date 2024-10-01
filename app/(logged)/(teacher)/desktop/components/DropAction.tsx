"use client"

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {EllipsisVertical, Settings2, X} from "lucide-react";
import {useGroups} from "@/hooks/GroupsProvider";
import {useCallback, useState} from "react";
import {useRouter} from "next/navigation";

type DropActionProps = {
    groupId: string,
    isCoordinator?: boolean
}

export default function DropAction({groupId, isCoordinator = false}: DropActionProps) {
    const groups = useGroups()
    const router = useRouter()
    const [disable, setDisable] = useState(false)

    const handleDelete = useCallback(async() => {
        setDisable(true)
        await groups.removeGroup(groupId)
        setDisable(false)
    }, [groups, groupId]);

    const handleStudentManager = useCallback(() => {
        router.push(`/manager?id=${groupId}&p=0`)
    }, [router, groupId]);

    return (
        <DropdownMenu>
        <DropdownMenuTrigger  className={"flex flex-row items-center gap-3 focus:outline-none"}>
           <div className={"bg-transparent flex justify-center items-center h-10 w-10"}>
               <EllipsisVertical className={"h-4 text-gray-500"}/>
           </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent side={"bottom"} align={"end"} className={"w-max"}>
            <DropdownMenuItem disabled={disable} onClick={(e) => {e.stopPropagation(); handleDelete()}}>
                <X className={"h-4"}/>
                <p className={"text-xs"}>Delete</p>
            </DropdownMenuItem>
            {
                isCoordinator ? <DropdownMenuItem onClick={(e) => {e.stopPropagation(); handleStudentManager()}}>
                <Settings2 className={"h-4"}/>
                <p className={"text-xs"}>Students manager</p>
            </DropdownMenuItem> : ""
            }
        </DropdownMenuContent>
    </DropdownMenu>
    )
}