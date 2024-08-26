"use client"

import Navigation from "@/app/(logged)/_components/nav";
import SoftSkillsTable from "@/app/(logged)/(teacher)/soft_skills/table";
import {Suspense} from "react";

export default function SoftSkillsPage({searchParams}: { searchParams: { id: string }}) {

    return (
        <main className={"flex flex-col max-h-[650px]"}>
            <Suspense>
                <Navigation classId={searchParams.id}/>
            </Suspense>
            <h1>Soft Skills</h1>
            <h2>{"Class ID " }</h2>
            <section className={"mt-8 flex-1 overflow-y-auto"}>
                <SoftSkillsTable/>
            </section>
        </main>
    )
}