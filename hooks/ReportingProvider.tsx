"use client";

import React, {FC, ReactNode, useCallback, useContext, useEffect, useMemo, useState,} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import doPost, {doGet} from "@/lib/Fetch/Client/fetch";

type Student = {
    id: number; name: string;
};

type Reporting = {
    student: Student; note: string;
};

type ReportingContextType = {
    reporting: Reporting[];
    loaded: boolean;
    addNote: (id: number, value: string) => void;
    submitNote: (id: number, text: string) => Promise<void>;
    getNote: (id: number) => string | undefined;
    students: Student[];
};

const ReportingContext = React.createContext<ReportingContextType | undefined>(undefined);

type ReportingProviderProps = {
    children: ReactNode;
};

export const ReportingProvider: FC<ReportingProviderProps> = ({children}) => {
    const [groupId, setGroupId] = useState<string>("");
    const [reporting, setReporting] = useState<Reporting[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    const fetchReporting = useCallback(async () => {
        try {
            console.log("Fetching reporting");
            const data = await doGet(`api/student/notes/get?id=${groupId}`);
            console.log(data)
            if (!data.success) throw new Error("Error getting the reporting");

            const reports: Reporting[] = data.data.map((item: {
                id: number; name: string; surname: string; Evaluations: { note: string }[];
            }) => ({
                student: {id: item.id, name: `${item.name} ${item.surname}`}, note: item.Evaluations[0]?.note,
            }));

            console.log(reports)

            setReporting(reports);
            setLoaded(true);
        } catch (error) {
            console.error("Failed to fetch reporting:", error);
            router.push("/login");
        }
    }, [groupId, router]);

    const addNote = useCallback((id: number, value: string) => {
        setReporting((prevReporting) => prevReporting.map((report) => report.student.id === id ? {
            ...report,
            note: value
        } : report));
    }, [setReporting]);

    const submitNote = useCallback(async (id: number, report: string) => {
        const response = await doPost("api/student/notes/post", {id, note: report}, false);
        if (!response.success) {
            console.error(response.error);
            throw new Error("Failed to submit note");
        }
    }, []);

    const getNote = useCallback((id: number) => reporting.find((report) => report.student.id === id)?.note, [reporting]);

    const students = useMemo(() => reporting.map((item) => item.student), [reporting]);

    useEffect(() => {
        const idFromUrl = searchParams.get("id");
        if (idFromUrl && idFromUrl !== groupId) {
            setGroupId(idFromUrl);
            setLoaded(false);
            setReporting([]);
        }
    }, [searchParams, groupId]);

    useEffect(() => {
        if (groupId) {
            fetchReporting();
        }
    }, [groupId, fetchReporting]);

    return (<ReportingContext.Provider
            value={{reporting, addNote, submitNote, loaded, getNote, students}}
        >
            {children}
        </ReportingContext.Provider>);
};

export const useReporting = (): ReportingContextType => {
    const context = useContext(ReportingContext);
    if (!context) {
        throw new Error("useReporting must be used within a ReportingProvider");
    }
    return context;
};
