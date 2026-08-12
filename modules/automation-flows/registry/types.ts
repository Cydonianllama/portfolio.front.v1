import type { ComponentType } from "react";
import type { Node, NodeProps } from "@xyflow/react";
import type { IAutomationNode, NodeTypesType } from "@erick/conversationalflow";
import type { FlowEdge } from "../engineSimple/types";

export type colorDefaultNode =
  | "blue"
  | "green"
  | "yellow"
  | "gray"
  | "red"
  | "purple"
  | "orange"
  | "sky";

export type AutomationNodeData = {
  id: string;
  type: string;
};

export type NodeVisualConfig = {
  icon: ComponentType<{ className: string }>;
  title: string;
  description?: string;
  color: colorDefaultNode;
};

export type NodeBuildContext = {
  node: IAutomationNode;
  nodes: IAutomationNode[];
};

export type NodeConnection = {
  source: string | null;
  target: string | null;
  sourceHandle: string | null;
  targetHandle: string | null;
};

export type NodeConnectContext = NodeBuildContext & {
  connection: NodeConnection;
};

export type NodeDisconnectContext = NodeBuildContext & {
  connectionId: string | null;
};

export type NodeRuntimeProps = {
  definition: AutomationNodeDefinition;
  registry: AutomationNodeDefinition[];
  getNodeConfiguration: () => IAutomationNode | null | undefined;
  isActive: boolean
};

export type EditorRuntimeProps = {
  definition: AutomationNodeDefinition;
  registry: AutomationNodeDefinition[];
  node: IAutomationNode;
  updateNode: (node: IAutomationNode) => void;
};

export type AutomationFlowNode = Node<AutomationNodeData>;

export type AutomationNodeComponentProps = NodeProps<AutomationFlowNode> & NodeRuntimeProps;

export type AutomationNodeComponent = ComponentType<AutomationNodeComponentProps>;

export type AutomationNodeEditor = ComponentType<EditorRuntimeProps>;

export interface AutomationNodeDefinition {
  type: string;
  component: AutomationNodeComponent;
  editor?: AutomationNodeEditor;
  visual: NodeVisualConfig;
  canOpenEditor: boolean;
  canCreate?: boolean;
  canCreateFromFirstStep?: boolean;
  createLabel?: string;
  createDescription?: string;
  buildEdges?: (ctx: NodeBuildContext) => FlowEdge[];
  onConnect?: (ctx: NodeConnectContext) => IAutomationNode | null;
  onDisconnect?: (ctx: NodeDisconnectContext) => IAutomationNode | null;
}

export type NodeTypeValue = NodeTypesType | string;
