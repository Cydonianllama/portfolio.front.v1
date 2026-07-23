import { CreateNodeRequestDTO, CreateNode } from "@/api/flow/create.node"
import { PublishAutomationRequestDTO, PublishAutomation } from "@/api/flow/publish.automation"
import { RemoveNodeRequestDTO, RemoveNode } from "@/api/flow/remove.node"
import { UpdateNodeRequestDTO, UpdateNode } from "@/api/flow/update.node"
import { UpdatePositionNode, UpdatePositionNodeRequestDTO } from "@/api/flow/update.position.node"
import { useCallback } from "react"
import { toast } from "sonner"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type FlowHookActionsProps = {

}

export const FlowHookActions = ({} : FlowHookActionsProps) => {

  const CreateNodeAction = useCallback(async (data: CreateNodeRequestDTO) => {
    try {
      const req = await CreateNode(data)
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

  const PublishAutomationAction = useCallback(async (data: PublishAutomationRequestDTO) => {
    try {
      const req = await PublishAutomation(data)
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
  
  const UpdateNodeAction = useCallback(async (data: UpdateNodeRequestDTO) => {
    try {
      const req = await UpdateNode(data)
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

  const RemoveNodeAction = useCallback(async (data: RemoveNodeRequestDTO) => {
    try {
      const req = await RemoveNode(data)
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


  const UpdatePositionNodAction = useCallback(async (data: UpdatePositionNodeRequestDTO) => {
    try {
      const req = await UpdatePositionNode(data)
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
    CreateNodeAction,
    UpdateNodeAction,
    PublishAutomationAction,
    RemoveNodeAction,
    UpdatePositionNodAction
  }
}