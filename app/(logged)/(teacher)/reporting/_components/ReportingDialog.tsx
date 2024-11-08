import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import Wizard from "@/app/(logged)/(teacher)/reporting/_components/Wizard";

export default function ReportingDialog({name, id, disabled}: {name: string, id: number, disabled: boolean}) {

    return (
        <Dialog>
            <DialogTrigger disabled={disabled} className={"text-sm h-8 px-4 bg-blue-1002 text-white rounded-2xl"}>Evaluate</DialogTrigger>
            <DialogContent className={"flex flex-col w-[50%] h-[70%]"}>
                <DialogHeader>
                    <DialogTitle className={"text-blue-1001 mb-2"}> Reporting Wizard: {name}</DialogTitle>
                </DialogHeader>
                <Wizard id={id} name={name}/>
            </DialogContent>
        </Dialog>
    )
}