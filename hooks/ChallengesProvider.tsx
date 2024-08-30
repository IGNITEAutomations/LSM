"use client";

import React, { FC, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { NotificationColor, setNotification } from "@/lib/Notification/ClientNotification";
import { useSearchParams } from "next/navigation";
import { Challenge, Student } from "@/utils/types/types";

export type ChallengeDataRow = {
    student: Student;
    challenges: Challenge[];
};

type ChallengesMatrix = {
    matrix: ChallengeDataRow[];
    headers: string[];
};

type ChallengesContextType = {
    challengesHeader: string[];
    challengesMatrix: ChallengeDataRow[];
    setChallengeValue: (row: number, col: number, value: boolean) => void;
};

type ChallengesProviderProps = {
    children: ReactNode;
};

const ChallengesContext = React.createContext<ChallengesContextType | undefined>(undefined);

export const ChallengesProvider: FC<ChallengesProviderProps> = ({ children }) => {
    const [challengesData, setChallengesData] = useState<ChallengesMatrix>({ headers: [], matrix: [] });
    const [classId, setClassId] = useState<string>("")
    const searchParams = useSearchParams();

    const init = useCallback(async (classId: string) => {
        try {
            const response = await fetch(`/api/challenges/get?id=${classId}`);
            if (!response.ok) throw new Error("Failed to fetch challenges data");

            const data = await response.json();
            if (!data.success) throw new Error("Error getting data: " + data.error);

            setChallengesData(data.data);
        } catch (error) {
            setNotification((error as Error).message, NotificationColor.ERROR);
        }
    }, []);

    useEffect(() => {
        if (classId) {
            init(classId);
        }
    }, [classId, init]);

    useEffect(() => {
        const idFromUrl = searchParams.get('id')
        if (!classId && idFromUrl)
            setClassId(idFromUrl)
    }, [searchParams, classId]);

    const setChallengeValue = useCallback((row: number, col: number, value: boolean) => {
        setChallengesData(prevState => {
            const updatedMatrix = prevState.matrix.map((dataRow, rowIndex) =>
                rowIndex === row
                    ? {
                        ...dataRow,
                        challenges: dataRow.challenges.map((challenge, colIndex) =>
                            colIndex === col ? { ...challenge, value } : challenge
                        ),
                    }
                    : dataRow
            );
            return { ...prevState, matrix: updatedMatrix };
        });
    }, []);

    const contextValue = useMemo(() => ({
        challengesHeader: challengesData.headers,
        challengesMatrix: challengesData.matrix,
        setChallengeValue,
    }), [challengesData, setChallengeValue]);

    return (
        <ChallengesContext.Provider value={contextValue}>
            {children}
        </ChallengesContext.Provider>
    );
};

export const useChallenges = (): ChallengesContextType => {
    const context = useContext(ChallengesContext);
    if (!context) {
        throw new Error("useChallenges must be used within a ChallengesProvider");
    }
    return context;
};