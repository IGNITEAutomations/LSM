import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {RotateCcw} from "lucide-react";
import {useCallback, useEffect, useState} from "react";

interface SelectTabProps {
    title: string;
    required?: boolean;
    value?: string;
    onChange?: (value: string) => void;
    values: string[];
    finalText: string
}

export default function SelectTab({
                                      title,
                                      required = false,
                                      value = "",
                                      onChange,
                                      values,
                                        finalText
                                  }: SelectTabProps) {
    const [currValue, setValue] = useState(value);

    const handleChangeValue = useCallback(
        (newValue: string) => {
            setValue(newValue);
            onChange?.(newValue);
        },
        [onChange]
    );

    useEffect(() => {
        setValue(value);
    }, [value]);

    return (
        <section className="flex flex-col gap-5 mt-5 mx-12 grow">
            <div className="border-b border-b-gray-200 pb-2">
                <h2 className="text-lg font-medium">{title}:</h2>
                <h3 className="text-gray-600 text-sm">
                    {!required && "(Optional) "}Choose one of the following options:
                </h3>
            </div>
            <Select value={currValue} onValueChange={handleChangeValue}>
                <div className="flex flex-row w-full gap-5 items-center">
                    <SelectTrigger className="grow">
                        <SelectValue placeholder="Select"/>
                    </SelectTrigger>
                    <RotateCcw
                        className="w-5 h-5 text-gray-500 hover:text-gray-600 cursor-pointer"
                        onClick={() => handleChangeValue("")}
                    />
                </div>
                <SelectContent>
                    {values.map((valueItem, i) => (
                        <SelectItem key={`opt${i}`} value={valueItem}>
                            {valueItem}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Textarea className={"grow"} value={finalText} disabled/>
        </section>
    );
}
