"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconsCatalog } from "@/catalogs/icons.catalogs";
import { useChatStore } from "../../store/store.chat";
import { useChatActions } from "../../actions/useChatActions";

type RoomVariableItem = {
  codeVariable: string;
  value: string;
}

export const RoomVariablesSection = () => {
  const chatStore = useChatStore()
  const chatActions = useChatActions()

  const [variables, setVariables] = useState<Array<RoomVariableItem>>([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setVariables(
      (chatStore.roomVariables || []).map((el) => ({
        codeVariable: el.codeVariable,
        value: el.value,
      }))
    )
  }, [chatStore.roomVariables])

  const HandleAddVariable = () => {
    setVariables((prev) => [...prev, { codeVariable: '', value: '' }])
  }

  const HandleRemoveVariable = (index: number) => {
    setVariables((prev) => prev.filter((_, idx) => idx !== index))
  }

  const HandleUpdateVariable = (index: number, field: 'codeVariable' | 'value', val: string) => {
    setVariables((prev) => prev.map((el, idx) => idx === index ? { ...el, [field]: val } : el))
  }

  const HandleSave = async () => {
    const roomId = chatStore.roomIdOpened
    if (!roomId) return;

    const cleanVariables = variables
      .filter((el) => el.codeVariable.trim().length > 0)
      .map((el) => ({ codeVariable: el.codeVariable.trim(), value: el.value }))

    setSaving(true)
    await chatActions.UpdateRoomVariablesAction({
      roomId,
      variables: cleanVariables,
    })
    setSaving(false)
  }

  const hasChanges = JSON.stringify(variables) !== JSON.stringify((chatStore.roomVariables || []).map((el) => ({ codeVariable: el.codeVariable, value: el.value })))

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-purple-500" />
          Variables
        </div>
        <Button onClick={HandleAddVariable} variant={'outline'} size={'icon-xs'} title="Agregar variable">
          {IconsCatalog.addPlus.Icon}
        </Button>
      </div>

      {variables.length > 0 ? (
        <div className="space-y-1.5">
          {variables.map((el, index) => (
            <div key={index} className="flex items-center gap-1.5">
              <Input
                value={el.codeVariable}
                placeholder="nombre"
                className="h-7 flex-1 text-xs"
                onChange={(e) => HandleUpdateVariable(index, 'codeVariable', e.target.value)}
              />
              <Input
                value={el.value}
                placeholder="valor"
                className="h-7 flex-1 text-xs"
                onChange={(e) => HandleUpdateVariable(index, 'value', e.target.value)}
              />
              <Button onClick={() => HandleRemoveVariable(index)} variant={'ghost'} size={'icon-xs'} title="Eliminar">
                {IconsCatalog.removex.Icon}
              </Button>
            </div>
          ))}
          {hasChanges && (
            <div className="flex justify-end pt-1">
              <Button size={'sm'} variant={'outline'} className="text-xs" disabled={saving} onClick={HandleSave}>
                {saving ? 'Guardando...' : 'Guardar variables'}
              </Button>
            </div>
          )}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">Sin variables. Agrega una para guardar datos de la conversación.</p>
      )}
    </div>
  )
}
