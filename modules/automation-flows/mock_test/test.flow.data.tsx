/* eslint-disable @typescript-eslint/no-explicit-any */
import { Node, ReactFlowProps } from "@xyflow/react";
import { nodeTypes } from "../engineSimple/node.types";

export const testFlowDataNodes: Node<{ id: string, type: nodeTypes }>[] = [
  {
    id: "1",
    type: nodeTypes.firstStep,
    position: { x: 160, y: 160 },
    data: {
      id: "First step",
      type: nodeTypes.message
    }
  },
  {
    id: "2",
    type: nodeTypes.trigger,
    position: { x: 20, y: 40 },
    data: {
      id: "Trigger step",
      type: nodeTypes.message
    }
  },
  {
    id: "3",
    type: nodeTypes.message,
    position: { x: 100, y: 100 },
    data: {
      id: "Mensaje",
      type: nodeTypes.message
    }
  },
  {
    id: "4",
    type: nodeTypes.action,
    position: { x: 450, y: 100 },
    data: {
      id: "Acción",
      type: nodeTypes.message
    }
  },
  {
    id: "5",
    type: nodeTypes.condition,
    position: { x: 150, y: 130 },
    data: {
      id: "Acción",
      type: nodeTypes.message
    }
  }
];