import {
  NodeProps,
  Handle,
  Position,
  NodeResizer,
} from "@xyflow/react";
import { BaseNode } from "./_base.node";
import { GeneralConfigurationNode } from "../_configs";
import { Button } from "@/components/ui/button"

export function TriggerNode({ data }: NodeProps) {
  return (
    <>
      {/* <NodeResizer minWidth={180} minHeight={100} /> */}
      <BaseNode
        color={GeneralConfigurationNode["trigger-node"].color}
        Icon={GeneralConfigurationNode["trigger-node"].icon}
        title={GeneralConfigurationNode["trigger-node"].title}
        description={GeneralConfigurationNode["trigger-node"].description}
        config={{ hasSource: true, hasTarget: false }}
      >
        <div className="w-50 flex flex-col">
          <div className="text-xs text-gray-400 py-2">
            No cuentas con triggers agregados
          </div>
          <Button variant={'outline'}>Agregar Disparador</Button>
        </div>
      </BaseNode>
    </>
  );
}