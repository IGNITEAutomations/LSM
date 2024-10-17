import ModelUser from "@/lib/DB/User/model";


class CUser {
    public async login(email: string, uid: string) {
        const user =  await ModelUser.findByEmail(email)

        if (!user)
            return false
        else if (!user.uid)
            await ModelUser.updateUid(email, uid)

        return user
    }

    public async user(teacherEmail: string) {
        return await ModelUser.findByEmail(teacherEmail)
    }

     public async userById(uid: string) {
        return await ModelUser.findByUserId(uid)
    }
}

const User = new CUser()
export default User