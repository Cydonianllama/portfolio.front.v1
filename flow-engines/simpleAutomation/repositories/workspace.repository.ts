export interface IWorkspaceRepository {
  GetInformation: (data: GetInformationRequest) => Promise<GetInformationResponse>
}

export interface GetInformationRequest {
  workspaceId: string;
}

export interface GetInformationResponse {
  founded: boolean;
  userId: string;
  id: string;
  //TODO: traer los permisos de esta webada o talvez el repositorio para saber las configuracion que faltan
}

