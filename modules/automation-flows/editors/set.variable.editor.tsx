import { BaseEditor } from "./_base.editor"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { IconsCatalog } from "@/catalogs/icons.catalogs"
import { useAutomationEditor } from "../hooks/useAutomationEditor"
import { useActionEditorActions } from "../hooks/useActionEditorActions"
import { useVariablesList } from "../hooks/useVariablesList"
import { isSetVariableNode } from "../utils/node.guards"

/* eslint-disable @typescript-eslint/no-empty-object-type */
type SetVariableEditorProps = {

}

export const SetVariableEditor = ({ }: SetVariableEditorProps) => {
  const { GetAutomationNodeInformation } = useAutomationEditor()
  const { UpdateActionConfiguration } = useActionEditorActions()
  const { options } = useVariablesList()

  const nodeInformation = GetAutomationNodeInformation()
  const isNode = isSetVariableNode(nodeInformation)

  const variables = isNode ? nodeInformation.configuration?.variables || [] : []

  const HandleUpdateVariable = (index: number, field: 'variableId' | 'value', val: string) => {
    if (!isNode) return;
    const next = variables.map((el, idx) => idx === index ? { ...el, [field]: val } : el)
    UpdateActionConfiguration('updateSetVariables', nodeInformation, { variables: next })
  }

  const HandleAddVariable = () => {
    if (!isNode) return;
    UpdateActionConfiguration('updateSetVariables', nodeInformation, {
      variables: [...variables, { variableId: '', value: '' }]
    })
  }

  const HandleRemoveVariable = (index: number) => {
    if (!isNode) return;
    UpdateActionConfiguration('updateSetVariables', nodeInformation, {
      variables: variables.filter((_, idx) => idx !== index)
    })
  }

  return (
    <BaseEditor>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label>Variables</Label>
          <Button variant={'outline'} size={'icon-sm'} onClick={HandleAddVariable}>
            {IconsCatalog.addPlus.Icon}
          </Button>
        </div>

        {variables.length ? (
          <div className="space-y-2">
            {variables.map((el, index) => (
              <div key={index} className="border rounded-lg p-2 space-y-2">
                <div className="flex justify-between items-center gap-1">
                  <Label className="text-xs">Variable</Label>
                  <Button variant={'ghost'} size={'icon-xs'} onClick={() => HandleRemoveVariable(index)}>
                    {IconsCatalog.removex.Icon}
                  </Button>
                </div>
                <Select value={el.variableId} onValueChange={(val) => HandleUpdateVariable(index, 'variableId', val || '')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una variable" />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((opt) => (
                      <SelectItem key={opt.id} value={opt.code}>{opt.name} ({opt.code})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="space-y-1">
                  <Label className="text-xs">Valor</Label>
                  <Input
                    className="text-xs"
                    value={el.value}
                    placeholder="Escribe el valor..."
                    onChange={(e) => HandleUpdateVariable(index, 'value', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">Sin variables configuradas. Agrega una para asignar valores.</p>
        )}
      </div>
    </BaseEditor>
  )
}
