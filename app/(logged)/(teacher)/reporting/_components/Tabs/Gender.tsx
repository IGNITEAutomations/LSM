import {useState} from "react";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";

interface GenderProps {
    value?: string | null;
    onChange?: (value: string) => void;
}

const options = [
    {value: "male", icon: "👦", label: "Male"},
    {value: "female", icon: "🧒", label: "Female"}
];

export default function Gender({value, onChange}: GenderProps) {
    const [internalValue, setInternalValue] = useState<string>("");

    const selectedValue = value ?? internalValue;

    const handleChange = (newValue: string) => {
        onChange ? onChange(newValue) : setInternalValue(newValue);
    };

    return (
        <section className="flex flex-col gap-5 mt-5 mx-12">
            <div className="border-b border-b-gray-200 pb-2">
                <h2 className="text-lg font-medium">Gender:</h2>
                <h3 className="text-gray-600 text-sm">Choose one of the following options:</h3>
            </div>
            <RadioGroup className="flex flex-row gap-16 min-w-80">
                {options.map((option) => (
                    <div key={option.value}>
                        <RadioGroupItem
                            id={option.value}
                            className="sr-only"
                            checked={selectedValue === option.value}
                            value={option.value}
                            onClick={() => handleChange(option.value)}
                        />
                        <Label
                            htmlFor={option.value}
                            className={`cursor-pointer h-8 w-20 flex flex-col justify-center text-center text-sm font-normal rounded-3xl gap-1 ${
                                selectedValue === option.value
                                    ? "bg-blue-1002 text-white"
                                    : "bg-white border text-blue-1001 border-blue-1002"
                            }`}
                        >
                            {/*<span className="text-3xl">{option.icon}</span>*/}
                            {option.label}
                        </Label>
                    </div>
                ))}
            </RadioGroup>
        </section>
    );
}
