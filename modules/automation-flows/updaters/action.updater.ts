import { ActionAddTagConfig, ActionRemoveTagConfig, ActionSetVariableConfig, IAutomationNode, NodeCodeConfig, NodeNoteConfig, NODE_TYPE_ADDTAG, NODE_TYPE_CODE, NODE_TYPE_NOTE, NODE_TYPE_REMOVETAG, NODE_TYPE_SETVAR } from "@erick/conversationalflow";

export interface UpdateActionConfigurationActions {
  updateAddTags: {
    tagIds: Array<string>
  }
  updateRemoveTags: {
    tagIds: Array<string>
  }
  updateSetVariables: {
    variables: Array<{ variableId: string, value: string }>
  }
  updateNote: {
    content: string,
    color: string
  }
  updateCode: {
    scriptL: 'js' | 'python',
    content: string
  }
  updateNextNode: {
    nextNode: string | null
  }
}

export class ActionUpdater {

  private getNode(node: IAutomationNode) {
    return {
      ...node,
      configuration: node.configuration ? { ...node.configuration } : {},
    };
  }

  updateAddTags(node: IAutomationNode<typeof NODE_TYPE_ADDTAG>, c: UpdateActionConfigurationActions["updateAddTags"]) {
    const nodeToUpdate = this.getNode(node) as IAutomationNode<typeof NODE_TYPE_ADDTAG>
    const config: ActionAddTagConfig = nodeToUpdate.configuration
    config.toAdd = c.tagIds.map(tagId => ({ tagId }))
    return nodeToUpdate;
  }

  updateRemoveTags(node: IAutomationNode<typeof NODE_TYPE_REMOVETAG>, c: UpdateActionConfigurationActions["updateRemoveTags"]) {
    const nodeToUpdate = this.getNode(node) as IAutomationNode<typeof NODE_TYPE_REMOVETAG>
    const config: ActionRemoveTagConfig = nodeToUpdate.configuration
    config.toRemove = c.tagIds.map(tagId => ({ tagId }))
    return nodeToUpdate;
  }

  updateSetVariables(node: IAutomationNode<typeof NODE_TYPE_SETVAR>, c: UpdateActionConfigurationActions["updateSetVariables"]) {
    const nodeToUpdate = this.getNode(node) as IAutomationNode<typeof NODE_TYPE_SETVAR>
    const config: ActionSetVariableConfig = nodeToUpdate.configuration
    config.variables = c.variables
    return nodeToUpdate;
  }

  updateNote(node: IAutomationNode<typeof NODE_TYPE_NOTE>, c: UpdateActionConfigurationActions["updateNote"]) {
    const nodeToUpdate = this.getNode(node) as IAutomationNode<typeof NODE_TYPE_NOTE>
    const config: NodeNoteConfig = nodeToUpdate.configuration
    config.content = c.content
    config.color = c.color
    return nodeToUpdate;
  }

  updateCode(node: IAutomationNode<typeof NODE_TYPE_CODE>, c: UpdateActionConfigurationActions["updateCode"]) {
    const nodeToUpdate = this.getNode(node) as IAutomationNode<typeof NODE_TYPE_CODE>
    const config: NodeCodeConfig = nodeToUpdate.configuration
    config.scriptL = c.scriptL
    config.content = c.content
    return nodeToUpdate;
  }

  updateNextNode(node: IAutomationNode, c: UpdateActionConfigurationActions["updateNextNode"]) {
    const nodeToUpdate = this.getNode(node)
    nodeToUpdate.nextNode = c.nextNode
    return nodeToUpdate;
  }

}
