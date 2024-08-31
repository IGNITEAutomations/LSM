"use client"

import {ArrowLeft} from "lucide-react";
import Link from "next/link";

export default function ReturnBtn({p, classId}: {p: number, classId: string}) {
    console.log("p: " + p)

    return (
        <div className={"flex mb-8"}>
            <Link className="h-8 w-8 bg-blue-1002 rounded-3xl hover:bg-blue-1001" href={((p == 1) ? `/challenges?id=${classId}` : `/`)}>
            <ArrowLeft className="w-8 h-8 p-1.5 text-white"/>
        </Link>
        </div>

    )
}