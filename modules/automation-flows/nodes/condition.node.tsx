import { BaseNode } from "./_base.node";
import { RuleSection } from "./condition-node/rulesSection";
import { isConditionNode } from "../utils/node.guards";
import { AutomationNodeComponentProps } from "../registry/types";

export function ConditionNode({ data, definition, getNodeConfiguration, isActive }: AutomationNodeComponentProps) {
  const nodeInformation = getNodeConfiguration()
  const isNode = isConditionNode(nodeInformation)

  const rulesCount = isNode ? nodeInformation.configuration?.rules?.length || 0 : 0

  return (
    <>
      <BaseNode
        id={String(data?.id) || ''}
        color={definition.visual.color}
        Icon={definition.visual.icon}
        title={definition.visual.title}
        description={definition.visual.description}
        config={{ hasSource: false, hasTarget: true }}
        isActive={isActive}
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
