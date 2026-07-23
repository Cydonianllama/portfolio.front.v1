export interface NodeRequestServiceConfig {
  url: string;
  method: 'POST' | 'GET' | 'PUT' | 'DELETE',
  headers: Array<{
    key: string;
    value: string;
  }>
  body?: string;
  mappers: Array<{
    path: string;
    saveId: string;
  }>
}