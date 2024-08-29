"use client"

import {createSkillGenericContext} from "@/hooks/SkillsProvider/CommonProvider";
import {SkillsTypes} from "@/utils/types/types";

const [useSteamSkills, SteamSkillsProvider] = createSkillGenericContext(SkillsTypes.SteamSkill)
export {useSteamSkills, SteamSkillsProvider}