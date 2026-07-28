

export interface IUserSettings {
  id: string;
  userId: string;
  workspaces: {
    limit: number
  }
  creationDate: Date
}