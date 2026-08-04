import { buttonItemSendMessageConfigNode, defaultSendMessageConfig, ExpectedResponseConfig, ExpectedResponseType, groupWordsItemSendMessageConfigNode, IAutomationNode, NODE_TYPE_GENERAL_MESSAGE_SIMPLE, words_groupWordsItemSendMessageConfigNode } from "@erick/conversationalflow";

export interface UpdateMessageConfigurationActions {
  //
  // group word
  //
  addgroupword: {
    item: groupWordsItemSendMessageConfigNode
  }
  removegroupword: {
    item: groupWordsItemSendMessageConfigNode,
    index: number
  }
  updategroupwordItem: {
    index: number,
    itemIndex: number,
    item: words_groupWordsItemSendMessageConfigNode
  }
  addGroupWordItem: {
    index: number
    item: words_groupWordsItemSendMessageConfigNode
  }
  removegroupwordItem: {
    index: number
    itemIndex: number,
  }
  //
  // button
  // 
  addButton: {
    data: buttonItemSendMessageConfigNode
  }
  removeButton: {
    index: number
  }
  updateButton: {
    index: number
    data: buttonItemSendMessageConfigNode
  }
  //
  // text
  //
  updateMessage: {
    text: string
  }
  //
  // expected response
  //
  updateExpectedResponse: {
    expectedResponse: ExpectedResponseType,
    expectedResponseConfig?: ExpectedResponseConfig
  }
  updateTimeout: {
    noResponseTimeoutSeconds: number
  }
  //
  // conections
  //
  updateMessageNext: {
    nextNode: string | null
  }
  updateNotResponseNextNode: {
    nextNode: string | null
  }
  updateOtherResponseNextNode: {
    nextNode: string | null
  }
  updateGroupWordConnection: {
    groupWordId: string,
    nextNode: string | null,
  }
  updateButtonConnection: {
    buttonId: string,
    nextNode: string,
  }
}

type MessageUpdateNodeType = IAutomationNode<typeof NODE_TYPE_GENERAL_MESSAGE_SIMPLE>

export class MessageUpdater {

  getNode(node: MessageUpdateNodeType) {
    const defaults = defaultSendMessageConfig()
    const nodeToUpdate = {
      ...node,
      configuration: {
        ...defaults,
        ...node?.configuration,
        buttons: node?.configuration?.buttons ? [...node?.configuration?.buttons] : [],
        groupWords: node?.configuration?.groupWords?.map(g => ({
          ...g,
          words: g.words ? [...g.words] : [],
        })) || [],
      },
    };
    return nodeToUpdate
  }

  //
  // group word
  //

  addgroupword(node: MessageUpdateNodeType, conf: UpdateMessageConfigurationActions["addgroupword"]) {
    const nodeToUpdate = this.getNode(node)
    nodeToUpdate.configuration.groupWords.push(conf.item)
    return nodeToUpdate;
  }

  removegroupword(node: MessageUpdateNodeType, conf: UpdateMessageConfigurationActions["removegroupword"]) {
    const nodeToUpdate = this.getNode(node)
    nodeToUpdate.configuration.groupWords.splice(conf.index, 1)
    return nodeToUpdate;
  }

  updategroupwordItem(node: MessageUpdateNodeType, conf: UpdateMessageConfigurationActions["updategroupwordItem"]) {
    const nodeToUpdate = this.getNode(node)
    if (nodeToUpdate.configuration.groupWords.length > 0) {
      nodeToUpdate.configuration.groupWords.at(conf.index)!.words[conf.itemIndex] = conf.item;
    }
    return nodeToUpdate;
  }

  addGroupWordItem(node: MessageUpdateNodeType, conf: UpdateMessageConfigurationActions["addGroupWordItem"]) {
    const nodeToUpdate = this.getNode(node)
    const config = nodeToUpdate.configuration
    if (config.groupWords.length > 0) {
      config.groupWords.at(conf.index)!.words.push(conf.item);
    }
    return nodeToUpdate;
  }

