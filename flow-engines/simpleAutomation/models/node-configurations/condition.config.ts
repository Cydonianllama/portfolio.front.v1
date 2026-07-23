export interface NodeConditionConfig {
  rules: Array<{
    operator: 'AND' | 'OR'
    conditions: Array<{
      type: 'validate:variable' | 'validate:event',
      variableId?: string;
      operator: string;
      value?: string;
    }>
  }>
}