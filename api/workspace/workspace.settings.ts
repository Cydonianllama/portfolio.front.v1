export interface IWorkspaceSettings {
  id: string;
  workspaceId: string;
  modules: {
    visible: boolean;
    inView: Array<{
      id: string;
      order: number;
      pinned: boolean
    }>
  }
  members: {
    limit: number;
  }
  staticChat: {
    show: boolean
  }
  staticContact: {
    show: boolean
  }
  tutorials: {
    completed: Array<string>
    dismissed: Array<string>
  }
  integrations: {
    notAllowed: string[]
  }
  conversationalFlow: {
    canUse: boolean
    limit: number
  }
  workflow: {
    canUse: boolean,
    limit: number
  }
  callFlow: {
    canUse: boolean,
    limit: number
  }
}