import {
  NodeProps,
  Handle,
  Position,
  NodeResizer,
} from "@xyflow/react";
import { BaseNode } from "./_base.node";
import { GeneralConfigurationNode } from "../_configs";

export function StopAutomationNode({ data }: NodeProps) {
  return (
    <>
      {/* <NodeResizer minWidth={180} minHeight={100} /> */}
      <BaseNode
        color={GeneralConfigurationNode["message-node"].color}
        Icon={GeneralConfigurationNode["message-node"].icon}
        title={GeneralConfigurationNode["message-node"].title}
        description={GeneralConfigurationNode["message-node"].description}
        config={{ hasSource: true, hasTarget: true }}
      >
        stop-automation
      </BaseNode>
    </>
  );
}