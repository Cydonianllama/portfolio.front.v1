import { TriggerDTO } from "@/api/flow/trigger.dto";
import { PlatformIcon } from "../../catalogs/catalogTriggers";
import { Button } from "@/components/ui/button";
import { IconsCatalog } from "@/catalogs/icons.catalogs";
import { GetTriggerSummary } from "../../utils/triggerSummary";
import { useTriggerActions } from "../../hooks/useTriggerActions";
import { automationFlowGenStore } from "../../store/automation.flow.store";
import { ConversationPlatform } from "@erick/conversationalflow";

type TriggerItemProps = {
  data: TriggerDTO
}

export const TriggerItem = ({ data }: TriggerItemProps) => {
  const triggerActions = useTriggerActions()

  const automationFlowStore = automationFlowGenStore()

  const summary = GetTriggerSummary(data)

  const HandleDelete = () => {
    if (!confirm('¿Eliminar este trigger?')) return
    triggerActions.deleteTriggerAction({ id: data.id })
  }

  const HandleEdit = () => {
    automationFlowStore.setStartEdit({ openEdit: true })
  }

  return (
    <>
      <div className="border rounded-lg p-2 space-y-1">
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-2 min-w-0">
            <span className="h-6 w-6 rounded-md border flex items-center justify-center shrink-0 text-xs">
              {summary.platform ? PlatformIcon[summary.platform as ConversationPlatform] : null}
            </span>
            <span className="text-xs font-semibold truncate">{summary.title}</span>
          </div>
          <div className="flex gap-0.5 shrink-0">
            <Button variant={'outline'} size={'icon-xs'} onClick={HandleEdit} title="Editar">
              {IconsCatalog.edit.Icon}
            </Button>
            <Button variant={'outline'} size={'icon-xs'} onClick={HandleDelete} title="Eliminar">
              {IconsCatalog.trash.Icon}
            </Button>
          </div>
        </div>
        {summary.hasWordsConfig && (
          <div className="text-[10px] text-muted-foreground space-y-0.5">
            {summary.criteriaLabel && (
              <div>{summary.criteriaLabel}</div>
            )}
            {summary.words.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {summary.words.map((word, index) => (
                  <span key={index} className="bg-gray-100 rounded px-1 py-0.5">{word}</span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
