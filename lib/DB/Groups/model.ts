import prismadb from "@/prisma/prismadb";
import {GroupDB, SchoolDB, SkillsTypes, StudentDB} from "@/utils/types/types";

class CModelGroup {
    public async getGroups() {
        try {
            return prismadb.group.findMany({
                include: {
                    students: true, school: true
                }
            })
        } catch (error) {
            console.error("Error getting groups data: " + error)
        }
    }

    public async getTeacher(teacherEmail: string) {
        try {
            return await prismadb.teacher.findUnique({
                where: {
                    email: teacherEmail
                }, include: {
                    groups: {
                        include: {
                            students: {
                                where: {
                                    activated: true
                                }
                            },
                            school: true,
                        },
                    }
                }

            })
        } catch (error) {
            console.error("Error getting groups data: " + error)
        }
    }
    
    public async getChallengesByGroup(groupId: number, teacherEmail: string) {
        try {
            return await prismadb.group.findUnique({
                where: {
                    id: groupId, teachers: {
                        some: {
                            email: teacherEmail
                        }
                    }
                }, include: {
                    students: {
                        where: {
                            activated: true
                        }, include: {
                            Challenges: {
                                include: {
                                    challenge: true
                                }
                            }, Skills: true
                        }
                    }
                }
            })
        } catch (error) {
            console.error("Error getting challenges data: " + error)
        }
    }

