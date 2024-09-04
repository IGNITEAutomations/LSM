import "../style.css";
import {UserProvider} from "@/hooks/UserProvider";
import {Suspense} from "react";
import Header from "@/app/(logged)/admin/_components/header";
import Nav from "@/app/(logged)/admin/_components/nav";

export default function RootLayout({children}: Readonly<{
    children: React.ReactNode
}>) {
    return (<Suspense>
            <UserProvider>
                <body
                    className={"max-w-screen max-h-screen w-screen h-screen flex flex-row overflow-x-hidden overscroll-y-auto bg-gray-50 "}>
                <Nav/>
                <div className={"w-[80%] flex flex-col max-h-screen overflow-y-auto"}>
                    <Header/>
                    <main className={"flex flex-col grow px-10 pb-5"}>
                        {children}
                    </main>
                </div>
                </body>
            </UserProvider>
        </Suspense>);
}
