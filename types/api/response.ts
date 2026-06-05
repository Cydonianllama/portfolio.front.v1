export interface ResponseApi<T> {
  status: boolean;
  data: T;
  message?: string
}