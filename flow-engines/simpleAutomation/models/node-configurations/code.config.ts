export interface NodeCodeConfig {
  janguage: 'js' | 'python',
  content: string;
  outputs: Array<{
    id: string;
    title: string;
    automationId?: string;
  }>
}