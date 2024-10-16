"use client"

import {Button} from "@/components/ui/button";
import Image from "next/image";
import FirebaseClient from "@/lib/Firebase/Client/AuthClient";
import {useRouter, useSearchParams} from 'next/navigation'
import {NotificationColor, setNotification} from "@/lib/Notification/ClientNotification";
import {useState} from "react";

export default function Login() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [loginEnabled, setLoginEnabled] = useState<boolean>(true)


    function signIn() {
        setLoginEnabled(false)
        FirebaseClient.signIn().then((response) => {
            if (response.success) {
                const groupId = searchParams.get("groupId")
                router.push(`/desktop${groupId ? "?groupId=" + groupId : ""}`)
            }
            else{
                FirebaseClient.signOut().then()
                setNotification(response.error, NotificationColor.ERROR)
            }
            setLoginEnabled(true)
        }).catch(() => {
            setNotification("An error has occurred during the session. Contact the administrator", NotificationColor.ERROR)
            setLoginEnabled(true)
        })
    }

    return (
        <main className={"w-screen h-screen bg-gray-100 flex justify-center items-center"}>
            <section className={"w-1/3 bg-white flex flex-col border border-gray-200 rounded-lg py-20 px-10 gap-8"}>
                <Image src={"/img/ignite_logo.png"} alt={"ignite logo"} width={150} height={200}/>
                <div className={"flex flex-col h-full w-full items-center"}>
                    <div className={"flex flex-col w-full h-full gap-20"}>
                        <div>
                            <h1 className={"text-3xl"}>Login</h1>
                            <h2 className={"text-lg"}>to get started</h2>
                        </div>
                        <Button
                            className={"bg-gradient-to-r from-[#4697da] to-[#2180c1] text-sm rounded-3xl gap-3"}
                            onClick={signIn}
                            disabled={!loginEnabled}
                        >
                            <svg className={"fill-white w-4 h-4"} xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 488 512">
                                <path
                                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
                            </svg>
                            Sign in
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    )
}