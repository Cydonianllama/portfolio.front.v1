/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ComponentType, FunctionComponent, ReactElement } from "react";
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

import { GrTrigger } from "react-icons/gr";
import { LuMessageSquareText } from "react-icons/lu";
import { IoPlayOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";

type generalConfigurationNode = {
  icon: ComponentType<{ className: string }>, // ReactElement {} // ComponentType <> // ReactNode {}
  title: string
  description?: string
  color: 'blue' | 'green' | 'yellow' | 'gray'
}

export const GeneralConfigurationNode: Record<nodeTypes, generalConfigurationNode> = {
  "action-node": {
    icon: CiSettings,
    title: 'Action node',
    color: 'gray'
  },
  "first-step-node": {
    icon: IoPlayOutline,
    title: 'First step node',
    color: 'blue'
  },
  "message-node": {
    icon: LuMessageSquareText,
    title: 'Message node',
    color: 'green'
  },
  "trigger-node": {
    icon: GrTrigger,
    title: 'Trigger node',
    color: 'yellow'
  }
}