import {
  NodeProps,
  Handle,
  Position,
  NodeResizer,
} from "@xyflow/react";
import { BaseNode } from "./_base.node";
import { GeneralConfigurationNode } from "../_configs";

export function ConditionNode({ data }: NodeProps) {
  return (
    <>
      {/* <NodeResizer minWidth={180} minHeight={100} /> */}
      <BaseNode
        color={GeneralConfigurationNode["condition-node"].color}
        Icon={GeneralConfigurationNode["condition-node"].icon}
        title={GeneralConfigurationNode["condition-node"].title}
        description={GeneralConfigurationNode["condition-node"].description}
        config={{ hasSource: false, hasTarget: true }}
      >
        <div>
          Im yours
        </div>

        <div className="relative">
          opcion 1
          <Handle
            id={'---1'}
            type="source"
            position={Position.Right}
            style={{
              width: 12,
              height: 12,
              background: "#2563eb",
              border: "2px solid white",
              borderRadius: "50%",
            }}
          />
        </div>

        <div className="relative">
          opcion 2
          <Handle
            id={'---2'}
            type="source"
            position={Position.Right}
            style={{
              width: 12,
              height: 12,
              background: "#2563eb",
              border: "2px solid white",
              borderRadius: "50%",
            }}
          />
        </div>

        <div className="relative">
          opcion 3
          <Handle
            id={'---3'}
            type="source"
            position={Position.Right}
            style={{
              width: 12,
              height: 12,
              background: "#2563eb",
              border: "2px solid white",
              borderRadius: "50%",
            }}
          />
        </div>

      </BaseNode>
    </>
  );
}