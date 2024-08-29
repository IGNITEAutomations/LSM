"use client"

import {DataTable} from "@/app/(logged)/(teacher)/desktop/components/data-table";
import {columns} from "@/app/(logged)/(teacher)/desktop/components/columns";
import {useClasses} from "@/hooks/ClassesProvider";

export default function Desktop() {
    const classes = useClasses()

    return (
        <section className={"flex flex-col max-h-s gap-5 flex-1"}>
            <div className={"flex flex-col gap-2"}>
                <h1>My classes</h1>
                <h2>Manage your classes and view the last annotations.</h2>
            </div>
            <div>
                <DataTable columns={columns} data={classes.groups}/>
            </div>
        </section>

    )
}