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
import {Group, useGroups} from "@/hooks/GroupsProvider";
import {Table, TBody, TCell, THead, TRow} from "@/app/(logged)/_components/Table";
import ComboBox from "@/app/(logged)/(teacher)/_components/ComboBox";
import {Option} from "@/utils/types/types";
import {Button} from "@/components/ui/button";
import {NotificationColor, setNotification} from "@/lib/Notification/ClientNotification";
import {useEffect, useState} from "react";
import {Label} from "@/components/ui/label";

export default function AddGroupBtn() {
    const groups = useGroups()
    const [filteredGroups, setFilteredGroups] = useState<Group[]>([])
    const [schoolFilter, setSchoolFilter] = useState("")
    const [groupFilter, setGroupFilter] = useState("")

    const schoolsOpt = (): Option[] => {
        const seenSchools = new Set<string>();
        return groups.notAssignedGroups.reduce<Option[]>((options, item) => {
            const schoolLower = item.school.toLowerCase();
            if (!seenSchools.has(schoolLower)) {
                seenSchools.add(schoolLower);
                options.push({ id: schoolLower, label: item.school });
            }
            return options;
        }, []);
    }

    const groupsOpt = (): Option[] => {
        const seenSchools = new Set<string>();
        return groups.notAssignedGroups.reduce<Option[]>((options, item) => {
            const schoolLower = item.group.toLowerCase();
            if (!seenSchools.has(schoolLower)) {
                seenSchools.add(schoolLower);
                options.push({ id: schoolLower, label: item.group });
            }
            return options;
        }, []);
    }

    useEffect(() => {
        if (!schoolFilter && !groupFilter)
            setFilteredGroups(groups.notAssignedGroups)
    },[groups.notAssignedGroups, schoolFilter, groupFilter]);

    const handleSchoolFilter = (id: string, value: string) => {
        if (value && groupFilter) {
            setSchoolFilter(id)
            setFilteredGroups(groups.notAssignedGroups.filter(group => (group.school.toLowerCase() === id && group.group.toLowerCase() === groupFilter)))
        } else if (!value && groupFilter) {
            setSchoolFilter("")
            setFilteredGroups(groups.notAssignedGroups.filter(group => group.group.toLowerCase() === groupFilter))
        } else if (value && !groupFilter) {
            setSchoolFilter(id)
            setFilteredGroups(groups.notAssignedGroups.filter(group => group.school.toLowerCase() === id))
        } else {
            setSchoolFilter("")
            setFilteredGroups(groups.notAssignedGroups)
        }
    }

    const handleGroupFilter = (id: string, value: string) => {
        if (value && schoolFilter) {
            setGroupFilter(id)
            setFilteredGroups(groups.notAssignedGroups.filter(group => (group.school.toLowerCase() === schoolFilter && group.group.toLowerCase() === id)))
        } else if (!value && schoolFilter) {
            setGroupFilter("")
            setFilteredGroups(groups.notAssignedGroups.filter(group => group.school.toLowerCase() === schoolFilter))
        } else if (value && !schoolFilter) {
            setGroupFilter(id)
            setFilteredGroups(groups.notAssignedGroups.filter(group => group.group.toLowerCase() === id))
        } else {
            setGroupFilter("")
            setFilteredGroups(groups.notAssignedGroups)
        }
    }

    const handleAddGroup = (groupId: string) => {
        groups.assignNewGroup(groupId).then(response => {
            if (response)
                setNotification("New group assigned 👍", NotificationColor.SUCCESS)
            else
                setNotification("Error: Unable to assign group 🚩", NotificationColor.ERROR)
        })
    }

    return (
        <Dialog>
            <DialogTrigger className={"flex flex-row items-center w-fit px-4 h-7 font-light text-sm text-white rounded-xl bg-yellow-1000 hover:bg-yellow-1001 absolute mt-10"}>
                <Plus className={"w-4 h-4 stroke-1.5"}/> Add group
            </DialogTrigger>
            <DialogContent className={"sm:min-w-[80%] md:min-w-[50%]"}>
                <DialogHeader>
                    <DialogTitle className={"text-blue-1001"}>Groups available</DialogTitle>
                    <DialogDescription>
                        Select the groups you wish to add. These will be automatically linked to your account. If you wish, you can unlink them later.
                    </DialogDescription>
                </DialogHeader>
                <section className={"flex flex-col gap-4 bg-gray-50 p-3 rounded-xl"}>
                    <div className={"flex flex-row gap-16 mt-3"}>
                        <div className={"flex flex-col gap-2"}>
                            <Label htmlFor={"school"}>School</Label>
                            <ComboBox name={"school"} defaultValue={schoolFilter} options={schoolsOpt()}
                                      onChange={handleSchoolFilter}/>
                        </div>
                        <div className={"flex flex-col gap-2"}>
                            <Label htmlFor={"group"}>Group</Label>
                            <ComboBox name={"group"} defaultValue={groupFilter} options={groupsOpt()}
                                  onChange={handleGroupFilter}/>
                        </div>
                    </div>
                    <GroupsTable addGroup={handleAddGroup} groups={filteredGroups}/>

                </section>
            </DialogContent>
        </Dialog>
    )
}

type GroupsTableProps = {
    groups: Group[],
    addGroup: (groupId: string) => void
}

function GroupsTable({groups, addGroup}: GroupsTableProps) {
    const headers = ["Group Id", "School", "Group", "Day", "Action"]
    return (
            <Table>
            <THead empty={true} headers={headers}/>
            <TBody>
                {groups.map((item, i) => (
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