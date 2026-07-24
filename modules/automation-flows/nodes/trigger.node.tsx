import {
  NodeProps,
  Handle,
  Position,
  NodeResizer,
} from "@xyflow/react";
import { BaseNode } from "./_base.node";
import { GeneralConfigurationNode } from "../_configs";
import { Button } from "@/components/ui/button"
import { nodeTypes } from "@/flow-engines/simpleAutomation/models/node.automation.type";
import { useAutomationFlow } from "../store/automation.flow.store";

export function TriggerNode({ data }: NodeProps) {
  const type = nodeTypes.NODE_TYPE_TRIGGER_GENERAL_MESSAGE_INCOMING

  const automationFlowStore = useAutomationFlow()

  return (
    <>
      {/* <NodeResizer minWidth={180} minHeight={100} /> */}
      <BaseNode
        color={GeneralConfigurationNode[type].color}
        Icon={GeneralConfigurationNode[type].icon}
        title={GeneralConfigurationNode[type].title}
        description={GeneralConfigurationNode[type].description}
        config={{ hasSource: true, hasTarget: true }}
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
            Agregar disparador
          </Button>
        </div>
      </BaseNode>
    </>
  );
}