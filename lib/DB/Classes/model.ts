import prismadb from "@/prisma/prismadb";

class CModelClass {
    public async getClasses() {
        try {
            return prismadb.class.findMany({
                include: {
                    students: true, school: true
                }
            })
        } catch (error) {
            console.error("Error getting classes data: " + error)
        }
    }

    public async getTeacher(teacherId: string) {
        try {
            return await prismadb.teacher.findUnique({
                where: {
                    uid: teacherId
                },
                include: {
                    classes: {
                        include: {
                            students: true
                        }
                    }
                }

            })
        } catch (error) {
            console.error("Error getting classes data: " + error)
        }
    }

    public async getChallengesByClass(classId: number, teacherId: string) {
        console.log("classID: " + classId)
        console.log("teacherID: " + teacherId)
        try {
            return await prismadb.class.findUnique({
                where: {
                    id: classId,
                    teacherUid: teacherId
                },
                include: {
                    students: {
                        include: {
                            Challenges: {
                                include: {
                                    challenge: true
                                }
                            },
                            Skills: true
                        }
                    }
                }
            })
        } catch (error) {
            console.error("Error getting challenges data: " + error)
        }
    }
}

const ModelClass = new CModelClass()
export default ModelClass