import type { ConversationConfiguration } from "../models/conversation.configuration.js";
import type { ConversationPlaform } from "../models/platform.enum.js";
import type { Trigger } from "../models/trigger.js";

export interface ITriggerRepository {
  GetAll: (data: GetAllRequest) => Promise<GetAllResponse>
}

export interface GetAllRequest {
  workspaceId: string;
  platforms: Array<ConversationPlaform>
}

export interface GetAllResponse {
  list: Array<Trigger>
  status: boolean;
}