"use client";

import React, { FC, ReactNode, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { Days } from "@/utils/Days";
import { NotificationColor, setNotification } from "@/lib/Notification/ClientNotification";

export type Group = {
  id: string;
  school: string;
  group: string;
  day: Days;
  numStudents: number;
  action: boolean;
};

type Groups = {
  groups: Group[];
  notAssignedGroups: Group[];
  assignNewGroup: (id: string) => Promise<boolean>;
  removeGroup: (id: string) => void;
  getClassName: (id: string) => string;
};

const ClassesContext = React.createContext<Groups | undefined>(undefined);

type ClassesProviderProps = {
  children: ReactNode;
};

export const ClassesProvider: FC<ClassesProviderProps> = ({ children }) => {
  const [assignedGroups, setAssignedGroups] = useState<Group[]>([]);
  const [notAssignedGroups, setNotAssignedGroups] = useState<Group[]>([]);

  const assignNewGroup = useCallback(async (id: string) => {
    const group = notAssignedGroups.find(group => group.id === id);
    if (!group) {
        console.warn(`Group with id ${id} not found in notAssignedGroups`);
        return false;
    }

    try {
        const response = await fetch("/api/groups/assign", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ classId: group.id })
        });

        if (!response.ok) throw new Error("Network response was not ok.")

        const result = await response.json();
        if (!result) throw new Error("Server returned an invalid response.")

        setAssignedGroups(prevGroups => [...prevGroups, group]);
        setNotAssignedGroups(prevGroups => prevGroups.filter(g => g.id !== id));

        return true;
    } catch (error) {
        console.error("An error occurred while assigning the group:", error);
        return false;
    }
}, [notAssignedGroups]);

  const removeGroup = useCallback(async (id: string) => {
    const unassignedGroup = assignedGroups.find(group => group.id === id)
    try {
        const response = await fetch("/api/groups/unassign", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ classId: unassignedGroup?.id })
        });

        if (!response.ok) throw new Error("Network response was not ok.")

        const result = await response.json();
        if (!result) throw new Error("Server returned an invalid response.")

        setAssignedGroups(prevGroups => prevGroups.filter(group => group.id !== id));
        setNotAssignedGroups(prevState => [...prevState, unassignedGroup!])

        setNotification("Group unassigned successfully 👍", NotificationColor.SUCCESS)

        return true;
    } catch (error) {
        console.error("An error occurred while unassigning the group:", error);
        return false;
    }
  }, [assignedGroups]);

  const getClassName = useCallback((id: string) => {
    const group = assignedGroups.find(group => group.id === id);
    return group ? `${group.school} - ${group.group}` : "";
  }, [assignedGroups]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch("/api/groups");
        if (!response.ok) throw new Error("Failed to fetch groups");

        const data = await response.json();
        if (data.success) {
          setAssignedGroups(data.data.assigned);
          setNotAssignedGroups(data.data.notAssigned);
        } else {
          setNotification("Internal error: Failed to load classes", NotificationColor.ERROR);
        }
      } catch (error) {
        console.error(error);
        setNotification("Internal error: Failed to load classes", NotificationColor.ERROR);
      }
    };

    fetchGroups();
  }, []);

  const contextValue = useMemo(() => ({
    groups: assignedGroups,
    notAssignedGroups,
    assignNewGroup,
    removeGroup,
    getClassName
  }), [assignedGroups, notAssignedGroups, assignNewGroup, removeGroup, getClassName]);

  return (
    <ClassesContext.Provider value={contextValue}>
      {children}
    </ClassesContext.Provider>
  );
};

export const useClasses = (): Groups => {
  const context = useContext(ClassesContext);
  if (!context) {
    throw new Error("useClasses must be used within a ClassesProvider");
  }
  return context;
};