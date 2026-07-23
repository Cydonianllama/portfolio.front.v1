export interface NodeSendNotificationConfig {
  content: string;
  scope: 'workspace' | 'user'
  userId?: string; // solo si es scope user
}