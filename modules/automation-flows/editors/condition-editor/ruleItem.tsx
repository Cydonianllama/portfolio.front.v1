import { IAutomationNode, NODE_TYPE_CONDITION, NodeCondition_Rule } from "@erick/conversationalflow";
import { useConditionEditorActions } from "../../hooks/useConditionEditorActions";
import { ConditionItem } from "./conditionItem";
import { Button } from "@/components/ui/button";
import { IconsCatalog } from "@/catalogs/icons.catalogs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type RuleItemProps = {
  data: NodeCondition_Rule
  node: IAutomationNode<typeof NODE_TYPE_CONDITION>
}

export function RuleItem({ data, node }: RuleItemProps) {
  const { UpdatConditionConfiguration } = useConditionEditorActions()

  const HandleAddCondition = () => {
    UpdatConditionConfiguration('addCondition', node, {
      condition: {
        id: `condition-${Math.ceil(Math.random() * 100000)}-${Math.ceil(Math.random() * 100000)}`,
        nextNode: null,
        operator: '',
        value: '',
        variableId: ''
      },
      ruleId: data.id
    })
  }

  const HandleRemoveRule = () => {
    UpdatConditionConfiguration('removeRule', node, {
      ruleId: data.id
    })
  }

  const HandleChangeConnectionType = (connectionType: 'AND' | 'OR') => {
    UpdatConditionConfiguration('updateRuleConnectionType', node, {
      ruleId: data.id,
      connectionType
    })
  }

  return (<>
    <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
      <div className="flex items-center justify-between gap-2 border-b border-gray-200 bg-mist-50/60 px-2.5 py-1.5">
        <span className="text-xs font-semibold text-foreground">Regla</span>
        <div className="flex items-center gap-1">
          <Select value={data.connectionType || 'AND'} onValueChange={(val) => HandleChangeConnectionType(val as 'AND' | 'OR')}>
            <SelectTrigger className="w-24 h-7 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AND">Y (AND)</SelectItem>
              <SelectItem value="OR">O (OR)</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={HandleRemoveRule} variant={'ghost'} size={'icon-sm'} title="Eliminar regla">
            {IconsCatalog.trash.Icon}
          </Button>
        </div>
      </div>
      <div className="p-2 space-y-2">
        <div className="space-y-2">
          {data?.conditions?.map((el, index) => (
            <ConditionItem key={el.id || index} data={el} rule={data} node={node} />
          ))}
          <Button onClick={HandleAddCondition} variant={'outline'} className={'w-full border-dashed'} size={'sm'}>
            {IconsCatalog.addPlus.Icon}
            Condición
          </Button>
        </div>
      </div>
    </div>
  </>)
}
