import {
  NodeProps,
  Handle,
  Position,
  NodeResizer,
} from "@xyflow/react";
import { BaseNode } from "./_base.node";
import { GeneralConfigurationNode } from "../_configs";
import { nodeTypes } from "@erick/conversationalflow";
import { RuleSection } from "./condition-node/rulesSection";

export function ConditionNode({ data }: NodeProps) {
  const type = nodeTypes.NODE_TYPE_CONDITION
  return (
    <>
      {/* <NodeResizer minWidth={180} minHeight={100} /> */}
      <BaseNode
        id={String(data?.id) || ''}
        color={GeneralConfigurationNode[type].color}
        Icon={GeneralConfigurationNode[type].icon}
        title={GeneralConfigurationNode[type].title}
        description={GeneralConfigurationNode[type].description}
        config={{ hasSource: false, hasTarget: true }}
      >
        <div className="pt-2">
          <RuleSection id={String(data.id)} />
        </div>
      </BaseNode>
    </>
  );
}