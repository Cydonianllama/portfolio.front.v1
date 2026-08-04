import { IconsCatalog } from "@/catalogs/icons.catalogs";
import { Button } from "@/components/ui/button";
import { IAutomationNode, NODE_TYPE_CONDITION } from "@erick/conversationalflow";
import { RuleItem } from "./ruleItem";
import { useConditionEditorActions } from "../../hooks/useConditionEditorActions";
import { EmptyState } from "../../components/states/EmptyState";

export function RuleSection({ node }: { node: IAutomationNode<typeof NODE_TYPE_CONDITION> }) {
  const { UpdatConditionConfiguration } = useConditionEditorActions()

  const HandleAddRule = () => {
    UpdatConditionConfiguration('addRule', node, {
      item: {
        conditions: [],
        connectionType: 'AND',
        id: `rule-${Math.ceil(Math.random() * 1000000)}-${Math.ceil(Math.random() * 1000000)}`,
        nextNode: null
      }
    })
  }

  return (<>
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="font-semibold text-foreground">Reglas</div>
          <p className="text-xs text-muted-foreground">
            Define las condiciones que evaluará el flujo.
          </p>
        </div>
        <Button onClick={HandleAddRule} variant={'outline'} size={'icon-sm'} title="Agregar regla">
          {IconsCatalog.addPlus.Icon}
        </Button>
      </div>
      <div className="space-y-2">
        {node.configuration?.rules?.length ? (
          node.configuration?.rules?.map((el, index) => (
            <RuleItem data={el} key={el.id || index} node={node} />
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
