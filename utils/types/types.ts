import {UserRoles} from "@/lib/User/utils/users_roles";
import {Days} from "@/utils/Days";

export type Student = {
  id: number;
  displayName: string;
};

export type Teacher = {
  displayName: string,
  name: string,
  email: string,
  role: UserRoles
  uid?: string,
  token?: string,
  id?: number
}

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

export type StudentDB = {
    name: string,
    surname: string,
    email: string,
    password: string,
    activated: boolean,
    groupId: number
}

export type SchoolDB = {
    id: number,
    name: string
}

export type GroupDB = {
    id: number,
    name: string,
    schoolId: number,
    day: Days
}