/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { CreateVariableRequestDTO, CreateVariableResponseDTO, DeleteVariableRequestDTO, DeleteVariableResponseDTO, GetVariableRequestDTO, GetVariableResponseDTO, GetVariablesRequestDTO, GetVariablesResponseDTO, UpdateVariableRequestDTO, UpdateVariableResponseDTO } from './variable.dto';


// Reemplazar por los nombre correctos
/*

variable.api
/api/variables
Variable
variable

*/

export const GetVariables = async (data: GetVariablesRequestDTO): Promise<ResponseApi<GetVariablesResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/variables?workspaceId=${data.workspaceId}&page=${data.page}`);
    return req.data;
  } catch (ex) {
    return null;
  }
}

export const GetVariable = async (data: GetVariableRequestDTO): Promise<ResponseApi<GetVariableResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/variables${data.id}`);
    return req.data;
  } catch (ex) {
    return null;
  }
}


export const UpdateVariable = async (id: string, data: UpdateVariableRequestDTO): Promise<ResponseApi<UpdateVariableResponseDTO> | null> => {
  try {
    const req = await api.put(`/api/variables${id}`, data);
    return req.data;
  } catch (ex) {
    return null;
  }
}

export const CreateVariable = async (data: CreateVariableRequestDTO): Promise<ResponseApi<CreateVariableResponseDTO> | null> => {
  try {
    const req = await api.post(`/api/variables`, data);
    return req.data;
  } catch (ex) {
    return null;
  }
}

export const DeleteVariable = async (data: DeleteVariableRequestDTO): Promise<ResponseApi<DeleteVariableResponseDTO> | null> => {
  try {
    const req = await api.delete(`/api/variables${data.id}`);
    return req.data;
  } catch (ex) {
    return null;
  }
}


///
///
///
