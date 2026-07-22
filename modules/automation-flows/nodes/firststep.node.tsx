import {
  NodeProps,
  Handle,
  Position,
  NodeResizer,
} from "@xyflow/react";
import { BaseNode } from "./_base.node";
import { GeneralConfigurationNode } from "../_configs";

export function FirstSteNode({ data }: NodeProps) {
  return (
    <>
      {/* <NodeResizer minWidth={180} minHeight={100} /> */}
      <BaseNode
        color={GeneralConfigurationNode["first-step-node"].color}
        Icon={GeneralConfigurationNode["first-step-node"].icon}
        title={GeneralConfigurationNode["first-step-node"].title}
        description={GeneralConfigurationNode["first-step-node"].description}
        config={{ hasSource: true, hasTarget: false }}
      >
        No more
      </BaseNode>
    </>
  );
}