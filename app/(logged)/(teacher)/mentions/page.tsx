"use client"

import Navigation from "@/app/(logged)/_components/nav";
import MentionsTable from "@/app/(logged)/(teacher)/mentions/table";
import {Suspense} from "react";
import {useClasses} from "@/hooks/ClassesProvider";

export default function MentionsPage({searchParams}: { searchParams: { id: string }}) {
    const classes = useClasses()
    const classId = searchParams.id

    return (
        <main className={"flex flex-col max-h-[650px]"}>
            <Suspense>
                <Navigation classId={searchParams.id}/>
            </Suspense>
            <h1>Mentions</h1>
            <h2>{classes.getClassName(classId)}</h2>
            <section className={"mt-8 flex-1 overflow-y-auto"}>
                <MentionsTable/>
            </section>
        </main>
    )
}