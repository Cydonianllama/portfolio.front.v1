/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";
import {
  Edge,
  Node,
  OnEdgesChange,
  OnNodesChange,
} from "@xyflow/react";
import { Dispatch, SetStateAction } from "react";
import { FlowEdge, nodesFlow } from "../../engineSimple/types";

export interface WorkflowEditorContextValue {
  nodes: nodesFlow[];
  edges: FlowEdge[];

  setNodes: Dispatch<SetStateAction<nodesFlow[]>>;
  setEdges: Dispatch<SetStateAction<FlowEdge[]>>;

  onNodesChange: OnNodesChange<nodesFlow>;
  onEdgesChange: OnEdgesChange<FlowEdge>;
}

export const WorkflowEditorContext = createContext<WorkflowEditorContextValue | null>({ 
  edges: [],
  nodes: [],
  onEdgesChange: () => {},
  onNodesChange: () => {},
  setEdges: () => {},
  setNodes: () => {}
})