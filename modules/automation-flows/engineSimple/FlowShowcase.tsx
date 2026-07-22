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
} from "@xyflow/react";
import { useCallback } from "react";
import "@xyflow/react/dist/style.css";
import { edgeTypesConfiguration, nodeTypesConfigurations } from "../_configs";
import { testFlowDataNodes } from "../mock_test/test.flow.data";

type FlowScreenProps = {
  isLoading?: boolean;
}

const initalEdges: any[] = []

export default function FlowScreen({ }: FlowScreenProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(testFlowDataNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initalEdges);

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
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypesConfigurations}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        edgeTypes={edgeTypesConfiguration}
        fitView
      >
        <Background />
        {/* <MiniMap /> */}
        {/* <Controls /> */}
      </ReactFlow>
    </div>
  );
}