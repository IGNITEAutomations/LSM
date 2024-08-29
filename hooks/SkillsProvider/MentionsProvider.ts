"use client"

import {createSkillGenericContext} from "@/hooks/SkillsProvider/CommonProvider";
import {SkillsTypes} from "@/utils/types/types";

const [useMentions, MentionsProvider] = createSkillGenericContext(SkillsTypes.Mention)
export {useMentions, MentionsProvider}