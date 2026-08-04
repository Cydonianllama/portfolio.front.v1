/* eslint-disable @typescript-eslint/no-explicit-any */

import { GrTrigger } from "react-icons/gr";
import { LuMessageSquareText } from "react-icons/lu";
import { IoPlayOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { FiFilter, FiTag } from "react-icons/fi";

import { Component, ComponentType, FunctionComponent, ReactElement } from "react";
import { MessageNode } from "./nodes/message.node";
import { TriggerNode } from "./nodes/trigger.node";
import { FirstSteNode } from "./nodes/firststep.node";
import { ConditionNode } from "./nodes/condition.node";
import { AddTagNode } from "./nodes/action.add.tag";
import { RemoveTagNode } from "./nodes/action.remove.tag";
import { SetVariableNode } from "./nodes/action.set.variable";
import { CodeNode } from "./nodes/code.note";
import { NoteNode } from "./nodes/note.node";

export type NodeTypeValue = (typeof nodeTypes)[keyof typeof nodeTypes]
export const FIRST_STEP_NODE = "first-step-node"

//
// Node Types
//

export const nodeTypesConfigurations: Record<string, ComponentType<any>> = {
  [FIRST_STEP_NODE]: FirstSteNode,
  [nodeTypes.NODE_TYPE_GENERAL_MESSAGE_SIMPLE]: MessageNode,
  [nodeTypes.NODE_TYPE_TRIGGER_GENERAL_MESSAGE_INCOMING]: TriggerNode,
  [nodeTypes.NODE_TYPE_CONDITION]: ConditionNode,
  [nodeTypes.NODE_TYPE_REQUEST_SERVICE]: RequestServiceNode,
  [nodeTypes.NODE_TYPE_ADDTAG]: AddTagNode,
  [nodeTypes.NODE_TYPE_REMOVETAG]: RemoveTagNode,
  [nodeTypes.NODE_TYPE_SETVAR]: SetVariableNode,
  [nodeTypes.NODE_TYPE_CODE]: CodeNode,
  [nodeTypes.NODE_TYPE_NOTE]: NoteNode,
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

export type colorDefaultNode = 'blue' | 'green' | 'yellow' | 'gray' | 'red' | 'purple' | 'orange' | 'sky'

type generalConfigurationNode = {
  icon: ComponentType<{ className: string }>, // ReactElement {} // ComponentType <> // ReactNode {}
  title: string
  description?: string
  color: colorDefaultNode
}

export const GeneralConfigurationNode: Record<string, generalConfigurationNode> = {
  [FIRST_STEP_NODE]: {
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
  [nodeTypes.NODE_TYPE_GENERAL_MESSAGE_FILE]: {
    icon: LuMessageSquareText,
    title: 'Archivo',
    color: 'green'
  },
  [nodeTypes.NODE_TYPE_GENERAL_MESSAGE_IMAGE]: {
    icon: LuMessageSquareText,
    title: 'Imagen',
    color: 'green'
  },
  [nodeTypes.NODE_TYPE_GENERAL_MESSAGE_LIST]: {
    icon: LuMessageSquareText,
    title: 'Lista',
    color: 'green'
  },
  [nodeTypes.NODE_TYPE_GENERAL_MESSAGE_VOICE]: {
    icon: LuMessageSquareText,
    title: 'Voz',
    color: 'green'
  },
  [nodeTypes.NODE_TYPE_TRIGGER_GENERAL_MESSAGE_INCOMING]: {
    icon: GrTrigger,
    title: 'Disparador',
    color: 'yellow'
  },
  [nodeTypes.NODE_TYPE_CODE]: {
    icon: FaCode,
    title: 'Codigo',
    color: 'gray'
  },
  [nodeTypes.NODE_TYPE_NOTE]: {
    icon: FaRegNoteSticky,
    title: 'Nota',
    color: 'yellow'
  },
  [nodeTypes.NODE_TYPE_PRIVATE_MESSAGE]: {
    icon: GrTrigger,
    title: 'Mensaje privado',
    color: 'yellow'
  },
  [nodeTypes.NODE_TYPE_REMOVETAG]: {
    icon: FiTag,
    title: 'Remover etiqueta',
    color: 'red'
  },
  [nodeTypes.NODE_TYPE_ADDTAG]: {
    icon: FiTag,
    title: 'Agregar etiqueta',
    color: 'gray'
  },
  [nodeTypes.NODE_TYPE_SETVAR]: {
    icon: TbCodeVariable,
    title: 'Establecer variable',
    color: 'gray'
  },
  [nodeTypes.NODE_TYPE_SEND_NOTIFICATION]: {
    icon: IoIosNotificationsOutline,
    title: 'Enviar notificacion',
    color: 'yellow'
  },
  [nodeTypes.NODE_TYPE_REQUEST_SERVICE]: {
    icon: RiWebhookFill,
    title: 'Solicitud externa',
    color: 'gray'
  },
  [nodeTypes.NODE_TYPE_START_AUTOMATION]: {
    icon: GrTrigger,
    title: 'Iniciar automatización',
    color: 'yellow'
  },
  [nodeTypes.NODE_TYPE_STOP_CURRENTAUTOMATION]: {
    icon: GrTrigger,
    title: 'Parar automatización',
    color: 'yellow'
  },
  [nodeTypes.NODE_TYPE_CONDITION]: {
    icon: FiFilter,
    title: 'Condición',
    color: 'yellow'
  }
}

//
// Editors
//

import { ConditionEditor, MessageEditor, TriggerEditor, AddTagEditor, RemoveTagEditor, SetVariableEditor, CodeEditor, NoteEditor } from './editors/_index'
import { edgeTypes } from "./engineSimple/edges.types";
import { RiWebhookFill } from "react-icons/ri";
import { RequestServiceNode } from "./nodes/request.service.node";
import { RequestServiceEditor } from "./editors/request.service.editor";
import { nodeTypes } from "@erick/conversationalflow";
import { FaCode } from "react-icons/fa";
import { FaRegNoteSticky } from "react-icons/fa6";
import { IoIosNotificationsOutline } from "react-icons/io";
import { TbCodeVariable } from "react-icons/tb";

export const EditorsConfiguration: Partial<Record<NodeTypeValue, { hasEditor: boolean, Editor: ComponentType | null }>> = {
  [nodeTypes.NODE_TYPE_GENERAL_MESSAGE_SIMPLE]: {
    hasEditor: true,
    Editor: MessageEditor
  },
  [nodeTypes.NODE_TYPE_TRIGGER_GENERAL_MESSAGE_INCOMING]: {
    hasEditor: true,
    Editor: TriggerEditor
  },
  [nodeTypes.NODE_TYPE_REQUEST_SERVICE]: {
    hasEditor: true,
    Editor: RequestServiceEditor
  },
  [nodeTypes.NODE_TYPE_CONDITION]: {
    hasEditor: true,
    Editor: ConditionEditor
  },
  [nodeTypes.NODE_TYPE_ADDTAG]: {
    hasEditor: true,
    Editor: AddTagEditor
  },
  [nodeTypes.NODE_TYPE_REMOVETAG]: {
    hasEditor: true,
    Editor: RemoveTagEditor
  },
  [nodeTypes.NODE_TYPE_SETVAR]: {
    hasEditor: true,
    Editor: SetVariableEditor
  },
  [nodeTypes.NODE_TYPE_CODE]: {
    hasEditor: true,
    Editor: CodeEditor
  },
  [nodeTypes.NODE_TYPE_NOTE]: {
    hasEditor: true,
    Editor: NoteEditor
  }
}

//
// misc
//

export const bgColor: Record<colorDefaultNode, { classColor: string, textColor: string }> = {
  blue: {
    classColor: 'bg-blue-500',
    textColor: "text-white"
  },
  green: {
    classColor: 'bg-green-500',
    textColor: "text-white"
  },
  yellow: {
    classColor: 'bg-yellow-500',
    textColor: "text-white"
  },
  gray: {
    classColor: 'bg-gray-500',
    textColor: "text-white"
  },
  red: {
    classColor: 'bg-red-500',
    textColor: "text-white"
  },
  orange: {
    classColor: 'bg-orange-500',
    textColor: "text-white"
  },
  purple: {
    classColor: 'bg-purple-500',
    textColor: "text-white"
  },
  sky: {
    classColor: 'bg-sky-500',
    textColor: "text-white"
  }
}

// id de nodo primer paso

export const idFirstStep = 'first-step-node'