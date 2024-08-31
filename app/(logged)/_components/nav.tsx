"use client"

import {ArrowLeft, Settings2} from "lucide-react";
import Link from "next/link";
import ToggleGroup from "@/components/ui/toggle-group";
import {usePathname, useRouter} from "next/navigation";
import {useCallback, useMemo} from "react";
import {Button} from "@/components/ui/button";
import {useUser} from "@/hooks/UserProvider";
import {UserRoles} from "@/lib/User/utils/users_roles";

export default function Navigation({classId}: { classId: string }) {
    const pageName = usePathname();
    const user = useUser()

    const options = useMemo(() => [{
        label: "Challenges",
        href: `/challenges${classId ? '?id=' + classId : ''}`
    }, {label: "Soft skills", href: `/soft_skills${classId ? '?id=' + classId : ''}`}, {
        label: "STEAM skills",
        href: `/steam_skills${classId ? '?id=' + classId : ''}`
    }, {label: "Mentions", href: `/mentions${classId ? '?id=' + classId : ''}`},], [classId]);

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
                <div>
                    <Link href={`/manager?id=${classId}&p=0`} className={"bg-[#C0C0C0] hover:bg-gray-400 text-white text-xs rounded-xl p-0 w-8 h-8"} title={"Student manager"}>
                        <Settings2 className={"h-5 w-5"}/>
                    </Link>
                </div>
                    : ""
            }
        </div>
    </section>);
}
