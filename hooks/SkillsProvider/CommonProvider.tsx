"use client";

import React, {FC, ReactNode, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {NotificationColor, setNotification} from "@/lib/Notification/ClientNotification";
import {useSearchParams} from "next/navigation";
import {Option, Skill, SkillsTypes, Student} from "@/utils/types/types";

type SkillsDataRow = {
  student: Student;
  skills: Skill[];
};

export type SkillMatrix = {
  matrix: SkillsDataRow[];
  options: Option[];
};

type SkillsContextType = {
    skillsOptions: Option[];
    skillsMatrix: SkillsDataRow[];
    setSkillValue: (row: number, col: number, value: string) => void;
};

type SkillsProviderProps = {
    children: ReactNode;
};

export function createSkillGenericContext(type: SkillsTypes) {
    const SkillsContext = React.createContext<SkillsContextType | undefined>(undefined);

    const SkillsProvider: FC<SkillsProviderProps> = ({children}) => {
        const [skillsData, setSkillsData] = useState<SkillMatrix>({options: [], matrix: []});

        const searchParams = useSearchParams();
        const classId = searchParams.get("id");

        const init = useCallback(async (classId: string) => {
            try {
                const response = await fetch(`/api/skills/get?id=${classId}&type=${type.toString()}`);
                if (!response.ok) throw new Error("Failed to fetch challenges data");

                const data = await response.json();
                if (!data.success) throw new Error("Error getting data: " + data.error);
                setSkillsData(data.data);
            } catch (error) {
                setNotification((error as Error).message, NotificationColor.ERROR);
            }
        }, []);

        useEffect(() => {
            if (classId) {
                init(classId);
            }
        }, [classId, init]);

        const setSkillValue = useCallback((row: number, col: number, value: string) => {
            setSkillsData(prevState => {
                const updatedMatrix = [...prevState.matrix];
                updatedMatrix[row].skills[col].value  = value;
                return { ...prevState, matrix: updatedMatrix };
            });
        }, []);

        const contextValue = useMemo(
            () => ({
              skillsOptions: skillsData.options,
              skillsMatrix: skillsData.matrix,
              setSkillValue,
            }),
            [skillsData, setSkillValue]
          );

        return (
            <SkillsContext.Provider value={contextValue}>
              {children}
            </SkillsContext.Provider>
        );
    };

    const useSkills = (): SkillsContextType => {
        const context = useContext(SkillsContext);
        if (!context) {
            throw new Error("useClass must be used within a LastClassProvider");
        }
        return context;
    };

    return [useSkills, SkillsProvider] as const
}


