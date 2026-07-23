
// ______________ Service

import { NodeActionsType } from '@/flow-engines/simpleAutomation/models/node.action.type';
import { IAutomationNode } from '@/flow-engines/simpleAutomation/models/node.automation';
import { NodeMessageType } from '@/flow-engines/simpleAutomation/models/node.message.type';
import { ConversationPlaform } from '@/flow-engines/simpleAutomation/models/platform.enum';
import { nodeTypes } from '@/modules/automation-flows/engineSimple/node.types';
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from 'axios'

export interface CreateNodeRequestDTO {
  automationId: string,
  nodeType: nodeTypes,
  platform: ConversationPlaform,
  messageType: NodeMessageType,
  actionType: NodeActionsType
}

interface CreateNodeResponseDTO {
  node: IAutomationNode | null
}

export const CreateNode= async (data: CreateNodeRequestDTO): Promise<ResponseApi<CreateNodeResponseDTO> | null> => {
  try {
    const req = await api.post(`/api/flows/create-node`, data);
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