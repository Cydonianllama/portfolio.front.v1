export interface AutomationDTO {
  id: string;
  title: string;
}

// update one
export interface UpdateAutomationRequestDTO {
  title: string;
}

export interface UpdateAutomationResponseDTO {
  automation: AutomationDTO | null
}
