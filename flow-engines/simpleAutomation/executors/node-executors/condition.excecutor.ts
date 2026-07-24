import type { IAutomationNode } from "engines/simpleAutomation/models/node.automation.js";
import { nodeTypes } from "engines/simpleAutomation/models/node.automation.type.js";
import type { IRuntimeSimpleAutomationContext } from "engines/simpleAutomation/runtime/flow.runtime.js";
import type { NodeExecutor, NodeExecutionResult } from "./_node.executor.js";

export class SwitchExecutor implements NodeExecutor {
  type = nodeTypes.NODE_TYPE_CONDITION
  
  async execute(node: IAutomationNode, runtime: IRuntimeSimpleAutomationContext): Promise<NodeExecutionResult> {

    if (node.nextNode){
      console.log(`[SwitchExecutor] node tiene nextNode en switch editor no se usa nextNode`)
    }

    let nextNode = ''

    
    return {
      status: 'success',
      logs: [],
      next: nextNode
    }
  }
}