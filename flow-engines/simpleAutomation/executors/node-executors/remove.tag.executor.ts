import type { IAutomationNode } from "engines/simpleAutomation/models/node.automation.js";
import { nodeTypes } from "engines/simpleAutomation/models/node.automation.type.js";
import type { IRuntimeSimpleAutomationContext } from "engines/simpleAutomation/runtime/flow.runtime.js";
import type { NodeExecutor, NodeExecutionResult } from "./_node.executor.js";

export class RemoveTagExecutor implements NodeExecutor {
  type = nodeTypes.NODE_TYPE_REMOVETAG
  
  async execute(node: IAutomationNode, runtime: IRuntimeSimpleAutomationContext): Promise<NodeExecutionResult> {

    return {
      status: 'success',
      logs: [],
      next: null
    }
  }
}