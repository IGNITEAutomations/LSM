import {StudentList} from "@/utils/functions/ProcessImportData";
import {Table, TBody, TCell, THead, TRow} from "@/app/(logged)/_components/Table";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {SquareArrowOutUpRight} from "lucide-react";
import {ChangeEvent, useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import IssuesDialog from "@/app/(logged)/admin/import/_components/IssuesDialog";

export type StudentItem = {
    searched: StudentList,
    found: StudentList[],
    id: number
}

type IssuesTableProps = {
    data: StudentItem[]
    loadStudent: (student: StudentList) => void
    removeIssue: (studentId: number) => void
}

const tableHeaders = ["Email", "Password", "Name", "Surname", "Role", "Active", "Group Id", ""];
export default function IssuesTable({data, removeIssue, loadStudent}: IssuesTableProps) {
    return (
        <Table>
        <THead empty={true} headers={tableHeaders}/>
        <TBody>
            {data.map((student, i) => (<TRow key={i}>
                <TCell>{student.searched.email ?? "none"}</TCell>
                <TCell>{student.searched.password ?? "none"}</TCell>
                <TCell>{student.searched.name ?? "none"}</TCell>
                <TCell>{student.searched.surname ?? "none"}</TCell>
                <TCell>{student.searched.role ?? "none"}</TCell>
                <TCell>{student.searched.activated.toString() ?? "none"}</TCell>
                <TCell>{student.searched.groupId ?? "none"}</TCell>
                <TCell><IssuesDialog removeIssue={removeIssue} loadStudent={loadStudent} student={student}/></TCell>
            </TRow>))}
        </TBody>
    </Table>
    )
}