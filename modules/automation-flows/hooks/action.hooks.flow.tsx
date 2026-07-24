import { CreateNodeRequestDTO, CreateNode } from "@/api/flow/create.node"
import { GetAutomationInformation, GetAutomationInformationRequestDTO } from "@/api/flow/get.information"
import { PublishAutomationRequestDTO, PublishAutomation } from "@/api/flow/publish.automation"
import { RemoveNodeRequestDTO, RemoveNode } from "@/api/flow/remove.node"
import { UpdateNodeRequestDTO, UpdateNode } from "@/api/flow/update.node"
import { UpdatePositionNode, UpdatePositionNodeRequestDTO } from "@/api/flow/update.position.node"
import { useCallback } from "react"
import { toast } from "sonner"
import { useAutomationFlow } from "../store/automation.flow.store"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type FlowHookActionsProps = {

}

export const FlowHookActions = ({ }: FlowHookActionsProps) => {

  const automationFlowStore = useAutomationFlow()

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

      if (automationFlowStore.information?.nodeList && req.data.node) {
        console.log('actualizandose el listado')
        const list = [
          ...automationFlowStore.information.nodeList,
          req.data.node
        ]
        automationFlowStore.setListState({ information: { ...automationFlowStore.information, nodeList: list } })
      }

    } catch (ex) {

    } finally {

    }
  }, [automationFlowStore.information?.nodeList, automationFlowStore.setListState])

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

      if (automationFlowStore.information?.nodeList && req.data.node) {
        console.log('actualizandose el listado')
        let list = [
          ...automationFlowStore.information.nodeList,
        ]

        list = list.map((el, index) => {
          if (el.id == req.data.node?.id) {
            return req.data.node
          } else {
            return el
          }
        })
        automationFlowStore.setListState({ information: { ...automationFlowStore.information, nodeList: list } })
      }

    } catch (ex) {

    } finally {

    }
  }, [automationFlowStore.information?.nodeList, automationFlowStore.setListState])

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
      if (automationFlowStore.information?.nodeList) {
        let list = [
          ...automationFlowStore.information.nodeList,
        ]

        list = list.filter((el, index) => el.id != req.data.id)
        automationFlowStore.setListState({ information: { ...automationFlowStore.information, nodeList: list } })
      }

    } catch (ex) {

    } finally {

    }
  }, [automationFlowStore.information?.nodeList, automationFlowStore.setListState])

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

      if (automationFlowStore.information?.nodeList && req.data.node) {
        console.log('actualizandose el listado')
        let list = [
          ...automationFlowStore.information.nodeList,
        ]

        list = list.map((el, index) => {
          if (el.id == req.data.node?.id) {
            return req.data.node
          } else {
            return el
          }
        })
        automationFlowStore.setListState({ information: { ...automationFlowStore.information, nodeList: list } })
      }

    } catch (ex) {

    } finally {

    }
  }, [automationFlowStore.information?.nodeList, automationFlowStore.setListState])

  const GetAutomationInformationAction = useCallback(async (data: GetAutomationInformationRequestDTO) => {
    try {
      automationFlowStore.setListState({ listing: true })
      const req = await GetAutomationInformation(data)
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
      automationFlowStore.setListState({ information: { automation: req.data.automation, nodeList: req.data.nodeList, publishedAutomation: req.data.publishedAutomation, triggers: req.data.triggers } })

    } catch (ex) {

    } finally {
      automationFlowStore.setListState({ listing: false })
    }
  }, [])

  return {
    CreateNodeAction,
    UpdateNodeAction,
    PublishAutomationAction,
    RemoveNodeAction,
    UpdatePositionNodAction,
    GetAutomationInformationAction
  }
}