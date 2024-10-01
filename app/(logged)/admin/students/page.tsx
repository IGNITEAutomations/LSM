import {AddStudent} from "@/app/(logged)/(coordinator)/_components/AddStudent";
import StudentsTable from "@/app/(logged)/admin/students/_components/StudentsTable";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import WorkingPage from "@/app/(logged)/admin/_components/WorkinPage";
import {AdminPage, AdminSection} from "@/app/(logged)/admin/_components/AdminSection";

export default function StudentsPage() {
    return (
        <AdminPage>
            <h1 className={"text-black font-medium"}>Students</h1>
            <AdminSection>
                <Tabs defaultValue="newPetitions" className="w-full flex flex-col">
                    <TabsList className={"w-fit"}>
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
        </AdminPage>
    )
}

function StudentsList() {
    return (
        <div>
            <AddStudent groupId="1000"/>
            <StudentsTable groupId="1000"/>
        </div>
    )
}