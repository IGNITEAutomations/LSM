import {DataTable} from "@/app/(logged)/(teacher)/desktop/data-table";
import {columns} from "@/app/(logged)/(teacher)/desktop/columns";
import Classes from "@/lib/DB/Classes/classes";

export default async function Desktop() {
    const data = await Classes.getAll()

    return (
        <section className={"flex flex-col max-h-s gap-5 flex-1"}>
            <div className={"flex flex-col gap-2"}>
                <h1>My classes</h1>
                <h2>Manage your classes and view the last anotations.</h2>
            </div>
            <div>
                <DataTable columns={columns} data={data}/>
            </div>
        </section>

    )
}