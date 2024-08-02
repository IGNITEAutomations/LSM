import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Plus} from "lucide-react";
import Combobox from "@/components/atomi/Combobox";
import {useEffect, useState} from "react";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Days} from "@/utils/Days";

type option = {
    value: string, label: string
}
const schools: option[] = [
    {value: "1234", label: "Fedac Horta"},
    {value: "1235", label: "Fedac Sant Andreu"},
    {value: "1236", label: "Fedac Amilcar"},
    {value: "1237", label: "Fedac Santa Coloma"},
]

const enum GroupsTypes {
    Robotics = "0",
    Coding = "1"
}

const groupTypesOptions: option[] = [
    {value: "0", label: "Robotics ESO"},
    {value: "1", label: "Coding PRIM"}
]

type group = {
    id: string,
    school: string,
    group: string,
    day: Days,
    action: boolean
}

let groups: group[] = [
    {id: "1234", school: "Fedac Horta", group:  "Robotics ESO", day: Days.Monday, action: true}
]


export default function AddClassBtn() {
    const [school, setSchool] = useState("")
    const [group, setGroup] = useState("")
    const [day, setDay] = useState("")
    const [currGroups, setCurrGroups] = useState<group[]>([])

    useEffect(() => {
        const temp = (group == "0" || !group) ? groups : []
        setCurrGroups(filter(school, 0, temp))
    }, [school, group]);

    function filter(key: string, index: number, groups: group[]) {
        if (!key)
            return groups
        return groups?.filter((group) => Object.values(group)[index] === key)
    }

    return (
        <Dialog>
            <DialogTrigger className={"flex flex-row items-center w-fit px-4 h-7 font-light text-sm text-white rounded-xl bg-yellow-1000 hover:bg-yellow-1001 absolute -top-14"}>
                <Plus className={"w-4 h-4 stroke-1.5"}/> Add class
            </DialogTrigger>
            <DialogContent className={"sm:min-w-[80%] md:min-w-[50%]"}>
                <DialogHeader>
                    <DialogTitle className={"text-blue-1001"}>Classes available</DialogTitle>
                    <DialogDescription>
                        Select the classes you wish to add. These will be automatically linked to your account. If you wish, you can unlink them later.
                    </DialogDescription>
                </DialogHeader>
                <section className={"flex flex-col gap-4"}>
                    <div>
                        <h2 className={"text-sm font-medium border-b border-b-gray-100 mb-2"}>Filter</h2>
                        <div className={"flex flex-row gap-2"}>
                            <Combobox options={schools} label={"school"} onChange={(school) => setSchool(school)}/>
                            <Combobox options={groupTypesOptions} label={"group"} onChange={(group) => setGroup(group)}/>
                            {/*<Combobox options={schools} label={"day"} onChange={(day) => setDay(day)}/>*/}
                        </div>
                    </div>
                    <div>
                        <h2 className={"text-sm font-medium border-b border-b-gray-100 mb-2"}>Classes</h2>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className={"w-[15%]"}>Class Id</TableHead>
                                    <TableHead className={"w-[25%]"}>School</TableHead>
                                    <TableHead className={"w-[30%]"}>Group</TableHead>
                                    <TableHead className={"w-[20%]"}>Day</TableHead>
                                    <TableHead className={"w-[10%]"}>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    currGroups.map((group, i) => {
                                        return (
                                            <TableRow key={i}>
                                                <TableCell>{group.id}</TableCell>
                                                <TableCell>{group.school}</TableCell>
                                                <TableCell>{group.group}</TableCell>
                                                <TableCell>{group.day}</TableCell>
                                                <TableCell className={"flex justify-center"}><Plus className={"w-5 text-green-500 hover:scale-125 cursor-pointer"}/></TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </div>
                </section>
            </DialogContent>
        </Dialog>
    )
}

