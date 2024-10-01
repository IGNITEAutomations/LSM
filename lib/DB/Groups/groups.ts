import ModelGroup from "@/lib/DB/Groups/model";
import {Group} from "@/hooks/GroupsProvider";
import {Days} from "@/utils/Days";
import {QueueDataItem} from "@/lib/Queue/queue";
import {GroupDB, SchoolDB, SkillsTypes, StudentDB} from "@/utils/types/types";
import {SkillMatrix} from "@/hooks/SkillsProvider/CommonProvider";
import NameComparator, {StudentList} from "@/utils/functions/ProcessImportData";
import generateRandomPassword from "@/utils/functions/createRandomPassword";

class CGroup {
    public async getAll(): Promise<Group[]> {
        const groups = await ModelGroup.getGroups();
        if (!groups) return [];
        return groups.map((group) => this.formatGroupData(group));
    }

    public async getGroupsByTeacher(teacherEmail: string): Promise<Group[]> {
        const teacher = await ModelGroup.getTeacher(teacherEmail);
        if (!teacher || !teacher.groups) return [];
        return teacher.groups.map((group) => this.formatGroupData(group));
    }

    public async getChallenges(groupID: number, teacherEmail: string) {
        const [challenges, challengesHeaders] = await Promise.all([ModelGroup.getChallengesByGroup(groupID, teacherEmail), ModelGroup.getChallengesHeaders(),]);

        if (!challenges?.students || !challengesHeaders) {
            return {headers: [], matrix: []};
        }

        const headers = challengesHeaders.map((challenge) => challenge.name);
        const matrix = challenges.students.map((student) => {
            const studentChallenges = new Set(student.Challenges.map((challenge) => challenge.challengeId));
            return {
                student: {
                    displayName: `${student.name} ${student.surname}`,
                    id: student.id,
                }, challenges: challengesHeaders.map((challenge) => ({
                    id: challenge.id, value: studentChallenges.has(challenge.id),
                })),
            };
        });

        return {headers, matrix};
    }

    public async getSkills(groupID: number, teacherEmail: string, type: SkillsTypes): Promise<SkillMatrix> {
        const [skills, skillsOptions] = await Promise.all([ModelGroup.getSkillsByGroup(groupID, teacherEmail, type), ModelGroup.getSkillsOptions(type),]);

        if (!skills?.students || !skillsOptions) {
            return {options: [], matrix: []};
        }

        const options = skillsOptions.map(({id, name}) => ({id, label: name}));

        const matrix = skills.students.map(({id, name, surname, Skills}) => {
            const skillsList = Skills.map(({skill}) => ({
                id: skill.id, value: skill.name,
            }));
            const paddedSkills = skillsList
                .concat(Array(3).fill({id: "", value: ""}))
                .slice(0, 3);
            return {
                student: {id, displayName: `${name} ${surname}`}, skills: paddedSkills,
            };
        });

        return {options, matrix};
    }

    public async updateStudentsSkills(data: QueueDataItem[]): Promise<boolean> {
        const skillUpdates = new Map<string, { studentId: number; skillId: string; value: boolean }>();

        data.forEach((item) => {
            const elementKey = `${item.studentId}-${item.evaluationId}`;
            skillUpdates.set(elementKey, {
                studentId: item.studentId, skillId: item.evaluationId, value: item.value as boolean,
            });
        });

        const insertsSkills: { studentId: number; skillId: string }[] = [];
        const deleteSkills: { studentId: number; skillId: string }[] = [];

        skillUpdates.forEach(({studentId, skillId, value}) => {
            if (value) {
                insertsSkills.push({studentId, skillId});
            } else {
                deleteSkills.push({studentId, skillId});
            }
        });

        const [insertResult, deleteResult] = await Promise.all([ModelGroup.insertStudentSkills(insertsSkills), ModelGroup.deleteStudentSkills(deleteSkills),]);
        return insertResult && deleteResult;
    }


    public async updateStudentsChallenges(data: QueueDataItem[]): Promise<boolean> {
        const challengeUpdates = new Map<string, { studentId: number; challengeId: string; value: boolean }>();

        data.forEach((item) => {
            const elementKey = `${item.studentId}-${item.evaluationId}`;
            challengeUpdates.set(elementKey, {
                studentId: item.studentId, challengeId: item.evaluationId, value: item.value as boolean,
            });
        });

        const insertsChallenges: { studentId: number; challengeId: string }[] = [];
        const deleteChallenges: { studentId: number; challengeId: string }[] = [];

        challengeUpdates.forEach(({studentId, challengeId, value}) => {
            if (value) {
                insertsChallenges.push({studentId, challengeId});
            } else {
                deleteChallenges.push({studentId, challengeId});
            }
        });

        const [insertResult, deleteResult] = await Promise.all([ModelGroup.insertStudentChallenge(insertsChallenges), ModelGroup.deleteStudentChallenge(deleteChallenges),]);
        return insertResult && deleteResult;
    }


    public async getNotAssignedGroups(teacherEmail: string): Promise<Group[]> {
        const groups = (await ModelGroup.getNotAssignedGroups(teacherEmail)) ?? [];
        return groups.map((group) => this.formatGroupData(group));
    }

    public assignGroup(teacherEmail: string, groupId: number) {
        return ModelGroup.assignGroup(teacherEmail, groupId);
    }

    public unassignGroup(teacherEmail: string, groupId: number) {
        return ModelGroup.unassignGroup(teacherEmail, groupId);
    }

    public async getStudents(groupId: number) {
        const students = await ModelGroup.getStudents(groupId);
        if (!students) return [];
        return students.map((student) => ({
            ...student, name: `${student.name} ${student.surname}`,
        }));
    }

