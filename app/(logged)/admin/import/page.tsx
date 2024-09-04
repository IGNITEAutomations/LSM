"use client"

import AdminSection from "@/app/(logged)/admin/_components/AdminSection";
import {Input} from "@/components/ui/input";
import {NotificationColor, setNotification} from "@/lib/Notification/ClientNotification";
import {ChangeEvent, useEffect, useState} from "react";
import {Table, TBody, TCell, THead, TRow} from "@/app/(logged)/_components/Table";

const expectedHeaders = ["user_email", "user_pass", "first_name", "last_name", "role", "facebook", "description", "activate", "class_id"]

export default function StudentsPage() {
    const [CSV, setCSV] = useState<string[][]>()

    const cleanCsvData = (data: string[][]) => {
        try {
            const headers = data[0].map(item => item.replace(/[\n\r\t]/g,""))
            const headersRows = expectedHeaders?.map((header) => {
                const index = headers.indexOf(header)
                if (index === -1) throw new Error(`${header} column not found`)
                return index
            })
            return headersRows.map(row => data[row]?.map(col => col))
        } catch (error) {
            console.error((error as Error).message)
            setNotification("No se ha podido cargar el documento", NotificationColor.ERROR)
        }
        return []
    }

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return

        const file = event.target.files[0];
        if (!file.name.endsWith('.csv')) {
            setNotification('Please upload a CSV file.', NotificationColor.ERROR);
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            const rows = text.split('\n').map((row) => row.split(';'));
            setCSV(cleanCsvData(rows))
        };
        reader.readAsText(file);
    };
    return (<section className={"flex flex-col w-full h-full"}>
            <h1 className={"text-black font-medium"}>Import</h1>
            <AdminSection>
                <Input type={"file"} accept={".csv"} onChange={handleFileUpload}/>

                <Table>
                    <THead headers={expectedHeaders}/>
                    <TBody>
                        {
                            CSV?.map((row, i) => (
                                <TRow key={i}>
                                    {
                                        row.map((col, j) => <TCell key={j}>{col}</TCell>)
                                    }
                                </TRow>
                            ))
                        }
                    </TBody>
                </Table>
            </AdminSection>
        </section>)
}