import { NodeCondition_Condition } from "@erick/conversationalflow"

/* eslint-disable @typescript-eslint/no-empty-object-type */
type ConditionItemProps = {
  data: NodeCondition_Condition
}

export function ConditionItem({ data } : ConditionItemProps){
  return(<>
    <div>
      {data.variableId || 'no-var'}
    </div>
  </>)
}