    public addNewStudent(name: string, surname: string, groupId: number) {
        return ModelGroup.addNewStudent(name, surname, groupId);
    }

    public updateActiveStatusStudent(studentId: number, value: boolean) {
        return ModelGroup.updateActiveStatusStudent(studentId, value);
    }

    public async importData(data: StudentList[]) {
        const [students, schools, groups] = this.processImportData(data.map((student) => [student.email ?? "", student.password, student.name, student.surname, student.role, student.school!, student.activated.toString(), student.groupId.toString()])) as [StudentList[], SchoolDB[], GroupDB[]];

        try {
            const groupsDB = await ModelGroup.getGroups();

            const schoolsFromDBMap = new Map<number, SchoolDB>();
            groupsDB?.forEach((group) => {
                const schoolId = group.schoolId;
                if (!schoolsFromDBMap.has(schoolId)) {
                    schoolsFromDBMap.set(schoolId, {
                        id: schoolId, name: group.school.name,
                    });
                }
            });
            const schoolsFromDB = Array.from(schoolsFromDBMap.values());

            const uniqueSchools = this.getUniqueObjsById(schools, schoolsFromDB);
            const uniqueGroups = this.getUniqueObjsById(groups, groupsDB as GroupDB[] ?? []);

            const schoolsOk = await ModelGroup.insertSchool(uniqueSchools)
            const groupOK = await ModelGroup.insertGroups(uniqueGroups)
            const studentsOK = await ModelGroup.insertStudents(this.studentListToStudentDB(students))

            return {
                success: schoolsOk && groupOK && studentsOK, data: "ok",
            };
        } catch (error) {
            console.error((error as Error).message);
            return {success: false, error: (error as Error).message};
        }
    }

    public async findNewStudents(data: string[][]) {
        let newStudents: StudentList[] = [];
        let reStudents: { student: StudentList; nextGroupId: number }[] = [];
        let similarStudents: { searched: StudentList; found: StudentList[] }[] = [];

        const studentsFromDB = (await ModelGroup.getAllStudents())?.map((student) => {
            const {group, ...data} = student;
            return {
                ...data, role: group.name, school: group.school.name,
            };
        }) || [];

        const [studentsCSV, , groupsCSV] = this.processImportData(data) as [StudentList[], SchoolDB[], GroupDB[]];

        try {
            const groups = await ModelGroup.getGroups();

            for (const group of groupsCSV) {
                const filteredStudentsCSV = studentsCSV.filter((student) => student.groupId === group.id);
                const filteredStudentsBD = studentsFromDB.filter(student => student.groupId === group.id)

                if (filteredStudentsCSV.length > 0) {
                    const nameComparator = new NameComparator();
                    const [tmpNewStudents, tmpReStudents, tmpSimilarStudents,] = nameComparator.getSimilarData(filteredStudentsCSV, filteredStudentsBD);

                    newStudents = newStudents.concat(tmpNewStudents as StudentList[]);
                    reStudents = reStudents.concat(tmpReStudents as { student: StudentList; nextGroupId: number }[]);
                    similarStudents = similarStudents.concat(tmpSimilarStudents as { searched: StudentList; found: StudentList[] }[]);
                }
            }
            return {
                success: true, data: JSON.stringify({
                    new: newStudents, updated: reStudents, similar: similarStudents,
                }),
            };
        } catch (error) {
            console.error("Error en findNewStudents:", error);
            return {success: false, error: (error as Error).message};
        }
    }

    public async deleteData() {
        console.error("Deleting data...");
        await ModelGroup.deleteData();
    }

    private processImportData(studentsMatrix: string[][]) {
        const students: StudentList[] = [];
        const schoolsMap = new Map<number, SchoolDB>();
        const groupsMap = new Map<number, GroupDB>();

        for (const studentRow of studentsMatrix) {
            const [email, password, name, surname, role, schoolName, activatedStr, groupIdStr] = studentRow;

            const groupId = parseInt(groupIdStr);
            const schoolId = Math.floor(groupId / 100);

            const student: StudentList = {
                name: name,
                surname: surname,
                email: email,
                password: (password == "" || password == null) ? generateRandomPassword() : password,
                activated: activatedStr === "true",
                groupId: groupId,
                role: role,
                school: schoolName,
            };

            students.push(student);

            if (!groupsMap.has(groupId)) {
                groupsMap.set(groupId, {
                    id: groupId, name: role, day: Days.Monday, schoolId,
                });
            }

            if (!schoolsMap.has(schoolId)) {
                schoolsMap.set(schoolId, {
                    id: schoolId, name: schoolName,
                });
            }
        }

        const schools = Array.from(schoolsMap.values());
        const groups = Array.from(groupsMap.values());

        return [students, schools, groups];
    }

    private getUniqueObjsById<T extends { id: number }>(arr1: T[], arr2: T[]): T[] {
        const arr2Ids = new Set(arr2.map((item) => item.id));
        return arr1.filter((item) => !arr2Ids.has(item.id));
    }

    private studentListToStudentDB(students: StudentList[]): StudentDB[] {
        return students.map(student => ({
            name: student.name,
            surname: student.surname,
            email: student.email ?? "",
            password: student.password,
            activated: student.activated,
            groupId: student.groupId
        }))
    }

    private formatGroupData(group: any): Group {
        return {
            id: group.id.toString().padStart(4, "0"),
            school: group.school.name,
            group: group.name,
            day: group.day as Days,
            numStudents: group.students.length,
            action: false,
        };
    }
}

const Groups = new CGroup();
export default Groups;
