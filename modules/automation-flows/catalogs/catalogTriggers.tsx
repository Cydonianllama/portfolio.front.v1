import { ConversationPlatform, TriggerTypes, TriggerTypesMetadata } from "@erick/conversationalflow"
import { ReactElement } from "react"
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa"
import { MdOutlineMessage } from "react-icons/md"

export type CatalogTrigger = {
  platform: ConversationPlatform,
  type: TriggerTypes,
  title: string,
  description: string,
  hasWordsConfig: boolean,
  isDefault: boolean,
  Icon: ReactElement
}

export const PlatformIcon: Record<ConversationPlatform, ReactElement> = {
  [ConversationPlatform.whatsapp]: <FaWhatsapp />,
  [ConversationPlatform.telegram]: <FaTelegramPlane />,
  [ConversationPlatform.webchat]: <MdOutlineMessage />,
  [ConversationPlatform.personalized]: <MdOutlineMessage />,
  [ConversationPlatform.general]: <MdOutlineMessage />,
  [ConversationPlatform.portfolio]: <MdOutlineMessage />,
}

const TypesWithCatalog: Array<TriggerTypes> = [
  TriggerTypes.contactWritesKeywordWhatsapp,
  TriggerTypes.contactWritesKeywordTelegram,
  TriggerTypes.contactWritesKeywordWebchat,
  TriggerTypes.newContactWhatsapp,
  TriggerTypes.newContactTelegram,
  TriggerTypes.newContactWebchat,
  TriggerTypes.existingContactWhatsapp,
  TriggerTypes.existingContactTelegram,
  TriggerTypes.existingContactWebchat,
  TriggerTypes.defaultWhatsapp,
  TriggerTypes.defaultTelegram,
  TriggerTypes.defaultWebchat,
]

export const TriggersCatalog: CatalogTrigger[] = TypesWithCatalog.map((type) => {
  const metadata = TriggerTypesMetadata[type]
  return {
    platform: metadata.platform,
    type: metadata.type,
    title: metadata.title,
    description: metadata.description,
    hasWordsConfig: metadata.hasWordsConfig,
    isDefault: metadata.isDefault,
    Icon: PlatformIcon[metadata.platform],
  }
})
