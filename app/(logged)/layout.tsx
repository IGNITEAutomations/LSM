import Header from "@/app/(logged)/_components/header";
import "./style.css";
import {UserProvider} from "@/hooks/UserProvider";
import {ClassesProvider} from "@/hooks/ClassesProvider";
import SavedIndicator from "@/app/(logged)/(teacher)/_components/SavedIndicator";
import {SoftSkillsProvider} from "@/hooks/SkillsProvider/SoftSkillsProvider";
import {SteamSkillsProvider} from "@/hooks/SkillsProvider/SteamSkillsProvider";
import {MentionsProvider} from "@/hooks/SkillsProvider/MentionsProvider";
import {ChallengesProvider} from "@/hooks/ChallengesProvider";
import {Suspense} from "react";

export default function RootLayout({children}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <Suspense>
            <UserProvider>
                <ChallengesProvider>
                    <SoftSkillsProvider>
                        <SteamSkillsProvider>
                            <ClassesProvider>
                                <MentionsProvider>
                                    <main
                                        className={"flex flex-col max-w-screen max-h-screen bg-gray-100 min-h-screen w-screen px-20"}>
                                        <Header/>
                                        <section
                                            className={"flex flex-col flex-1 mb-10 px-10 py-8 w-full bg-white rounded-xl"}>
                                            <SavedIndicator/>
                                            {children}
                                        </section>
                                    </main>
                                </MentionsProvider>
                            </ClassesProvider>
                        </SteamSkillsProvider>
                    </SoftSkillsProvider>
                </ChallengesProvider>
             </UserProvider>
        </Suspense>
        );
}
