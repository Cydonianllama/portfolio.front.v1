import { useEdgesState, useNodesState } from "@xyflow/react";
import { PropsWithChildren } from "react";
import { WorkflowEditorContext } from "./WorkflowEditorContext";
import { FlowEdge, nodesFlow } from "../../engineSimple/types";

export function WorkflowEditorProvider({ children }: PropsWithChildren) {
  const [nodes, setNodes, onNodesChange] = useNodesState<nodesFlow>([] as nodesFlow[]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<FlowEdge>([] as FlowEdge[]);

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

  return (
    <WorkflowEditorContext.Provider
      value={{
        nodes,
        edges,
        setNodes,
        setEdges,
        onNodesChange,
        onEdgesChange,
      }}
    >
      {children}
    </WorkflowEditorContext.Provider>
  );
}