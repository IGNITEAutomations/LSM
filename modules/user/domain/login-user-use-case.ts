import UserRepository, {LoggedUser} from "@/modules/auth/domain/user-repository";
import User from "@/modules/auth/domain/user";

export default class LoginUserUseCase {
    constructor(readonly  userRepository: UserRepository) {}

    execute(user: LoggedUser): User {
        if (!user || !user.email)
            throw new Error("Empty user data")

        const searchedUser = this.userRepository.findByEmail(user.email)
        if (!searchedUser)
            throw new Error("User not found")

        if (!this.isFirstLogin(searchedUser))
            this.userRepository.save(user)

        return searchedUser
    }

    private isFirstLogin(user: User): boolean {
        return !user.uid
    }
}