import {StudentList} from "@/utils/functions/ProcessImportData";
import {ChangeEvent, useEffect, useState} from "react";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {SquareArrowOutUpRight} from "lucide-react";
import {Table, TBody, TCell, THead, TRow} from "@/app/(logged)/_components/Table";
import {Button} from "@/components/ui/button";
import {StudentItem} from "@/app/(logged)/admin/import/_components/IssuesTab";

export default function IssuesDialog({student, loadStudent, removeIssue}: {student: StudentItem, loadStudent: (student: StudentList) => void, removeIssue: (studentId: number) => void}) {
    const header = ["Email", "Name", "Surname", "Group Id", "Select"];
    const [studentChecked, setStudentChecked] = useState<StudentList | null>(null)


    const handleCheck = (e: ChangeEvent<HTMLInputElement>, student: StudentList) => {
        if (e.target.checked) {
            setStudentChecked(student)
        }
        else {
            setStudentChecked(null)
        }
    }

    useEffect(() => {
    }, [studentChecked]);

    const handleLoad = () => {
        if (studentChecked != null) {
            loadStudent(studentChecked)
            setStudentChecked(null)
            removeIssue(student.id)
        }
    }

    return (
        <Dialog>
          <DialogTrigger><SquareArrowOutUpRight className={"w-4 h-4 text-blue-1001 stroke-[3px]"}/></DialogTrigger>
          <DialogContent className={"w-[50%] min-w-[700px]"}>
            <DialogHeader>
              <DialogTitle>Student selector</DialogTitle>
              <DialogDescription>
                Some students with similar names have been detected. Please select the student(s) you wish to import.
              </DialogDescription>
            </DialogHeader>
              <section className={"flex flex-col"}>
                  <h4 className={"text-sm font-semibold text-gray-700 relative top-3 left-3 bg-white px-2 w-fit"}>Searched</h4>
                  <div className={"border border-gray-200 rounded-xl p-2 mb-3"}>
                      <Table>
                          <THead empty={true} headers={header}/>
                          <TBody>
                              <TRow>
                                  <TCell>{student.searched.email ?? "none"}</TCell>
                                  <TCell>{student.searched.name ?? "none"}</TCell>
                                  <TCell>{student.searched.surname ?? "none"}</TCell>
                                  <TCell>{student.searched.groupId ?? "none"}</TCell>
                                  <TCell>
                                      <div className={"w-10"}>
                                          <input
                                              type={"checkbox"}
                                              defaultChecked={false}
                                              checked={studentChecked?.email === student.searched.email}
                                              onChange={(e) => handleCheck(e, student.searched)}/>
                                      </div>
                                  </TCell>
                              </TRow>
                          </TBody>
                      </Table>
                  </div>
                  <h4 className={"text-sm font-semibold text-gray-700 relative top-3 left-3 bg-white px-2 w-fit"}>Found</h4>
                  <div className={"border border-gray-200 rounded-xl p-2 mb-3 max-h-[300px] overflow-y-auto"}>
                      <Table>
                          <THead empty={true} headers={header}/>
                          <TBody>
                              {student.found.map((foundStudent, i) => (
                                  <TRow key={i + "a"}>
                                      <TCell>{foundStudent.email ?? "none"}</TCell>
                                      <TCell>{foundStudent.name ?? "none"}</TCell>
                                      <TCell>{foundStudent.surname ?? "none"}</TCell>
                                      <TCell>{foundStudent.groupId ?? "none"}</TCell>
                                      <TCell>
                                          <div className={"w-10"}>
                                              <input
                                                  type={"checkbox"}
                                                  defaultChecked={false}
                                                  checked={studentChecked?.email === foundStudent.email}
                                                  onChange={(e) => handleCheck(e, {
                                                      ...foundStudent,
                                                      groupId: student.searched.groupId,
                                                      role: student.searched.role,
                                                      facebook: student.searched.facebook,
                                                      school: student.searched.school
                                              })}/>
                                          </div>
                                      </TCell>
                                  </TRow>
                              ))}
                          </TBody>
                      </Table>
                  </div>
              </section>
              <DialogFooter>
                <DialogClose className={"flex flex-row gap-3"}>
                    <Button className={"text-gray-700 text-sm bg-white border border-gray-300 px-4 py-2 rounded-xl hover:bg-gray-100"}>Cancel</Button>
                </DialogClose>
                  <DialogClose disabled={studentChecked === null}>
                      <Button
                          disabled={studentChecked === null}
                          onClick={handleLoad}
                          className={"text-white text-sm bg-blue-1002 px-4 py-2 rounded-xl hover:bg-blue-1001"}>
                          Load
                      </Button>
                  </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    )
}