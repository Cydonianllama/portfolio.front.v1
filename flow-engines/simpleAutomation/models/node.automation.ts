import type { NodeConditionConfig, NodeNoteConfig, NodePrivateMessageConfig, NodeRequestServiceConfig, NodeSendNotificationConfig, NodeTriggerConfig } from "./node-configurations/_index.js";
import type { SendFileConfigNode, SendImageConfigNode, SendListConfigNode, SendMessageConfigNode, SendVoiceConfigNode } from "./node-configurations/message-configuration/index.js";
import type { NodeCodeConfig } from "./node-configurations/code.config.js";
import { ConversationPlatform } from "./platform.enum.js";
import type { ActionAddTagConfig } from "./node-configurations/add.tag.config.js";
import type { ActionRemoveTagConfig } from "./node-configurations/remove.tag.config.js";
import type { ActionSetVariableConfig } from "./node-configurations/set.variable.js";
import type { ActionStartAutomationConfig } from "./node-configurations/start.automation.js";
import type { ActionStopAutomationConfig } from "./node-configurations/stop.automation.js";

import {
  NODE_TYPE_GENERAL_MESSAGE_SIMPLE,
  NODE_TYPE_ADDTAG, NODE_TYPE_CONDITION,
  NODE_TYPE_GENERAL_MESSAGE_FILE,
  NODE_TYPE_GENERAL_MESSAGE_IMAGE,
  NODE_TYPE_GENERAL_MESSAGE_LIST,
  NODE_TYPE_GENERAL_MESSAGE_VOICE,
  NODE_TYPE_NOTE,
  NODE_TYPE_PRIVATE_MESSAGE,
  NODE_TYPE_REMOVETAG,
  NODE_TYPE_REQUEST_SERVICE,
  NODE_TYPE_SEND_NOTIFICATION,
  NODE_TYPE_SETVAR,
  NODE_TYPE_START_AUTOMATION,
  NODE_TYPE_STOP_CURRENTAUTOMATION,
  NODE_TYPE_TRIGGER_GENERAL_MESSAGE_INCOMING,
  NODE_TYPE_CODE,
} from "./node.automation.type.js";

export interface NodeConfigurationMap {
  [NODE_TYPE_TRIGGER_GENERAL_MESSAGE_INCOMING]: NodeTriggerConfig

  [NODE_TYPE_GENERAL_MESSAGE_SIMPLE]: SendMessageConfigNode
  [NODE_TYPE_GENERAL_MESSAGE_LIST]: SendListConfigNode
  [NODE_TYPE_GENERAL_MESSAGE_FILE]: SendFileConfigNode
  [NODE_TYPE_GENERAL_MESSAGE_IMAGE]: SendImageConfigNode
  [NODE_TYPE_GENERAL_MESSAGE_VOICE]: SendVoiceConfigNode

  [NODE_TYPE_CONDITION]: NodeConditionConfig
  [NODE_TYPE_REQUEST_SERVICE]: NodeRequestServiceConfig
  [NODE_TYPE_SEND_NOTIFICATION]: NodeSendNotificationConfig
  [NODE_TYPE_PRIVATE_MESSAGE]: NodePrivateMessageConfig
  [NODE_TYPE_NOTE]: NodeNoteConfig

  [NODE_TYPE_ADDTAG]: ActionAddTagConfig
  [NODE_TYPE_REMOVETAG]: ActionRemoveTagConfig
  [NODE_TYPE_SETVAR]: ActionSetVariableConfig
  [NODE_TYPE_START_AUTOMATION]: ActionStartAutomationConfig
  [NODE_TYPE_STOP_CURRENTAUTOMATION]: ActionStopAutomationConfig

  [NODE_TYPE_CODE]: NodeCodeConfig
}
export interface IAutomationNode<T extends keyof NodeConfigurationMap = keyof NodeConfigurationMap> {
  id: string;
  creationDate: Date;
  title: string;
  nextNode: string | null;

  type: T;
  configuration: NodeConfigurationMap[T];

  automationId: string;
  platform: ConversationPlatform;

  position?: {
  x: number;
  y: number;
} | undefined;
}

// export const nodewa: IAutomationNode<typeof NODE_TYPE_GENERAL_MESSAGE_SIMPLE> = {
//   type: NODE_TYPE_GENERAL_MESSAGE_SIMPLE,
//   configuration: {
//     buttons: [],
//     message: ''
//   },
//   automationId: '',
//   creationDate: new Date(),
//   id: 'wa',
//   nextNode: null,
//   platform: ConversationPlatform.general,
//   title: '',
// }