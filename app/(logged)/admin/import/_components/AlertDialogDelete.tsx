import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

type AlertDialogDemoProps = {
    isOpen: boolean;
    onAccept: () => void;
    onCancel: () => void;
};

export default function AlertDialogDelete({ isOpen, onAccept, onCancel }: AlertDialogDemoProps) {
    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        You are about to import new values into the database. During this process, all existing records,
                        including students and their achievements, will be permanently deleted. Once deleted, this data
                        cannot be recovered. Are you sure you want to proceed with this operation?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onAccept}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}