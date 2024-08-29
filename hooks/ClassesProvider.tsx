"use client";

import React, { FC, ReactNode, useContext, useEffect, useState, useCallback } from "react";
import { Days } from "@/utils/Days";
import { NotificationColor, setNotification } from "@/lib/Notification/ClientNotification";

export type Group = {
    id: string;
    school: string;
    group: string;
    day: Days;
    numStudents: number;
    action: boolean;
};

type Groups = {
    groups: Group[];
    addGroup: (group: Group) => void;
    removeGroup: (id: string) => void;
    getClassName: (id: string) => string;
};

const ClassesContext = React.createContext<Groups | undefined>(undefined);

type ClassesProviderProps = {
    children: ReactNode;
};

export const ClassesProvider: FC<ClassesProviderProps> = ({ children }) => {
    const [groups, setGroups] = useState<Group[]>([]);

    const addGroup = useCallback((group: Group) => {
        setGroups(prevGroups => [...prevGroups, group]);
    }, []);

    const removeGroup = useCallback((id: string) => {
        setGroups(prevGroups => prevGroups.filter(group => group.id !== id));
    }, []);

    const getClassName = useCallback((id: string) => {
        const group = groups.find(group => group.id === id);
        return group ? `${group.school} - ${group.group}` : "";
    }, [groups]);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await fetch("/api/groups");
                const data = await response.json();
                if (data.success) {
                    setGroups(data.data);
                } else {
                    setNotification("Internal error: Failed to load classes", NotificationColor.ERROR);
                }
            } catch (error) {
                setNotification("Internal error: Failed to load classes", NotificationColor.ERROR);
            }
        };
        fetchGroups();
    }, []);

    const contextValue = {
        groups,
        addGroup,
        removeGroup,
        getClassName
    };

    return (
        <ClassesContext.Provider value={contextValue}>
            {children}
        </ClassesContext.Provider>
    );
};

export const useClasses = (): Groups => {
    const context = useContext(ClassesContext);
    if (!context) {
        throw new Error("useClasses must be used within a ClassesProvider");
    }
    return context;
};