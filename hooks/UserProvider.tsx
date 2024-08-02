"use client";

import React, {FC, ReactNode, useContext, useEffect, useState} from "react";
import UserClient from "@/lib/User/user_client";
import {UserRoles} from "@/lib/User/utils/users_roles";

type User = {
    displayName: string;
    avatar: string;
    role: UserRoles;
    email: string;
    token: string;
};

const UserContext = React.createContext<User | undefined>(undefined);

type UserProviderProps = {
    children: ReactNode;
};

export const UserProvider: FC<UserProviderProps> = ({children}) => {
    const [user, setUser] = useState<User>({displayName: "", avatar: "", role: UserRoles.Teacher, email: "", token: ""});

    //TODO use lib ReactQuery https://tanstack.com/
    const restartUser = async () => {
        try {
            await UserClient.init()
            setUser(UserClient.getUser())
        } catch (error) {
            console.error("Failed to fetch user getHistory:", error);
        }
    };

    useEffect(() => {
        restartUser();
    }, []);

    return (<UserContext.Provider value={user}>
        {children}
    </UserContext.Provider>);
};

export const useUser = (): User => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};