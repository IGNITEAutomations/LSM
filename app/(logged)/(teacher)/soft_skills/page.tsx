"use client"

import {useSearchParams} from "next/navigation";
import Navigation from "@/app/(logged)/_components/nav";
import MentionsTable from "@/app/(logged)/(teacher)/mentions/table";
import SoftSkillsTable from "@/app/(logged)/(teacher)/soft_skills/table";

export default function SoftSkillsPage() {
    const searchParams = useSearchParams()
    const classId = searchParams.get('id')

    return (
        <main className={"flex flex-col max-h-[650px]"}>
            <Navigation/>
            <h1>Soft Skills</h1>
            <h2>{"Class ID " + classId}</h2>
            <section className={"mt-8 flex-1 overflow-y-auto"}>
                <SoftSkillsTable/>
            </section>
        </main>
    )
}