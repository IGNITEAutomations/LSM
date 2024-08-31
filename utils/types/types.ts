export type Student = {
  id: number;
  displayName: string;
};

export type Challenge = {
  id: string;
  value: boolean;
};

export type Skill = {
  id: string;
  value: string;
};

export type Option = {
  id: string,
  label: string
}

export enum SkillsTypes {
  SoftSkill = 0,
  SteamSkill = 1,
  Mention = 2,
  BestOf = 3
}

export type StudentData = {
  id: number,
  name: string,
  email: string,
  password: string,
  activated: boolean
}