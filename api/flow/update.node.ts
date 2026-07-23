/* eslint-disable @typescript-eslint/no-explicit-any */

// ______________ Service

import { NodeConditionConfig, NodeNoteConfig, NodePrivateMessageConfig, NodeRequestServiceConfig, NodeSendNotificationConfig, NodeTriggerConfig } from '@/flow-engines/simpleAutomation/models/node-configurations/_index';
import { actionConfigurationType, IAutomationNode, messageConfigurationType } from '@/flow-engines/simpleAutomation/models/node.automation';
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from 'axios'


export interface UpdateNodeRequestDTO {
  id: string,
  title?: string,

  action?: actionConfigurationType
  message?: messageConfigurationType
  trigger?: NodeTriggerConfig
  privateMessage?: NodePrivateMessageConfig
  note?: NodeNoteConfig
  condition?: NodeConditionConfig
  requestService?: NodeRequestServiceConfig
  sendNotification?: NodeSendNotificationConfig

}

interface UpdateNodeResponseDTO {
  node: IAutomationNode | null
}

export const UpdateNode = async (data: UpdateNodeRequestDTO): Promise<ResponseApi<UpdateNodeResponseDTO> | null> => {
  try {
    const req = await api.put(`/api/flows/node`, data);
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