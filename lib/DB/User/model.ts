import prismadb from "@/prisma/prismadb";

class CModelUser {

    public async find(userId: string) {
        try {
            return prismadb.teacher.findUnique({
                where: {
                    uid: userId
                }
            })

        } catch (error) {
            console.error("Error: " + error)
        }
    }

}

const ModelUser = new CModelUser()
export default ModelUser