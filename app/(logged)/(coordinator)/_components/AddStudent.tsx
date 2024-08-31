"use client"

import {Plus} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useState} from "react";
import {NotificationColor, setNotification} from "@/lib/Notification/ClientNotification";

export function AddStudent({classId}: { classId: string }) {
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")

    const addStudent = () => {
        if (!name || !surname) {
            setNotification("Some field is incomplete", NotificationColor.ERROR)
            return
        }
        try {
            fetch("/api/groups/students/post/add", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name: name, surname: surname, classId: parseInt(classId)})
            }).then(response => {
                if (!response.ok) throw new Error("connection error")
                response.json().then(data => {
                    if (!data.success) throw new Error("server returned an error: " + data.error)
                    setNotification("Request sent successfully 👍", NotificationColor.SUCCESS)
                })
            })
        } catch (error) {
            console.error(error)
            setNotification("The request could not be sent", NotificationColor.ERROR)
        }

    }

    return (<div className={"relative"}>
        <Dialog>
            <DialogTrigger
                className={"absolute right-0 -top-8  bg-yellow-1000 hover:bg-yellow-1001 text-white text-sm px-2 py-1 rounded-3xl flex flex-row items-center justify-center font-light gap-1"}><Plus
                className={"h-4 w-4"}/>Add student</DialogTrigger>
            <DialogContent className={"w-[35%]"}>
                <DialogHeader>
                    <DialogTitle>Add new student</DialogTitle>
                    <DialogDescription>
                        To request the assignment of a new student, please submit a request using the form below.
                        The administrator will assign an email address to the student and process the request.
                        Please note that this process is not immediate and may take some time.
                    </DialogDescription>
                </DialogHeader>
                <div className={"flex flex-col items-end gap-5"}>
                    <div className={"flex flex-col w-full gap-2"}>
                        <div className={"w-full"}>
                            <Label htmlFor="name">Name</Label>
                            <Input onChange={(e) => {
                                setName(e.target.value)
                            }} id={"name"} placeholder="Name"/>
                        </div>
                        <div className={"w-full"}>
                            <Label htmlFor="surname">Surname</Label>
                            <Input onChange={(e) => {
                                setSurname(e.target.value)
                            }} id={"surname"} placeholder="Surname"/>
                        </div>
                    </div>
                    <button
                        className={"bg-green-500 hover:bg-green-700 text-white text-sm px-4 h-8 rounded-xl"}
                        onClick={addStudent}>Add
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    </div>)
}