import { NodeActionsType } from '@/flow-engines/simpleAutomation/models/node.action.type'
import { IAutomationNode } from '@/flow-engines/simpleAutomation/models/node.automation'
import { NodeType } from '@/flow-engines/simpleAutomation/models/node.automation.type'
import { ConversationPlaform } from '@/flow-engines/simpleAutomation/models/platform.enum'
import { IPublishedAutomation } from '@/flow-engines/simpleAutomation/models/published.automation'

export const publishedAutomation: IPublishedAutomation = {
  automationId: '',
  id: '',
  nodes: [
    {
      id: '',
      creationDate: new Date(),
      nextNode: null,
      platform: ConversationPlaform.general,
      title: '',
      type: NodeType.action,
      workspaceId: '',
      action: {
        type: NodeActionsType.addTag,
        configAddTag: {
          toAdd: [
            { tagId: '' }
          ]
        }
      }
    }
  ],
  startNodeId: '',
  version: '',
  workspaceId: ''
}