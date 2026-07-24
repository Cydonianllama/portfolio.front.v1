import { IAutomationNode } from '@/flow-engines/simpleAutomation/models/node.automation'
import { nodeTypes } from '@/flow-engines/simpleAutomation/models/node.automation.type'
import { ConversationPlatform } from '@/flow-engines/simpleAutomation/models/platform.enum'
import { IPublishedAutomation } from '@/flow-engines/simpleAutomation/models/published.automation'

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