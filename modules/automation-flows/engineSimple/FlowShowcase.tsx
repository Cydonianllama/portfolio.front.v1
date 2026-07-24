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
} from "@xyflow/react";
import { ComponentType, useCallback, useRef } from "react";
import "@xyflow/react/dist/style.css";
import { edgeTypes } from "./edges.types";
import { IAutomationNode } from "@/flow-engines/simpleAutomation/models/node.automation";
import { BuildNodeAndEdges } from "../utils/build";

type FlowScreenProps = {
  isLoading?: boolean;
  edgeTypesConfiguration: Record<edgeTypes, ComponentType<any>>
  nodeTypesConfigurations: Record<string, ComponentType<any>>
  initialNodes: Array<any>
  initalEdges: Array<any>
  onClickNode: () => void;
  nodes_: Array<IAutomationNode>
}

export default function FlowScreen({ onClickNode, nodes_, edgeTypesConfiguration, nodeTypesConfigurations }: FlowScreenProps) {

  // const initialNodes: any[] = []
  // const initalEdges: any[] = []

  const { edges: fEdges, nodes: fNodes } = BuildNodeAndEdges({ nodes: nodes_ })

  const [nodes, setNodes, onNodesChange] = useNodesState(fNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(fEdges);

  const reactFlowRef = useRef<ReactFlowInstance<any, any> | null>(null)

  // const onNodesChange = useCallback(
  //   (changes: NodeChange<any>[]) => {
  //     if (!automationFlow.startEditingFlow) return;
  //     setNodes((nds) => {
  //       const updatedNodes = applyNodeChanges(changes, nds);
  //       return updatedNodes
  //     })
  //   },
  //   [setNodes, automationFlow.startEditingFlow],
  // );

  // const onEdgesChange = useCallback(
  //   (changes: Array<EdgeChange>) => {
  //     if (!automationFlow.startEditingFlow) return;
  //     setEdges((eds) => applyEdgeChanges(changes, eds))
  //   },
  //   [setEdges, automationFlow.startEditingFlow],
  // );

  // const onConnect = useCallback(
  //   (connection: any) => {
  //     // Validar que los nodos Tool solo puedan conectarse desde el handle tools del nodo IA
  //     const targetNode = automationFlow.currentAutomationData?.nodes.find(n => n.id === connection.target);

  //     // Si el nodo target es un Tool (tiene toolType)
  //     if (targetNode?.configurationGoogleCalendar?.toolType || targetNode?.configurationSaveVariables?.toolType || targetNode?.configurationGoogleSheets?.toolType || targetNode?.configurationGoogleDocs?.toolType) {
  //       // Solo permitir conexiones desde el handle tools-{id} del nodo IA
  //       const isFromToolsHandle = connection.sourceHandle?.startsWith('tools-');
  //       if (!isFromToolsHandle) {
  //         console.warn('Los nodos Tool solo pueden conectarse desde el handle Tools del nodo IA');
  //         return; // Bloquear la conexión
  //       }
  //     }

  //     dispatch(UpdateconnectionsNode({ connection: connection }))
  //     const edge = { ...connection, type: 'custom-edge' };
  //     setEdges((eds) => addEdge(edge, eds))
  //   },
  //   [setEdges, automationFlow.currentAutomationData, dispatch],
  // );

  const onConnect = useCallback(
    (connection: any) => {
      setEdges((eds) =>
        addEdge(connection, eds)
      );
    },
    []
  );

  return (
    <div className="h-full w-full bg-gray-50">
      <ReactFlow
        defaultEdgeOptions={{ type: 'default-edge' }}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypesConfigurations}
        edgeTypes={edgeTypesConfiguration}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
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
          // const currentNode = b
          // dispatch(ChangeStateIsOpenEditorNode({ isOpenEditorNode: true, currentNodeEditing: currentNode.id }))
          onClickNode()
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