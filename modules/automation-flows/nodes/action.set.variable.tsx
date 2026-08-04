import {
  NodeProps,
} from "@xyflow/react";
import { BaseNode } from "./_base.node";
import { GeneralConfigurationNode } from "../_configs";
import { nodeTypes } from "@erick/conversationalflow";
import { useAutomationNode } from "../hooks/useAutomationNode";
import { isSetVariableNode } from "../utils/node.guards";

export function SetVariableNode({ data }: NodeProps) {
  const type = nodeTypes.NODE_TYPE_SETVAR
  const { getNodeConfiguration } = useAutomationNode(String(data?.id) || '')
  const nodeInformation = getNodeConfiguration()

  const isNode = isSetVariableNode(nodeInformation)
  const variables = isNode ? nodeInformation.configuration?.variables || [] : []

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
