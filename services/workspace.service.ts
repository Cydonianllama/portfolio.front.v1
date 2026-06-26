// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { api } from '@/setup/axios'
// import { ResponseApi } from '@/types/api/response';

// /* eslint-disable @typescript-eslint/no-empty-object-type */
// export interface GetWorkspacesAditionalConfig {
//   page: number;
//   query: string;
// }

// export const GetWorkspaces = async (config: GetWorkspacesAditionalConfig) : Promise<ResponseApi<any> | null>  => {
//   try {
//     const req = await api.get<ResponseApi<any>>(``);
//     const res = req.data;
//     return res;
//   } catch (error) {
//     return null;
//   }
// }