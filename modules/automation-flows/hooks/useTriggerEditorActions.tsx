import { IAutomationNode, NODE_TYPE_TRIGGER_GENERAL_MESSAGE_INCOMING } from "@erick/conversationalflow"
import { addCondition, addRule, removeCondition, removeRule, updateCondition, UpdateConditionConfigurationActions, updateMessageNextNodeConection, updateRuleConection } from "../updaters/condition.updater"
import { useConversationalFlowGenActions } from "./action.hooks.flow"
import { TriggerUpdater, UpdateTriggerConfigurationActions } from "../updaters/trigger.updater"

const triggerUpdater = new TriggerUpdater()

export const useTriggerEditorActions = () => {
  const conversationalFlowGenActions = useConversationalFlowGenActions({})

  function UpdateTriggerConfiguration<
    TAction extends keyof UpdateTriggerConfigurationActions
  >(
    action: TAction,
    node: IAutomationNode<typeof NODE_TYPE_TRIGGER_GENERAL_MESSAGE_INCOMING>,
    c: UpdateTriggerConfigurationActions[TAction]
  ) {

    let node_to_update: IAutomationNode<typeof NODE_TYPE_TRIGGER_GENERAL_MESSAGE_INCOMING> | null = null

    switch (action) {
      case "updateTriggerNext":
        node_to_update = triggerUpdater.updateTriggerNext(node, c as UpdateTriggerConfigurationActions["updateTriggerNext"])
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
    UpdateTriggerConfiguration,
  };
}