"use client"

import {useEffect, useState} from "react";
import queue, {QueueStatus} from "@/lib/Queue/queue";

export default function SavedIndicator() {
    const [status, setStatus] = useState<QueueStatus>(QueueStatus.Saved)

    useEffect(() => {
        queue.on(setStatus)
    }, []);

    switch (status) {
        case QueueStatus.Saved:
            return (<div className={"absolute mt-24 right-20 mr-10"}><p className={"text-white text-xs font-medium py-1 px-2 bg-green-400 rounded-3xl"}>Saved</p></div>)
        case QueueStatus.Saving:
            return (<div className={"absolute mt-24 right-20 mr-10"}><p
                className={"text-white text-xs font-medium py-1 px-2 bg-gray-500 rounded-3xl"}>Saving</p></div>)
        case QueueStatus.NotSaved:
            return (<div className={"absolute mt-24 right-20 mr-10"}><p
                className={"text-white text-xs font-medium py-1 px-2 bg-red-500 rounded-3xl cursor-pointer"} onClick={() => queue.save()}>Not Saved</p></div>)
    }
}