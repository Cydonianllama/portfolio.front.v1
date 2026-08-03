import { IAutomationNode, NODE_TYPE_CONDITION } from "@erick/conversationalflow"
import { addCondition, addRule, removeCondition, removeRule, updateCondition, updateRuleConnectionType, UpdateConditionConfigurationActions, updateMessageNextNodeConection, updateRuleConection } from "../updaters/condition.updater"
import { useConversationalFlowGenActions } from "./action.hooks.flow"

export const useConditionEditorActions = () => {
  const conversationalFlowGenActions = useConversationalFlowGenActions({})

  function UpdatConditionConfiguration<
    TAction extends keyof UpdateConditionConfigurationActions
  >(
    action: TAction,
    node: IAutomationNode<typeof NODE_TYPE_CONDITION>,
    c: UpdateConditionConfigurationActions[TAction]
  ) {


    let node_to_update: IAutomationNode<typeof NODE_TYPE_CONDITION> | null = null

    switch (action) {
      case "addRule":
        node_to_update = addRule(node, c as UpdateConditionConfigurationActions["addRule"])
        break;
      case "removeRule":
        node_to_update = removeRule(node, c as UpdateConditionConfigurationActions["removeRule"])
        break;
      case "addCondition":
        node_to_update = addCondition(node, c as UpdateConditionConfigurationActions["addCondition"])
        break;
      case "removeCondition":
        node_to_update = removeCondition(node, c as UpdateConditionConfigurationActions["removeCondition"])
        break;
      case "updateCondition":
        node_to_update = updateCondition(node, c as UpdateConditionConfigurationActions["updateCondition"])
        break;
      case "updateRuleConection":
        node_to_update = updateRuleConection(node, c as UpdateConditionConfigurationActions["updateRuleConection"])
        break;
      case "updateRuleConnectionType":
        node_to_update = updateRuleConnectionType(node, c as UpdateConditionConfigurationActions["updateRuleConnectionType"])
        break;
      case "updateMessageNextNodeConection":
        node_to_update = updateMessageNextNodeConection(node, c as UpdateConditionConfigurationActions["updateMessageNextNodeConection"])
        break;
    }

    // send update to server
    if (node_to_update){
      conversationalFlowGenActions.UpdateNodeAction({
        id: node_to_update.id,
        configuration: node_to_update.configuration,
        title: node_to_update.title,
        type: node_to_update.type,
        nextNode: node_to_update.nextNode
      })
    }
  }

  return {
    UpdatConditionConfiguration,
  };
}