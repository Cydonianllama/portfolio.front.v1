export interface TriggerDTO {
  id: string;
  type: number;
  platform?: number | null;
  isActive: boolean;
  workspaceId: string;
  keyConfiguration?: Array<{
    criteria?: number | null;
    words?: Array<string> | null;
    operator?: string | null;
    value?: string | null;
  }> | null;
  intention?: {
    description: string;
    examples?: Array<{ content: string }> | null
  } | null
  creationDate: Date;
  automationId?: string | null;
}
