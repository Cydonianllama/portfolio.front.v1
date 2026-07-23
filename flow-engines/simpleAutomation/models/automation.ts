import type { AutomationState } from "./automation.state.js";

export interface IAutomation {
  id: string;
  title: string;
  creationDate: Date;
  automationId: string
  state: AutomationState
}