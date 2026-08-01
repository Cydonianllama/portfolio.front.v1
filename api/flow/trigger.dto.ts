export interface TriggerDTO {
  id: string;
  type: number;
  platform?: number | null;
  isActive: boolean;
  workspaceId: string;
  keyConfiguration?: Array<{
    operator: string
    value: string
  }> | null;
  intention?: {
    description: string;
    examples?: Array<{ content: string }> | null
  } | null
  creationDate: Date;
}