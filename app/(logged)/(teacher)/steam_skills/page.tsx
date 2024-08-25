"use client"

import {useSearchParams} from "next/navigation";
import Navigation from "@/app/(logged)/_components/nav";
import MentionsTable from "@/app/(logged)/(teacher)/mentions/table";
import SoftSkillsTable from "@/app/(logged)/(teacher)/soft_skills/table";
import SteamSkillsTable from "@/app/(logged)/(teacher)/steam_skills/table";

export default function SteamSkillsPage() {
    const searchParams = useSearchParams()
    const classId = searchParams.get('id')

    return (
        <main className={"flex flex-col max-h-[650px]"}>
            <Navigation/>
            <h1>STEAM Skills</h1>
            <h2>{"Class ID " + classId}</h2>
            <section className={"mt-8 flex-1 overflow-y-auto"}>
                <SteamSkillsTable/>
            </section>
        </main>
    )
}