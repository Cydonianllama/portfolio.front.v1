import { ReactElement } from "react";
import { bgColor, colorDefaultNode, GeneralConfigurationNode } from "../../_configs";
import { NodeTypesType, nodeTypes } from "@erick/conversationalflow";

export interface NodeToCreateConfiguration {
  title: string,
  description: string,
  icon: ReactElement,
  type: NodeTypesType,
  category: 'normal'
  color: colorDefaultNode
}

const IconMessage = GeneralConfigurationNode[nodeTypes.NODE_TYPE_GENERAL_MESSAGE_SIMPLE].icon
const IconFilter = GeneralConfigurationNode[nodeTypes.NODE_TYPE_CONDITION].icon
const IconRequest = GeneralConfigurationNode[nodeTypes.NODE_TYPE_REQUEST_SERVICE].icon

export const ListSelectors: NodeToCreateConfiguration[] = [
  {
    category: 'normal',
    description: 'Envío de mensaje',
    icon: <IconMessage className={bgColor[GeneralConfigurationNode[nodeTypes.NODE_TYPE_GENERAL_MESSAGE_SIMPLE]?.color]?.textColor || ''} />,
    title: 'Mensaje',
    type: nodeTypes.NODE_TYPE_GENERAL_MESSAGE_SIMPLE,
    color: GeneralConfigurationNode[nodeTypes.NODE_TYPE_GENERAL_MESSAGE_SIMPLE].color || 'gray'
  },
  {
    category: 'normal',
    description: 'Condicionales',
    icon: <IconFilter className={bgColor[GeneralConfigurationNode[nodeTypes.NODE_TYPE_CONDITION]?.color]?.textColor || ''} />,
    title: 'Condicionales',
    type: nodeTypes.NODE_TYPE_CONDITION,
    color: GeneralConfigurationNode[nodeTypes.NODE_TYPE_CONDITION].color || 'gray'
  },
  {
    category: 'normal',
    description: 'Realizar solicitud externa',
    icon: <IconRequest className={bgColor[GeneralConfigurationNode[nodeTypes.NODE_TYPE_REQUEST_SERVICE]?.color]?.textColor || ''} />,
    title: 'Solicitud externa',
    type: nodeTypes.NODE_TYPE_REQUEST_SERVICE,
    color: GeneralConfigurationNode[nodeTypes.NODE_TYPE_REQUEST_SERVICE].color || 'gray'
  }
]