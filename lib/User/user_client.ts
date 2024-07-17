import {UserRoles} from "@/lib/User/utils/users_roles";
import {cookies} from "next/headers";

const USER_CLIENT_COOKIE_NAME: string= "user"
class CUserClient {

    private _displayName?: string;
    private _avatar?: string;
    private _role?: UserRoles;
    private _email?: string;
    private _token?: string;

    get displayName(): string {
        return this._displayName!
    }

    get avatar(): string {
        return this._avatar!
    }

    get role(): UserRoles {
        return this._role!
    }

    get email(): string {
        return this._email!
    }

    get token(): string {
        return this._token!
    }

    constructor() {
        this.init()
    }
    private init() {
        if (cookies().has(USER_CLIENT_COOKIE_NAME)) {
            try {
                const cookie = JSON.parse(cookies().get(USER_CLIENT_COOKIE_NAME)!.value)

                this._displayName = cookie.displayName
                this._avatar = cookie.avatar;
                this._role = cookie.role;
                this._email = cookie.email;
                this._token = cookie.token

            } catch (error) {
                console.error("Error initializing user: " + error)
            }
        } else {
            console.log("User cookie not found")
        }
    }

    public initTest(role: UserRoles | undefined = UserRoles.Teacher) {
        this._avatar = "https://lh3.googleusercontent.com/a/ACg8ocLkpRYBSzWRTMqCEmsgdTMpw9jEp9u5pP2ron4ZTdN4S7lI7Jsl=s96-c"
        this._displayName = "Iker Borrallo"
        this._role = role;
        this._email = "ikerborr@gmail.com";
    }

    public isTeacher(): boolean {
        return this.role === UserRoles.Teacher
    }
}

const UserClient = new CUserClient()
console.log("Creating User Client")
export default UserClient
