/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowInstance,
  Edge,
  useReactFlow,
  applyNodeChanges,
  NodeChange,
  EdgeChange,
  applyEdgeChanges,
} from "@xyflow/react";
import { ComponentType, useCallback, useContext, useEffect, useRef } from "react";
import "@xyflow/react/dist/style.css";
import { edgeTypes } from "./edges.types";
import { automationFlowGenStore } from "../store/automation.flow.store";
import { canOpenEditor } from "../utils/can-open-editor";
import { FlowEdge, nodesFlow } from "./types";
import { useConversationalFlowGenActions } from "../hooks/action.hooks.flow";
import { WorkflowEditorContext } from "../components/provider/WorkflowEditorContext";
import { useConditionEditorActions } from "../hooks/useConditionEditorActions";
import { useMessageEditorActions } from "../hooks/useMessageEditorActions";
import { IAutomationNode, NODE_TYPE_CONDITION, NODE_TYPE_GENERAL_MESSAGE_SIMPLE, NODE_TYPE_TRIGGER_GENERAL_MESSAGE_INCOMING } from "@erick/conversationalflow";
import { useTriggerEditorActions } from "../hooks/useTriggerEditorActions";
import { useFlosStateMachineHookActions } from "../hooks/hook.state.machine";

type FlowScreenProps = {
  isLoading?: boolean;
  edgeTypesConfiguration: Record<edgeTypes, ComponentType<any>>
  nodeTypesConfigurations: Record<string, ComponentType<any>>
}

