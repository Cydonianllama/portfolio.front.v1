import type { RoomExecution } from "../models/room.execution.js";

export interface IRoomExecutionRepository {
  GetInformation: (data: GetInformationRequest) => Promise<GetInformationResponse>
}

export interface GetInformationRequest {
  roomId: string
}

export interface GetInformationResponse {
  founded: boolean;
  roomExecution: RoomExecution | null
}