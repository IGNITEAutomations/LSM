"use client"

import Image from "next/image";
import Link from "next/link";
import {
    AreaChart,
    Blocks,
    BookCheck,
    Bot,
    BriefcaseBusiness,
    Crown,
    GraduationCapIcon,
    Import,
    Medal,
    Pickaxe,
    Presentation,
    School,
    Share
} from "lucide-react";
import {usePathname} from "next/navigation";

const options = [{
    label: "Overview",
    href: "/admin/overview",
    icon: <AreaChart className={"w-5 h-5"}/>
}, {label: "Teachers", href: "/admin/teachers", icon: <BriefcaseBusiness className={"w-5 h-5"}/>}, {
    label: "Students",
    href: "/admin/students",
    icon: <GraduationCapIcon className={"w-5 h-5"}/>
}, {label: "Schools", href: "/admin/schools", icon: <School className={"w-5 h-5"}/>}, {
    label: "Classes",
    href: "/admin/classes",
    icon: <Presentation className={"w-5 h-5"}/>
}, {label: "Challenges", href: "/admin/challenges", icon: <Pickaxe className={"w-5 h-5"}/>}, {
    label: "Soft Skills",
    href: "/admin/soft_skills",
    icon: <Blocks className={"w-5 h-5"}/>
}, {label: "STEAM Skills", href: "/admin/steam_skills", icon: <Bot className={"w-5 h-5"}/>}, {
    label: "Mentions",
    href: "/admin/mentions",
    icon: <Medal className={"w-5 h-5"}/>
}, {label: "Best of", href: "/admin/best_of", icon: <Crown className={"w-5 h-5"}/>}, {
    label: "Evaluations",
    href: "/admin/evaluations",
    icon: <BookCheck className={"w-5 h-5"}/>
}, {label: "Import", href: "/admin/import", icon: <Import className={"w-5 h-5"}/>}]

export default function Nav() {
    const page = usePathname()

    return (<nav
            className={"w-[20%] bg-white flex flex-col justify-between px-8 py-5 border border-gray-100 ml-2 rounded-2xl my-5 sticky top-0 left-0"}>
            <Link href={"/"} className={"h-20 flex items-center"}><Image src={"/img/ignite_logo.png"}
                                                                         alt={"ignite logo"} width={120} height={120}/></Link>
            <div className={"grow flex flex-col justify-between pt-8 pb-10"}>
                {options.map((option, i) => (<Link key={i} href={option.href}
                                                   className={`flex flex-row gap-4 h-11 text-sm items-center px-3 rounded-lg -ml-3 hover:bg-gray-100 ${page === option.href ? "bg-blue-100 text-blue-1002 font-medium" : "bg-white text-gray-500"}`}>
                        {option.icon}
                        <p>{option.label}</p>
                    </Link>))}
            </div>

        </nav>)
}