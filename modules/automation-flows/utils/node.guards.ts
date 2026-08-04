import {
  IAutomationNode,
  NODE_TYPE_ADDTAG,
  NODE_TYPE_CODE,
  NODE_TYPE_CONDITION,
  NODE_TYPE_GENERAL_MESSAGE_SIMPLE,
  NODE_TYPE_NOTE,
  NODE_TYPE_REMOVETAG,
  NODE_TYPE_REQUEST_SERVICE,
  NODE_TYPE_SETVAR,
  NodeConfigurationMap,
} from "@erick/conversationalflow";

export const isMessageNode = (node: IAutomationNode | undefined | null): node is IAutomationNode<typeof NODE_TYPE_GENERAL_MESSAGE_SIMPLE> =>
  node?.type === NODE_TYPE_GENERAL_MESSAGE_SIMPLE;

export const isConditionNode = (node: IAutomationNode | undefined | null): node is IAutomationNode<typeof NODE_TYPE_CONDITION> =>
  node?.type === NODE_TYPE_CONDITION;

export const isAddTagNode = (node: IAutomationNode | undefined | null): node is IAutomationNode<typeof NODE_TYPE_ADDTAG> =>
  node?.type === NODE_TYPE_ADDTAG;

export const isRemoveTagNode = (node: IAutomationNode | undefined | null): node is IAutomationNode<typeof NODE_TYPE_REMOVETAG> =>
  node?.type === NODE_TYPE_REMOVETAG;

export const isSetVariableNode = (node: IAutomationNode | undefined | null): node is IAutomationNode<typeof NODE_TYPE_SETVAR> =>
  node?.type === NODE_TYPE_SETVAR;

export const isCodeNode = (node: IAutomationNode | undefined | null): node is IAutomationNode<typeof NODE_TYPE_CODE> =>
  node?.type === NODE_TYPE_CODE;

export const isNoteNode = (node: IAutomationNode | undefined | null): node is IAutomationNode<typeof NODE_TYPE_NOTE> =>
  node?.type === NODE_TYPE_NOTE;

export const isRequestServiceNode = (node: IAutomationNode | undefined | null): node is IAutomationNode<typeof NODE_TYPE_REQUEST_SERVICE> =>
  node?.type === NODE_TYPE_REQUEST_SERVICE;

// helper genérico por tipo de nodo
export const isNodeOfType = <T extends keyof NodeConfigurationMap>(
  node: IAutomationNode | undefined | null,
  type: T
): node is IAutomationNode<T> => node?.type === type;
