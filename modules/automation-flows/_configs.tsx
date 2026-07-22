/* eslint-disable @typescript-eslint/no-explicit-any */

import { GrTrigger } from "react-icons/gr";
import { LuMessageSquareText } from "react-icons/lu";
import { IoPlayOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { FiFilter } from "react-icons/fi";

import { Component, ComponentType, FunctionComponent, ReactElement } from "react";
import { ActionNode } from "./nodes/action.node";
import { MessageNode } from "./nodes/message.node";
import { TriggerNode } from "./nodes/trigger.node";
import { FirstSteNode } from "./nodes/firststep.node";
import { ConditionNode } from "./nodes/condition.node";

export enum nodeTypes {
  message = 'message-node',
  action = 'action-node',
  trigger = 'trigger-node',
  firstStep = 'first-step-node',
  condition = 'condition-node'
}

export const nodeTypesConfigurations: Record<nodeTypes, ComponentType<any>> = {
  'message-node': MessageNode,
  'action-node': ActionNode,
  'first-step-node': FirstSteNode,
  'trigger-node': TriggerNode,
  "condition-node": ConditionNode
};

import { DefaultEdge } from "./edges/DefaultEdge";

export enum edgeTypes {
  default = 'default-edge',
}

export const edgeTypesConfiguration = {
  default: DefaultEdge,
};


export type colorDefaultNode =  'blue' | 'green' | 'yellow' | 'gray' | 'red'

type generalConfigurationNode = {
  icon: ComponentType<{ className: string }>, // ReactElement {} // ComponentType <> // ReactNode {}
  title: string
  description?: string
  color: colorDefaultNode
}

export const GeneralConfigurationNode: Record<nodeTypes, generalConfigurationNode> = {
  "action-node": {
    icon: CiSettings,
    title: 'Acción',
    color: 'gray'
  },
  "first-step-node": {
    icon: IoPlayOutline,
    title: 'Primer paso',
    color: 'blue'
  },
  "message-node": {
    icon: LuMessageSquareText,
    title: 'Mensaje',
    color: 'green'
  },
  "trigger-node": {
    icon: GrTrigger,
    title: 'Disparador',
    color: 'yellow'
  },
  "condition-node": {
    icon: FiFilter,
    title: 'Condición',
    color: 'red'
  }
}