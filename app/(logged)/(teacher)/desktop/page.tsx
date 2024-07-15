import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {Plus, Trash, Trash2} from "lucide-react";

export default function DefaultPage() {

    type Class = {
        school: string, group: string, day: string, classId: number
    }
    const classesTest: Class[] = [{
        school: "Fedac Horta", group: "3r-4t Primaria", day: "dimarts", classId: 1234
    }, {school: "Fedac Horta", group: "3r-4t Primaria", day: "dimarts", classId: 1234}, {
        school: "Fedac Horta", group: "3r-4t Primaria", day: "dimarts", classId: 1234
    }, {school: "Fedac Horta", group: "3r-4t Primaria", day: "dimarts", classId: 1234}, {
        school: "Fedac Horta", group: "3r-4t Primaria", day: "dimarts", classId: 1234
    }]

    return (<section className={"flex flex-col gap-5 max-h-full h-full max-w-full"}>
        <div className={"flex flex-row w-full justify-between"}>
            <h1>My classes</h1>
            <Button className={"bg-white border border-green-500 w-10 h-10 rounded-xl text-green-500 hover:bg-green-500 hover:text-white p-0"}><Plus/></Button>
        </div>


        <section className={"flex flex-col gap-5"}>
            <div className={"w-full flex justify-end items-center gap-2"}>
                <p className={"text-sm gray-700"}>Groups by page:</p>
                <Select>
                    <SelectTrigger className="w-14 text-xs">
                        <SelectValue className={"text-blue-700"} defaultValue={"5"} placeholder={"5"}/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem className={"text-xs"} value="5">10</SelectItem>
                        <SelectItem className={"text-xs"} value="10">15</SelectItem>
                        <SelectItem className={"text-xs"} value="15">20</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className={"flex flex-wrap justify-between gap-y-5 max-h-full h-full max-w-full"}>
                {classesTest.map((group) => {
                    return (<Card className={"h-fit w-64"} key={group.classId}>
                        <CardHeader>
                            <CardTitle>{group.school}</CardTitle>
                            <CardDescription className={"text-gray-400"}>{group.group}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className={"text-sm"}>Day: <span className={"text-gray-700" +
                                ""}>{group.day}</span></p>
                            <p className={"text-sm"}>Class Id: <span className={"text-gray-700" +
                                ""}>{group.classId}</span></p>
                        </CardContent>
                        <CardFooter className={"gap-3"}>
                            <Button className={"w-full bg-blue-white border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"}>View</Button>
                            <Button className={"text-red-500 bg-white border border-red-500 hover:bg-red-500 hover:text-white"}><Trash2 className={"w-4 h-4"}/></Button>
                        </CardFooter>
                    </Card>)
                })}
            </div>

        </section>


        <section>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#"/>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#2">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#3">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis/>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#"/>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>

        </section>

    </section>)
}