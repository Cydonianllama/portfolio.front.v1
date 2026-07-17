//
// compo - api - store
//

import { create } from "zustand";
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { ResponsePagination } from "@/types/api/utils.pagination"
import { useEffect } from "react";
import { UseAppData } from "@/hooks/app/useAppData";
import { toast } from "sonner";
import { useActivities } from "../store/activitiesStore";
import { UseActivitiesHookActions } from "../hooks/activities.actions.hooks";
import { ErrorStateComponent } from "@/components/Error";
import { SpinnerListing } from "@/components/Listing";
import { EmptyStateComponent } from "@/components/Empty";
import { MdOutlineLabel } from "react-icons/md";
import { VscDebugDisconnect } from "react-icons/vsc";
import { ActivityItem } from "./ActivityItem";

// -------- a cambiar
// ComponentName
// ServiceName
// _NAME_STORE_
// ------------------

export const ListActivitiesComponent = () => {

  const activitiesActions = UseActivitiesHookActions({})

  const activitiesStore = useActivities()

  const useAppData = UseAppData()

  const OnInit = () => {
    activitiesActions.GetActivitiesAction({ workspaceId: useAppData.workspace?.id || '' })
  }

  const isError = false;

  useEffect(() => {
    if (useAppData.workspace) OnInit()
  }, [useAppData.workspace])

  return <>
    <div className="px-5">
      {activitiesStore.listing && (<>
        <SpinnerListing
          title="Items"
          description="Listando sus items."
        />
      </>)}

      {(!activitiesStore.listing && isError) && (<>
        <ErrorStateComponent
        />
      </>)}

      {(!activitiesStore.listing && !isError) && (<>
        {activitiesStore.list.length > 0 && (<>
          <div className=" flex-1">
            {activitiesStore.list.map((el, index) => (<ActivityItem data={el} key={index} />))}
          </div>
        </>)}
        {activitiesStore.list.length == 0 && (<>
          <EmptyStateComponent
            description="Usted no cuenta con actividades registradas."
            title="Actividades"
            isActiveCreate={false}
            isActiveImport={false}
            isActiveLearn={false}
            onClickCreate={() => { }}
            textButtonCreate={'Agregar item'}
            mainIcon={<MdOutlineLabel />}
          />
        </>)}
      </>)}
    </div>
  </>
}




