import { NodeType } from "engines/simpleAutomation/models/node.automation.type.js";
import type { NodeExecutionResult, NodeExecutor } from "./_node.executor.js";
import type { IAutomationNode } from "engines/simpleAutomation/models/node.automation.js";
import type { IRuntimeSimpleAutomationContext } from "engines/simpleAutomation/runtime/flow.runtime.js";

export class SendNotificationExecutor implements NodeExecutor {
  type: NodeType = NodeType.sendNotification;
  
  async execute(node: IAutomationNode, runtime: IRuntimeSimpleAutomationContext): Promise<NodeExecutionResult> {

    return {
      status: 'success',
      logs: [],
      next: null
    }
  }
}