export default function FlowScreen({ edgeTypesConfiguration, nodeTypesConfigurations }: FlowScreenProps) {
  // const { setCenter, } = useReactFlow();

  const automationFlowStore = automationFlowGenStore()
  const flowActions = useConversationalFlowGenActions({})
  const { canMoveNodes } = useFlosStateMachineHookActions({})

  const { UpdatConditionConfiguration } = useConditionEditorActions()
  const { UpdateMessageConfiguration } = useMessageEditorActions()
  const { UpdateTriggerConfiguration } = useTriggerEditorActions()

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

  const reactFlowRef = useRef<ReactFlowInstance<any, any> | null>(null)

  const onNodesChange_ = useCallback((changes: NodeChange<any>[]) => {
    if (!canMoveNodes) return;
    setNodes((nds) => {
      const updatedNodes = applyNodeChanges(changes, nds);
      return updatedNodes
    })
  }, [setNodes, canMoveNodes]);

  const onEdgesChange_ = useCallback(
    (changes: Array<EdgeChange>) => {
      if (!canMoveNodes) return;
      setEdges((eds) => applyEdgeChanges(changes, eds))
    },
    [setEdges, canMoveNodes],
  );

  const onConnect = useCallback(
    (connection: any) => {

      console.log(connection)

      if (connection.source) {
        const node = automationFlowStore?.information?.nodeList?.find(el => el.id == connection.source);

        if (node) {
          if (node.type == NODE_TYPE_GENERAL_MESSAGE_SIMPLE) {
            if (connection.sourceHandle) {
              if (connection.sourceHandle.startsWith('button-')) {
                UpdateMessageConfiguration('updateButtonConnection', node as IAutomationNode<typeof NODE_TYPE_GENERAL_MESSAGE_SIMPLE>, {
                  buttonId: connection.sourceHandle,
                  nextNode: connection.target
                })
              } else if (connection.sourceHandle.startsWith('words-')) {
                UpdateMessageConfiguration('updateGroupWordConnection', node as IAutomationNode<typeof NODE_TYPE_GENERAL_MESSAGE_SIMPLE>, {
                  groupWordId: connection.sourceHandle,
                  nextNode: connection.target
                })
              } else if (connection.sourceHandle.startsWith('not-response')) {
                UpdateMessageConfiguration('updateNotResponseNextNode', node as IAutomationNode<typeof NODE_TYPE_GENERAL_MESSAGE_SIMPLE>, {
                  nextNode: connection.target
                })
              } else if (connection.sourceHandle.startsWith('other-response')) {
                UpdateMessageConfiguration('updateOtherResponseNextNode', node as IAutomationNode<typeof NODE_TYPE_GENERAL_MESSAGE_SIMPLE>, {
                  nextNode: connection.target
                })
              } else if (connection.sourceHandle) {
                // next node
                UpdateMessageConfiguration('updateMessageNext', node as IAutomationNode<typeof NODE_TYPE_GENERAL_MESSAGE_SIMPLE>, {
                  nextNode: connection.target
                })
              } else {
                return;
              }
            }

          } else if (node.type == NODE_TYPE_CONDITION) {
            if (connection.sourceHandle) {
              if (connection.sourceHandle.startsWith('rule-')) {
                UpdatConditionConfiguration('updateRuleConection', node as IAutomationNode<typeof NODE_TYPE_CONDITION>, {
                  nextNode: connection.target,
                  ruleId: connection.sourceHandle
                })
              } else if (connection.sourceHandle) {
                UpdatConditionConfiguration('updateMessageNextNodeConection', node as IAutomationNode<typeof NODE_TYPE_CONDITION>, {
                  nextNode: connection.target
                })
              } else {
                return;
              }
            }
          } else if (node.type == NODE_TYPE_TRIGGER_GENERAL_MESSAGE_INCOMING) {
            if (connection.sourceHandle) {
              if (connection.sourceHandle) {
                UpdateTriggerConfiguration('updateTriggerNext', node as IAutomationNode<typeof NODE_TYPE_TRIGGER_GENERAL_MESSAGE_INCOMING>, {
                  nextNode: connection.target
                })
              } else {
                return;
              }
            }
          }
        }

      }

      // dispatch(UpdateconnectionsNode({ connection: connection }))
      const edge = { ...connection, type: edgeTypes.default };
      setEdges((eds) => addEdge(edge, eds))
    },
    [automationFlowStore.information],
  );

  return (
    <div className="h-full w-full bg-gray-50">
      <ReactFlow
        defaultEdgeOptions={{ type: 'default-edge' }}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypesConfigurations}
        edgeTypes={edgeTypesConfiguration}
        onNodesChange={onNodesChange_}
        onEdgesChange={onEdgesChange_}
        onConnect={onConnect}
        fitView
        minZoom={0.1}
        maxZoom={4}
        onInit={(reactFlowInstance) => {
          reactFlowInstance.fitView()
          reactFlowRef.current = reactFlowInstance
          // nodeEditorContext.setReactFlow(reactFlowInstance)
        }}
        onNodeClick={(a, b) => {
          // if (!automationFlow.startEditingFlow) return;
          const currentNode = b
          // onClickNode()

          if (!canOpenEditor(currentNode)) {
            console.log('Cant open for this node')
            return;
          }

          automationFlowStore.setStartEdit({ currentNodeIdEditing: currentNode.id, openEdit: true })
        }}
        onNodeDragStop={(a, b) => {
          // try {
          //   if (!automationFlow.startEditingFlow) return;
          //   const currentNode = b
          //   if (!b.position.x || !b.position.y) return;
          //   if (currentNode.id == NODE_FIRST_OPTIONS) return;
          //   dispatch(UpdateAutomationNodePosition({ data: { posx: b.position.x, posy: b.position.y }, nodeId: currentNode.id || '' }))
          // } catch (error: any) {
          //   console.log(error.message)
          // }
          const currentNode = b
          flowActions.UpdatePositionNodAction({ nodeId: currentNode.id || '', x: currentNode.position.x, y: currentNode.position.y })
        }}
        onMoveEnd={(event, viewport) => {
          // try {
          //   if (!automationFlow.startEditingFlow) return;
          //   console.log('Viewport moved to:', viewport.x, viewport.y)
          //   nodeEditorContext.setViewport(viewport.x, viewport.y)
          // } catch (error: any) {
          //   console.log(error.message)
          // }
        }}
      >
        {/* <MiniMap
          position='bottom-left'
          pannable
          zoomable
          ariaLabel='Automap'
          nodeColor={(node) => getNodeAccentHex((node.data as INodeFlow)?.nodeType)}
          nodeStrokeColor={(node) => getNodeAccentHex((node.data as INodeFlow)?.nodeType)}
          nodeStrokeWidth={3}
          maskColor='rgba(15, 23, 42, 0.08)'
          className='!bg-white/90 dark:!bg-zinc-800/90 rounded-lg border border-gray-200 dark:border-zinc-700 shadow-sm'
        /> */}
        <Background />
        {/* <MiniMap /> */}
        {/* <Controls position='bottom-right'  /> */}
      </ReactFlow>
    </div>
  );
}