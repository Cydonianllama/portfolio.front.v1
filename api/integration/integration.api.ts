import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { GetIntegrationsRequest, GetIntegrationsResponse } from './integration.dto';

export const ListIntegrations = async (data: GetIntegrationsRequest): Promise<ResponseApi<GetIntegrationsResponse> | null>  => {
  try {
    const req = await api.get(`/api/workspaces/${data.workspaceId}/integrations${data.code && `?code=${data.code}`}`)
    return req.data;
  } catch (ex){ 
    return null;
  }
}