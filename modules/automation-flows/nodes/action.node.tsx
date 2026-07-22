import {
  NodeProps,
  Handle,
  Position,
  NodeResizer,
} from "@xyflow/react";
import { BaseNode } from "./_base.node";
import { GeneralConfigurationNode } from "../_configs";

export function ActionNode({ data }: NodeProps) {
  return (
    <>
      {/* <NodeResizer minWidth={220} minHeight={120} /> */}
      <BaseNode
        color={GeneralConfigurationNode["action-node"].color}
        Icon={GeneralConfigurationNode["action-node"].icon}
        title={GeneralConfigurationNode["action-node"].title}
        description={GeneralConfigurationNode["action-node"].description}
      >
        Lovebug again
      </BaseNode>
    </>
  );
}