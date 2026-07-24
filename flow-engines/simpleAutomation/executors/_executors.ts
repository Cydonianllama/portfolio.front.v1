import { nodeTypes, type NodeTypesType } from "../models/node.automation.type.js";
import type { NodeExecutor } from "./node-executors/_node.executor.js";
import { CodeExecutor } from "./node-executors/code.executor.js";
import { SwitchExecutor } from "./node-executors/condition.excecutor.js";
import { MessageExecutor } from "./node-executors/message.executor.js";
import { PrivateMessageExecutor } from "./node-executors/private.message.executor.js";
import { RequestServiceExecutor } from "./node-executors/request.service.executor.js";
import { SendNotificationExecutor } from "./node-executors/send.notification.executor.js";
import { AddTagExecutor } from "./node-executors/add.tag.executor.js";
import { RemoveTagExecutor } from "./node-executors/remove.tag.executor.js";
import { SetVariableExecutor } from "./node-executors/set.variable.executor.js";
import { StartAutomationExecutor } from "./node-executors/start.automation.executor.js";
import { StopAutomationExecutor } from "./node-executors/stop.automation.executor.js";
import { MessageVoiceExecutor } from "./node-executors/message.voice.executor.js";
import { MessageListExecutor } from "./node-executors/message.list.executor.js";
import { MessageImageExecutor } from "./node-executors/message.image.executor.js";
import { MessageFileExecutor } from "./node-executors/message.file.executor.js";

export const executors = new Map<NodeTypesType, NodeExecutor>([
  [nodeTypes.NODE_TYPE_GENERAL_MESSAGE_SIMPLE, new MessageExecutor()],
  [nodeTypes.NODE_TYPE_GENERAL_MESSAGE_FILE, new MessageFileExecutor()],
  [nodeTypes.NODE_TYPE_GENERAL_MESSAGE_IMAGE, new MessageImageExecutor()],
  [nodeTypes.NODE_TYPE_GENERAL_MESSAGE_LIST, new MessageListExecutor()],
  [nodeTypes.NODE_TYPE_GENERAL_MESSAGE_VOICE, new MessageVoiceExecutor()],
  [nodeTypes.NODE_TYPE_CODE, new CodeExecutor()],
  [nodeTypes.NODE_TYPE_PRIVATE_MESSAGE, new PrivateMessageExecutor()],
  [nodeTypes.NODE_TYPE_REQUEST_SERVICE, new RequestServiceExecutor()],
  [nodeTypes.NODE_TYPE_START_AUTOMATION, new StartAutomationExecutor()],
  [nodeTypes.NODE_TYPE_STOP_CURRENTAUTOMATION, new StopAutomationExecutor()],
  [nodeTypes.NODE_TYPE_SETVAR, new SetVariableExecutor()],
  [nodeTypes.NODE_TYPE_REMOVETAG, new RemoveTagExecutor()],
  [nodeTypes.NODE_TYPE_ADDTAG, new AddTagExecutor()],
  [nodeTypes.NODE_TYPE_SEND_NOTIFICATION, new SendNotificationExecutor()],
  [nodeTypes.NODE_TYPE_CONDITION, new SwitchExecutor()],
]);