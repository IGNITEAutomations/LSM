"use client"

import {Button} from "@/components/ui/button";
import Image from "next/image";
import FirebaseClient from "@/lib/Firebase/Client/AuthClient";

export default function Login() {
    return (
        <main className={"w-screen h-screen bg-gray-100 flex justify-center items-center"}>
            <section className={"w-1/3  bg-white flex flex-col border border-gray-200 rounded-lg py-20 px-10 gap-8"}>
                <Image src={"/ignite_logo.png"} alt={"ignite logo"} width={150} height={200}/>
                <div className={"flex flex-col h-full w-full items-center"}>
                    <div className={"flex flex-col w-full h-full gap-20"}>
                        <div>
                            <h1 className={"text-3xl"}>Login</h1>
                            <h2 className={"text-lg"}>to get started</h2>
                        </div>
                        <Button
                            className={"bg-gradient-to-r from-blue-600 to-blue-700 text-xs font-light"}
                            onClick={() => FirebaseClient.signIn()}
                        >
                            Continue
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    )
}