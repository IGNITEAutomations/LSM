"use client"

import {createSkillGenericContext} from "@/hooks/SkillsProvider/CommonProvider";

const [useSoftSkills, SoftSkillsProvider] = createSkillGenericContext("/api/soft_skills/get")
export {useSoftSkills, SoftSkillsProvider}