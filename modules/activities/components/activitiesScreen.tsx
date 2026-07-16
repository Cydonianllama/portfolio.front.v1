/* eslint-disable @typescript-eslint/no-empty-object-type */
import { UseAppData } from "@/hooks/app/useAppData";
import { UseActivitiesHookActions } from "../hooks/activities.actions.hooks";
import { useEffect } from "react";

type ActivitiesScreenProps = {
  
}

export const ActivitiesScreen = ({  }: ActivitiesScreenProps) => {
  const useAppData = UseAppData()
  const activitiesAction = UseActivitiesHookActions({})

  useEffect(() => {
    if (useAppData.workspace?.id){
      activitiesAction.GetActivitiesAction({ workspaceId: useAppData.workspace?.id })
    }
  }, [useAppData.workspace])

  return (
    <>
      
    </>
  )
}