import { CreateTrigger, CreateTriggerRequestDTO } from "@/api/flow/create.trigger";
import { DeleteTrigger, DeleteTriggerRequestDTO } from "@/api/flow/delete.trigger";
import { UpdateTrigger, UpdateTriggerRequestDTO } from "@/api/flow/update.trigger";
import { useCallback } from "react";
import { toast } from "sonner";
import { automationFlowGenStore } from "../store/automation.flow.store";
import { GetTriggers, GetTriggersRequestDTO } from "@/api/flow/get.triggers";
import { GetTrigger, GetTriggerRequestDTO } from "@/api/flow/get.trigger";

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

          // set trigger information 
          if (req.data.trigger){
            automationStore.setTriggersFromAutomation([...automationStore.triggersFromtAutomation, req.data.trigger])
          }
        }
      }

    } catch (ex) {

    } finally {

    }
  }, [automationStore.information, automationStore.triggersFromtAutomation])

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

      // remover del store local
      const currentAutomation = automationStore.information?.automation
      if (currentAutomation){
        automationStore.setListState({
          information: {
            ...automationStore.information,
            automation: {
              ...currentAutomation,
              triggers: (currentAutomation?.triggers || []).filter((el) => el.id != data.id)
            }
          }
        })
      }

      automationStore.setTriggersFromAutomation(
        automationStore.triggersFromtAutomation.filter((el) => el.id != data.id)
      )

    } catch (ex) {

    } finally {

    }
  }, [automationStore.information, automationStore.triggersFromtAutomation])

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

      if (req.data.trigger){
        automationStore.setTriggersFromAutomation(
          automationStore.triggersFromtAutomation.map((el) => el.id == req.data.trigger?.id ? req.data.trigger : el)
        )
      }

    } catch (ex) {

    } finally {

    }
  }, [automationStore.triggersFromtAutomation])


  const getTriggersAction = useCallback(async (data: GetTriggersRequestDTO) => {
    try {
      const req = await GetTriggers(data)
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
  
      if (req.status && req.data.list){
        automationStore.setTriggersFromAutomation(req.data?.list || [])
      }
  
    } catch (ex) {
  
    } finally {
  
    }
  }, [])

  const getTriggerAction = useCallback(async (data: GetTriggerRequestDTO) => {
    try {
      const req = await GetTrigger(data)
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
    updateTriggerAction,
    getTriggersAction,
    getTriggerAction
  }
}
