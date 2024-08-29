import Link from "next/link";
import {Button} from "@/components/ui/button";
import {usePathname} from "next/navigation";

type option = {
    label: string,
    href: string
}
type ToggleGroupProps = {
    options: Array<option>
    def: number
}

export default function ToggleGroup({options, def}: ToggleGroupProps) {
    return (
        <section className={"flex justify-center"}>
            <div className={"bg-gray-50 rounded-3xl flex flex-row gap-1"}>
                {
                    options?.map((option, i) => {
                        return (
                            <Link key={option.label} href={option.href}>
                                <Button
                                    className={"hover:bg-yellow-1000 hover:text-white rounded-3xl text-sm font-light p-3 h-8 " + (def === i ? "bg-yellow-1001 text-white" : "bg-transparent text-yellow-1000")}>
                                    {option.label}
                                </Button>
                            </Link>
                        )
                    })
                }
            </div>
        </section>

    )
}