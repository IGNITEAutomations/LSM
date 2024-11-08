"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGroups } from "@/hooks/GroupsProvider";
import Navigation from "@/app/(logged)/_components/nav";
import SavedIndicator from "@/app/(logged)/(teacher)/_components/SavedIndicator";
import StudentsCombobox from "@/app/(logged)/(teacher)/reporting/_components/StudentsCombobox";
import { Textarea } from "@/components/ui/textarea";
import ReportingDialog from "@/app/(logged)/(teacher)/reporting/_components/ReportingDialog";
import { useReporting } from "@/hooks/ReportingProvider";

type Student = {
  id: number;
  name: string;
};

export default function ReportingPage() {
  const [student, setStudent] = useState<Student>({ id: -1, name: "" });
  const reporting = useReporting();
  const groups = useGroups();
  const groupId = useSearchParams().get("id") ?? "";

  return (
    <main className="flex flex-col max-h-[650px]">
      <SavedIndicator />
      <Navigation groupId={groupId} />
      <h1>Reporting</h1>
      <h2>{groups.getGroupName(groupId)}</h2>
      <section className="mt-8 flex-1 flex flex-col gap-5 overflow-y-auto pt-3">
        <div className="flex flex-row justify-between">
          <StudentsCombobox
            onSelect={setStudent}
            options={reporting.students}
          />
          <ReportingDialog
            disabled={student.id < 0}
            name={student.name}
            id={student.id}
          />
        </div>
        <Textarea
          className="border-gray-500"
          disabled
          defaultValue={reporting.getNote(student.id)}
        />
      </section>
    </main>
  );
}
