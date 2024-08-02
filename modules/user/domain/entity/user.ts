import {UserRoles} from "@/modules/user/domain/user-roles";

export default class User {
    constructor(readonly uid: string, readonly token: string, readonly  displayName: string, readonly name: string, readonly email: string, readonly role: UserRoles){}
}