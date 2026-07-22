/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentType } from "react";
import { ActionNode } from "./nodes/action.node";
import { MessageNode } from "./nodes/message.node";
import { TriggerNode } from "./nodes/trigger.node";
import { FirstSteNode } from "./nodes/firststep.node";

export enum nodeTypes {
  message = 'message-node',
  action = 'action-node',
  trigger = 'trigger-node',
  firstStep = 'first-step-node'
}

export const nodeTypesConfigurations: Record<nodeTypes, ComponentType<any>> = {
  'message-node': MessageNode,
  'action-node': ActionNode,
  'first-step-node': FirstSteNode,
  'trigger-node': TriggerNode,
};


import { DefaultEdge } from "./edges/DefaultEdge";

export enum edgeTypes {
  default = 'default-edge',
}

export const edgeTypesConfiguration = {
    default: DefaultEdge,
};