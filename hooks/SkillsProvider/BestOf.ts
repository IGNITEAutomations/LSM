"use client"

import {createSkillGenericContext} from "@/hooks/SkillsProvider/CommonProvider";
import {SkillsTypes} from "@/utils/types/types";

const [useBestOf, BestOfProvider] = createSkillGenericContext(SkillsTypes.BestOf)
export {useBestOf, BestOfProvider}