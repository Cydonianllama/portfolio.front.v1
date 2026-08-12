import { nodeTypes } from "@erick/conversationalflow";

import { GrTrigger } from "react-icons/gr";
import { LuMessageSquareText } from "react-icons/lu";
import { IoPlayOutline } from "react-icons/io5";
import { FiFilter, FiTag } from "react-icons/fi";
import { FaCode } from "react-icons/fa";
import { FaRegNoteSticky } from "react-icons/fa6";
import { RiWebhookFill } from "react-icons/ri";
import { TbCodeVariable } from "react-icons/tb";

import { MessageNode } from "../nodes/message.node";
import { TriggerNode } from "../nodes/trigger.node";
import { FirstSteNode } from "../nodes/firststep.node";
import { ConditionNode } from "../nodes/condition.node";
import { RequestServiceNode } from "../nodes/request.service.node";
import { AddTagNode } from "../nodes/action.add.tag";
import { RemoveTagNode } from "../nodes/action.remove.tag";
import { SetVariableNode } from "../nodes/action.set.variable";
import { CodeNode } from "../nodes/code.note";
import { NoteNode } from "../nodes/note.node";

import { MessageEditor } from "../editors/message.editor";
import { TriggerEditor } from "../editors/trigger.editor";
import { ConditionEditor } from "../editors/condition.editor";
import { RequestServiceEditor } from "../editors/request.service.editor";
import { AddTagEditor } from "../editors/add.tag.editor";
import { RemoveTagEditor } from "../editors/remove.tag.editor";
import { SetVariableEditor } from "../editors/set.variable.editor";
import { CodeEditor } from "../editors/code.editor";
import { NoteEditor } from "../editors/note.editor";

import { FIRST_STEP_NODE } from "./constants";
import type { AutomationNodeDefinition } from "./types";
import {
  buildConditionEdges,
  buildMessageEdges,
  connectAction,
  connectCondition,
  connectMessage,
  connectTrigger,
  disconnectCondition,
  disconnectMessage,
} from "./behaviors";

export const automationNodeRegistry: AutomationNodeDefinition[] = [
  {
    type: FIRST_STEP_NODE,
    component: FirstSteNode,
    visual: {
      icon: IoPlayOutline,
      title: "Primer paso",
      description: "Selecciona el primer paso.",
      color: "blue",
    },
    canOpenEditor: false,
  },
  {
    type: nodeTypes.NODE_TYPE_GENERAL_MESSAGE_SIMPLE,
    component: MessageNode,
    editor: MessageEditor,
    visual: {
      icon: LuMessageSquareText,
      title: "Mensaje",
      color: "green",
    },
    canOpenEditor: true,
    canCreate: true,
    canCreateFromFirstStep: true,
    createLabel: "Mensaje",
    createDescription: "Envío de mensaje",
    buildEdges: buildMessageEdges,
    onConnect: connectMessage,
    onDisconnect: disconnectMessage,
  },
  {
    type: nodeTypes.NODE_TYPE_TRIGGER_GENERAL_MESSAGE_INCOMING,
    component: TriggerNode,
    editor: TriggerEditor,
    visual: {
      icon: GrTrigger,
      title: "Disparador",
      color: "yellow",
    },
    canOpenEditor: true,
    canCreate: false,
    onConnect: connectTrigger,
  },
  {
    type: nodeTypes.NODE_TYPE_CONDITION,
    component: ConditionNode,
    editor: ConditionEditor,
    visual: {
      icon: FiFilter,
      title: "Condición",
      color: "yellow",
    },
    canOpenEditor: true,
    canCreate: true,
    canCreateFromFirstStep: true,
    createLabel: "Condición",
    createDescription: "Condicionales",
    buildEdges: buildConditionEdges,
    onConnect: connectCondition,
    onDisconnect: disconnectCondition,
  },
  {
    type: nodeTypes.NODE_TYPE_REQUEST_SERVICE,
    component: RequestServiceNode,
    editor: RequestServiceEditor,
    visual: {
      icon: RiWebhookFill,
      title: "Solicitud externa",
      color: "gray",
    },
    canOpenEditor: true,
    canCreate: true,
    createLabel: "Solicitud externa",
    createDescription: "Realizar solicitud externa",
    onConnect: connectAction,
  },
  {
    type: nodeTypes.NODE_TYPE_ADDTAG,
    component: AddTagNode,
    editor: AddTagEditor,
    visual: {
      icon: FiTag,
      title: "Agregar etiqueta",
      color: "gray",
    },
    canOpenEditor: true,
    canCreate: true,
    createLabel: "Agregar etiqueta",
    createDescription: "Agregar etiquetas al contacto",
    onConnect: connectAction,
  },
  {
    type: nodeTypes.NODE_TYPE_REMOVETAG,
    component: RemoveTagNode,
    editor: RemoveTagEditor,
    visual: {
      icon: FiTag,
      title: "Remover etiqueta",
      color: "red",
    },
    canOpenEditor: true,
    canCreate: true,
    createLabel: "Remover etiqueta",
    createDescription: "Remover etiquetas del contacto",
    onConnect: connectAction,
  },
  {
    type: nodeTypes.NODE_TYPE_SETVAR,
    component: SetVariableNode,
    editor: SetVariableEditor,
    visual: {
      icon: TbCodeVariable,
      title: "Establecer variable",
      color: "gray",
    },
    canOpenEditor: true,
    canCreate: true,
    createLabel: "Establecer variable",
    createDescription: "Asignar valores a variables",
    onConnect: connectAction,
  },
  {
    type: nodeTypes.NODE_TYPE_CODE,
    component: CodeNode,
    editor: CodeEditor,
    visual: {
      icon: FaCode,
      title: "Código",
      color: "gray",
    },
    canOpenEditor: true,
    canCreate: true,
    createLabel: "Código",
    createDescription: "Ejecutar código personalizado",
    onConnect: connectAction,
  },
  {
    type: nodeTypes.NODE_TYPE_NOTE,
    component: NoteNode,
    editor: NoteEditor,
    visual: {
      icon: FaRegNoteSticky,
      title: "Nota",
      color: "yellow",
    },
    canOpenEditor: true,
    canCreate: true,
    createLabel: "Nota",
    createDescription: "Nota para el equipo",
    onConnect: connectAction,
  },
];
