import {
  NodeProps,
  Handle,
  Position,
  NodeResizer,
} from "@xyflow/react";
import { BaseNode } from "./_base.node";
import { GeneralConfigurationNode } from "../_configs";
import { Button } from "@/components/ui/button"
import { IAutomationNode, NODE_TYPE_TRIGGER_GENERAL_MESSAGE_INCOMING, nodeTypes } from "@erick/conversationalflow";
import { automationFlowGenStore } from "../store/automation.flow.store";
import { TriggersSection } from "./trigger-node/triggersSection";
import { useAutomationNode } from "../hooks/useAutomationNode";

export function TriggerNode({ data, id }: NodeProps) {
  const type = nodeTypes.NODE_TYPE_TRIGGER_GENERAL_MESSAGE_INCOMING

  const automationFlowStore = automationFlowGenStore()

  const { getNodeConfiguration } = useAutomationNode(id)

  const nodeInfo = getNodeConfiguration() as IAutomationNode<typeof NODE_TYPE_TRIGGER_GENERAL_MESSAGE_INCOMING>;

  const automationFlowGen = automationFlowGenStore()

  return (
    <>
      {/* <NodeResizer minWidth={180} minHeight={100} /> */}
      <BaseNode
        id={String(data?.id) || ''}
        color={GeneralConfigurationNode[type].color}
        Icon={GeneralConfigurationNode[type].icon}
        title={GeneralConfigurationNode[type].title}
        description={GeneralConfigurationNode[type].description}
        config={{ hasSource: true, hasTarget: false }}
      >
        <div className="pt-2">
          <Button
            className={'w-full'}
            variant={'outline'}
            onClick={(e) => {
              e.stopPropagation()
              automationFlowStore.setTriggerSelector({ openTriggerSelector: true })
            }}
          >
            <TriggersSection triggers={automationFlowGen.triggersFromtAutomation || []} />
          </Button>
        </div>
      </BaseNode>
    </>
  );
}