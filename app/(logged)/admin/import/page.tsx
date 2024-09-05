"use client"

import {Input} from "@/components/ui/input";
import {NotificationColor, setNotification} from "@/lib/Notification/ClientNotification";
import {ChangeEvent, useState} from "react";
import {Table, TBody, TCell, THead, TRow} from "@/app/(logged)/_components/Table";
import readCSV from "@/lib/CSV/Client/readCSV";
import {Upload} from "lucide-react";
import {AdminPage, AdminSection} from "@/app/(logged)/admin/_components/AdminSection";
import doPost from "@/lib/Fetch/Client/fetch";
import {Label} from "@/components/ui/label";
import {Checkbox} from "@/components/ui/checkbox";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const expectedHeaders = ["user_email", "user_pass", "first_name", "last_name", "role", "facebook", "activate", "class_id"]

export default function StudentsPage() {
    const [CSV, setCSV] = useState<string[][]>()
    const [isDialogOpen, setDialogOpen] = useState(false)
    const [checked, setChecked] = useState(false)


    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return

        const file = event.target.files[0];
        if (!file.name.endsWith('.csv')) {
            setNotification('Please upload a CSV file.', NotificationColor.ERROR);
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                readCSV(e, expectedHeaders, setCSV)
            } catch (error) {
                console.error(error)
                setNotification((error as Error).message)
            }
        }
        reader.readAsText(file);
    };

    const sendData = async () => {
        setDialogOpen(false)
        if (!CSV || (CSV?.length === 0)) {
            setNotification("CSV is empty", NotificationColor.ERROR)
            return
        }
        await doPost("/api/import/", {delete: checked, data: CSV})
    }

    const handleSendData = async() => {
        if (checked)
            setDialogOpen(true)
        else await sendData()
    }


    return (<AdminPage>
        <h1 className={"text-black font-medium"}>Import</h1>
        <AdminSection className={"bg-red-100"}>
            <div className={"flex flex-row justify-between items-center gap-20 mb-5"}>
                <Input type={"file"} accept={".csv"} onChange={handleFileUpload}/>
                <div className={"inline-flex w-fit gap-3"}>
                    <Label className={"w-max"} htmlFor={"checkRemove"}>Remove all</Label>
                    <Checkbox checked={checked} onClick={() => setChecked(!checked)} id={"checkRemove"}/>
                </div>
                <button
                    onClick={handleSendData}
                    className={"inline-flex gap-2 bg-blue-1002 hover:bg-blue-1001 text-white h-8 items-center px-2 rounded-xl text-sm"}>
                    <Upload className={"h-4 w-4"}/> Upload
                </button>
            </div>
            <div className={"max-h-[490px] overflow-y-auto"}>
                <Table>
                    <THead empty={true} headers={expectedHeaders}/>
                    <TBody>
                        {CSV?.map((row, i) => (<TRow key={i}>
                            {row.map((col, j) => <TCell key={j}>{col}</TCell>)}
                        </TRow>))}
                    </TBody>
                </Table>
            </div>
            <AlertDialogDemo isOpen={isDialogOpen} onAccept={sendData} onCancel={() => setDialogOpen(false)}/>
        </AdminSection>
    </AdminPage>)
}

export function AlertDialogDemo({isOpen, onAccept, onCancel}: {isOpen: boolean, onAccept: () => void, onCancel: () => void}) {
    return (<AlertDialog open={isOpen} >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        You are about to import new values into the database. During this process, all existing records,
                        including students and their achievements, will be permanently deleted. Once deleted, this data
                        cannot be recovered. Are you sure you want to proceed with this operation?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onAccept}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>)
}