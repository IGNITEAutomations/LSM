import ModelClass from "@/lib/DB/Classes/model";
import {Group} from "@/hooks/ClassesProvider";
import {Days} from "@/utils/Days";
import {QueueDataItem, QueueItem} from "@/lib/Queue/queue";
import {ClassDB, SchoolDB, SkillsTypes, StudentDB} from "@/utils/types/types";
import {SkillMatrix} from "@/hooks/SkillsProvider/CommonProvider";


class CClasses {

    public async getAll(): Promise<Group[]> {
        const schools = await ModelClass.getClasses();
        if (!schools) return [];

        return schools.map((school) => this.formatGroupData(school));
    }

    public async getClassesByTeacher(teacherEmail: string): Promise<Group[]> {
        const teacher = await ModelClass.getTeacher(teacherEmail);
        if (!teacher || !teacher.classes) return [];

        return teacher.classes.map((group) => this.formatGroupData(group));
    }

    public async getChallenges(classID: number, teacherEmail: string) {
        const [challenges, challengesHeaders] = await Promise.all([ModelClass.getChallengesByClass(classID, teacherEmail), ModelClass.getChallengesHeaders()]);

        if (!challenges || !challengesHeaders || !challenges.students) return [];

        return {
            headers: challengesHeaders.map(challenge => challenge.name),
            matrix: challenges.students.map((student) => {
                const studentChallenges = new Set(student.Challenges.map(challenge => challenge.challengeId));
                return {
                    student: {
                        displayName: `${student.name} ${student.surname}` ,
                        id: student.id
                    },
                    challenges: challengesHeaders.map(challenge => ({
                        id: challenge.id,
                        value: studentChallenges.has(challenge.id)
                    }))
                };
            })
        };
    }

    public async getSkills(classID: number, teacherEmail: string, type: SkillsTypes) {
        const [skills, skillsOptions] = await Promise.all([
          ModelClass.getSkillsByClass(classID, teacherEmail, type),
          ModelClass.getSkillsOptions(type)
        ]);

        if (!skills?.students || !skillsOptions) return [];

        const options = skillsOptions.map(({ id, name }) => ({ id, label: name }));

        const matrix = skills.students.map(({ id, name, surname, Skills }) => ({
          student: { id, displayName: `${name} ${surname}` },
          skills: Skills.map(({ skill }) => ({
            id: skill.id,
            value: skill.name
          }))
            .slice(0, 3)
            .concat(Array(3 - Skills.length).fill({ id: "", value: "" }))
        }));

        return { options, matrix } as SkillMatrix;
    }

    public async updateStudentsSkills(data: QueueDataItem[]): Promise<boolean> {
        const insertsSkills: { studentId: number; skillId: string }[] = [];
        const deleteSkills: { studentId: number; skillId: string }[] = [];

        const toInsertSet = new Set<string>();
        const toDeleteSet = new Set<string>();

        for (let i = data.length - 1; i >= 0; i--) {
            const item = data[i];
            const elementKey = `${item.studentId}-${item.evaluationId}`;
            const element = { studentId: item.studentId, skillId: item.evaluationId };

            if (item.value && !toDeleteSet.has(elementKey)) {
                insertsSkills.push(element);
                toInsertSet.add(elementKey);
            } else if (!toInsertSet.has(elementKey)) {
                deleteSkills.push(element);
                toDeleteSet.add(elementKey);
            }
        }

        const insertResult = await ModelClass.insertStudentSkills(insertsSkills);
        const deleteResult = await ModelClass.deleteStudentSkills(deleteSkills);

        return insertResult && deleteResult;
    }

