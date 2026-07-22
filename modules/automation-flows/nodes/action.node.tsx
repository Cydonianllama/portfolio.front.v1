import {
  NodeProps,
  Handle,
  Position,
  NodeResizer,
} from "@xyflow/react";

export function ActionNode({ data }: NodeProps) {
  return (
    <>
      <NodeResizer minWidth={220} minHeight={120} />

      <Handle
        type="target"
        position={Position.Left}
      />

      <div
        style={{
          border: "2px solid royalblue",
          borderRadius: 10,
          background: "#eef4ff",
          width: "100%",
          height: "100%",
          padding: 12,
        }}
      >
        <strong>
          {/* {data.title} */}
          action node
        </strong>

        <p>Acción...</p>
      </div>

      <Handle
        type="source"
        position={Position.Right}
      />
    </>
  );
}