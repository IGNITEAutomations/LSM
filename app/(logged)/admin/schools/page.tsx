import WorkingPage from "@/app/(logged)/admin/_components/WorkinPage";
import {AdminPage, AdminSection} from "@/app/(logged)/admin/_components/AdminSection";

export default function SchoolsPage() {
    return (
        <AdminPage>
            <h1 className={"text-black font-medium"}>Schools</h1>
            <AdminSection>
                <WorkingPage/>
            </AdminSection>
        </AdminPage>
    )
}