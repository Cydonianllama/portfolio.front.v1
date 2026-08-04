import {
  NodeProps,
} from "@xyflow/react";
import { BaseNode } from "./_base.node";
import { GeneralConfigurationNode } from "../_configs";
import { IAutomationNode, NODE_TYPE_CONDITION, nodeTypes } from "@erick/conversationalflow";
import { RuleSection } from "./condition-node/rulesSection";
import { useAutomationNode } from "../hooks/useAutomationNode";
import { isConditionNode } from "../utils/node.guards";

export function ConditionNode({ data }: NodeProps) {
  const type = nodeTypes.NODE_TYPE_CONDITION

  const { getNodeConfiguration } = useAutomationNode(String(data.id))
  const nodeInformation = getNodeConfiguration()
  const isNode = isConditionNode(nodeInformation)

  const rulesCount = isNode ? nodeInformation.configuration?.rules?.length || 0 : 0

  return (
    <>
      <BaseNode
        id={String(data?.id) || ''}
        color={GeneralConfigurationNode[type].color}
        Icon={GeneralConfigurationNode[type].icon}
        title={GeneralConfigurationNode[type].title}
        description={GeneralConfigurationNode[type].description}
        config={{ hasSource: false, hasTarget: true }}
      >
        <div className="max-w-[220px] pt-2 space-y-2">
          {/* Reglas */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-yellow-500" />
                Reglas
              </div>
              {rulesCount > 0 && (
                <span className="inline-flex items-center rounded-full border bg-mist-50 px-1.5 py-0.5 text-[10px] leading-none text-muted-foreground tabular-nums">
                  {rulesCount}
                </span>
              )}
            </div>
            {rulesCount > 0 ? (
              <div className="rounded-md border border-gray-200 bg-gray-50/60 p-1.5">
                {isNode && <RuleSection node={nodeInformation} />}
              </div>
            ) : (
              <div className="rounded-md border border-dashed border-gray-300 px-2 py-1.5 text-[11px] text-muted-foreground">
                Sin reglas
              </div>
            )}
          </div>
        </div>
      </BaseNode>
    </>
  );
}
