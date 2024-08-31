"use client";

import AddClassBtn from "@/app/(logged)/(teacher)/desktop/components/AddClassBtn";
import React from "react";
import DesktopTable from "@/app/(logged)/(teacher)/desktop/components/DesktopTable";

export default function Desktop() {
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
                <DesktopTable />
            </div>
        </section>
    );
}