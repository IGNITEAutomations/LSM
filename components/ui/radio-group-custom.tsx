import Link from "next/link";
import {Button} from "@/components/ui/button";
import React, {Children, isValidElement, useState, memo, useCallback} from "react";

interface RadioGroupProps {
    children: React.ReactNode;
    defaultIndex?: number
}

interface RadioGroupItemProps {
    href?: string;
    active?: boolean;
    onSelect?: () => void;
    children?: React.ReactNode;
    className?: string;
}

export function RadioGroupCustom({children, defaultIndex}: RadioGroupProps) {
    const [currentOption, setCurrentOption] = useState(defaultIndex ?? -1);

    const handleChange = useCallback((option: number) => setCurrentOption(option), []);

    return (
        <section className="flex justify-center">
            <div className="bg-gray-50 rounded-3xl flex flex-row gap-1">
                {Children.map(children, (child, i) => {
                    if (isValidElement(child) && child.type === RadioGroupCustomItem) {
                        return (
                            <RadioGroupCustomItem
                                href={child.props.href}
                                onSelect={() => handleChange(i)}
                                active={child.props.active ?? currentOption === i}
                            >
                                {child.props.children}
                            </RadioGroupCustomItem>
                        );
                    }
                    return null;
                })}
            </div>
        </section>
    );
};

export const RadioGroupCustomItem = memo(({href, active, onSelect, children, className}: RadioGroupItemProps) => {
    const buttonClasses = `rounded-3xl text-sm font-light p-3 h-8 ${active ? "bg-yellow-1001 text-white hover:bg-yellow-1001" : "bg-transparent text-yellow-1000 hover:bg-yellow-100"} ${className}`;

    const ButtonContent = (

        <Button className={buttonClasses} onClick={onSelect}>
            {children}
        </Button>
    );

    return href ? <Link href={href}>{ButtonContent}</Link> : ButtonContent;
});

RadioGroupCustomItem.displayName = "RadioGroupItem";
