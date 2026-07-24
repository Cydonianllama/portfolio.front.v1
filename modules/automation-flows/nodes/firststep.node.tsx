import {
  NodeProps,
  Handle,
  Position,
  NodeResizer,
} from "@xyflow/react";
import { BaseNode } from "./_base.node";
import { GeneralConfigurationNode } from "../_configs";
import { Button } from "@/components/ui/button";
import { FlowHookActions } from "../hooks/action.hooks.flow";
import { useAutomationFlow } from "../store/automation.flow.store";
import { nodeTypes } from "@/flow-engines/simpleAutomation/models/node.automation.type";

export function FirstSteNode({ data }: NodeProps) {
  const type = 'first-step-node'

  const flowActions = FlowHookActions({})
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
        <div className="space-y-2 pt-2">
          <Button
            className={'w-full'}
            variant={'outline'}
            onClick={(e) => {
              e.stopPropagation()
              flowActions.CreateNodeAction({ automationId: automationFlowStore.automationId || '', nodeType: nodeTypes.NODE_TYPE_GENERAL_MESSAGE_SIMPLE })
            }}
          >
            Mensaje
          </Button>
          <Button
            className={'w-full'}
            variant={'outline'}
            onClick={(e) => {
              e.stopPropagation()
              flowActions.CreateNodeAction({ automationId: automationFlowStore.automationId || '', nodeType: nodeTypes.NODE_TYPE_CONDITION })
            }}
          >
            Condicion
          </Button>
        </div>
      </BaseNode>
    </>
  );
}