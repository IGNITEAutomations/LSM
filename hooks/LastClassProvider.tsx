"use client";

import React, {FC, ReactNode, useCallback, useContext, useEffect, useState} from "react";
import {NotificationColor, setNotification} from "@/lib/Notification/ClientNotification";
import {useSearchParams} from "next/navigation";

export type KeyValue = {
    id: string | number;
    name: string | boolean;
};

export type DataElement = {
    student: KeyValue;
    data: KeyValue[];
};

export type MatrixData = {
    headers: KeyValue[];
    matrix: DataElement[];
};

type ClassContextType = {
    challengesHeader: string[];
    challengesMatrix: DataElement[];
    setChallengeValue: (row: number, col: number, value: boolean) => void;
};

type ClassesProviderProps = {
    children: ReactNode;
};

const ClassContext = React.createContext<ClassContextType | undefined>(undefined);

export const LastClassProvider: FC<ClassesProviderProps> = ({children}) => {
    const [challengesData, setChallengesData] = useState<MatrixData>({headers: [], matrix: []});
    const [softSkillsData, setSoftSkillsData] = useState<MatrixData>({headers: [], matrix: []});

    const [currentClassId, setCurrentClassId] = useState<string>("-1");

    const searchParams = useSearchParams();
    const classId = searchParams.get("id");

    const init = useCallback(async (classId: string) => {
        try {
            const response = await fetch(`/api/challenges/get?id=${classId}`);
            if (!response.ok) throw new Error("Failed to fetch challenges data");

            const data = await response.json();
            if (!data.success) throw new Error("Error getting data: " + data.error);

            setChallengesData(data.data);
        } catch (error) {
            setNotification(error as string, NotificationColor.ERROR);
        }
    }, []);

    useEffect(() => {
        if (classId && currentClassId !== classId) {
            init(classId);
            setCurrentClassId(classId);
        }
    }, [classId]);


    const setChallengeValue = useCallback((row: number, col: number, value: boolean) => {
        setChallengesData(prevState => {
            const updatedMatrix = [...prevState.matrix];
            updatedMatrix[row].data[col].name = value;
            return { ...prevState, matrix: updatedMatrix };
        });
    }, []);

    return (<ClassContext.Provider value={{
        challengesHeader: challengesData.headers.map(header => header.name as string),
        challengesMatrix: challengesData.matrix,
        setChallengeValue}}>
            {children}
        </ClassContext.Provider>);
};

export const useClass = (): ClassContextType => {
    const context = useContext(ClassContext);
    if (!context) {
        throw new Error("useClass must be used within a LastClassProvider");
    }
    return context;
};