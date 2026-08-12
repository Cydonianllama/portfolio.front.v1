import { IAutomationNode, nodeTypes } from "@erick/conversationalflow";
import type { FlowEdge } from "../engineSimple/types";
import { MessageUpdater } from "../updaters/message.updater";
import { getNodeAction } from "../updaters/condition.updater";
import { TriggerUpdater } from "../updaters/trigger.updater";
import { ActionUpdater } from "../updaters/action.updater";
import type {
  NodeBuildContext,
  NodeConnectContext,
  NodeDisconnectContext,
} from "./types";

export const findNodeById = (
  id: string,
  nodes: IAutomationNode[],
): IAutomationNode | null => nodes.find((el) => el.id === id) || null;

type MessageNode = IAutomationNode<typeof nodeTypes.NODE_TYPE_GENERAL_MESSAGE_SIMPLE>;
type ConditionNode = IAutomationNode<typeof nodeTypes.NODE_TYPE_CONDITION>;
type TriggerNode = IAutomationNode<typeof nodeTypes.NODE_TYPE_TRIGGER_GENERAL_MESSAGE_INCOMING>;

export const buildMessageEdges = ({ node, nodes }: NodeBuildContext): FlowEdge[] => {
  const messageNode = node as MessageNode;
  const edges: FlowEdge[] = [];

  if (!messageNode.configuration) return edges;

  if (messageNode.configuration.notResponseNextNode) {
    if (findNodeById(messageNode.configuration.notResponseNextNode, nodes)) {
      edges.push({
        id: `edge---not-response-${node.id}`,
        source: node.id,
        sourceHandle: `not-response-${node.id}`,
        target: messageNode.configuration.notResponseNextNode,
      });
    }
  }

  if (messageNode.configuration.otherResponseNextNode) {
    if (findNodeById(messageNode.configuration.otherResponseNextNode, nodes)) {
      edges.push({
        id: `edge---other-response-${node.id}`,
        source: node.id,
        sourceHandle: `other-response-${node.id}`,
        target: messageNode.configuration.otherResponseNextNode,
      });
    }
  }

  messageNode.configuration.buttons?.forEach((button, index) => {
    if (button.nextNode && findNodeById(button.nextNode, nodes)) {
      edges.push({
        id: `edge---${button.id}-${node.id}-${index}`,
        source: node.id,
        sourceHandle: button.id,
        target: button.nextNode,
      });
    }
  });

  messageNode.configuration.groupWords?.forEach((groupWord, index) => {
    if (groupWord.nextNode) {
      edges.push({
        id: `edge---${groupWord.id}-${node.id}-${index}`,
        source: node.id,
        sourceHandle: groupWord.id,
        target: groupWord.nextNode,
      });
    }
  });

  return edges;
};

export const buildConditionEdges = ({ node, nodes }: NodeBuildContext): FlowEdge[] => {
  const conditionNode = node as ConditionNode;
  const edges: FlowEdge[] = [];

  if (!conditionNode.configuration) return edges;

  conditionNode.configuration.rules?.forEach((rule, index) => {
    if (rule.nextNode && findNodeById(rule.nextNode, nodes)) {
      edges.push({
        id: `edge---${node.id}-${rule.id}-${index}`,
        sourceHandle: rule.id,
        target: rule.nextNode,
        source: node.id,
      });
    }
  });

  return edges;
};

export const connectMessage = ({ node, connection }: NodeConnectContext): IAutomationNode | null => {
  const messageNode = node as MessageNode;
  const updater = new MessageUpdater();
  const target = connection.target;

  if (!target) return null;

  if (connection.sourceHandle?.startsWith("button-")) {
    return updater.updateButtonConnection(messageNode, {
      buttonId: connection.sourceHandle,
      nextNode: target,
    });
  }

  if (connection.sourceHandle?.startsWith("words-")) {
    return updater.updateGroupWordConnection(messageNode, {
      groupWordId: connection.sourceHandle,
      nextNode: target,
    });
  }

  if (connection.sourceHandle?.startsWith("not-response")) {
    return updater.updateNotResponseNextNode(messageNode, { nextNode: target });
  }

  if (connection.sourceHandle?.startsWith("other-response")) {
    return updater.updateOtherResponseNextNode(messageNode, { nextNode: target });
  }

  return updater.updateMessageNext(messageNode, { nextNode: target });
};

export const connectCondition = ({ node, connection }: NodeConnectContext): IAutomationNode | null => {
  const conditionNode = node as ConditionNode;
  const target = connection.target;

  if (!target) return null;

  if (connection.sourceHandle?.startsWith("rule-")) {
    return updateRuleConnection(conditionNode, connection.sourceHandle, target);
  }

  return updateMessageNextNodeConnection(conditionNode, target);
};

const updateRuleConnection = (node: ConditionNode, ruleId: string, nextNode: string) => {
  const nodeToUpdate = getNodeAction(node);
  const rule = nodeToUpdate.configuration.rules.find((el) => el.id === ruleId);
  if (rule) rule.nextNode = nextNode;
  return nodeToUpdate;
};

const updateMessageNextNodeConnection = (node: ConditionNode, nextNode: string) => {
  const nodeToUpdate = getNodeAction(node);
  nodeToUpdate.nextNode = nextNode;
  return nodeToUpdate;
};

export const connectTrigger = ({ node, connection }: NodeConnectContext): IAutomationNode | null => {
  const triggerNode = node as TriggerNode;
  const target = connection.target;

  if (!target) return null;

  return new TriggerUpdater().updateTriggerNext(triggerNode, { nextNode: target });
};

export const connectAction = ({ node, connection }: NodeConnectContext): IAutomationNode | null => {
  const target = connection.target;

  if (!target) return null;

  return new ActionUpdater().updateNextNode(node, { nextNode: target });
};

export const disconnectMessage = ({ node, connectionId }: NodeDisconnectContext): IAutomationNode | null => {
  const messageNode = node as MessageNode;
  const updater = new MessageUpdater();
  const nodeToUpdate = updater.getNode(messageNode);

  if (connectionId?.startsWith("button-")) {
    const button = nodeToUpdate.configuration.buttons.find((el) => el.id === connectionId);
    if (button) button.nextNode = null;
    return nodeToUpdate;
  }

  if (connectionId?.startsWith("words-")) {
    const word = nodeToUpdate.configuration.groupWords.find((el) => el.id === connectionId);
    if (word) word.nextNode = null;
    return nodeToUpdate;
  }

  if (connectionId?.startsWith("other-response-")) {
    nodeToUpdate.configuration.otherResponseNextNode = null;
    return nodeToUpdate;
  }

  if (connectionId?.startsWith("not-response-")) {
    nodeToUpdate.configuration.notResponseNextNode = null;
    return nodeToUpdate;
  }

  return null;
};

export const disconnectCondition = ({ node, connectionId }: NodeDisconnectContext): IAutomationNode | null => {
  const conditionNode = node as ConditionNode;
  const nodeToUpdate = getNodeAction(conditionNode);

  if (connectionId && nodeToUpdate.configuration?.rules) {
    const rule = nodeToUpdate.configuration.rules.find((el) => el.id === connectionId);
    if (rule) rule.nextNode = null;
    return nodeToUpdate;
  }

  return null;
};
