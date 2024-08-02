import CGroup from "@/lib/School/CGroup";
import {Days} from "@/utils/Days";

export type extendedGroup = {
    groupId: string,
    schoolName: string,
    groupName: string,
    day: Days,
    students: number
}

export default class CSchool {

    private _id: string
    private _name: string
    private _groups: CGroup[]

    constructor(id: string, name: string, groups: CGroup[]) {
        this._id = id
        this._name = name
        this._groups = groups
    }

    get groups(): extendedGroup[] {
        const groups: extendedGroup[] = []

        for (const group of this._groups) {
            groups.push({
                groupId: group.id,
                schoolName: this._name,
                groupName: group.groupName,
                day: group.day,
                students: group.students
            })
        }
        return groups
    }

}