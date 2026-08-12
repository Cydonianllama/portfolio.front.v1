import { useAppData } from "@/hooks/app/useAppData";
import { CatalogTrigger, TriggerCatalogTabs } from "../../catalogs/catalogTriggers";
import { AddTriggerOption } from "./addTriggerOption";
import { TriggerWordConfigForm } from "./TriggerWordConfigForm";
import { useTriggerActions } from "../../hooks/useTriggerActions";
import { automationFlowGenStore } from "../../store/automation.flow.store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    if (data.isPlaceholder) return

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
        <Tabs defaultValue={TriggerCatalogTabs[0]?.id}>
          <TabsList>
            {TriggerCatalogTabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {TriggerCatalogTabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="space-y-2">
              {tab.triggers.map((el, index) => (
                <AddTriggerOption
                  key={index}
                  data={el}
                  onClick={HandleClickTriggerOption}
                />
              ))}
            </TabsContent>
          ))}
        </Tabs>
      )}
    </>
  )
}
