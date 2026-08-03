import { IAutomationNode, NODE_TYPE_CONDITION } from "@erick/conversationalflow";
import { useAutomationNode } from "../../hooks/useAutomationNode";
import { ConditionItem } from "./conditionItem";
import {
  Handle,
  Position,
} from "@xyflow/react";

type RuleItemProps = {
  id: string;
  ruleId: string;
}

export function RuleItem({ id, ruleId }: RuleItemProps) {

  const { getNodeConfiguration } = useAutomationNode(String(id))
  const nodeInformation = getNodeConfiguration() as IAutomationNode<typeof NODE_TYPE_CONDITION>;

  const rule = nodeInformation?.configuration?.rules?.find(el => el.id == ruleId)

  if (!rule) {
    return (<div className="text-[10px] text-muted-foreground">Regla sin configurar</div>)
  }

  return (<>
    <div className="relative p-0.5 text-xs border rounded">
        {rule?.conditions?.map((el, index) => (
          <ConditionItem data={el} key={index} />
        ))}
        <Handle
          id={ruleId}
          type="source"
          position={Position.Right}
          style={{
            width: 12,
            height: 12,
            background: "#2563eb",
            border: "2px solid white",
            borderRadius: "50%",
          }}
        />
      </div>
  </>)
}