  removegroupwordItem(node: MessageUpdateNodeType, conf: UpdateMessageConfigurationActions["removegroupwordItem"]) {
    const nodeToUpdate = this.getNode(node)
    const config = nodeToUpdate.configuration
    if (config.groupWords.length > 0) {
      config.groupWords.at(conf.index)!.words.splice(conf.itemIndex, 1);
    }
    return nodeToUpdate;
  }

  //
  // button
  //

  addButton(node: MessageUpdateNodeType, c: UpdateMessageConfigurationActions["addButton"]) {
    const nodeToUpdate = this.getNode(node)
    const config = nodeToUpdate.configuration
    config.buttons.push(c.data);
    return nodeToUpdate;
  }

  removeButton(node: MessageUpdateNodeType, c: UpdateMessageConfigurationActions["removeButton"]) {
    const nodeToUpdate = this.getNode(node)
    const config = nodeToUpdate.configuration
    config.buttons.splice(c.index, 1);
    return nodeToUpdate;
  }

  updateButton(node: MessageUpdateNodeType, c: UpdateMessageConfigurationActions["updateButton"]) {
    const nodeToUpdate = this.getNode(node)
    const config = nodeToUpdate.configuration
    config.buttons[c.index] = c.data;
    return nodeToUpdate;
  }

  //
  // text
  //

  updateMessage(node: MessageUpdateNodeType, c: UpdateMessageConfigurationActions["updateMessage"]) {
    const nodeToUpdate = this.getNode(node)
    const config = nodeToUpdate.configuration
    config.message = c.text;
    return nodeToUpdate;
  }

  //
  // expected response
  //

  updateExpectedResponse(node: MessageUpdateNodeType, c: UpdateMessageConfigurationActions["updateExpectedResponse"]) {
    const nodeToUpdate = this.getNode(node)
    const config = nodeToUpdate.configuration
    config.expectedResponse = c.expectedResponse
    if (c.expectedResponseConfig) {
      config.expectedResponseConfig = c.expectedResponseConfig
    }
    return nodeToUpdate;
  }

  updateTimeout(node: MessageUpdateNodeType, c: UpdateMessageConfigurationActions["updateTimeout"]) {
    const nodeToUpdate = this.getNode(node)
    const config = nodeToUpdate.configuration
    config.noResponseTimeoutSeconds = c.noResponseTimeoutSeconds
    return nodeToUpdate;
  }

  //
  // connections
  //
  updateMessageNext(node: MessageUpdateNodeType, c: UpdateMessageConfigurationActions["updateMessageNext"]) {
    const nodeToUpdate = this.getNode(node)
    // const config = nodeToUpdate.configuration
    nodeToUpdate.nextNode = c.nextNode
    return nodeToUpdate;
  }

  updateNotResponseNextNode(node: MessageUpdateNodeType, c: UpdateMessageConfigurationActions["updateNotResponseNextNode"]) {
    const nodeToUpdate = this.getNode(node)
    const config = nodeToUpdate.configuration
    config.notResponseNextNode = c.nextNode
    return nodeToUpdate;
  }

  updateOtherResponseNextNode(node: MessageUpdateNodeType, c: UpdateMessageConfigurationActions["updateOtherResponseNextNode"]) {
    const nodeToUpdate = this.getNode(node)
    const config = nodeToUpdate.configuration
    config.otherResponseNextNode = c.nextNode
    return nodeToUpdate;
  }

  updateGroupWordConnection(node: MessageUpdateNodeType, c: UpdateMessageConfigurationActions["updateGroupWordConnection"]) {
    const nodeToUpdate = this.getNode(node)
    const config = nodeToUpdate.configuration
    const group = config.groupWords.find(el => el.id == c.groupWordId)
    if (group) {
      group.nextNode = c.nextNode;
    }
    return nodeToUpdate;
  }

  updateButtonConnection(node: MessageUpdateNodeType, c: UpdateMessageConfigurationActions["updateButtonConnection"]) {
    const nodeToUpdate = this.getNode(node)
    const config = nodeToUpdate.configuration
    const button = config.buttons.find(el => el.id == c.buttonId)
    if (button){
      button.nextNode = c.nextNode;
    }
    return nodeToUpdate;
  }

}