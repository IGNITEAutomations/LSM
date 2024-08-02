import User from "@/modules/user/domain/entity/user";

export type LoggedUser = {
    email: string,
    displayName: string,
    avatar: string,
    uid: string
}

export default interface UserRepository {
    findByEmail(email: string): User | undefined
    save(user: LoggedUser): boolean
}