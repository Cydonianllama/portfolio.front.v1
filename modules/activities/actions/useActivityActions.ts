import { ListActivities, ListActivitiesRequestDTO } from "@/api/activity/list.activities"
import { useCallback } from "react"
import { toast } from "sonner"
import { useActivities } from "../store/activitiesStore"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ActivitiesHookActionsProps = {

}

export const UseActivitiesHookActions = ({} : ActivitiesHookActionsProps) => {

  const activityStore = useActivities()

  const GetActivitiesAction = useCallback(async (data: ListActivitiesRequestDTO) => {
    try {
      activityStore.setListState({ listing: true })
      const req = await ListActivities(data)
      if (!req) {
        toast.error('Error 1')
        return;
      }
  
      if (!req?.status) {
        toast.error(req.message || 'Error 2')
        return;
      }
  
      // success
      toast.success('Success')
      activityStore.setListState({ list: req.data.list, pagination: req.pagination, })
    } catch (ex) {
  
    } finally {
      activityStore.setListState({ listing: false })
    }
  }, [])

  return {
    GetActivitiesAction
  }
}