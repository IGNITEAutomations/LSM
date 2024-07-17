import prismadb from "@/prisma/prismadb";

class CModelClass {
    public async getClasses() {
        try {
            return prismadb.class.findMany({
                include: {
                    school: true, students: true
                }
            })
        } catch (error) {
            console.error("Error getting classes data: " + error)
        }
    }
}

const ModelClass = new CModelClass()
export default ModelClass