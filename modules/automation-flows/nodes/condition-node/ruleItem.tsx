import { IAutomationNode, NODE_TYPE_CONDITION } from "@erick/conversationalflow";
import { ConditionItem } from "./conditionItem";
import {
  Handle,
  Position,
} from "@xyflow/react";

type RuleItemProps = {
  node: IAutomationNode<typeof NODE_TYPE_CONDITION>;
  ruleId: string;
}

export function RuleItem({ node, ruleId }: RuleItemProps) {

  const rule = node.configuration?.rules?.find(el => el.id == ruleId)
  const conditionsCount = rule?.conditions?.length || 0

  if (!rule) {
    return (<div className="text-[10px] text-muted-foreground">Regla sin configurar</div>)
  }

  const connectionLabel = rule.connectionType === 'OR' ? 'O (OR)' : 'Y (AND)'

  return (<>
    <div className="relative rounded-md border border-gray-200 bg-white p-1.5">
      <div className="flex items-center justify-between gap-1 mb-1.5">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          Regla
        </span>
        <span className="inline-flex items-center rounded-full border bg-mist-50 px-1.5 py-0.5 text-[10px] leading-none text-muted-foreground">
          {connectionLabel}
        </span>
      </div>
      <div className="space-y-1">
        {conditionsCount > 0 ? (
          rule?.conditions?.map((el, index) => (
            <ConditionItem data={el} key={el.id || index} />
          ))
        ) : (
          <div className="text-[10px] text-muted-foreground">Sin condiciones</div>
        )}
      </div>
      <Handle
        id={ruleId}
        type="source"
        position={Position.Right}
        style={{
          width: 12,
          height: 12,
          background: "#eab308",
          border: "2px solid white",
          borderRadius: "50%",
        }}
      />
    </div>
  </>)
}
