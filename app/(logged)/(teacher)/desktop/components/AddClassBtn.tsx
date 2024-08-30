"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Plus} from "lucide-react";
import {Group, useClasses} from "@/hooks/ClassesProvider";
import {Table, TBody, TCell, THead, TRow} from "@/app/(logged)/(teacher)/_components/Table";
import ComboBox from "@/app/(logged)/(teacher)/_components/ComboBox";
import {Option} from "@/utils/types/types";
import {Button} from "@/components/ui/button";
import {NotificationColor, setNotification} from "@/lib/Notification/ClientNotification";
import {useEffect, useState} from "react";

export default function AddClassBtn() {
    const classes = useClasses()
    const [filteredClasses, setFilteredClasses] = useState<Group[]>([])
    const [schoolFilter, setSchoolFilter] = useState("")
    const [groupFilter, setGroupFilter] = useState("")

    const schoolsOpt: Option[] = classes.notAssignedGroups.map(group => ({id: group.school.toLowerCase(), label: group.school}))
    const groupsOpt: Option[] = classes.notAssignedGroups.map(group => ({id: group.group.toLowerCase(), label: group.group}))

    useEffect(() => {
        if (!schoolFilter && !groupFilter)
            setFilteredClasses(classes.notAssignedGroups)
    },[classes.notAssignedGroups, schoolFilter, groupFilter]);

    const handleSchoolFilter = (id: string, value: string) => {
        if (value && groupFilter) {
            setSchoolFilter(id)
            setFilteredClasses(classes.notAssignedGroups.filter(group => (group.school.toLowerCase() === id && group.group.toLowerCase() === groupFilter)))
        } else if (!value && groupFilter) {
            setSchoolFilter("")
            setFilteredClasses(classes.notAssignedGroups.filter(group => group.group.toLowerCase() === groupFilter))
        } else if (value && !groupFilter) {
            setSchoolFilter(id)
            setFilteredClasses(classes.notAssignedGroups.filter(group => group.school.toLowerCase() === id))
        } else {
            setSchoolFilter("")
            setFilteredClasses(classes.notAssignedGroups)
        }
    }

    const handleGroupFilter = (id: string, value: string) => {
        if (value && schoolFilter) {
            setGroupFilter(id)
            setFilteredClasses(classes.notAssignedGroups.filter(group => (group.school.toLowerCase() === schoolFilter && group.group.toLowerCase() === id)))
        } else if (!value && schoolFilter) {
            setGroupFilter("")
            setFilteredClasses(classes.notAssignedGroups.filter(group => group.school.toLowerCase() === schoolFilter))
        } else if (value && !schoolFilter) {
            setGroupFilter(id)
            setFilteredClasses(classes.notAssignedGroups.filter(group => group.group.toLowerCase() === id))
        } else {
            setGroupFilter("")
            setFilteredClasses(classes.notAssignedGroups)
        }
    }

    const handleAddGroup = (classId: string) => {
        classes.assignNewGroup(classId).then(response => {
            if (response)
                setNotification("New group assigned 👍", NotificationColor.SUCCESS)
            else
                setNotification("Error: Unable to assign class 🚩", NotificationColor.ERROR)
        })
    }

    return (
        <Dialog>
            <DialogTrigger className={"flex flex-row items-center w-fit px-4 h-7 font-light text-sm text-white rounded-xl bg-yellow-1000 hover:bg-yellow-1001 absolute mt-10"}>
                <Plus className={"w-4 h-4 stroke-1.5"}/> Add class
            </DialogTrigger>
            <DialogContent className={"sm:min-w-[80%] md:min-w-[50%]"}>
                <DialogHeader>
                    <DialogTitle className={"text-blue-1001"}>Classes available</DialogTitle>
                    <DialogDescription>
                        Select the classes you wish to add. These will be automatically linked to your account. If you wish, you can unlink them later.
                    </DialogDescription>
                </DialogHeader>
                <section className={"flex flex-col gap-4"}>
                    <div className={"flex flex-row gap-16"}>
                        <ComboBox name={"school"} defaultValue={schoolFilter} options={schoolsOpt} onChange={handleSchoolFilter}/>
                        <ComboBox name={"group"} defaultValue={groupFilter} options={groupsOpt} onChange={handleGroupFilter}/>
                    </div>
                    <ClassesTable addGroup={handleAddGroup} classes={filteredClasses}/>

                </section>
            </DialogContent>
        </Dialog>
    )
}

type ClassesTableProps = {
    classes: Group[],
    addGroup: (classId: string) => void
}

function ClassesTable({classes, addGroup}: ClassesTableProps) {
    const headers = ["Class Id", "School", "Group", "Day", "Action"]
    return (
            <Table>
            <THead empty={true} headers={headers}/>
            <TBody>
                {classes.map((item, i) => (
                    <TRow key={i}>
                        <TCell>{item.id}</TCell>
                        <TCell>{item.school}</TCell>
                        <TCell>{item.group}</TCell>
                        <TCell>{item.day}</TCell>
                        <TCell>{<Button className={"bg-transparent hover:bg-transparent hover:text-green-700 text-green-500 p-1.5 w-8 h-8"} onClick={() => addGroup(item.id)}><Plus/></Button>}</TCell>
                    </TRow>
                ))}
            </TBody>
        </Table>
    )
}