"use client"

import capitalizeFirstLetter from "@/utils/capitalize";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {ChevronDown, LogOut} from "lucide-react";
import {useUser} from "@/hooks/UserProvider";
import FirebaseClient from "@/lib/Firebase/Client/AuthClient";
import {NotificationColor, setNotification} from "@/lib/Notification/ClientNotification";
import {useRouter} from "next/navigation";

export default function Header() {
    const user = useUser()
    const router = useRouter()

    function logout() {
       FirebaseClient.signOut().then((response) => {
           if (response.success)
                router.push("/login")
           else
               setNotification(response.error, NotificationColor.ERROR)
       })
    }

    return (
        <header className={"h-fit w-full flex flex-row bg-gray-50 items-center justify-end px-10 mt-8 mb-4 top-0 sticky"}>
            <div className={"flex flex-row gap-4 items-center"}>
                <p className={"text-sm text-black font-semibold"}>{capitalizeFirstLetter(user.displayName)}</p>
                <DropdownMenu>
                    <DropdownMenuTrigger className={"flex flex-row items-center gap-3 focus:outline-none"}>
                        <div className={"flex flex-row"}>
                            <img src={user.avatar} alt={"user avatar"} className={"w-9 h-9 rounded-3xl"}/>
                            <ChevronDown className={"h-9 text-gray-600 stroke-1"}/>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side={"bottom"} align={"end"} className={"w-max"}>
                        <DropdownMenuItem onClick={logout}>
                            <LogOut className={"h-4"}/>
                            <p className={"text-xs"}>Log out</p>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}