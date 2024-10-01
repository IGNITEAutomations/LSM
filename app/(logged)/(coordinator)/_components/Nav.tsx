"use client";

import {ArrowLeft} from "lucide-react";
import Link from "next/link";
import {useCallback} from "react";
import {useChallenges} from "@/hooks/ChallengesProvider";
import {useSoftSkills} from "@/hooks/SkillsProvider/SoftSkillsProvider";
import {useSteamSkills} from "@/hooks/SkillsProvider/SteamSkillsProvider";
import {useMentions} from "@/hooks/SkillsProvider/MentionsProvider";

interface ReturnBtnProps {
    p: number;
    groupId: string;
}

export default function ReturnBtn({p, groupId}: ReturnBtnProps) {
    const challenges = useChallenges();
    const softSkills = useSoftSkills();
    const steamSkills = useSteamSkills();
    const mentions = useMentions();

    const handleExit = useCallback(() => {
        challenges.restart();
        softSkills.restart();
        steamSkills.restart();
        mentions.restart();
    }, [challenges, softSkills, steamSkills, mentions]);

    const href = p === 1 ? `/challenges?id=${groupId}` : `/`;

    return (<div className="flex mb-8">
            <Link
                onClick={handleExit}
                href={href}
                className={"h-8 w-8 bg-blue-1002 rounded-3xl hover:bg-blue-1001"}
                aria-label="Return"
            >
                <ArrowLeft className="w-8 h-8 p-1.5 text-white"/>
            </Link>
        </div>);
}