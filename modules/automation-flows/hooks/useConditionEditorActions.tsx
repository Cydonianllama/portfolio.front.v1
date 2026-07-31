import { IAutomationNode, NODE_TYPE_CONDITION } from "@erick/conversationalflow"
import { addCondition, addRule, removeCondition, removeRule, updateCondition, UpdateConditionConfigurationActions } from "../updaters/condition.uptarer"
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
      case "addRule":
        node_to_update = addRule(node, c as UpdateConditionConfigurationActions["addRule"])
        break;
      case "removeCondition":
        node_to_update = removeCondition(node, c as UpdateConditionConfigurationActions["removeCondition"])
        break;
      case "updateCondition":
        node_to_update = updateCondition(node, c as UpdateConditionConfigurationActions["updateCondition"])
        break;
    }

    // send update to server
    conversationalFlowGenActions.UpdateNodeAction({
      id: node_to_update.id,
      configuration: node_to_update.configuration,
      title: node_to_update.title,
      type: node_to_update.type
    })
  }

  return {
    UpdatConditionConfiguration,
  };
}