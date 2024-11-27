"use client"

import {AdminPage, AdminSection} from "@/app/(logged)/admin/_components/AdminSection";
import {Button} from "@/components/ui/button";

export default function StudentsPage() {
    async function downloadCSV() {
      try {
        const response = await fetch('/api/resume', {cache: "no-cache"});

        if (!response.ok) {
          throw new Error('Error creating CSV');
        }

        const blob = await response.blob();

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'resume.csv';

        link.click();

        URL.revokeObjectURL(link.href);
      } catch (error) {
        console.error('Error downloading CSV:', error);
      }
    }

    return (
        <AdminPage>
            <h1 className={"text-black font-medium"}>Overview</h1>
            <AdminSection>
                <Button onClick={downloadCSV}>Download Resume</Button>
            </AdminSection>
        </AdminPage>
    )
}