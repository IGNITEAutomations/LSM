import ModelClass from "@/lib/DB/Classes/model";
import {Group} from "@/hooks/ClassesProvider";
import {Days} from "@/utils/Days";
import {QueueItem} from "@/lib/Queue/queue";

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

    public async updateStudentsChallenges(data: QueueItem[]): Promise<boolean> {
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
