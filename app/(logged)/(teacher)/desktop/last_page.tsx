"use client"

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
import {useEffect, useState} from "react";

export default function DefaultPage() {

    const [elementsByPage, setElementsByPage] = useState<number>(5)

    useEffect(() => {
        console.log(elementsByPage)
    }, [elementsByPage]);

    type Class = {
        school: string, group: string, day: string, classId: number
    }
    const classesTest: Class[] = [
        {school: "Fedac Horta", group: "3r-4t Primaria", day: "dimarts", classId: 1234},
        {school: "Fedac Horta", group: "4r-5t Primaria", day: "dimarts", classId: 1235},
        {school: "Fedac Horta", group: "5r-6t Primaria", day: "dimarts", classId: 1236},
        {school: "Fedac Horta", group: "1ESO-2ESO", day: "dimarts", classId: 1237},
        {school: "Fedac Horta", group: "p3-p4 Primaria", day: "dimarts", classId: 1238},
        {school: "Fedac Horta", group: "3ESO-4ESO Primaria", day: "dimarts", classId: 1239},
        {school: "Fedac Horta", group: "p4-p5 Primaria", day: "dimarts", classId: 1240},
        {school: "Fedac Horta", group: "p5-p6 Primaria", day: "dimarts", classId: 1241},
        {school: "Fedac Horta", group: "1r-2n", day: "dimarts", classId: 1242},
        {school: "Fedac Horta", group: "1batch-2batch", day: "dimarts", classId: 1243},
    ]

    return (<section className={"flex flex-col gap-5 h-full max-h-full max-w-full flex-1"}>
        <h1>My classes</h1>

        <section className={"flex flex-col gap-5 max-h-full h-full flex-1"}>
            <div className={"flex flex-row gap-5"}>
                <div className={"w-full flex justify-end items-center gap-2"}>
                    <p className={"text-sm gray-700"}>Groups by page:</p>
                    <Select onValueChange={(e) => setElementsByPage(parseInt(e))}>
                        <SelectTrigger className="w-14 text-xs">
                            <SelectValue className={"text-blue-700"} defaultValue={"5"} placeholder={"5"}/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem className={"text-xs"} value="10">10</SelectItem>
                            <SelectItem className={"text-xs"} value="15">15</SelectItem>
                            <SelectItem className={"text-xs"} value="20">20</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button className={"bg-white border border-green-500 w-10 h-10 rounded-xl text-green-500 hover:bg-green-500 hover:text-white p-0"}><Plus/></Button>
            </div>


            <div className={"grid grid-cols-4 gap-y-5 max-h-full h-full max-w-full"}>
                {classesTest.slice(0, 4).map((group) => {
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