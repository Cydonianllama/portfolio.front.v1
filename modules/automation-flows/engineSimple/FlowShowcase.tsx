/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ReactFlow,
  Background,
  addEdge,
  ReactFlowInstance,
  applyNodeChanges,
  NodeChange,
  EdgeChange,
  applyEdgeChanges,
} from "@xyflow/react";
import { ComponentType, useCallback, useContext, useRef } from "react";
import "@xyflow/react/dist/style.css";
import { edgeTypes } from "./edges.types";
import { automationFlowGenStore } from "../store/automation.flow.store";
import { canOpenEditor } from "../utils/can-open-editor";
import { useConversationalFlowGenActions } from "../hooks/action.hooks.flow";
import { WorkflowEditorContext } from "../components/provider/WorkflowEditorContext";
import { useFlosStateMachineHookActions } from "../hooks/hook.state.machine";
import { idFirstStep } from "../registry/constants";
import { useAutomationNodeRegistry } from "../registry/useAutomationNodeRegistry";
import { getNodeDefinition } from "../registry/registry.utils";

type FlowScreenProps = {
  isLoading?: boolean;
  edgeTypesConfiguration: Record<edgeTypes, ComponentType<any>>;
  nodeTypesConfigurations: Record<string, ComponentType<any>>;
};

export default function FlowScreen({ edgeTypesConfiguration, nodeTypesConfigurations }: FlowScreenProps) {
  const automationFlowStore = automationFlowGenStore();
  const flowActions = useConversationalFlowGenActions({});
  const { canEditGeneralFlowchart } = useFlosStateMachineHookActions({});
  const registry = useAutomationNodeRegistry();

  const context = useContext(WorkflowEditorContext);
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
  } = context || {
    nodes: [],
    edges: [],
    setNodes: () => {},
    setEdges: () => {},
  };

  const reactFlowRef = useRef<ReactFlowInstance<any, any> | null>(null);

  const onNodesChange_ = useCallback(
    (changes: NodeChange<any>[]) => {
      if (!canEditGeneralFlowchart) return;
      setNodes((nds) => {
        const updatedNodes = applyNodeChanges(changes, nds);
        return updatedNodes;
      });
    },
    [setNodes, canEditGeneralFlowchart],
  );

  const onEdgesChange_ = useCallback(
    (changes: Array<EdgeChange>) => {
      if (!canEditGeneralFlowchart) return;
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [setEdges, canEditGeneralFlowchart],
  );

  const onConnect = useCallback(
    (connection: any) => {
      if (!connection.source) return;

      const sourceNode = automationFlowStore?.information?.nodeList?.find(
        (el) => el.id === connection.source,
      );

      if (!sourceNode) return;

      const definition = getNodeDefinition(registry, sourceNode.type);
      if (!definition?.onConnect) return;

      const nodeToUpdate = definition.onConnect({
        node: sourceNode,
        nodes: automationFlowStore.information?.nodeList || [],
        connection: {
          source: connection.source ?? null,
          target: connection.target ?? null,
          sourceHandle: connection.sourceHandle ?? null,
          targetHandle: connection.targetHandle ?? null,
        },
      });

      if (nodeToUpdate) {
        flowActions.UpdateNodeAction({
          id: nodeToUpdate.id,
          configuration: nodeToUpdate.configuration,
          title: nodeToUpdate.title,
          type: nodeToUpdate.type,
          nextNode: nodeToUpdate.nextNode,
        });
      }

      const edge = { ...connection, type: edgeTypes.default };
      setEdges((eds) => addEdge(edge, eds));
    },
    [automationFlowStore.information, registry, flowActions, setEdges],
  );

  return (
    <div className="h-full w-full bg-gray-50">
      <ReactFlow
        defaultEdgeOptions={{ type: "default-edge" }}
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
          reactFlowInstance.fitView();
          reactFlowRef.current = reactFlowInstance;
        }}
        onNodeClick={(a, b) => {
          const currentNode = b;
          if (!canEditGeneralFlowchart) return;

          if (!canOpenEditor(currentNode, registry)) {
            console.log("Cant open for this node");
            return;
          }

          automationFlowStore.setStartEdit({
            currentNodeIdEditing: currentNode.id,
            openEdit: true,
          });
        }}
        onNodeDragStop={(a, b) => {
          if (!canEditGeneralFlowchart) return;

          const currentNode = b;
          if (currentNode.id == idFirstStep) return;

          flowActions.UpdatePositionNodAction({
            nodeId: currentNode.id || "",
            x: currentNode.position.x,
            y: currentNode.position.y,
          });
        }}
        onMoveEnd={() => {
          // Intentionally empty. Kept to preserve the previous hook surface.
        }}
      >
        <Background />
      </ReactFlow>
    </div>
  );
}
