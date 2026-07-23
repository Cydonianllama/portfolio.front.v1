import type { IAutomationNode } from "./node.automation.js";

export interface IPublishedAutomation {
  id: string;
  automationId: string;
  workspaceId: string;
  startNodeId: string;
  nodes: Array<IAutomationNode>
  version: string;
}