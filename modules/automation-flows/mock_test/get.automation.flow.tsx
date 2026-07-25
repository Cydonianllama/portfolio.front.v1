import { ConversationPlatform, IPublishedAutomation, nodeTypes } from '@erick/conversationalflow'

export const publishedAutomation: IPublishedAutomation = {
  automationId: '',
  id: '',
  nodes: [
    {
      id: '',
      creationDate: new Date(),
      nextNode: null,
      platform: ConversationPlatform.general,
      title: '',
      type: nodeTypes.NODE_TYPE_ADDTAG,
      configuration: {

      },
      automationId: ''
    }
  ],
  startNodeId: '',
  version: '',
  workspaceId: ''
}