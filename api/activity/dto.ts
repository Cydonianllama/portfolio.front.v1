/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface ActivityDTO {
  id: string;
  actionType: ActivityActionType;
  entities: Array<{
    entityType: ActivityEntityType,
    id: string,
    name: string
  }>,
  actioner: {
    id: string,
    actionerType: ActivityActionerType,
    name: string,
    url: string
  },
  workspaceId: string,
  creationDate: Date,
}

export enum ActivityActionType {
  none = '-',
  create = "create",
  delete = "delete",
  added = "added",
  inactive = "inactive",
}

export enum ActivityEntityType {
  none = '-',
  contact = 'contact',
  integration = 'integration',
  room = 'room',
  automation = 'automation',
}

export enum ActivityActionerType {
  none = '-',
  user = 'user',
  api = 'api'
}