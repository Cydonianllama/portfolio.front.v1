import type { ConversationPlaform } from "../models/platform.enum.js";

export interface GetIntegrationInformationResponse {
  platform: string;
  whatsapp?: { token: string}
  telegram?: {}
  messenger?: {}
  isValid: boolean;
  workspaceId: string;
  founded: boolean;
}

export interface GetIntegrationInformationRequest {
  platform: ConversationPlaform;
  identificator: string;
}

export interface IIntegrationRepository {
  GetIntegrationInformation: (data: GetIntegrationInformationRequest) => Promise<GetIntegrationInformationResponse>;
}