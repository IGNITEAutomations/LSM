import {UserRoles} from "@/lib/User/utils/users_roles";

export type LoggedUserType = {
    displayName: string,
    avatar: string,
    role: UserRoles,
    email: string,
    token: string,
}