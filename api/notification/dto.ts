/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface NotificationDTO {
  id: string
  creationDate: Date,
  userId: string,
  type: NotificationTypes,
  entities: Array<{
    entity: NotificationEntityTypes,
    id: string,
    name: string
  }>,
  actioner: {
    entity: NotificationEntityActioner,
    id: string,
    name: string,
    url: string
  }
}

export enum NotificationTypes {
  none = 'none',
  addedIntegration = 'added:integration',
  updatedIntegration = 'updated:integration',
  addedMember = 'added:member',
  removedMember = 'removed:member',
  workspaceNameUpdated = 'updated:workspacename',
  userVerifiedAccount = 'user:verified-account'
}

export enum NotificationEntityTypes {
  none = 'none',
  integration = 'integration',
  member = 'member',
  workspace = 'workspace'
}

export enum NotificationEntityActioner {
  user = 'user',
  api = 'api',
}