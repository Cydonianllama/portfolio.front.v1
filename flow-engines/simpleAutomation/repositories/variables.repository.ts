import type { Variables } from "../models/variables.js";

export interface IVariableRepository {
  GetAllByWorkspaceId: (data: GetAllByRoomRequest) => Promise<GetAllByRoomResult>
}

export interface GetAllByRoomRequest {
  workspaceId: string;
}

export interface GetAllByRoomResult {
  list: Array<Variables>
}
