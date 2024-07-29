"use client"

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import Image from "next/image";
import {ChevronDown, LogOut} from "lucide-react";
import UserClient from "@/lib/User/user_client";
import FirebaseClient from "@/lib/Firebase/Client/AuthClient";
import {NotificationColor, setNotification} from "@/lib/Notification/ClientNotification";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";

export default function Header() {
    const router = useRouter()
    const [user, setUser] = useState<any>({displayName: "", avatar: ""})

    useEffect(() => {
        UserClient.init().then(() => {
            console.log("getting info")
            console.log("info: ")
            console.log(UserClient.getUser())
            console.log(UserClient)
             setUser(UserClient.getUser())
        })
    }, []);

    function logout() {
       FirebaseClient.signOut().then((response) => {
           if (response.success)
                router.push("/login")
           else
               setNotification(response.error, NotificationColor.ERROR)
       })
    }

    return (
        <header className={"flex flex-row justify-between items-center px-10 py-5 sticky top-0"}>
            <Image src={"/img/ignite_logo.png"} alt={"ignite logo"} width={80} height={80}/>
            <div className={"flex flex-row gap-4 items-center"}>
                <p className={"text-sm text-gray-700 font-semibold"}>{user.displayName}</p>
                <DropdownMenu>
                    <DropdownMenuTrigger  className={"flex flex-row items-center gap-3 focus:outline-none"}>
                        <div className={"flex flex-row"}>
                            <img src={user.avatar} alt={"user avatar"} className={"w-7 h-7 rounded-3xl"}/>
                            <ChevronDown className={"h-7 text-gray-600 stroke-1"}/>
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