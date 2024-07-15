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
        <header className={"flex flex-row justify-between items-center px-20 py-8 sticky top-0 bg-white"}>
            <Image src={"/ignite_logo.png"} alt={"ignite logo"} width={100} height={100}/>
            <div className={"flex flex-row gap-2 items-center"}>
                <p className={"text-sm text-gray-700"}>{UserClient.displayName}</p>
                <DropdownMenu>
                    <DropdownMenuTrigger className={"flex flex-row items-center gap-3 focus:outline-none"}>
                        <div className={"flex flex-row"}>
                            <img src={UserClient.avatar} alt={"user avatar"} className={"w-7 h-7 rounded-3xl"}/>
                            <ChevronDown className={"h-7 text-gray-600 stroke-1"}/>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className={"w-max"}>
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