    public async updateStudentsChallenges(data: QueueDataItem[]): Promise<boolean> {
        const insertsChallenges: { studentId: number; challengeId: string }[] = [];
        const deleteChallenges: { studentId: number; challengeId: string }[] = [];

        const toInsertSet = new Set<string>();
        const toDeleteSet = new Set<string>();

        for (let i = data.length - 1; i >= 0; i--) {
            const item = data[i];
            const elementKey = `${item.studentId}-${item.evaluationId}`;
            const element = { studentId: item.studentId, challengeId: item.evaluationId };

            if (item.value && !toDeleteSet.has(elementKey)) {
                insertsChallenges.push(element);
                toInsertSet.add(elementKey);
            } else if (!toInsertSet.has(elementKey)) {
                deleteChallenges.push(element);
                toDeleteSet.add(elementKey);
            }
        }

        const insertResult = await ModelClass.insertStudentChallenge(insertsChallenges);
        const deleteResult = await ModelClass.deleteStudentChallenge(deleteChallenges);

        return insertResult && deleteResult;
    }

    public async getNotAssignedGroups(teacherEmail: string) {
        const groups = await ModelClass.getNotAssignedGroups(teacherEmail)
        if (groups)
            return groups.map(group => (this.formatGroupData(group)))
        else return []
    }

    public async assignGroup(teacherEmail: string, classId: number) {
        return await ModelClass.assignGroup(teacherEmail, classId)
    }

    public async unassignGroup(teacherEmail: string, classId: number) {
        return await ModelClass.unassignGroup(teacherEmail, classId)
    }

    public async getStudents(classId: number) {
        const group = await ModelClass.getStudents(classId)
        if (!group) return []
        return group.map(student => ({
            id: student.id,
            name: `${student.name} ${student.surname}`,
            email: student.email,
            password: student.password,
            activated: student.activated
        }))
    }

    public async addNewStudent(name: string, surname: string, classId: number) {
        await ModelClass.addNewStudent(name, surname, classId)
        return
    }

    public async  updateActiveStatusStudent(studentId: number, value: boolean) {
        await ModelClass.updateActiveStatusStudent(studentId, value)
        return
    }

    private processImportData(studentsMatrix: string[][]) {
        const students: StudentDB[] = []
        const schools: SchoolDB[] = []
        const classes: ClassDB[] = []

        let lastSchool = -1
        let lastClass = -1

        for (const student of studentsMatrix) {
            const classId = parseInt(student[7])
            students.push({
                name: student[2],
                surname: student[3],
                email: student[0],
                password: student[1],
                activated: student[6] === "true",
                classId: classId
            })

            if (lastClass != classId) {
                const schoolId = Math.floor(classId / 100)
                classes.push({name: student[4], day: Days.Monday, id: classId, schoolId: schoolId})
                lastClass = classId
                if (lastSchool != schoolId) {
                    schools.push({id: schoolId, name: student[5]})
                }
            }
        }
        return {students, schools, classes}
    }

    public async importData(data: string[][]) {
        const {students, schools, classes} = this.processImportData(data)
        try {
            const schoolsOk = await ModelClass.insertSchool(schools)
            const classOK = await ModelClass.insertClasses(classes)
            const studentsOK = await ModelClass.insertStudents(students)
            return {success: (schoolsOk && classOK && studentsOK), data: "ok"}
        } catch (error) {
            console.error((error as Error).message)
            return {success: false, error: JSON.stringify((error as Error).message)}
        }
    }

    public async reloadImportData(data: string[][]) {
        const {students, schools, classes} = this.processImportData(data)
        try {
            const schoolsOk = await ModelClass.reupdateSchoolsData(schools)
            const classOK = await ModelClass.reupdateClassesData(classes)
            const studentsOK = await ModelClass.reupdateStudentsData(students)
            return {success: (schoolsOk && classOK && studentsOK), data: "ok"}
        } catch (error) {
            console.error((error as Error).message)
            return {success: false, error: JSON.stringify((error as Error).message)}
        }
    }

    public async deleteData() {
        console.error("deleting")
       await ModelClass.deleteData()
    }

    private formatGroupData(group: any): Group {
        return {
            id: group.id.toString().padStart(4, '0'),
            school: group.school.name,
            group: group.name,
            day: group.day as Days,
            numStudents: group.students.length,
            action: false
        };
    }
}

const Classes = new CClasses();
export default Classes;
