import { useCallback, useEffect, useState } from "react";
import { GetVariables } from "@/api/variable/variable.api";
import { VariableDTO } from "@/api/variable/variable.dto";
import { useAppData } from "@/hooks/app/useAppData";
import { systemVariables, variableType } from "@erick/conversationalflow";

//
// Opciones de variable disponibles en el dropdown del editor de condicionales:
// - variables del workspace (por codigo)
// - variables de sistema (fullname)
// - entidades de room (solo tags por ahora)
//

export interface VariableOption {
  id: string;
  name: string;
  code: string;
  type: variableType;
  origin: 'variable' | 'system' | 'room'
}

export const SystemVariableOptions: Array<VariableOption> = [
  {
    id: systemVariables.SYSTEM_VAR_FULLNAME,
    name: 'Nombre completo',
    code: systemVariables.SYSTEM_VAR_FULLNAME,
    type: variableType.STRING,
    origin: 'system',
  },
]

export const RoomVariableOptions: Array<VariableOption> = [
  {
    id: systemVariables.SYSTEM_VAR_TAGS,
    name: 'Tags',
    code: systemVariables.SYSTEM_VAR_TAGS,
    type: variableType.ARRAY,
    origin: 'room',
  },
]

export const useVariablesList = () => {
  const appData = useAppData()
  const workspaceId = appData.workspace?.id || ''

  const [variables, setVariables] = useState<Array<VariableDTO>>([])
  const [loading, setLoading] = useState(false)

  const reload = useCallback(async () => {
    if (!workspaceId) return
    setLoading(true)
    const req = await GetVariables({ workspaceId, page: 1 })
    if (req?.status && req.data) {
      setVariables(req.data.list)
    }
    setLoading(false)
  }, [workspaceId])

  useEffect(() => {
    reload()
  }, [reload])

  const options: Array<VariableOption> = [
    ...variables.map<VariableOption>((el) => ({
      id: el.id,
      name: el.name,
      code: el.code,
      type: el.type,
      origin: 'variable',
    })),
    ...SystemVariableOptions,
    ...RoomVariableOptions,
  ]

  return {
    variables,
    options,
    loading,
    reload,
  }
}
