import { BaseNode } from "./_base.node";
import { useTagsList } from "../hooks/useTagsList";
import { isAddTagNode } from "../utils/node.guards";
import { AutomationNodeComponentProps } from "../registry/types";

export function AddTagNode({ data, definition, getNodeConfiguration }: AutomationNodeComponentProps) {
  const nodeInformation = getNodeConfiguration()
  const { tags } = useTagsList()

  const isNode = isAddTagNode(nodeInformation)
  const selectedIds = isNode ? nodeInformation.configuration?.toAdd?.map(el => el.tagId) || [] : []
  const selectedNames = tags.filter(el => selectedIds.includes(el.id)).map(el => el.name)

  return (
    <>
      <BaseNode
        id={String(data?.id) || ''}
        color={definition.visual.color}
        Icon={definition.visual.icon}
        title={definition.visual.title}
        description={definition.visual.description}
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
