import ModelUser from "@/lib/DB/User/model";


class CUser {
    public async login(userId: string) {
        return Boolean(await ModelUser.find(userId))
    }
}

const User = new CUser()
export default User