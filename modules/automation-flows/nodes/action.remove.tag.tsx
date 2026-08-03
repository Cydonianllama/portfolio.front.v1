import {
  NodeProps,
} from "@xyflow/react";
import { BaseNode } from "./_base.node";
import { GeneralConfigurationNode } from "../_configs";
import { IAutomationNode, nodeTypes, NODE_TYPE_REMOVETAG } from "@erick/conversationalflow";
import { useAutomationNode } from "../hooks/useAutomationNode";
import { useTagsList } from "../hooks/useTagsList";

export function RemoveTagNode({ data }: NodeProps) {
  const type = nodeTypes.NODE_TYPE_REMOVETAG
  const { getNodeConfiguration } = useAutomationNode(String(data?.id) || '')
  const nodeInformation = getNodeConfiguration() as IAutomationNode<typeof NODE_TYPE_REMOVETAG> | undefined;
  const { tags } = useTagsList()

  const selectedIds = nodeInformation?.configuration?.toRemove?.map(el => el.tagId) || []
  const selectedNames = tags.filter(el => selectedIds.includes(el.id)).map(el => el.name)

  return (
    <>
      <BaseNode
        id={String(data?.id) || ''}
        color={GeneralConfigurationNode[type].color}
        Icon={GeneralConfigurationNode[type].icon}
        title={GeneralConfigurationNode[type].title}
        description={GeneralConfigurationNode[type].description}
        config={{ hasSource: true, hasTarget: true }}
      >
        <div className="pt-2 space-y-1">
          {selectedNames.length ? (
            selectedNames.map((name, index) => (
              <span key={index} className="inline-block bg-gray-100 rounded px-1.5 py-0.5 text-[10px] mr-1">{name}</span>
            ))
          ) : (
            <div className="text-[10px] text-muted-foreground">Sin etiquetas</div>
          )}
        </div>
      </BaseNode>
    </>
  );
}
