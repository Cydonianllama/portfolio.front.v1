/* eslint-disable @typescript-eslint/no-explicit-any */
import { Node, ReactFlowProps } from "@xyflow/react";
import { nodeTypes } from "../engineSimple/node.types";

export const testFlowDataNodes: Node<any>[] = [
  {
    id: "1",
    type: nodeTypes.firstStep,
    position: { x: 160, y: 160 },
    data: {
      title: "First step"
    }
  },
  {
    id: "2",
    type: nodeTypes.trigger,
    position: { x: 20, y: 40 },
    data: {
      title: "Trigger step"
    }
  },
  {
    id: "3",
    type: nodeTypes.message,
    position: { x: 100, y: 100 },
    data: {
      title: "Mensaje"
    }
  },
  {
    id: "4",
    type: nodeTypes.action,
    position: { x: 450, y: 100 },
    data: {
      title: "Acción"
    }
  },
  {
    id: "5",
    type: nodeTypes.condition,
    position: { x: 150, y: 130 },
    data: {
      title: "Acción"
    }
  }
];