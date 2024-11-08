import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {Check, ChevronsUpDown} from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {useCallback, useMemo, useState} from "react";
import {cn} from "@/utils/functions/utils";

interface StudentOption {
    id: number;
    name: string;
}

type StudentsComboboxProps = {
    options: StudentOption[];
    onSelect: ({id, name}: { id: number, name: string }) => void;
}

export default function StudentsCombobox({options, onSelect}: StudentsComboboxProps) {
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>();

    const selectedStudentName = useMemo(() => {
        const student = options.find((student) => student.id === selectedId);
        return student ? student.name : "Select student...";
    }, [options, selectedId]);

    const handleSelect = useCallback(
        (id: number, name: string) => {
            const newSelectedId = id === selectedId ? null : id;
            if (!newSelectedId) {
                return
            }
            setSelectedId(newSelectedId);
            onSelect({id: newSelectedId, name: name});
            setOpen(false);
        },
        [selectedId, onSelect]
    );

    const toggleOpen = useCallback(() => {
        setOpen((prev) => !prev);
    }, []);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[300px] justify-between border-gray-400"
                    onClick={toggleOpen}
                >
                    {selectedStudentName}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
                <Command>
                    <CommandInput placeholder="Search student..."/>
                    <CommandList>
                        <CommandEmpty>No student found.</CommandEmpty>
                        <CommandGroup>
                            {options.map((student) => (
                                <CommandItem
                                    key={student.id}
                                    value={student.name}
                                    onSelect={() => handleSelect(student.id, student.name)}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selectedId === student.id ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {student.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
