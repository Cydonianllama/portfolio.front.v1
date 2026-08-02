import {
  NodeProps,
  Handle,
  Position,
  NodeResizer,
} from "@xyflow/react";
import { BaseNode } from "./_base.node";
import { GeneralConfigurationNode } from "../_configs";
import { IAutomationNode, NODE_TYPE_GENERAL_MESSAGE_SIMPLE, nodeTypes } from "@erick/conversationalflow";
import { SectionGroupWords } from "./message-node/sectionGroupWords";
import { SectionButtons } from "./message-node/sectionButtonts";
import { useAutomationNode } from "../hooks/useAutomationNode";

export function MessageNode({ data }: NodeProps) {
  const type = nodeTypes.NODE_TYPE_GENERAL_MESSAGE_SIMPLE

  const { getNodeConfiguration } = useAutomationNode(String(data.id))
  const nodeInformation = getNodeConfiguration() as IAutomationNode<typeof NODE_TYPE_GENERAL_MESSAGE_SIMPLE>;

  return (
    <>
      {/* <NodeResizer minWidth={180} minHeight={100} /> */}
      <BaseNode
        id={String(data?.id) || ''}
        color={GeneralConfigurationNode[type].color}
        Icon={GeneralConfigurationNode[type].icon}
        title={GeneralConfigurationNode[type].title}
        description={GeneralConfigurationNode[type].description}
        config={{ hasSource: true, hasTarget: true }}
      >
        <div className="max-w-[200px] pt-2 space-y-4">
          <div className="p-2 rounded-lg text-xs text-muted-foreground text-white bg-blue-500">
            {nodeInformation?.configuration?.message || ''}
          </div>
          <SectionGroupWords id={String(data.id)} />
          <SectionButtons id={String(data.id)} />
        </div>
      </BaseNode>
    </>
  );
}