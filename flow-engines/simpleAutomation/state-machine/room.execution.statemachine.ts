import type { RoomExecution } from "../models/room.execution.js";
import type { RoomExecutionState } from "../models/room.execution.state.js";

export interface IRoomExecutionStateMachine {
  transition: (room: RoomExecution, state: RoomExecutionState) => void;
}

export class RoomExecutionStateMachine implements IRoomExecutionStateMachine {

  transition(room: RoomExecution, state: RoomExecutionState){
    // TODO: validar si la transicion es legal
    room.state = state;
  }

}

// const transitions = {
//   [RoomExecutionState.Idle]: [
//     RoomExecutionState.Running
//   ],
//   [RoomExecutionState.Running]: [
//     RoomExecutionState.Waiting,
//     RoomExecutionState.Finished,
//     RoomExecutionState.Failed
//   ],
//   [RoomExecutionState.Waiting]: [
//     RoomExecutionState.Running,
//     RoomExecutionState.Failed
//   ],
//   [RoomExecutionState.Finished]: [],
//   [RoomExecutionState.Failed]: []
// } as const;
// export class StateMachine {
//     canTransition(
//         from: RoomExecutionState,
//         to: RoomExecutionState
//     ) {
//         return transitions[from].includes(to);
//     }
// }