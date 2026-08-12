import { BaseNode } from "./_base.node";
import { Button } from "@/components/ui/button";
import { useConversationalFlowGenActions } from "../hooks/action.hooks.flow";
import { automationFlowGenStore } from "../store/automation.flow.store";
import { v4 as uuidv4 } from "uuid";
import { AutomationNodeComponentProps } from "../registry/types";
import type { NodeTypeValue } from "../registry/types";

export function FirstSteNode({ data, definition, registry }: AutomationNodeComponentProps) {
  const flowActions = useConversationalFlowGenActions({})
  const automationFlowStore = automationFlowGenStore()

  const firstStepOptions = registry.filter((item) => item.canCreateFromFirstStep)

  return (
    <>
      <BaseNode
        id={String(data?.id) || ''}
        color={definition.visual.color}
        Icon={definition.visual.icon}
        title={definition.visual.title}
        description={definition.visual.description}
        config={{ hasSource: false, hasTarget: true }}
        showActionsPopover={false}
      >
        <div className="space-y-2 pt-2">
          {firstStepOptions.map((item) => (
            <Button
              key={item.type}
              className={'w-full'}
              variant={'outline'}
              onClick={(e) => {
                e.stopPropagation()
                flowActions.CreateNodeAction({
                  id: uuidv4(),
                  automationId: automationFlowStore.automationId || '',
                  nodeType: item.type as NodeTypeValue as unknown as import("@erick/conversationalflow").NodeTypesType,
                })
              }}
            >
              {item.createLabel || item.visual.title}
            </Button>
          ))}
        </div>
      </BaseNode>
    </>
  );
}