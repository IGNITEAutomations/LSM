"use client";

import { Group, useClasses } from "@/hooks/ClassesProvider";
import { Table, TBody, TCell, THead, TRow } from "@/app/(logged)/(teacher)/_components/Table";
import DropAction from "@/app/(logged)/(teacher)/desktop/components/DropAction";
import AddClassBtn from "@/app/(logged)/(teacher)/desktop/components/AddClassBtn";
import { useRouter } from "next/navigation";
import React, { useCallback, memo } from "react";
import DesktopTable from "@/app/(logged)/(teacher)/desktop/components/DesktopTable";

const headers = ["Class Id", "School", "Group", "Day", "#Students"];

export default function Desktop() {
    const classes = useClasses();
    const router = useRouter();

    const handleDelete = useCallback((classId: string) => {
        classes.removeGroup(classId)
    }, [classes]);

    const handleClick = useCallback((classId: string) => {
        console.log("bobo")
        router.push(`/challenges?id=${classId}`);
    }, [router]);

    return (
        <section className="flex flex-col max-h-s gap-5 flex-1">
            <div className="flex flex-col gap-2">
                <h1>My classes</h1>
                <h2>Manage your classes and view the last annotations.</h2>
            </div>
            <div className="absolute left-0 -mx-20 px-10 h-5 w-full flex justify-end">
                <AddClassBtn />
            </div>
            <div>
                <DesktopTable headers={headers} data={classes.groups} onDelete={handleDelete} onView={handleClick} />
            </div>
        </section>
    );
}