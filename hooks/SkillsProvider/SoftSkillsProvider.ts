"use client"

import {createSkillGenericContext} from "@/hooks/SkillsProvider/CommonProvider";
import {SkillsTypes} from "@/utils/types/types";

const [useSoftSkills, SoftSkillsProvider] = createSkillGenericContext(SkillsTypes.SoftSkill)
export {useSoftSkills, SoftSkillsProvider}