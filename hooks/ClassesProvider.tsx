"use client";

import React, {FC, ReactNode, useContext, useEffect, useState} from "react";
import UserClient from "@/lib/User/user_client";
import {UserRoles} from "@/lib/User/utils/users_roles";
import {Days} from "@/utils/Days";

type Group = {
    id: string,
    school: string,
    group: string,
    day: Days,
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

    };

    useEffect(() => {
        restartGroups();
    }, []);

    function addGroup(group: Group) {
        setGroups(groups.concat(group))
    }

    function removeGroup(id: string) {
        setGroups(groups.filter(group => group.id != id))
    }

    return (<UserContext.Provider value={{groups: groups, addGroup: (group) => addGroup(group), removeGroup: (id) => removeGroup(id)}}>
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