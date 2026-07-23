import type { ConversationPlaform } from "./platform.enum.js";
import type { TriggerTypes } from "./trigger.type.js";

export interface Trigger {
  id: string
  type: TriggerTypes
  creationDate: Date
  isActive: boolean;
  platform: ConversationPlaform
  keyConfiguration?: Array<{ operator: string; value: string }> | null
  intention?: { description: string, examples: Array<{ content: string }> } | null,
  workspaceId: string;
}