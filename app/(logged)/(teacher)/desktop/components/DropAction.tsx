import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {EllipsisVertical, X} from "lucide-react";

export default function DropAction({remove}: {remove: (e?: any) => void}) {
    return (
        <DropdownMenu>
        <DropdownMenuTrigger  className={"flex flex-row items-center gap-3 focus:outline-none"}>
           <div className={"bg-transparent flex justify-center items-center h-10 w-10"}>
               <EllipsisVertical className={"h-4 text-gray-500"}/>
           </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent side={"bottom"} align={"end"} className={"w-max"}>
            <DropdownMenuItem onClick={remove}>
                <X className={"h-4"}/>
                <p className={"text-xs"}>Delete</p>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    )
}