import {
  NodeProps,
  Handle,
  Position,
  NodeResizer,
} from "@xyflow/react";
import { BaseNode } from "./_base.node";
import { GeneralConfigurationNode } from "../_configs";
import { nodeTypes } from "@erick/conversationalflow";
import { SectionGroupWords } from "./message-node/sectionGroupWords";
import { SectionButtons } from "./message-node/sectionButtonts";

export function MessageNode({ data }: NodeProps) {
  const type = nodeTypes.NODE_TYPE_GENERAL_MESSAGE_SIMPLE
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
        <div className="max-w-[200px] pt-2">
          <div className="border p-2 rounded text-xs text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil harum autem quaerat!
          </div>
          <SectionGroupWords />
          <SectionButtons />
        </div>
      </BaseNode>
    </>
  );
}