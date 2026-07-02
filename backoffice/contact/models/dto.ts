/* eslint-disable @typescript-eslint/no-empty-object-type */

export interface ContactDTO {
  id: string
  name: string
  creationDate: Date
  workspaceId: string
  workspaceName: string
  workspaceLogo: string
}

// request

export interface GetContactsRequestDTO {
  query: string;
  page: number;
}

export interface CreateContactRequestDTO {
  fullname: string;
  workspaceId: string;
}

export interface UpdateContactRequestDTO {
  id: string;
  fullname: string;
  workspaceId: string;
}

export interface DeleteContactRequestDTO {
  id: string;
}


// response
export interface CreateContactResponseDTO {
  contact: ContactDTO | null
}

export interface UpdateContactRepsonseDTO {
  contact: ContactDTO | null
}

export interface GetContactResponseDTO {
  contact: ContactDTO | null
}

export interface GetContactsResponseDTO {
  list: Array<ContactDTO>
}

export interface DeleteContactResponseDTO {
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