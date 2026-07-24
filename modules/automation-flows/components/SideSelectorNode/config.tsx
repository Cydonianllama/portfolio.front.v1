import { ReactElement } from "react";
import { nodeTypes, NodeTypesType } from '@/flow-engines/simpleAutomation/models/node.automation.type'
import { FaRegMessage } from "react-icons/fa6";
import { FiFilter } from "react-icons/fi";

export interface NodeToCreateConfiguration {
  title: string,
  description: string,
  icon: ReactElement,
  type: NodeTypesType,
  category: 'normal'
}

export const ListSelectors: NodeToCreateConfiguration[] = [
  {
    category: 'normal',
    description: 'Envío de mensaje',
    icon: <FaRegMessage />,
    title: 'Mensaje',
    type: nodeTypes.NODE_TYPE_GENERAL_MESSAGE_SIMPLE
  },
  {
    category: 'normal',
    description: 'Condicionales',
    icon: <FiFilter />,
    title: 'Condicionales',
    type: nodeTypes.NODE_TYPE_CONDITION
  }
]