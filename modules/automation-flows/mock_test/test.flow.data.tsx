/* eslint-disable @typescript-eslint/no-explicit-any */
import { Node, ReactFlowProps } from "@xyflow/react";
import { nodeTypes } from "../engineSimple/node.types";
import { NodeType } from "@/flow-engines/simpleAutomation/models/node.automation.type";

export const testFlowDataNodes: Node<{ id: string, type: NodeType }>[] = [
  {
    id: "2",
    type: nodeTypes.trigger,
    position: { x: 20, y: 40 },
    data: {
      id: "Trigger step",
      type: NodeType.trigger
    }
  },
  {
    id: "3",
    type: nodeTypes.message,
    position: { x: 100, y: 100 },
    data: {
      id: "Mensaje",
      type: NodeType.message
    }
  },
  {
    id: "4",
    type: nodeTypes.action,
    position: { x: 450, y: 100 },
    data: {
      id: "Acción",
      type: NodeType.message
    }
  },
  {
    id: "5",
    type: nodeTypes.condition,
    position: { x: 150, y: 130 },
    data: {
      id: "Acción",
      type: NodeType.message
    }
  }
];