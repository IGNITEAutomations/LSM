import ModelClass from "@/lib/DB/Classes/model";

type ClassType = {
    id: number,
    name: string,
    group: string,
    day: string,
    num_students: number
}

class CClasses {
    public async getAll() {
        const data = await ModelClass.getClasses()
        if (data)
            return data.map((item): ClassType => {
                return ({
                    id: item.school.id,
                    name: item.school.name,
                    group: item.name,
                    day: item.day,
                    num_students: item.students.length
                })
        })
        else
            return []
    }
}

const Classes = new CClasses()
export default Classes