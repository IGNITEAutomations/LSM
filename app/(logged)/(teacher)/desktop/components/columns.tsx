"use client"

import {ColumnDef} from "@tanstack/react-table"
import {Group} from "@/hooks/ClassesProvider";

/*export type School = {
    id: number
    name: string
    group: string
    day: string
    num_students: number
}*/

export const columns: ColumnDef<Group>[] = [
    { accessorKey: "id", header: "Class Id" },
    { accessorKey: "school", header: "School" },
    { accessorKey: "group", header: "Group" },
    { accessorKey: "day", header: "Day" },
    { accessorKey: "numStudents", header: "#Students" }
]


