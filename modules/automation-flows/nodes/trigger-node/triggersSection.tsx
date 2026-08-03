import { TriggerDTO } from "@/api/flow/trigger.dto";
import { Button } from "@/components/ui/button";
import { IconsCatalog } from "@/catalogs/icons.catalogs";
import { automationFlowGenStore } from "../../store/automation.flow.store";
import { TriggerItem } from "./triggerItem";
type TriggersSectionProps = {
  triggers: Array<TriggerDTO>
}

export const TriggersSection = ({ triggers }: TriggersSectionProps) => {
  const automationFlowStore = automationFlowGenStore()

  return (
    <>
      <div className="pt-2 space-y-2">
        {triggers.map((el, index) => (
          <TriggerItem key={index} data={el} />
        ))}
        <Button
          className={'w-full'}
          variant={'outline'}
          onClick={(e) => {
            e.stopPropagation()
            automationFlowStore.setTriggerSelector({ openTriggerSelector: true })
          }}
        >
          Agregar trigger {IconsCatalog.addPlus.Icon}
        </Button>
      </div>
    </>
  )
}
