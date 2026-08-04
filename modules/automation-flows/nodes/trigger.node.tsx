import {
  NodeProps,
} from "@xyflow/react";
import { BaseNode } from "./_base.node";
import { GeneralConfigurationNode } from "../_configs";
import { nodeTypes } from "@erick/conversationalflow";
import { automationFlowGenStore } from "../store/automation.flow.store";
import { TriggersSection } from "./trigger-node/triggersSection";

export function TriggerNode({ data, id }: NodeProps) {
  const type = nodeTypes.NODE_TYPE_TRIGGER_GENERAL_MESSAGE_INCOMING

  const automationFlowGen = automationFlowGenStore()

  return (
    <>
      <BaseNode
        id={String(data?.id) || ''}
        color={GeneralConfigurationNode[type].color}
        Icon={GeneralConfigurationNode[type].icon}
        title={GeneralConfigurationNode[type].title}
        description={GeneralConfigurationNode[type].description}
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