    public async getSkillsByGroup(groupId: number, teacherEmail: string, type: SkillsTypes) {
        try {
            return prismadb.group.findUnique({
                where: {
                    id: groupId, teachers: {
                        some: {
                            email: teacherEmail
                        }
                    }
                }, include: {
                    students: {
                        where: {
                            activated: true
                        }, include: {
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
                    type: type.toString(),
                    activated: true
                }
            })
        } catch (error) {
            console.error("Error getting skills headers: " + error)
        }
    }

    public async getChallengesHeaders() {
        try {
            return prismadb.challengesHeaders.findMany({
                where: {
                    activated: true
                }
            })
        } catch (error) {
            console.error("Error getting challenges headers: " + error)
        }
    }

    public async insertStudentChallenge(items: { studentId: number, challengeId: string }[]) {
        try {
            await prismadb.challenges.createMany({
                data: items, skipDuplicates: true
            })
        } catch (error) {
            console.error(error)
            return false
        }
        return true
    }

    public async insertStudentSkills(items: { studentId: number, skillId: string }[]) {
        try {
            await prismadb.skills.createMany({
                data: items, skipDuplicates: true
            })
        } catch (error) {
            console.error(error)
            return false
        }
        return true
    }

    public async deleteStudentChallenge(items: { studentId: number, challengeId: string }[]) {
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

    public async deleteStudentSkills(items: { studentId: number, skillId: string }[]) {
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
            return await prismadb.group.findMany({
                where: {
                    teachers: {
                        none: {
                            email: teacherEmail
                        }
                    }
                }, include: {
                    school: true,
                    students: {
                        where: {
                            activated: true
                        }
                    }
                }
            })
        } catch (error) {
            console.error(error)
        }
    }

    public async assignGroup(teacherEmail: string, groupId: number) {
        try {
            await prismadb.group.update({
                where: {
                    id: groupId
                }, data: {
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

    public async unassignGroup(teacherEmail: string, groupId: number) {
        try {
            await prismadb.group.update({
                where: {
                    id: groupId,
                }, data: {
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

    public async getStudents(groupId: number) {
        try {
            const students = await prismadb.group.findUnique({
                where: {
                    id: groupId
                }, include: {
                    students: true
                }
            })
            if (!students || !students.students) return []
            return students.students.filter(student => student.email != '')
        } catch (error) {
            console.error(error)
        }
    }

    public async addNewStudent(name: string, surname: string, groupId: number) {

        try {
            return prismadb.student.create({
                data: {
                    name: name, surname: surname, password: "IgniteSP", activated: true, groupId: groupId, email: ""
                }
            })
        } catch (error) {
            console.error(error)
        }
    }

    public async insertStudents(students: StudentDB[]) {
        if (!students) return false

        try {
            const values = students.map((_, index) =>
                `($${index * 6 + 1}, $${index * 6 + 2}, $${index * 6 + 3}, $${index * 6 + 4}, $${index * 6 + 5}, $${index * 6 + 6})`).join(',');

            const parameters = students.flatMap((student) => [
                student.name, student.surname, student.email, student.password, student.activated, student.groupId
            ]);

            console.log("Saving stuents")

            const query = `
            INSERT INTO "Student" (name, surname, email, password, activated, "groupId")
            VALUES ${values}
            ON CONFLICT (email) DO UPDATE SET
              name = EXCLUDED.name,
              surname = EXCLUDED.surname,
              password = EXCLUDED.password,
              activated = EXCLUDED.activated,
              "groupId" = EXCLUDED."groupId";
            `;

            await prismadb.$executeRawUnsafe(query, ...parameters);
            return true

        } catch (error) {
            console.error(error)
            return false
        }
    }

    public async insertSchool(schools: SchoolDB[]) {
        if (!schools) return false

        await prismadb.school.createMany({
            data: schools
        })
        return true
    }

    public async insertGroups(groups: GroupDB[]) {
        if (!groups) return false

        await prismadb.group.createMany({
            data: groups
        })
        return true
    }

    public async updateActiveStatusStudent(studentId: number, value: boolean) {
        try {
            return prismadb.student.update({
                where: {
                    id: studentId
                }, data: {
                    activated: value
                }
            })
        } catch (error) {
            console.error(error)
        }
    }

    public async deleteData(): Promise<void> {
        const truncateQueries = [`TRUNCATE TABLE "School" RESTART IDENTITY CASCADE`, `TRUNCATE TABLE "Student" RESTART IDENTITY CASCADE`, `TRUNCATE TABLE "Group" RESTART IDENTITY CASCADE`];

        try {
            await prismadb.$transaction(truncateQueries.map(query => prismadb.$executeRawUnsafe(query)));
        } catch (error) {
            console.error('Error truncating tables:', error);
            throw new Error('Failed to delete data from the database.');
        }
    }

    public async reupdateStudentsData(students: StudentDB[]) {
        try {
            for (const student of students) {
                console.log("Saving: ")
                console.log(student)

                await prismadb.student.upsert({
                    where: {email: student.email}, update: {
                        name: student.name,
                        surname: student.surname,
                        password: student.password,
                        activated: student.activated,
                        groupId: student.groupId
                    }, create: {
                        name: student.name,
                        email: student.email,
                        surname: student.surname,
                        password: student.password,
                        activated: student.activated,
                        groupId: student.groupId
                    },
                })
            }

            /*const upsertPromises = students.map(student =>
                 prismadb.student.upsert({
                  where: { email: student.email },
                  update: {
                      name: student.name,
                      surname: student.surname,
                      password: student.password,
                      activated: student.activated,
                      groupId: student.groupId
                  },
                  create: {
                      name: student.name,
                      email: student.email,
                      surname: student.surname,
                      password: student.password,
                      activated: student.activated,
                      groupId: student.groupId
                  },
                })
              );
            await Promise.all(upsertPromises);*/
            return true
        } catch (error) {
            console.error(error)
        }
        return false
    }

    public async reupdateSchoolsData(schools: SchoolDB[]) {
        try {
            const upsertPromises = schools.map(school => prismadb.school.upsert({
                where: {id: school.id}, update: {
                    name: school.name
                }, create: {
                    id: school.id, name: school.name
                },
            }));
            await Promise.all(upsertPromises);
            return true
        } catch (error) {
            console.error(error)
        }
        return false
    }

    public async reupdateGroupsData(groups: GroupDB[]) {
        try {
            const upsertPromises = groups.map(group => prismadb.group.upsert({
                where: {id: group.id}, update: {
                    name: group.name
                }, create: {
                    id: group.id, name: group.name, schoolId: group.schoolId, day: group.day
                },
            }));
            await Promise.all(upsertPromises);
            return true
        } catch (error) {
            console.error(error)
        }
        return false
    }

    public async getAllStudents() {
        try {
            return prismadb.student.findMany({
                include: {
                    group: {
                        include: {
                            school: true
                        }
                    }
                }
            })
        } catch (error) {
            console.error(error)
        }
    }
}

const ModelGroup = new CModelGroup()
export default ModelGroup
