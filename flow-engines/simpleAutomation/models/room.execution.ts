import type { RoomExecutionState } from "./room.execution.state.js";

export interface RoomExecution {
  id: string;
  userId: string;
  workspaceId: string;
  state: RoomExecutionState;
  creationDate: Date;
}

