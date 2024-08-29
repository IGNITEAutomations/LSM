"use client"

import { useState, useMemo, useCallback } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import {Option} from "@/utils/types/types";

type ComboBoxProps = {
    options: Option[]
    name?: string ,
    onChange: (value: string) => void;
}

export default function ComboBox({ options, name = "option", onChange }: ComboBoxProps) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    const handleChange = useCallback((currentValue: string) => {
        const nextValue = value === currentValue ? "" : currentValue
        onChange(nextValue)
        setValue(nextValue)
        setOpen(false);
      }, [onChange, value]
    );

    const selectedSkill = useMemo(() => options.find(option => option.id === value)?.label, [options, value]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={"w-[250px] px-3 h-8 justify-between text-sm text-gray-700 font-normal outline-0"}
                >
                    {selectedSkill || <p className={"text-sm text-gray-400"}>{`Select`}</p>}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] p-0">
                <Command>
                    <CommandInput placeholder={`Search ${name}...`}/>
                    <CommandList>
                        <CommandEmpty>{`No ${name} found.`}</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.id}
                                    value={option.label}
                                    onSelect={(value) => handleChange(option.id)}
                                >
                                    <Check
                                        className={cn("mr-2 h-4 w-4", value === option.label ? "opacity-100" : "opacity-0")}
                                    />
                                    {option.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}