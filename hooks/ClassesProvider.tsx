"use client";

import React, {FC, ReactNode, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {Days} from "@/utils/Days";
import {NotificationColor, setNotification} from "@/lib/Notification/ClientNotification";
import doPost from "@/lib/Fetch/Client/fetch";

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
    notAssignedGroups: Group[];
    assignNewGroup: (id: string) => Promise<boolean>;
    removeGroup: (id: string) => Promise<boolean>;
    getClassName: (id: string) => string;
    loaded: boolean
};

const ClassesContext = React.createContext<Groups | undefined>(undefined);

type ClassesProviderProps = {
    children: ReactNode;
};

export const ClassesProvider: FC<ClassesProviderProps> = ({children}) => {
    const [assignedGroups, setAssignedGroups] = useState<Group[]>([]);
    const [notAssignedGroups, setNotAssignedGroups] = useState<Group[]>([]);
    const [loaded, setLoaded] = useState(false)

    const assignNewGroup = useCallback(async (id: string) => {
        const group = notAssignedGroups.find(group => group.id === id);
        if (!group) {
            console.error(`Group with id ${id} not found in notAssignedGroups`);
            return false;
        }
        const response = await doPost("/api/groups/assign", {classId: group.id}, false)
        if (response.success) {
            setAssignedGroups(prevGroups => [...prevGroups, group]);
            setNotAssignedGroups(prevGroups => prevGroups.filter(g => g.id !== id));
        }
        return response.success
    }, [notAssignedGroups]);

    const removeGroup = useCallback(async (id: string) => {
        const unassignedGroup = assignedGroups.find(group => group.id === id)
        const response = await doPost("/api/groups/unassign", {classId: unassignedGroup?.id})
        if (response.success) {
            setAssignedGroups(prevGroups => prevGroups.filter(group => group.id !== id));
            setNotAssignedGroups(prevState => [...prevState, unassignedGroup!])
        }
        return response.success
    }, [assignedGroups]);

    const getClassName = useCallback((id: string) => {
        const group = assignedGroups.find(group => group.id === id);
        return group ? `${group.school} - ${group.group}` : "";
    }, [assignedGroups]);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await fetch("/api/groups");
                if (!response.ok) throw new Error("Failed to fetch groups");

                const data = await response.json();
                if (data.success) {
                    setAssignedGroups(data.data.assigned);
                    setNotAssignedGroups(data.data.notAssigned);
                    setLoaded(true)
                } else {
                    setNotification("Internal error: Failed to load classes", NotificationColor.ERROR);
                }
            } catch (error) {
                console.error(error);
                setNotification("Internal error: Failed to load classes", NotificationColor.ERROR);
            }
        };

        fetchGroups();
    }, []);

    const contextValue = useMemo(() => ({
        groups: assignedGroups, notAssignedGroups, assignNewGroup, removeGroup, getClassName, loaded
    }), [assignedGroups, notAssignedGroups, assignNewGroup, removeGroup, getClassName]);

    return (<ClassesContext.Provider value={contextValue}>
            {children}
        </ClassesContext.Provider>);
};

export const useClasses = (): Groups => {
    const context = useContext(ClassesContext);
    if (!context) {
        throw new Error("useClasses must be used within a ClassesProvider");
    }
    return context;
};