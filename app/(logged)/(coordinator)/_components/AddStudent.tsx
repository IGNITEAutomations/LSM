"use client";

import {Import, Plus} from "lucide-react";
import {ChangeEvent, useCallback, useState} from "react";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {NotificationColor, setNotification} from "@/lib/Notification/ClientNotification";
import doPost from "@/lib/Fetch/Client/fetch";

export function AddStudent({groupId}: { groupId: string }) {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [disable, setDisable] = useState(false);

    const handleInputChange = useCallback((setter: (value: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
        setter(e.target.value);
    }, []);

    const addStudent = useCallback(async () => {
        if (!name || !surname) {
            setNotification("Some field is incomplete", NotificationColor.ERROR);
            return;
        }
        setDisable(true);
        await doPost("/api/groups/students/upload/add", {name, surname, groupId: parseInt(groupId)})
        setDisable(false);
    }, [name, surname, groupId]);

    return (<div className="relative">
            <Dialog>
                <DialogTrigger
                    className="absolute right-0 -top-8 bg-yellow-1000 hover:bg-yellow-1001 text-white text-sm px-2 py-1 rounded-3xl flex items-center gap-1 font-light"
                >
                    <Plus className="h-4 w-4"/>
                    Add student
                </DialogTrigger>
                <DialogContent className="w-[35%]">
                    <DialogHeader>
                        <DialogTitle>Add new student</DialogTitle>
                        <DialogDescription>
                            To request the assignment of a new student, please submit a request using the form below.
                            The administrator will assign an email address to the student and process the request.
                            Please note that this process is not immediate and may take some time.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-end gap-5">
                        <div className="flex flex-col w-full gap-2">
                            <div className="w-full">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    onChange={handleInputChange(setName)}
                                    id="name"
                                    placeholder="Name"
                                    value={name}
                                />
                            </div>
                            <div className="w-full">
                                <Label htmlFor="surname">Surname</Label>
                                <Input
                                    onChange={handleInputChange(setSurname)}
                                    id="surname"
                                    placeholder="Surname"
                                    value={surname}
                                />
                            </div>
                        </div>
                        <button
                            className={`hover:bg-green-700 text-white text-sm px-4 h-8 rounded-xl ${disable ? "bg-green-300" : "bg-green-500"}`}
                            disabled={disable}
                            onClick={addStudent}
                        >
                            Add
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>);
}