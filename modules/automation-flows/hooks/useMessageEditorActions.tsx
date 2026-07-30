/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { 
  buttonItemSendMessageConfigNode,
  groupWordsItemSendMessageConfigNode, 
  IAutomationNode, 
  NODE_TYPE_GENERAL_MESSAGE_SIMPLE, 
  SendMessageConfigNode, 
  words_groupWordsItemSendMessageConfigNode 
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
    }

    // send update to server

    console.log(node_to_update)

    conversationalFlowGenActions.UpdateNodeAction({
      id: node_to_update.id,
      configuration: node_to_update.configuration,
      title: node_to_update.title,
      type: node_to_update.type
    })
  }

  return {
    UpdateMessageConfiguration,
  };
};