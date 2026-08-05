"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppData } from "@/hooks/app/useAppData";
import { GetVariables } from "@/api/variable/variable.api";
import { VariableDTO } from "@/api/variable/variable.dto";
import { useChatStore } from "../../../store/store.chat";
import { useChatActions } from "../../../actions/useChatActions";

export const RoomVariablesSection = () => {
  const appData = useAppData()
  const workspaceId = appData.workspace?.id || ''
  const chatStore = useChatStore()
  const chatActions = useChatActions()

  const [availableVariables, setAvailableVariables] = useState<Array<VariableDTO>>([])
  const [loadingVariables, setLoadingVariables] = useState(false)
  const [values, setValues] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)

  // cargar variables disponibles del workspace
  useEffect(() => {
    if (!workspaceId) return

    setLoadingVariables(true)
    GetVariables({ workspaceId, page: 1 })
      .then((req) => {
        if (req?.status && req.data) {
          setAvailableVariables(req.data.list)
        }
      })
      .finally(() => setLoadingVariables(false))
  }, [workspaceId])

  // sincronizar valores guardados de la room
  useEffect(() => {
    setValues(
      (chatStore.roomVariables || []).reduce<Record<string, string>>((acc, el) => {
        acc[el.codeVariable] = el.value
        return acc
      }, {})
    )
  }, [chatStore.roomVariables])

  const HandleUpdateValue = (code: string, value: string) => {
    setValues((prev) => ({ ...prev, [code]: value }))
  }

  const HandleSave = async () => {
    const roomId = chatStore.roomIdOpened
    if (!roomId) return;

    const cleanVariables = availableVariables
      .filter((el) => (values[el.code] || '').trim().length > 0)
      .map((el) => ({ codeVariable: el.code, value: (values[el.code] || '').trim() }))

    setSaving(true)
    await chatActions.UpdateRoomVariablesAction({
      roomId,
      variables: cleanVariables,
    })
    setSaving(false)
  }

  const savedValues = (chatStore.roomVariables || []).reduce<Record<string, string>>((acc, el) => {
    acc[el.codeVariable] = el.value
    return acc
  }, {})

  const hasChanges = JSON.stringify(values) !== JSON.stringify(savedValues)

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-purple-500" />
          Variables
        </div>
      </div>

      {loadingVariables ? (
        <p className="text-xs text-muted-foreground">Cargando variables...</p>
      ) : availableVariables.length > 0 ? (
        <div className="space-y-1.5">
          {availableVariables.map((el) => (
            <div key={el.id} className="flex items-center gap-1.5">
              <span
                title={el.name}
                className="flex-1 truncate rounded bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground"
              >
                {el.code}
              </span>
              <Input
                value={values[el.code] || ''}
                placeholder="valor"
                className="h-7 flex-1 text-xs"
                onChange={(e) => HandleUpdateValue(el.code, e.target.value)}
              />
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
        <p className="text-xs text-muted-foreground">No hay variables configuradas en el workspace.</p>
      )}
    </div>
  )
}
