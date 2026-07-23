import type { IAutomationNode } from "engines/simpleAutomation/models/node.automation.js";
import type { NodeType } from "engines/simpleAutomation/models/node.automation.type.js";
import type { IRuntimeSimpleAutomationContext } from "engines/simpleAutomation/runtime/flow.runtime.js";
import type { ILogRuntime } from "engines/simpleAutomation/runtime/log-runtime.js";


export interface NodeExecutor {
  readonly type: NodeType;
  execute(node: IAutomationNode, runtime: IRuntimeSimpleAutomationContext): Promise<NodeExecutionResult>;
}

export interface NodeExecutionResult {
  status: "success" | "warning" | "error";
  logs?: ILogRuntime[];
  next?: string | null;
}