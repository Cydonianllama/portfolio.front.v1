export interface VariableDTO {
  id: string;
  name: string
}

// get one
export interface GetVariableRequestDTO {
  id: string;
}

export interface GetVariableResponseDTO {
  variable: VariableDTO | null
}

// get many
export interface GetVariablesRequestDTO {
  page: number
  workspaceId: string;
}

export interface GetVariablesResponseDTO {
  list: Array<VariableDTO>
}

// update one
export interface UpdateVariableRequestDTO {
  name: string;
}

export interface UpdateVariableResponseDTO {
  variable: VariableDTO | null
}

// delete one
export interface DeleteVariableRequestDTO {
  id: string
}

export interface DeleteVariableResponseDTO {
  id: string
}

// create one
export interface CreateVariableRequestDTO {
  name: string;
}
  
export interface CreateVariableResponseDTO {
  variable: VariableDTO | null
}
  