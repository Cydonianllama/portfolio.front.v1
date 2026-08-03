import { IAutomationNode, NODE_TYPE_REQUEST_SERVICE } from "@erick/conversationalflow";
import { RequestServiceUpdater, UpdateRequestServiceConfigurationActions } from "../updaters/request.service.updater";
import { useConversationalFlowGenActions } from "./action.hooks.flow";

export const useRequestServiceEditorActions = () => {
  const conversationalFlowGenActions = useConversationalFlowGenActions({})

  function UpdateRequestServiceConfiguration<
    TAction extends keyof UpdateRequestServiceConfigurationActions
  >(
    action: TAction,
    node: IAutomationNode<typeof NODE_TYPE_REQUEST_SERVICE>,
    c: UpdateRequestServiceConfigurationActions[TAction]
  ) {

    const requestServiceUpdater = new RequestServiceUpdater()

    let node_to_update: IAutomationNode<typeof NODE_TYPE_REQUEST_SERVICE> | null = null

    switch (action) {
      case "updateConfiguration":
        node_to_update = requestServiceUpdater.updateConfiguration(node, c as UpdateRequestServiceConfigurationActions["updateConfiguration"])
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
    UpdateRequestServiceConfiguration,
  };
}
