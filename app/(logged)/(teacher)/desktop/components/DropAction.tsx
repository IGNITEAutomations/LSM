"use client"

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {EllipsisVertical, Settings2, X} from "lucide-react";
import {useClasses} from "@/hooks/ClassesProvider";
import {useCallback} from "react";
import {useRouter} from "next/navigation";

type DropActionProps = {
    classId: string,
    isCoordinator?: boolean
}

export default function DropAction({classId, isCoordinator = false}: DropActionProps) {
    const classes = useClasses()
    const router = useRouter()

    const handleDelete = useCallback(() => {
        classes.removeGroup(classId)
    }, [classes, classId]);

    const handleStudentManager = useCallback(() => {
        router.push(`/manager?id=${classId}&p=0`)
    }, [router, classId]);

    return (
        <DropdownMenu>
        <DropdownMenuTrigger  className={"flex flex-row items-center gap-3 focus:outline-none"}>
           <div className={"bg-transparent flex justify-center items-center h-10 w-10"}>
               <EllipsisVertical className={"h-4 text-gray-500"}/>
           </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent side={"bottom"} align={"end"} className={"w-max"}>
            <DropdownMenuItem onClick={(e) => {e.stopPropagation(); handleDelete()}}>
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