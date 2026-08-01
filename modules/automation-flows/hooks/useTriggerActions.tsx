import { CreateTrigger, CreateTriggerRequestDTO } from "@/api/flow/create.trigger";
import { DeleteTrigger, DeleteTriggerRequestDTO } from "@/api/flow/delete.trigger";
import { UpdateTrigger, UpdateTriggerRequestDTO } from "@/api/flow/update.trigger";
import { useCallback } from "react";
import { toast } from "sonner";
import { automationFlowGenStore } from "../store/automation.flow.store";

export const useTriggerActions = () => {

  const automationStore = automationFlowGenStore()

  const createTriggerAction = useCallback(async (data: CreateTriggerRequestDTO) => {
    try {
      const req = await CreateTrigger(data)
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

      const triggerId = req.data.trigger?.id
      if (req.status && triggerId !== undefined) {
        const currentAutomation = automationStore.information?.automation
        if (currentAutomation){
          automationStore.setListState({
            information: {
              ...automationStore.information,
              automation: {
                ...currentAutomation,
                triggers: currentAutomation?.triggers
                  ? [...currentAutomation.triggers, { id: triggerId }]
                  : [{ id: triggerId }]
              }
            }
          })
        }
      }

    } catch (ex) {

    } finally {

    }
  }, [automationStore.information])

  const deleteTriggerAction = useCallback(async (data: DeleteTriggerRequestDTO) => {
    try {
      const req = await DeleteTrigger(data)
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



    } catch (ex) {

    } finally {

    }
  }, [])

  const updateTriggerAction = useCallback(async (data: UpdateTriggerRequestDTO) => {
    try {
      const req = await UpdateTrigger(data)
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



    } catch (ex) {

    } finally {

    }
  }, [])

  return {
    createTriggerAction,
    deleteTriggerAction,
    updateTriggerAction
  }
}