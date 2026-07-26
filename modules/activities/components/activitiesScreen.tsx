'use client'

/* eslint-disable @typescript-eslint/no-empty-object-type */
import { UseAppData } from "@/hooks/app/useAppData";
import { UseActivitiesHookActions } from "../hooks/activities.actions.hooks";
import { useEffect } from "react";
import { ListActivitiesComponent } from "./ActivitiesList";

type ActivitiesScreenProps = {

}

export const ActivitiesScreen = ({ }: ActivitiesScreenProps) => {
  const useAppData = UseAppData()
  const activitiesAction = UseActivitiesHookActions({})

  useEffect(() => {
    if (useAppData.workspace?.id) {
      activitiesAction.GetActivitiesAction({ workspaceId: useAppData.workspace?.id })
    }
  }, [useAppData.workspace])

  return (
    <>
      <div className="app-section space-y-2">
        <div className="">
          <h1 className="text-lg text-foreground font-semibold">Listado de actividades</h1>
        </div>
        <div>
          <ListActivitiesComponent />
        </div>
      </div>

    </>
  )
}