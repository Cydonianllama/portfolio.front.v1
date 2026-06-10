import { ResponsePagination } from "../utils.pagination";

export interface ResponseApi<T> {
  status: boolean;
  data: T;
  message?: string
  pagination?: ResponsePagination
}