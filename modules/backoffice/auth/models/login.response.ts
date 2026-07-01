export type loginResponseData = {
  token: string;
  user: {
    email: string;
    fullname: string;
    id: string;
  }
}