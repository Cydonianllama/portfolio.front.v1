import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';

interface GoogleSigninResponseDTO {
  token: string;
}

export const googleSignin = async (idToken: string): Promise<ResponseApi<GoogleSigninResponseDTO> | null> => {
  try {
    const req = await api.post('/auth/google', { idToken });
    return req.data;
  } catch {
    return null;
  }
}
