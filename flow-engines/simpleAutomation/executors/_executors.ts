import { NodeType } from "../models/node.automation.type.js";
import type { NodeExecutor } from "./node-executors/_node.executor.js";
import { NodeActionsType } from "engines/simpleAutomation/models/node.action.type.js";
import { ActionExecutor } from "./node-executors/action.executor.js";
import { CodeExecutor } from "./node-executors/code.executor.js";
import { SwitchExecutor } from "./node-executors/condition.excecutor.js";
import { MessageExecutor } from "./node-executors/message.executor.js";
import { PrivateMessageExecutor } from "./node-executors/private.message.executor.js";
import { RequestServiceExecutor } from "./node-executors/request.service.executor.js";
import { SendNotificationExecutor } from "./node-executors/send.notification.executor.js";
import { AddTagExecutor } from "./action-executors/add.tag.executor.js";
import { RemoveTagExecutor } from "./action-executors/remove.tag.executor.js";
import { SetVariableExecutor } from "./action-executors/set.variable.executor.js";
import { StartAutomationExecutor } from "./action-executors/start.automation.executor.js";
import { StopAutomationExecutor } from "./action-executors/stop.automation.executor.js";
import type { ActionExecutorBase } from "./action-executors/_action.executor.js";

export const executors = new Map<NodeType, NodeExecutor>([
  [NodeType.message, new MessageExecutor()],
  [NodeType.condition, new SwitchExecutor()],
  [NodeType.sendPrivateMessage, new PrivateMessageExecutor()],
  [NodeType.requestService, new RequestServiceExecutor()],
  [NodeType.sendNotification, new SendNotificationExecutor()],
  [NodeType.action, new ActionExecutor()],
  [NodeType.code, new CodeExecutor()],
]);

export const actionExecutors = new Map<NodeActionsType, ActionExecutorBase>([
  [NodeActionsType.addTag, new AddTagExecutor()],
  [NodeActionsType.removeTag, new RemoveTagExecutor()],
  [NodeActionsType.setVariable, new SetVariableExecutor()],
  [NodeActionsType.startAutomation, new StartAutomationExecutor()],
  [NodeActionsType.stopAutomation, new StopAutomationExecutor()],
])