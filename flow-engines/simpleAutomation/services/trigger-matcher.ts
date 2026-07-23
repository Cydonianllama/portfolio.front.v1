import type { ConversationConfiguration } from "../models/conversation.configuration.js"
import type { Trigger } from "../models/trigger.js"

export interface validateRequest {
  triggers: Array<Trigger>
  conversationConfiguration: ConversationConfiguration
}

export interface validateResult {
  matched: boolean
  trigger: Trigger | null
}

export class TriggerMatcher {

  constructor() {

  }

  async Match(data: validateRequest): Promise<validateResult> {
    return {
      matched: false,
      trigger: null
    }
  }
}