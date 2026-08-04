/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateNodeRequestDTO, CreateNode } from "@/api/flow/create.node"
import { GetAutomationInformation, GetAutomationInformationRequestDTO } from "@/api/flow/get.information"
import { PublishAutomationRequestDTO, PublishAutomation } from "@/api/flow/publish.automation"
import { RemoveNodeRequestDTO, RemoveNode } from "@/api/flow/remove.node"
import { UpdateNodeRequestDTO, UpdateNode } from "@/api/flow/update.node"
import { UpdatePositionNode, UpdatePositionNodeRequestDTO } from "@/api/flow/update.position.node"
import { useCallback, useContext } from "react"
import { toast } from "sonner"
import { automationFlowGenStore, modeAutomationFlow } from "../store/automation.flow.store"
import { useReactFlow } from "@xyflow/react"
import { WorkflowEditorContext } from "../components/provider/WorkflowEditorContext"
import { BuildNodeAndEdges } from "../utils/build"
import { nodesFlow } from "../engineSimple/types"
import { v4 as uuidv4 } from "uuid";
import { nodeTypes } from '@erick/conversationalflow'
import { useTriggerActions } from "./useTriggerActions"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type useConversationalFlowGenActionsProps = {

}

export const useConversationalFlowGenActions = ({ }: useConversationalFlowGenActionsProps) => {

  const triggerActions = useTriggerActions()

  const context = useContext(WorkflowEditorContext);

  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
  } = context || {
    nodes: [],
    edges: [],
    setNodes: () => { },
    setEdges: () => { },
    onNodesChange: () => { },
    onEdgesChange: () => { },
  }

  const { setCenter, screenToFlowPosition } = useReactFlow();
  const automationFlowStore = automationFlowGenStore()

  const CreateNodeAction = useCallback(async (data: Partial<CreateNodeRequestDTO>) => {
    try {
      const newId = uuidv4()
      const x = window.innerWidth / 2
      const y = window.innerHeight / 2
      const center = screenToFlowPosition({
        x: x,
        y: y
      });

      const req = await CreateNode({ ...data, x: center.x, y: center.y, id: newId } as CreateNodeRequestDTO)
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
        // console.log('actualizandose el listado')
        const list = [
          ...automationFlowStore.information.nodeList,
          req.data.node
        ]
        automationFlowStore.setListState({ information: { ...automationFlowStore.information, nodeList: list } })
      }

      // add node and center
      // const center = screenToFlowPosition({
      //   x: x,
      //   y: y
      // });

      // const newNodeFlow: nodesFlow = {
      //   id: newId,
      //   type: data.nodeType,
      //   data: {
      //     id: newId,
      //     type: data.nodeType || ''
      //   },
      //   position: center
      // }

      // setNodes([...nodes, newNodeFlow])

      if (req.data.node && automationFlowStore.information?.nodeList) {
        const buildData = BuildNodeAndEdges({ nodes: [...automationFlowStore.information.nodeList, req.data.node] })
        setNodes(buildData.nodes)
        setEdges(buildData.edges)
      }

    } catch (ex) {

    } finally {

    }
  }, [automationFlowStore.information?.nodeList, automationFlowStore.setListState, nodes, setNodes])

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

      if (req.data.publishedAutomation && req.data.automation){
        SetModeAction('preview')
        automationFlowStore.setListState({
          information: {
            ...automationFlowStore.information,
            publishedAutomation: req.data.publishedAutomation,
            automation: req.data.automation
          }
        })
      }


    } catch (ex) {

    } finally {

    }
  }, [automationFlowStore.information])

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
        // console.log('actualizandose el listado')
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

        // update flowchart
        const buildData = BuildNodeAndEdges({ nodes: [...list] })
        console.log(buildData)
        setNodes(buildData.nodes)
        setEdges(buildData.edges)

        // update states
        if (req.data.automation){
          automationFlowStore.setListState({ information: { ...automationFlowStore.information, nodeList: list, automation:  req.data.automation} })
        }
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
      
        // update flowchart
        const buildData = BuildNodeAndEdges({ nodes: [...list] })
        console.log(buildData)
        setNodes(buildData.nodes)
        setEdges(buildData.edges)
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
      automationFlowStore.setListState({ information: { automation: req.data.automation, nodeList: req.data.nodeList, publishedAutomation: req.data.publishedAutomation, triggers: req.data.triggers }, initialListFinished: true })

      // listar los triggers requeridos en esta automatizacion
      triggerActions.getTriggersAction({ triggers: req.data.automation?.triggers.map(el => (el.id)) || [] })

      if (req.data.nodeList) {
        // contruir los nodos del flow
        const buildData = BuildNodeAndEdges({ nodes: req.data.nodeList })
        setNodes(buildData.nodes)
        setEdges(buildData.edges)

        // cnetrar si solo hay un solo nodo y es el trigger node
        const node = buildData.nodes.find(n => n.type === nodeTypes.NODE_TYPE_TRIGGER_GENERAL_MESSAGE_INCOMING);
        if (node && req.data.nodeList.length == 1) {
          console.log('realizar el centrado')
          setTimeout(() => {
            setCenter(
              node.position.x + ((node.measured?.width || 0) / 2),
              node.position.y + ((node.measured?.height || 0) / 2),
              {
                zoom: 1.5,
                duration: 800,
              }
            );
          }, 200)
        }
      }

    } catch (ex) {

    } finally {
      automationFlowStore.setListState({ listing: false })
    }
  }, [])

  const SetModeAction = useCallback(async (mode: modeAutomationFlow) => {
    try {
      automationFlowStore.setMode(mode)
    } catch (ex) {
  
    } finally {
      
    }
  }, [automationFlowStore.setMode])

  return {
    CreateNodeAction,
    UpdateNodeAction,
    PublishAutomationAction,
    RemoveNodeAction,
    UpdatePositionNodAction,
    GetAutomationInformationAction,
    SetModeAction
  }
}
