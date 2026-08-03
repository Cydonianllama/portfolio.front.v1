import { IAutomationNode, NODE_TYPE_ADDTAG, NODE_TYPE_CODE, NODE_TYPE_NOTE, NODE_TYPE_REMOVETAG, NODE_TYPE_SETVAR } from "@erick/conversationalflow"
import { ActionUpdater, UpdateActionConfigurationActions } from "../updaters/action.updater"
import { useConversationalFlowGenActions } from "./action.hooks.flow"

export const useActionEditorActions = () => {
  const conversationalFlowGenActions = useConversationalFlowGenActions({})

  function UpdateActionConfiguration<
    TAction extends keyof UpdateActionConfigurationActions
  >(
    action: TAction,
    node: IAutomationNode,
    c: UpdateActionConfigurationActions[TAction]
  ) {

    const actionUpdater = new ActionUpdater()

    let node_to_update: IAutomationNode | null = null

    switch (action) {
      case "updateAddTags":
        node_to_update = actionUpdater.updateAddTags(node as IAutomationNode<typeof NODE_TYPE_ADDTAG>, c as UpdateActionConfigurationActions["updateAddTags"])
        break;
      case "updateRemoveTags":
        node_to_update = actionUpdater.updateRemoveTags(node as IAutomationNode<typeof NODE_TYPE_REMOVETAG>, c as UpdateActionConfigurationActions["updateRemoveTags"])
        break;
      case "updateSetVariables":
        node_to_update = actionUpdater.updateSetVariables(node as IAutomationNode<typeof NODE_TYPE_SETVAR>, c as UpdateActionConfigurationActions["updateSetVariables"])
        break;
      case "updateNote":
        node_to_update = actionUpdater.updateNote(node as IAutomationNode<typeof NODE_TYPE_NOTE>, c as UpdateActionConfigurationActions["updateNote"])
        break;
      case "updateCode":
        node_to_update = actionUpdater.updateCode(node as IAutomationNode<typeof NODE_TYPE_CODE>, c as UpdateActionConfigurationActions["updateCode"])
        break;
      case "updateNextNode":
        node_to_update = actionUpdater.updateNextNode(node, c as UpdateActionConfigurationActions["updateNextNode"])
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
    UpdateActionConfiguration,
  };
}
