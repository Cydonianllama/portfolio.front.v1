import {
  NodeProps,
  Handle,
  Position,
  NodeResizer,
} from "@xyflow/react";
import { BaseNode } from "./_base.node";
import { GeneralConfigurationNode } from "../_configs";
import { nodeTypes } from "@/flow-engines/simpleAutomation/models/node.automation.type";

export function StartAutomationNode({ data }: NodeProps) {
  const type = nodeTypes.NODE_TYPE_START_AUTOMATION
  return (
    <>
      {/* <NodeResizer minWidth={180} minHeight={100} /> */}
      <BaseNode
        color={GeneralConfigurationNode[type].color}
        Icon={GeneralConfigurationNode[type].icon}
        title={GeneralConfigurationNode[type].title}
        description={GeneralConfigurationNode[type].description}
        config={{ hasSource: true, hasTarget: true }}
      >
        start-automation
      </BaseNode>
    </>
  );
}