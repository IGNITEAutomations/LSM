"use client"

import Navigation from "@/app/(logged)/_components/nav";
import SteamSkillsTable from "@/app/(logged)/(teacher)/steam_skills/table";

export default function SteamSkillsPage({searchParams}: { searchParams: { id: string }}) {
    return (
        <main className={"flex flex-col max-h-[650px]"}>
            <Navigation classId={searchParams.id}/>
            <h1>STEAM Skills</h1>
            <h2>{"Class ID "}</h2>
            <section className={"mt-8 flex-1 overflow-y-auto"}>
                <SteamSkillsTable/>
            </section>
        </main>
    )
}