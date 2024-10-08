import prismadb from "@/prisma/prismadb";

class CModelUser {

    public async findByUserId(teacherEmail: string) {
        try {
            return prismadb.teacher.findUnique({
                where: {
                    email: teacherEmail
                }
            })
        } catch (error) {
            console.error("Error: " + error)
        }
    }

    public async findByEmail(email: string) {
        try {
            return prismadb.teacher.findUnique({
                where: {
                    email: email
                }
            })
        } catch (error) {
            console.error("Error: " + error)
        }
    }

    public async updateUid(email: string, uid: string) {
        try {
            return prismadb.teacher.update({
                where: {
                    email: email
                }, data: {
                    uid: uid
                }
            })
        } catch (error) {
            console.error("Error: " + error)
        }
    }
}

const ModelUser = new CModelUser()
export default ModelUser