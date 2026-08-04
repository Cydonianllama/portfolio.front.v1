import { IAutomationShowcaseDTO } from "./automation.dto";

export interface GetAutomationRequestDTO {
  id: string;
}

export interface GetAutomationResponseDTO {
  automation: IAutomationShowcaseDTO | null
}

// get many
export interface GetAutomationsRequestDTO {
  workspaceId: string;
  page: number
}

export interface GetAutomationsResponseDTO {
  list: Array<IAutomationShowcaseDTO>
}

// update one
export interface UpdateAutomationRequestDTO {
  title: string;
  id: string
}

export interface UpdateAutomationResponseDTO {
  automation: IAutomationShowcaseDTO | null
}

// delete one
export interface DeleteAutomationRequestDTO {
  id: string
}

export interface DeleteAutomationResponseDTO {
  id: string
}

// create one
export interface CreateAutomationRequestDTO {
  title: string;
  workspaceId: string
}

export interface CreateAutomationResponseDTO {
  automation: IAutomationShowcaseDTO | null
}
// #endregion API
