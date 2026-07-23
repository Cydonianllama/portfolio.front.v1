
import type { IAutomationNode } from "engines/simpleAutomation/models/node.automation.js";
import type { NodeExecutionResult, NodeExecutor } from "./_node.executor.js";
import type { IRuntimeSimpleAutomationContext } from "engines/simpleAutomation/runtime/flow.runtime.js";
import { NodeType } from "engines/simpleAutomation/models/node.automation.type.js";

export class SwitchExecutor implements NodeExecutor {
  type: NodeType = NodeType.condition;
  
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