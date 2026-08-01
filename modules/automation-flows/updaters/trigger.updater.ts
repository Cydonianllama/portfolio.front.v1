import { IAutomationNode,NODE_TYPE_TRIGGER_GENERAL_MESSAGE_INCOMING } from "@erick/conversationalflow";

export interface UpdateTriggerConfigurationActions {
  updateTriggerNext: {
    nextNode: string | null
  }
}

type TriggerUpdateNodeType = IAutomationNode<typeof NODE_TYPE_TRIGGER_GENERAL_MESSAGE_INCOMING>

export class TriggerUpdater {

  private getNode(node: TriggerUpdateNodeType) {
    const nodeToUpdate = {
      ...node,
      configuration: {
        list: node.configuration?.list ? [...node.configuration.list] : []
      },
    };
    return nodeToUpdate
  }

  //
  // connections
  //
  updateTriggerNext(node: TriggerUpdateNodeType, c: UpdateTriggerConfigurationActions["updateTriggerNext"]) {
    const nodeToUpdate = this.getNode(node)
    // const config = nodeToUpdate.configuration
    nodeToUpdate.nextNode = c.nextNode
    return nodeToUpdate;
  }

}