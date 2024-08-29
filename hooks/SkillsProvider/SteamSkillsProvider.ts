"use client"

import {createSkillGenericContext} from "@/hooks/SkillsProvider/CommonProvider";

const [useSteamSkills, SteamSkillsProvider] = createSkillGenericContext("/api/steam_skills/get")
export {useSteamSkills, SteamSkillsProvider}