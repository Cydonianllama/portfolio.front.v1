import { ConversationPlatform, TriggerTypes } from "@erick/conversationalflow"
import { ReactElement } from "react"
import { MdOutlineMessage } from "react-icons/md"

export type CatalogTrigger = {
  platform: ConversationPlatform,
  type: TriggerTypes,
  title: string,
  description: string,
  Icon: ReactElement
}

export const TriggersCatalog: CatalogTrigger[] = [
  {
    platform : ConversationPlatform.general,
    type : TriggerTypes.generalConversationRoom,
    title : 'Mensaje entrante',
    description : 'Cualquier mensaje recibido por el cliente',
    Icon : <><MdOutlineMessage /></>,
  }
]