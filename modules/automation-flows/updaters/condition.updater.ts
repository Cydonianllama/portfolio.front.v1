import { IAutomationNode, NODE_TYPE_CONDITION, NodeCondition_Condition, NodeCondition_Rule } from "@erick/conversationalflow"

/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface UpdateConditionConfigurationActions {
  addRule: {
    item: NodeCondition_Rule
  }
  removeRule: {
    ruleId: string
  }
  addCondition: {
    ruleId: string;
    condition: NodeCondition_Condition
  }
  removeCondition: {
    ruleId: string;
    conditionId: string;
  }
  updateCondition: {
    ruleId: string;
    conditionId: string
    condition: NodeCondition_Condition
  }
  //
  // conection
  //
  updateRuleConection: {
    ruleId: string,
    nextNode: string | null,
  }
  updateMessageNextNodeConection: {
    nextNode: string | null,
  }
}

type MessageUpdateNodeType = IAutomationNode<typeof NODE_TYPE_CONDITION>

function getNode(node: MessageUpdateNodeType) {
  const nodeToUpdate = {
    ...node,
    configuration: {
      ...node.configuration,
      rules: node?.configuration?.rules.map(el => ({
        ...el,
        conditions: el?.conditions ? [...el?.conditions] : []
      })) || []
    },
  };
  return nodeToUpdate
}

export const addRule = (node: MessageUpdateNodeType, c: UpdateConditionConfigurationActions["addRule"]) => {
  const nodeToUpdate = getNode(node);
  const config = nodeToUpdate.configuration;
  config.rules.push(c.item)
  return nodeToUpdate;
}

export const removeRule = (node: MessageUpdateNodeType, c: UpdateConditionConfigurationActions["removeRule"]) => {
  const nodeToUpdate = getNode(node);
  const config = nodeToUpdate.configuration;
  config.rules = config.rules.filter(el => el.id != c.ruleId)
  return nodeToUpdate;
}

export const addCondition = (node: MessageUpdateNodeType, c: UpdateConditionConfigurationActions["addCondition"]) => {
  const nodeToUpdate = getNode(node);
  const config = nodeToUpdate.configuration;
  const rule = config.rules.find(el => el.id == c.ruleId)
  if (rule){
    rule.conditions.push(c.condition)
  }
  return nodeToUpdate;
}

export const removeCondition = (node: MessageUpdateNodeType, c: UpdateConditionConfigurationActions["removeCondition"]) => {
  const nodeToUpdate = getNode(node);
  const config = nodeToUpdate.configuration;
  const rule = config.rules.find(el => el.id == c.ruleId)
  if (rule){
    rule.conditions = rule.conditions.filter(el => el.id != c.conditionId) 
  }
  return nodeToUpdate;
}

export const updateCondition = (node: MessageUpdateNodeType, c: UpdateConditionConfigurationActions["updateCondition"]) => {
  const nodeToUpdate = getNode(node);
  const config = nodeToUpdate.configuration;
  const rule = config.rules.find(el => el.id == c.ruleId)
  if (rule){
    rule.conditions = rule.conditions.map(el => {
      if (el.id == c.conditionId){
        return c.condition
      } else return el
    }) 
  }
  return nodeToUpdate;
}

export const updateRuleConection = (node: MessageUpdateNodeType, c: UpdateConditionConfigurationActions["updateRuleConection"]) => {
  const nodeToUpdate = getNode(node);
  const config = nodeToUpdate.configuration;
  const rule = config.rules.find(el => el.id == c.ruleId)
  if (rule){
    rule.nextNode = c.nextNode;
  }
  return nodeToUpdate;
}

export const updateMessageNextNodeConection = (node: MessageUpdateNodeType, c: UpdateConditionConfigurationActions["updateMessageNextNodeConection"]) => {
  const nodeToUpdate = getNode(node);
  // const config = nodeToUpdate.configuration;
  nodeToUpdate.nextNode = c.nextNode
  return nodeToUpdate;
}