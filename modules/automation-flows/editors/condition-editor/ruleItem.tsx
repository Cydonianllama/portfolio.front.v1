import { IAutomationNode, NODE_TYPE_CONDITION, NodeCondition_Rule } from "@erick/conversationalflow";
import { useAutomationEditor } from "../../hooks/useAutomationEditor";
import { useConditionEditorActions } from "../../hooks/useConditionEditorActions";
import { ConditionItem } from "./conditionItem";
import { Button } from "@/components/ui/button";
import { IconsCatalog } from "@/catalogs/icons.catalogs";

/* eslint-disable @typescript-eslint/no-empty-object-type */
type RuleItemProps = {
  data: NodeCondition_Rule
}

export function RuleItem({ data }: RuleItemProps) {
  const { GetAutomationNodeInformation } = useAutomationEditor()
  const { UpdatConditionConfiguration } = useConditionEditorActions()
  const nodeInformation = GetAutomationNodeInformation() as IAutomationNode<typeof NODE_TYPE_CONDITION>;
  
  const HandleAddCondition = () => {
    UpdatConditionConfiguration('addCondition', nodeInformation, {
      condition: {
        id: `condition-${Math.ceil(Math.random() * 100000)}-${Math.ceil(Math.random() * 100000)}`,
        nextNode: null,
        operator: '',
        type: 'validate:event',
        value: '',
        variableId: ''
      },
      ruleId: data.id
    })
  }

  const HandleRemoveRule = () => {
    UpdatConditionConfiguration('removeRule', nodeInformation, {
      ruleId: data.id
    })
  }
  
  return (<>
    <div className="space-y-2">
      <div className="flex justify-between items-center">
          <div className="text-foreground font-semibold">Regla</div>
          <Button onClick={HandleRemoveRule} variant={'outline'} size={'icon-sm'}>
            {IconsCatalog.trash.Icon}
          </Button>
      </div>
      <div className="space-y-2">
        {data?.conditions?.map((el, index) => (
          <ConditionItem key={index} data={el} rule={data} />
        ))}
        <Button onClick={HandleAddCondition} variant={'outline'} className={'w-full'}>
          Condición
          {IconsCatalog.addPlus.Icon}
        </Button>
      </div>
    </div>
  </>)
}