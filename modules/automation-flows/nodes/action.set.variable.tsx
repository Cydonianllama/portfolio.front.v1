import { BaseNode } from "./_base.node";
import { isSetVariableNode } from "../utils/node.guards";
import { AutomationNodeComponentProps } from "../registry/types";

export function SetVariableNode({ data, definition, getNodeConfiguration }: AutomationNodeComponentProps) {
  const nodeInformation = getNodeConfiguration()

  const isNode = isSetVariableNode(nodeInformation)
  const variables = isNode ? nodeInformation.configuration?.variables || [] : []

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
        <div className="pt-2 space-y-0.5">
          {variables.length ? (
            variables.map((el, index) => (
              <div key={index} className="text-[10px] truncate">
                <span className="font-medium">{el.variableId || '?'}</span>
                <span className="text-muted-foreground">{' = "'}{el.value}{'"'}</span>
              </div>
            ))
          ) : (
            <div className="text-[10px] text-muted-foreground">Sin variables</div>
          )}
        </div>
      </BaseNode>
    </>
  );
}
