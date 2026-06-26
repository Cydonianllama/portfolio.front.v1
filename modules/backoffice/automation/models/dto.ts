/* eslint-disable @typescript-eslint/no-empty-object-type */

//
export interface AutomationBackofficeDTO {
  automationId: string;
  title: string;
  creationDate: Date;
  workspaceId: string;
  workspaceName: string;
  userCreationMail: string
  userCreationId: string
}


// request

export interface GetItemsRequestDTO {
  query: string;
  page: number;
}

export interface CreateItemRequestDTO {
  title: string;
  workspaceId: string;
  userCreationId: string;
}

export interface UpdateItemRequestDTO {
  id: string;
  title?: string;
  workspaceId?: string;
  userId?: string;
}

export interface DeleteItemRequestDTO {
  id: string;
}


// response

export interface CreateAutomationResponseDTO {
  automation: AutomationBackofficeDTO | null
}

export interface GetAutomationsResponseDTO{
  list: Array<AutomationBackofficeDTO>
}

export interface UpdateAutomationResponseDTO {
  automation: AutomationBackofficeDTO | null
}

export interface GetAutomationResponseDTO {
  automation: AutomationBackofficeDTO | null
}

export interface DeleteAutomationResponseDTO {
  id: string
}


//
// workspaces selecion
//
export interface WorkspaceSelectionDTO {
  id: string
  logoURL: string
  name: string
}