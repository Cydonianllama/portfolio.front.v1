import type { IPublishedAutomation } from "../models/published.automation.js";

export interface IPublishedAutomationRepository {
  GetInformationByIdAndVersion: (data: GetInformationByIdAndVersionRequest) => Promise<GetInformationByIdAndVersionResult>
  GetInformation: (data: GetInformationRequest) => Promise<GetInformationByIdAndVersionResult>
}

// GetInformationByIdAndVersion
export interface GetInformationByIdAndVersionRequest {
  id: string;
  version: string;
}

export interface GetInformationByIdAndVersionResult {
  status: boolean;
  publishedAutomation: IPublishedAutomation | null
}

// GetInformation
export interface GetInformationRequest {
  id: string;
}

export interface GetInformationByIdAndVersionResult {
  status: boolean;
  publishedAutomation: IPublishedAutomation | null
}

