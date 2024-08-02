import {UserRoles} from "@/lib/User/utils/users_roles";
import {NotificationColor, setNotification} from "@/lib/Notification/ClientNotification";

const USER_CLIENT_COOKIE_NAME: string= "user"
class CUserClient {

    private _displayName: string;
    private _avatar: string;
    private _role: UserRoles;
    private _email: string;
    private _token: string;

    constructor() {
        this._displayName = ""
        this._avatar = ""
        this._role = UserRoles.Teacher
        this._email = ""
        this._token = ""
    }

    public getUser() {
        return {
            displayName: this._displayName,
            avatar: this._avatar,
            role: this._role,
            email: this._email,
            token: this._token
        }
    }

    public async init() {
        try {
            const response = await fetch("/api/profile")
            const parsedResponse = await response.json()
            if (parsedResponse.success) {
                const user = JSON.parse(parsedResponse.data)

                this._displayName = user.displayName
                this._avatar = user.avatar
                this._role = user.role
                this._email = user.email
                this._token = user.token
            } else {
                setNotification("Error: Failed to load user credentials", NotificationColor.ERROR)
                console.error(parsedResponse.error)
            }
        } catch (error) {
            console.error(error)
            setNotification("Error: internal error", NotificationColor.ERROR)
        }


    }

    public initTest(role: UserRoles | undefined = UserRoles.Teacher) {
        this._avatar = "https://lh3.googleusercontent.com/a/ACg8ocLkpRYBSzWRTMqCEmsgdTMpw9jEp9u5pP2ron4ZTdN4S7lI7Jsl=s96-c"
        this._displayName = "Iker Borrallo"
        this._role = role;
        this._email = "ikerborr@gmail.com";
    }

    public isTeacher(): boolean {
        return this._role === UserRoles.Teacher
    }
}

const UserClient = new CUserClient()
export default UserClient
