import {
  NodeProps,
  Handle,
  Position,
  NodeResizer,
} from "@xyflow/react";
import { BaseNode } from "./_base.node";
import { GeneralConfigurationNode } from "../_configs";
import { Button } from "@/components/ui/button"
import { nodeTypes } from "@/flow-engines/simpleAutomation/models/node.automation.type";

export function TriggerNode({ data }: NodeProps) {
  const type = nodeTypes.NODE_TYPE_TRIGGER_GENERAL_MESSAGE_INCOMING

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
        triggers
      </BaseNode>
    </>
  );
}