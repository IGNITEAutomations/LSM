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

    public async getTeacher(teacherEmail: string) {
        try {
            return await prismadb.teacher.findUnique({
                where: {
                    email: teacherEmail
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

    public async getChallengesByClass(classId: number, teacherEmail: string) {
        try {
            return await prismadb.class.findUnique({
                where: {
                    id: classId,
                    teachers: {
                        some: {
                            email: teacherEmail
                        }
                    }
                },
                include: {
                    students: {
                        where: {
                            activated: true
                        },
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

    public async getSkillsByClass(classId: number, teacherEmail: string, type: SkillsTypes) {
        try {
            return prismadb.class.findUnique({
                where: {
                    id: classId,
                    teachers: {
                        some: {
                            email: teacherEmail
                        }
                    }
                }, include: {
                    students: {
                        where: {
                            activated: true
                        },
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

    public async insertStudentSkills(items: {studentId: number, skillId: string}[]) {
        try {
            await prismadb.skills.createMany({
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

    public async deleteStudentSkills(items: {studentId: number, skillId: string}[]) {
        try {
            await prismadb.skills.deleteMany({
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

    public async getNotAssignedGroups(teacherEmail: string) {
        try {
            return await prismadb.class.findMany({
                where: {
                    teachers: {
                        none: {
                            email: teacherEmail
                        }
                    }
                }, include: {
                    school: true,
                    students: true
                }
            })
        } catch (error) {
            console.error(error)
        }
    }

    public async assignGroup(teacherEmail: string, classId: number) {
        try {
            await prismadb.class.update({
                where: {
                    id: classId
                },
                data: {
                    teachers: {
                        connect: {
                            email: teacherEmail
                        }
                    }
                }
            })
            return true
        } catch (error) {
            console.error(error)
            return false
        }
    }

    public async unassignGroup(teacherEmail: string, classId: number) {
        try {
            await prismadb.class.update({
                where: {
                    id: classId,
                },
                data: {
                    teachers: {
                        disconnect: {
                            email: teacherEmail
                        }
                    }
                }
            })
            return true
        } catch (error) {
            console.error(error)
            return false
        }
    }

    public async getStudents(classId: number) {
        try {
            const students = await prismadb.class.findUnique({
                where: {
                    id: classId
                },
                include: {
                    students: true
                }
            })
            if (!students || !students.students)
                return []
            return students.students.filter(student => student.email != '')
        } catch (error) {
            console.error(error)
        }
    }

    public async addNewStudent(name: string, surname: string, classId: number) {
        try {
            return prismadb.student.create({
                data: {
                    name: name,
                    surname: surname,
                    password: "IgniteSP",
                    activated: true,
                    classId: classId,
                    email: ""
                }
            })
        } catch (error) {
            console.error(error)
        }
    }

    public async updateActiveStatusStudent(studentId: number, value: boolean) {
        try {
            return prismadb.student.update({
                where: {
                    id: studentId
                },
                data: {
                    activated: value
                }
            })
        } catch (error) {
            console.error(error)
        }
    }
}

const ModelClass = new CModelClass()
export default ModelClass