"use client";

import React, {FC, ReactNode, useContext, useEffect, useState} from "react";
import UserClient from "@/lib/User/user_client";
import {UserRoles} from "@/lib/User/utils/users_roles";
import {useRouter} from "next/navigation";

type User = {
    displayName: string;
    avatar: string;
    role: UserRoles;
    email: string;
    token: string;
};

type UserContextType = User & {
    loaded: boolean
}

const UserContext = React.createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
    children: ReactNode;
};

export const UserProvider: FC<UserProviderProps> = ({children}) => {
    const [user, setUser] = useState<User>({
        displayName: "",
        avatar: "",
        role: UserRoles.Teacher,
        email: "",
        token: ""
    });
    const [loaded, setLoaded] = useState(false)
    const router = useRouter()

    //TODO use lib ReactQuery https://tanstack.com/
    const restartUser = async () => {
        try {
            const ok = await UserClient.init()
            if (!ok) throw new Error("The session could not be started")

            setUser(UserClient.user())
            setLoaded(true)
        } catch (error) {
            console.error("Failed to fetch user getHistory:", error);
            router.push("/login")
        }
    };

    useEffect(() => {
        restartUser();
    }, []);

    return (<UserContext.Provider value={{
        displayName: user.displayName,
        avatar: user.avatar,
        role: user.role,
        email: user.email,
        token: user.token,
        loaded: loaded
    }}>
        {children}
    </UserContext.Provider>);
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};