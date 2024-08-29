import ModelClass from "@/lib/DB/Classes/model";
import {Group} from "@/hooks/ClassesProvider";
import {Days} from "@/utils/Days";
import {QueueDataItem, QueueItem} from "@/lib/Queue/queue";
import {SkillsTypes} from "@/utils/types/types";
import {SkillMatrix} from "@/hooks/SkillsProvider/CommonProvider";
import {opt} from "ts-interface-checker";

class CClasses {

    public async getAll(): Promise<Group[]> {
        const schools = await ModelClass.getClasses();
        if (!schools) return [];

        return schools.map((school) => this.formatGroupData(school));
    }

    public async getClassesByTeacher(teacherId: string): Promise<Group[]> {
        const teacher = await ModelClass.getTeacher(teacherId);
        if (!teacher || !teacher.classes) return [];

        return teacher.classes.map((group) => this.formatGroupData(group));
    }

    public async getChallenges(classID: number, teacherId: string) {
        const [challenges, challengesHeaders] = await Promise.all([ModelClass.getChallengesByClass(classID, teacherId), ModelClass.getChallengesHeaders()]);

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

    public async getSkills(classID: number, teacherId: string, type: SkillsTypes) {
        const [skills, skillsOptions] = await Promise.all([
          ModelClass.getSkillsByClass(classID, teacherId, type),
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
