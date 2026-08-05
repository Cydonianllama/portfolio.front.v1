import { useAppData } from "@/hooks/app/useAppData";
import { CatalogTrigger, TriggersCatalog } from "../../catalogs/catalogTriggers";
import { AddTriggerOption } from "./addTriggerOption";
import { TriggerWordConfigForm } from "./TriggerWordConfigForm";
import { useTriggerActions } from "../../hooks/useTriggerActions";
import { automationFlowGenStore } from "../../store/automation.flow.store";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type AddTriggerOptionsProps = {
  onSelect: (data: CatalogTrigger | null) => void
  selectedOption: CatalogTrigger | null
}

export const AddTriggerOptions = ({ onSelect, selectedOption }: AddTriggerOptionsProps) => {
  const appData = useAppData()

  const triggerActions = useTriggerActions()

  const automationStore = automationFlowGenStore()

  const HandleClickTriggerOption = (data: CatalogTrigger) => {
    if (data.hasWordsConfig) {
      onSelect(data)
      return
    }

    // triggers sin configuracion de palabras: crear directo
    triggerActions.createTriggerAction({
      platform: data.platform,
      type: data.type,
      workspaceId: appData.workspace?.id || '',
      automationId: automationStore.automationId || '',
    })
  }

  const HandleSaveWordsConfig = (config: { criteria: number, words: Array<string> }) => {
    if (!selectedOption) return

    triggerActions.createTriggerAction({
      platform: selectedOption.platform,
      type: selectedOption.type,
      workspaceId: appData.workspace?.id || '',
      automationId: automationStore.automationId || '',
      keyConfiguration: [{
        criteria: config.criteria,
        words: config.words
      }]
    })

    onSelect(null)
  }

  return (
    <>
      {selectedOption ? (
        <TriggerWordConfigForm
          onSave={HandleSaveWordsConfig}
          onCancel={() => onSelect(null)}
        />
      ) : (
        TriggersCatalog.map((el, index) => (
          <AddTriggerOption
            key={index}
            data={el}
            onClick={HandleClickTriggerOption}
          />
        ))
      )}
    </>
  )
}
