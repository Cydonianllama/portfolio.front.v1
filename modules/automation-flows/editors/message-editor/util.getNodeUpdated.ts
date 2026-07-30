import { IAutomationNode, NODE_TYPE_GENERAL_MESSAGE_SIMPLE, SendMessageConfigNode } from "@erick/conversationalflow";

export const UpdateMessageConfiguration = (node: IAutomationNode<typeof NODE_TYPE_GENERAL_MESSAGE_SIMPLE>, configuration: Partial<SendMessageConfigNode>) => {
  const nodeToUpdate = {...node};
  nodeToUpdate.configuration = { ...nodeToUpdate.configuration, ...configuration }
  return nodeToUpdate;
}

export const UpdateGeneralNodeConfiguration = (node: Partial<IAutomationNode>, nodeToUpdate: Partial<IAutomationNode>) => {
  const newNode = {...node, ...nodeToUpdate}
  return newNode;
}