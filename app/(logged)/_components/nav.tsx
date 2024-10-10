"use client"

import {ArrowLeft, Settings2} from "lucide-react";
import Link from "next/link";
import ToggleGroup from "@/components/ui/toggle-group";
import {usePathname, useRouter} from "next/navigation";
import {useMemo} from "react";
import {useUser} from "@/hooks/UserProvider";
import {UserRoles} from "@/lib/User/utils/users_roles";

export default function Navigation({groupId}: { groupId: string }) {
    const pageName = usePathname();
    const user = useUser()

    const options = useMemo(() => [{
        label: "Challenges",
        href: `/challenges${groupId ? '?id=' + groupId : ''}`
    }, {label: "Soft skills", href: `/soft_skills${groupId ? '?id=' + groupId : ''}`}, {
        label: "STEAM skills",
        href: `/steam_skills${groupId ? '?id=' + groupId : ''}`
    }, {label: "Mentions", href: `/mentions${groupId ? '?id=' + groupId : ''}`},
    {label: "Top", href: `/top${groupId ? '?id=' + groupId : ''}`}], [groupId]);

    const currentIndex = useMemo(() => {
        return options.findIndex(option => pageName === option.href.split('?')[0]);
    }, [options, pageName]);


    return (<section className="flex flex-row items-center mb-8">
        <Link className="h-8 w-8 bg-blue-1002 rounded-3xl hover:bg-blue-1001" href="/">
            <ArrowLeft className="w-8 h-8 p-1.5 text-white"/>
        </Link>
        <div className="px-5 w-full flex justify-center">
            <ToggleGroup options={options} def={currentIndex === -1 ? 0 : currentIndex}/>
        </div>
        <div>
            {user.role === UserRoles.Coordinator ?
                <div className={"flex"}>
                    <Link href={`/manager?id=${groupId}&p=0`} className={"bg-[#C0C0C0] hover:bg-gray-400 text-white text-xs rounded-xl p-0 w-8 h-8 flex justify-center items-center"} title={"Student manager"}>
                        <Settings2 className={"h-5 w-5"}/>
                    </Link>
                </div>
                    : ""
            }
        </div>
    </section>);
}
