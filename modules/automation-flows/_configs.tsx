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

import { nodeTypes } from '@/flow-engines/simpleAutomation/models/node.automation.type'
type NodeTypeValue = (typeof nodeTypes)[keyof typeof nodeTypes]

//
// Node Types
//

export const nodeTypesConfigurations: Record<string, ComponentType<any>> = {
  'first-step-node': FirstSteNode,
  [nodeTypes.NODE_TYPE_GENERAL_MESSAGE_SIMPLE]: MessageNode,
  [nodeTypes.NODE_TYPE_TRIGGER_GENERAL_MESSAGE_INCOMING]: TriggerNode,
  [nodeTypes.NODE_TYPE_CONDITION]: ConditionNode,
  'action-node': ActionNode,
};

//
// Edges
//

import { DefaultEdge } from "./edges/DefaultEdge";

export const edgeTypesConfiguration: Record<edgeTypes, ComponentType<any>> = {
  'default-edge': DefaultEdge,
};

//
// Configuration Node
//

export type colorDefaultNode =  'blue' | 'green' | 'yellow' | 'gray' | 'red'

type generalConfigurationNode = {
  icon: ComponentType<{ className: string }>, // ReactElement {} // ComponentType <> // ReactNode {}
  title: string
  description?: string
  color: colorDefaultNode
}

export const GeneralConfigurationNode: Record<string, generalConfigurationNode> = {
  "first-step-node": {
    icon: IoPlayOutline,
    title: 'Primer paso',
    color: 'blue',
    description: 'Selecciona el primer paso.'
  },
  [nodeTypes.NODE_TYPE_GENERAL_MESSAGE_SIMPLE]: {
    icon: LuMessageSquareText,
    title: 'Mensaje',
    color: 'green'
  },
  [nodeTypes.NODE_TYPE_TRIGGER_GENERAL_MESSAGE_INCOMING]: {
    icon: GrTrigger,
    title: 'Disparador',
    color: 'yellow'
  },
  [nodeTypes.NODE_TYPE_CONDITION]: {
    icon: FiFilter,
    title: 'Condición',
    color: 'red'
  }
}

//
// Editors
//

import { ConditionEditor, MessageEditor, TriggerEditor } from './editors/_index'
import { edgeTypes } from "./engineSimple/edges.types";

export const EditorsConfiguration: Partial<Record<NodeTypeValue, { hasEditor: boolean, Editor: ComponentType}>> = {
  [nodeTypes.NODE_TYPE_PRIVATE_MESSAGE]: {
    hasEditor: true,
    Editor: MessageEditor
  },
  [nodeTypes.NODE_TYPE_TRIGGER_GENERAL_MESSAGE_INCOMING]: {
    hasEditor: false,
    Editor: TriggerEditor
  },
  [nodeTypes.NODE_TYPE_CONDITION]: {
    hasEditor: true,
    Editor: ConditionEditor
  }
}