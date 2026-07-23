import type { NodeConditionConfig, NodeNoteConfig, NodePrivateMessageConfig, NodeRequestServiceConfig, NodeSendNotificationConfig, NodeTriggerConfig } from "./node-configurations/_index.js";
import type { ActionAddTagConfig, ActionRemoveTagConfig, ActionSetVariableConfig, ActionStartAutomationConfig, ActionStopAutomationConfig } from "./node-configurations/action-configuration/index.js";
import type { SendFileConfigNode, SendImageConfigNode, SendListConfigNode, SendMessageConfigNode, SendVoiceConfigNode } from "./node-configurations/message-configuration/index.js";
import { NodeActionsType } from "./node.action.type.js";
import type { NodeType } from "./node.automation.type.js";
import type { NodeMessageType } from "./node.message.type.js";
import type { ConversationPlaform } from "./platform.enum.js";

type actionConfigurationType = 
{ type: NodeActionsType.addTag, configAddTag?: ActionAddTagConfig } |  
{ type: NodeActionsType.removeTag, configRemoveTag?: ActionRemoveTagConfig } |
{ type: NodeActionsType.setVariable, configSetVar?: ActionSetVariableConfig } |
{ type: NodeActionsType.startAutomation, configStartAutomation?: ActionStartAutomationConfig } |
{ type: NodeActionsType.stopAutomation, configStopAutomation?: ActionStopAutomationConfig }

type messageConfigurationType = 
{ type: NodeMessageType.Message, configMessage?: SendMessageConfigNode } |
{ type: NodeMessageType.File, configFile?: SendFileConfigNode } |
{ type: NodeMessageType.List, configList?: SendListConfigNode } |
{ type: NodeMessageType.Image, configImage?: SendImageConfigNode } |
{ type: NodeMessageType.Voice, configVoice?: SendVoiceConfigNode }

export interface IAutomationNode {
  id: string;
  creationDate: Date;
  title: string;
  nextNode: string | null;
  type: NodeType
  workspaceId: string;
  platform: ConversationPlaform
  action?: actionConfigurationType | null
  message?: messageConfigurationType | null
  trigger?: NodeTriggerConfig | null
  privateMessage?: NodePrivateMessageConfig | null
  note?: NodeNoteConfig | null
  condition?: NodeConditionConfig | null
  requestService?: NodeRequestServiceConfig | null
  sendNotification?: NodeSendNotificationConfig | null
}