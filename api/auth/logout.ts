import { ResponseApi } from '@/types/api/response';
import axios from "axios"
import Cookies from "js-cookie";

export const Logout = async (): Promise<boolean> => {
  try {
    // const req = await api.post<ResponseApi<null>>(`/back-office/logout`);
    // return req.data;
    localStorage.removeItem("token");
    Cookies.remove("token");

    return true

  } catch (error) {
    if (axios.isAxiosError<ResponseApi<null>>(error)) {
      return false;
    }
    return false;
  }
}
