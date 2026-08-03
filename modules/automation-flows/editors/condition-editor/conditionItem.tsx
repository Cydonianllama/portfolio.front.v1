import { IAutomationNode, NODE_TYPE_CONDITION, NodeCondition_Condition, NodeCondition_Rule, operators } from "@erick/conversationalflow"
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
import { useAutomationEditor } from "../../hooks/useAutomationEditor"
import { useConditionEditorActions } from "../../hooks/useConditionEditorActions"
import { useVariablesList } from "../../hooks/useVariablesList"
import { useState } from "react"

type ConditionItemProps = {
  rule: NodeCondition_Rule
  data: NodeCondition_Condition
}

const operatorLabels: Record<string, string> = {
  [operators.OPERATOR_EXIST]: 'Existe',
  [operators.OPERATOR_DOESNOTEXIST]: 'No existe',
  [operators.OPERATOR_ISEMPTY]: 'Está vacío',
  [operators.OPERATOR_ISNOTEMPTY]: 'No está vacío',
  [operators.OPERATOR_ISEQUALTO]: 'Es igual a',
  [operators.OPERATOR_ISNOTEQUALTO]: 'No es igual a',
  [operators.OPERATOR_CONTAINS]: 'Contiene',
  [operators.OPERATOR_DOESNOTCONTAIN]: 'No contiene',
  [operators.OPERATOR_STARTWITH]: 'Empieza con',
  [operators.OPERATOR_DOESNOTSTARTWITH]: 'No empieza con',
  [operators.OPERATOR_ENDSWITH]: 'Termina con',
  [operators.OPERATOR_DOESNOTENDWITH]: 'No termina con',
  [operators.OPERATOR_MATCHESREGEX]: 'Coincide con regex',
  [operators.OPERATOR_DOESNOTMATCHREGEX]: 'No coincide con regex',
  [operators.OPERATOR_GREATERTHAN]: 'Mayor que',
  [operators.OPERATOR_LESSTHAN]: 'Menor que',
  [operators.OPERATOR_GREATERTHABOREQUALTO]: 'Mayor o igual que',
  [operators.OPERATOR_LESSTHANOREQUALTO]: 'Menor o igual que',
  [operators.OPERATOR_ISAFTER]: 'Es después de',
  [operators.OPERATOR_ISBEFORE]: 'Es antes de',
  [operators.OPERATOR_ISAFTEROREQUALTO]: 'Es después o igual de',
  [operators.OPERATOR_ISBEFOREOREQUALTO]: 'Es antes o igual de',
  [operators.OPERATOR_ISTRUE]: 'Es verdadero',
  [operators.OPERATOR_ISFALSE]: 'Es falso',
  [operators.OPERATOR_LENGTH_EQUALTO]: 'Longitud igual a',
  [operators.OPERATOR_LENGTH_GREATERTHAN]: 'Longitud mayor que',
  [operators.OPERATOR_LENGTH_LESSTHAN]: 'Longitud menor que',
  [operators.OPERATOR_LENGTH_GREATERTHAROREQUALTO]: 'Longitud mayor o igual que',
  [operators.OPERATOR_LENGTH_LESSTHANOREQUALTO]: 'Longitud menor o igual que',
}

// operadores que no requieren un valor de comparacion
const operatorsWithoutValue: Array<string> = [
  operators.OPERATOR_EXIST,
  operators.OPERATOR_DOESNOTEXIST,
  operators.OPERATOR_ISEMPTY,
  operators.OPERATOR_ISNOTEMPTY,
  operators.OPERATOR_ISTRUE,
  operators.OPERATOR_ISFALSE,
]

export function ConditionItem({ data, rule } : ConditionItemProps){
  const { GetAutomationNodeInformation } = useAutomationEditor()
  const { UpdatConditionConfiguration } = useConditionEditorActions()
  const { options } = useVariablesList()
  const nodeInformation = GetAutomationNodeInformation() as IAutomationNode<typeof NODE_TYPE_CONDITION>;

  const [editing, setEditing] = useState(false)
  const [variableId, setVariableId] = useState(data.variableId || '')
  const [operator, setOperator] = useState(data.operator || '')
  const [value, setValue] = useState(data.value || '')

  const HandleStartEdit = () => {
    setVariableId(data.variableId || '')
    setOperator(data.operator || '')
    setValue(data.value || '')
    setEditing(true)
  }

  const HandleCancelEdit = () => {
    setEditing(false)
  }

  const HandleSave = () => {
    UpdatConditionConfiguration('updateCondition', nodeInformation, {
      conditionId: data.id,
      ruleId: rule.id,
      condition: {
        id: data.id,
        variableId,
        operator,
        value,
        nextNode: data.nextNode
      }
    })
    setEditing(false)
  }

  const HandleRemoveCondition = () => {
    UpdatConditionConfiguration('removeCondition', nodeInformation, {
      conditionId: data.id,
      ruleId: rule.id
    })
  }

  const selectedVariable = options.find(el => el.id == variableId)

  const needsValue = operator && !operatorsWithoutValue.includes(operator)

  return(<>
    <div className="border rounded-lg p-2 space-y-2">
      {editing ? (
        <div className="space-y-2">
          <div className="space-y-1">
            <Label className="text-xs">Variable</Label>
            <Select value={variableId} onValueChange={(val) => setVariableId(val || '')}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una variable" />
              </SelectTrigger>
              <SelectContent>
                {options.map((el) => (
                  <SelectItem key={el.id} value={el.id}>{el.name} ({el.code})</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label className="text-xs">Operador</Label>
            <Select value={operator} onValueChange={(val) => setOperator(val || '')}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un operador" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(operatorLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {needsValue && (
            <div className="space-y-1">
              <Label className="text-xs">Valor</Label>
              <Input
                className="text-xs"
                value={value}
                placeholder="Escribe un valor..."
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button variant={'outline'} size={'sm'} onClick={HandleCancelEdit}>Cancelar</Button>
            <Button size={'sm'} onClick={HandleSave}>Guardar</Button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center gap-1">
          <div className="min-w-0">
            {data.variableId && data.operator ? (
              <div className="text-xs space-y-0.5">
                <div className="font-semibold truncate">{selectedVariable?.name || data.variableId}</div>
                <div className="text-muted-foreground">
                  {operatorLabels[data.operator] || data.operator}
                  {needsValue && data.value ? ` "${data.value}"` : ''}
                </div>
              </div>
            ) : (
              <div className="text-xs text-muted-foreground">Condición sin configurar</div>
            )}
          </div>
          <div className="flex gap-0.5 shrink-0">
            <Button onClick={HandleStartEdit} variant={'ghost'} size={'icon-sm'} title="Editar">
              {IconsCatalog.edit.Icon}
            </Button>
            <Button onClick={HandleRemoveCondition} variant={'ghost'} size={'icon-sm'} title="Eliminar">
              {IconsCatalog.removex.Icon}
            </Button>
          </div>
        </div>
      )}
    </div>
  </>)
}
