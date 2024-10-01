"use client"

import {StudentList} from "@/utils/functions/ProcessImportData";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {Table, TBody, TCell, THead, TRow} from "@/app/(logged)/_components/Table";

type AlertDialogRepeatStudentsProps = {
    isOpen: boolean;
    students: StudentList[];
    onAccept: () => void;
    onCancel: () => void;
};

export default function AlertDialogRepeatStudents({ isOpen, students, onAccept, onCancel }: AlertDialogRepeatStudentsProps) {
    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Some students have been detected who may already be registered, or their email addresses are already in use.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <div className={"max-h-96 w-full overflow-y-auto"}>
                        <Table>
                            <THead headers={["Email", "Group ID", "School", "Role"]} />
                            <TBody>
                                {(students)?.map((student, i) => (
                                    <TRow key={i}>
                                        <TCell>{`${student.name} ${student.surname}`}</TCell>
                                        <TCell>{student.email}</TCell>
                                        <TCell>{student.groupId}</TCell>
                                        <TCell>{student.school}</TCell>
                                        <TCell>{student.role}</TCell>
                                    </TRow>
                                ))}
                            </TBody>
                        </Table>
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}