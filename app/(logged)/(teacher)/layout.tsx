import Header from "@/app/(logged)/_components/header";
import "../style.css";
import {UserProvider} from "@/hooks/UserProvider";
import {GroupsProvider} from "@/hooks/GroupsProvider";
import {SoftSkillsProvider} from "@/hooks/SkillsProvider/SoftSkillsProvider";
import {SteamSkillsProvider} from "@/hooks/SkillsProvider/SteamSkillsProvider";
import {MentionsProvider} from "@/hooks/SkillsProvider/MentionsProvider";
import {ChallengesProvider} from "@/hooks/ChallengesProvider";
import {Suspense} from "react";
import TableSkeleton from "@/app/(logged)/loading";
import {BestOfProvider} from "@/hooks/SkillsProvider/BestOf";

export default function RootLayout({children}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <body className={" max-w-screen h-screen flex flex-col overflow-x-hidden overscroll-y-auto"}>
            <UserProvider>
            <main
                className={"flex flex-col max-w-screen max-h-screen bg-gray-100 min-h-screen w-screen px-20"}>
                    <Header/>
                    <section
                        className={"flex flex-col flex-1 mb-10 px-10 py-8 w-full bg-white rounded-xl"}>
                        <Suspense fallback={<TableSkeleton/>}>
                            <ChallengesProvider>
                                <SoftSkillsProvider>
                                    <SteamSkillsProvider>
                                        <GroupsProvider>
                                            <MentionsProvider>
                                                <BestOfProvider>
                                                    {children}
                                                </BestOfProvider>
                                            </MentionsProvider>
                                        </GroupsProvider>
                                    </SteamSkillsProvider>
                                </SoftSkillsProvider>
                            </ChallengesProvider>
                            </Suspense>
                    </section>
                </main>
            </UserProvider>
        </body>

        );
}
