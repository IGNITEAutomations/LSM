"use client"

import Navigation from "@/app/(logged)/_components/nav";
import SteamSkillsTable from "@/app/(logged)/(teacher)/steam_skills/table";
import {useClasses} from "@/hooks/ClassesProvider";

export default function SteamSkillsPage({searchParams}: { searchParams: { id: string }}) {
    const classes = useClasses()
    const classId = searchParams.id

    return (
        <main className={"flex flex-col max-h-[650px]"}>
            <Navigation classId={searchParams.id}/>
            <h1>STEAM Skills</h1>
            <h2>{classes.getClassName(classId)}</h2>
            <section className={"mt-8 flex-1 overflow-y-auto"}>
                <SteamSkillsTable/>
            </section>
        </main>
    )
}