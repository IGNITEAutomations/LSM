"use client";

import React, {FC, ReactNode, useContext, useEffect, useState} from "react";
import {Days} from "@/utils/Days";

export type Group = {
    id: string,
    school: string,
    group: string,
    day: Days,
    numStudents: number,
    action: boolean
}

type Groups = {
    groups: Group[]
    addGroup: (group: Group) => void,
    removeGroup: (id: string) => void
}

const UserContext = React.createContext<Groups | undefined>(undefined);

type UserProviderProps = {
    children: ReactNode;
};

export const ClassesProvider: FC<UserProviderProps> = ({children}) => {
    const [groups, setGroups] = useState<Group[]>([]);

    //TODO use lib ReactQuery https://tanstack.com/
    const restartGroups = async () => {
        const response = await fetch("/api/groups")
        const data = await response.json()
        console.log(data.data)
        setGroups(data.data)
    };

    useEffect(() => {
        restartGroups();
    }, []);

    function generateGroups() {
        setGroups([
            {id: "1234", school: "Fedac Horta", group: "Robotica ESO", day: Days.Monday, numStudents: 12, action: false},
            {id: "1235", school: "Fedac Amilcar", group: "Coding PRIM", day: Days.Thursday, numStudents: 8, action: false},
            {id: "1435", school: "Fedac Sant Andreu", group: "3D&Craft INF", day: Days.Friday, numStudents: 10, action: false},
        ])
    }

    function addGroup(group: Group) {
        setGroups(groups.concat(group))
    }

    function removeGroup(id: string) {
        setGroups(groups.filter(group => group.id != id))
    }

    return (
        <UserContext.Provider
            value={{
                groups: groups,
                addGroup: (group) => addGroup(group),
                removeGroup: (id) => removeGroup(id)
            }}
        >
        {children}
    </UserContext.Provider>);
};

export const useClasses = (): Groups => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useClasses must be used within a UserProvider");
    }
    return context;
};