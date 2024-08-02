import {Days} from "@/utils/Days";

export default class CGroup {

    private _id: string
    private _groupName: string
    private _day: Days
    private _students: number

    constructor(id: string, groupName: string, day: Days, students: number){
        this._id = id
        this._groupName = groupName
        this._day = day
        this._students = students
    }

    get id() {
        return this._id
    }

    get groupName() {
        return this._groupName
    }

    get day() {
        return this._day
    }

    get students() {
        return this._students
    }
}