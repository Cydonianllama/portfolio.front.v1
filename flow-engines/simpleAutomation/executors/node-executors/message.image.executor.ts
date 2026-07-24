import type { IAutomationNode } from "engines/simpleAutomation/models/node.automation.js";
import { nodeTypes } from "engines/simpleAutomation/models/node.automation.type.js";
import type { IRuntimeSimpleAutomation, IRuntimeSimpleAutomationContext } from "engines/simpleAutomation/runtime/flow.runtime.js";
import type { NodeExecutor, NodeExecutionResult } from "./_node.executor.js";

import { RoomExecutionState } from "engines/simpleAutomation/models/room.execution.state.js";

export class MessageImageExecutor implements NodeExecutor {
  type = nodeTypes.NODE_TYPE_GENERAL_MESSAGE_SIMPLE

  async execute(node: IAutomationNode, runtime: IRuntimeSimpleAutomation): Promise<NodeExecutionResult> {

    if (!runtime.roomExecution) {
      return {
        status: 'error',
        logs: [],
        next: null
      }
    }
    
    // await runtime?.platform?.sendMessage()

    runtime.roomExecutionStateMachine.transition(runtime.roomExecution, RoomExecutionState.Waiting)

    const nextNod = node.nextNode || null

    return {
      status: 'success',
      logs: [],
      next: nextNod
    }
  }
}