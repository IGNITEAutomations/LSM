import prismadb from "@/prisma/prismadb";
import {SkillsTypes} from "@/utils/types/types";

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
                            students: true,
                            school: true,
                        },
                    }
                }

            })
        } catch (error) {
            console.error("Error getting classes data: " + error)
        }
    }

    public async getChallengesByClass(classId: number, teacherId: string) {
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

    public async getSkillsByClass(classId: number, teacherId: string, type: SkillsTypes) {
        try {
            return prismadb.class.findUnique({
                where: {
                    id: classId,
                    teacherUid: teacherId
                }, include: {
                    students: {
                        include: {
                            Skills: {
                                where: {
                                    skill: {
                                        type: type.toString()
                                    }
                                }, include: {
                                    skill: true
                                }
                            }
                        }
                    }
                }
            })
        } catch (error) {
            console.error("Error getting challenges data: " + error)
        }
    }

    public async getSkillsOptions(type: SkillsTypes) {
        try {
            return prismadb.skillsHeaders.findMany({
                where: {
                    type: type.toString()
                }
            })
        } catch (error) {
            console.error("Error getting skills headers: " + error)
        }
    }

    public async getChallengesHeaders() {
        try {
            return prismadb.challengesHeaders.findMany()
        } catch (error) {
            console.error("Error getting challenges headers: " + error)
        }
    }

    public async insertStudentChallenge(items: {studentId: number, challengeId: string}[]) {
        try {
            await prismadb.challenges.createMany({
                data: items,
                skipDuplicates: true
            })
        } catch (error) {
            console.error(error)
            return false
        }
        return true
    }

    public async deleteStudentChallenge(items: {studentId: number, challengeId: string}[]) {
        try {
            await prismadb.challenges.deleteMany({
                where: {
                    OR: items
                }
            })
        } catch (error) {
            console.error(error)
            return false
        }
        return true
    }
}

const ModelClass = new CModelClass()
export default ModelClass