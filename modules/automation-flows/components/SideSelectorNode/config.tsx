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
const IconAddTag = GeneralConfigurationNode[nodeTypes.NODE_TYPE_ADDTAG].icon
const IconRemoveTag = GeneralConfigurationNode[nodeTypes.NODE_TYPE_REMOVETAG].icon
const IconSetVar = GeneralConfigurationNode[nodeTypes.NODE_TYPE_SETVAR].icon
const IconCode = GeneralConfigurationNode[nodeTypes.NODE_TYPE_CODE].icon
const IconNote = GeneralConfigurationNode[nodeTypes.NODE_TYPE_NOTE].icon

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
  },
  {
    category: 'normal',
    description: 'Agregar etiquetas al contacto',
    icon: <IconAddTag className={bgColor[GeneralConfigurationNode[nodeTypes.NODE_TYPE_ADDTAG]?.color]?.textColor || ''} />,
    title: 'Agregar etiqueta',
    type: nodeTypes.NODE_TYPE_ADDTAG,
    color: GeneralConfigurationNode[nodeTypes.NODE_TYPE_ADDTAG].color || 'gray'
  },
  {
    category: 'normal',
    description: 'Remover etiquetas del contacto',
    icon: <IconRemoveTag className={bgColor[GeneralConfigurationNode[nodeTypes.NODE_TYPE_REMOVETAG]?.color]?.textColor || ''} />,
    title: 'Remover etiqueta',
    type: nodeTypes.NODE_TYPE_REMOVETAG,
    color: GeneralConfigurationNode[nodeTypes.NODE_TYPE_REMOVETAG].color || 'gray'
  },
  {
    category: 'normal',
    description: 'Asignar valores a variables',
    icon: <IconSetVar className={bgColor[GeneralConfigurationNode[nodeTypes.NODE_TYPE_SETVAR]?.color]?.textColor || ''} />,
    title: 'Establecer variable',
    type: nodeTypes.NODE_TYPE_SETVAR,
    color: GeneralConfigurationNode[nodeTypes.NODE_TYPE_SETVAR].color || 'gray'
  },
  {
    category: 'normal',
    description: 'Ejecutar código personalizado',
    icon: <IconCode className={bgColor[GeneralConfigurationNode[nodeTypes.NODE_TYPE_CODE]?.color]?.textColor || ''} />,
    title: 'Código',
    type: nodeTypes.NODE_TYPE_CODE,
    color: GeneralConfigurationNode[nodeTypes.NODE_TYPE_CODE].color || 'gray'
  },
  {
    category: 'normal',
    description: 'Nota para el equipo',
    icon: <IconNote className={bgColor[GeneralConfigurationNode[nodeTypes.NODE_TYPE_NOTE]?.color]?.textColor || ''} />,
    title: 'Nota',
    type: nodeTypes.NODE_TYPE_NOTE,
    color: GeneralConfigurationNode[nodeTypes.NODE_TYPE_NOTE].color || 'gray'
  }
]
