"use client"

import {createSkillGenericContext} from "@/hooks/SkillsProvider/CommonProvider";

const [useMentions, MentionsProvider] = createSkillGenericContext("/api/mentions/get")
export {useMentions, MentionsProvider}