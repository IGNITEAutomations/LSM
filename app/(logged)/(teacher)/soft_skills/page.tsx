"use client"

import Navigation from "@/app/(logged)/_components/nav";
import SoftSkillsTable from "@/app/(logged)/(teacher)/soft_skills/table";
import {Suspense} from "react";
import {useClasses} from "@/hooks/ClassesProvider";
import {MatrixData} from "@/hooks/LastClassProvider";
import {useSoftSkills} from "@/hooks/SkillsProvider/SoftSkillsProvider";

export default function SoftSkillsPage({searchParams}: { searchParams: { id: string }}) {
    const classes = useClasses()
    const skills = useSoftSkills()
    const classId = searchParams.id

    const data: MatrixData = {
        headers: [
            {id: 1234, name: "soft 1"},
            {id: 1235, name: "soft 2"},
            {id: 1236, name: "soft 3"}
        ],
        matrix: [
            {
                student: {id: 1, name: "Iker Borrallo"},
                data: [{id: 1234, name: "soft 1"}, {id: -1, name: ""}, {id: -1, name: ""}]
            },
            {
                student: {id: 2, name: "Pol Albarran"},
                data: [{id: 1234, name: "soft 2"}, {id: -1, name: ""}, {id: -1, name: ""}]
            },
            {
                student: {id: 3, name: "Mercedes Rodríguez"},
                data: [{id: 1234, name: "soft 3"}, {id: -1, name: ""}, {id: -1, name: ""}]
            },
        ]
    }


    return (
        <main className={"flex flex-col max-h-[650px]"}>
            <Suspense>
                <Navigation classId={searchParams.id}/>
            </Suspense>
            <h1>Soft Skills</h1>
            <h2>{classes.getClassName(classId)}</h2>
            <section className={"mt-8 flex-1 overflow-y-auto"}>
                <SoftSkillsTable matrix={data.matrix} values={data.headers}/>
            </section>
        </main>
    )
}