/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import {
  IAutomationNode,
  NODE_TYPE_GENERAL_MESSAGE_SIMPLE,
} from "@erick/conversationalflow";
import { MessageUpdater, UpdateMessageConfigurationActions } from "../updaters/message.updater";
import { useConversationalFlowGenActions } from "./action.hooks.flow";

export const useMessageEditorActions = () => {

  const conversationalFlowGenActions = useConversationalFlowGenActions({})

  function UpdateMessageConfiguration<
    TAction extends keyof UpdateMessageConfigurationActions
  >(
    action: TAction,
    node: IAutomationNode<typeof NODE_TYPE_GENERAL_MESSAGE_SIMPLE>,
    c: UpdateMessageConfigurationActions[TAction]
  ) {

    const messageUpdater = new MessageUpdater()

    let node_to_update: IAutomationNode<typeof NODE_TYPE_GENERAL_MESSAGE_SIMPLE> | null = null

    switch (action) {
      //
      // GROUP WORD
      //
      case "addgroupword":
        node_to_update = messageUpdater.addgroupword(node, c as UpdateMessageConfigurationActions["addgroupword"])
        break;

      case "removegroupword":
        node_to_update = messageUpdater.removegroupword(node, c as UpdateMessageConfigurationActions["removegroupword"])
        break;

      case "addGroupWordItem":
        node_to_update = messageUpdater.addGroupWordItem(node, c as UpdateMessageConfigurationActions["addGroupWordItem"])
        break;
      case "removegroupwordItem":
        node_to_update = messageUpdater.removegroupwordItem(node, c as UpdateMessageConfigurationActions["removegroupwordItem"])
        break;

      case "updategroupwordItem":
        node_to_update = messageUpdater.updategroupwordItem(node, c as UpdateMessageConfigurationActions["updategroupwordItem"])
        break;

      //
      // BUTTONS
      //
      case "addButton":
        node_to_update = messageUpdater.addButton(node, c as UpdateMessageConfigurationActions["addButton"])
        break;

      case "removeButton":
        node_to_update = messageUpdater.removeButton(node, c as UpdateMessageConfigurationActions["removeButton"])
        break;

      case "updateButton":
        node_to_update = messageUpdater.updateButton(node, c as UpdateMessageConfigurationActions["updateButton"])
        break;

      //
      // MESSAGE
      //
      case "updateMessage":
        node_to_update = messageUpdater.updateMessage(node, c as UpdateMessageConfigurationActions["updateMessage"])
        break;

      //
      // EXPECTED RESPONSE
      //
      case "updateExpectedResponse":
        node_to_update = messageUpdater.updateExpectedResponse(node, c as UpdateMessageConfigurationActions["updateExpectedResponse"])
        break;

      case "updateTimeout":
        node_to_update = messageUpdater.updateTimeout(node, c as UpdateMessageConfigurationActions["updateTimeout"])
        break;

      //
      // CONNECTIONS
      //
      case "updateMessageNext":
        node_to_update = messageUpdater.updateMessageNext(node, c as UpdateMessageConfigurationActions["updateMessageNext"])
        break;
      case "updateNotResponseNextNode":
        node_to_update = messageUpdater.updateNotResponseNextNode(node, c as UpdateMessageConfigurationActions["updateNotResponseNextNode"])
        break;
      case "updateOtherResponseNextNode":
        node_to_update = messageUpdater.updateOtherResponseNextNode(node, c as UpdateMessageConfigurationActions["updateOtherResponseNextNode"])
        break;
      case "updateGroupWordConnection":
        node_to_update = messageUpdater.updateGroupWordConnection(node, c as UpdateMessageConfigurationActions["updateGroupWordConnection"])
        break;
      case "updateButtonConnection":
        node_to_update = messageUpdater.updateButtonConnection(node, c as UpdateMessageConfigurationActions["updateButtonConnection"])
        break;
    }

    // send update to server
    if (node_to_update) {
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
    UpdateMessageConfiguration,
  };
};