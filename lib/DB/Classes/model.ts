import prismadb from "@/prisma/prismadb";
import {ClassDB, SchoolDB, SkillsTypes, StudentDB} from "@/utils/types/types";
import {response} from "express";

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

    public async insertStudents(students: StudentDB[]) {
        if (!students) return false

        await prismadb.student.createMany({
            data: students
        })
        return true
    }

    public async insertSchool(schools: SchoolDB[]) {
        if (!schools) return false

        await prismadb.school.createMany({
            data: schools
        })
        return true
    }

    public async insertClasses(classes: ClassDB[]) {
        if (!classes) return false

        await prismadb.class.createMany({
            data: classes
        })
        return true
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

    public async deleteData(): Promise<void> {
        const truncateQueries = [
            `TRUNCATE TABLE "School" RESTART IDENTITY CASCADE`,
            `TRUNCATE TABLE "Student" RESTART IDENTITY CASCADE`,
            `TRUNCATE TABLE "Class" RESTART IDENTITY CASCADE`
        ];

        try {
            await prismadb.$transaction(
                truncateQueries.map(query => prismadb.$executeRawUnsafe(query))
            );
        } catch (error) {
            console.error('Error truncating tables:', error);
            throw new Error('Failed to delete data from the database.');
        }
    }

    public async reupdateStudentsData(students: StudentDB[]) {
        try {
            const upsertPromises = students.map(student =>
                prismadb.student.upsert({
                  where: { email: student.email },
                  update: {
                      name: student.name,
                      surname: student.surname,
                      password: student.password,
                      activated: student.activated,
                      classId: student.classId
                  },
                  create: {
                      name: student.name,
                      email: student.email,
                      surname: student.surname,
                      password: student.password,
                      activated: student.activated,
                      classId: student.classId
                  },
                })
              );
              await Promise.all(upsertPromises);
              return true
        } catch (error) {
            console.error(error)
        }
        return false
    }

    public async reupdateSchoolsData(schools: SchoolDB[]) {
        try {
            const upsertPromises = schools.map(school =>
                prismadb.school.upsert({
                  where: { id: school.id },
                  update: {
                      name: school.name
                  },
                  create: {
                      id: school.id,
                      name: school.name
                  },
                })
              );
              await Promise.all(upsertPromises);
              return true
        } catch (error) {
            console.error(error)
        }
        return false
    }

    public async reupdateClassesData(classes: ClassDB[]) {
        try {
            const upsertPromises = classes.map(group =>
                prismadb.class.upsert({
                  where: { id: group.id },
                  update: {
                      name: group.name
                  },
                  create: {
                      id: group.id,
                      name: group.name,
                      schoolId: group.schoolId,
                      day: group.day
                  },
                })
              );
              await Promise.all(upsertPromises);
              return true
        } catch (error) {
            console.error(error)
        }
        return false
    }
}

const ModelClass = new CModelClass()
export default ModelClass