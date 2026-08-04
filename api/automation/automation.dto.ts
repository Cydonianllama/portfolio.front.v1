import { AutomationState } from "@erick/conversationalflow";
import { ITriggerDTO } from "./trigger.dto";

export interface IAutomationDTO {
  id: string;
  title?: string | null;
  state?: AutomationState | null;
  creationDate?: Date;
  workspaceId: string;
  triggers: Array<ITriggerDTO>;
  hasChanges?: boolean | null;
  isPublished?: boolean | null;
}

export interface IAutomationShowcaseDTO extends IAutomationDTO {
  executions: number;
}