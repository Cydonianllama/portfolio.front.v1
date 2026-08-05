'use client'

/* eslint-disable @typescript-eslint/no-empty-object-type */
import { useAppData } from "@/hooks/app/useAppData";
import { UseActivitiesHookActions } from "../actions/useActivityActions";
import { useEffect } from "react";
import { ListActivitiesComponent } from "./activitiesList";
import { Switch } from "@/components/ui/switch";
import { Filter } from "@/modules/contacts/components/filter";
import { ActivityEntityType } from "@/api/activity/dto";
import { useActivities } from "../store/activitiesStore";
import { useShowAllActivities } from "../hooks/useShowAllActivities";

const entityFilterOptions = [
  { id: 'all', label: 'Todas' },
  { id: ActivityEntityType.contact, label: 'Contactos' },
  { id: ActivityEntityType.integration, label: 'Integraciones' },
  { id: ActivityEntityType.room, label: 'Salas' },
  { id: ActivityEntityType.automation, label: 'Automatizaciones' },
];

type ActivitiesScreenProps = {

}

export const ActivitiesScreen = ({ }: ActivitiesScreenProps) => {
  const appData = useAppData()
  const activitiesAction = UseActivitiesHookActions({})
  const activitiesStore = useActivities()

  const { setShow, show } = useShowAllActivities()

  useEffect(() => {
    if (appData.workspace?.id) {
      activitiesAction.GetActivitiesAction({ workspaceId: appData.workspace?.id, showAll: show })
    }
  }, [appData.workspace, show])

  return (
    <>
      <div className="app-section space-y-4">
        <div className="flex justify-between items-center gap-2">
          <div>
            <h1 className="text-xl text-foreground font-semibold">Listado de actividades</h1>
            <p className="text-sm text-muted-foreground">
              {activitiesStore.list.length} actividades registradas en este workspace
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-cente gap-2">
              <Switch onCheckedChange={() => { setShow(!show)  }} checked={show} id="switch-show-all-activity" />
              <label htmlFor="switch-show-all-activity" className="text-xs text-muted-foreground cursor-pointer select-none">
                Show all activity
              </label>
            </div>
            {/* <Filter
              options={entityFilterOptions}
              onSelect={(filterId, valueId) => {
                activitiesStore.setEntityFilter(valueId as ActivityEntityType | 'all')
              }}
            /> */}
          </div>
        </div>
        <div>
          <ListActivitiesComponent />
        </div>
      </div>

    </>
  )
}