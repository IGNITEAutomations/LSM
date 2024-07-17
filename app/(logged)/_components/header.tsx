import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image";
import {ChevronDown, LogOut} from "lucide-react";
import UserClient from "@/lib/User/user_client";

export default function Header() {
    UserClient.initTest()
    return (
        <header className={"flex flex-row justify-between items-center px-10 py-5 sticky top-0"}>
            <Image src={"/img/ignite_logo.png"} alt={"ignite logo"} width={80} height={80}/>
            <div className={"flex flex-row gap-4 items-center"}>
                <p className={"text-sm text-gray-700 font-semibold"}>{UserClient.displayName}</p>
                <DropdownMenu>
                    <DropdownMenuTrigger  className={"flex flex-row items-center gap-3 focus:outline-none"}>
                        <div className={"flex flex-row"}>
                            <img src={UserClient.avatar} alt={"user avatar"} className={"w-7 h-7 rounded-3xl"}/>
                            <ChevronDown className={"h-7 text-gray-600 stroke-1"}/>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side={"bottom"} align={"end"} className={"w-max"}>
                        <DropdownMenuItem>
                            <LogOut className={"h-4"}/>
                            <p className={"text-xs"}>Log out</p>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}