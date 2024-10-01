"use client";

import {ChangeEvent, useCallback, useState} from "react";
import {Input} from "@/components/ui/input";
import {NotificationColor, setNotification} from "@/lib/Notification/ClientNotification";
import {AdminPage, AdminSection} from "@/app/(logged)/admin/_components/AdminSection";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import loadCSV from "@/utils/functions/handleCSVUpload";
import doPost from "@/lib/Fetch/Client/fetch";
import {StudentList} from "@/utils/functions/ProcessImportData";
import PreviewTable from "@/app/(logged)/admin/import/_components/PreviewTable";
import IncompleteTable from "@/app/(logged)/admin/import/_components/IncompletedTable";
import IssuesTable from "@/app/(logged)/admin/import/_components/IssuesTab";
import {Button} from "@/components/ui/button";

const expectedHeaders = ["user_email", "user_pass", "first_name", "last_name", "role", "facebook", "activate", "class_id"];

export type TableStudent = StudentList & {
    id: number
}

export default function StudentsPage() {
    const [students, setStudents] = useState<{
        new: StudentList[];
        updated: { student: StudentList, nextGroupId: number }[],
        similar: { searched: StudentList, found: StudentList }[]
    }>({new: [], updated: [], similar: []});

    const [incompleteStudents, setIncompleteStudents] = useState<TableStudent[]>([])
    const [readyStudents, setReadyStudents] = useState<TableStudent[]>([])
    const [repeatStudent, setRepeatStudent] = useState<{searched: StudentList, found: StudentList[], id: number}[]>([])

    let count = 0

    const processResponse = useCallback((data: {
        new: StudentList[],
        updated: { student: StudentList, nextGroupId: number }[],
        similar: { searched: StudentList, found: StudentList[] }[]
    }) => {

        setReadyStudents(data.updated.map(student => ({...student.student, groupId: student.nextGroupId, id: count++})))
        setRepeatStudent(data.similar.map(student => ({searched: student.searched, found: student.found, id: count++})))

        data.new.forEach(student => {
            const incompleteStudent: TableStudent = {...student, id: count++}
            if (Object.values(student).some(item => item === "" )) {
                setIncompleteStudents(prevState => ([...prevState, incompleteStudent]))
            } else {
                setReadyStudents(prevState => {
                    return [...prevState, incompleteStudent]
                })
            }
        })
    }, [])

    const processCSV = useCallback(async (CSV: string[][]) => {
        if (!CSV || CSV.length === 0) {
            setNotification("CSV is empty", NotificationColor.ERROR);
            return;
        }
        const data = await doPost(`/api/import/process/`, CSV, false);
        if (data.success) {
            processResponse(JSON.parse(data.data))
        }
    }, [processResponse]);

    const uploadStudents = async () => {
        const readyStudentsData = [...readyStudents]
        setReadyStudents([])
        const data = await doPost(`/api/import/upload/`, readyStudentsData, false)
        if (data.success) {
            setNotification("Students imported successfully.", NotificationColor.SUCCESS)
            setReadyStudents([])
            setIncompleteStudents([])
            setRepeatStudent([])
        }
        else {
            setNotification(data.error, NotificationColor.ERROR)
            setReadyStudents(readyStudentsData)
        }

    }

    const handleCSV = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        loadCSV(e, processCSV, expectedHeaders)
    }, [processCSV])

    const removeIncompleteStudent = (id: number) => {
        setIncompleteStudents(prevState => (prevState.filter(student => student.id != id)))
    }

    const removeIssueStudent = (id: number) => {
        setRepeatStudent(prevState => (prevState.filter(student => student.id != id)))
    }

    const handleTableChange = (id: number, key: keyof TableStudent, value: TableStudent[keyof TableStudent]) => {
        setIncompleteStudents((prevState) => prevState.map((student) => student.id === id ? {
            ...student,
            [key]: value
        } : student));
    };

    const loadIncompleteStudents = () => {
        const currentIncompleteStudents = [...incompleteStudents];
        const {readyStudents, remainingIncompleteStudents} = currentIncompleteStudents.reduce<{
            readyStudents: TableStudent[]; remainingIncompleteStudents: TableStudent[];
        }>((acc, student) => {
            const hasIncompleteFields = Object.values(student).some((value) => value === "" || value == null);

            if (hasIncompleteFields) {
                acc.remainingIncompleteStudents.push(student);
            } else {
                acc.readyStudents.push(student);
            }
            return acc;
        }, {readyStudents: [], remainingIncompleteStudents: []});

        setIncompleteStudents(remainingIncompleteStudents);

        if (readyStudents.length > 0) {
            setReadyStudents((prevState) => [...prevState, ...readyStudents]);
            setNotification(`${readyStudents.length} users loaded successfully.`, NotificationColor.SUCCESS);
        } else {
            setNotification("No suitable records have been detected for loading.", NotificationColor.ERROR);
        }
    };

    const loadIssueStudent = (student: StudentList) => {
        const formatedStudent = {...student, id: count++}

        if (Object.values(student).some(value => value === "" || value === null)) {
            setIncompleteStudents(prevState => [...prevState, formatedStudent])
            setNotification(`${student.name} ${student.surname} transferred to the incomplete list`, NotificationColor.SUCCESS);
        } else {
            setReadyStudents(prevState => [...prevState, formatedStudent])
            setNotification(`${student.name} ${student.surname} transferred to the preview list`, NotificationColor.SUCCESS);
        }
    }


    return (<AdminPage>
        <h1 className="text-black font-medium">Import</h1>
        <AdminSection className={"flex w-full h-full"}>
            <div className="flex flex-col h-full overflow-y-auto">
                <Tabs defaultValue="preview" className="w-full grow">
                    <TabsList className={"w-fit mb-5"}>
                        <TabsTrigger value="preview">
                            Preview
                        </TabsTrigger>
                        <TabsTrigger value="incomplete" className={"flex flex-row gap-1"}>
                            Incomplete
                            <div className={"text-xs bg-yellow-200 text-yellow-500 rounded-3xl w-4 h-4"}>
                                {incompleteStudents.length}
                            </div>
                        </TabsTrigger>
                        <TabsTrigger value="issues" className={"flex flex-row gap-1"}>
                            Issues
                            <div className={"text-xs bg-red-200 text-red-500 rounded-3xl w-4 h-4"}>
                                {repeatStudent.length}
                            </div>
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="preview">
                        <div>
                            <h2 className={"text-xl font-medium mb-3"}>Preview</h2>
                            <div className="flex flex-row justify-between items-center gap-20 mb-5">
                                <Input
                                    type="file"
                                    accept=".csv"
                                    onChange={(e) => handleCSV(e)}
                                />
                                <Button
                                    disabled={readyStudents.length === 0}
                                    className={"bg-green-200 text-green-600 text-sm font-medium px-4 h-8 rounded-2xl hover:bg-green-300"}
                                    onClick={uploadStudents}>Upload
                                </Button>
                            </div>
                            <div className={"overflow-y-auto max-h-[calc(100vh-440px)]"}>
                                <PreviewTable data={readyStudents}/>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="incomplete">
                        <div>
                            <h2 className={"text-xl font-medium mb-3"}>Incomplete</h2>
                            <div className={"relative w-full bg-red-100"}>
                                <Button
                                    disabled={readyStudents.length === 0}
                                    className={"absolute right-3 -top-[50px] bg-green-200 text-green-600 text-sm font-medium px-4 h-8 rounded-2xl"}
                                    onClick={loadIncompleteStudents}>Load All
                                </Button>
                            </div>
                            <div className={"overflow-y-auto max-h-[calc(100vh-380px)]"}>
                                <IncompleteTable
                                    removeStudent={removeIncompleteStudent} change={handleTableChange}
                                    data={incompleteStudents}
                                />
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="issues">
                        <div>
                            <h2 className={"text-xl font-medium mb-3"}>Issues</h2>
                            <div className={"overflow-y-auto max-h-[calc(100vh-380px)]"}>
                                <IssuesTable loadStudent={loadIssueStudent} removeIssue={removeIssueStudent} data={repeatStudent}/>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </AdminSection>
    </AdminPage>);
}