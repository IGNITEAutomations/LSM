"use client"

import {ColumnDef} from "@tanstack/react-table"

export type School = {
    id: number
    name: string
    group: string
    day: string
    num_students: number
}

export const columns: ColumnDef<School>[] = [
    { accessorKey: "id", header: "Classes Id" },
    { accessorKey: "name", header: "School" },
    { accessorKey: "group", header: "Group" },
    { accessorKey: "day", header: "Day" },
    { accessorKey: "num_students", header: "#Students" }
]
