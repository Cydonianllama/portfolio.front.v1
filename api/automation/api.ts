//___________ api

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from 'axios'
import { CreateAutomationRequestDTO, CreateAutomationResponseDTO, DeleteAutomationRequestDTO, DeleteAutomationResponseDTO, GetAutomationsRequestDTO, GetAutomationsResponseDTO, UpdateAutomationRequestDTO, UpdateAutomationResponseDTO } from "@/api/automation/dto";

export const GetAutomation = async (data: GetAutomationsRequestDTO): Promise<ResponseApi<GetAutomationsResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/automations?page=${data.page}&workspaceId=${data.workspaceId}`);
    return req.data;
  } catch (ex) {
    if (axios.isAxiosError(ex)) {
      // console.log(error.response?.status); // 422
      // console.log(error.response?.data);  
      return ex.response?.data ?? null;
    }
    return null
  }
}


export const UpdateAutomation = async (id: string, data: UpdateAutomationRequestDTO): Promise<ResponseApi<UpdateAutomationResponseDTO> | null> => {
  try {
    const req = await api.put(`/api/automations/${id}`, data);
    return req.data;
  } catch (ex) {
    if (axios.isAxiosError(ex)) {
      // console.log(error.response?.status); // 422
      // console.log(error.response?.data);  
      return ex.response?.data ?? null;
    }
    return null
  }
}

export const CreateAutomation = async (data: CreateAutomationRequestDTO): Promise<ResponseApi<CreateAutomationResponseDTO> | null> => {
  try {
    const req = await api.post(`/api/automations`, data);
    return req.data;
  } catch (ex) {
    if (axios.isAxiosError(ex)) {
      // console.log(error.response?.status); // 422
      // console.log(error.response?.data);  
      return ex.response?.data ?? null;
    }
    return null
  }
}

export const DeleteAutomation = async (data: DeleteAutomationRequestDTO): Promise<ResponseApi<DeleteAutomationResponseDTO> | null> => {
  try {
    const req = await api.delete(`/api/automations/${data.id}`);
    return req.data;
  } catch (ex) {
    if (axios.isAxiosError(ex)) {
      // console.log(error.response?.status); // 422
      // console.log(error.response?.data);  
      return ex.response?.data ?? null;
    }
    return null
  }
}