/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

// import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { ManagerV1Item } from '@/modules/examples/example1/types/manager.v1';
import { CreateAutomationResponseDTO, CreateItemRequestDTO} from '../models/dto';
import { sleep } from '../utils/sleep';
import { api } from '@/setup/axios'


export const CreateItem = async (config: CreateItemRequestDTO): Promise<ResponseApi<CreateAutomationResponseDTO> | null>  => {
  try {
    const req = await api.post(`/api/backoffice/automations`, config);
    return req.data;
  } catch (ex) {
    // console.log(ex.message)
    return null;
  }
}
