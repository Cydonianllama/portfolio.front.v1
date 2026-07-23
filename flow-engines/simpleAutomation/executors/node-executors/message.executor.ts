
import type { IRuntimeSimpleAutomation } from "engines/simpleAutomation/runtime/flow.runtime.js";
import type { NodeExecutionResult, NodeExecutor } from "./_node.executor.js";
import { NodeType } from "engines/simpleAutomation/models/node.automation.type.js";
import { RoomExecutionState } from "engines/simpleAutomation/models/room.execution.state.js";
import type { IAutomationNode } from "engines/simpleAutomation/models/node.automation.js";

export class MessageExecutor implements NodeExecutor {
  type: NodeType = NodeType.message;

  async execute(node: IAutomationNode, runtime: IRuntimeSimpleAutomation): Promise<NodeExecutionResult> {

    if (!runtime.roomExecution) {
      return {
        status: 'error',
        logs: [],
        next: null
      }
    }
    
    await runtime?.platform?.sendMessage()

    runtime.roomExecutionStateMachine.transition(runtime.roomExecution, RoomExecutionState.Waiting)

    const nextNod = node.nextNode || null

    return {
      status: 'success',
      logs: [],
      next: nextNod
    }
  }
}



