import {
  NodeProps,
  Handle,
  Position,
  NodeResizer,
} from "@xyflow/react";
import { BaseNode } from "./_base.node";
import { GeneralConfigurationNode } from "../_configs";
import { Button } from "@/components/ui/button";
import { useConversationalFlowGenActions } from "../hooks/action.hooks.flow";
import { automationFlowGenStore } from "../store/automation.flow.store";
import { nodeTypes } from "@erick/conversationalflow";
import { v4 as uuidv4 } from "uuid";

export function FirstSteNode({ data }: NodeProps) {
  const type = 'first-step-node'

  const flowActions = useConversationalFlowGenActions({})
  const automationFlowStore = automationFlowGenStore()

  return (
    <>
      {/* <NodeResizer minWidth={180} minHeight={100} /> */}
      <BaseNode
        id={String(data?.id) || ''}
        color={GeneralConfigurationNode[type].color}
        Icon={GeneralConfigurationNode[type].icon}
        title={GeneralConfigurationNode[type].title}
        description={GeneralConfigurationNode[type].description}
        config={{ hasSource: false, hasTarget: true }}
        showActionsPopover={false}
      >
        <div className="space-y-2 pt-2">
          <Button
            className={'w-full'}
            variant={'outline'}
            onClick={(e) => {
              e.stopPropagation()
              flowActions.CreateNodeAction({ id: uuidv4(), automationId: automationFlowStore.automationId || '', nodeType: nodeTypes.NODE_TYPE_GENERAL_MESSAGE_SIMPLE })
            }}
          >
            Mensaje
          </Button>
          <Button
            className={'w-full'}
            variant={'outline'}
            onClick={(e) => {
              e.stopPropagation()
              flowActions.CreateNodeAction({ id: uuidv4(), automationId: automationFlowStore.automationId || '', nodeType: nodeTypes.NODE_TYPE_CONDITION })
            }}
          >
            Condicion
          </Button>
        </div>
      </BaseNode>
    </>
  );
}