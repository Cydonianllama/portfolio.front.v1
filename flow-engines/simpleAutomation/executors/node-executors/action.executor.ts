
import type { IAutomationNode } from "engines/simpleAutomation/models/node.automation.js";
import type { NodeExecutionResult, NodeExecutor } from "./_node.executor.js";
import { NodeType } from "engines/simpleAutomation/models/node.automation.type.js";
import type { IRuntimeSimpleAutomationContext } from "engines/simpleAutomation/runtime/flow.runtime.js";
import { actionExecutors } from "../_executors.js";

export class ActionExecutor implements NodeExecutor {
  type: NodeType = NodeType.message;
  
  async execute(node: IAutomationNode, runtime: IRuntimeSimpleAutomationContext): Promise<NodeExecutionResult> {

    if (!node.action){
      throw "No tiene payload de action"
    }

    await actionExecutors.get(node.action?.type)?.execute(node, runtime);

    return {
      status: 'success',
      logs: [],
      next: null
    }
  }
}