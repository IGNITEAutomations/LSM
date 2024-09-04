import {AddStudent} from "@/app/(logged)/(coordinator)/_components/AddStudent";
import StudentsTable from "@/app/(logged)/admin/students/_components/StudentsTable";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import WorkingPage from "@/app/(logged)/admin/_components/WorkinPage";
import AdminSection from "@/app/(logged)/admin/_components/AdminSection";

export default function StudentsPage() {
    return (
        <div className={"flex flex-col w-full h-full"}>
            <h1 className={"text-black font-medium"}>Students</h1>
            <AdminSection>
                <Tabs defaultValue="list" className="w-full" >
                    <TabsList>
                        <TabsTrigger value="list">List</TabsTrigger>
                        <TabsTrigger value="newPetitions">New petitions</TabsTrigger>
                    </TabsList>
                    <TabsContent value="list">
                        <StudentsList/>
                    </TabsContent>
                    <TabsContent value="newPetitions">
                        <WorkingPage/>
                    </TabsContent>
                </Tabs>
            </AdminSection>
        </div>
    )
}

function StudentsList() {
    return (
        <div>
            <AddStudent classId="1000"/>
            <StudentsTable classId="1000"/>
        </div>
    )
}