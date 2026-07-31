import { IAutomationNode, NODE_TYPE_CONDITION, NodeCondition_Condition, NodeCondition_Rule } from "@erick/conversationalflow"
import { RuleSection } from "./rulesSection"
import { Button } from "@/components/ui/button"
import { IconsCatalog } from "@/catalogs/icons.catalogs"
import { useAutomationEditor } from "../../hooks/useAutomationEditor"
import { useConditionEditorActions } from "../../hooks/useConditionEditorActions"

/* eslint-disable @typescript-eslint/no-empty-object-type */
type ConditionItemProps = {
  rule: NodeCondition_Rule
  data: NodeCondition_Condition
}

export function ConditionItem({ data, rule } : ConditionItemProps){
  const { GetAutomationNodeInformation } = useAutomationEditor()
    const { UpdatConditionConfiguration } = useConditionEditorActions()
    const nodeInformation = GetAutomationNodeInformation() as IAutomationNode<typeof NODE_TYPE_CONDITION>;

  const HandleRemoveCondition = () => {
    UpdatConditionConfiguration('removeCondition', nodeInformation, {
      conditionId: data.id,
      ruleId: rule.id
    })
  }

  return(<>
    <div className="flex justify-between">
      <div>
        {data.variableId || 'no-var'}
      </div>
      <div className="space-y-2">
        <Button onClick={HandleRemoveCondition} variant={'ghost'} size={'icon-sm'}>
          {IconsCatalog.removex.Icon}
        </Button>
      </div>
    </div>
  </>)
}