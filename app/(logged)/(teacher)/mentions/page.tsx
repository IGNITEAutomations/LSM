"use client"

import Navigation from "@/app/(logged)/_components/nav";
import {useClasses} from "@/hooks/ClassesProvider";
import {useSoftSkills} from "@/hooks/SkillsProvider/SoftSkillsProvider";
import ComboBox from "@/app/(logged)/(teacher)/_components/ComboBox";
import {Option} from "@/utils/types/types";
import {useCallback, useMemo} from "react";
import {Table, TBody, TCell, THead, TRow} from "@/app/(logged)/(teacher)/_components/Table";
import {SkillMatrix} from "@/hooks/SkillsProvider/CommonProvider";


const NUM_COLS = 3

const data: SkillMatrix = {
    options: [{id: "1234", label: "soft 1"}, {id: "1235", label: "soft 2"}, {id: "1236", label: "soft 3"}],
    matrix: [{
        student: {id: 1, displayName: "Iker Borrallo"},
        skills: [{id: "1234", value: "soft 1"}, {id: "-1", value: ""}, {id: "-1", value: ""}]
    }, {
        student: {id: 2, displayName: "Pol Albarran"},
        skills: [{id: "1234", value: "soft 2"}, {id: "-1", value: ""}, {id: "-1", value: ""}]
    }, {
        student: {id: 3, displayName: "Mercedes Rodríguez"},
        skills: [{id: "1234", value: "soft 3"}, {id: "-1", value: ""}, {id: "-1", value: ""}]
    },]
}

const skillsOpt: Option[] = [{id: "next.js", label: "Next.js"}, {id: "sveltekit", label: "SvelteKit"}, {
    id: "hola", label: "Nuxt.js"
}, {id: "remix", label: "Remix"}, {id: "astro", label: "Astro"}];

export default function SoftSkillsPage({searchParams}: { searchParams: { id: string } }) {
    const classes = useClasses();
    const skills = useSoftSkills();
    const {id: classId} = searchParams;

    const handleChange = useCallback((value: string) => {
        console.log(value);
    }, []);

    const headers = useMemo(() => [...Array(NUM_COLS)].map((_, i) => `Mention ${i + 1}`), []);

    return (
        <main className="flex flex-col max-h-[650px]">
            <Navigation classId={classId}/>
            <h1>Soft Skills</h1>
            <h2>{classes.getClassName(classId)}</h2>
            <section className="mt-8 flex-1 overflow-y-auto">
                <Table>
                    <THead headers={headers} numCols={3}/>
                    <TBody>
                        {data.matrix.map((row, rowIndex) => (
                            <TRow key={rowIndex}>
                                <TCell>
                                    <p className={"w-full pl-2 text-left"}>{row.student.displayName}</p>
                                </TCell>
                                {row.skills.map((challenge, colIndex) => (<TCell key={colIndex}>
                                        <ComboBox options={skillsOpt} onChange={handleChange}/>
                                    </TCell>))}
                            </TRow>))}
                    </TBody>
                </Table>
            </section>
        </main>
    );
}