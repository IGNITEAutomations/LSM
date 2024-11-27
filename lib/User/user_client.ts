import {UserRoles} from "@/lib/User/utils/users_roles";
import {NotificationColor, setNotification} from "@/lib/Notification/ClientNotification";

class CUserClient {

    private _displayName: string = "";
    private _avatar: string = "";
    private _role: UserRoles = UserRoles.Teacher;
    private _email: string = "";
    private _token: string = "";

    public user() {
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
            const response = await fetch("/api/profile", {cache: "no-cache"})
            const parsedResponse = await response.json()
            if (parsedResponse.success) {
                const user = JSON.parse(parsedResponse.data)

                this._displayName = user.displayName
                this._avatar = user.avatar
                this._role = user.role
                this._email = user.email
                this._token = user.token

                return true
            } else {
                console.error(parsedResponse.error)
            }
        } catch (error) {
            console.error(error)
            setNotification("Error: internal error", NotificationColor.ERROR)
        }
        return false
    }
}

const UserClient = new CUserClient()
export default UserClient
