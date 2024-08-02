import UserRepository, {LoggedUser} from "@/modules/auth/domain/user-repository";
import LoginUserUseCase from "@/modules/auth/domain/login-user-use-case";
import User from "@/modules/auth/domain/user";

export default class LoginUserService {
    constructor(readonly userRepository: UserRepository) {
    }

    execute(request: LoggedUser): User {
        if (this.isValidRequest(request))
            throw new Error("Invalid request, missing data")

        const loginUserUseCase = new LoginUserUseCase(this.userRepository)
        return loginUserUseCase.execute(request)
    }

    private isValidRequest(request: LoggedUser): boolean {
        // TODO: Improve request validation (Yup, JOY, JsonSchema, etc)
        return Boolean(request && request.email)
    }
}