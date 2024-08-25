import ModelClass from "@/lib/DB/Classes/model";
import {Group} from "@/hooks/ClassesProvider";
import {Days} from "@/utils/Days";

class CClasses {

    public async getAll() {
        const schools = await ModelClass.getClasses()
        if (schools)
            return schools.map((school): Group => {
                return ({
                    id: school.school.id.toString().padStart(4, '0'),
                    school: school.school.name,
                    group: school.name,
                    day: school.day as Days,
                    numStudents: school.students.length,
                    action: false
                })
            })
        else
            return []
    }

    public async getClassesByTeacher(teacherId: string) {
        const teacher = await ModelClass.getTeacher(teacherId)
        if (teacher && teacher.classes)
            return teacher.classes.map((group): Group => {
                return ({
                    id: group.id.toString().padStart(4, '0'),
                    school: group.name,
                    group: group.name,
                    day: group.day as Days,
                    numStudents: group.students.length,
                    action: false
                })
            })
        else
            return []
    }

    public async getChallenges(classID: number, teacherId: string) {
        const challenges = await ModelClass.getChallengesByClass(classID, teacherId)
        if (challenges && challenges.students)
            return challenges.students.map(student => {
                return ({
                    name: student.name,
                    id: student.id,
                    challenges: student.Challenges.map(challenge => {
                        return (
                            challenge.challenge.id
                        )
                    })
                })
            })
        else
            return []
    }
}

const Classes = new CClasses()
export default Classes