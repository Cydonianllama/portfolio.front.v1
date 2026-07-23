import type { ConversationPlaform } from "../models/platform.enum.js";
import type { Room } from "../models/room.js"

export interface IRoomRepository {
  Get: (data: RoomRepositoryRequest) => Promise<RoomRepositoryResponse>
  GetByIntegrationId: (data: GetByIntegrationIdRequest) => Promise<GetByIntegrationIdResult>
}

// GET

export interface RoomRepositoryRequest {
  platform: ConversationPlaform;
  workspaceId: string;
  platformIdentificator: string;
}

export interface RoomRepositoryResponse {
  founded: boolean
  room: Room | null
}

// GET by integrationId

export interface GetByIntegrationIdRequest {
  integrationId: string;
  workspaceId: string;
}

export interface GetByIntegrationIdResult {
  founded: boolean
  room: Room | null
}