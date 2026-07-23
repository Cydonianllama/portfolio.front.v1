import type { IAutomationNode } from "engines/simpleAutomation/models/node.automation.js";
import { NodeActionsType } from "engines/simpleAutomation/models/node.action.type.js";
import type { IRuntimeSimpleAutomationContext } from "engines/simpleAutomation/runtime/flow.runtime.js";
import type { ActionExecutorBase, NodeExecutionResult } from "./_action.executor.js";

export class StartAutomationExecutor implements ActionExecutorBase {
  type: NodeActionsType = NodeActionsType.startAutomation;
  
  async execute(node: IAutomationNode, runtime: IRuntimeSimpleAutomationContext): Promise<NodeExecutionResult> {

    return {
      status: 'success',
      logs: [],
      next: null
    }
  }
}