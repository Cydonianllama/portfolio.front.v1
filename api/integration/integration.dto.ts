/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface IntegrationDTO {
  id: string;
  alias: string;
  code: string;
  creationDate: Date;
}

// get integrations

export interface GetIntegrationsResponse {
  list: IntegrationDTO[]
}

export interface GetIntegrationsRequest {
  workspaceId: string;
}

//