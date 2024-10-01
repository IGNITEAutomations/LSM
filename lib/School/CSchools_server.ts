/*import {Days} from "@/utils/Days";
import CGroup from "@/lib/School/CGroup";

type bdSchool = {
    id: string,
    name: string
}

type bdGroup = {
    id: string,
    name: string,
    day: Days,
    school: bdSchool
}

class CSchoolsServer {

    private _schools: Record<string, CGroup>

    constructor(groups: bdGroup[]) {
        this._schools = {}
        for(const group of groups) {
            if (group.school.id in this._schools) {
                this._schools[group.school.id].addGroup(group)
            } else {
                this._schools[group.school.id] = new CSchool(group.school.id, group.school.name, [group])
            }
        }
    }

    process groups(): clientSchoolGroup[] {
        let groups: clientSchoolGroup[] = []

        for (const school of Object.values(this._schools)) {
            const group =
            groups = groups.concat(school.groups)
        }

        return groups
    }

    public getSchoolsById(schoolsId: string[]): CSchool[] {
        const schools: CSchool[] = []
        for(const id of schoolsId) {
            if (id in this._schools) {
                schools.push(this._schools[id])
            }
        }
        return schools
    }

    public getSchoolById(schoolId: string) : CSchool | undefined {
        if (schoolId in this._schools) {
            return this._schools[schoolId]
        }
        return undefined
    }

    public getSchoolByName(name: string) : CSchool | undefined {
        for(const school of Object.values(this._schools)) {
            if (school.name === name)
                return school
        }
        return undefined
    }

}*/