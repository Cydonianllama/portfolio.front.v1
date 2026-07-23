/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Node, ReactFlowProps } from "@xyflow/react";
import { IAutomationNode } from "@/flow-engines/simpleAutomation/models/node.automation"
import { nodeTypes } from "../engineSimple/node.types";

export const BuildNodeAndEdges = (): { nodes: Array<Node<{ id: string, type: nodeTypes }>> } => {
  return {
    nodes: []
  }
}