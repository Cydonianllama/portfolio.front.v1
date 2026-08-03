import { BaseEditor } from "./_base.editor";
import { Button } from "@/components/ui/button";
import { IconsCatalog } from "@/catalogs/icons.catalogs";
import { EmptyState } from "../components/states/EmptyState";
import { PlatformIcon } from "../catalogs/catalogTriggers";
import { ConversationPlatform, TriggerCriteria } from "@erick/conversationalflow";
import { automationFlowGenStore } from "../store/automation.flow.store";
import { useTriggerActions } from "../hooks/useTriggerActions";
import { GetTriggerSummary } from "../utils/triggerSummary";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TriggerDTO } from "@/api/flow/trigger.dto";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type TriggerEditorProps = {

}

export const TriggerEditor = ({ }: TriggerEditorProps) => {
  const automationFlowStore = automationFlowGenStore()
  const triggerActions = useTriggerActions()

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingCriteria, setEditingCriteria] = useState<number>(TriggerCriteria.contains)
  const [editingWords, setEditingWords] = useState<Array<string>>([''])

  const triggers = automationFlowStore.triggersFromtAutomation || []

  const HandleStartEdit = (trigger: TriggerDTO) => {
    const config = trigger.keyConfiguration?.[0]
    setEditingId(trigger.id)
    setEditingCriteria(config?.criteria ?? TriggerCriteria.contains)
    setEditingWords(config?.words?.length ? config.words : [''])
  }

  const HandleCancelEdit = () => {
    setEditingId(null)
  }

  const HandleSaveEdit = (trigger: TriggerDTO) => {
    const cleanWords = editingWords.map((el) => el.trim()).filter((el) => el.length > 0)
    if (cleanWords.length == 0) return

    triggerActions.updateTriggerAction({
      id: trigger.id,
      keyConfiguration: [{
        criteria: editingCriteria,
        words: cleanWords
      }]
    })

    setEditingId(null)
  }

  const HandleDelete = (trigger: TriggerDTO) => {
    if (!confirm('¿Eliminar este trigger?')) return
    triggerActions.deleteTriggerAction({ id: trigger.id })
  }

  return (
    <BaseEditor>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="text-foreground font-semibold">Triggers de la automatización</div>
          <Button
            variant={'outline'}
            size={'icon-sm'}
            onClick={() => automationFlowStore.setTriggerSelector({ openTriggerSelector: true })}
          >
            {IconsCatalog.addPlus.Icon}
          </Button>
        </div>

        <div className="space-y-2">
          {triggers.length ? (
            triggers.map((el) => {
              const summary = GetTriggerSummary(el)
              const isEditing = editingId == el.id

              return (
                <div key={el.id} className="border rounded-lg p-2 space-y-2">
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="h-6 w-6 rounded-md border flex items-center justify-center shrink-0 text-xs">
                        {summary.platform ? PlatformIcon[summary.platform as ConversationPlatform] : null}
                      </span>
                      <span className="text-xs font-semibold truncate">{summary.title}</span>
                    </div>
                    <div className="flex gap-0.5 shrink-0">
                      {!isEditing && (
                        <Button variant={'outline'} size={'icon-xs'} onClick={() => HandleStartEdit(el)} title="Editar">
                          {IconsCatalog.edit.Icon}
                        </Button>
                      )}
                      <Button variant={'outline'} size={'icon-xs'} onClick={() => HandleDelete(el)} title="Eliminar">
                        {IconsCatalog.trash.Icon}
                      </Button>
                    </div>
                  </div>

                  {isEditing ? (
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <Label className="text-xs">Condición</Label>
                        <select
                          className="w-full border rounded-md px-2 py-1 text-xs"
                          value={editingCriteria}
                          onChange={(e) => setEditingCriteria(Number(e.target.value))}
                        >
                          <option value={TriggerCriteria.is}>El mensaje es</option>
                          <option value={TriggerCriteria.contains}>El mensaje contiene</option>
                          <option value={TriggerCriteria.notContains}>El mensaje no contiene</option>
                          <option value={TriggerCriteria.startsWith}>El mensaje empieza con</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Palabras</Label>
                        <div className="space-y-1">
                          {editingWords.map((word, index) => (
                            <div key={index} className="flex gap-1">
                              <Input
                                className="text-xs"
                                value={word}
                                placeholder="Escribe una palabra..."
                                onChange={(e) => {
                                  const next = [...editingWords]
                                  next[index] = e.target.value
                                  setEditingWords(next)
                                }}
                              />
                              <Button
                                variant={'outline'}
                                size={'icon-sm'}
                                onClick={() => {
                                  if (editingWords.length == 1) {
                                    setEditingWords([''])
                                    return
                                  }
                                  setEditingWords(editingWords.filter((_, i) => i != index))
                                }}
                              >
                                {IconsCatalog.removex.Icon}
                              </Button>
                            </div>
                          ))}
                        </div>
                        <Button
                          variant={'outline'}
                          size={'sm'}
                          className="w-full"
                          onClick={() => setEditingWords([...editingWords, ''])}
                        >
                          {IconsCatalog.addPlus.Icon} Agregar palabra
                        </Button>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant={'outline'} size={'sm'} onClick={HandleCancelEdit}>Cancelar</Button>
                        <Button size={'sm'} onClick={() => HandleSaveEdit(el)}>Guardar</Button>
                      </div>
                    </div>
                  ) : (
                    summary.hasWordsConfig && (
                      <div className="text-[10px] text-muted-foreground space-y-0.5">
                        {summary.criteriaLabel && <div>{summary.criteriaLabel}</div>}
                        {summary.words.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {summary.words.map((word, index) => (
                              <span key={index} className="bg-gray-100 rounded px-1 py-0.5">{word}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  )}
                </div>
              )
            })
          ) : (
            <EmptyState
              Icon={IconsCatalog.addPlus.Icon}
              title="Sin triggers"
              description="Agrega triggers para definir cuándo se ejecuta esta automatización."
            />
          )}
        </div>
      </div>
    </BaseEditor>
  )
}
