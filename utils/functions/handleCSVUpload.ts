import {ChangeEvent} from "react";
import {NotificationColor, setNotification} from "@/lib/Notification/ClientNotification";
import readCSV from "@/lib/CSV/Client/readCSV";

export default function loadCSV(event: ChangeEvent<HTMLInputElement>, setCSV: (csv: string[][]) => void, expectedHeaders: string[]) {
    const file = event.target.files?.[0];
        if (!file || !file.name.endsWith('.csv')) {
            setNotification('Please upload a CSV file.', NotificationColor.ERROR);
            return;
        }

        setNotification("Processing data...", NotificationColor.INFO)

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                readCSV(e, expectedHeaders, setCSV)
            } catch (error) {
                console.error(error)
                setNotification((error as Error).message, NotificationColor.ERROR)
            }
        };
        reader.readAsText(file);
    };