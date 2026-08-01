import { UseAppData } from "@/hooks/app/useAppData";
import { CatalogTrigger, TriggersCatalog } from "../../catalogs/catalogTriggers";
import { AddTriggerOption } from "./addTriggerOption";
import { useTriggerActions } from "../../hooks/useTriggerActions";
import { automationFlowGenStore } from "../../store/automation.flow.store";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type AddTriggerOptionsProps = {

}

export const AddTriggerOptions = ({ }: AddTriggerOptionsProps) => {
  const useAppData = UseAppData()

  const triggerActions = useTriggerActions()

  const automationStore = automationFlowGenStore()

  const HandleClickTriggerOption = (data: CatalogTrigger) => {
    triggerActions.createTriggerAction({
      platform: data.platform,
      type: data.type,
      workspaceId: useAppData.workspace?.id || '',
      automationId: automationStore.automationId || '',
    })
  }

  return (
    <>
      {TriggersCatalog.map((el, index) => (
        <AddTriggerOption
          key={index}
          data={el}
          onClick={HandleClickTriggerOption}
        />
      ))}
    </>
  )
}