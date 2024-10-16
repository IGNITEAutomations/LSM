"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import AddGroupBtn from "@/app/(logged)/(teacher)/desktop/components/AddGroupBtn";
import DesktopTable from "@/app/(logged)/(teacher)/desktop/components/DesktopTable";
import { useGroups } from "@/hooks/GroupsProvider";
import { NotificationColor, setNotification } from "@/lib/Notification/ClientNotification";

export default function Desktop() {
  const searchParams = useSearchParams();
  const groupId = searchParams.get("groupId");
  const groups = useGroups();

  useEffect(() => {
    if (!groupId || !groups.loaded) return;

    if (groups.getGroupName(groupId)) return;

    const assignGroup = async () => {
      try {
        const response = await groups.assignNewGroup(groupId);
        if (response) {
          setNotification("Nuevo grupo asignado 👍", NotificationColor.SUCCESS);
        }
      } catch (error) {
        setNotification("Error al asignar el grupo", NotificationColor.ERROR);
      }
    };

    assignGroup();
  }, [groupId, groups.loaded]);

  return (
    <section className="flex flex-col flex-1 gap-5">
      <div className="flex flex-col gap-2">
        <h1>Mis grupos</h1>
        <h2>Gestiona tus grupos y visualiza las últimas anotaciones.</h2>
      </div>
      <div className="flex justify-end">
        <AddGroupBtn />
      </div>
      <DesktopTable />
    </section>
  );
}
