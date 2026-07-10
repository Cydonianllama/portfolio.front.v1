// userinformation DTO
export interface GetUserInformationResponse {
  user: UserDTO | null
}

export interface UserDTO {
  id: string;
  name: string;
  email: string
}