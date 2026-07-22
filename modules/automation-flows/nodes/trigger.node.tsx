import {
  NodeProps,
  Handle,
  Position,
  NodeResizer,
} from "@xyflow/react";
import { BaseNode } from "./_base.node";
import { GeneralConfigurationNode } from "../_configs";

export function TriggerNode({ data }: NodeProps) {
  return (
    <>
      {/* <NodeResizer minWidth={180} minHeight={100} /> */}
      <BaseNode
        color={GeneralConfigurationNode["trigger-node"].color}
        Icon={GeneralConfigurationNode["trigger-node"].icon}
        title={GeneralConfigurationNode["trigger-node"].title}
        description={GeneralConfigurationNode["trigger-node"].description}
      >
        Complicate
      </BaseNode>
    </>
  );
}