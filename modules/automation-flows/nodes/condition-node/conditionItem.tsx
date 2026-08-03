import { NodeCondition_Condition, operators } from "@erick/conversationalflow"

type ConditionItemProps = {
  data: NodeCondition_Condition
}

const operatorLabels: Record<string, string> = {
  [operators.OPERATOR_EXIST]: 'existe',
  [operators.OPERATOR_DOESNOTEXIST]: 'no existe',
  [operators.OPERATOR_ISEMPTY]: 'está vacío',
  [operators.OPERATOR_ISNOTEMPTY]: 'no está vacío',
  [operators.OPERATOR_ISEQUALTO]: 'es igual a',
  [operators.OPERATOR_ISNOTEQUALTO]: 'no es igual a',
  [operators.OPERATOR_CONTAINS]: 'contiene',
  [operators.OPERATOR_DOESNOTCONTAIN]: 'no contiene',
  [operators.OPERATOR_STARTWITH]: 'empieza con',
  [operators.OPERATOR_DOESNOTSTARTWITH]: 'no empieza con',
  [operators.OPERATOR_ENDSWITH]: 'termina con',
  [operators.OPERATOR_DOESNOTENDWITH]: 'no termina con',
  [operators.OPERATOR_MATCHESREGEX]: 'coincide con regex',
  [operators.OPERATOR_DOESNOTMATCHREGEX]: 'no coincide con regex',
  [operators.OPERATOR_GREATERTHAN]: 'mayor que',
  [operators.OPERATOR_LESSTHAN]: 'menor que',
  [operators.OPERATOR_GREATERTHABOREQUALTO]: 'mayor o igual que',
  [operators.OPERATOR_LESSTHANOREQUALTO]: 'menor o igual que',
  [operators.OPERATOR_ISAFTER]: 'es después de',
  [operators.OPERATOR_ISBEFORE]: 'es antes de',
  [operators.OPERATOR_ISAFTEROREQUALTO]: 'es después o igual de',
  [operators.OPERATOR_ISBEFOREOREQUALTO]: 'es antes o igual de',
  [operators.OPERATOR_ISTRUE]: 'es verdadero',
  [operators.OPERATOR_ISFALSE]: 'es falso',
  [operators.OPERATOR_LENGTH_EQUALTO]: 'longitud igual a',
  [operators.OPERATOR_LENGTH_GREATERTHAN]: 'longitud mayor que',
  [operators.OPERATOR_LENGTH_LESSTHAN]: 'longitud menor que',
  [operators.OPERATOR_LENGTH_GREATERTHAROREQUALTO]: 'longitud mayor o igual que',
  [operators.OPERATOR_LENGTH_LESSTHANOREQUALTO]: 'longitud menor o igual que',
}

const operatorsWithoutValue: Array<string> = [
  operators.OPERATOR_EXIST,
  operators.OPERATOR_DOESNOTEXIST,
  operators.OPERATOR_ISEMPTY,
  operators.OPERATOR_ISNOTEMPTY,
  operators.OPERATOR_ISTRUE,
  operators.OPERATOR_ISFALSE,
]

export function ConditionItem({ data } : ConditionItemProps){
  if (!data.variableId || !data.operator) {
    return (<div className="text-[10px] text-muted-foreground">Condición sin configurar</div>)
  }

  const needsValue = !operatorsWithoutValue.includes(data.operator)

  return (<>
    <div className="text-[10px] truncate">
      <span className="font-medium">{data.variableId}</span>{' '}
      <span className="text-muted-foreground">
        {operatorLabels[data.operator] || data.operator}
        {needsValue && data.value ? ` "${data.value}"` : ''}
      </span>
    </div>
  </>)
}
