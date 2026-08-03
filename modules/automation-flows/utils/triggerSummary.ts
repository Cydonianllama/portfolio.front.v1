import { TriggerTypes, TriggerTypesMetadata, TriggerCriteria, ConversationPlatform } from "@erick/conversationalflow"
import { TriggerDTO } from "@/api/flow/trigger.dto"

export const TriggerCriteriaLabels: Record<number, string> = {
  [TriggerCriteria.is]: 'El mensaje es',
  [TriggerCriteria.contains]: 'El mensaje contiene',
  [TriggerCriteria.notContains]: 'El mensaje no contiene',
  [TriggerCriteria.startsWith]: 'El mensaje empieza con',
}

export const PlatformLabels: Record<number, string> = {
  [ConversationPlatform.whatsapp]: 'WhatsApp',
  [ConversationPlatform.telegram]: 'Telegram',
  [ConversationPlatform.webchat]: 'Widget',
}

export function GetTriggerMetadata(type: number) {
  return TriggerTypesMetadata[type as TriggerTypes]
}

export function GetTriggerSummary(trigger: TriggerDTO) {
  const metadata = GetTriggerMetadata(trigger.type)
  const config = trigger.keyConfiguration?.[0]

  return {
    title: metadata?.title || `Trigger #${trigger.type}`,
    description: metadata?.description || '',
    platform: trigger.platform || null,
    hasWordsConfig: metadata?.hasWordsConfig || false,
    criteriaLabel: config?.criteria ? TriggerCriteriaLabels[config.criteria] : null,
    words: config?.words || [],
  }
}
