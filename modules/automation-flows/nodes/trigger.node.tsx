import { BaseNode } from "./_base.node";
import { automationFlowGenStore } from "../store/automation.flow.store";
import { TriggersSection } from "./trigger-node/triggersSection";
import { AutomationNodeComponentProps } from "../registry/types";

export function TriggerNode({ data, definition }: AutomationNodeComponentProps) {
  const automationFlowGen = automationFlowGenStore()

  return (
    <>
      <BaseNode
        id={String(data?.id) || ''}
        color={definition.visual.color}
        Icon={definition.visual.icon}
        title={definition.visual.title}
        description={definition.visual.description}
        config={{ hasSource: true, hasTarget: false }}
        showActionsPopover={false}
      >
        <div className="pt-2">
          <TriggersSection triggers={automationFlowGen.triggersFromtAutomation || []} />
        </div>
      </BaseNode>
    </>
  );
}
