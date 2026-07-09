/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { CreateConversationFilterRequestDTO, CreateConversationFilterResponseDTO, DeleteConversationFilterRequestDTO, DeleteConversationFilterResponseDTO, GetConversationFilterRequestDTO, GetConversationFilterResponseDTO, GetConversationsFilterRequestDTO, GetConversationsFilterResponseDTO, UpdateConversationFilterRequestDTO, UpdateConversationFilterResponseDTO } from './conversation.filter.dto';

export const GetConversationFilters = async (data: GetConversationsFilterRequestDTO): Promise<ResponseApi<GetConversationsFilterResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/conversationFilters?page=${data.page}`);
    return req.data;
  } catch (ex) {
    return null;
  }
}

export const GetConversationFilter = async (data: GetConversationFilterRequestDTO): Promise<ResponseApi<GetConversationFilterResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/conversationFilters/${data.id}`);
    return req.data;
  } catch (ex) {
    return null;
  }
}


export const UpdateConversationFilter = async (data: UpdateConversationFilterRequestDTO): Promise<ResponseApi<UpdateConversationFilterResponseDTO> | null> => {
  try {
    const req = await api.put(`/api/conversationFilters/${data.id}`, data);
    return req.data;
  } catch (ex) {
    return null;
  }
}

export const CreateConversationFilter = async (data: CreateConversationFilterRequestDTO): Promise<ResponseApi<CreateConversationFilterResponseDTO> | null> => {
  try {
    const req = await api.post(`/api/conversationFilters/`, data);
    return req.data;
  } catch (ex) {
    return null;
  }
}

export const DeleteConversationFilter = async (data: DeleteConversationFilterRequestDTO): Promise<ResponseApi<DeleteConversationFilterResponseDTO> | null> => {
  try {
    const req = await api.delete(`/api/conversationFilters/${data.id}`);
    return req.data;
  } catch (ex) {
    return null;
  }
}