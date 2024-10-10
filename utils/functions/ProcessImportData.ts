import distance from "jaro-winkler"

export type StudentList = {
    email: string | null;
    password: string;
    name: string;
    surname: string;
    role: string;
    facebook?: string;
    activated: boolean;
    groupId: number;
    school?: string;
    normalizedName?: string;
};

export default class NameComparator {

    private threshold: number

    constructor(threshold: number = 0.93) {
        this.threshold = threshold;
    }
    public getSimilarData(list1: StudentList[], list2: StudentList[]): [StudentList[], {
        student: StudentList;
        nextGroupId: number
    }[], { searched: StudentList; found: StudentList[] }[]] {
        const newStudents: StudentList[] = [];
        const reStudents: { student: StudentList; nextGroupId: number }[] = [];
        const similarStudents: { searched: StudentList; found: StudentList[] }[] = [];

        const normalizedList1 = list1.map((student) => ({
            ...student, normalizedName: NameComparator.normalizeName(`${student.name} ${student.surname.split(" ")[0]}`),
        }));

        const normalizedList2 = list2.map((student) => ({
            ...student, normalizedName: NameComparator.normalizeName(`${student.name} ${student.surname.split(" ")[0]}`),
        }));

        for (const student1 of normalizedList1) {
            let foundSimilar = false;
            for (const student2 of normalizedList2) {
                if (this.areSimilar(student1.normalizedName!, student2.normalizedName!)) {
                    if (student1.normalizedName === student2.normalizedName) {
                        reStudents.push({student: {...student2, activated: student1.activated, role: student1.role}, nextGroupId: student1.groupId});
                        foundSimilar = true;
                        break;
                    } else {
                        if ( similarStudents.length && similarStudents[similarStudents.length - 1].searched.normalizedName === student1.normalizedName) {
                            similarStudents[similarStudents.length - 1].found.push(student2)
                        } else {
                            similarStudents.push({searched: student1, found: [student2]});
                        }
                    }
                    foundSimilar = true;
                }
            }
            if (!foundSimilar) {
                newStudents.push(student1);
            }
        }
        return [newStudents, reStudents, similarStudents];
    }

    private static normalizeName(name: string): string {
        if (!name) return ""; // Handle null or empty cases.
        return name
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") // Remove accents.
            .toLowerCase() // Convert to lowercase.
            .replace(/[^a-z\s]/g, "") // Remove non-alphabetical characters.
            .replace(/\s+/g, " ") // Replace multiple spaces with a single space.
            .trim(); // Trim leading and trailing spaces.
    }

    private areSimilar(name1: string, name2: string) {
        return distance(name1, name2) >= this.threshold
    }
}
