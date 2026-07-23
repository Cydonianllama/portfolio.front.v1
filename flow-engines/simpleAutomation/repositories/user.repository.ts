export interface IUserRepository {
  GetInformation: (data: GetInformationRequest) => Promise<GetInformationResponse>;
}

export interface GetInformationRequest {
  userId: string
}

export interface GetInformationResponse {
  canUseAutomation: boolean;
  email: string;
  id: string;
}