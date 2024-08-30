import {Group} from "@/hooks/ClassesProvider";
import {Table, TBody, TCell, THead, TRow} from "@/app/(logged)/(teacher)/_components/Table";
import DropAction from "@/app/(logged)/(teacher)/desktop/components/DropAction";

type DesktopTableProps = {
    headers: string[];
    data: Group[];
    onDelete: (classId: string) => void;
    onView: (classId: string) => void;
}

export default function DesktopTable({ headers, data, onDelete, onView }: DesktopTableProps) {
    return (
        <Table>
            <THead headers={headers} empty={true} />
            <TBody>
                {data.map((row) => (
                    <TRow key={row.id} enableColor={true} clickEnable={true} onClick={() => onView(row.id)}>
                        <TCell>{row.id}</TCell>
                        <TCell>{row.school}</TCell>
                        <TCell>{row.group}</TCell>
                        <TCell>{row.day}</TCell>
                        <TCell>{row.numStudents}</TCell>
                        <TCell>
                            <DropAction remove={(e) => { e.stopPropagation(); onDelete(row.id); }} />
                        </TCell>
                    </TRow>
                ))}
            </TBody>
        </Table>
    );
}