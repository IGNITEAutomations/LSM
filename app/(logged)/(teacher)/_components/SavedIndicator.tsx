"use client";

import { useEffect, useState } from "react";
import queue, { QueueStatus } from "@/lib/Queue/queue";

const statusStyles = {
    [QueueStatus.Saved]: "bg-green-400 text-white",
    [QueueStatus.Saving]: "bg-gray-500 text-white",
    [QueueStatus.NotSaved]: "bg-red-500 text-white cursor-pointer",
};

const statusLabels = {
    [QueueStatus.Saved]: "Saved",
    [QueueStatus.Saving]: "Saving",
    [QueueStatus.NotSaved]: "Not Saved",
};

export default function SavedIndicator() {
    const [status, setStatus] = useState<QueueStatus>(QueueStatus.Saved);

    useEffect(() => {
        queue.on(setStatus);
    }, []);

    return (
        <div className="absolute mt-24 right-20 mr-10" title="Click here when the data is not saved">
            <p
                className={`text-xs font-medium py-1 px-2 rounded-3xl ${statusStyles[status]}`}
                onClick={status === QueueStatus.NotSaved ? () => queue.save() : undefined}
            >
                {statusLabels[status]}
            </p>
        </div>
    );
}