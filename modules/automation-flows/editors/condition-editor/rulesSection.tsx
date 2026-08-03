import { IconsCatalog } from "@/catalogs/icons.catalogs";
import { Button } from "@/components/ui/button";
import { IAutomationNode, NODE_TYPE_CONDITION } from "@erick/conversationalflow";
import { useAutomationEditor } from "../../hooks/useAutomationEditor";
import { RuleItem } from "./ruleItem";
import { useConditionEditorActions } from "../../hooks/useConditionEditorActions";
import { EmptyState } from "../../components/states/EmptyState";

export function RuleSection() {
  const { GetAutomationNodeInformation } = useAutomationEditor()
  const { UpdatConditionConfiguration } = useConditionEditorActions()
  const nodeInformation = GetAutomationNodeInformation() as IAutomationNode<typeof NODE_TYPE_CONDITION>;

  const HandleAddRule = () => {
    UpdatConditionConfiguration('addRule', nodeInformation, {
      item: {
        conditions: [],
        id: `rule-${Math.ceil(Math.random() * 1000000)}-${Math.ceil(Math.random() * 1000000)}`,
        operator: 'AND',
        nextNode: null
      }
    })
  }

  return (<>
    <div className="space-y-2">
      <div className="flex justify-between">
        <div className="font-semibold text-foreground">Reglas</div>
        <Button onClick={HandleAddRule} variant={'outline'} size={'icon-sm'}>
          {IconsCatalog.addPlus.Icon}
        </Button>
      </div>
      <div className="space-y-2">
        {nodeInformation?.configuration?.rules?.length ? (
          nodeInformation?.configuration?.rules?.map((el, index) => (
            <RuleItem data={el} key={index} />
          ))
        ) : (
          <EmptyState
            Icon={IconsCatalog.addPlus.Icon}
            title="Sin reglas"
            description="Define una regla para evaluar condiciones en el flujo."
          />
        )}
      </div>
    </div>
  </>)
}